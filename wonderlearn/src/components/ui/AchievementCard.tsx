import { motion } from "framer-motion";
import type { Achievement } from "@/types";
import { cn } from "@/lib/cn";

export function AchievementCard({ achievement }: { achievement: Achievement }) {
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={achievement.unlocked ? { scale: 1.04, rotate: -1 } : undefined}
      className={cn(
        "rounded-3xl p-5 text-center border shadow-[var(--shadow-softer)] flex flex-col items-center gap-2",
        achievement.unlocked
          ? "bg-gradient-to-br from-sun-100 to-white border-sun-300"
          : "bg-purple-50/60 border-purple-100 opacity-60"
      )}
    >
      <span className="text-4xl">{achievement.unlocked ? achievement.emoji : "🔒"}</span>
      <h4 className="font-display font-semibold text-ink-900">{achievement.title}</h4>
      <p className="text-xs text-ink-500">{achievement.description}</p>
    </motion.div>
  );
}
