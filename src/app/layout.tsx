import type { Metadata } from "next";
import { Barlow_Condensed, Inter } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MobileNav from "@/components/layout/MobileNav";
import "./globals.css";

const barlow = Barlow_Condensed({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://templefit.vercel.app"),
  title: {
    default: "TempleFit — Your body is a temple. Maintain it.",
    template: "%s · TempleFit",
  },
  description:
    "Free workouts, routines, stretches, physio exercises and high-protein meal prep built for working dads. No gym required, no fluff, 15 honest minutes at a time.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${barlow.variable} ${inter.variable}`}>
      <body className="antialiased">
        <Navbar />
        <main className="min-h-screen pb-24 md:pb-0">{children}</main>
        <Footer />
        <MobileNav />
      </body>
    </html>
  );
}
