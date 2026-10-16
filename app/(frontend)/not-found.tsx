import type { Metadata } from "next";
import { NotFoundContent } from "@/components/layout/NotFoundContent";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

// notFound() inside the site, e.g. an unknown /work/<slug>.
export default function NotFound() {
  return <NotFoundContent />;
}
