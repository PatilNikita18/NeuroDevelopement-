import { cn } from "@/lib/cn";

export function Badge({
  children,
  color = "purple",
  className,
}: {
  children: React.ReactNode;
  color?: "purple" | "sky" | "mint" | "sun" | "coral";
  className?: string;
}) {
  const map = {
    purple: "bg-purple-100 text-purple-700",
    sky: "bg-sky-100 text-sky-700",
    mint: "bg-mint-100 text-mint-700",
    sun: "bg-sun-100 text-sun-700",
    coral: "bg-coral-100 text-coral-700",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold",
        map[color],
        className
      )}
    >
      {children}
    </span>
  );
}
