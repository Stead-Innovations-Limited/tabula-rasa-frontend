"use client";

import UserDashboardMenu from "@/components/Menus/UserDashboardMenu";
import { UserData } from "@/app/page";
import DashboardMainNav from "./DashboardMainNav";


export function DashboardMainNavClient({userData}: {userData?: UserData}) {
   return (
    <DashboardMainNav renderMenu={(blur) => <UserDashboardMenu blur={blur} userData={userData} />} userData={userData}/>
   )
}
