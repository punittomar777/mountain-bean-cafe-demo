import { brand, siteUrl, menu, location } from "../lib/content";

/*
 * Restaurant/CafeOrCoffeeShop structured data for local SEO / rich results.
 * Kept in sync with the visible menu, contact and location details.
 */
const prices = menu.flatMap((c) => c.items.map((i) => i.price));
const inr = new Intl.NumberFormat("en-IN");

const schema = {
  "@context": "https://schema.org",
  "@type": "CafeOrCoffeeShop",
  name: brand.full,
  description:
    "Mountain Bean Café serves freshly brewed coffee, comforting food and relaxed café experiences in the hills of Landour, Mussoorie.",
  url: siteUrl,
  telephone: "+91-74659-45752",
  email: "hello@mountainbeancafe.com",
  servesCuisine: ["Coffee", "Café", "Breakfast", "Continental"],
  image:
    "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=80",
  priceRange: `₹${inr.format(Math.min(...prices))} - ₹${inr.format(
    Math.max(...prices)
  )}`,
  currenciesAccepted: "INR",
  address: {
    "@type": "PostalAddress",
    streetAddress: "24 Pine View Road",
    addressLocality: "Landour, Mussoorie",
    addressRegion: "Uttarakhand",
    postalCode: "248179",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: location.geo.latitude,
    longitude: location.geo.longitude,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "21:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Saturday", "Sunday"],
      opens: "08:00",
      closes: "22:00",
    },
  ],
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
