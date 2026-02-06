import { cn } from "@/lib/utils";
import { BaseComponentProps } from "@/components/types";

export const Stack = ({ className, children, ...props }: BaseComponentProps) => {
  return (
    <div className={cn("flex flex-col gap-2", className)} {...props}>
      {children}
    </div>
  );
};
