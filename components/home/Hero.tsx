import Image from "next/image";
import { ArrowDown } from "lucide-react";
import { placeholders } from "@/content/projects/_placeholders";
import { site } from "@/content/site";
import type { Annotation } from "@/content/types";
import { JumpLink } from "@/components/ui/JumpLink";
import { PlaceholderTag } from "@/components/ui/PlaceholderTag";
import { HeroSequence } from "./HeroSequence";

const heroImage = placeholders.homeHero;

// Callouts on the hero render (05 A2). Positions are local values for this image.
const callouts: Annotation[] = [
  {
    x: 40,
    y: 30,
    labelX: 4,
    labelY: 12,
    text: "CAD + development · led by me",
  },
  { x: 62, y: 58, labelX: 64, labelY: 80, text: "Final render · led by me" },
];

// Curtain hero (05 A2, 07 §3B + §3H). Sticky: the next section slides over it.
export function Hero() {
  return (
    <HeroSequence>
      <section
        aria-labelledby="hero-title"
        data-hero="root"
        className="relative overflow-hidden bg-paper"
      >
        <div
          data-hero="inner"
          className="container-page flex min-h-[calc(100svh-4.5rem)] origin-bottom flex-col justify-between gap-10 pt-10 pb-8 sm:pt-14 lg:pt-16"
        >
          <div className="page-grid gap-y-10">
            <div className="col-span-full flex flex-col lg:col-span-6">
              <p data-hero="meta" className="label text-ink-3">
                {site.role}
              </p>
              <h1
                id="hero-title"
                data-hero="title"
                className="mt-6 max-w-[12ch] text-display"
              >
                {site.headline}
              </h1>
              <p
                data-hero="lead"
                className="mt-8 max-w-[44ch] text-lead text-ink-2"
              >
                {site.supporting}
              </p>
              <p data-hero="meta" className="mt-8 label text-ink-3">
                {site.availability}
              </p>
            </div>

            <figure className="col-span-full lg:col-span-6 lg:self-center">
              <div
                data-hero="image"
                className="load-clip relative aspect-4/3 overflow-hidden bg-raised"
              >
                <Image
                  src={heroImage.src}
                  alt={heroImage.alt}
                  loading="eager"
                  fetchPriority="high"
                  placeholder="blur"
                  quality={85}
                  sizes="(min-width: 64rem) 50vw, 100vw"
                  className="size-full object-cover"
                />
                {heroImage.placeholder && <PlaceholderTag />}

                {/* Leader lines (drawn by HeroSequence) */}
                <svg
                  aria-hidden="true"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                  className="pointer-events-none absolute inset-0 hidden size-full lg:block"
                >
                  {callouts.map((c) => (
                    <line
                      key={c.text}
                      data-hero="leader"
                      x1={c.x}
                      y1={c.y}
                      x2={c.labelX + 2}
                      y2={c.labelY + 3}
                      pathLength={1}
                      stroke="var(--color-accent)"
                      strokeWidth={1}
                      vectorEffect="non-scaling-stroke"
                    />
                  ))}
                </svg>
                {callouts.map((c, i) => (
                  <span key={c.text} aria-hidden="true">
                    <span
                      data-hero="dot"
                      className="absolute size-[5px] -translate-1/2 bg-accent"
                      style={{ left: `${c.x}%`, top: `${c.y}%` }}
                    />
                    <span
                      data-hero="dot"
                      className="absolute grid size-5 -translate-1/2 place-items-center bg-ink label text-paper lg:hidden"
                      style={{ left: `${c.x + 4}%`, top: `${c.y}%` }}
                    >
                      {i + 1}
                    </span>
                  </span>
                ))}
                <ul className="hidden lg:block">
                  {callouts.map((c) => (
                    <li
                      key={c.text}
                      data-hero="label"
                      className="absolute border-l border-accent bg-raised px-2 py-1 font-mono text-mono-body text-ink"
                      style={{ left: `${c.labelX}%`, top: `${c.labelY}%` }}
                    >
                      {c.text}
                    </li>
                  ))}
                </ul>
              </div>
              <figcaption className="mt-3 lg:sr-only">
                <ol className="flex flex-col gap-1">
                  {callouts.map((c, i) => (
                    <li
                      key={c.text}
                      data-hero="label"
                      className="font-mono text-mono-body text-ink-2"
                    >
                      <span className="text-ink">{i + 1}</span> {c.text}
                    </li>
                  ))}
                </ol>
              </figcaption>
            </figure>
          </div>

          <div className="flex items-end justify-between gap-6">
            <div data-hero="meta">
              {/* Jumps past the sticky process grid with a short fade (Checkpoint A). */}
              <JumpLink
                targetId="work"
                className="group inline-flex min-h-12 items-center gap-2 border border-ink px-5 label transition-colors duration-(--dur-base) ease-standard hover:border-accent-text hover:text-accent-text"
              >
                See selected work
                <ArrowDown
                  aria-hidden="true"
                  className="size-4 transition-transform duration-(--dur-base) ease-standard group-hover:translate-y-0.5"
                  strokeWidth={1.5}
                />
              </JumpLink>
            </div>
            <div
              data-hero="meta"
              aria-hidden="true"
              className="hidden items-center gap-3 label text-ink-3 sm:flex"
            >
              Scroll
              <span className="scroll-hint relative block h-14 w-px overflow-hidden bg-rule" />
            </div>
          </div>
        </div>
        <div
          data-hero="shade"
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-ink opacity-0"
        />
      </section>
    </HeroSequence>
  );
}
