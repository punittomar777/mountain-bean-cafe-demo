import type { Metadata, Viewport } from "next";
import { Inter, Fraunces } from "next/font/google";
import { demo, siteUrl } from "./lib/content";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const title = "Mountain Bean Café — Restaurant Website Demo";
const description =
  "Mountain Bean Café is a fictional café — a portfolio demo website by Punit Tomar showcasing a warm, mobile-first restaurant site with a menu, food gallery, reviews, a reservation form and WhatsApp chat.";
const ogImage = {
  url: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&h=630&q=80",
  width: 1200,
  height: 630,
  alt: "Cosy café interior with warm wooden tables and soft light",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s | Mountain Bean Café Demo",
  },
  description,
  keywords: [
    "restaurant website demo",
    "café website template",
    "restaurant landing page",
    "Next.js restaurant website",
    "web design portfolio",
    "Punit Tomar",
  ],
  authors: [{ name: demo.author, url: demo.authorUrl }],
  creator: demo.author,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Mountain Bean Café (Demo)",
    title,
    description,
    locale: "en_IN",
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [ogImage],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#faf5ee",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
