import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
	"inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-heading uppercase tracking-[0.14em] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
	{
		variants: {
			variant: {
				default: "bg-gradient-to-r from-primary via-secondary to-accent text-primary-foreground shadow-lg shadow-primary/30 hover:shadow-xl hover:-translate-y-0.5",
				secondary: "bg-secondary text-secondary-foreground hover:shadow-lg hover:shadow-secondary/40",
				ghost: "bg-transparent text-foreground hover:bg-foreground/10",
				outline: "border border-primary/50 bg-background text-primary hover:border-primary hover:text-primary",
			},
			size: {
				default: "h-11 px-5",
				sm: "h-9 rounded-md px-3",
				lg: "h-12 rounded-md px-6",
				icon: "h-10 w-10",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	},
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: "default" | "secondary" | "ghost" | "outline";
	size?: "default" | "sm" | "lg" | "icon";
	asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, asChild = false, ...props }, ref) => {
	const Comp = asChild ? Slot : "button";
	return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
});
Button.displayName = "Button";

export { Button, buttonVariants };
