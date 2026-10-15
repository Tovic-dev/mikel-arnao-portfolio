import Link from "next/link";
import { site } from "@/content/site";
import { CopyEmailButton } from "@/components/ui/CopyEmailButton";
import { NavLink } from "./NavLink";

// Static header (04 §3): scrolls away; two rows on mobile, one row from 640 px.
export function Header() {
  return (
    <header className="relative z-(--z-raised) border-b border-rule bg-paper">
      <div className="container-page flex flex-col gap-2 py-4 sm:flex-row sm:items-center sm:justify-between sm:py-6">
        <Link
          href="/"
          className="flex flex-col label text-ink lg:flex-row lg:gap-1"
        >
          <span>{site.name}</span>
          <span className="text-ink-3">
            <span className="hidden lg:inline">— </span>
            {site.role}
          </span>
        </Link>
        <nav aria-label="Main">
          <ul className="flex items-center gap-6 sm:gap-8">
            <li>
              <NavLink href="/work" match="/work">
                Work
              </NavLink>
            </li>
            <li>
              <NavLink href="/lab" match="/lab">
                Lab
              </NavLink>
            </li>
            <li>
              <NavLink href="/about" match="/about">
                About
              </NavLink>
            </li>
            <li className="sm:ml-2">
              <CopyEmailButton email={site.email} variant="nav" />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
