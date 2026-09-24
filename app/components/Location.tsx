import { MapPin } from "lucide-react";
import SectionHeading from "./ui/SectionHeading";
import {
  demo,
  location,
  openingHours,
  contactDetails,
  mapEmbedUrl,
  hoursIcon as HoursIcon,
} from "../lib/content";

export default function Location() {
  return (
    <section
      aria-labelledby="location-heading"
      className="bg-background py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          id="location-heading"
          eyebrow="Location & hours"
          title="Inspired by the hills of Landour."
          description="Mountain Bean Café is fictional, so there's no real address to visit. This section shows how a café's map, opening hours and contact details would appear."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:gap-12">
          {/* Details */}
          <div className="order-2 space-y-6 lg:order-1">
            <div className="rounded-3xl border border-border bg-surface-2 p-7">
              <div className="flex items-start gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-accent-soft text-accent">
                  <MapPin className="h-5 w-5" aria-hidden />
                </span>
                <div>
                  <h3 className="font-display text-xl font-semibold text-foreground">
                    {location.name}
                  </h3>
                  <p className="mt-1 leading-relaxed text-muted">
                    A fictional café set in {location.area} — not a real
                    address. For a live site, this card holds the address and a
                    &ldquo;Get Directions&rdquo; link.
                  </p>
                </div>
              </div>
            </div>

            {/* Hours */}
            <div className="rounded-3xl border border-border bg-surface-2 p-7">
              <div className="flex items-center gap-3">
                <HoursIcon className="h-5 w-5 text-accent" aria-hidden />
                <h3 className="font-display text-lg font-semibold text-foreground">
                  Sample opening hours
                </h3>
              </div>
              <p className="mt-1 text-sm text-subtle">
                Shown for demonstration only.
              </p>
              <dl className="mt-4 space-y-3">
                {openingHours.map((row) => (
                  <div
                    key={row.days}
                    className="flex flex-wrap justify-between gap-2 border-b border-border/60 pb-3 text-sm last:border-0 last:pb-0"
                  >
                    <dt className="text-muted">{row.days}</dt>
                    <dd className="font-medium text-foreground">{row.time}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Quick contact — reaches the developer of this demo */}
            <p className="text-sm text-subtle">
              Phone and email below reach {demo.author}, the developer of this
              demo.
            </p>
            <ul className="grid gap-3 sm:grid-cols-2">
              {contactDetails.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="flex items-center gap-3 rounded-2xl border border-border bg-surface-2 p-4 transition-colors hover:border-accent hover:text-accent"
                      {...(item.href?.startsWith("http")
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                    >
                      <Icon className="h-5 w-5 text-accent" aria-hidden />
                      <span>
                        <span className="block text-xs uppercase tracking-wider text-subtle">
                          {item.label}
                        </span>
                        <span className="text-sm text-foreground">
                          {item.value}
                        </span>
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Map */}
          <div className="order-1 overflow-hidden rounded-3xl border border-border bg-surface-2 lg:order-2">
            <iframe
              title={`Map of ${location.area}, the area that inspired this fictional café`}
              src={mapEmbedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-full min-h-[360px] w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
