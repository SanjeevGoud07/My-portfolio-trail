import { useEffect, useRef, useState, type PointerEvent } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useScrollLock } from '../hooks/smoothScroll';
import { EASE, SectionHeading } from './fx';
import { RailButtons } from './Rail';

const LIKES_KEY = 'my-designs-likes';

type DesignImage = {
  alt: string;
  src: string;
  width: number;
  height: number;
};

type DesignProject = {
  id: string;
  name: string;
  images: DesignImage[];
};

function readLikes(): string[] {
  try {
    const stored: unknown = JSON.parse(localStorage.getItem(LIKES_KEY) ?? '[]');
    return Array.isArray(stored) ? stored.filter((item): item is string => typeof item === 'string') : [];
  } catch {
    return [];
  }
}

function assetUrl(path: string) {
  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`;
}

export default function My_Designs() {
  const [projects, setProjects] = useState<DesignProject[]>([]);
  const [activeProject, setActiveProject] = useState<DesignProject | null>(null);
  const [selectedImage, setSelectedImage] = useState<DesignImage | null>(null);
  const [likedDesigns, setLikedDesigns] = useState<string[]>(readLikes);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [previewError, setPreviewError] = useState(false);
  const carousel = useRef<HTMLDivElement>(null);
  const projectScroll = useRef<HTMLDivElement>(null);

  useScrollLock(activeProject !== null || selectedImage !== null);

  useEffect(() => {
    let active = true;

    fetch(assetUrl('/designs/manifest.json'), { cache: 'no-store' })
      .then((response) => {
        if (!response.ok) throw new Error(`Could not load design projects (${response.status}).`);
        return response.json() as Promise<{ projects: DesignProject[] }>;
      })
      .then((manifest) => {
        if (!manifest || !Array.isArray(manifest.projects)) {
          throw new Error('The design projects manifest has an invalid format.');
        }
        if (active) setProjects(manifest.projects);
      })
      .catch((cause: unknown) => {
        if (active) setError(cause instanceof Error ? cause.message : 'Could not load design projects.');
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(LIKES_KEY, JSON.stringify(likedDesigns));
    } catch {
      // Likes still work for this page view when browser storage is unavailable.
    }
  }, [likedDesigns]);

  useEffect(() => {
    if (!activeProject && !selectedImage) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      if (selectedImage) setSelectedImage(null);
      else setActiveProject(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeProject, selectedImage]);

  const toggleLike = (src: string) => {
    setLikedDesigns((current) => (current.includes(src) ? current.filter((item) => item !== src) : [...current, src]));
  };

  const openImage = (image: DesignImage) => {
    setPreviewError(false);
    setSelectedImage(image);
  };

  return (
    <>
      <SectionHeading
        kicker="Selected work"
        title="My Designs"
        aside={<p className="max-w-xs text-sm text-mist">Choose a project to explore its designs.</p>}
      />

      {error ? (
        <p role="alert" className="gutter py-8 text-sm text-crimson-2">{error}</p>
      ) : loading ? (
        <p className="gutter py-8 text-sm text-mist" role="status">Loading design projects…</p>
      ) : projects.length === 0 ? (
        <p className="gutter py-8 text-sm leading-relaxed text-mist">
          Add a project folder with images under <code className="rounded bg-white/10 px-1.5 py-0.5 text-bone">public/designs/</code>,
          then run <code className="rounded bg-white/10 px-1.5 py-0.5 text-bone">npm run designs</code>.
        </p>
      ) : (
        <div className="group/rail relative">
          <div ref={carousel} className="rail gutter flex snap-x snap-mandatory gap-4 overflow-x-auto py-6">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                onOpen={() => setActiveProject(project)}
              />
            ))}
          </div>
          <RailButtons rail={carousel} />
        </div>
      )}

      {createPortal(
        <AnimatePresence>
          {activeProject && (
            <motion.div
              className="fixed inset-0 z-[110] flex items-center justify-center bg-black/85 p-2 backdrop-blur-md sm:p-5"
              role="dialog"
              aria-modal="true"
              aria-labelledby="design-project-title"
              onClick={() => setActiveProject(null)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="relative flex h-[min(94dvh,960px)] w-[min(96vw,1280px)] flex-col overflow-hidden rounded-xl border border-white/10 bg-ink-2 shadow-2xl sm:rounded-2xl"
                onClick={(event) => event.stopPropagation()}
                initial={{ scale: 0.97, y: 12 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.98, y: 8 }}
                transition={{ duration: 0.28, ease: EASE }}
              >
                <header className="flex shrink-0 items-center justify-between gap-4 border-b border-white/10 px-4 py-3 sm:px-7 sm:py-5">
                  <div className="min-w-0">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-crimson-2">Project · {activeProject.images.length} designs</p>
                    <h2 id="design-project-title" className="truncate font-display text-3xl tracking-wide text-bone sm:text-4xl">{activeProject.name}</h2>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveProject(null)}
                    aria-label="Close project"
                    className="focus-ring flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/20 text-2xl text-bone transition hover:border-white/50"
                  >
                    ×
                  </button>
                </header>
                <div
                  ref={projectScroll}
                  className="design-project-scroll min-h-0 flex-1 overflow-y-auto p-3 sm:p-6"
                  data-lenis-prevent
                  tabIndex={0}
                  aria-label={`${activeProject.name} designs`}
                >
                  <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
                    {activeProject.images.map((image, index) => (
                      <DesignImageCard
                        key={image.src}
                        image={image}
                        index={index}
                        liked={likedDesigns.includes(image.src)}
                        onLike={() => toggleLike(image.src)}
                        onOpen={() => openImage(image)}
                      />
                    ))}
                  </div>
                </div>
                <footer className="flex shrink-0 items-center justify-between border-t border-white/10 px-4 py-2 sm:px-7">
                  <span className="text-xs text-mist">Scroll to see all designs</span>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => projectScroll.current?.scrollBy({ top: -projectScroll.current.clientHeight * 0.75, behavior: 'smooth' })}
                      aria-label="Scroll designs up"
                      className="focus-ring flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-lg text-bone transition hover:border-white/50"
                    >
                      ↑
                    </button>
                    <button
                      type="button"
                      onClick={() => projectScroll.current?.scrollBy({ top: projectScroll.current.clientHeight * 0.75, behavior: 'smooth' })}
                      aria-label="Scroll designs down"
                      className="focus-ring flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-lg text-bone transition hover:border-white/50"
                    >
                      ↓
                    </button>
                  </div>
                </footer>
              </motion.div>
            </motion.div>
          )}
          {selectedImage && (
            <motion.div
              className="fixed inset-0 z-[120] flex items-center justify-center bg-black/95 p-3 sm:p-6"
              role="dialog"
              aria-modal="true"
              aria-labelledby="design-preview-title"
              onClick={() => setSelectedImage(null)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="relative flex h-[min(92dvh,1000px)] w-[min(94vw,1400px)] flex-col items-center justify-center gap-3"
                onClick={(event) => event.stopPropagation()}
                initial={{ scale: 0.98 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.98 }}
                transition={{ duration: 0.25, ease: EASE }}
              >
                <button
                  type="button"
                  onClick={() => setSelectedImage(null)}
                  aria-label="Close image preview"
                  className="focus-ring absolute right-0 top-0 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/70 text-2xl text-bone transition hover:border-white/50 sm:right-2 sm:top-2"
                >
                  ×
                </button>
                {previewError ? (
                  <p role="alert" className="rounded-lg border border-white/10 bg-ink-2 px-6 py-10 text-sm text-crimson-2">
                    Could not load this image.
                  </p>
                ) : (
                  <img
                    src={assetUrl(selectedImage.src)}
                    alt={selectedImage.alt}
                    onError={() => setPreviewError(true)}
                    className="max-h-[calc(100%-3rem)] max-w-full object-contain"
                  />
                )}
                <p id="design-preview-title" className="max-w-full truncate text-center text-sm font-medium text-bone">{selectedImage.alt}</p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </>
  );
}

function ProjectCard({ project, index, onOpen }: { project: DesignProject; index: number; onOpen: () => void }) {
  const cover = project.images[0];
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const tilt = (event: PointerEvent<HTMLButtonElement>) => {
    if (event.pointerType !== 'mouse') return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;
    setRotation({ x: (0.5 - y) * 7, y: (x - 0.5) * 7 });
  };

  return (
    <motion.button
      type="button"
      onClick={onOpen}
      onPointerMove={tilt}
      onPointerLeave={() => setRotation({ x: 0, y: 0 })}
      style={{ rotateX: rotation.x, rotateY: rotation.y, transformPerspective: 900 }}
      aria-label={`Open ${project.name} project, ${project.images.length} images`}
      className="focus-ring group/project relative w-[78vw] shrink-0 snap-start overflow-hidden rounded-xl border border-white/10 bg-ink-2 text-left transition hover:border-white/30 sm:w-[min(48vw,420px)] lg:w-[min(32vw,380px)]"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px -8% 0px 0px' }}
      transition={{ duration: 0.65, delay: Math.min(index, 5) * 0.06, ease: EASE }}
    >
      <div className="relative flex h-[clamp(210px,30vw,320px)] items-center justify-center overflow-hidden bg-black/30 p-3">
        <img
          src={assetUrl(cover.src)}
          alt=""
          width={cover.width}
          height={cover.height}
          loading="lazy"
          className="h-full w-full object-contain transition-transform duration-700 group-hover/project:scale-[1.04]"
        />
        <span className="absolute left-4 top-4 rounded-full border border-white/25 bg-black/55 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-bone backdrop-blur">
          {project.images.length} {project.images.length === 1 ? 'image' : 'images'}
        </span>
      </div>
      <div className="flex items-center justify-between gap-3 p-4 sm:p-5">
        <span className="truncate font-display text-2xl tracking-wide text-bone sm:text-3xl">{project.name}</span>
        <span aria-hidden className="shrink-0 text-xl text-crimson-2 transition-transform group-hover/project:translate-x-1">↗</span>
      </div>
    </motion.button>
  );
}

function DesignImageCard({
  image,
  index,
  liked,
  onLike,
  onOpen,
}: {
  image: DesignImage;
  index: number;
  liked: boolean;
  onLike: () => void;
  onOpen: () => void;
}) {
  const [imageError, setImageError] = useState(false);

  return (
    <motion.article
      className="group/design relative mb-4 break-inside-avoid overflow-hidden rounded-lg bg-black/30 ring-1 ring-white/10"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -6% 0px' }}
      transition={{ duration: 0.5, delay: Math.min(index, 5) * 0.04, ease: EASE }}
    >
      <button
        type="button"
        onClick={onOpen}
        aria-label={`View ${image.alt}`}
        className="focus-ring relative block w-full"
      >
        {imageError ? (
          <span role="img" aria-label={`${image.alt} could not be loaded`} className="flex min-h-48 items-center justify-center px-4 text-center text-sm text-mist">
            Image could not be loaded
          </span>
        ) : (
          <img
            src={assetUrl(image.src)}
            alt=""
            width={image.width}
            height={image.height}
            onError={() => setImageError(true)}
            className="block h-auto w-full transition-transform duration-500 group-hover/design:scale-[1.025]"
          />
        )}
        <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-3 pb-3 pt-10 text-left text-xs font-medium text-bone opacity-0 transition-opacity group-hover/design:opacity-100 group-focus-visible/design:opacity-100">
          {image.alt}
        </span>
      </button>
      <button
        type="button"
        onClick={onLike}
        aria-pressed={liked}
        aria-label={liked ? `Unlike ${image.alt}` : `Like ${image.alt}`}
        className={`focus-ring absolute right-2 top-2 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/60 text-lg shadow-lg backdrop-blur transition hover:scale-110 ${
          liked ? 'text-crimson-2' : 'text-bone'
        }`}
      >
        <span aria-hidden>{liked ? '♥' : '♡'}</span>
      </button>
    </motion.article>
  );
}
