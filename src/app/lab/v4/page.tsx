import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import {
  jobs,
  links,
  person,
  posts,
  projects,
  stack,
  writingTotals,
} from "../_shared/content";
import { Surface } from "../_shared/surface";
import { PageReceipt } from "./page-receipt";

const ACCENT = "#15803D";

/** Résumé descriptions re-cut as line items; wording stays with the source. */
const LINE_ITEMS: Record<string, string[]> = {
  Vividly: [
    "Rust services",
    "Bloated workflows, cleaned up",
    "Performance tuning + query optimization",
  ],
  Perpay: [
    "Magento → React storefront",
    "Conversion ↑ · EKS bill ↓",
    "Vendor integrations that scale",
    "Full-suite e-commerce app, BNPL built in",
  ],
  "Almo Corporation": [
    "Warehouse integration layer for enterprise e-com",
    "Generalized → faster vendor onboarding",
    "Real-time inventory APIs (intern, 2019)",
  ],
};

function Section({
  title,
  aside,
  children,
}: {
  title: string;
  aside?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="mt-20">
      <div className="mb-5 flex items-baseline justify-between">
        <h2 className="text-[13px] font-medium text-black/45">{title}</h2>
        {aside ? (
          <span className="font-mono text-[11px] text-black/40">{aside}</span>
        ) : null}
      </div>
      {children}
    </section>
  );
}

function Ledger({ children }: { children: ReactNode }) {
  return (
    <ul className="divide-y divide-black/[0.06] border-y border-black/[0.06]">
      {children}
    </ul>
  );
}

export default function V4() {
  return (
    <Surface
      current="/lab/v4"
      className="font-sans"
      style={
        {
          background: "#F3F2EE",
          color: "#1A1A18",
          "--accent": ACCENT,
        } as CSSProperties
      }
    >
      <main className="mx-auto max-w-[640px] px-6 pt-20 pb-40 sm:pt-32">
        <header>
          <p className="flex items-center gap-2 text-[13px] text-black/50">
            <span className="font-medium text-black">{person.name}</span>
            <span className="text-black/25">/</span>
            <span>
              {person.current.roles[0].title}, {person.current.company}
            </span>
          </p>
          <h1 className="mt-6 max-w-[18ch] text-[34px] leading-[1.1] font-medium tracking-[-0.025em] sm:text-[42px]">
            I make sites faster and cloud bills{" "}
            <span style={{ color: ACCENT }}>smaller</span>.
          </h1>
          <p className="mt-5 max-w-[48ch] text-[15px] leading-relaxed text-black/55">
            Backend, infra, distributed systems. Here&apos;s the receipt for
            this page, rung up in your browser a moment ago.
          </p>
        </header>

        <div className="mt-12">
          <PageReceipt path="/lab/v4" />
        </div>

        <Section title="Work, itemized" aside={`${jobs.length} employers`}>
          <div className="space-y-8">
            {jobs.map((j) => (
              <article key={j.company}>
                <div className="flex items-baseline justify-between gap-4">
                  <a
                    href={j.href}
                    className="text-[15px] font-medium hover:text-[var(--accent)]"
                  >
                    {j.company}
                  </a>
                  <span className="font-mono text-[11px] text-black/40 tabular-nums">
                    {j.start}–{j.end}
                  </span>
                </div>
                <p className="mt-0.5 text-[13px] text-black/45">
                  {j.progression}
                </p>
                <ul className="mt-3 space-y-1 font-mono text-[12.5px] text-black/70">
                  {(LINE_ITEMS[j.company] ?? [j.summary]).map((item) => (
                    <li key={item} className="flex gap-3">
                      <span style={{ color: ACCENT }}>+</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </Section>

        <Section title="Shipped" aside={`${projects.length} projects`}>
          <Ledger>
            {projects.map((p) => (
              <li key={p.title} className="py-4">
                <div className="flex items-baseline justify-between gap-4">
                  <a
                    href={p.href}
                    className="text-[15px] font-medium hover:text-[var(--accent)]"
                  >
                    {p.title}
                    {p.active ? (
                      <span
                        className="ml-2 rounded-full px-1.5 py-0.5 align-middle font-mono text-[10px]"
                        style={{
                          color: ACCENT,
                          background: `color-mix(in oklab, ${ACCENT} 10%, transparent)`,
                        }}
                      >
                        live
                      </span>
                    ) : null}
                  </a>
                  <span className="font-mono text-[11px] text-black/40">
                    {p.dates}
                  </span>
                </div>
                <p className="mt-1 text-[13px] leading-relaxed text-black/55">
                  {p.description}
                </p>
                <p className="mt-2 font-mono text-[11px] text-black/40">
                  {p.technologies.join(" · ")}
                </p>
              </li>
            ))}
          </Ledger>
        </Section>

        <Section
          title="Writing"
          aside={`${writingTotals.count} essays · ${writingTotals.words.toLocaleString()} words · ~${writingTotals.minutes} min`}
        >
          <Ledger>
            {posts.slice(0, 5).map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/blog/${p.slug}`}
                  className="group flex items-baseline justify-between gap-4 py-3"
                >
                  <span className="text-[14px] group-hover:text-[var(--accent)]">
                    {p.title}
                  </span>
                  <span className="shrink-0 font-mono text-[11px] text-black/40 tabular-nums">
                    {p.minutes} min
                  </span>
                </Link>
              </li>
            ))}
          </Ledger>
          <Link
            href="/blog"
            className="mt-4 inline-block text-[13px] text-black/50 hover:text-[var(--accent)]"
          >
            All writing →
          </Link>
        </Section>

        <Section title="Monthly AI spend" aside={`updated ${stack.updated}`}>
          <div className="bg-white px-6 py-5 font-mono text-[12.5px] leading-[1.9] text-black/75 shadow-[0_1px_2px_rgba(0,0,0,0.05)] sm:px-8">
            {stack.subscriptions.map((s) => (
              <div key={s.provider} className="flex items-baseline gap-2">
                <span className="shrink-0">{s.provider}</span>
                <span className="text-black/35">{s.plan}</span>
                <span
                  aria-hidden
                  className="min-w-4 flex-1 translate-y-[-3px] border-b border-dotted border-black/20"
                />
                <span className="shrink-0 tabular-nums">{s.monthly}</span>
              </div>
            ))}
            <div className="my-2 border-t border-dashed border-black/20" />
            <div className="flex justify-between font-medium text-black">
              <span>TOTAL</span>
              <span>{stack.total}/mo</span>
            </div>
          </div>
          <Link
            href="/ai-stack"
            className="mt-4 inline-block text-[13px] text-black/50 hover:text-[var(--accent)]"
          >
            What each one is for, plus tools →
          </Link>
        </Section>

        <footer className="mt-24 flex flex-wrap items-baseline justify-between gap-4 border-t border-black/[0.08] pt-6 text-[13px]">
          <div className="flex gap-5">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="text-black/55 hover:text-[var(--accent)]"
              >
                {l.label}
              </a>
            ))}
          </div>
          <span className="font-mono text-[11px] text-black/35">
            {person.location}
          </span>
        </footer>
      </main>
    </Surface>
  );
}
