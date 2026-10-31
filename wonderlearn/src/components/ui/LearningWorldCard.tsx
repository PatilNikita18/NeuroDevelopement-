import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import type { LearningWorld } from "@/types";
import { ProgressBar } from "./ProgressBar";
import { cn } from "@/lib/cn";

const bg: Record<LearningWorld["color"], string> = {
  purple: "from-purple-100 to-purple-50",
  sky: "from-sky-100 to-sky-100/50",
  mint: "from-mint-100 to-mint-100/50",
  sun: "from-sun-100 to-sun-100/50",
  coral: "from-coral-100 to-coral-100/50",
};

export function LearningWorldCard({ world }: { world: LearningWorld }) {
  const content = (
    <motion.div
      whileHover={world.unlocked ? { y: -6, scale: 1.02 } : undefined}
      className={cn(
        "relative rounded-3xl p-5 bg-gradient-to-br shadow-[var(--shadow-softer)] border border-white h-full flex flex-col gap-3",
        bg[world.color],
        !world.unlocked && "opacity-60 grayscale-[30%]"
      )}
    >
      <div className="flex items-center justify-between">
        <span className="text-4xl" aria-hidden>
          {world.emoji}
        </span>
        {!world.unlocked && <span className="text-lg" aria-label="locked">🔒</span>}
      </div>
      <div>
        <h3 className="font-display font-semibold text-lg text-ink-900">{world.name}</h3>
        <p className="text-sm text-ink-500 mt-0.5">{world.description}</p>
      </div>
      {world.unlocked ? (
        <div className="mt-auto pt-1">
          <ProgressBar value={world.progress} color={world.color} />
          <div className="flex items-center justify-between mt-2 text-xs font-semibold text-ink-500">
            <span>Level {world.level}</span>
            <span>⭐ {world.stars}</span>
          </div>
        </div>
      ) : (
        <p className="mt-auto text-xs font-semibold text-ink-500">Unlocks soon</p>
      )}
    </motion.div>
  );

  if (!world.unlocked) return <div className="cursor-not-allowed">{content}</div>;
  return (
    <Link to={`/subjects/${world.key}`} aria-label={`Open ${world.name}`}>
      {content}
    </Link>
  );
}
