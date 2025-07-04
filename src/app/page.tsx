import NavBar from "@/components/navs/NavBar";
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
  if (!session) {
    return <p>Data fetch failed.</p>;
  }
  const userData = {
    email: session?.user?.email,
    firstName: session?.user?.firstName,
    lastName: session?.user?.lastName,
    roles: session?.user?.roles,
    token: session.sessionToken,
  };
  console.log(userData)

  return (
    <main className='w-full bg-cream'>
      <NavBar userData={userData}/>
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
