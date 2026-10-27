import type { Metadata } from "next";
import { Cairo, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Association Tawassol des Échecs Tanger",
  description:
    "Découvrez l’Association Tawassol des Échecs Tanger, ses activités, ses formations et ses événements.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" dir="ltr" className={`${inter.variable} ${cairo.variable}`}>
      <body>{children}</body>
    </html>
  );
}
