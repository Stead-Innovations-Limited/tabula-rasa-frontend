"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useCallback } from "react";

interface AvatarProps {
  imgUrl: string;
  firstname: string;
  lastname: string;
  setMenu?: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AvatarComponent({
  imgUrl,
  firstname,
  lastname,
  setMenu,
}: AvatarProps) {
  const handleClick = useCallback(() => {
    if (setMenu) {
      setMenu((prev) => !prev);
    } 
  }, [setMenu])
  return (
    <Avatar
      onClick={() => {
        handleClick();
      }}
      className='cursor-pointer'
    >
      <AvatarImage src={imgUrl} alt='@shadcn' />
      <AvatarFallback>
        {firstname.charAt(0).toUpperCase() + lastname.charAt(0).toUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
}
