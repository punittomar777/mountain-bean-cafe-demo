import Image from "next/image";
import { Star, Quote } from "lucide-react";
import SectionHeading from "./ui/SectionHeading";
import { reviews } from "../lib/content";

function Stars({ rating }: { rating: number }) {
  return (
    <div
      className="flex gap-0.5 text-accent"
      role="img"
      aria-label={`${rating} out of 5 stars`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className="h-4 w-4"
          fill={i < rating ? "currentColor" : "none"}
          aria-hidden
        />
      ))}
    </div>
  );
}

export default function Reviews() {
  return (
    <section
      id="reviews"
      aria-labelledby="reviews-heading"
      className="bg-background py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          id="reviews-heading"
          eyebrow="Kind words"
          title="Loved by our little community."
          description="A few notes from the people who make the café feel like home."
        />

        <ul className="mt-14 grid gap-6 lg:grid-cols-3">
          {reviews.map((review) => (
            <li
              key={review.name}
              className="flex flex-col rounded-2xl border border-border bg-surface-2 p-7"
            >
              <div className="flex items-center justify-between">
                <Quote
                  className="h-8 w-8 text-accent/30"
                  aria-hidden
                  fill="currentColor"
                />
                <Stars rating={review.rating} />
              </div>
              <blockquote className="mt-4 flex-1 leading-relaxed text-foreground">
                {review.quote}
              </blockquote>
              <div className="mt-6 flex items-center gap-4 border-t border-border pt-5">
                <Image
                  src={review.avatar}
                  alt=""
                  width={48}
                  height={48}
                  loading="lazy"
                  className="h-12 w-12 shrink-0 rounded-full object-cover"
                />
                <div>
                  <p className="font-display text-base font-semibold text-foreground">
                    {review.name}
                  </p>
                  <p className="text-sm text-subtle">{review.detail}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <p className="mt-8 text-center text-xs text-subtle">
          Demo testimonials shown for this portfolio sample — not verified customer
          reviews.
        </p>
      </div>
    </section>
  );
}
