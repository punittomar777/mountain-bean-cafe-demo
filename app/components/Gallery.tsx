import Image from "next/image";
import SectionHeading from "./ui/SectionHeading";
import { gallery } from "../lib/content";

export default function Gallery() {
  return (
    <section
      id="gallery"
      aria-labelledby="gallery-heading"
      className="bg-background py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          id="gallery-heading"
          eyebrow="On the table"
          title="A little look around."
          description="Fresh plates, honest coffee and the corners of the café we love most."
        />

        <div className="mt-12 grid auto-rows-[220px] grid-cols-2 gap-4 sm:auto-rows-[240px] lg:grid-cols-4">
          {gallery.map((image, i) => (
            <figure
              key={image.src}
              className={[
                "group relative overflow-hidden rounded-2xl bg-surface",
                image.span ?? "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                loading={i < 2 ? "eager" : "lazy"}
                sizes="(min-width: 1024px) 25vw, 50vw"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                aria-hidden
              />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
