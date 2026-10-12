import { DATA } from "@/data/resume";
import { sortPostsByDate } from "@/lib/posts";
import { allPosts } from "content-collections";

export type Post = {
  slug: string;
  title: string;
  summary: string;
  publishedAt: string;
  year: string;
  dateLabel: string;
  words: number;
  minutes: number;
};

export type Role = { title: string; start: string; end: string };

export type Job = {
  company: string;
  href: string;
  location: string;
  start: string;
  end: string;
  /** Newest first, matching DATA.work. */
  roles: Role[];
  /** Oldest → newest title path, e.g. "Software Engineer I → Software Engineer II". */
  progression: string;
  summary: string;
};

export type Link = { label: string; href: string; handle: string };

const WORDS_PER_MINUTE = 230;

export const posts: Post[] = sortPostsByDate(allPosts).map((post) => {
  const date = new Date(post.publishedAt);
  const words = post.content
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/<[^>]+>/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
  return {
    slug: post._meta.path.replace(/\.mdx$/, ""),
    title: post.title,
    summary: post.summary,
    publishedAt: post.publishedAt,
    year: String(date.getUTCFullYear()),
    dateLabel: date.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
      timeZone: "UTC",
    }),
    words,
    minutes: Math.max(1, Math.round(words / WORDS_PER_MINUTE)),
  };
});

export const writingTotals = {
  count: posts.length,
  words: posts.reduce((sum, p) => sum + p.words, 0),
  minutes: posts.reduce((sum, p) => sum + p.minutes, 0),
};

const yearOf = (label: string) =>
  label === "Present" ? "Now" : (label.match(/\d{4}/)?.[0] ?? label);

/** Collapse consecutive roles at the same company into one entry. */
const grouped = DATA.work.reduce<Omit<Job, "progression">[]>((acc, w) => {
  const last = acc.at(-1);
  const role = { title: w.title, start: w.start, end: w.end };
  if (last && last.company === w.company) {
    last.roles.push(role);
    last.start = yearOf(w.start);
    return acc;
  }
  acc.push({
    company: w.company,
    href: w.href,
    location: w.location,
    start: yearOf(w.start),
    end: yearOf(w.end),
    roles: [role],
    summary: w.description,
  });
  return acc;
}, []);

export const jobs: Job[] = grouped.map((j) => ({
  ...j,
  progression: j.roles
    .map((r) => r.title)
    .toReversed()
    .join(" → "),
}));

export const projects = DATA.projects.map((p) => ({
  title: p.title,
  href: p.href,
  dates: p.dates,
  active: p.active,
  description: p.description,
  technologies: [...p.technologies],
}));

export const education = DATA.education.map((e) => ({
  school: e.school,
  href: e.href,
  degree: e.degree,
  start: e.start,
  end: e.end,
}));

export const links: Link[] = [
  {
    label: "GitHub",
    href: DATA.contact.social.GitHub.url,
    handle: "peterrauscher",
  },
  {
    label: "LinkedIn",
    href: DATA.contact.social.LinkedIn.url,
    handle: "in/peter-rauscher",
  },
  {
    label: "Email",
    href: `mailto:${DATA.contact.email}`,
    handle: DATA.contact.email,
  },
];

/** Mirrors /ai-stack; prototype-only copy so the homepage can preview it. */
export const stack = {
  updated: "Sep 29, 2026",
  tools: [
    {
      name: "omp",
      href: "https://omp.sh/",
      role: "Coding harness, daily driver",
    },
    {
      name: "Tern",
      href: "https://stencil.so/tern",
      role: "Terminal + agent IDE",
    },
    { name: "pen.dev", href: "https://pen.dev", role: "UI exploration" },
    {
      name: "Tailscale",
      href: "https://tailscale.com",
      role: "Homelab tunnel",
    },
    {
      name: "Termius",
      href: "https://termius.com/index.html",
      role: "omp from my phone",
    },
  ],
  subscriptions: [
    { provider: "Anthropic", plan: "Claude", monthly: "$200" },
    { provider: "OpenAI", plan: "Codex", monthly: "$100" },
    { provider: "OpenCode Go", plan: "deepseek credits", monthly: "$10" },
    { provider: "DeepInfra", plan: "pay-as-you-go", monthly: "~$5–10" },
    { provider: "xAI", plan: "via X Premium", monthly: "$8" },
  ],
  total: "~$323–328",
};

export const person = {
  name: DATA.name,
  location: DATA.location,
  email: DATA.contact.email,
  current: jobs[0],
};

export const buildDate = new Date().toLocaleDateString("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});
