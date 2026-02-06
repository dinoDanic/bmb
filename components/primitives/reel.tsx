import { cn } from "@/lib/utils";
import { ReelProps } from "@/components/types";
import React from "react";

const SPACE_MAP = {
  xs: "gap-2",
  sm: "gap-3",
  md: "gap-4",
  lg: "gap-6",
  xl: "gap-8",
  "2xl": "gap-10",
  "3xl": "gap-12",
} as const;

export const Reel = ({
  itemWidth = "auto",
  space = "md",
  height = "auto",
  noBar = false,
  className,
  children,
  ...props
}: ReelProps) => {
  const spaceClass = typeof space === 'string' && space in SPACE_MAP
    ? SPACE_MAP[space as keyof typeof SPACE_MAP]
    : `gap-[${space}]`;

  return (
    <div
      className={cn(
        "flex overflow-x-auto overflow-y-hidden",
        spaceClass,
        noBar && "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        className
      )}
      style={{ height: height !== "auto" ? height : undefined }}
      {...props}
    >
      {React.Children.map(children, (child) => (
        <div className="shrink-0" style={{ width: itemWidth !== "auto" ? itemWidth : undefined }}>
          {child}
        </div>
      ))}
    </div>
  );
};
