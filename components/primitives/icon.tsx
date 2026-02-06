import { cn } from "@/lib/utils";
import { IconProps } from "@/components/types";

const SPACE_MAP = {
  xs: "gap-1",
  sm: "gap-1.5",
  md: "gap-2",
  lg: "gap-3",
  xl: "gap-4",
  "2xl": "gap-5",
  "3xl": "gap-6",
} as const;

export const Icon = ({ space = "sm", label, className, children, ...props }: IconProps) => {
  const spaceClass = typeof space === 'string' && space in SPACE_MAP
    ? SPACE_MAP[space as keyof typeof SPACE_MAP]
    : `gap-[${space}]`;

  return (
    <span
      className={cn("inline-flex items-center", spaceClass, "[&>svg]:shrink-0", className)}
      role={label ? "img" : undefined}
      aria-label={label}
      {...props}
    >
      {children}
    </span>
  );
};
