import BlurFade from "@/components/magicui/blur-fade";
import { DATA } from "@/data/resume";
import Image from "next/image";
import Link from "next/link";
import ContactSection from "@/components/section/contact-section";
import PhotosSection from "@/components/section/photos-section";
import ProjectsSection from "@/components/section/projects-section";
import WorkSection from "@/components/section/work-section";
import { SmartStack } from "@/components/smart-stack";
import { allPosts } from "content-collections";
import { sortPostsByDate } from "@/lib/posts";
import { ArrowUpRight, MapPin } from "lucide-react";

const heading =
  "text-[28px] leading-none font-semibold tracking-[-0.03em] sm:text-[34px]";

export default function Page() {
  const latest = sortPostsByDate(allPosts)[0];
  const latestPost = {
    title: latest?.title ?? "Latest writing",
    slug: latest?._meta.path.replace(/\.mdx$/, "") ?? "",
    date: latest
      ? new Date(latest.publishedAt).toLocaleDateString("en-US", {
          month: "short",
          year: "numeric",
          timeZone: "UTC",
        })
      : "",
  };

  return (
    <main className="relative flex min-h-dvh flex-col gap-16">
      <section id="hero" className="scroll-mt-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between sm:gap-5">
          <div className="min-w-0 sm:pt-1">
            <h1 className="text-[44px] leading-[0.96] font-semibold tracking-[-0.04em] sm:text-[60px]">
              Hi, I&apos;m {DATA.name.split(" ")[0]}
            </h1>
            <p className="text-muted-foreground mt-4 max-w-full text-[19px] leading-snug sm:max-w-[22ch] sm:text-[22px]">
              {DATA.description}
            </p>
          </div>
          <div className="flex h-auto w-full shrink-0 gap-2.5 sm:h-[250px] sm:w-auto">
            <div className="relative aspect-[4/5] w-[56%] overflow-hidden rounded-[18px] sm:h-full sm:w-[200px]">
              <Image
                src={DATA.avatarUrl}
                alt={DATA.name}
                fill
                priority
                unoptimized
                className="object-cover object-center"
              />
            </div>
            <div className="flex min-w-0 flex-1 flex-col gap-2.5 sm:h-full sm:w-[148px] sm:flex-initial">
              <a
                href={DATA.locationLink}
                target="_blank"
                rel="noopener noreferrer"
                className="relative min-h-0 flex-1 overflow-hidden rounded-[18px]"
              >
                <Image
                  src="/photos/img_0997.webp"
                  alt="Lake Union view of Seattle skyline and Space Needle"
                  fill
                  sizes="148px"
                  className="object-cover"
                />
                <span className="absolute top-1.5 left-1.5 flex items-center gap-1.5">
                  <span
                    aria-hidden
                    className="grid size-7 shrink-0 place-items-center rounded-full bg-white text-black"
                  >
                    <MapPin className="size-3.5" strokeWidth={1.75} />
                  </span>
                  <span className="text-[12px] font-medium text-white [text-shadow:0_1px_6px_rgba(0,0,0,0.7)]">
                    {DATA.location}
                  </span>
                </span>
              </a>
              <SmartStack
                latestPost={latestPost}
                githubUrl={DATA.contact.social.GitHub.url}
              />
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="scroll-mt-8">
        <BlurFade inView>
          <h2 className={heading}>About</h2>
          <div className="prose text-muted-foreground dark:prose-invert mt-5 max-w-full font-sans text-[15px] leading-relaxed text-pretty">
            <p>
              I&apos;m a senior software engineer based in Seattle, WA. Most of
              my career has been backend and infrastructure: distributed
              systems, query optimization, and slashing cloud spend. I care
              about the unshiny wins that move graphs in the right direction:
              building apps that feel instant, services that cost pennies to
              run, and systems that scale without drama. Outside work, I tinker
              with custom agent harnesses, eval loops, and a personal software
              factory.
            </p>
          </div>
        </BlurFade>
      </section>

      <section id="work" className="scroll-mt-8">
        <BlurFade inView>
          <h2 className={heading}>Work</h2>
          <div className="mt-6">
            <WorkSection />
          </div>
        </BlurFade>
      </section>

      <section id="education" className="scroll-mt-8">
        <BlurFade inView>
          <h2 className={heading}>Education</h2>
          <div className="mt-6 flex flex-col gap-8">
            {DATA.education.map((education) => (
              <Link
                key={education.school}
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
            ))}
          </div>
        </BlurFade>
      </section>

      <section id="projects" className="cv-auto scroll-mt-8">
        <BlurFade inView>
          <ProjectsSection />
        </BlurFade>
      </section>

      <section id="photos" className="scroll-mt-8">
        <BlurFade inView>
          <PhotosSection />
        </BlurFade>
      </section>

      <section id="contact" className="scroll-mt-8 overflow-visible pt-4">
        <BlurFade inView className="overflow-visible">
          <ContactSection />
        </BlurFade>
      </section>
    </main>
  );
}
