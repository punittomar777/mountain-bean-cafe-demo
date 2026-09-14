import type { ReactNode } from "react";

interface SectionHeadingProps {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  align?: "left" | "center";
  id?: string;
  className?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  id,
  className,
}: SectionHeadingProps) {
  const isCenter = align === "center";
  return (
    <div
      className={[
        "max-w-2xl",
        isCenter ? "mx-auto text-center" : "",
        className ?? "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <p
        className={[
          "eyebrow flex items-center gap-3",
          isCenter ? "justify-center" : "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {!isCenter && <span className="h-px w-8 bg-accent" aria-hidden />}
        {eyebrow}
      </p>
      <h2 id={id} className="display mt-4 text-4xl text-foreground sm:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mt-5 text-lg leading-relaxed text-muted">{description}</p>
      )}
    </div>
  );
}
