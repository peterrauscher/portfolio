import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import {
  jobs,
  links,
  person,
  posts,
  projects,
  stack,
} from "../_shared/content";
import { serif } from "../_shared/fonts";
import { Surface } from "../_shared/surface";
import { Clock } from "./clock";
import { PHOTOS } from "@/data/photos";

const INK = "#121F3E";
const MUTED = "#8D98AF";

const CSS = `
.v8 a.v8-link { color: ${INK}; text-decoration: underline; text-underline-offset: 4px; text-decoration-thickness: 1px; text-decoration-color: color-mix(in oklab, ${INK} 35%, transparent); }
.v8 a.v8-link:hover { text-decoration-color: ${INK}; }
@keyframes v8-marquee { to { transform: translateX(-50%); } }
.v8-track { animation: v8-marquee 48s linear infinite; }
.v8-strip:hover .v8-track { animation-play-state: paused; }
@media (prefers-reduced-motion: reduce) {
  .v8-track { animation: none; }
}
`;

const shots = [
  PHOTOS.hill,
  PHOTOS.runner,
  PHOTOS.courtyard,
  PHOTOS.cyclist,
  PHOTOS.slats,
  PHOTOS.curve,
];

function Break({ children }: { children: ReactNode }) {
  return (
    <p
      className="mt-20 border-t pt-4 text-[13px]"
      style={{ borderColor: `${INK}14`, color: MUTED }}
    >
      <span aria-hidden>↘ </span>({children})
    </p>
  );
}

function Aside({ children }: { children: ReactNode }) {
  return (
    <span className="ml-2 text-[15px] font-normal" style={{ color: MUTED }}>
      {children}
    </span>
  );
}

export default function V8() {
  const roles = jobs.flatMap((j) =>
    j.roles.map((r) => ({ ...r, company: j.company, href: j.href })),
  );
  return (
    <Surface
      current="/lab/v8"
      className="v8 font-sans"
      style={{ background: "#fff", color: INK } as CSSProperties}
    >
      <style>{CSS}</style>
      <main className="mx-auto max-w-[680px] px-6 pt-8 pb-32">
        <p
          className="flex flex-wrap gap-x-2 text-[13px]"
          style={{ color: MUTED }}
        >
          <span style={{ color: INK }}>{person.name}</span>
          <span>·</span>
          <span>
            {person.location} — <Clock />
          </span>
        </p>

        <h1 className="mt-16 max-w-[14ch] text-[44px] leading-[1.12] font-medium tracking-[-0.02em] sm:text-[52px]">
          Sites faster, cloud bills{" "}
          <em className={`${serif.className} font-normal`}>smaller</em>.
        </h1>
        <p
          className="mt-5 max-w-[34ch] text-[18px] leading-[1.6]"
          style={{ color: MUTED }}
        >
          Backend and infra. The wins I like are the ones you don&apos;t see.
        </p>

        <div className="mt-14 flex items-end gap-6">
          <Image
            src="/portrait.webp"
            alt={person.name}
            width={168}
            height={210}
            priority
            className="h-[210px] w-[168px] rounded-[18px] object-cover"
          />
          <div className="pb-1">
            <p className="text-[28px] leading-[1.15] font-medium tracking-[-0.02em] sm:text-[32px]">
              {person.name.split(" ")[0]}
              <br />
              {person.name.split(" ")[1]}
            </p>
            <p
              className="mt-3 max-w-[28ch] text-[15px] leading-relaxed"
              style={{ color: MUTED }}
            >
              {person.current.roles[0].title} at {person.current.company}.{" "}
              {person.location}.
            </p>
          </div>
        </div>

        <p className="mt-12 text-[20px] leading-[1.55] sm:text-[22px]">
          Senior software engineer working on tools for CPG brands. Most of my
          career has been distributed systems, data pipelines, and cloud spend.
        </p>
        <p
          className="mt-5 text-[20px] leading-[1.55] sm:text-[22px]"
          style={{ color: MUTED }}
        >
          Off hours I tinker with agent harnesses and a small software factory
          of my own. If you want to talk a bit longer:
        </p>
        <p className="mt-6 text-[20px] sm:text-[22px]">
          <a className="v8-link" href={`mailto:${person.email}`}>
            {person.email}
          </a>
          <Aside>(Email)</Aside>
        </p>

        <Break>Work</Break>
        <ul className="mt-8 space-y-6">
          {roles.map((r) => (
            <li
              key={`${r.company}-${r.title}-${r.start}`}
              className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
            >
              <p className="text-[17px] leading-snug">
                {r.title}
                <Aside>
                  ({r.start} – {r.end})
                </Aside>
              </p>
              <a className="v8-link shrink-0 text-[17px]" href={r.href}>
                {r.company.replace(" Corporation", "")}
              </a>
            </li>
          ))}
        </ul>

        <Break>Writing</Break>
        <ul className="mt-8 space-y-4">
          {posts.slice(0, 6).map((p) => (
            <li
              key={p.slug}
              className="text-[18px] leading-snug sm:text-[20px]"
            >
              <Link className="v8-link" href={`/blog/${p.slug}`}>
                {p.title}
              </Link>
              <Aside>({p.year})</Aside>
            </li>
          ))}
        </ul>
        <Link
          href="/blog"
          className="mt-6 inline-block text-[15px] hover:underline"
          style={{ color: MUTED }}
        >
          All {posts.length} essays →
        </Link>

        <Break>Elsewhere</Break>
        <ul className="mt-8 space-y-4 text-[18px] sm:text-[20px]">
          <li>
            <Link className="v8-link" href="/ai-stack">
              What I actually run
            </Link>
            <Aside>(AI stack, {stack.total}/mo)</Aside>
          </li>
          <li>
            <a className="v8-link" href={projects[0].href}>
              {projects[0].title}
            </a>
            <Aside>(an app I ship)</Aside>
          </li>
          {links.map((l) => (
            <li key={l.label}>
              <a className="v8-link" href={l.href}>
                {l.label}
              </a>
              <Aside>({l.handle})</Aside>
            </li>
          ))}
        </ul>

        <p className="mt-20 text-[26px] leading-[1.3] font-medium tracking-[-0.02em] sm:text-[30px]">
          Stand-in photographs, until I swap in my own.
        </p>
        <div className="v8-strip -mx-6 mt-8 overflow-hidden">
          <div className="v8-track flex w-max gap-3 px-6">
            {[...shots, ...shots].map((photo, i) => (
              <Image
                key={`${photo.src}-${i}`}
                src={photo.src}
                alt={i < shots.length ? photo.alt : ""}
                width={280}
                height={210}
                sizes="280px"
                className="h-[168px] w-[220px] shrink-0 rounded-[18px] object-cover sm:h-[190px] sm:w-[250px]"
                draggable={false}
              />
            ))}
          </div>
        </div>
        <p className="mt-3 text-[12px] italic" style={{ color: MUTED }}>
          Unsplash, for now.
        </p>

        <div
          className="mt-24 border-t pt-10"
          style={{ borderColor: `${INK}14` }}
        >
          <div className="flex flex-wrap items-end justify-between gap-6">
            <p className="text-[36px] leading-none font-medium tracking-[-0.03em] sm:text-[44px]">
              Let&apos;s talk
              <em className={`${serif.className} font-normal`}>.</em>
            </p>
            <a className="v8-link text-[18px]" href={`mailto:${person.email}`}>
              {person.email}
            </a>
          </div>
        </div>
      </main>
    </Surface>
  );
}
