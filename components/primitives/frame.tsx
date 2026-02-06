import { cn } from "@/lib/utils";
import { FrameProps } from "@/components/types";

const RATIO_MAP = {
  "16:9": "aspect-[16/9]",
  "4:3": "aspect-[4/3]",
  "1:1": "aspect-square",
  "3:2": "aspect-[3/2]",
  "21:9": "aspect-[21/9]",
  "9:16": "aspect-[9/16]",
} as const;

export const Frame = ({ ratio = "16:9", className, children, ...props }: FrameProps) => {
  const ratioClass = ratio in RATIO_MAP
    ? RATIO_MAP[ratio as keyof typeof RATIO_MAP]
    : `aspect-[${ratio}]`;

  return (
    <div
      className={cn(
        "relative overflow-hidden",
        ratioClass,
        "[&>img]:absolute [&>img]:inset-0 [&>img]:w-full [&>img]:h-full [&>img]:object-cover",
        "[&>video]:absolute [&>video]:inset-0 [&>video]:w-full [&>video]:h-full [&>video]:object-cover",
        "[&>iframe]:absolute [&>iframe]:inset-0 [&>iframe]:w-full [&>iframe]:h-full",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
