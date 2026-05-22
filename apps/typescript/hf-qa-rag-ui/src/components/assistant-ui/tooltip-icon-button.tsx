"use client";

import type { ComponentPropsWithRef } from "react";
import { forwardRef } from "react";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

export type TooltipIconButtonProps = ComponentPropsWithRef<"button"> & {
  tooltip: string;
  side?: "top" | "bottom" | "left" | "right";
};

export const TooltipIconButton = forwardRef<
  HTMLButtonElement,
  TooltipIconButtonProps
>(({ children, tooltip, side = "bottom", className, ...rest }, ref) => (
  <Tooltip>
    <TooltipTrigger asChild>
      <button
        ref={ref}
        type="button"
        className={cn(
          "inline-flex size-8 shrink-0 items-center justify-center rounded-md outline-none transition-colors",
          "hover:bg-accent hover:text-accent-foreground",
          "focus-visible:ring-2 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50",
          className,
        )}
        {...rest}
      >
        {children}
        <span className="sr-only">{tooltip}</span>
      </button>
    </TooltipTrigger>
    <TooltipContent side={side}>{tooltip}</TooltipContent>
  </Tooltip>
));

TooltipIconButton.displayName = "TooltipIconButton";
