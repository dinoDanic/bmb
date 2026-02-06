import { cn } from "@/lib/utils";
import { SwitcherProps } from "@/components/types";
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

export const Switcher = ({
  threshold = "40rem",
  space = "md",
  limit,
  className,
  children,
  ...props
}: SwitcherProps) => {
  const spaceClass = typeof space === 'string' && space in SPACE_MAP
    ? SPACE_MAP[space as keyof typeof SPACE_MAP]
    : `gap-[${space}]`;

  return (
    <div
      className={cn(
        "flex flex-wrap",
        spaceClass,
        "[&>*]:flex-grow [&>*]:[flex-basis:calc((var(--threshold)-100%)*999)]",
        limit && `[&>:nth-last-child(n+${limit + 1})]:flex-[100%]`,
        className
      )}
      style={{ "--threshold": threshold } as React.CSSProperties}
      {...props}
    >
      {children}
    </div>
  );
};
