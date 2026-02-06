import { cn } from "@/lib/utils";
import { BaseComponentProps } from "@/components/types";

export const Cluster = ({ className, children, ...props }: BaseComponentProps) => {
  return (
    <div className={cn("flex flex-wrap gap-2", className)} {...props}>
      {children}
    </div>
  );
};
