import { cn } from "@/lib/utils";
import { CoverProps } from "@/components/types";

const SPACE_MAP = {
  xs: "gap-2",
  sm: "gap-3",
  md: "gap-4",
  lg: "gap-6",
  xl: "gap-8",
  "2xl": "gap-10",
  "3xl": "gap-12",
} as const;

export const Cover = ({
  centered = "[data-centered]",
  space = "md",
  minHeight = "100vh",
  noPad = false,
  className,
  children,
  ...props
}: CoverProps) => {
  const spaceClass = typeof space === 'string' && space in SPACE_MAP
    ? SPACE_MAP[space as keyof typeof SPACE_MAP]
    : `gap-[${space}]`;

  return (
    <div
      className={cn(
        "flex flex-col",
        spaceClass,
        !noPad && "p-4",
        `[&>:where(${centered})]:my-auto`,
        className
      )}
      style={{ minHeight }}
      {...props}
    >
      {children}
    </div>
  );
};
