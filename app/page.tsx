import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import CoworkingPreview from "@/components/sections/CoworkingPreview";
import FavoriteMenu from "@/components/sections/FavoriteMenu";
import Hero from "@/components/sections/Hero";
import InfoSection from "@/components/sections/InfoSection";
import MenuShowcase from "@/components/sections/MenuShowcase";
import NewsPreview from "@/components/sections/NewsPreview";
import Story from "@/components/sections/Story";
import SuasanaPreview from "@/components/sections/SuasanaPreview";
import VelocityBands from "@/components/sections/VelocityBands";

export default function Home() {
  return (
    <>
      <a href="#konten" className="skip-link">
        Langsung ke konten
      </a>
      <Navbar />
      <main id="konten">
        <Hero />
        <VelocityBands />
        <Story />
        <FavoriteMenu />
        <MenuShowcase />
        <SuasanaPreview />
        <CoworkingPreview />
        <NewsPreview />
        <InfoSection />
      </main>
      <Footer />
    </>
  );
}
