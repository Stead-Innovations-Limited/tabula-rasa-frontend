import NavBarClient from "@/components/navs/NavBarClient";
import Hero from "@/components/home/Hero";
import AfterHero from "@/components/home/AfterHero";
import RetreatSection from "@/components/home/RetreatSection";
import Rooms from "@/components/home/Rooms";
import GallerySlides from "@/components/home/GallerySlides";
import Subscription from "@/components/home/Subscription";
import Footer from "@/components/reusable-ui/Footer";

export default function Home() {
  return (
    <main className='w-full bg-cream'>
      <NavBarClient />
      <Hero />
      <AfterHero/>
      <RetreatSection/>
      <Rooms />
      <GallerySlides />
      <Subscription/>
      <Footer />
    </main>
  );
}
