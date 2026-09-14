import Image from "next/image";
import { brand, highlights } from "../lib/content";
import SectionHeading from "./ui/SectionHeading";

export default function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="bg-background py-24 sm:py-32"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20">
        {/* Image */}
        <div className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl">
            <Image
              src="https://images.unsplash.com/photo-1559496417-e7f25cb247f3?auto=format&fit=crop&w=1200&q=80"
              alt="Barista preparing coffee at the Mountain Bean Café counter"
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
          </div>
          {/* Since badge */}
          <div className="absolute -bottom-5 -right-3 flex flex-col items-center rounded-2xl bg-accent px-6 py-5 text-center shadow-xl sm:-right-6">
            <span className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-white/80">
              Since
            </span>
            <span className="display text-3xl text-white">{brand.since}</span>
          </div>
        </div>

        {/* Copy */}
        <div>
          <SectionHeading
            id="about-heading"
            eyebrow="Our story"
            title="A cozy corner worth slowing down for."
            description="Mountain Bean Café started as a small neighbourhood coffee spot with a simple idea — good coffee, honest food and a room where nobody rushes you out. We roast in small batches, cook to order, and keep a seat warm for regulars and first-timers alike."
          />

          <ul className="mt-10 space-y-6">
            {highlights.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.title} className="flex gap-4">
                  <span className="mt-0.5 grid h-11 w-11 shrink-0 place-items-center rounded-full bg-accent-soft text-accent">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-foreground">
                      {item.title}
                    </h3>
                    <p className="mt-1 leading-relaxed text-muted">
                      {item.description}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
