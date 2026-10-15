import type { Metadata, Route } from "next";
import Link from "next/link";
import { getProjects } from "@/content";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

// 404 (05 C2): short message, the four projects, a way home. No animation.
export default function NotFound() {
  const projects = getProjects();
  return (
    <section className="container-page py-(--section-space)">
      <p className="label text-ink-3">Error 404</p>
      <h1 className="mt-4 text-h1">Page not found</h1>
      <p className="mt-6 max-w-[40ch] text-lead text-ink-2">
        This page doesn&apos;t exist. Here are the projects instead.
      </p>
      <ul className="mt-12 max-w-3xl border-b border-rule">
        {projects.map((p) => (
          <li key={p.slug} className="border-t border-rule">
            <Link
              href={`/work/${p.slug}` as Route}
              className="group grid min-h-12 grid-cols-[3rem_1fr] items-center gap-4 py-3"
            >
              <span className="label text-ink-3">
                {String(p.order).padStart(2, "0")}
              </span>
              <span className="text-ink transition-colors duration-(--dur-base) ease-standard group-hover:text-accent-text">
                {p.title}
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <Link
        href="/"
        className="mt-10 inline-flex min-h-12 items-center border border-ink px-5 label transition-colors duration-(--dur-base) ease-standard hover:border-accent-text hover:text-accent-text"
      >
        Back to the homepage
      </Link>
    </section>
  );
}
