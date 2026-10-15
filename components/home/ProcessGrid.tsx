"use client";

import Image from "next/image";
import { ArrowDown } from "lucide-react";
import { useRef } from "react";
import type { ImageAsset } from "@/content/types";
import { PlaceholderTag } from "@/components/ui/PlaceholderTag";
import {
  gsap,
  MOTION_OK,
  ScrollTrigger,
  scrubAmount,
  useGSAP,
} from "@/lib/gsap";

interface ProcessGridProps {
  /** 12 tiles in row-major order: one row per project, columns sketch → CAD → render. */
  tiles: ImageAsset[];
  label: string;
  title: string;
  lead: string;
  ctaLabel: string;
  ctaHref: string;
}

const COLUMNS = 3;

// Sticky process grid (05 A2b, 07 §3I). Adapted from "Sticky Grid Scroll" by
// Theo Plawinski (Codrops, github.com/theoplawinski/codrops-sticky-grid-scroll), MIT licence.
//
// Server HTML is the static layout (text above a 3×4 grid), which is also the
// reduced-motion and no-JS version. With motion allowed, JS switches to the sticky stage.
export function ProcessGrid({
  tiles,
  label,
  title,
  lead,
  ctaLabel,
  ctaHref,
}: ProcessGridProps) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = root.current;
      if (!section) return;
      const q = gsap.utils.selector(section);
      const mm = gsap.matchMedia();

      mm.add({ motion: MOTION_OK, small: "(max-width: 39.99rem)" }, (ctx) => {
        const { motion, small } = ctx.conditions as {
          motion: boolean;
          small: boolean;
        };
        if (!motion) return;

        section.dataset.animated = "true";
        const grid = q("[data-pg=grid]")[0] as HTMLElement;
        const content = q("[data-pg=content]")[0] as HTMLElement;
        const heading = q("[data-pg=title]")[0] as HTMLElement;
        const extras = q("[data-pg=extra]");
        const cta = q("[data-pg-cta]")[0] as HTMLElement | undefined;
        const items = q("[data-pg=item]");
        const columns: HTMLElement[][] = Array.from(
          { length: COLUMNS },
          () => [],
        );
        items.forEach((item, i) =>
          columns[i % COLUMNS]?.push(item as HTMLElement),
        );
        const [left = [], middle = [], right = []] = columns;

        if (cta) cta.tabIndex = -1;

        const distance = () => {
          const wh = window.innerHeight;
          return wh - (wh - grid.offsetHeight) / 2;
        };

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            // The last screen of the section is the curtain (see below).
            end: () => `+=${section.offsetHeight - 2 * window.innerHeight}`,
            scrub: scrubAmount(),
            invalidateOnRefresh: true,
            onToggle: (self) => {
              gsap.set(items, {
                willChange: self.isActive ? "transform" : "auto",
              });
            },
          },
        });

        // 1. Column reveal: even columns from above, odd from below.
        const reveal = gsap.timeline();
        columns.forEach((column, c) => {
          const fromTop = c % 2 === 0;
          reveal.from(
            column,
            {
              y: () => distance() * (fromTop ? -1 : 1),
              stagger: { each: 0.06, from: fromTop ? "end" : "start" },
              ease: "power1.inOut",
            },
            "reveal",
          );
        });

        // 2. Exploded zoom: sides push out, the middle (CAD) column splits.
        const half = Math.floor(middle.length / 2);
        const scale = small ? 1.8 : 2.05;
        // The middle column opens at least 40% of a tile (as in the original), and
        // more when needed so the gap always fits the text block (tall phones).
        const splitY = () => {
          const tile = middle[0]?.offsetHeight ?? 0;
          const rowGap = parseFloat(getComputedStyle(grid).rowGap) || 0;
          const label = extras[0] as HTMLElement | undefined;
          const block =
            label && cta
              ? cta.getBoundingClientRect().bottom -
                label.getBoundingClientRect().top
              : content.offsetHeight / 2;
          const needed = (block / 2 + 32) / scale - rowGap / 2;
          return Math.max(tile * 0.4, needed);
        };
        const zoom = gsap.timeline({
          defaults: { duration: 1, ease: "power3.inOut" },
        });
        zoom
          .to(grid, { scale })
          .to(left, { xPercent: -40 }, "<")
          .to(right, { xPercent: 40 }, "<")
          .to(
            middle,
            {
              y: (i: number) => (i < half ? -1 : 1) * splitY(),
              duration: 0.5,
              ease: "power1.inOut",
            },
            "-=0.5",
          )
          // Text appears while the tiles spread and lands with them (t = 1).
          .fromTo(
            heading,
            { autoAlpha: 0, y: 40 },
            { autoAlpha: 1, y: 0, duration: 0.6, ease: "power2.out" },
            0.4,
          )
          .fromTo(
            extras,
            { autoAlpha: 0, y: 16 },
            { autoAlpha: 1, y: 0, duration: 0.6, ease: "power2.out" },
            0.4,
          );

        tl.add(reveal)
          .add(zoom, "-=0.6")
          .add(() => {
            if (cta) cta.tabIndex = tl.scrollTrigger?.direction === 1 ? 0 : -1;
          })
          .to({}, { duration: 0.5 });

        // Curtain out: the featured projects slide over the stage, which recedes.
        const next = section.nextElementSibling as HTMLElement | null;
        const stage = q("[data-pg=stage]")[0] as HTMLElement;
        const shade = q("[data-pg=shade]")[0] as HTMLElement;
        if (next && stage && shade) {
          gsap
            .timeline({
              scrollTrigger: {
                trigger: next,
                start: "top bottom",
                end: "top top",
                scrub: scrubAmount(),
              },
            })
            .to(
              stage,
              { scale: small ? 0.96 : 0.94, yPercent: -8, ease: "none" },
              0,
            )
            .to(shade, { opacity: small ? 0.35 : 0.5, ease: "none" }, 0);
        }

        ScrollTrigger.refresh();

        return () => {
          delete section.dataset.animated;
          if (cta) cta.tabIndex = 0;
        };
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="process"
      aria-labelledby="process-title"
      className="group/pg relative z-1 bg-ink text-paper data-[animated=true]:h-[300svh] sm:data-[animated=true]:h-[380vh]"
    >
      <div
        data-pg="stage"
        className="container-page origin-bottom py-(--section-space) group-data-[animated=true]/pg:sticky group-data-[animated=true]/pg:top-0 group-data-[animated=true]/pg:h-svh group-data-[animated=true]/pg:overflow-hidden group-data-[animated=true]/pg:py-0"
      >
        <div
          data-pg="content"
          className="relative z-1 flex flex-col items-start text-left group-data-[animated=true]/pg:h-svh group-data-[animated=true]/pg:items-center group-data-[animated=true]/pg:justify-center group-data-[animated=true]/pg:text-center"
        >
          <p data-pg="extra" className="label text-paper/70">
            {label}
          </p>
          <h2
            id="process-title"
            data-pg="title"
            className="mt-6 max-w-[20ch] text-h1"
          >
            {title}
          </h2>
          <p
            data-pg="extra"
            className="mt-6 max-w-[48ch] text-lead text-paper/75"
          >
            {lead}
          </p>
          <a
            data-pg="extra"
            data-pg-cta=""
            href={ctaHref}
            className="group mt-8 inline-flex min-h-12 items-center gap-2 border border-paper/60 px-5 label transition-colors duration-(--dur-base) ease-standard hover:border-paper focus-visible:outline-paper"
          >
            {ctaLabel}
            <ArrowDown
              aria-hidden="true"
              className="size-4 transition-transform duration-(--dur-base) ease-standard group-hover:translate-y-0.5"
              strokeWidth={1.5}
            />
          </a>
        </div>

        <div className="mt-16 group-data-[animated=true]/pg:pointer-events-none group-data-[animated=true]/pg:absolute group-data-[animated=true]/pg:top-1/2 group-data-[animated=true]/pg:left-1/2 group-data-[animated=true]/pg:z-2 group-data-[animated=true]/pg:mt-0 group-data-[animated=true]/pg:w-[88vw] group-data-[animated=true]/pg:-translate-1/2 sm:group-data-[animated=true]/pg:w-[70vw] lg:group-data-[animated=true]/pg:w-[min(50vw,47.5rem)]">
          <ul
            data-pg="grid"
            className="grid grid-cols-3 gap-x-3 gap-y-4 sm:gap-x-6 sm:gap-y-8 lg:gap-x-8 lg:gap-y-10"
          >
            {tiles.map((tile, i) => (
              <li
                key={i}
                data-pg="item"
                className="relative aspect-square overflow-hidden bg-ink-2"
              >
                <Image
                  src={tile.src}
                  alt=""
                  placeholder="blur"
                  sizes="(min-width: 64rem) 34vw, 60vw"
                  className="size-full object-cover"
                />
                {tile.placeholder && i === 0 && <PlaceholderTag />}
              </li>
            ))}
          </ul>
        </div>
        <div
          data-pg="shade"
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-3 hidden bg-ink opacity-0 group-data-[animated=true]/pg:block"
        />
      </div>
    </section>
  );
}
