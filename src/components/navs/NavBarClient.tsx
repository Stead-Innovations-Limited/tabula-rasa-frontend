"use client";
import NavBar from "./NavBar";
import UserDashboardMenu from "@/components/Menus/UserDashboardMenu";
import { UserData } from "@/app/page";

export default function NavBarClient({userData}: {userData?: UserData}) {
  return (
    <NavBar renderMenu={(blur) => <UserDashboardMenu blur={blur} userData={userData} />} userData={userData}/>
  )
}
