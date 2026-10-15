import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";

// Short about (05 A5). Draft copy, to confirm with Mikel.
export function AboutTeaser() {
  return (
    <section aria-labelledby="about-title" className="relative z-1 bg-paper">
      <div className="container-page page-grid border-t border-rule py-(--section-space)">
        <p className="col-span-full label text-ink-3 lg:col-span-3">
          <span id="about-title">About</span>
        </p>
        <Reveal className="col-span-full mt-6 lg:col-span-7 lg:mt-0">
          <p className="text-lead">
            I&apos;m studying Industrial Design and Product Development
            Engineering at Mondragon Unibertsitatea in the Basque Country. Most
            of my projects are team projects with companies, and I tend to end
            up owning the development: CAD, materials, regulations and the final
            renders. I&apos;m especially interested in how AI, robotics and
            connected products will change what we design and how we make it.
          </p>
          <Link
            href="/about"
            className="group mt-8 inline-flex min-h-12 items-center gap-2 label text-ink hover:text-accent-text"
          >
            More about me
            <ArrowRight
              aria-hidden="true"
              className="size-4 transition-transform duration-(--dur-base) ease-standard group-hover:translate-x-1"
              strokeWidth={1.5}
            />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
