/**
 * Central portfolio data — generated from Sushmita's resume (Sushmita_dasari.pdf).
 * Every fact on the site comes from this file. Update it here and the whole site follows.
 * Nothing here should be added unless it appears on the resume.
 */

export type Palette = { from: string; via: string; to: string; accent: string };

export const profile = {
  fullName: 'Vemu Sanjeev Goud',
displayName: 'Sanjeev Goud',
firstName: 'Sanjeev',
seriesTag: 'THE SERIES',
originalLabel: 'A LONER ORIGINAL',
role: 'Graphic Designer',
tagline: ['Graphic Designer', 'Photoshop', 'AI Creative'],
intro:
  'A B.Tech Computer Science graduate and creative graphic designer specializing in Photoshop, photo manipulation, retouching, social media designs, YouTube graphics and AI-powered creative work.',
location: 'Kakinada, Andhra Pradesh',
email: 'sanjeevgoud07@gmail.com',
links: {
  linkedin: 'https://www.linkedin.com/in/sanjeev-goud-1a976a16a/',
  github: 'https://github.com/SanjeevGoud07',
},
resumePdf: '/assets/Sanjeev_Goud_Resume.pdf',
portrait: {
  src: '/assets/portrait-720.webp',
  srcSet: '/assets/portrait-420.webp 420w, /assets/portrait-720.webp 720w, /assets/portrait-1100.webp 1100w',
  alt: 'Portrait of Vemu Sanjeev Goud',
},
interests: ['Photoshop', 'AI Tools', 'Graphic Design'],
}

export const education = [
  {
    school: 'Karunya Institute of Technology and Sciences',
    place: 'Coimbatore',
    degree: 'Bachelor of Technology — Computer Science and Engineering',
    period: 'July 2017 – June 2021',
    score: 'CGPA 8.10',
  },
  {
    school: 'Sasi Junior College',
    place: 'Velivennu',
    degree: 'BIEAP — MPC',
    period: 'June 2015 – May 2017',
    score: 'Score 974/1000',
  },
];

export const experience = [
  {
    company: 'Karunya Institute of Technology and Sciences',
    role: 'Student Graphic Designer',
    place: 'Coimbatore, TN',
    period: 'November 2019 – June 2021',
    points: [
      'Created posters, banners, social media graphics, event creatives, and other visual materials for college activities and student events.',
  'Worked closely with students, faculty, and event teams to understand design requirements and deliver creative materials on time.',
  'Developed practical skills in Photoshop, photo editing, retouching, background removal, typography, color correction, and visual composition.',
  'Collaborated with other students on college projects and events, strengthening teamwork, communication, creativity, and time-management skills.',
    ],
  },
];

export type Metric = { value: string; label: string };

export type Project = {
  id: string;
  title: string;
  year: string;
  genre: string;
  logline: string;
  stack: string[];
  build: string[];
  features: string[];
  metrics: Metric[];
  /** Omit when the repository isn't public — the GitHub button is hidden instead of linking to a 404. */
  github?: string;
  palette: Palette;
  motif: 'shield' | 'flow' | 'tenants';
};

export const projects: Project[] = [
  {
    id: 'policyguard-ai',
    title: 'PolicyGuard AI',
    year: '2026',
    genre: 'AI • NLP • LLM',
    logline: 'An AI-powered policy analysis platform across web, browser extension, mobile and desktop applications.',
    stack: ['Python', 'NLP', 'LLM', 'REST API'],
    build: [
      'Built an AI-powered policy analysis platform across web, browser extension, mobile, and desktop applications, processing 500+ policy documents with 92% accuracy and reducing manual review time by 60% across 8 policy categories.',
      'Engineered LLM-based Q&A, key-information extraction, and REST API integration for 10+ document types, enabling real-time policy insights and reducing decision turnaround time by 45%.',
    ],
    features: [
      'LLM-based Q&A over policy documents',
      'Key-information extraction',
      'REST API integration for 10+ document types',
      'Web, browser extension, mobile & desktop apps',
      'Real-time policy insights',
    ],
    metrics: [
      { value: '500+', label: 'policy documents processed' },
      { value: '92%', label: 'accuracy' },
      { value: '60%', label: 'less manual review time' },
      { value: '45%', label: 'faster decision turnaround' },
      { value: '8', label: 'policy categories' },
    ],
    // The resume links to https://github.com/Sushmitadasari/PolicyGuard-AI, which is not public yet (404).
    // Add `github: 'https://github.com/Sushmitadasari/PolicyGuard-AI',` back once the repo is public.
    palette: { from: '#2a0610', via: '#7a0f24', to: '#0b0710', accent: '#ff3d5a' },
    motif: 'shield',
  },
  {
    id: 'payment-gateway',
    title: 'Payment Gateway System',
    year: '2026',
    genre: 'Full-Stack • Fintech • Microservices',
    logline: 'A full-stack UPI & card payment gateway built around a strict payment state machine.',
    stack: ['Node.js', 'Express', 'PostgreSQL', 'React', 'Docker'],
    build: [
      'Built full-stack UPI & card payment gateway processing 1,000+ transactions at 99.8% uptime with a strict payment state machine (processing → success/failed).',
      'Dockerized microservice architecture cut deployment setup by 70%; backend optimizations reduced API response time by 40% and tripled throughput under load.',
    ],
    features: [
      'UPI & card payments',
      'Strict payment state machine (processing → success / failed)',
      'Dockerized microservice architecture',
      'Backend optimizations for load',
    ],
    metrics: [
      { value: '1,000+', label: 'transactions processed' },
      { value: '99.8%', label: 'uptime' },
      { value: '70%', label: 'less deployment setup' },
      { value: '40%', label: 'faster API response' },
      { value: '3×', label: 'throughput under load' },
    ],
    github: 'https://github.com/Sushmitadasari/Payment-gateway-system-Project',
    palette: { from: '#1a0d02', via: '#8a4a07', to: '#0a0806', accent: '#ffb547' },
    motif: 'flow',
  },
  {
    id: 'multi-tenant-saas',
    title: 'Multi-Tenant SaaS Platform',
    year: '2026',
    genre: 'SaaS • Security • DevOps',
    logline: 'Shared-database multi-tenancy with strict tenant isolation and 4-level JWT/RBAC.',
    stack: ['Node.js', 'React', 'PostgreSQL', 'Docker Compose'],
    build: [
      'Architected shared-database multi-tenancy for 50+ concurrent tenants with strict tenant_id isolation and 4-level JWT/RBAC, achieving zero unauthorized-access incidents across 200+ users.',
      'Implemented Docker Compose one-command deployment, reducing environment setup time from 45 minutes to under 2 minutes.',
    ],
    features: [
      'Shared-database multi-tenancy',
      'Strict tenant_id isolation',
      '4-level JWT / RBAC',
      'One-command Docker Compose deployment',
    ],
    metrics: [
      { value: '50+', label: 'concurrent tenants' },
      { value: '200+', label: 'users' },
      { value: '0', label: 'unauthorized-access incidents' },
      { value: '45m → <2m', label: 'environment setup time' },
    ],
    github: 'https://github.com/Sushmitadasari/Multi-Tenant-SaaS-Platform',
    palette: { from: '#04121f', via: '#0f4c6e', to: '#05080d', accent: '#4cc9ff' },
    motif: 'tenants',
  },
];

export type Achievement = {
  id: string;
  title: string;
  org: string;
  detail: string;
  laurel: string;
  link?: string;
};

export const achievements: Achievement[] = [
  {
    id: 'algouniversity',
    title: 'Tech Fellow',
    org: 'AlgoUniversity',
    detail: 'Selected through competitive national selection — advanced DSA, algorithm optimization, and competitive coding.',
    laurel: 'National Selection',
  },

];

export type Certification = { issuer: string; name: string; link: string };

export const certifications: Certification[] = [
  { issuer: 'NPTEL', name: 'Database Management System', link: 'https://drive.google.com/file/d/1MqkJHchXeaGD4S8mzPmEGxEYddAsxAjN/view?usp=drive_link' },
];

export type Skill = { name: string; mono: string; note?: string };
export type SkillCategory = { id: string; title: string; subtitle: string; skills: Skill[] };

export const skillCategories: SkillCategory[] = [
  {
    id: 'languages',
    title: 'Core SKills',
    subtitle: 'Photoshop is my Main Domain',
    skills: [
      { name: 'Photoshop', mono: 'Ps',note: 'Primary' },
      { name: 'Illustrator', mono: 'Il', note: 'Secondary' },
      { name: 'Premiere Pro', mono: 'Pr', note: 'Basic' },
    ],
  },
  {
    id: 'languages',
    title: 'Languages',
    subtitle: 'Python is the primary language',
    skills: [
      { name: 'Python', mono: 'Py',note: 'Primary' },
      { name: 'Java', mono: 'Jv', note: 'Basic' },
    ],
  },
  {
    id: 'frontend',
    title: 'Frontend',
    subtitle: 'Interfaces & the web platform',
    skills: [
      { name: 'HTML', mono: 'Ht' },
      { name: 'CSS', mono: 'Cs' },
      { name: 'JavaScript', mono: 'Js' },
    ],
  },
  {
    id: 'databases',
    title: 'Databases',
    subtitle: 'Indexing • Normalization',
    skills: [
      { name: 'MySQL', mono: 'My' },
      { name: 'SQLite', mono: 'SQL' },
    ],
  },
  {
    id: 'fundamentals',
    title: 'CS Fundamentals',
    subtitle: 'The foundations',
    skills: [
      { name: 'OOPs', mono: 'Oo' },
    ],
  },
  {
    id: 'interests',
    title: 'Interests',
    subtitle: 'Coming soon to the series',
    skills: [
      { name: 'Prompt Enginnering', mono: 'Pe' },
      { name: 'AI', mono: 'Ai' },
      { name: '3D Designing', mono: '3d' },
    ],
  },
];

/**
 * Factual cross-references shown when a skill card is hovered/tapped:
 * where the skill appears in the projects, certifications or achievements on the resume.
 */
export const skillEvidence: Record<string, string[]> = {
  Java: ['Oracle Java Certified Foundations Associate', 'HackerRank 5-star'],
  Python: ['PolicyGuard AI', 'Cisco Python Essentials 1', 'HackerRank 5-star'],
  C: ['HackerRank 5-star'],
  React: ['Payment Gateway System', 'Multi-Tenant SaaS Platform'],
  HTML: ['Pearson IT Specialist – HTML and CSS', 'Cisco HTML Essentials'],
  CSS: ['Pearson IT Specialist – HTML and CSS', 'Cisco CSS Essentials'],
  JavaScript: ['Cisco JavaScript Essentials 1 & 2'],
  'Node.js': ['Payment Gateway System', 'Multi-Tenant SaaS Platform'],
  'Express.js': ['Payment Gateway System'],
  Docker: ['Payment Gateway System'],
  'Docker Compose': ['Multi-Tenant SaaS Platform'],
  'REST APIs': ['PolicyGuard AI'],
  Microservices: ['Payment Gateway System'],
  'JWT Auth': ['Multi-Tenant SaaS Platform'],
  'Git / GitHub': ['GitHub Foundations'],
  PostgreSQL: ['Payment Gateway System', 'Multi-Tenant SaaS Platform'],
  MongoDB: ['MongoDB Certified Associate Developer'],
  DBMS: ['NPTEL Database Management System', 'Oracle Database Foundations'],
  DSA: ['AlgoUniversity Tech Fellow', '850+ problems solved'],
  'Cloud Computing (AWS)': ['AWS Certified AI Practitioner', 'AWS Academy Cloud Foundations'],
  'Machine Learning': ['B.Tech AI & ML', 'NPTEL Deep Learning'],
};

export type Episode = {
  code: string;
  title: string;
  description: string;
  tags: string[];
  runtime: string;
  palette: Palette;
};

export type Season = {
  number: number;
  title: string;
  period: string;
  synopsis: string;
  episodes: Episode[];
};

const crimson: Palette = { from: '#24060b', via: '#6e0d1d', to: '#09070a', accent: '#ff3d5a' };
const amber: Palette = { from: '#1c1003', via: '#6b3c06', to: '#0a0806', accent: '#ffb547' };
const ocean: Palette = { from: '#04121f', via: '#0f4c6e', to: '#05080d', accent: '#4cc9ff' };
const violet: Palette = { from: '#120822', via: '#3d1a6e', to: '#07060c', accent: '#b98bff' };
const jade: Palette = { from: '#03150f', via: '#0d5a40', to: '#050a08', accent: '#46e3a8' };

export const seasons: Season[] = [
  {
    number: 1,
    title: 'The Beginning',
    period: '2015 – 2017',
    synopsis: 'Intermediate years at Sasi Junior College, Velivennu — Mathematics, Physics and Chemistry.',
    episodes: [
      {
        code: 'S01 E01',
        title: 'The Foundation',
        description: 'BIEAP, MPC at Sasi Junior College, Velivennu — finishing with a score of 974/1000.',
        tags: ['MPC', 'BIEAP'],
        runtime: 'Jun 2015 – May 2017',
        palette: amber,
      },
    ],
  },
  {
    number: 2,
    title: 'Enter: CSE',
    period: '2017 – 2021',
    synopsis: 'B.Tech in Computer Science and Engineering at Karunya Institute of Technology and Sciences, Coimbatore.',
    episodes: [
      {
        code: 'S02 E01',
        title: 'THE LEARNER',
        description: 'Started the engineering journey at Karunya, exploring computer science, learning new concepts and adapting to college life.',
        tags: ['Learning','Curiosity', 'Adaptability', 'Foundations'],
        runtime: 'The Beginning Of College Life',
        palette: violet,
      },
      {
        code: 'S02 E02',
        title: 'THE CODER',
        description: 'Began exploring programming languages, writing code and understanding the fundamentals of software development.',
        tags: ['Programming', 'Python', 'SQL', 'Coding'],
        runtime: 'Discovering Programming',
        palette: crimson,
      },
      {
        code: 'S02 E03',
        title: 'THE LOGIC SEEKER',
        description: 'Learned to break down problems, understand programming logic, debug errors and approach technical challenges step by step.',
        tags: ['Logical Thinking', 'Debugging', 'Problem Solving'],
        runtime: 'Developing Problem-Solving Skills',
        palette: jade,
      },
      {
        code: 'S02 E04',
        title: 'THE TECH EXPLORER',
        description: 'Expanded knowledge of databases, web technologies and computer science concepts while discovering different areas of technology.',
        tags: ['Databases', 'Web Technologies', 'Computer Science'],
        runtime: 'Exploring computer science',
        palette: ocean,
      },
    ],
  },
  {
    number: 3,
    title: 'The Creative Side',
    period: '2019 – 2021',
    synopsis: 'Discovering creativity alongside engineering.',
    episodes: [
      {
        code: 'S03 E01',
        title: 'THE DESIGNER',
        description: 'Developed an interest in graphic design, exploring Photoshop, photo manipulation, typography and digital creativity.',
        tags: ['Photoshop', 'Graphic Design', 'Photo Editing'],
        runtime: 'Discovering graphic design',
        palette: ocean,
      },
      {
        code: 'S03 E02',
        title: 'THE VISUAL ARTIST',
        description: 'Contributed as a graphic designer in a student-led organization, creating visual content and bringing creative ideas to life.',
        tags: ['Creative Design', 'Photoshop', 'Visual Content'],
        runtime: 'Design contributions',
        palette: violet,
      },
      {
        code: 'S03 E03',
        title: 'THE CREATIVE THINKER',
        description: 'Explored visual storytelling, color theory, composition and typography to transform ideas into engaging designs.',
        tags: ['Visual Storytelling', 'Color Theory', 'Composition'],
        runtime: 'Developing a design mindset',
        palette: jade,
      },
    ],
  },
  {
    number: 4,
    title: 'Building Real Products',
    period: '2026',
    synopsis: 'Three Originals — an AI platform, a payment gateway and a multi-tenant SaaS — plus national-level recognition.',
    episodes: [
      {
        code: 'S04 E01',
        title: 'The AI Builder',
        description: 'PolicyGuard AI — LLM-based Q&A and key-information extraction across 500+ policy documents at 92% accuracy.',
        tags: ['Python', 'NLP', 'LLM'],
        runtime: '2026',
        palette: crimson,
      },
      {
        code: 'S04 E02',
        title: 'The Architect',
        description: 'Payment Gateway System and Multi-Tenant SaaS Platform — state machines, microservices, tenant isolation and RBAC.',
        tags: ['Node.js', 'PostgreSQL', 'Docker'],
        runtime: '2026',
        palette: amber,
      },
      {
        code: 'S04 E03',
        title: 'The Fellow',
        description: 'Selected as a Tech Fellow at AlgoUniversity and reached the Semi-Finals of Flipkart GRiD 7.0.',
        tags: ['AlgoUniversity', 'Flipkart GRiD 7.0'],
        runtime: 'National stage',
        palette: ocean,
      },
    ],
  },
  {
    number: 5,
    title: "What's Next",
    period: 'Now streaming',
    synopsis: 'The interests on the resume point to the next arc of the story.',
    episodes: [
      {
        code: 'S05 E01',
        title: 'The Next Chapter',
        description: 'Exploring Artificial Intelligence, AI Prompt Engineering, generative AI tools and creative automation.',
        tags: ['Artificial Intelligence', 'AI Prompting', 'Generative AI', 'Creative Automation'],
        runtime: 'In production',
        palette: violet,
      },
    ],
  },
];

export type TopPick = { label: string; title: string; detail: string; palette: Palette };

export const topPicks: TopPick[] = [
  { label: 'ROLE', title: 'Graphic Designer', detail: 'Creative expression & visual storytelling', palette: amber },
  { label: 'PRIMARY SKILL', title: 'Adobe Photoshop', detail: 'Photo manipulation, retouching & editing', palette: crimson },
  { label: 'Primary language', title: 'Python', detail: 'Programming & logical problem-solving', palette: ocean },
  { label: 'INTEREST', title: 'Artificial Intelligence', detail: 'Exploring AI technologies & possibilities', palette: violet },
  { label: 'CREATIVE INTEREST', title: 'AI Prompting', detail: 'Prompt engineering & AI-generated creativity', palette: jade },
  { label: 'DATABASE SKILL', title: 'SQL', detail: 'Database queries & data management', palette: amber },
  { label: 'CREATIVE TOOL', title: 'Premiere Pro', detail: 'Video Editing & visual storytelling', palette: crimson },
];

/** Slides for the "▶ Play Intro" cinematic sequence. */
export type IntroSlide = { kicker: string; title: string; lines: string[]; chips?: string[] };

export const introSlides: IntroSlide[] = [
  {
    kicker: 'Education',
    title: 'B.Tech · AI & ML',
    lines: ['Aditya Engineering College, Surampalem', 'October 2023 – Present'],
    chips: ['CGPA 9.10'],
  },
  {
    kicker: 'Skills',
    title: 'Java first.',
    lines: ['Python, C, C++ · React, Node.js, Express.js', 'PostgreSQL, MongoDB, MySQL · Docker, REST, JWT'],
    chips: ['Java', 'Python', 'React', 'Node.js', 'Docker', 'PostgreSQL'],
  },
  {
    kicker: 'Training',
    title: 'The Training Arc',
    lines: ['One year of intensive Full‑Stack Development training', 'Trainee · Technical Hub Pvt Ltd · May 2025 – June 2026', 'Frontend · Backend · Databases · Deployment'],
  },
  {
    kicker: 'Projects',
    title: 'Three Originals',
    lines: ['PolicyGuard AI — 500+ documents, 92% accuracy', 'Payment Gateway — 1,000+ transactions, 99.8% uptime', 'Multi-Tenant SaaS — 50+ tenants, zero unauthorized access'],
  },
  {
    kicker: 'Achievements',
    title: 'Top Moments',
    lines: ['Tech Fellow — AlgoUniversity', 'Semi-Finalist — Flipkart GRiD 7.0', 'AIML Branch Topper — 9.24 SGPA'],
  },
  {
    kicker: 'Certified',
    title: '16 Certifications',
    lines: ['AWS · MongoDB · Oracle · GitHub · Pearson', 'NPTEL · Cisco · Udemy'],
  },
  {
    kicker: 'Current mission',
    title: 'Now exploring',
    lines: ['System Design · Cloud Computing (AWS) · Machine Learning'],
  },
];

export type ProfileId = 'sanjeev' | 'recruiter' | 'designer' | 'creative';
export type SectionId = 'about' | 'journey' | 'originals' | 'designs' | 'picks' | 'skills' | 'moments' | 'story';

export const viewerProfiles: {
  id: ProfileId;
  name: string;
  blurb: string;
  color: string;
  order: SectionId[];
}[] = [
  {
    id: 'sanjeev',
    name: 'Sanjeev',
    blurb: 'The full series, in order',
    color: '#e5132b',
    order: ['about', 'journey', 'originals', 'designs', 'picks', 'skills', 'moments', 'story'],
  },
  {
    id: 'recruiter',
    name: 'Recruiter',
    blurb: 'Resume, achievements & skills first',
    color: '#4cc9ff',
    order: ['story', 'moments', 'skills', 'originals', 'designs', 'about', 'journey', 'picks'],
  },
  {
    id: 'designer',
    name: 'Designer',
    blurb: 'Projects, stack & GitHub first',
    color: '#46e3a8',
    order: ['originals', 'designs', 'skills', 'journey', 'moments', 'about', 'picks', 'story'],
  },
  {
    id: 'creative',
    name: 'Creative',
    blurb: 'The story arc & highlights first',
    color: '#ffb547',
    order: ['journey', 'picks', 'originals', 'designs', 'moments', 'about', 'skills', 'story'],
  },
];

export const sectionMeta: Record<SectionId, { nav: string; card: string; meta: string; palette: Palette }> = {
  about: { nav: 'About', card: 'About Me', meta: 'The Pilot • Education & training', palette: violet },
  journey: { nav: 'Journey', card: 'My Journey', meta: `${seasons.length} Seasons • ${seasons.reduce((n, s) => n + s.episodes.length, 0)} Episodes`, palette: amber },
  originals: { nav: 'Originals', card: 'My Projects', meta: `${projects.length} Originals • 2026`, palette: crimson },
  designs: { nav: 'My Designs', card: 'My Designs', meta: 'Graphic design portfolio', palette: violet },
  picks: { nav: 'Top Picks', card: 'Top Picks', meta: 'Top 10 from the resume', palette: jade },
  skills: { nav: 'Skills', card: 'My Skills', meta: `${skillCategories.length} Categories`, palette: ocean },
  moments: { nav: 'Moments', card: 'My Achievements', meta: `${achievements.length} Moments • ${certifications.length} Certifications`, palette: crimson },
  story: { nav: 'Resume', card: 'The Full Story', meta: 'Resume • View & download', palette: violet },
};
