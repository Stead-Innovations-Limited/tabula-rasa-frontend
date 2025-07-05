
import Link from "next/link";
import { Button } from "../ui/button";


import HomeMenu from "@/components/Menus/HomeMenu";
import AvatarComponent from "../reusable-ui/AvatarComponent";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import UserDashboardMenu from "../Menus/UserDashboardMenu";
import BusinessDashboardMenu from "../Menus/BusinessDashboardMenu";


import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

async function NavBar() {
  const session = await getServerSession(authOptions)
   
  const userData = session ? {
    email: session?.user?.email,
    firstName: session?.user?.firstName,
    lastName: session?.user?.lastName,
    roles: session?.user?.roles,
    token: session.sessionToken,
  }: undefined;


  return (
    <div className='w-full'>
      <header className='w-full xl:max-w-[1140px] mx-auto flex items-center justify-between font-roboto p-5 lg:pt-10 lg:px-5'>
        <h1 className='font-alex text-olive text-3xl lg:text-5xl'>
          Tabula Rasa
        </h1>
        <nav className='hidden lg:flex gap-10 items-center font-roboto font-normal text-2xl text-olive'>
          <Link href='/#about'>About</Link>
          <Link href=''>Offerings</Link>
          <Link href=''>Contact</Link>
        </nav>
        <div className='hidden lg:block'>
          {userData ? (
            <Popover>
              <PopoverTrigger>
                <AvatarComponent
                  imgUrl='https://github.com/shadcn.png'
                  firstname={userData.firstName}
                  lastname={userData.lastName}
                />
              </PopoverTrigger>
              <PopoverContent>
                {userData.roles === "Personal Account" ? <UserDashboardMenu userData={userData}/>: <BusinessDashboardMenu userData={userData}/>}
              </PopoverContent>
            </Popover>
          ) : (
            <Button
              asChild
              className='bg-olive hover:bg-olive text-xl text-white py-4 px-10 rounded-xl'
            >
              <Link href='/login'>Log In</Link>
            </Button>
          )}
        </div>

        <div className='lg:hidden'>
          <HomeMenu userData={userData? true: false}/>
        </div>
      </header>
    </div>
  );
}

export default NavBar;
