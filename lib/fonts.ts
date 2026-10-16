import { Geist, Geist_Mono } from "next/font/google";

// Shared by the site layout and the global 404 (which renders without a layout).
export const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
