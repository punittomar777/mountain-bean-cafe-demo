import SectionHeading from "./ui/SectionHeading";
import { features } from "../lib/content";

export default function WhyVisit() {
  return (
    <section
      aria-labelledby="why-heading"
      className="bg-surface py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          id="why-heading"
          align="center"
          eyebrow="Why visit us"
          title="More than just a cup of coffee."
          description="Small things done properly, every single day. Here's what keeps our regulars coming back."
        />

        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <li
                key={feature.title}
                className="rounded-2xl border border-border bg-elevated p-7 transition-shadow duration-300 hover:shadow-[0_20px_45px_-25px_rgba(58,40,26,0.45)]"
              >
                <span className="grid h-12 w-12 place-items-center rounded-full bg-accent-soft text-accent">
                  <Icon className="h-6 w-6" aria-hidden />
                </span>
                <h3 className="mt-5 font-display text-xl font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="mt-2 leading-relaxed text-muted">
                  {feature.description}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
