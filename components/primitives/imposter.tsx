import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { ImposterProps } from "@/components/types";

const MARGIN_MAP = {
  xs: "m-2",
  sm: "m-3",
  md: "m-4",
  lg: "m-6",
  xl: "m-8",
  "2xl": "m-10",
  "3xl": "m-12",
} as const;

const imposterVariants = cva("", {
  variants: {
    position: {
      center: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
      top: "top-0 left-1/2 -translate-x-1/2",
      bottom: "bottom-0 left-1/2 -translate-x-1/2",
      left: "top-1/2 left-0 -translate-y-1/2",
      right: "top-1/2 right-0 -translate-y-1/2",
      "top-left": "top-0 left-0",
      "top-right": "top-0 right-0",
      "bottom-left": "bottom-0 left-0",
      "bottom-right": "bottom-0 right-0",
    },
    fixed: { true: "fixed", false: "absolute" },
  },
  defaultVariants: { position: "center", fixed: false },
});

export const Imposter = ({
  position = "center",
  fixed = false,
  margin = "0",
  breakout = false,
  className,
  children,
  ...props
}: ImposterProps) => {
  const marginClass = typeof margin === 'string' && margin in MARGIN_MAP
    ? MARGIN_MAP[margin as keyof typeof MARGIN_MAP]
    : margin !== "0" ? `m-[${margin}]` : "";

  return (
    <div
      className={cn(
        imposterVariants({ position, fixed }),
        marginClass,
        breakout && "max-w-none max-h-none",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
