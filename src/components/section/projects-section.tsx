import { ProjectCard } from "@/components/project-card";
import { DATA } from "@/data/resume";

export default function ProjectsSection() {
  return (
    <section id="projects">
      <div className="flex min-h-0 flex-col gap-y-6">
        <div>
          <h2 className="text-[28px] leading-none font-semibold tracking-[-0.03em] sm:text-[34px]">
            Projects
          </h2>
          <p className="text-muted-foreground mt-3 text-[15px]">
            These are a few I&apos;m still happy I built.
          </p>
        </div>
        <div className="mx-auto grid max-w-[800px] auto-rows-fr grid-cols-1 gap-3 sm:grid-cols-2">
          {DATA.projects.map((project) => (
            <ProjectCard
              key={project.title}
              href={project.href}
              title={project.title}
              description={project.description}
              dates={project.dates}
              tags={project.technologies}
              image={project.image}
              video={project.video}
              links={project.links}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
