import { motion, AnimatePresence } from "framer-motion";
import { Flame } from "lucide-react";

export function StreakFlame({ streak }: { streak: number }) {
  const hot = streak >= 5;
  return (
    <AnimatePresence>
      {streak > 0 && (
        <motion.div
          key={streak}
          initial={{ scale: 0.6, opacity: 0, y: -8 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.6, opacity: 0 }}
          className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-orange-500 to-red-500 px-3 py-1.5 shadow-lg"
        >
          <motion.div
            animate={{ rotate: hot ? [0, -8, 8, -8, 0] : 0, scale: hot ? [1, 1.15, 1] : 1 }}
            transition={{ duration: 0.6, repeat: hot ? Infinity : 0, repeatDelay: 1 }}
          >
            <Flame className="w-4 h-4 text-yellow-200 fill-yellow-300" />
          </motion.div>
          <span className="text-sm font-extrabold text-white tabular-nums">
            {streak}
          </span>
          {hot && (
            <span className="text-[10px] font-bold text-yellow-100 uppercase tracking-wider">
              on fire!
            </span>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}