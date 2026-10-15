import { ArrowUpRight } from "lucide-react";
import { site } from "@/content/site";
import { CopyEmailButton } from "@/components/ui/CopyEmailButton";

// Contact block on every page (04 §3, 05 A6). Opaque, so it covers the curtain hero.
export function Footer() {
  return (
    <footer
      id="contact"
      className="relative z-(--z-raised) border-t border-rule-strong bg-paper"
    >
      <div className="container-page py-(--section-space)">
        <p className="label text-ink-3">Contact</p>
        <h2 className="mt-4 text-h2">Let&apos;s talk</h2>

        <div className="mt-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <a
            href={`mailto:${site.email}`}
            className="text-h2 break-all underline decoration-rule-strong decoration-1 underline-offset-[0.2em] transition-colors duration-(--dur-base) ease-standard hover:decoration-accent sm:break-normal"
          >
            {site.email}
          </a>
          <div className="flex flex-wrap items-center gap-3">
            <CopyEmailButton email={site.email} />
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex min-h-12 items-center gap-2 border border-ink px-5 label transition-colors duration-(--dur-base) ease-standard hover:border-accent-text hover:text-accent-text"
            >
              LinkedIn
              <ArrowUpRight
                aria-hidden="true"
                className="size-4 transition-transform duration-(--dur-base) ease-standard group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                strokeWidth={1.5}
              />
              <span className="sr-only">(opens LinkedIn in a new tab)</span>
            </a>
          </div>
        </div>

        <div className="mt-(--section-space) flex flex-col gap-2 border-t border-rule pt-6 label text-ink-3 sm:flex-row sm:justify-between">
          <span>{site.location}</span>
          <span>{site.signOff}</span>
          <span>
            © {new Date().getFullYear()} {site.name}
          </span>
        </div>
      </div>
    </footer>
  );
}
