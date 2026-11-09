import { createHash } from 'node:crypto';
import { copyFile, mkdir, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const designDir = path.join(root, 'public', 'designs');
const legacyDir = path.join(designDir, 'originals');
const assetDir = path.join(designDir, 'assets');
const manifestPath = path.join(designDir, 'manifest.json');
const supportedExtensions = new Set(['.jpg', '.jpeg', '.jfif', '.png', '.webp', '.avif', '.tif', '.tiff']);
const containerFolders = new Set(['originals', 'projects']);
const reservedFolders = new Set(['assets', 'thumbnails']);

await mkdir(legacyDir, { recursive: true });
await mkdir(assetDir, { recursive: true });

const rootEntries = await readdir(designDir, { withFileTypes: true });
const projectFolders = [];

for (const entry of rootEntries) {
  if (!entry.isDirectory()) continue;

  if (containerFolders.has(entry.name.toLowerCase())) {
    const nestedEntries = await readdir(path.join(designDir, entry.name), { withFileTypes: true });
    for (const nested of nestedEntries) {
      if (nested.isDirectory()) {
        projectFolders.push({
          name: nested.name,
          idPath: path.join(entry.name, nested.name),
          directory: path.join(designDir, entry.name, nested.name),
        });
      }
    }
  } else if (!reservedFolders.has(entry.name.toLowerCase())) {
    projectFolders.push({
      name: entry.name,
      idPath: entry.name,
      directory: path.join(designDir, entry.name),
    });
  }
}

const projects = [];
const browserExtensions = {
  jpeg: 'jpg',
  png: 'png',
  webp: 'webp',
  avif: 'avif',
  gif: 'gif',
};

async function findImages(directory, recursive = true) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    if (recursive && entry.isDirectory() && !entry.name.startsWith('.')) {
      files.push(...(await findImages(path.join(directory, entry.name), recursive)));
    } else if (entry.isFile() && supportedExtensions.has(path.extname(entry.name).toLowerCase())) {
      files.push(path.join(directory, entry.name));
    }
  }

  return files.sort((a, b) => a.localeCompare(b));
}

async function addProject(name, idPath, directory, recursive = true) {
  const files = await findImages(directory, recursive);
  if (files.length === 0) return;

  const images = [];
  for (const sourcePath of files) {
    const relativePath = path.relative(directory, sourcePath);
    const filename = path.basename(sourcePath);
    const projectImagePath = path.join(idPath, relativePath);
    const metadata = await sharp(sourcePath).metadata();
    if (!metadata.width || !metadata.height || !metadata.format) {
      throw new Error(`Could not read image dimensions or format for ${projectImagePath}`);
    }

    const extension = browserExtensions[metadata.format];
    const usePng = metadata.format === 'tiff';
    if (!extension && !usePng) {
      throw new Error(`Unsupported image format "${metadata.format}" for ${projectImagePath}`);
    }

    const assetFormat = usePng ? 'png' : extension;
    const safeName = path.parse(filename).name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'design';
    const hash = createHash('sha256').update(projectImagePath).digest('hex').slice(0, 10);
    const assetName = `${safeName}-${hash}.${assetFormat}`;
    const assetPath = path.join(assetDir, assetName);
    if (usePng) {
      await sharp(sourcePath).png().toFile(assetPath);
    } else {
      await copyFile(sourcePath, assetPath);
    }

    if (idPath === 'originals' && relativePath === filename) {
      const previousHash = createHash('sha256').update(filename).digest('hex').slice(0, 8);
      const previousName = `${safeName}-${previousHash}.${assetFormat}`;
      if (previousName !== assetName) {
        await copyFile(assetPath, path.join(assetDir, previousName));
      }
    }

    const dimensions = metadata.autoOrient ?? metadata;
    images.push({
      alt: `Design ${images.length + 1}`,
      src: `/designs/assets/${assetName}`,
      width: dimensions.width,
      height: dimensions.height,
    });
  }

  const id = createHash('sha256').update(idPath).digest('hex').slice(0, 12);
  projects.push({ id, name, images });
}

for (const folder of projectFolders.sort((a, b) => a.name.localeCompare(b.name))) {
  await addProject(folder.name, folder.idPath, folder.directory);
}

const legacyEntries = await readdir(legacyDir, { withFileTypes: true });
if (legacyEntries.some((entry) => entry.isFile() && supportedExtensions.has(path.extname(entry.name).toLowerCase()))) {
  await addProject('My Designs', 'originals', legacyDir, false);
}

await writeFile(manifestPath, `${JSON.stringify({ projects }, null, 2)}\n`);
const imageCount = projects.reduce((total, project) => total + project.images.length, 0);
console.log(`Prepared ${imageCount} images in ${projects.length} design project${projects.length === 1 ? '' : 's'}.`);
