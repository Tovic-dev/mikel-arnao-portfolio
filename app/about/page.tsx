import type { Metadata, Route } from "next";
import Image from "next/image";
import Link from "next/link";
import { getProjects } from "@/content";
import { placeholders } from "@/content/projects/_placeholders";
import { site } from "@/content/site";
import { Reveal } from "@/components/motion/Reveal";
import { RevealHeading } from "@/components/motion/RevealHeading";
import { PlaceholderTag } from "@/components/ui/PlaceholderTag";

export const metadata: Metadata = {
  title: "About",
  description:
    "Mikel Arnao studies Industrial Design and Product Development Engineering at Mondragon Unibertsitatea (2023–2027). Education, way of working, tools and interests.",
  alternates: { canonical: "/about" },
};

const portrait = placeholders.portrait;

// Tools by where they were actually used (05 C1, D-20). No self-rated levels.
const tools: { tool: string; where: string }[] = [
  { tool: "SolidWorks", where: "Ardura · SEAT mirror · Orbea rack" },
  { tool: "Siemens NX", where: "SEAT mirror" },
  { tool: "KeyShot", where: "Ardura · SEAT mirror · Orbea rack" },
  { tool: "Blender", where: "Ardura · SEAT mirror · Orbea rack" },
  {
    tool: "IHOBE Climate and circularity calculator",
    where: "Mercedes vent LCA",
  },
  { tool: "Adobe Creative Suite", where: "Brand and dossier work" },
  { tool: "React · Next.js · TypeScript", where: "This website" },
];

const interests: { name: string; why: string }[] = [
  {
    name: "Artificial intelligence",
    why: "How it changes both the products we design and the way we design them.",
  },
  {
    name: "Robotics and industrial automation",
    why: "Products that have to work inside larger systems, not on their own.",
  },
  {
    name: "Connected products (IoT)",
    why: "Objects like Ardura, where sensing and energy shape the form.",
  },
  {
    name: "Sustainability and circular design",
    why: "Measuring impact properly, as in the Mercedes vent LCA, before redesigning.",
  },
];

// /about (05 C1). Replaces a CV download (D-18). Draft copy, to confirm with Mikel.
export default function AboutPage() {
  const projects = getProjects();
  return (
    <>
      <section className="container-page page-grid gap-y-10 pt-10 pb-(--section-space) sm:pt-14 lg:pt-16">
        <div className="col-span-full lg:col-span-7">
          <p className="label text-ink-3">About</p>
          <h1 className="mt-4 text-h1">
            Product designer and design engineer in training.
          </h1>
          <p className="mt-8 max-w-[52ch] text-lead text-ink-2">
            I&apos;m in my fourth year of Industrial Design and Product
            Development Engineering at Mondragon Unibertsitatea, in the Basque
            Country. Most of my projects are team projects, several of them with
            companies such as Orbea and Maier, and in most of them I end up
            leading the development: CAD, materials, regulations, manufacturing
            and the final renders.
          </p>
        </div>
        <Reveal
          variant="clip"
          className="col-span-full sm:col-span-4 lg:col-span-4 lg:col-start-9"
        >
          <div className="relative aspect-4/5 overflow-hidden bg-raised">
            <Image
              src={portrait.src}
              alt={portrait.alt}
              placeholder="blur"
              sizes="(min-width: 64rem) 30vw, (min-width: 40rem) 50vw, 100vw"
              className="size-full object-cover"
            />
            {portrait.placeholder && <PlaceholderTag />}
          </div>
        </Reveal>
      </section>

      <Block label="Education" id="education">
        <dl className="border-b border-rule text-small">
          <Row label="University" value={site.education.institution} />
          <Row label="Faculty" value={site.education.faculty} />
          <Row label="Degree" value={site.education.degree} />
          <Row
            label="Years"
            value={`${site.education.years} · ${site.education.current}`}
          />
        </dl>
      </Block>

      <Block label="How I work" id="how-i-work">
        <div className="flex max-w-[68ch] flex-col gap-4 text-body text-ink-2">
          <p>
            Every project starts with analysis: the product, its users, the
            market and the rules it has to meet. In the SEAT mirror project that
            meant leading the regulatory analysis before anyone sketched.
          </p>
          <p>
            Once a concept is chosen, I like owning the step where it becomes
            buildable: the CAD model, the materials and how it gets
            manufactured. That was my part in Ardura and in the Orbea rack.
          </p>
          <p>
            I document decisions as I go, and I finish by presenting the result
            properly, which is why I usually take on the final renders.
          </p>
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
        <ul className="grid gap-x-(--grid-gutter) gap-y-8 sm:grid-cols-2">
          {interests.map((i) => (
            <li key={i.name} className="border-t border-rule pt-4">
              <h3 className="text-h3">{i.name}</h3>
              <p className="mt-2 text-small text-ink-2">{i.why}</p>
            </li>
          ))}
        </ul>
      </Block>

      <Block label="Languages" id="languages">
        <dl className="border-b border-rule text-small">
          {site.languages.map((l) => (
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
