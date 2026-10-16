import { blur } from "@/lib/image";
import type { Metadata, Route } from "next";
import Image from "next/image";
import Link from "next/link";
import { getAbout, getProjects, getSite } from "@/content";
import { Reveal } from "@/components/motion/Reveal";
import { RevealHeading } from "@/components/motion/RevealHeading";
import { PlaceholderTag } from "@/components/ui/PlaceholderTag";

export const metadata: Metadata = {
  title: "About",
  description:
    "Mikel Arnao studies Industrial Design and Product Development Engineering at Mondragon Unibertsitatea (2023–2027). Education, way of working, tools and interests.",
  alternates: { canonical: "/about" },
};

// /about (05 C1). Replaces a CV download (D-18). Copy comes from the About global.
export default async function AboutPage() {
  const [site, about, projects] = await Promise.all([
    getSite(),
    getAbout(),
    getProjects(),
  ]);
  const { portrait, tools } = about;
  const years = [site.education.years, site.education.current]
    .filter(Boolean)
    .join(" · ");
  return (
    <>
      <section className="container-page page-grid gap-y-10 pt-10 pb-(--section-space) sm:pt-14 lg:pt-16">
        <div className="col-span-full lg:col-span-7">
          <p className="label text-ink-3">About</p>
          <h1 className="mt-4 text-h1">{about.title}</h1>
          <p className="mt-8 max-w-[52ch] text-lead text-ink-2">
            {about.intro}
          </p>
        </div>
        {portrait && (
          <Reveal
            variant="clip"
            className="col-span-full sm:col-span-4 lg:col-span-4 lg:col-start-9"
          >
            <div className="relative aspect-4/5 overflow-hidden bg-raised">
              <Image
                src={portrait.src}
                alt={portrait.alt}
                placeholder={blur(portrait.src)}
                sizes="(min-width: 64rem) 30vw, (min-width: 40rem) 50vw, 100vw"
                className="size-full object-cover"
              />
              {portrait.placeholder && <PlaceholderTag />}
            </div>
          </Reveal>
        )}
      </section>

      <Block label="Education" id="education">
        <dl className="border-b border-rule text-small">
          <Row label="University" value={site.education.institution} />
          {site.education.faculty && (
            <Row label="Faculty" value={site.education.faculty} />
          )}
          <Row label="Degree" value={site.education.degree} />
          <Row label="Years" value={years} />
        </dl>
      </Block>

      <Block label="How I work" id="how-i-work">
        <div className="flex max-w-[68ch] flex-col gap-4 text-body text-ink-2">
          {about.howIWork.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </Block>

      <Block label="Tools" id="tools">
        <table className="w-full border-collapse text-left text-small">
          <caption className="sr-only">
            Tools and the projects I used them in
          </caption>
          <thead>
            <tr className="border-b border-rule-strong">
              <th
                scope="col"
                className="py-2 pr-6 label font-normal text-ink-3"
              >
                Tool
              </th>
              <th scope="col" className="py-2 label font-normal text-ink-3">
                Used in
              </th>
            </tr>
          </thead>
          <tbody>
            {tools.map((t) => (
              <tr key={t.tool} className="border-b border-rule">
                <th
                  scope="row"
                  className="py-3 pr-6 align-top font-medium text-ink"
                >
                  {t.tool}
                </th>
                <td className="py-3 align-top font-mono text-mono-body text-ink-2">
                  {t.where}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Block>

      <Block label="Interests" id="interests">
        {/* The interests live in the Lab now (05 G1); one line here, no duplication. */}
        <p className="max-w-[60ch] text-body text-ink-2">
          AI in design, robotics and automation, connected products and circular
          design.{" "}
          <Link
            href="/lab"
            className="text-ink underline decoration-rule-strong underline-offset-4 hover:decoration-accent"
          >
            See what I&apos;m exploring in the Lab
          </Link>
          .
        </p>
      </Block>

      <Block label="Languages" id="languages">
        <dl className="border-b border-rule text-small">
          {(site.languages ?? []).map((l) => (
            <Row key={l.name} label={l.name} value={l.level} />
          ))}
        </dl>
      </Block>

      <Block label="Projects" id="projects">
        <ul className="border-b border-rule">
          {projects.map((p) => (
            <li key={p.slug} className="border-t border-rule">
              <Link
                href={`/work/${p.slug}` as Route}
                className="group grid min-h-12 grid-cols-[3rem_1fr] items-center gap-4 py-3 sm:grid-cols-[3rem_1fr_auto]"
              >
                <span className="label text-ink-3">
                  {String(p.order).padStart(2, "0")}
                </span>
                <span className="text-body text-ink transition-colors duration-(--dur-base) ease-standard group-hover:text-accent-text">
                  {p.title}
                </span>
                <span className="hidden label text-ink-3 sm:block">
                  {p.year}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Block>
    </>
  );
}

function Block({
  label,
  id,
  children,
}: {
  label: string;
  id: string;
  children: React.ReactNode;
}) {
  return (
    <section aria-labelledby={id} className="container-page page-grid">
      <div className="col-span-full border-t border-rule pt-6 pb-16 lg:col-span-12 lg:grid lg:grid-cols-subgrid">
        <div className="lg:col-span-3">
          <RevealHeading as="h2" id={id} className="label text-ink-3">
            {label}
          </RevealHeading>
        </div>
        <div className="mt-6 lg:col-span-8 lg:mt-0">{children}</div>
      </div>
    </section>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[8rem_1fr] gap-4 border-t border-rule py-3">
      <dt className="pt-0.5 label text-ink-3">{label}</dt>
      <dd className="text-ink">{value}</dd>
    </div>
  );
}
