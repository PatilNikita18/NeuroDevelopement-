import { type HTMLAttributes, type ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  hover?: boolean;
}

export function Card({ children, className, hover = false, ...props }: CardProps) {
  return (
    <motion.div
      whileHover={hover ? { y: -4, scale: 1.01 } : undefined}
      className={cn(
        "bg-white rounded-3xl shadow-[var(--shadow-softer)] border border-purple-50 p-6",
        className
      )}
      {...(props as any)}
    >
      {children}
    </motion.div>
  );
}
