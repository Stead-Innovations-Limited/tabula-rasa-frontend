"use client";
import NavBar from "./NavBar";
import UserDashboardMenu from "@/components/Menus/UserDashboardMenu";

export default function NavBarClient() {
  return (
    <NavBar renderMenu={(blur) => <UserDashboardMenu blur={blur}/>}/>
  )
}
