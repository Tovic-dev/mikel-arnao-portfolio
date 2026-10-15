import type { Metadata } from "next";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  alternates: { canonical: "/about" },
};

// /about shell (05 C1). Full content arrives in slice 8.2.
export default function AboutPage() {
  return (
    <section className="container-page py-(--section-space)">
      <h1 className="text-h1">About</h1>
      <dl className="mt-12 max-w-2xl">
        <div className="grid grid-cols-[10ch_1fr] gap-4 border-t border-rule py-3">
          <dt className="pt-1 label text-ink-3">Education</dt>
          <dd className="text-small">
            {site.education.institution} · {site.education.degree} ·{" "}
            {site.education.years}
          </dd>
        </div>
        <div className="grid grid-cols-[10ch_1fr] gap-4 border-t border-rule py-3">
          <dt className="pt-1 label text-ink-3">Languages</dt>
          <dd className="text-small">
            {site.languages.map((l) => `${l.name}: ${l.level}`).join(" · ")}
          </dd>
        </div>
      </dl>
    </section>
  );
}
