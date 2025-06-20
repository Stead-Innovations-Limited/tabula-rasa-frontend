"use client";
import React, { useState } from "react";

import { BsEye, BsEyeSlash } from "@/components/icons";
import { cn } from "@/lib/utils";

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

export { PasswordInput, ConfirmPasswordInput };
