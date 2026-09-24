import Button from "./ui/Button";
import { WhatsAppIcon } from "./ui/BrandIcons";
import { demo, whatsappUrl } from "../lib/content";

export default function WhatsAppCta() {
  return (
    <section aria-labelledby="whatsapp-heading" className="bg-surface">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="relative overflow-hidden rounded-3xl bg-[#1f140c] px-7 py-12 sm:px-12 sm:py-14">
          <div
            className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-accent/20 blur-3xl"
            aria-hidden
          />
          <div className="relative flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
            <div className="max-w-xl">
              <h2
                id="whatsapp-heading"
                className="display text-3xl text-white sm:text-4xl"
              >
                Want a website like this? Let&apos;s talk.
              </h2>
              <p className="mt-4 leading-relaxed text-white/75">
                This WhatsApp chat is live and goes straight to {demo.author},
                the developer who designed and built this demo. Ask about a site
                for your own café or restaurant.
              </p>
            </div>
            <Button
              href={whatsappUrl}
              variant="whatsapp"
              size="lg"
              className="shrink-0"
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppIcon className="h-5 w-5" aria-hidden />
              Chat on WhatsApp
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
