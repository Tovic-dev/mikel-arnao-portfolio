import { ArrowUpRight } from "lucide-react";
import { getSite } from "@/content";
import { CopyEmailButton } from "@/components/ui/CopyEmailButton";

// Compact contact footer on every page (04 §3, 05 A6; made smaller at Checkpoint A).
// Opaque, so it covers the sticky sections above it.
export async function Footer() {
  const site = await getSite();
  return (
    <footer
      id="contact"
      className="relative z-(--z-raised) border-t border-rule-strong bg-paper"
    >
      <div className="container-page pt-10 pb-6 sm:pt-12">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="label text-ink-3">Contact</h2>
            <a
              href={`mailto:${site.email}`}
              className="mt-3 inline-block text-h3 break-all underline decoration-rule-strong decoration-1 underline-offset-[0.25em] transition-colors duration-(--dur-base) ease-standard hover:decoration-accent sm:break-normal"
            >
              {site.email}
            </a>
          </div>
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

        <div className="mt-10 flex flex-col gap-2 border-t border-rule pt-4 label text-ink-3 sm:flex-row sm:justify-between">
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
