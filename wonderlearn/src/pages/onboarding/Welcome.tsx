import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { GardenBackground } from "@/components/backgrounds/GardenBackground";
import { Button } from "@/components/ui/Button";
import { useChildProfileStore } from "@/stores/childProfileStore";

const worlds = [
  { emoji: "🌳", name: "Knowledge Forest" },
  { emoji: "🧠", name: "Memory Garden" },
  { emoji: "🔢", name: "Number Mountain" },
  { emoji: "🎯", name: "Focus Field" },
];

export default function Welcome() {
  const navigate = useNavigate();
  const profile = useChildProfileStore((s) => s.profile);
  const name = profile?.nickname || profile?.name || "Explorer";

  return (
    <GardenBackground>
      <div className="min-h-screen flex items-center justify-center px-5 py-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, type: "spring" }}
          className="max-w-lg w-full bg-white rounded-3xl shadow-[var(--shadow-soft)] p-8 sm:p-10 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="text-7xl mb-4"
            aria-hidden
          >
            🧚
          </motion.div>
          <h1 className="font-display font-semibold text-2xl sm:text-3xl text-ink-900">
            Hi {name}! 👋
          </h1>
          <p className="text-ink-500 mt-2 text-lg">I'm Lumi, your learning guide.</p>
          <p className="text-ink-700 mt-4 font-medium">Together we'll explore:</p>

          <div className="grid grid-cols-2 gap-3 mt-4">
            {worlds.map((w, i) => (
              <motion.div
                key={w.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="rounded-2xl bg-purple-50 py-4 flex flex-col items-center gap-1"
              >
                <span className="text-3xl">{w.emoji}</span>
                <span className="text-sm font-semibold text-ink-700">{w.name}</span>
              </motion.div>
            ))}
          </div>

          <p className="text-ink-900 font-display font-semibold text-lg mt-6">
            Let's begin!
          </p>
          <Button size="xl" className="mt-4 w-full" onClick={() => navigate("/dashboard")}>
            Start Adventure
          </Button>
        </motion.div>
      </div>
    </GardenBackground>
  );
}
