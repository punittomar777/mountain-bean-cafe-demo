"use client";

import { useEffect, useState } from "react";
import { Menu, X, Mountain } from "lucide-react";
import Button from "./ui/Button";
import { brand, navLinks } from "../lib/content";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on Escape and lock body scroll while open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled || open
          ? "border-b border-border bg-background/85 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      ].join(" ")}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8 lg:h-20"
      >
        <a
          href="#home"
          className="group flex items-center gap-2.5"
          aria-label={`${brand.full} — home`}
        >
          <span className="grid h-9 w-9 place-items-center rounded-full bg-accent text-white transition-transform duration-200 group-hover:-rotate-6">
            <Mountain className="h-5 w-5" aria-hidden />
          </span>
          <span className="font-display text-xl font-semibold tracking-tight text-foreground">
            Mountain Bean
          </span>
        </a>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm font-medium text-muted transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden lg:block">
          <Button href="#contact" size="md">
            Reserve a Table
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="grid h-11 w-11 place-items-center rounded-full text-foreground lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        hidden={!open}
        className="border-t border-border bg-background lg:hidden"
      >
        <ul className="flex flex-col px-5 py-2">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="block border-b border-border/60 py-4 font-display text-lg font-medium text-foreground"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="px-5 pb-6 pt-3">
          <Button
            href="#contact"
            size="lg"
            className="w-full"
            onClick={() => setOpen(false)}
          >
            Reserve a Table
          </Button>
        </div>
      </div>
    </header>
  );
}
