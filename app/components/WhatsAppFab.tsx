import { WhatsAppIcon } from "./ui/BrandIcons";
import { whatsappUrl } from "../lib/content";

/*
 * Floating WhatsApp button — persistent, low-friction contact channel.
 * Circle on mobile, expands to a labelled pill on larger screens.
 */
export default function WhatsAppFab() {
  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Mountain Bean Café on WhatsApp"
      className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center gap-3 rounded-full bg-[#25D366] text-[#0b141a] shadow-lg shadow-[#25D366]/30 transition-transform duration-200 hover:scale-105 sm:w-auto sm:px-5"
    >
      <WhatsAppIcon className="h-7 w-7 shrink-0" aria-hidden />
      <span className="hidden font-medium sm:inline">Chat on WhatsApp</span>
    </a>
  );
}
