"use client";

import { blur } from "@/lib/image";
import type { Route } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight, X } from "lucide-react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { labTypeLabels, type LabEntry, type LabType } from "@/content/types";
import { PlaceholderTag } from "@/components/ui/PlaceholderTag";
import { loadFlip } from "@/lib/flip";
import { gsap, MOTION_OK } from "@/lib/gsap";

type Filter = LabType | "all";
const year = (d: string) => d.slice(0, 4);

function writeUrl(type: Filter, entry: string | null) {
  const p = new URLSearchParams();
  if (type !== "all") p.set("type", type);
  if (entry) p.set("entry", entry);
  const q = p.toString();
  window.history.replaceState(null, "", q ? `?${q}` : window.location.pathname);
}

// Lab contact sheet (05 Part G): numbered frames in justified rows, a Type filter
// kept in the URL, and a lightbox (<dialog>) with shareable ?entry= links.
// The server HTML is the full sheet, so it works without JavaScript.
export function LabSheet({
  entries,
  projectTitles,
}: {
  entries: LabEntry[];
  projectTitles: Record<string, string>;
}) {
  const [type, setType] = useState<Filter>("all");
  const [open, setOpen] = useState<string | null>(null);
  const sheet = useRef<HTMLUListElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const flip = useRef<Awaited<ReturnType<typeof loadFlip>> | null>(null);
  const pending = useRef<ReturnType<
    Awaited<ReturnType<typeof loadFlip>>["getState"]
  > | null>(null);
  const motion = useRef(false);
  const ready = useRef(false);

  const types = (Object.keys(labTypeLabels) as LabType[]).filter((t) =>
    entries.some((e) => e.type === t),
  );
  const visible = entries.filter((e) => type === "all" || e.type === type);
  const current = entries.find((e) => e.id === open) ?? null;

  // Read the URL, load Flip, reveal the first frames.
  useEffect(() => {
    motion.current = window.matchMedia(MOTION_OK).matches;
    const p = new URLSearchParams(window.location.search);
    const t = p.get("type");
    if (t && (types as string[]).includes(t)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setType(t as LabType);
    }
    const e = p.get("entry");
    if (e && entries.some((x) => x.id === e)) setOpen(e);
    if (motion.current) {
      loadFlip().then((F) => (flip.current = F));
      const frames = sheet.current?.querySelectorAll("[data-frame] [data-img]");
      if (frames?.length) {
        gsap.fromTo(
          Array.from(frames).slice(0, 12),
          { clipPath: "inset(100% 0% 0% 0%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 0.8,
            stagger: 0.04,
            ease: "power3.inOut",
            clearProps: "clipPath",
          },
        );
      }
    }
    ready.current = true;
    // Run once on mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (ready.current) writeUrl(type, open);
  }, [type, open]);

  // Flip after a filter change.
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
        gsap.fromTo(els, { opacity: 0 }, { opacity: 1, duration: 0.3 }),
      onLeave: (els) => gsap.to(els, { opacity: 0, duration: 0.2 }),
    });
  }, [type]);

  // Open / close the dialog to match state.
  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (current && !d.open) {
      d.showModal();
      if (motion.current) {
        gsap.fromTo(
          d.querySelector("[data-panel]"),
          { opacity: 0, scale: 0.97 },
          { opacity: 1, scale: 1, duration: 0.3, ease: "power2.out" },
        );
      }
    } else if (!current && d.open) {
      d.close();
    }
  }, [current]);

  const changeType = (t: Filter) => {
    const F = flip.current;
    if (F && motion.current && sheet.current) {
      pending.current = F.getState(
        sheet.current.querySelectorAll("[data-frame]"),
      );
    }
    setType(t);
  };

  const close = () => {
    setOpen(null);
    opener.current?.focus();
  };

  const step = (dir: 1 | -1) => {
    if (!current) return;
    const i = visible.findIndex((e) => e.id === current.id);
    const next = visible[(i + dir + visible.length) % visible.length];
    if (next) setOpen(next.id);
  };

  return (
    <>
      <div className="flex flex-col gap-3 border-t border-rule-strong pt-6 sm:flex-row sm:items-baseline sm:gap-6">
        <span className="label text-ink-3" id="lab-type">
          Type
        </span>
        <div
          role="group"
          aria-labelledby="lab-type"
          className="flex flex-wrap gap-2"
        >
          {(["all", ...types] as Filter[]).map((t) => (
            <button
              key={t}
              type="button"
              aria-pressed={type === t}
              onClick={() => changeType(t)}
              className="min-h-11 cursor-pointer border border-rule-strong px-3 label text-ink transition-colors duration-(--dur-fast) ease-standard hover:border-ink aria-pressed:border-ink aria-pressed:bg-ink aria-pressed:text-paper"
            >
              {t === "all" ? "All" : labTypeLabels[t]}
            </button>
          ))}
        </div>
        <p
          role="status"
          aria-live="polite"
          className="label text-ink-3 sm:ml-auto"
        >
          {visible.length} {visible.length === 1 ? "entry" : "entries"}
        </p>
      </div>

      <ul
        ref={sheet}
        className="mt-8 flex flex-wrap gap-x-(--grid-gutter) gap-y-8"
      >
        {entries.map((e) => {
          const img = e.images[0];
          const ratio = img.src.width / img.src.height;
          return (
            <li
              key={e.id}
              data-frame
              hidden={type !== "all" && e.type !== type}
              className="[--b:9rem] sm:[--b:12rem] lg:[--b:15rem]"
              style={{ flex: `${ratio} 1 calc(var(--b) * ${ratio})` }}
            >
              <button
                type="button"
                onClick={(ev) => {
                  opener.current = ev.currentTarget;
                  setOpen(e.id);
                }}
                aria-label={`Open ${e.id}: ${e.title}`}
                className="group block w-full cursor-pointer text-left"
              >
                <span
                  data-img
                  className="relative block overflow-hidden bg-raised"
                  style={{
                    aspectRatio: `${img.src.width} / ${img.src.height}`,
                  }}
                >
                  <Image
                    src={img.src}
                    alt=""
                    placeholder={blur(img.src)}
                    sizes="(min-width: 64rem) 30vw, 50vw"
                    className="size-full object-cover transition-transform duration-600 ease-standard group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                  />
                  {img.placeholder && <PlaceholderTag />}
                </span>
                <span className="mt-2 flex items-baseline gap-2 label">
                  <span className="text-ink">{e.id}</span>
                  <span className="text-ink-3">
                    · {labTypeLabels[e.type]} · {year(e.date)}
                  </span>
                </span>
                <span className="mt-1 block text-small text-ink transition-colors duration-(--dur-base) group-hover:text-accent-text">
                  {e.title}
                </span>
              </button>
            </li>
          );
        })}
        {/* Filler keeps the last row from stretching. */}
        <li aria-hidden="true" style={{ flex: "10 1 0" }} />
      </ul>

      <dialog
        ref={dialog}
        aria-labelledby="lab-entry-title"
        onCancel={(ev) => {
          ev.preventDefault();
          close();
        }}
        onClick={(ev) => {
          if (ev.target === ev.currentTarget) close();
        }}
        className="m-auto max-h-[92svh] w-[min(92vw,72rem)] overflow-auto bg-paper p-0 text-ink backdrop:bg-ink/70"
      >
        {current && (
          <div
            data-panel
            className="grid gap-6 p-4 sm:p-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] lg:gap-8"
          >
            <div className="flex flex-col gap-3">
              {current.images.map((img, i) => (
                <div key={i} className="relative overflow-hidden bg-raised">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    placeholder={blur(img.src)}
                    sizes="(min-width: 64rem) 60vw, 92vw"
                    className="block h-auto w-full"
                  />
                  {img.placeholder && <PlaceholderTag />}
                </div>
              ))}
            </div>
            <div className="flex flex-col">
              <div className="flex items-start justify-between gap-4">
                <p className="label text-ink-3">
                  <span className="text-ink">{current.id}</span> ·{" "}
                  {labTypeLabels[current.type]} · {year(current.date)}
                </p>
                <button
                  type="button"
                  onClick={close}
                  aria-label="Close"
                  className="-mt-2 -mr-2 grid size-11 cursor-pointer place-items-center hover:text-accent-text"
                >
                  <X aria-hidden="true" className="size-5" strokeWidth={1.5} />
                </button>
              </div>
              <h2 id="lab-entry-title" className="mt-3 text-h3">
                {current.title}
              </h2>
              <p className="mt-4 text-body text-ink-2">{current.note}</p>
              {current.relatedProject &&
                projectTitles[current.relatedProject] && (
                  <Link
                    href={`/work/${current.relatedProject}` as Route}
                    className="mt-6 font-mono text-mono-body underline decoration-rule-strong underline-offset-4 hover:decoration-accent"
                  >
                    From the {projectTitles[current.relatedProject]} project
                  </Link>
                )}
              {current.link && (
                <a
                  href={current.link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-1 font-mono text-mono-body underline decoration-rule-strong underline-offset-4 hover:decoration-accent"
                >
                  {current.link.label}
                  <ArrowUpRight
                    aria-hidden="true"
                    className="size-4"
                    strokeWidth={1.5}
                  />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              )}
              {visible.length > 1 && (
                <div className="mt-auto flex gap-2 pt-8">
                  <button
                    type="button"
                    onClick={() => step(-1)}
                    className="inline-flex min-h-11 flex-1 cursor-pointer items-center justify-center gap-2 border border-rule-strong label hover:border-ink"
                  >
                    <ArrowLeft
                      aria-hidden="true"
                      className="size-4"
                      strokeWidth={1.5}
                    />
                    Previous
                  </button>
                  <button
                    type="button"
                    onClick={() => step(1)}
                    className="inline-flex min-h-11 flex-1 cursor-pointer items-center justify-center gap-2 border border-rule-strong label hover:border-ink"
                  >
                    Next
                    <ArrowRight
                      aria-hidden="true"
                      className="size-4"
                      strokeWidth={1.5}
                    />
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
