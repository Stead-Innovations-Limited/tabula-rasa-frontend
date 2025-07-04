import NavBarClient from "@/components/navs/NavBarClient";
import Hero from "@/components/home/Hero";
import AfterHero from "@/components/home/AfterHero";
import RetreatSection from "@/components/home/RetreatSection";
import Rooms from "@/components/home/Rooms";
import GallerySlides from "@/components/home/GallerySlides";
import Subscription from "@/components/home/Subscription";
import Footer from "@/components/reusable-ui/Footer";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export interface UserData {
  email: string,
  firstName: string,
  lastName: string,
  roles: string,
  token?: string,
}

export default async function Home() {
  const session = await getServerSession(authOptions)
  const userData = session?.user ?{
    email: session?.user?.email,
    firstName: session?.user?.firstName,
    lastName: session?.user?.lastName,
    roles: session?.user?.roles,
  }: undefined;

  console.log(userData, "Where are you userData");
  return (
    <main className='w-full bg-cream'>
      <NavBarClient userData={userData}/>
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
