import BlurFade from "@/components/magicui/blur-fade";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AI Stack",
  description:
    "The AI coding tools, infrastructure, and subscriptions I use day to day.",
  openGraph: {
    title: "AI Stack",
    description:
      "The AI coding tools, infrastructure, and subscriptions I use day to day.",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Stack",
    description:
      "The AI coding tools, infrastructure, and subscriptions I use day to day.",
  },
};

const BLUR_FADE_DELAY = 0.04;

function StackTable({
  headers,
  rows,
  nowrapLast = false,
}: {
  headers: string[];
  rows: ReactNode[][];
  nowrapLast?: boolean;
}) {
  return (
    <div className="border-border not-prose my-6 overflow-hidden rounded-xl border">
      <div className="w-full overflow-x-auto">
        <table className="m-0 w-full min-w-full border-separate border-spacing-0 text-sm">
          <thead>
            <tr>
              {headers.map((header) => (
                <th
                  key={header}
                  className="text-foreground border-border bg-muted/50 border-b px-3 py-2 text-left align-middle font-semibold"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="hover:bg-accent/50 transition-colors"
              >
                {row.map((cell, cellIndex) => {
                  const isFirst = cellIndex === 0;
                  const isLast = cellIndex === row.length - 1;
                  return (
                    <td
                      key={cellIndex}
                      className={[
                        "text-muted-foreground border-border border-b px-3 py-2.5 align-middle text-sm whitespace-normal",
                        !isLast ? "border-border border-r" : "",
                        rowIndex === rows.length - 1 ? "border-b-0" : "",
                        isFirst
                          ? "text-foreground/90 font-medium whitespace-nowrap"
                          : "",
                        nowrapLast && isLast ? "whitespace-nowrap" : "",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                    >
                      {cell}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function AIStackPage() {
  return (
    <section id="ai-stack">
      <BlurFade delay={BLUR_FADE_DELAY}>
        <h1 className="mb-2 text-2xl font-semibold tracking-tight">
          My AI stack
        </h1>
        <p className="text-muted-foreground mb-8 text-sm">
          The industry is moving so fast now I make tweaks, changes, and try new
          tools every day, but I try and keep this up-to-date.
        </p>
      </BlurFade>

      <article className="prose text-muted-foreground dark:prose-invert max-w-full font-sans leading-relaxed text-pretty">
        <BlurFade delay={BLUR_FADE_DELAY * 3}>
          <h2>Coding tools</h2>
          <p>
            This covers the setup I use when working on{" "}
            <strong>personal projects and open-source contributions</strong>. My
            setup at my day job is similar but I use more industry standard
            tools (like Figma) and models that are withing our data-retention
            policy.
          </p>
          <StackTable
            headers={["Tool", "Role"]}
            rows={[
              [
                <Link
                  key="omp"
                  href="https://omp.sh/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  omp
                </Link>,
                <>
                  The best coding harness (
                  <Link
                    href="https://x.com/composio/status/2085330847951970801"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    verified
                  </Link>
                  ). Amazing agent orchestration, subagent messaging, role maps,
                  and highly extensible. My daily driver.
                </>,
              ],
              [
                <Link
                  key="zed"
                  href="https://zed.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Zed
                </Link>,
                "My primary IDE. Super fast and fully open sourced.",
              ],
              [
                <Link
                  key="hermes"
                  href="https://hermes-agent.nousresearch.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Hermes (via Slack)
                </Link>,
                "Creates and monitors recurring agent tasks and PR reviews from Slack.",
              ],
              [
                <Link
                  key="rtk"
                  href="https://github.com/rtk-ai/rtk"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  rtk
                </Link>,
                "Nice little CLI proxy that strips noisy command outputs so agents burn less tokens.",
              ],
              [
                <Link
                  key="pen"
                  href="https://pen.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  pen.dev
                </Link>,
                "Design work and UI exploration before implementation.",
              ],
              [
                <Link
                  key="tailscale"
                  href="https://tailscale.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Tailscale
                </Link>,
                "Use to tunnel into my homelab server rack, where I deploy my own projects and software.",
              ],
              [
                <Link
                  key="termius"
                  href="https://termius.com/index.html"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Termius
                </Link>,
                "Let's me SSH into my Macbook (also via Tailscale) and continue working on the go, accessing omp sessions and local git branches from my phone.",
              ],
            ]}
          />
        </BlurFade>

        <BlurFade delay={BLUR_FADE_DELAY * 4}>
          <h2>Subscriptions</h2>
          <p>What I personally pay for out-of-pocket for model access:</p>
          <StackTable
            headers={["Provider", "Plan", "Monthly"]}
            nowrapLast
            rows={[
              ["OpenAI", "ChatGPT Pro 20x", "$200"],
              [
                "xAI",
                "SuperGrok, grok-4.5-high is great at design in pen.dev",
                "$30",
              ],
              [
                "OpenCode Go",
                "Gives $60 of DeepSeek V4 Flash usage, GREAT deal",
                "$10",
              ],
              ["DeepInfra", "Pay-as-you-go API for dsv4-flash-0731", "~$5-10"],
              [
                <strong key="total-label">Total</strong>,
                "",
                <strong key="total-value">~$245-250/mo</strong>,
              ],
            ]}
          />
          <p>
            My employer also covers a Codex plan and unlimited Cursor usage,
            which I use for job-related development work.
          </p>
        </BlurFade>

        <BlurFade delay={BLUR_FADE_DELAY * 5}>
          <p className="text-muted-foreground not-prose mt-8 text-sm">
            Last updated: Aug 07, 2026
          </p>
        </BlurFade>
      </article>
    </section>
  );
}
