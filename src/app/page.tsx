import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DATA } from "@/data/resume";
import Image from "next/image";
import Link from "next/link";
import Markdown from "react-markdown";
import ContactSection from "@/components/section/contact-section";
import HackathonsSection from "@/components/section/hackathons-section";
import NowSection from "@/components/section/now-section";
import ProjectsSection from "@/components/section/projects-section";
import WorkSection from "@/components/section/work-section";
import { ArrowUpRight } from "lucide-react";

const BLUR_FADE_DELAY = 0.04;

export default function Page() {
  return (
    <main className="relative flex min-h-dvh flex-col gap-14">
      <section id="hero">
        <div className="mx-auto w-full max-w-2xl space-y-8">
          <div className="flex flex-col justify-between gap-2 gap-y-6 md:flex-row">
            <div className="order-2 flex flex-col gap-2 md:order-1">
              <BlurFadeText
                delay={BLUR_FADE_DELAY}
                className="text-3xl font-semibold tracking-tighter sm:text-4xl lg:text-5xl"
                yOffset={8}
                text={`Hi, I'm ${DATA.name.split(" ")[0]}`}
              />
              <BlurFadeText
                className="text-muted-foreground max-w-[600px] md:text-lg lg:text-xl"
                delay={BLUR_FADE_DELAY}
                text={DATA.description}
              />
            </div>
            <BlurFade delay={BLUR_FADE_DELAY} className="order-1 md:order-2">
              <Avatar className="ring-muted relative size-24 overflow-hidden rounded-full border shadow-lg ring-4 md:size-32">
                <Image
                  src={DATA.avatarUrl}
                  alt={DATA.name}
                  width={128}
                  height={128}
                  priority
                  sizes="(min-width: 768px) 128px, 96px"
                  className="object-cover object-center"
                />
                <AvatarFallback>{DATA.initials}</AvatarFallback>
              </Avatar>
            </BlurFade>
          </div>
        </div>
      </section>
      <section id="about">
        <div className="flex min-h-0 flex-col gap-y-4">
          <BlurFade delay={BLUR_FADE_DELAY * 3}>
            <h2 className="text-xl font-bold">About</h2>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 4}>
            <div className="prose text-muted-foreground dark:prose-invert max-w-full font-sans leading-relaxed text-pretty">
              <Markdown>{DATA.summary}</Markdown>
            </div>
          </BlurFade>
        </div>
      </section>
      <section id="work">
        <div className="flex min-h-0 flex-col gap-y-6">
          <BlurFade delay={BLUR_FADE_DELAY * 5}>
            <h2 className="text-xl font-bold">Work Experience</h2>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 6}>
            <WorkSection />
          </BlurFade>
        </div>
      </section>
      <section id="education">
        <div className="flex min-h-0 flex-col gap-y-6">
          <BlurFade delay={BLUR_FADE_DELAY * 7}>
            <h2 className="text-xl font-bold">Education</h2>
          </BlurFade>
          <div className="flex flex-col gap-8">
            {DATA.education.map((education, index) => (
              <BlurFade
                key={education.school}
                delay={BLUR_FADE_DELAY * 8 + index * 0.05}
              >
                <Link
                  href={education.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between gap-x-3"
                >
                  <div className="flex min-w-0 flex-1 items-center gap-x-3">
                    {education.logoUrl ? (
                      <Image
                        src={education.logoUrl}
                        alt={education.school}
                        width={40}
                        height={40}
                        sizes="40px"
                        className="ring-border size-8 flex-none rounded-full border object-cover shadow ring-2 md:size-10"
                      />
                    ) : (
                      <div className="ring-border bg-muted size-8 flex-none rounded-full border shadow ring-2 md:size-10" />
                    )}
                    <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                      <div className="flex items-center gap-2 leading-none font-semibold">
                        {education.school}
                        <ArrowUpRight
                          className="text-muted-foreground h-3.5 w-3.5 -translate-x-2 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100"
                          aria-hidden
                        />
                      </div>
                      <div className="text-muted-foreground font-sans text-sm">
                        {education.degree}
                      </div>
                    </div>
                  </div>
                  <div className="text-muted-foreground flex flex-none items-center gap-1 text-right text-xs tabular-nums">
                    <span>
                      {education.start} - {education.end}
                    </span>
                  </div>
                </Link>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>
      <section id="skills">
        <div className="flex min-h-0 flex-col gap-y-8">
          <BlurFade delay={BLUR_FADE_DELAY * 9}>
            <div className="flex flex-col items-center justify-center gap-y-4">
              <div className="flex w-full items-center">
                <div className="via-border h-px flex-1 bg-linear-to-r from-transparent from-5% via-95% to-transparent" />
                <div className="bg-primary z-10 rounded-xl border px-4 py-1">
                  <span className="text-background text-sm font-medium">
                    My Skills
                  </span>
                </div>
                <div className="via-border h-px flex-1 bg-linear-to-l from-transparent from-5% via-95% to-transparent" />
              </div>
              <div className="flex flex-col items-center justify-center gap-y-3">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                  Technologies I work with
                </h2>
                <p className="text-muted-foreground text-center text-balance md:text-lg/relaxed lg:text-base/relaxed xl:text-lg/relaxed">
                  I&apos;ve worked with a variety of technologies across the
                  full stack, from backend frameworks to cloud infrastructure.
                </p>
              </div>
            </div>
          </BlurFade>
          <div className="flex flex-wrap justify-center gap-2">
            {DATA.skills.map((skill, id) => (
              <BlurFade
                key={skill.name}
                delay={BLUR_FADE_DELAY * 10 + id * 0.05}
              >
                <div className="bg-background dark:bg-muted/50 border-border ring-border/20 flex h-8 w-fit items-center gap-2 rounded-xl border px-4 ring-2">
                  {skill.icon && (
                    <skill.icon className="size-4 overflow-hidden rounded object-contain" />
                  )}
                  <span className="text-foreground text-sm font-medium">
                    {skill.name}
                  </span>
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>
      <section id="projects">
        <BlurFade delay={BLUR_FADE_DELAY * 13}>
          <ProjectsSection />
        </BlurFade>
      </section>
      <section id="hackathons">
        <BlurFade delay={BLUR_FADE_DELAY * 15}>
          <HackathonsSection />
        </BlurFade>
      </section>
      <section id="now">
        <BlurFade delay={BLUR_FADE_DELAY * 17}>
          <NowSection />
        </BlurFade>
      </section>
      <section id="contact">
        <BlurFade delay={BLUR_FADE_DELAY * 18}>
          <ContactSection />
        </BlurFade>
      </section>
    </main>
  );
}
