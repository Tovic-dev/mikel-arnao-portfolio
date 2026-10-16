import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { getSite } from "@/content";
import { siteUrl } from "@/content/site";
import { geistMono, geistSans } from "@/lib/fonts";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSite();
  return {
    metadataBase: siteUrl,
    title: {
      default: `${site.name} — ${site.role}`,
      template: `%s · ${site.name}`,
    },
    description: site.supporting.slice(0, 155),
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: "en_GB",
    },
    twitter: { card: "summary_large_image" },
  };
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="flex min-h-svh flex-col">
        <a
          href="#main"
          className="sr-only z-(--z-skip) bg-ink px-4 py-3 label text-paper focus:not-sr-only focus:fixed focus:top-2 focus:left-2"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <SmoothScroll />
      </body>
    </html>
  );
}
