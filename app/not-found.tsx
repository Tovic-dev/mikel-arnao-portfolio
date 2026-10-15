import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

// 404 (05 C2). Project links are added once projects exist.
export default function NotFound() {
  return (
    <section className="container-page py-(--section-space)">
      <p className="label text-ink-3">Error 404</p>
      <h1 className="mt-4 text-h1">Page not found</h1>
      <p className="mt-6 max-w-[40ch] text-lead text-ink-2">
        This page doesn&apos;t exist. The projects are on the homepage.
      </p>
      <Link
        href="/"
        className="mt-10 inline-flex min-h-12 items-center border border-ink px-5 label transition-colors duration-(--dur-base) ease-standard hover:border-accent-text hover:text-accent-text"
      >
        Back to the homepage
      </Link>
    </section>
  );
}
