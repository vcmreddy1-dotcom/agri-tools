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
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/logo-icon.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: ["/favicon.ico"],
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://prakashagritools.com",
    title: "Prakash Agri Tools | Agricultural Machinery & Implements Hyderabad",
    description:
      "Reliable agricultural machinery and equipment catalogue. Rotavators, seed drills, sprayers, and genuine spare parts since 2009.",
    siteName: "Prakash Agri Tools",
    images: [
      {
        url: "/logo.png",
        width: 1024,
        height: 571,
        alt: "Prakash Agri Tools - Powering Agriculture",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Prakash Agri Tools | Agricultural Machinery & Equipment Showroom Hyderabad",
    description: "Reliable agricultural machinery and equipment catalogue. Established 2009 in LB Nagar, Hyderabad.",
    images: ["/logo.png"],
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
