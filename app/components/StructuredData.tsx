import { brand, demo, siteUrl } from "../lib/content";

/*
 * WebSite structured data. This is a portfolio demo and Mountain Bean Café is a
 * fictional restaurant, so we deliberately avoid Restaurant/CafeOrCoffeeShop
 * schema (address, geo, hours, prices) that would describe a business that
 * doesn't exist. For a real client, swap this for a Restaurant schema with
 * their details.
 */
const schema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: `${brand.full} — Restaurant Website Demo`,
  url: siteUrl,
  description:
    "A portfolio demo website for a fictional café and restaurant, designed and built by Punit Tomar.",
  inLanguage: "en",
  creator: {
    "@type": "Person",
    name: demo.author,
    url: demo.authorUrl,
    sameAs: [demo.portfolioUrl],
  },
} as const;

export default function StructuredData() {
  return (
    <script
      type="application/ld+json"
      // Static, trusted content built at render time — safe to inject.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
