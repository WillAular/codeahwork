import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-[var(--azul-codeah)] text-white shadow-xs",
        gold:
          "border-transparent bg-[var(--arena-dorada)]/40 text-[var(--azul-profundo)] border border-[var(--dorado-codeah)]/40 font-bold",
        secondary:
          "border-transparent bg-[var(--gris-azulado)] text-[var(--azul-codeah)] font-medium",
        outline: "text-[var(--azul-codeah)] border-[var(--azul-codeah)]/30",
        success: "border-transparent bg-emerald-50 text-[var(--verde-exito)] border border-emerald-200 font-semibold",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
