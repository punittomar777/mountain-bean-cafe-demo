import { Mountain } from "lucide-react";
import { WhatsAppIcon } from "./ui/BrandIcons";
import {
  brand,
  navLinks,
  socials,
  contactDetails,
  demo,
  whatsappUrl,
} from "../lib/content";

// Only show socials with a real URL — "#" placeholders are hidden, not linked.
const activeSocials = socials.filter((social) => social.href !== "#");

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1.1fr]">
          {/* Brand */}
          <div>
            <a
              href="#home"
              className="flex items-center gap-2.5"
              aria-label={`${brand.full} — home`}
            >
              <span className="grid h-9 w-9 place-items-center rounded-full bg-accent text-white">
                <Mountain className="h-5 w-5" aria-hidden />
              </span>
              <span className="font-display text-xl font-semibold text-foreground">
                Mountain Bean
              </span>
            </a>
            <p className="mt-5 max-w-xs leading-relaxed text-muted">
              Freshly brewed coffee, comforting food and a cozy place to slow
              down — in the hills of Landour, Mussoorie.
            </p>
            {activeSocials.length > 0 && (
              <ul className="mt-6 flex gap-3">
                {activeSocials.map((social) => {
                  const Icon = social.icon;
                  return (
                    <li key={social.label}>
                      <a
                        href={social.href}
                        aria-label={social.label}
                        className="grid h-10 w-10 place-items-center rounded-full border border-border text-muted transition-colors hover:border-accent hover:text-accent"
                      >
                        <Icon className="h-5 w-5" aria-hidden />
                      </a>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          {/* Nav */}
          <nav aria-label="Footer">
            <h2 className="font-display text-sm font-semibold uppercase tracking-widest text-foreground">
              Explore
            </h2>
            <ul className="mt-5 space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-muted transition-colors hover:text-accent"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact + hours */}
          <div>
            <h2 className="font-display text-sm font-semibold uppercase tracking-widest text-foreground">
              Contact
            </h2>
            <p className="mt-5 text-sm text-subtle">
              Demo enquiries go to the developer, {demo.author}.
            </p>
            <ul className="mt-4 space-y-3">
              {contactDetails.map((item) => (
                <li key={item.label}>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-muted transition-colors hover:text-accent"
                      {...(item.href.startsWith("http")
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                    >
                      {item.value}
                    </a>
                  ) : (
                    <span className="text-muted">{item.value}</span>
                  )}
                </li>
              ))}
            </ul>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-[#1f8f4e] transition-colors hover:text-[#25D366]"
            >
              <WhatsAppIcon className="h-4 w-4" aria-hidden />
              Chat on WhatsApp
            </a>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-border pb-20 pt-8 text-sm text-subtle sm:flex-row sm:pb-6">
          <p>
            © {year} {brand.full}. All rights reserved.
          </p>
          {/* Right-padded on desktop so the floating WhatsApp button never covers it */}
          <p className="text-center sm:pr-44 sm:text-right">
            Demo website — {brand.full} is a fictional restaurant. Designed &amp;
            built by{" "}
            <a
              href={demo.portfolioUrl}
              target="_blank"
              rel="noopener"
              className="text-muted underline-offset-4 transition-colors hover:text-accent hover:underline"
            >
              {demo.author}
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}
