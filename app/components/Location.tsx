import { MapPin, Navigation } from "lucide-react";
import SectionHeading from "./ui/SectionHeading";
import Button from "./ui/Button";
import {
  location,
  openingHours,
  contactDetails,
  directionsUrl,
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
          eyebrow="Find us"
          title="Up the hill, easy to find."
          description="We're on Pine View Road in Landour — a short walk from Char Dukan, with parking and shared taxis close by."
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
                  <address className="mt-1 not-italic leading-relaxed text-muted">
                    {location.addressLines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </address>
                </div>
              </div>

              <Button
                href={directionsUrl}
                size="md"
                className="mt-6 w-full sm:w-auto"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Navigation className="h-4 w-4" aria-hidden />
                Get Directions
              </Button>
            </div>

            {/* Hours */}
            <div className="rounded-3xl border border-border bg-surface-2 p-7">
              <div className="flex items-center gap-3">
                <HoursIcon className="h-5 w-5 text-accent" aria-hidden />
                <h3 className="font-display text-lg font-semibold text-foreground">
                  Opening hours
                </h3>
              </div>
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

            {/* Quick contact */}
            <ul className="grid gap-3 sm:grid-cols-2">
              {contactDetails
                .filter((item) => item.label !== "Address")
                .map((item) => {
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
              title={`Map showing ${location.name} in Landour, Mussoorie`}
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
