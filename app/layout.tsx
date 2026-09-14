import type { Metadata, Viewport } from "next";
import { Inter, Fraunces } from "next/font/google";
import { siteUrl } from "./lib/content";
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

const description =
  "Mountain Bean Café serves freshly brewed coffee, comforting food and relaxed café experiences in the hills of Landour, Mussoorie. View the menu, browse the gallery and reserve a table.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Mountain Bean Café | Coffee, Food & Cozy Moments",
    template: "%s | Mountain Bean Café",
  },
  description,
  keywords: [
    "café",
    "coffee shop",
    "restaurant",
    "Mussoorie café",
    "Landour café",
    "specialty coffee",
    "breakfast",
    "brunch",
    "cozy café",
    "Mountain Bean Café",
  ],
  authors: [{ name: "Mountain Bean Café" }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Mountain Bean Café",
    title: "Mountain Bean Café | Coffee, Food & Cozy Moments",
    description,
    images: [
      {
        url: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "Cosy interior of Mountain Bean Café",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mountain Bean Café | Coffee, Food & Cozy Moments",
    description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
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
