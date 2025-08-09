"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

interface ProgressProps extends React.ComponentProps<typeof ProgressPrimitive.Root> {
  base?: number; // or whatever type base should be
}

function Progress({
  className,
  value,
  base,
  ...props
}: ProgressProps) {
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(
        "bg-primary/20 relative h-6 w-full overflow-hidden rounded-full",
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className="bg-lightgreen h-full w-full flex-1 transition-all"
        style={{ transform: `translateX(-${100 - ((value! * 100)/base! || 0)}%)` }}
      />
      <div className="absolute inset-0 flex items-center justify-center text-xs text-olive">
        {value!}/{base!}
      </div>
    </ProgressPrimitive.Root>
  )
}

export { Progress }
