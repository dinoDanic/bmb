import { cn } from "@/lib/utils";
import { BaseComponentProps } from "@/components/types";

export const Box = ({ className, children, ...props }: BaseComponentProps) => {
  return (
    <div className={cn("p-4 border rounded-lg", className)} {...props}>
      {children}
    </div>
  );
};
