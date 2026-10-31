import { cn } from "@/lib/cn";

export function Avatar({
  emoji,
  size = "md",
  className,
}: {
  emoji: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}) {
  const sizes = {
    sm: "w-10 h-10 text-xl",
    md: "w-14 h-14 text-2xl",
    lg: "w-20 h-20 text-4xl",
    xl: "w-28 h-28 text-6xl",
  };
  return (
    <div
      className={cn(
        "rounded-full bg-gradient-to-br from-purple-100 to-sky-100 flex items-center justify-center border-4 border-white shadow-[var(--shadow-softer)]",
        sizes[size],
        className
      )}
    >
      <span>{emoji}</span>
    </div>
  );
}
