import type { CSSProperties, ReactNode } from "react";

const VARIANTS = [
  { href: "/lab/v4", label: "04 Receipts" },
  { href: "/lab/v8", label: "08 Column" },
  { href: "/lab/v9", label: "09 Petzen" },
];

/**
 * Prototype-only: covers the current root layout (dark theme, flickering grid,
 * dock) with a full-viewport light canvas so each concept is judged on its own.
 */
export function Surface({
  children,
  current,
  style,
  className = "",
}: {
  children: ReactNode;
  current: string;
  style: CSSProperties;
  className?: string;
}) {
  return (
    <div
      data-lab-surface
      className={`fixed inset-0 z-[100] overflow-y-auto antialiased ${className}`}
      style={{ colorScheme: "light", ...style }}
    >
      {/* Root layout's `relative z-10` wrapper would trap this surface below
          the dock; drop that stacking context while a lab page is mounted. */}
      <style>{"body:has([data-lab-surface]) > .z-10 { z-index: auto; }"}</style>
      {children}
      <nav
        aria-label="Prototype switcher"
        className="fixed right-4 bottom-4 z-[110] flex gap-1 rounded-full border border-black/10 bg-white/80 p-1 font-mono text-[11px] shadow-sm backdrop-blur"
      >
        {VARIANTS.map((v) => (
          // Plain <a>: each variant gets a full page load, so the v4 receipt
          // measures that page rather than a client-side transition.
          <a
            key={v.href}
            href={v.href}
            className={`rounded-full px-2.5 py-1 transition-colors ${
              v.href === current
                ? "bg-black text-white"
                : "text-black/60 hover:text-black"
            }`}
          >
            {v.label}
          </a>
        ))}
      </nav>
    </div>
  );
}
