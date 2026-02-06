import { cn } from "@/lib/utils";
import { SidebarProps } from "@/components/types";
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

export const Sidebar = ({
  side = "left",
  sideWidth = "250px",
  contentMin = "50%",
  space = "md",
  noStretch = false,
  className,
  children,
  ...props
}: SidebarProps) => {
  const spaceClass = typeof space === 'string' && space in SPACE_MAP
    ? SPACE_MAP[space as keyof typeof SPACE_MAP]
    : `gap-[${space}]`;

  const childrenArray = React.Children.toArray(children);
  const sidebar = childrenArray[0];
  const content = childrenArray[1];

  return (
    <div
      className={cn(
        "flex flex-wrap",
        spaceClass,
        !noStretch && "items-stretch",
        className
      )}
      {...props}
    >
      <div
        className={cn(side === "right" && "order-2")}
        style={{ flexBasis: sideWidth, flexGrow: 1 }}
      >
        {sidebar}
      </div>
      <div style={{ flexBasis: 0, flexGrow: 999, minWidth: contentMin }}>
        {content}
      </div>
    </div>
  );
};
