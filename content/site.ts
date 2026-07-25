export type Project = {
  slug: string;
  title: string;
  blurb: string;
  status?: string;
  stack: string[];
  body: string[];
  note: { label: string; body: string };
  links: { label: string; href: string }[];
  shot?: { src: string; alt: string; caption: string };
};

export const projects: Project[] = [
  {
    slug: "a11y-agent",
    title: "a11y Agent",
    blurb:
      "An accessibility agent that isn't allowed to grade its own homework.",
    stack: ["Python", "Playwright", "axe-core", "GPT-4o-mini"],
    body: [
      "Scans a live page, proposes a context-aware fix for one of four issue types, applies it, re-scans to confirm the violation actually cleared, and retries once with the axe error as feedback before failing honestly.",
      "The model only makes judgment calls. axe-core owns detection and verification. Deterministic contrast fixes sit in the pipeline as a control case, and they caught two real bugs I would otherwise have shipped.",
    ],
    note: {
      label: "denominator",
      body: "73 to 76% is the share of axe-detected violations of the four supported types, across four live sites. Light text on a mid-tone background can't be fixed by changing text colour alone, so those get skipped rather than quietly counted as passes.",
    },
    links: [
      { label: "GitHub", href: "https://github.com/AditiV05/a11y-agent" },
    ],
    shot: { src: "", alt: "", caption: "before and after, one contrast fix" },
  },
  {
    slug: "documind",
    title: "DocuMind",
    blurb: "Document Q&A that has to survive two retrievers before it answers.",
    status: "live",
    stack: ["Next.js", "FastAPI", "Postgres + pgvector", "Langfuse"],
    body: [
      "Postgres full-text search and pgvector run side by side, and reciprocal rank fusion merges the two rankings. A passage has to place well on keyword match and on semantic similarity before it gets cited.",
      "The unglamorous half: PDFs are byte-validated before parsing, requests are rate limited per IP, there's a global daily cost cap so a bad day can't become a bad bill, and uploads delete themselves after thirty minutes.",
    ],
    note: {
      label: "trade-off",
      body: "Nothing is saved. One document at a time, no scanned PDFs, 120 page ceiling. Answers come from retrieved passages rather than the whole file, so it finds things better than it summarises them.",
    },
    links: [
      { label: "Live", href: "https://documind-web-mu.vercel.app" },
      { label: "Web", href: "https://github.com/AditiV05/documind-web" },
      { label: "API", href: "https://github.com/AditiV05/documind-api" },
    ],
  },
  {
    slug: "familiar",
    title: "Familiar",
    blurb: "A publishing platform with the boring parts done properly.",
    status: "live",
    stack: [
      "React",
      "Vite",
      "Node",
      "Express",
      "MongoDB",
      "JWT",
      "Google OAuth",
    ],
    body: [
      "Rich-text editor, infinite feed, threaded comments, likes, bookmarks, follows and in-app notifications. Frontend, backend and deployment, all mine.",
      "The auth surface is the part I'd point at. JWT sessions, Google OAuth with account linking, email verification and password reset on single-use expiring tokens. Auth endpoints return the same response whether or not an account exists, so you can't use them to find out who's registered.",
      "Notifications are created server-side on engagement events and isolated on purpose. A notification failing never breaks the like or comment that triggered it.",
    ],
    note: {
      label: "would change",
      body: "Built as a client-rendered SPA, so shared article links preview blank and Google struggles to index it. Wrong architecture for a publishing platform. Server rendered next time.",
    },
    links: [
      { label: "Live", href: "https://familiar-blog.vercel.app" },
      { label: "GitHub", href: "https://github.com/AditiV05/Familiar" },
    ],
  },
  {
    slug: "cafe-scrapbook",
    title: "Cafe Scrapbook",
    blurb: "Cafe discovery for Jaipur, ranked so new places can't game it.",
    status: "live",
    stack: ["React 19", "Vite", "Tailwind", "GPT-4o-mini", "Gemini fallback"],
    body: [
      "44 Jaipur cafes drawn from a public Zomato dataset, with natural language search. GPT-4o-mini parses the query, Gemini takes over when it doesn't.",
      "Ranking is a Bayesian weighted score rather than a raw average, so a cafe with four five-star reviews doesn't outrank one with two hundred good ones. Custom pixel-art interface, built and deployed solo.",
    ],
    note: {
      label: "two vintages",
      body: "All Zomato, but through two doors. 40 rows from a Kaggle dump, 5 transcribed from live pages much later. Same source, different timestamps, both frozen on arrival. The list isn't wrong, it just gets quietly incomplete.",
    },
    links: [
      { label: "Live", href: "https://cafe-scrapbook.vercel.app" },
      { label: "GitHub", href: "https://github.com/AditiV05/cafe-scrapbook" },
    ],
  },
  {
    slug: "asci-2025",
    title: "ASCI 2025",
    blurb: "The official site for an international academic conference.",
    status: "live",
    stack: ["React", "Vite", "React Router", "AOS", "Swiper"],
    body: [
      "Multi-page site for a conference at Manipal University Jaipur, with scroll-triggered animations and responsive carousels, serving attendees and organisers.",
    ],
    note: {
      label: "cost",
      body: "Content is hardcoded, no CMS. Every new speaker or moved date is a code edit and a redeploy, which only works while someone technical is attached to the project.",
    },
    links: [
      { label: "asciconference.in", href: "https://asciconference.in" },
      { label: "GitHub", href: "https://github.com/AditiV05/ASCI-aditi" },
    ],
  },
];

export const experience = {
  role: "Software engineering intern",
  org: "Indraprastha Power Generation & Pragati Power Corporation",
  meta: "Govt. of NCT Delhi · IT department · June to August 2026",
  body: [
    "Maintaining and shipping features on the company's live internal web portals, frontend and backend, for a power utility that serves Delhi.",
    "Directly accountable to the IT department for uptime, functionality and production stability of systems people use to do their jobs.",
  ],
  note: {
    label: "context",
    body: "Government infrastructure, so the constraint isn't move fast. It's don't break the thing that's already working.",
  },
};

export const toolkit = [
  {
    group: "languages",
    items: ["Python", "TypeScript", "JavaScript", "SQL", "C++"],
  },
  { group: "frontend", items: ["React", "Next.js", "Tailwind", "Vite"] },
  {
    group: "backend",
    items: ["FastAPI", "Node", "Express", "SSE", "JWT", "OAuth 2.0"],
  },
  {
    group: "data",
    items: ["PostgreSQL", "pgvector / HNSW", "MongoDB", "Supabase", "MySQL"],
  },
  {
    group: "ai & retrieval",
    items: [
      "RAG",
      "hybrid retrieval",
      "RRF",
      "OpenAI API",
      "Gemini",
      "Langfuse",
    ],
  },
  {
    group: "tools",
    items: ["Git", "Playwright", "axe-core", "Vercel", "Railway", "Render"],
  },
];
