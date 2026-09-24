import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Button from "./ui/Button";
import { heroTrust } from "../lib/content";

export default function Hero() {
  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className="relative flex min-h-[100svh] items-center overflow-hidden"
    >
      {/* Background image + warm scrim for text legibility */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=2000&q=80"
          alt="Cosy café interior with warm wooden tables, plants and soft morning light"
          fill
          preload
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1c120a]/90 via-[#1c120a]/55 to-[#1c120a]/45" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1c120a]/70 to-transparent" />
      </div>

      <div className="mx-auto w-full max-w-7xl px-5 pb-16 pt-28 sm:px-8 lg:pt-32">
        <div className="max-w-2xl">
          <p className="animate-rise eyebrow text-[#e9c9a8]">
            Café &amp; Coffee Roastery
          </p>

          <h1
            id="hero-heading"
            className="display mt-6 text-[2.6rem] leading-[1.05] text-white sm:text-6xl lg:text-7xl"
            style={{ animationDelay: "80ms" }}
          >
            Good coffee. Great food.
            <br />
            <span className="text-[#e9a86a]">Mountain state of mind.</span>
          </h1>

          <p
            className="animate-rise mt-6 max-w-xl text-lg leading-relaxed text-white/85"
            style={{ animationDelay: "160ms" }}
          >
            Freshly brewed coffee, comforting food, and a cozy place to slow down
            and stay awhile — tucked into the hills of Landour, Mussoorie.
          </p>

          <div
            className="animate-rise mt-9 flex flex-col gap-3 sm:flex-row"
            style={{ animationDelay: "240ms" }}
          >
            <Button href="#menu" size="lg">
              View Menu
              <ArrowRight className="h-5 w-5" aria-hidden />
            </Button>
            <Button
              href="#contact"
              size="lg"
              variant="secondary"
              className="border-white/40 text-white hover:border-white hover:bg-white/10 hover:text-white"
            >
              Reserve a Table
            </Button>
          </div>

          {/* Trust markers */}
          <ul
            className="animate-rise mt-12 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm font-medium text-white/80"
            style={{ animationDelay: "320ms" }}
          >
            {heroTrust.map((item, i) => (
              <li key={item} className="flex items-center gap-3">
                {i > 0 && (
                  <span
                    className="h-1 w-1 rounded-full bg-[#e9a86a]"
                    aria-hidden
                  />
                )}
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
