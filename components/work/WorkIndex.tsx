"use client";

import type { Route } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import {
  fieldLabels,
  fieldShortLabels,
  type Field,
  type ImageAsset,
  type ProjectContext,
} from "@/content/types";
import { PlaceholderTag } from "@/components/ui/PlaceholderTag";
import { loadFlip } from "@/lib/flip";
import { gsap, MOTION_OK } from "@/lib/gsap";
import { HoverPreview } from "./HoverPreview";

export interface WorkItem {
  slug: string;
  order: number;
  title: string;
  productName?: string;
  fields: Field[];
  context: ProjectContext;
  company?: string;
  year: number;
  featured: boolean;
  image: ImageAsset;
}

type View = "list" | "grid";
interface Filters {
  fields: Field[];
  context: ProjectContext | "all";
  year: number | "all";
}

const FIELD_ORDER: Field[] = [
  "product-design",
  "engineering",
  "sustainability",
  "research",
  "brand",
  "ux",
];
const CONTEXT_LABEL: Record<ProjectContext, string> = {
  company: "With a company",
  academic: "Academic",
  competition: "Competition",
};
const EMPTY: Filters = { fields: [], context: "all", year: "all" };

const pad = (n: number) => String(n).padStart(2, "0");
const contextText = (i: WorkItem) =>
  i.context === "company" && i.company ? i.company : CONTEXT_LABEL[i.context];

function matches(i: WorkItem, f: Filters, ignore?: keyof Filters) {
  const field =
    ignore === "fields" ||
    f.fields.length === 0 ||
    i.fields.some((x) => f.fields.includes(x));
  const ctx =
    ignore === "context" || f.context === "all" || i.context === f.context;
  const year = ignore === "year" || f.year === "all" || i.year === f.year;
  return field && ctx && year;
}

function readUrl(items: WorkItem[]): { filters: Filters; view: View } {
  const p = new URLSearchParams(window.location.search);
  const fields = (p.get("field") ?? "")
    .split(",")
    .filter((x): x is Field => (FIELD_ORDER as string[]).includes(x));
  const ctx = p.get("context");
  const context: Filters["context"] =
    ctx === "company" || ctx === "academic" || ctx === "competition"
      ? ctx
      : "all";
  const y = Number(p.get("year"));
  const year = items.some((i) => i.year === y) ? y : "all";
  let view: View = p.get("view") === "grid" ? "grid" : "list";
  if (!p.get("view")) {
    try {
      if (sessionStorage.getItem("work-view") === "grid") view = "grid";
    } catch {}
  }
  return { filters: { fields, context, year }, view };
}

function writeUrl(f: Filters, view: View) {
  const p = new URLSearchParams();
  if (f.fields.length) p.set("field", f.fields.join(","));
  if (f.context !== "all") p.set("context", f.context);
  if (f.year !== "all") p.set("year", String(f.year));
  if (view === "grid") p.set("view", "grid");
  const q = p.toString();
  window.history.replaceState(null, "", q ? `?${q}` : window.location.pathname);
  try {
    sessionStorage.setItem("work-view", view);
  } catch {}
}

// Work page index (05 Part D): filters (Field multi-select, Context, Year) kept in
// the URL, List / Grid views, Flip transitions, hover preview. The server HTML is
// the full unfiltered list, so the page works without JavaScript.
export function WorkIndex({ items }: { items: WorkItem[] }) {
  const [filters, setFilters] = useState<Filters>(EMPTY);
  const [view, setView] = useState<View>("list");
  const root = useRef<HTMLDivElement>(null);
  const list = useRef<HTMLDivElement>(null);
  const pending = useRef<ReturnType<
    Awaited<ReturnType<typeof loadFlip>>["getState"]
  > | null>(null);
  const flip = useRef<Awaited<ReturnType<typeof loadFlip>> | null>(null);
  const motion = useRef(false);
  const ready = useRef(false);

  // Read the URL once, load Flip, play the load stagger.
  useEffect(() => {
    motion.current = window.matchMedia(MOTION_OK).matches;
    const initial = readUrl(items);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFilters(initial.filters);
    setView(initial.view);
    if (motion.current) {
      loadFlip().then((F) => (flip.current = F));
      const rows = list.current?.querySelectorAll("[data-item]:not([hidden])");
      if (rows?.length) {
        gsap.from(Array.from(rows).slice(0, 10), {
          autoAlpha: 0,
          y: 8,
          duration: 0.5,
          stagger: 0.04,
          ease: "expo.out",
          clearProps: "opacity,visibility,transform",
        });
      }
    }
    ready.current = true;
  }, [items]);

  useEffect(() => {
    if (ready.current) writeUrl(filters, view);
  }, [filters, view]);

  // Flip from the captured state once React has applied the new filters.
  useLayoutEffect(() => {
    const state = pending.current;
    const F = flip.current;
    if (!state || !F) return;
    pending.current = null;
    F.from(state, {
      duration: 0.45,
      ease: "power2.inOut",
      absolute: true,
      onEnter: (els) =>
        gsap.fromTo(
          els,
          { opacity: 0, y: 8 },
          { opacity: 1, y: 0, duration: 0.3 },
        ),
      onLeave: (els) => gsap.to(els, { opacity: 0, duration: 0.2 }),
    });
  }, [filters]);

  const updateFilters = useCallback((next: Filters) => {
    const F = flip.current;
    if (F && motion.current && list.current) {
      pending.current = F.getState(
        list.current.querySelectorAll("[data-item]"),
      );
    }
    setFilters(next);
  }, []);

  const changeView = (next: View) => {
    if (next === view) return;
    const el = list.current;
    if (!motion.current || !el) return setView(next);
    gsap.to(el, {
      opacity: 0,
      duration: 0.15,
      onComplete: () => setView(next),
    });
  };

  // Fade the new view in (after a view change only).
  const firstView = useRef(true);
  useLayoutEffect(() => {
    if (firstView.current) {
      firstView.current = false;
      return;
    }
    const el = list.current;
    if (!el) return;
    if (!motion.current) {
      el.style.opacity = "1";
      return;
    }
    gsap.set(el, { opacity: 1 });
    gsap.from(el.querySelectorAll("[data-item]:not([hidden])"), {
      autoAlpha: 0,
      y: 8,
      duration: 0.3,
      stagger: 0.03,
      clearProps: "opacity,visibility,transform",
    });
  }, [view]);

  const visible = items.filter((i) => matches(i, filters));
  const active =
    filters.fields.length +
    (filters.context !== "all" ? 1 : 0) +
    (filters.year !== "all" ? 1 : 0);
  const contexts = (["company", "academic", "competition"] as const).filter(
    (c) => items.some((i) => i.context === c),
  );
  const years = Array.from(new Set(items.map((i) => i.year))).sort(
    (a, b) => b - a,
  );
  const fields = FIELD_ORDER.filter((f) =>
    items.some((i) => i.fields.includes(f)),
  );

  const toggleField = (f: Field) =>
    updateFilters({
      ...filters,
      fields: filters.fields.includes(f)
        ? filters.fields.filter((x) => x !== f)
        : [...filters.fields, f],
    });

  const controls = (
    <div className="flex flex-col gap-4">
      <Group legend="Field">
        {fields.map((f) => {
          const count = items.filter(
            (i) => i.fields.includes(f) && matches(i, filters, "fields"),
          ).length;
          const on = filters.fields.includes(f);
          return (
            <Chip
              key={f}
              pressed={on}
              dim={!on && count === 0}
              onClick={() => toggleField(f)}
            >
              {fieldLabels[f]}{" "}
              <span className="tabular opacity-60">{count}</span>
            </Chip>
          );
        })}
      </Group>
      <Group legend="Context">
        <Chip
          pressed={filters.context === "all"}
          onClick={() => updateFilters({ ...filters, context: "all" })}
        >
          All
        </Chip>
        {contexts.map((c) => (
          <Chip
            key={c}
            pressed={filters.context === c}
            dim={
              filters.context !== c &&
              !items.some(
                (i) => i.context === c && matches(i, filters, "context"),
              )
            }
            onClick={() => updateFilters({ ...filters, context: c })}
          >
            {CONTEXT_LABEL[c]}
          </Chip>
        ))}
      </Group>
      <Group legend="Year">
        <Chip
          pressed={filters.year === "all"}
          onClick={() => updateFilters({ ...filters, year: "all" })}
        >
          All
        </Chip>
        {years.map((y) => (
          <Chip
            key={y}
            pressed={filters.year === y}
            dim={
              filters.year !== y &&
              !items.some((i) => i.year === y && matches(i, filters, "year"))
            }
            onClick={() => updateFilters({ ...filters, year: y })}
          >
            {y}
          </Chip>
        ))}
      </Group>
    </div>
  );

  return (
    <div ref={root}>
      {/* Filters: inline from 640 px, collapsible on phones */}
      <div className="hidden border-t border-rule-strong pt-6 sm:block">
        {controls}
      </div>
      <details className="group border-y border-rule sm:hidden">
        <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between label text-ink [&::-webkit-details-marker]:hidden">
          Filters{active > 0 ? ` (${active} active)` : ""}
          <span
            aria-hidden="true"
            className="transition-transform duration-(--dur-base) group-open:rotate-180"
          >
            ▾
          </span>
        </summary>
        <div className="pb-5">{controls}</div>
      </details>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <p role="status" aria-live="polite" className="label text-ink">
          Showing {visible.length} of {items.length} projects
          {active > 0 && (
            <>
              {" · "}
              <button
                type="button"
                onClick={() => updateFilters(EMPTY)}
                className="cursor-pointer underline underline-offset-4 hover:text-accent-text"
              >
                Clear filters
              </button>
            </>
          )}
        </p>
        <div role="group" aria-label="View" className="flex items-center gap-3">
          <span aria-hidden="true" className="label text-ink-3">
            View
          </span>
          <div className="flex">
            {(["list", "grid"] as const).map((v) => (
              <button
                key={v}
                type="button"
                aria-pressed={view === v}
                onClick={() => changeView(v)}
                className="min-h-11 cursor-pointer border border-rule-strong px-4 label text-ink-2 not-first:-ml-px hover:text-ink aria-pressed:border-ink aria-pressed:bg-ink aria-pressed:text-paper"
              >
                {v === "list" ? "List" : "Grid"}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div ref={list} className="mt-6">
        {view === "list" ? (
          <>
            <div
              aria-hidden="true"
              className="hidden grid-cols-[4.5rem_minmax(0,1.6fr)_minmax(0,1.2fr)_minmax(0,0.9fr)_4rem_1.5rem] gap-4 border-b border-rule-strong pb-2 label text-ink-3 lg:grid"
            >
              <span>No.</span>
              <span>Project</span>
              <span>Field</span>
              <span>Context</span>
              <span>Year</span>
              <span />
            </div>
            <ol>
              {items.map((i) => (
                <li
                  key={i.slug}
                  data-item
                  data-row={i.slug}
                  hidden={!matches(i, filters)}
                  className="border-b border-rule"
                >
                  <Link
                    href={`/work/${i.slug}` as Route}
                    className="group grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 py-4 transition-colors duration-(--dur-base) ease-standard hover:bg-raised lg:grid-cols-[4.5rem_minmax(0,1.6fr)_minmax(0,1.2fr)_minmax(0,0.9fr)_4rem_1.5rem] lg:items-baseline"
                  >
                    <span className="flex items-center gap-3 lg:items-baseline">
                      <span className="relative size-16 shrink-0 overflow-hidden bg-raised lg:pointer-fine:motion-safe:hidden">
                        <Image
                          src={i.image.src}
                          alt=""
                          sizes="64px"
                          className="size-full object-cover"
                        />
                      </span>
                      <span className="hidden label text-ink sm:inline">
                        {pad(i.order)}
                        {i.featured && (
                          <>
                            <span
                              aria-hidden="true"
                              className="ml-1.5 inline-block size-1.5 bg-accent align-middle"
                            />
                            <span className="sr-only"> Featured</span>
                          </>
                        )}
                      </span>
                    </span>
                    <span className="min-w-0">
                      <span className="block text-h3 transition-colors duration-(--dur-base) ease-standard group-hover:text-accent-text">
                        {i.title}
                      </span>
                      {i.productName && (
                        <span className="mt-0.5 block text-small text-ink-2">
                          {i.productName}
                        </span>
                      )}
                      <span className="mt-1 block label text-ink-3 lg:hidden">
                        {i.fields.map((f) => fieldShortLabels[f]).join(" · ")}
                        <span className="hidden sm:inline">
                          {" "}
                          — {contextText(i)}
                        </span>
                        <span className="sm:hidden"> · {i.year}</span>
                      </span>
                    </span>
                    <span className="hidden label text-ink-2 lg:block">
                      <span className="sr-only">Field: </span>
                      {i.fields.map((f) => fieldShortLabels[f]).join(" · ")}
                    </span>
                    <span className="hidden text-small text-ink-2 lg:block">
                      <span className="sr-only">Context: </span>
                      {contextText(i)}
                    </span>
                    <span className="hidden label text-ink tabular sm:block">
                      <span className="sr-only">Year: </span>
                      {i.year}
                    </span>
                    <ArrowRight
                      aria-hidden="true"
                      className="hidden size-4 transition-transform duration-(--dur-base) ease-standard group-hover:translate-x-1 lg:block"
                      strokeWidth={1.5}
                    />
                  </Link>
                </li>
              ))}
            </ol>
            <HoverPreview
              listRef={list}
              images={items.map((i) => ({ slug: i.slug, image: i.image }))}
            />
          </>
        ) : (
          <ol className="grid gap-x-(--grid-gutter) gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((i) => (
              <li key={i.slug} data-item hidden={!matches(i, filters)}>
                <Link href={`/work/${i.slug}` as Route} className="group block">
                  <span className="relative block aspect-3/2 overflow-hidden bg-raised">
                    <Image
                      src={i.image.src}
                      alt={i.image.alt}
                      placeholder="blur"
                      sizes="(min-width: 64rem) 30vw, (min-width: 40rem) 45vw, 100vw"
                      className="size-full object-cover transition-transform duration-600 ease-standard group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                    />
                    {i.image.placeholder && <PlaceholderTag />}
                  </span>
                  <span className="mt-3 flex items-center gap-2 label text-ink">
                    {pad(i.order)}
                    {i.featured && (
                      <>
                        <span
                          aria-hidden="true"
                          className="inline-block size-1.5 bg-accent"
                        />
                        <span className="sr-only">Featured</span>
                      </>
                    )}
                    <span className="ml-auto text-ink-3 tabular">{i.year}</span>
                  </span>
                  <span className="mt-2 block text-h3 transition-colors duration-(--dur-base) ease-standard group-hover:text-accent-text">
                    {i.title}
                  </span>
                  <span className="mt-1 block label text-ink-3">
                    {i.fields.map((f) => fieldShortLabels[f]).join(" · ")}
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        )}

        {visible.length === 0 && (
          <p className="border-t border-rule py-12 text-lead text-ink-2">
            No projects match these filters.{" "}
            <button
              type="button"
              onClick={() => updateFilters(EMPTY)}
              className="cursor-pointer underline underline-offset-4 hover:text-accent-text"
            >
              Clear filters
            </button>
          </p>
        )}
      </div>
    </div>
  );
}

function Group({
  legend,
  children,
}: {
  legend: string;
  children: React.ReactNode;
}) {
  return (
    <fieldset className="grid gap-2 sm:grid-cols-[6rem_1fr] sm:items-baseline">
      <legend className="float-left label text-ink-3 sm:float-none sm:contents">
        <span className="block pt-2.5">{legend}</span>
      </legend>
      <div className="flex flex-wrap gap-2">{children}</div>
    </fieldset>
  );
}

function Chip({
  pressed,
  dim,
  onClick,
  children,
}: {
  pressed: boolean;
  dim?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      aria-disabled={dim || undefined}
      onClick={() => !dim && onClick()}
      className="min-h-11 cursor-pointer border border-rule-strong px-3 label text-ink transition-colors duration-(--dur-fast) ease-standard hover:border-ink aria-disabled:cursor-default aria-disabled:text-ink-3 aria-disabled:hover:border-rule-strong aria-pressed:border-ink aria-pressed:bg-ink aria-pressed:text-paper"
    >
      {children}
    </button>
  );
}
