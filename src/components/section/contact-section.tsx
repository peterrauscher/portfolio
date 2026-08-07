import Link from "next/link";
import { FlickeringGrid } from "@/components/magicui/flickering-grid";
import { DATA } from "@/data/resume";

export default function ContactSection() {
  return (
    <div className="relative rounded-xl border p-10">
      <div className="bg-primary absolute -top-4 left-1/2 z-10 -translate-x-1/2 rounded-xl border px-4 py-1">
        <span className="text-background text-sm font-medium">Contact</span>
      </div>
      <div className="absolute inset-0 top-0 right-0 left-0 h-1/2 overflow-hidden rounded-xl">
        <FlickeringGrid
          className="h-full w-full"
          squareSize={2}
          gridGap={2}
          style={{
            maskImage: "linear-gradient(to bottom, black, transparent)",
            WebkitMaskImage: "linear-gradient(to bottom, black, transparent)",
          }}
        />
      </div>
      <div className="relative flex flex-col items-center gap-4 text-center">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
          Get in Touch
        </h2>
        <p className="text-muted-foreground mx-auto max-w-lg text-balance">
          Want to chat? Feel free to reach out via{" "}
          <Link
            href={`mailto:${DATA.contact.email}`}
            className="focus-visible:ring-ring rounded-sm text-blue-500 underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            email
          </Link>{" "}
          or connect with me on{" "}
          <Link
            href={DATA.contact.social.LinkedIn.url}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-visible:ring-ring rounded-sm text-blue-500 underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            LinkedIn
          </Link>
          . I&apos;ll respond whenever I can.
        </p>
      </div>
    </div>
  );
}
