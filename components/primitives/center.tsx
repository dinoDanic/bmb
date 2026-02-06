import { cn } from "@/lib/utils";
import { CenterProps } from "@/components/types";

const GUTTER_MAP = {
  xs: "px-2",
  sm: "px-3",
  md: "px-4",
  lg: "px-6",
  xl: "px-8",
  "2xl": "px-10",
  "3xl": "px-12",
} as const;

export const Center = ({
  maxWidth = "60ch",
  centerText = false,
  centerChildren = false,
  gutters = "md",
  intrinsic = false,
  className,
  children,
  ...props
}: CenterProps) => {
  const gutterClass = typeof gutters === 'string' && gutters in GUTTER_MAP
    ? GUTTER_MAP[gutters as keyof typeof GUTTER_MAP]
    : `px-[${gutters}]`;

  return (
    <div
      className={cn(
        "mx-auto box-content",
        gutterClass,
        centerText && "text-center",
        centerChildren && "flex flex-col items-center",
        intrinsic && "w-fit",
        className
      )}
      style={{ maxWidth: intrinsic ? "max-content" : maxWidth }}
      {...props}
    >
      {children}
    </div>
  );
};
