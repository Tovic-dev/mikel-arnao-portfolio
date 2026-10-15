"use client";

import { useRef } from "react";
import type { ChartMedia } from "@/content/types";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";

// Horizontal bar chart (10 §5 charts, 07 C5). Bars are HTML so labels and values
// are real text; the bars grow once on scroll, the numbers never count up.
export function BarChart({ chart }: { chart: ChartMedia }) {
  const ref = useRef<HTMLDivElement>(null);
  const max = Math.max(100, ...chart.series.map((s) => s.value));

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      gsap.matchMedia().add(MOTION_OK, () => {
        gsap.from(gsap.utils.selector(el)("[data-bar]"), {
          scaleX: 0,
          duration: 0.5,
          stagger: 0.09,
          ease: "expo.out",
          scrollTrigger: { trigger: el, start: "top 80%", once: true },
        });
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className="bg-raised p-5 sm:p-8">
      <p className="sr-only">{chart.summary}</p>
      <p className="label text-ink-3">{chart.unit}</p>
      <dl className="mt-6 flex flex-col gap-5">
        {chart.series.map((s) => (
          <div
            key={s.label}
            className="grid gap-2 sm:grid-cols-[16rem_1fr_3.5rem] sm:items-center sm:gap-4"
          >
            <dt className="text-small text-ink">{s.label}</dt>
            <dd className="contents">
              <span className="relative block h-3 bg-rule" aria-hidden="true">
                <span
                  data-bar
                  className={`absolute inset-y-0 left-0 origin-left ${s.highlight ? "bg-accent" : "bg-ink"}`}
                  style={{ width: `${(s.value / max) * 100}%` }}
                />
              </span>
              <span className="font-mono text-mono-body text-ink tabular sm:text-right">
                {s.value}%
              </span>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
