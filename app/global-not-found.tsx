import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { NotFoundContent } from "@/components/layout/NotFoundContent";
import { geistMono, geistSans } from "@/lib/fonts";
import "./(frontend)/globals.css";

export const metadata: Metadata = {
  title: "Page not found · Mikel Arnao",
  robots: { index: false },
};

// URLs that match no route. There are two root layouts (site and dashboard),
// so this page brings its own <html> with the site's fonts, header and footer.
export default function GlobalNotFound() {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="flex min-h-svh flex-col">
        <Header />
        <main id="main" className="flex-1">
          <NotFoundContent />
        </main>
        <Footer />
      </body>
    </html>
  );
}
