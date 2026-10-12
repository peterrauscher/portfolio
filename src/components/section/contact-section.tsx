import { DATA } from "@/data/resume";
export default function ContactSection() {
  return (
    <div className="relative overflow-visible">
      <div className="bg-muted/40 border-border relative overflow-hidden rounded-[28px] border p-6 sm:p-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-foreground text-[36px] leading-[0.95] font-semibold tracking-[-0.035em] sm:text-[48px] md:text-[54px]">
            SAY
            <br />
            HELLO.
          </p>
          <a
            href={`mailto:${DATA.contact.email}`}
            className="bg-foreground text-background hover:bg-foreground/90 inline-flex items-center justify-center rounded-full px-6 py-3.5 text-[14px] font-medium transition-colors sm:text-[15px]"
          >
            {DATA.contact.email}
          </a>
        </div>
      </div>
    </div>
  );
}
