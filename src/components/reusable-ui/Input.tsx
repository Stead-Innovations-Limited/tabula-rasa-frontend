"use client";
import React, { useState } from "react";
import { usePathname } from "next/navigation";

import { BsEye, BsEyeSlash, CiSearch } from "@/components/icons";
import { cn } from "@/lib/utils";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQueryState } from "nuqs";

const PasswordInput = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  return (
    <div className='relative flex flex-row items-center'>
      <input
        type={showPassword ? "text" : "password"}
        name='password'
        id='password'
        placeholder='Password'
        className={cn(
          "font-normal w-full py-2 rounded-md shadow-xs placeholder:text-deep_olive/50 block border-1 border-lightolive focus:border-olive focus:border-1 focus:outline-none pl-5 pr-14",
          className
        )}
        ref={ref}
        {...props}
      />
      <div
        className='absolute right-5'
        onClick={() => setShowPassword((prevState) => !prevState)}
      >
        {showPassword ? <BsEye className='' /> : <BsEyeSlash />}
      </div>
    </div>
  );
});
PasswordInput.displayName = "PasswordInput";

const ConfirmPasswordInput = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => {
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  return (
    <div className='relative flex flex-row items-center'>
      <input
        type={showConfirmPassword ? "text" : "password"}
        name='confirmPassword'
        id='confirmPassword'
        placeholder='Password'
        className={cn(
          "font-normal w-full py-2 rounded-md shadow-xs placeholder:text-deep_olive/50 block border-1 border-lightolive focus:border-olive focus:border-1 focus:outline-none pl-5 pr-14",
          className
        )}
        ref={ref}
        {...props}
      />
      <div
        className='absolute right-5'
        onClick={() => setShowConfirmPassword((prevState) => !prevState)}
      >
        {showConfirmPassword ? <BsEye className='' /> : <BsEyeSlash />}
      </div>
    </div>
  );
});
ConfirmPasswordInput.displayName = "ConfirmPasswordInput";

const selectGroupings = {
  dashboard: (
    <>
      <SelectItem value='latest'>Recent</SelectItem>
      <SelectItem value='participants'>Participants</SelectItem>
      <SelectItem value='capacity'>Capacity</SelectItem>
      <SelectItem value='experience'>Experience</SelectItem>
      <SelectItem value='rate'>Rate</SelectItem>
    </>
  ),
  practitioners: (
    <>
      <SelectItem value='experience'>Experience</SelectItem>
      <SelectItem value='rate'>Rate</SelectItem>
    </>
  ),
  events: (
    <>
      <SelectItem value='latest'>Recent</SelectItem>
      <SelectItem value='participants'>Participants</SelectItem>
    </>
  ),
  venues: (
    <>
      <SelectItem value='latest'>Recent</SelectItem>
      <SelectItem value='capacity'>Capacity</SelectItem>
    </>
  ),
}

function DashboardFilter({ className }: { className?: string }) {
  const [sortVal, setSortVal] = useQueryState('sort');
  const pathname = usePathname();
  const pathKey = pathname.split("/").filter(Boolean)[0] as keyof typeof selectGroupings;

  // Fallback to 'dashboard' if pathname doesn't match any expected group
  const selectOptions = selectGroupings[pathKey] || selectGroupings["dashboard"];
  return (
    <Select value={sortVal || "latest"} onValueChange={setSortVal}>
      <SelectTrigger icon="sort" className={cn("", className)}>
        <SelectValue placeholder='Sort by' />
      </SelectTrigger>
      <SelectContent>
        {selectOptions}
      </SelectContent>
    </Select>
  );
}

function BookingsFilter({ className }: { className?: string }) {
  const [statusVal, setStatusVal] = useQueryState("status");
  return (
    <Select value={statusVal || "pending"} onValueChange={setStatusVal}>
      <SelectTrigger icon="sort" className={cn("", className)}>
        <SelectValue placeholder='Filter' />
      </SelectTrigger>
      <SelectContent>
        {/* <SelectItem value='upcoming'>Up Coming</SelectItem> */}
        <SelectItem value='pending'>Pending</SelectItem>
        <SelectItem value='confirmed'>Approved</SelectItem>
        <SelectItem value='declined'>Declined</SelectItem>
      </SelectContent>
    </Select>
  );
}

function SearchInput({
  type="text",
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className='relative'>
      <input
        type={type}
        placeholder='Search...'
        className={cn(
          "font-normal w-full py-2 rounded-md shadow-xs placeholder:text-deep_olive/50 block border-1 border-lightolive focus:border-olive focus:border-1 focus:outline-none pl-10",
          className
        )}
        {...props}
      />
      <div className="absolute left-5 top-1/2 -translate-y-1/2">
        <CiSearch className="" />
      </div>
    </div> 
  );
}

export { PasswordInput, ConfirmPasswordInput, DashboardFilter, BookingsFilter, SearchInput };
