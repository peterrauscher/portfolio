"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Link from "next/link";
import { ArrowUpRight, Gauge, Newspaper } from "lucide-react";
import { Icons } from "@/components/icons";
import { motion, useMotionValue } from "motion/react";

export type SmartStackProps = {
  latestPost: {
    title: string;
    slug: string;
    date: string;
  };
  githubUrl?: string;
};

type Metrics = {
  loadMs: number;
  kb: number;
};

// Hardcoded active activity matrix for mini GitHub contribution grid
const GITHUB_GRID = [
  [1, 2, 3, 2, 4, 3, 2, 4, 3, 4, 2, 3],
  [2, 3, 4, 3, 2, 4, 3, 2, 4, 3, 4, 2],
  [3, 4, 2, 4, 3, 1, 4, 3, 2, 4, 3, 4],
  [2, 1, 3, 4, 2, 3, 4, 4, 3, 2, 4, 3],
];

export function SmartStack({
  latestPost,
  githubUrl = "https://github.com/peterrauscher",
}: SmartStackProps) {
  // Card 0: Writing
  // Card 1: Page Speed
  // Card 2: GitHub
  const [index, setIndex] = useState(0);
  const [metrics, setMetrics] = useState<Metrics | null>(null);

  // Measure performance live in client
  useEffect(() => {
    const run = () => {
      try {
        const nav = performance.getEntriesByType("navigation")[0] as
          PerformanceNavigationTiming | undefined;
        const resources = performance.getEntriesByType(
          "resource",
        ) as PerformanceResourceTiming[];

        let bytes = nav?.transferSize || nav?.encodedBodySize || 0;
        for (const r of resources) {
          bytes += r.transferSize || r.encodedBodySize || 0;
        }

        const fcp =
          performance
            .getEntriesByType("paint")
            .find((p) => p.name === "first-contentful-paint")?.startTime ??
          null;

        const loadMs = Math.round(
          fcp ?? (nav ? nav.domContentLoadedEventEnd - nav.startTime : 38),
        );
        const kb = Math.max(1, Math.round(bytes / 1024));

        setMetrics({ loadMs, kb });
      } catch {
        setMetrics({ loadMs: 38, kb: 28 });
      }
    };

    if (document.readyState === "complete") {
      run();
    } else {
      window.addEventListener("load", run, { once: true });
    }
  }, []);

  const total = 3;

  const paginate = useCallback(
    (newDirection: number) => {
      setIndex((prev) => (prev + newDirection + total) % total);
    },
    [total],
  );

  // Mouse wheel scroll through cards
  const handleWheel = (e: React.WheelEvent) => {
    if (Math.abs(e.deltaY) > 28) {
      paginate(e.deltaY > 0 ? 1 : -1);
    }
  };

  const dragY = useMotionValue(0);

  // iOS-style 3D stack physics:
  // Offset relative to currently active card (-1, 0, +1)
  const getCardStyle = (cardIdx: number) => {
    // Distance in a circular stack of 3
    let diff = cardIdx - index;
    if (diff === 2) diff = -1;
    if (diff === -2) diff = 1;

    if (diff === 0) {
      return {
        zIndex: 3,
        y: 0,
        scale: 1,
        rotateX: 0,
        opacity: 1,
        pointerEvents: "auto" as const,
      };
    } else if (diff === 1) {
      // Next card peeking below
      return {
        zIndex: 1,
        y: "105%",
        scale: 0.92,
        rotateX: 10,
        opacity: 0,
        pointerEvents: "none" as const,
      };
    } else {
      // Previous card exited above
      return {
        zIndex: 1,
        y: "-105%",
        scale: 0.92,
        rotateX: -10,
        opacity: 0,
        pointerEvents: "none" as const,
      };
    }
  };

  return (
    <div
      className="group/stack relative min-h-0 flex-1 select-none [perspective:900px]"
      onWheel={handleWheel}
    >
      {/* Outer Card Frame */}
      <div className="border-border bg-card hover:border-border/80 relative h-full w-full overflow-hidden rounded-[18px] border shadow-xs transition-colors">
        {/* Card 0: Writing */}
        <motion.div
          animate={getCardStyle(0)}
          transition={{ type: "spring", stiffness: 380, damping: 32 }}
          drag="y"
          dragConstraints={{ top: 0, bottom: 0 }}
          dragElastic={0.35}
          onDragEnd={(_, info) => {
            if (info.offset.y < -20 || info.velocity.y < -250) paginate(1);
            else if (info.offset.y > 20 || info.velocity.y > 250) paginate(-1);
          }}
          className="bg-card absolute inset-0 flex h-full w-full cursor-grab touch-none flex-col justify-between p-3 active:cursor-grabbing"
        >
          <div className="text-muted-foreground flex items-center justify-between">
            <span className="flex items-center gap-1 text-[11px] font-medium tracking-tight">
              <Newspaper className="size-3 text-sky-500" />
              <span>Writing</span>
            </span>
            <span className="text-muted-foreground/80 text-[10px]">
              {latestPost.date}
            </span>
          </div>

          <Link
            href={`/blog/${latestPost.slug}`}
            className="group/link my-auto block"
            draggable={false}
          >
            <p className="text-foreground group-hover/link:text-primary line-clamp-2 text-[12px] leading-snug font-semibold tracking-tight transition-colors sm:text-[13px]">
              {latestPost.title}
            </p>
          </Link>

          <Link
            href="/blog"
            className="text-muted-foreground hover:text-foreground flex items-center justify-between text-[10px]"
            draggable={false}
          >
            <span>All posts</span>
            <ArrowUpRight className="size-3" />
          </Link>
        </motion.div>

        {/* Card 1: Page Speed */}
        <motion.div
          animate={getCardStyle(1)}
          transition={{ type: "spring", stiffness: 380, damping: 32 }}
          drag="y"
          dragConstraints={{ top: 0, bottom: 0 }}
          dragElastic={0.35}
          onDragEnd={(_, info) => {
            if (info.offset.y < -20 || info.velocity.y < -250) paginate(1);
            else if (info.offset.y > 20 || info.velocity.y > 250) paginate(-1);
          }}
          className="bg-card absolute inset-0 flex h-full w-full cursor-grab touch-none flex-col justify-between p-3 active:cursor-grabbing"
        >
          <div className="text-muted-foreground flex items-center justify-between">
            <span className="flex items-center gap-1 text-[11px] font-medium tracking-tight">
              <Gauge className="size-3 text-emerald-500" />
              <span>Speed</span>
            </span>
          </div>

          <div className="my-auto space-y-0.5">
            <div className="flex items-baseline gap-1 font-mono leading-none">
              <span className="text-foreground text-[20px] font-semibold tracking-tight sm:text-[22px]">
                {metrics ? `${metrics.loadMs}` : "38"}
              </span>
              <span className="text-muted-foreground text-[11px]">ms</span>
            </div>
            <p className="text-muted-foreground text-[11px] leading-tight">
              {metrics ? `${metrics.kb} KB transferred` : "painted fast"}
            </p>
          </div>

          <div className="text-muted-foreground/80 flex items-center justify-between text-[10px]">
            <span>Core Web Vitals</span>
            <span className="font-mono text-[9px]">100/100</span>
          </div>
        </motion.div>

        {/* Card 2: GitHub Activity Grid */}
        <motion.div
          animate={getCardStyle(2)}
          transition={{ type: "spring", stiffness: 380, damping: 32 }}
          drag="y"
          dragConstraints={{ top: 0, bottom: 0 }}
          dragElastic={0.35}
          onDragEnd={(_, info) => {
            if (info.offset.y < -20 || info.velocity.y < -250) paginate(1);
            else if (info.offset.y > 20 || info.velocity.y > 250) paginate(-1);
          }}
          className="bg-card absolute inset-0 flex h-full w-full cursor-grab touch-none flex-col justify-between p-3 active:cursor-grabbing"
        >
          <div className="text-muted-foreground flex items-center justify-between">
            <Icons.github className="text-muted-foreground size-3.5 fill-current" />
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View GitHub profile"
              draggable={false}
              className="group/gh text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowUpRight className="size-3.5 transition-transform group-hover/gh:translate-x-0.5 group-hover/gh:-translate-y-0.5" />
            </a>
          </div>

          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            draggable={false}
            className="my-auto flex flex-col items-center justify-center gap-1 py-1"
          >
            {GITHUB_GRID.map((row, rIdx) => (
              <div key={rIdx} className="flex gap-1">
                {row.map((level, cIdx) => (
                  <span
                    key={cIdx}
                    className={`size-1.5 rounded-[2px] transition-colors sm:size-2 ${
                      level === 1
                        ? "bg-emerald-950/40 dark:bg-emerald-900/40"
                        : level === 2
                          ? "bg-emerald-700/60 dark:bg-emerald-700/60"
                          : level === 3
                            ? "bg-emerald-500/80 dark:bg-emerald-500/80"
                            : "bg-emerald-400 dark:bg-emerald-400"
                    }`}
                  />
                ))}
              </div>
            ))}
          </a>

          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground/80 hover:text-foreground flex items-center justify-end text-[10px]"
            aria-label="Visit GitHub"
            draggable={false}
          >
            <span className="text-muted-foreground/50 font-mono text-[9px]">
              github.com
            </span>
          </a>
        </motion.div>
      </div>

      {/* iOS Smart Stack Pagination Dots */}
      <div className="pointer-events-auto absolute top-1/2 -right-2.5 flex -translate-y-1/2 flex-col gap-1 py-1">
        {[0, 1, 2].map((i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to card ${i + 1}`}
            onClick={(e) => {
              e.stopPropagation();
              setIndex(i);
            }}
            className={`transition-all duration-200 ${
              index === i
                ? "bg-foreground h-2.5 w-1 rounded-full"
                : "bg-muted-foreground/30 hover:bg-muted-foreground/60 h-1 w-1 rounded-full"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
