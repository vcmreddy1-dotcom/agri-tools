import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://prakashagritools.com"),
  title: {
    default: "Prakash Agri Tools | Agricultural Machinery & Equipment Showroom Hyderabad",
    template: "%s | Prakash Agri Tools",
  },
  description:
    "Established in 2009 in LB Nagar, Hyderabad. Premium agricultural implements, rotavators, seed drills, sprayers, fodder machines, brush cutters, and genuine spare parts.",
  keywords: [
    "Prakash Agri Tools",
    "agricultural implements Hyderabad",
    "rotavator Hyderabad",
    "seed drill Telangana",
    "crop sprayers LB Nagar",
    "chaff cutters Hyderabad",
    "brush cutters",
    "agricultural spare parts",
  ],
  authors: [{ name: "Prakash Agri Tools" }],
  creator: "Prakash Agri Tools",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://prakashagritools.com",
    title: "Prakash Agri Tools | Agricultural Machinery & Implements Hyderabad",
    description:
      "Reliable agricultural machinery and equipment catalogue. Rotavators, seed drills, sprayers, and genuine spare parts since 2009.",
    siteName: "Prakash Agri Tools",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#fcfaf5] text-stone-900">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
