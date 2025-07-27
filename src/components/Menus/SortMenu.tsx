"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { useQueryState } from "nuqs";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import { MdSort } from "react-icons/md";
import { cn } from "@/lib/utils";

const sortOptions = {
  dashboard: [
    { value: "latest", label: "Recent" },
    { value: "participants", label: "Participants" },
    { value: "capacity", label: "Capacity" },
    { value: "experience", label: "Experience" },
    { value: "rate", label: "Rate" },
  ],
  practitioners: [
    { value: "experience", label: "Experience" },
    { value: "rate", label: "Rate" },
  ],
  events: [
    { value: "latest", label: "Recent" },
    { value: "participants", label: "Participants" },
  ],
  venues: [
    { value: "latest", label: "Recent" },
    { value: "capacity", label: "Capacity" },
  ],
} as const;

export default function SortMenu({ className }: { className?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [sortVal, setSortVal] = useQueryState("sort");
  const pathname = usePathname();

  const pathKey = pathname.split("/").filter(Boolean)[0] as keyof typeof sortOptions;
  const options = sortOptions[pathKey] || sortOptions["dashboard"];

  const handleSelect = (value: string) => {
    setSortVal(value);
    setIsOpen(false); // close the popover
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger className={cn("", className)}>
        <MdSort className="size-5 text-olive" />
      </PopoverTrigger>
      <PopoverContent align="end" className="w-48 p-0">
        <ul className="w-full flex flex-col z-50 bg-white text-olive rounded-2xl shadow-lg overflow-hidden divide-y divide-olive">
          {options.map((opt) => (
            <li
              key={opt.value}
              className={cn(
                "flex items-center justify-center gap-2 px-4 py-2 cursor-pointer hover:bg-olive/10 transition",
                sortVal === opt.value && "bg-olive/10 font-semibold"
              )}
              onClick={() => handleSelect(opt.value)}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  );
}
