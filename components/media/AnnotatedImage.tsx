"use client";

import { blur } from "@/lib/image";
import Image from "next/image";
import { useRef } from "react";
import type { Annotation, ImageAsset } from "@/content/types";
import { PlaceholderTag } from "@/components/ui/PlaceholderTag";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";

// Image with leader lines and real-text labels (10 §5 annotation, 07 C3).
// Desktop: labels on the image. Smaller screens: numbered markers + list below.
export function AnnotatedImage({
  image,
  annotations,
  sizes,
}: {
  image: ImageAsset;
  annotations: Annotation[];
  sizes: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const q = gsap.utils.selector(el);
      gsap.matchMedia().add(MOTION_OK, () => {
        gsap
          .timeline({
            scrollTrigger: { trigger: el, start: "top 75%", once: true },
          })
          .fromTo(
            q("[data-an=line]"),
            { strokeDasharray: 1, strokeDashoffset: 1 },
            {
              strokeDashoffset: 0,
              duration: 0.5,
              stagger: 0.09,
              ease: "power2.out",
            },
          )
          .from(q("[data-an=dot]"), { autoAlpha: 0, duration: 0.25 }, 0)
          .from(
            q("[data-an=label]"),
            { autoAlpha: 0, duration: 0.25, stagger: 0.06 },
            0.25,
          );
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref}>
      <div className="relative overflow-hidden bg-raised">
        <Image
          src={image.src}
          alt={image.alt}
          placeholder={blur(image.src)}
          sizes={sizes}
          className="block h-auto w-full"
        />
        {image.placeholder && <PlaceholderTag />}
        <svg
          aria-hidden="true"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-0 hidden size-full lg:block"
        >
          {annotations.map((a) => (
            <line
              key={a.text}
              data-an="line"
              x1={a.x}
              y1={a.y}
              x2={a.labelX + 1}
              y2={a.labelY + 2}
              pathLength={1}
              stroke="var(--color-accent)"
              strokeWidth={1}
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </svg>
        {annotations.map((a, i) => (
          <span
            key={a.text}
            data-an="dot"
            aria-hidden="true"
            className="absolute -translate-1/2"
            style={{ left: `${a.x}%`, top: `${a.y}%` }}
          >
            <span className="block size-[5px] bg-accent lg:block" />
            <span className="absolute top-1/2 left-3 grid size-5 -translate-y-1/2 place-items-center bg-ink label text-paper lg:hidden">
              {i + 1}
            </span>
          </span>
        ))}
        <ul className="hidden lg:block" aria-hidden="true">
          {annotations.map((a) => (
            <li
              key={a.text}
              data-an="label"
              className="absolute border-l border-accent bg-raised px-2 py-1 font-mono text-mono-body text-ink"
              style={{ left: `${a.labelX}%`, top: `${a.labelY}%` }}
            >
              {a.text}
            </li>
          ))}
        </ul>
      </div>
      <ol className="mt-3 flex flex-col gap-1 lg:sr-only">
        {annotations.map((a, i) => (
          <li key={a.text} className="font-mono text-mono-body text-ink-2">
            <span className="text-ink">{i + 1}</span> {a.text}
          </li>
        ))}
      </ol>
    </div>
  );
}
