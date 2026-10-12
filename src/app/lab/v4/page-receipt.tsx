"use client";

import { useEffect, useState } from "react";

type Bucket = "html" | "js" | "css" | "fonts" | "images" | "other";

type Metrics = {
  at: Date;
  ttfb: number;
  fcp: number | null;
  domReady: number;
  requests: number;
  cached: number;
  transferredBytes: number;
  buckets: Record<Bucket, number>;
  nodes: number;
};

const BUDGET_BYTES = 150 * 1024;
const BUDGET_MS = 1000;

function bucketOf(entry: PerformanceResourceTiming): Bucket {
  const path = new URL(entry.name).pathname;
  if (/\.js$/.test(path) || entry.initiatorType === "script") return "js";
  if (/\.css$/.test(path)) return "css";
  if (/\.(woff2?|ttf|otf)$/.test(path)) return "fonts";
  if (
    entry.initiatorType === "img" ||
    /\.(webp|png|jpe?g|svg|avif|gif)$/.test(path)
  )
    return "images";
  return "other";
}

function measure(): Metrics {
  const nav = performance.getEntriesByType(
    "navigation",
  )[0] as PerformanceNavigationTiming;
  const resources = performance.getEntriesByType(
    "resource",
  ) as PerformanceResourceTiming[];
  const fcp =
    performance
      .getEntriesByType("paint")
      .find((p) => p.name === "first-contentful-paint")?.startTime ?? null;

  const buckets: Record<Bucket, number> = {
    html: nav.transferSize || nav.encodedBodySize,
    js: 0,
    css: 0,
    fonts: 0,
    images: 0,
    other: 0,
  };
  let cached = nav.transferSize === 0 ? 1 : 0;
  for (const r of resources) {
    // transferSize is 0 for cache hits; fall back to the compressed body size
    // so the line items still describe what the page weighs.
    if (r.transferSize === 0) cached++;
    buckets[bucketOf(r)] += r.transferSize || r.encodedBodySize;
  }

  return {
    at: new Date(),
    ttfb: nav.responseStart - nav.startTime,
    fcp,
    domReady: nav.domContentLoadedEventEnd - nav.startTime,
    requests: resources.length + 1,
    cached,
    transferredBytes: Object.values(buckets).reduce((a, b) => a + b, 0),
    buckets,
    nodes: document.getElementsByTagName("*").length,
  };
}

/** Animates 0 → target once, honouring reduced motion. */
function useCountUp(target: number | null, duration = 700) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (target === null) return;
    // Reduced motion: a zero-length animation lands on the target in one frame.
    const span = matchMedia("(prefers-reduced-motion: reduce)").matches
      ? 0
      : duration;
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = span === 0 ? 1 : Math.min(1, (now - start) / span);
      setValue(target * (1 - Math.pow(1 - t, 3)));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, duration]);
  return value;
}

function Num({
  value,
  format,
}: {
  value: number | null | undefined;
  format: (n: number) => string;
}) {
  const shown = useCountUp(value ?? null);
  if (value === undefined) return <span className="text-black/25">···</span>;
  if (value === null) return <span className="text-black/35">n/a</span>;
  return <span className="tabular-nums">{format(shown)}</span>;
}

const ms = (n: number) => `${Math.round(n)} ms`;
const kb = (n: number) => `${(n / 1024).toFixed(1)} KB`;
const int = (n: number) => String(Math.round(n));

function Row({
  label,
  children,
  sub = false,
}: {
  label: string;
  children: React.ReactNode;
  sub?: boolean;
}) {
  return (
    <div
      className={`flex items-baseline gap-2 ${sub ? "pl-4 text-black/45" : ""}`}
    >
      <span className="shrink-0">{label}</span>
      <span
        aria-hidden
        className="min-w-4 flex-1 translate-y-[-3px] border-b border-dotted border-black/20"
      />
      <span className="shrink-0">{children}</span>
    </div>
  );
}

export function PageReceipt({ path }: { path: string }) {
  const [m, setM] = useState<Metrics | null>(null);

  useEffect(() => {
    // Let the load event finish so loadEventEnd and late resources settle.
    const run = () => setTimeout(() => setM(measure()), 50);
    if (document.readyState === "complete") run();
    else window.addEventListener("load", run, { once: true });
  }, []);

  const v = <T,>(pick: (x: Metrics) => T): T | undefined =>
    m ? pick(m) : undefined;
  const underBytes = m ? m.transferredBytes <= BUDGET_BYTES : null;
  const underMs = m ? (m.fcp ?? m.domReady) <= BUDGET_MS : null;

  return (
    <div className="drop-shadow-[0_1px_1px_rgba(0,0,0,0.06)] drop-shadow-[0_8px_24px_rgba(0,0,0,0.06)]">
      <div className="bg-white px-6 pt-6 pb-4 font-mono text-[12.5px] leading-[1.9] text-black/80 sm:px-8">
        <div className="flex justify-between text-[11px] tracking-wide text-black/45 uppercase">
          <span>peterrauscher.com{path}</span>
          <span suppressHydrationWarning>
            {m
              ? m.at.toLocaleString("en-US", {
                  month: "short",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : "measuring…"}
          </span>
        </div>
        <div className="my-3 border-t border-dashed border-black/20" />
        <Row label="Time to first byte">
          <Num value={v((x) => x.ttfb)} format={ms} />
        </Row>
        <Row label="First contentful paint">
          <Num value={v((x) => x.fcp)} format={ms} />
        </Row>
        <Row label="DOM ready">
          <Num value={v((x) => x.domReady)} format={ms} />
        </Row>
        <Row label="Requests">
          <Num value={v((x) => x.requests)} format={int} />
          {m && m.cached > 0 ? (
            <span className="text-black/40"> ({m.cached} cached)</span>
          ) : null}
        </Row>
        <Row label="Page weight">
          <Num value={v((x) => x.transferredBytes)} format={kb} />
        </Row>
        {(["html", "js", "css", "fonts", "images"] as const).map((b) => (
          <Row key={b} label={b} sub>
            <Num value={v((x) => x.buckets[b])} format={kb} />
          </Row>
        ))}
        <Row label="DOM nodes">
          <Num value={v((x) => x.nodes)} format={int} />
        </Row>
        <div className="my-3 border-t border-dashed border-black/20" />
        <div className="flex items-baseline justify-between font-medium text-black">
          <span>TOTAL</span>
          <span className="tabular-nums">
            {m ? (
              <>
                {kb(m.transferredBytes)} · {ms(m.fcp ?? m.domReady)}
              </>
            ) : (
              <span className="text-black/25">···</span>
            )}
          </span>
        </div>
        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[11px]">
          <Budget ok={underBytes} label={`under ${BUDGET_BYTES / 1024} KB`} />
          <Budget ok={underMs} label={`painted under ${BUDGET_MS / 1000} s`} />
        </div>
        <p className="mt-4 text-center text-[11px] text-black/35">
          Measured in your browser via the Performance API.{" "}
          <button
            type="button"
            onClick={() => location.reload()}
            className="underline decoration-black/20 underline-offset-2 hover:text-black/70"
          >
            Run again
          </button>
        </p>
      </div>
      <div
        aria-hidden
        className="h-2.5"
        style={{
          background:
            "linear-gradient(135deg, #fff 50%, transparent 50%) 0 0 / 12px 12px repeat-x, linear-gradient(225deg, #fff 50%, transparent 50%) 0 0 / 12px 12px repeat-x",
        }}
      />
    </div>
  );
}

function Budget({ ok, label }: { ok: boolean | null; label: string }) {
  if (ok === null) return <span className="text-black/25">○ {label}</span>;
  return (
    <span style={{ color: ok ? "var(--accent)" : "#C2410C" }}>
      {ok ? "✓" : "✕"} {label}
    </span>
  );
}
