import { type ButtonHTMLAttributes, type ReactNode } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost" | "coral";
type Size = "md" | "lg" | "xl";

interface ButtonProps
  extends Omit<HTMLMotionProps<"button">, "children">,
    Pick<ButtonHTMLAttributes<HTMLButtonElement>, "type" | "disabled"> {
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
  children: ReactNode;
}

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-purple-500 text-white hover:bg-purple-600 shadow-[var(--shadow-soft)]",
  secondary:
    "bg-white text-purple-700 border-2 border-purple-100 hover:border-purple-300",
  ghost: "bg-transparent text-ink-700 hover:bg-purple-50",
  coral:
    "bg-coral-500 text-white hover:bg-coral-700 shadow-[var(--shadow-soft)]",
};

const sizeClasses: Record<Size, string> = {
  md: "text-base px-5 py-2.5 rounded-2xl gap-2",
  lg: "text-lg px-7 py-3.5 rounded-2xl gap-2.5",
  xl: "text-xl px-9 py-4.5 rounded-3xl gap-3",
};

export function Button({
  variant = "primary",
  size = "lg",
  icon,
  children,
  className,
  ...props
}: ButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className={cn(
        "font-display font-semibold inline-flex items-center justify-center transition-colors focus-visible:outline-none disabled:opacity-50 disabled:cursor-not-allowed",
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {icon}
      {children}
    </motion.button>
  );
}


// import type {
//   ButtonHTMLAttributes,
//   ReactNode,
// } from "react";

// import { cn } from "@/lib/cn";

// type ButtonVariant =
//   | "primary"
//   | "secondary";

// type ButtonSize =
//   | "sm"
//   | "md"
//   | "lg"
//   | "xl";

// interface ButtonProps
//   extends ButtonHTMLAttributes<HTMLButtonElement> {
//   children: ReactNode;
//   variant?: ButtonVariant;
//   size?: ButtonSize;
// }

// const variants: Record<
//   ButtonVariant,
//   string
// > = {
//   primary: `
//     bg-purple-600
//     text-white
//     hover:bg-purple-700
//     active:bg-purple-800
//     shadow-lg
//   `,

//   secondary: `
//     bg-white/20
//     text-white
//     border
//     border-white/30
//     hover:bg-white/30
//   `,
// };

// const sizes: Record<ButtonSize, string> = {
//   sm: "px-3 py-2 text-sm rounded-xl",

//   md: "px-5 py-2.5 text-sm rounded-xl",

//   lg: "px-6 py-3 text-base rounded-2xl",

//   xl: "px-7 py-3.5 text-base sm:text-lg rounded-2xl",
// };

// // export function Button({
// //   children,
// //   variant = "primary",
// //   size = "md",
// //   className,
// //   disabled,
// //   type = "button",
// //   ...props
// // }: ButtonProps) {
// //   return (
// //     <button
// //       type={type}
// //       disabled={disabled}
// //       className={cn(
// //         `
// //         inline-flex
// //         items-center
// //         justify-center
// //         font-semibold
// //         transition-all
// //         duration-200
// //         focus:outline-none
// //         focus-visible:ring-2
// //         focus-visible:ring-purple-300
// //         disabled:cursor-not-allowed
// //         disabled:opacity-50
// //         active:scale-[0.98]
// //         `,
// //         variants[variant],
// //         sizes[size],
// //         className
// //       )}
// //       {...props}
// //     >
// //       {children}
// //     </button>
// //   );
// // }