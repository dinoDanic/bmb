import { cn } from "@/lib/utils";
import { GridProps } from "@/components/types";

const SPACE_MAP = {
  xs: "gap-2",
  sm: "gap-3",
  md: "gap-4",
  lg: "gap-6",
  xl: "gap-8",
  "2xl": "gap-10",
  "3xl": "gap-12",
} as const;

export const Grid = ({
  minWidth = "250px",
  space = "md",
  className,
  children,
  ...props
}: GridProps) => {
  const spaceClass = typeof space === 'string' && space in SPACE_MAP
    ? SPACE_MAP[space as keyof typeof SPACE_MAP]
    : `gap-[${space}]`;

  return (
    <div
      className={cn(
        `grid [grid-template-columns:repeat(auto-fill,minmax(min(100%,${minWidth}),1fr))]`,
        spaceClass,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
