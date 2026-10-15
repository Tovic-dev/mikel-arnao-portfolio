"use client";

import { useEffect, useState } from "react";

export interface IndexItem {
  id: string;
  number: string;
  title: string;
}

// Case-study contents (04 §3, 07 C1). "sticky": desktop column with an active
// marker. "details": collapsible list for tablet and mobile.
export function SectionIndex({
  items,
  variant,
}: {
  items: IndexItem[];
  variant: "sticky" | "details";
}) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    if (variant !== "sticky") return;
    const sections = items
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      // A section counts as current while it crosses the line at 40% of the viewport.
      { rootMargin: "-40% 0px -60% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [items, variant]);

  const list = (
    <ol className="flex flex-col">
      {items.map((item) => {
        const current = variant === "sticky" && item.id === active;
        return (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              aria-current={current ? "true" : undefined}
              className="relative flex min-h-9 items-center gap-3 pl-4 label text-ink-3 transition-colors duration-(--dur-base) ease-standard hover:text-ink aria-[current=true]:text-ink"
            >
              <span
                aria-hidden="true"
                className={`absolute inset-y-2 left-0 w-0.5 bg-accent transition-transform duration-(--dur-base) ease-standard ${current ? "scale-y-100" : "scale-y-0"}`}
              />
              <span className="tabular">{item.number}</span>
              {item.title}
            </a>
          </li>
        );
      })}
    </ol>
  );

  if (variant === "details") {
    return (
      <details className="group border-y border-rule">
        <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between label text-ink [&::-webkit-details-marker]:hidden">
          Contents
          <span
            aria-hidden="true"
            className="transition-transform duration-(--dur-base) ease-standard group-open:rotate-180"
          >
            ▾
          </span>
        </summary>
        <nav aria-label="Case study contents" className="pb-4">
          {list}
        </nav>
      </details>
    );
  }

  return <nav aria-label="Case study contents">{list}</nav>;
}
