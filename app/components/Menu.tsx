"use client";

import { useState } from "react";
import SectionHeading from "./ui/SectionHeading";
import Button from "./ui/Button";
import DietMark from "./ui/DietMark";
import { menu } from "../lib/content";

const inr = new Intl.NumberFormat("en-IN");

export default function Menu() {
  const [active, setActive] = useState(menu[0].id);
  const current = menu.find((c) => c.id === active) ?? menu[0];

  return (
    <section
      id="menu"
      aria-labelledby="menu-heading"
      className="bg-surface py-24 sm:py-32"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          id="menu-heading"
          align="center"
          eyebrow="The menu"
          title="Made fresh, priced fair."
          description="A short, seasonal menu we can do really well — from the first coffee of the day to something sweet before you head back up the hill."
        />

        {/* Category tabs */}
        <div
          role="tablist"
          aria-label="Menu categories"
          className="mx-auto mt-12 flex max-w-full flex-wrap justify-center gap-2 sm:gap-3"
        >
          {menu.map((category) => {
            const selected = category.id === active;
            return (
              <button
                key={category.id}
                type="button"
                role="tab"
                id={`tab-${category.id}`}
                aria-selected={selected}
                aria-controls={`panel-${category.id}`}
                onClick={() => setActive(category.id)}
                className={[
                  "rounded-full px-5 py-2.5 text-sm font-medium transition-colors sm:px-6",
                  selected
                    ? "bg-accent text-white shadow-[0_10px_25px_-12px_rgba(169,104,58,0.8)]"
                    : "bg-elevated text-muted hover:text-foreground ring-1 ring-border",
                ].join(" ")}
              >
                {category.label}
              </button>
            );
          })}
        </div>

        <p className="mt-6 text-center text-sm italic text-subtle">
          {current.note}
        </p>

        {/* Dietary legend */}
        <div className="mt-4 flex items-center justify-center gap-5 text-xs text-subtle">
          <span className="flex items-center gap-1.5">
            <DietMark veg />
            Vegetarian
          </span>
          <span className="flex items-center gap-1.5">
            <DietMark veg={false} />
            Non-vegetarian
          </span>
        </div>

        {/* Items */}
        <div
          role="tabpanel"
          id={`panel-${current.id}`}
          aria-labelledby={`tab-${current.id}`}
          className="mt-8 grid gap-x-12 gap-y-2 sm:grid-cols-2"
        >
          {current.items.map((item) => (
            <article
              key={item.name}
              className="flex flex-col gap-1 border-b border-border/70 py-5"
            >
              <div className="flex items-baseline gap-3">
                <DietMark
                  veg={!!item.veg}
                  className="relative top-[0.15rem]"
                />
                <h3 className="font-display text-lg font-semibold text-foreground">
                  {item.name}
                </h3>
                <span
                  className="mb-1 h-px flex-1 self-end border-b border-dotted border-border"
                  aria-hidden
                />
                <span className="font-display text-lg font-semibold text-accent">
                  ₹{inr.format(item.price)}
                </span>
              </div>
              <p className="max-w-md pl-[1.6rem] text-sm leading-relaxed text-muted">
                {item.description}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-subtle">
            Dietary requirement or allergy? Just ask — we&apos;re happy to help.
          </p>
          <Button href="#contact" variant="secondary" size="md" className="mt-5">
            Reserve a Table
          </Button>
        </div>
      </div>
    </section>
  );
}
