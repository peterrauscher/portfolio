import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";
import { DATA } from "@/data/resume";
import {
  Timeline,
  TimelineItem,
  TimelineConnectItem,
} from "@/components/timeline";

export default function HackathonsSection() {
  return (
    <section id="hackathons" className="overflow-hidden">
      <div className="flex min-h-0 w-full flex-col gap-y-8">
        <div className="flex flex-col items-center justify-center gap-y-4">
          <div className="flex w-full items-center">
            <div className="via-border h-px flex-1 bg-linear-to-r from-transparent from-5% via-95% to-transparent" />
            <div className="bg-primary z-10 rounded-xl border px-4 py-1">
              <span className="text-background text-sm font-medium">
                Hackathons
              </span>
            </div>
            <div className="via-border h-px flex-1 bg-linear-to-l from-transparent from-5% via-95% to-transparent" />
          </div>
          <div className="flex flex-col items-center justify-center gap-y-3">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              Hackathons
            </h2>
            <p className="text-muted-foreground text-center text-balance md:text-lg/relaxed lg:text-base/relaxed xl:text-lg/relaxed">
              I like the challenge of building something in a short timeframe,
              forcing you to focus on only what really matters.
            </p>
          </div>
        </div>
        <Timeline>
          {DATA.hackathons.map((hackathon) => (
            <TimelineItem
              key={hackathon.title + hackathon.dates}
              className="flex w-full items-start justify-between gap-10"
            >
              <TimelineConnectItem className="flex items-start justify-center">
                {hackathon.image ? (
                  <Image
                    src={hackathon.image}
                    alt={hackathon.title}
                    width={40}
                    height={40}
                    sizes="40px"
                    className="bg-card ring-border z-10 size-10 flex-none shrink-0 overflow-hidden rounded-full border object-contain p-1 shadow ring-2"
                  />
                ) : (
                  <div className="bg-card ring-border z-10 size-10 flex-none shrink-0 overflow-hidden rounded-full border p-1 shadow ring-2" />
                )}
              </TimelineConnectItem>
              <div className="flex min-w-0 flex-1 flex-col justify-start gap-2">
                {/* Dates hidden for hackathons - year kept in title */}
                {hackathon.title && (
                  <h3 className="leading-none font-semibold">
                    {hackathon.title}
                  </h3>
                )}
                {hackathon.location && (
                  <p className="text-muted-foreground text-sm">
                    {hackathon.location}
                  </p>
                )}
                {hackathon.description && (
                  <p className="text-muted-foreground text-sm leading-relaxed wrap-break-word">
                    {hackathon.description}
                  </p>
                )}
                {hackathon.links && hackathon.links.length > 0 && (
                  <div className="mt-1 flex flex-row flex-wrap items-start gap-2">
                    {hackathon.links.map((link, idx) => (
                      <Link
                        href={link.href}
                        key={idx}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Badge className="bg-primary text-primary-foreground flex items-center gap-1.5 text-xs">
                          {link.icon}
                          {link.title}
                        </Badge>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </TimelineItem>
          ))}
        </Timeline>
      </div>
    </section>
  );
}
