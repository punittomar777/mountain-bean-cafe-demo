import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Menu from "./components/Menu";
import Gallery from "./components/Gallery";
import WhyVisit from "./components/WhyVisit";
import Reviews from "./components/Reviews";
import Reservation from "./components/Reservation";
import Location from "./components/Location";
import WhatsAppCta from "./components/WhatsAppCta";
import Footer from "./components/Footer";
import StructuredData from "./components/StructuredData";
import WhatsAppFab from "./components/WhatsAppFab";

export default function Home() {
  return (
    <>
      <StructuredData />
      <a
        href="#home"
        className="sr-only rounded-full focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-accent focus:px-4 focus:py-2 focus:font-medium focus:text-white"
      >
        Skip to content
      </a>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Menu />
        <Gallery />
        <WhyVisit />
        <Reviews />
        <Reservation />
        <Location />
        <WhatsAppCta />
      </main>
      <Footer />
      <WhatsAppFab />
    </>
  );
}
