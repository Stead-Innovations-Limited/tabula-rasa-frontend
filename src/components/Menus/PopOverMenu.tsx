"use client";

import { useState } from "react";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import AvatarComponent from "../reusable-ui/AvatarComponent";
import UserDashboardMenu from "../Menus/UserDashboardMenu";
import BusinessDashboardMenu from "../Menus/BusinessDashboardMenu";
import { User } from "@/lib/auth";

function PopOverMenu({userData}: { userData: User | undefined }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger>
        <AvatarComponent
          imgUrl={userData?.profileImage || undefined}
          firstname={userData?.firstName || ""}
          lastname={userData?.lastName || ""}
        />
      </PopoverTrigger>
      <PopoverContent>
        {userData &&
          (userData.roles === "Personal Account" ? (
            <UserDashboardMenu userData={userData} close={() => setIsOpen(false)} />
          ) : (
            <BusinessDashboardMenu userData={userData} close={() => setIsOpen(false)} />
          ))}
      </PopoverContent>
    </Popover>
  );
}

export default PopOverMenu;
