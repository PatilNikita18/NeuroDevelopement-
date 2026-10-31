import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

const colorMap: Record<string, string> = {
  purple: "bg-purple-500",
  sky: "bg-sky-500",
  mint: "bg-mint-500",
  sun: "bg-sun-500",
  coral: "bg-coral-500",
};

export function ProgressBar({
  value,
  color = "purple",
  className,
  label,
}: {
  value: number;
  color?: keyof typeof colorMap;
  className?: string;
  label?: string;
}) {
  return (
    <div className={cn("w-full", className)}>
      {label && (
        <div className="flex items-center justify-between mb-1.5 text-sm font-medium text-ink-700">
          <span>{label}</span>
          <span>{value}%</span>
        </div>
      )}
      <div className="h-3 w-full rounded-full bg-purple-50 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className={cn("h-full rounded-full", colorMap[color])}
        />
      </div>
    </div>
  );
}
