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
import { Surface } from "../_shared/surface";
import { PHOTOS, type Photo } from "@/data/photos";

const INK = "#070807";
const LIME = "#C6F135";
const FIELD = "#F2F2EF";
const MUTED = "#6E6E68";

function Arrow({ tone = "light" }: { tone?: "light" | "dark" | "lime" }) {
  const tones = {
    light: "bg-white text-black",
    dark: "bg-black text-white",
    lime: "bg-[var(--lime)] text-black",
  };
  return (
    <span
      aria-hidden
      className={`grid size-9 shrink-0 place-items-center rounded-full ${tones[tone]}`}
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path
          d="M3 11 11 3M11 3H5M11 3v6"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

function Sheet({
  children,
  className = "",
  tone = "white",
}: {
  children: ReactNode;
  className?: string;
  tone?: "white" | "dark" | "lime";
}) {
  const tones = {
    white: "bg-white text-[var(--ink)]",
    dark: "bg-[var(--ink)] text-white",
    lime: "bg-[var(--lime)] text-[var(--ink)]",
  };
  return (
    <section
      className={`rounded-[28px] px-6 py-8 sm:px-10 sm:py-12 ${tones[tone]} ${className}`}
    >
      {children}
    </section>
  );
}

function PhotoCard({
  photo,
  href,
  caption,
  className = "",
  priority = false,
}: {
  photo: Photo;
  href: string;
  caption: string;
  className?: string;
  priority?: boolean;
}) {
  const external = /^(https?:|mailto:)/.test(href);
  const inner = (
    <>
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        sizes="(min-width: 1024px) 340px, 100vw"
        priority={priority}
        className="object-cover"
      />
      <span className="absolute top-3 right-3">
        <Arrow />
      </span>
      <span className="absolute inset-x-3 bottom-3 text-[18px] leading-tight font-medium text-white [text-shadow:0_1px_8px_rgba(0,0,0,.45)]">
        {caption}
      </span>
    </>
  );
  const frame = `relative block aspect-[4/5] overflow-hidden rounded-[22px] ${className}`;
  return external ? (
    <a href={href} className={frame}>
      {inner}
    </a>
  ) : (
    <Link href={href} className={frame}>
      {inner}
    </Link>
  );
}

export default function V9() {
  const current = person.current;
  return (
    <Surface
      current="/lab/v9"
      className="font-sans"
      style={
        {
          background: FIELD,
          "--ink": INK,
          "--lime": LIME,
        } as CSSProperties
      }
    >
      <div className="mx-auto max-w-[1080px] space-y-3 px-3 py-3 sm:px-5 sm:py-5">
        <Sheet>
          <header className="flex items-center justify-between gap-4">
            <span className="text-[15px] font-semibold tracking-tight">
              Peter.
            </span>
            <nav className="hidden gap-6 text-[13px] text-[var(--ink)]/55 sm:flex">
              <a href="#work" className="hover:text-[var(--ink)]">
                Work
              </a>
              <a href="#writing" className="hover:text-[var(--ink)]">
                Writing
              </a>
              <Link href="/ai-stack" className="hover:text-[var(--ink)]">
                AI stack
              </Link>
            </nav>
            <a
              href={`mailto:${person.email}`}
              className="rounded-full bg-[var(--ink)] px-4 py-2 text-[13px] font-medium text-white"
            >
              Say hello
            </a>
          </header>

          <div className="mt-14 grid items-end gap-8 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <h1 className="max-w-[11ch] text-[46px] leading-[0.98] font-semibold tracking-[-0.035em] sm:text-[64px]">
                Sites faster. Cloud bills smaller.
              </h1>
              <p
                className="mt-6 max-w-[36ch] text-[15px] leading-relaxed"
                style={{ color: MUTED }}
              >
                {current.roles[0].title} at {current.company}. Backend, infra,
                and the less visible wins: apps that feel instant, services that
                are cheap to run.
              </p>
              <a
                href={current.href}
                className="mt-8 inline-flex rounded-full bg-[var(--ink)] px-5 py-2.5 text-[14px] font-medium text-white"
              >
                {current.company}
              </a>
            </div>
            <div className="grid grid-cols-2 gap-3 lg:col-span-6">
              <PhotoCard
                photo={PHOTOS.runner}
                href="/blog"
                caption="The wins you don't see."
                priority
              />
              <div className="flex flex-col gap-3">
                <div className="relative aspect-[4/3] overflow-hidden rounded-[22px] bg-[#C5D4EE]">
                  <Image
                    src="/portrait.webp"
                    alt={person.name}
                    fill
                    sizes="240px"
                    className="object-cover object-top"
                    priority
                  />
                </div>
                <div className="flex flex-1 items-end rounded-[22px] bg-[var(--lime)] p-4">
                  <p className="text-[18px] leading-tight font-semibold tracking-[-0.02em]">
                    {person.location}. Agent harnesses, off hours.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Sheet>

        <Sheet tone="dark">
          <p className="max-w-[18ch] text-[34px] leading-[1.05] font-semibold tracking-[-0.03em] sm:text-[44px]">
            I like the <span style={{ color: LIME }}>less visible wins</span>.
          </p>
          <p className="mt-4 max-w-[46ch] text-[15px] leading-relaxed text-white/55">
            Most of my career has been distributed systems, data pipelines, and
            cloud spend. Off hours, a small software factory of my own.
          </p>
          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            {(
              [
                [
                  "Faster sites",
                  "The storefront work, and ghostpost.",
                  projects[0].href,
                ],
                [
                  "Smaller bills",
                  "Query work, cloud spend, the unglamorous cuts.",
                  "#work",
                ],
                [
                  "Agent harnesses",
                  "What I write about when I'm not at work.",
                  "/blog/how-i-reliably-manage-20-plus-coding-agents-with-omp",
                ],
              ] as const
            ).map(([title, body, href]) => (
              <a
                key={title}
                href={href}
                className="flex flex-col rounded-2xl bg-white/[0.06] p-5 transition-colors hover:bg-white/[0.1]"
              >
                <Arrow tone="lime" />
                <p className="mt-10 text-[16px] font-medium">{title}</p>
                <p className="mt-1 text-[13px] leading-relaxed text-white/45">
                  {body}
                </p>
              </a>
            ))}
          </div>
        </Sheet>

        <Sheet>
          <div id="work" className="flex items-end justify-between gap-6">
            <h2 className="max-w-[14ch] text-[34px] leading-[1.05] font-semibold tracking-[-0.03em] sm:text-[42px]">
              Places I&apos;ve worked
            </h2>
            <p
              className="hidden max-w-[28ch] text-right text-[14px] leading-relaxed sm:block"
              style={{ color: MUTED }}
            >
              Photos are stand-ins. The roles are not.
            </p>
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {jobs.map((j, i) => {
              const photo = [PHOTOS.hill, PHOTOS.curve, PHOTOS.courtyard][i];
              return (
                <a
                  key={j.company}
                  href={j.href}
                  className="group rounded-[22px] border border-black/[0.06] p-2 transition-colors hover:border-[var(--lime)] hover:bg-[var(--lime)]/30"
                >
                  <div className="relative aspect-[5/4] overflow-hidden rounded-[16px]">
                    <Image
                      src={photo.src}
                      alt=""
                      fill
                      sizes="320px"
                      className="object-cover"
                    />
                    <span className="absolute top-2.5 right-2.5">
                      <Arrow />
                    </span>
                  </div>
                  <div className="px-2 pt-4 pb-3">
                    <p className="text-[18px] font-semibold tracking-[-0.02em]">
                      {j.company.replace(" Corporation", "")}
                    </p>
                    <p className="mt-1 text-[13px]" style={{ color: MUTED }}>
                      {j.roles[0].title}
                    </p>
                    <p className="mt-3 text-[12px] tracking-wide text-black/40 uppercase">
                      {j.start} — {j.end}
                    </p>
                  </div>
                </a>
              );
            })}
          </div>
        </Sheet>

        <Sheet>
          <div id="writing" className="flex items-end justify-between">
            <h2 className="text-[34px] leading-none font-semibold tracking-[-0.03em] sm:text-[42px]">
              Selected writing
            </h2>
            <Link
              href="/blog"
              className="text-[13px] font-medium tracking-wide uppercase"
            >
              View all
            </Link>
          </div>
          <ul className="mt-8 divide-y divide-black/[0.06]">
            {posts.slice(0, 5).map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/blog/${p.slug}`}
                  className="group flex items-center gap-4 py-4"
                >
                  <span className="min-w-0 flex-1 text-[18px] leading-snug font-medium tracking-[-0.02em] sm:text-[20px]">
                    {p.title}
                  </span>
                  <span
                    className="hidden text-[13px] sm:inline"
                    style={{ color: MUTED }}
                  >
                    {p.year}
                  </span>
                  <Arrow tone="dark" />
                </Link>
              </li>
            ))}
          </ul>
        </Sheet>

        <Sheet tone="lime" className="overflow-hidden">
          <div className="flex flex-wrap items-end justify-between gap-8">
            <p className="text-[64px] leading-[0.85] font-semibold tracking-[-0.045em] sm:text-[104px]">
              SAY
              <br />
              HELLO.
            </p>
            <a
              href={`mailto:${person.email}`}
              className="mb-2 rounded-full bg-white px-5 py-3 text-[15px] font-medium shadow-sm"
            >
              {person.email}
            </a>
          </div>
          <p className="mt-8 max-w-[36ch] text-[15px] leading-relaxed">
            AI stack is {stack.total}/mo, written down. GitHub and LinkedIn are
            below.
          </p>
        </Sheet>

        <Sheet tone="dark" className="!py-8">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div>
              <p className="text-[22px] font-semibold tracking-tight">Peter.</p>
              <p className="mt-1 text-[13px] text-white/45">
                {person.location}
              </p>
            </div>
            <nav className="flex flex-wrap gap-x-6 gap-y-2 text-[14px]">
              <Link href="/blog" className="text-white/70 hover:text-white">
                Writing
              </Link>
              <Link href="/ai-stack" className="text-white/70 hover:text-white">
                AI stack
              </Link>
              {links.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  className="text-white/70 hover:text-white"
                >
                  {l.label}
                </a>
              ))}
            </nav>
          </div>
        </Sheet>
      </div>
    </Surface>
  );
}
