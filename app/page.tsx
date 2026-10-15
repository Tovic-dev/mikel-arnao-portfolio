import { site } from "@/content/site";

// Homepage shell. Hero, process grid and project list arrive in slice 8.2.
export default function HomePage() {
  return (
    <section className="container-page py-(--section-space)">
      <p className="label text-ink-3">{site.role}</p>
      <h1 className="mt-6 max-w-[14ch] text-display">{site.headline}</h1>
      <p className="mt-8 max-w-[40ch] text-lead text-ink-2">
        {site.supporting}
      </p>
      <p className="mt-8 label text-ink-3">{site.availability}</p>
      <div id="work" className="mt-(--section-space)" />
    </section>
  );
}
