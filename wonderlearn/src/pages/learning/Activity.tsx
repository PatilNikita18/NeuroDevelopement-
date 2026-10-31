import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { AppShell } from "@/components/layout/AppShell";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { AudioButton } from "@/components/ui/AudioButton";
import { HintButton } from "@/components/ui/HintButton";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { PhaserGameContainer, type GameResult } from "@/components/games/PhaserGameContainer";
import { activities } from "@/lib/mockData";
import { useGamificationStore } from "@/stores/gamificationStore";
import { useLearningSessionStore } from "@/stores/learningSessionStore";

export default function ActivityScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const activity = activities.find((a) => a.id === id) ?? activities[0];
  const [showHint, setShowHint] = useState(false);
  const [result, setResult] = useState<GameResult | null>(null);
  const addStars = useGamificationStore((s) => s.addStars);
  const { useHint, hintsUsed } = useLearningSessionStore();

  const index = activities.findIndex((a) => a.id === activity.id);

  function handleComplete(r: GameResult) {
    setResult(r);
    addStars(Math.round(r.score / 2));
  }

  const struggled = result ? result.accuracy < 60 : false;

  return (
    <AppShell>
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <Card className="!p-4 sm:!p-5 mb-6">
          <div className="flex items-center justify-between mb-2">
            <p className="font-display font-semibold text-ink-900">
              🧠 {activity.title}
            </p>
            <span className="text-sm font-semibold text-sun-700">⭐ {activity.stars * 10}</span>
          </div>
          <p className="text-xs text-ink-500 mb-2">
            Adventure {index + 1} of {activities.length}
          </p>
          <ProgressBar value={((index + 1) / activities.length) * 100} color="mint" />
        </Card>

        <AnimatePresence mode="wait">
          {!result ? (
            <motion.div key="game" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Card className="!p-5 sm:!p-7">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-display font-semibold text-lg text-ink-900">
                    {activity.description}
                  </h2>
                  <div className="flex gap-2">
                    <AudioButton />
                    <HintButton onClick={() => { setShowHint(true); useHint(); }} />
                  </div>
                </div>

                <AnimatePresence>
                  {showHint && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mb-4 rounded-2xl bg-sun-100 p-4 text-sm text-ink-700"
                    >
                      💡 Let's try it together! Step 1 — look carefully at each card. Step
                      2 — tap the one that matches.
                      {hintsUsed > 0 && (
                        <span className="block mt-1 text-xs text-ink-500">
                          Hints used: {hintsUsed}
                        </span>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                <PhaserGameContainer gameType={activity.gameType} onComplete={handleComplete} />
              </Card>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
              <Card className="!p-7 sm:!p-9 text-center">
                <motion.div
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ duration: 1.4, repeat: Infinity }}
                  className="text-6xl mb-3"
                >
                  {struggled ? "💪" : "🎉"}
                </motion.div>
                <h2 className="font-display font-semibold text-2xl text-ink-900 mb-1">
                  {struggled ? "Great effort!" : "Amazing!"}
                </h2>
                <p className="text-ink-500 mb-6">
                  {struggled
                    ? "Every adventure helps you grow. Let's practice this one again soon."
                    : "You're getting stronger every day. Ready for a challenge?"}
                </p>

                <div className="grid grid-cols-3 gap-3 max-w-sm mx-auto mb-6">
                  <div className="rounded-2xl bg-mint-100 py-3">
                    <p className="text-lg font-display font-semibold text-mint-700">
                      {result.accuracy}%
                    </p>
                    <p className="text-xs text-ink-500">Accuracy</p>
                  </div>
                  <div className="rounded-2xl bg-sun-100 py-3">
                    <p className="text-lg font-display font-semibold text-sun-700">
                      +{Math.round(result.score / 2)}
                    </p>
                    <p className="text-xs text-ink-500">Stars</p>
                  </div>
                  <div className="rounded-2xl bg-sky-100 py-3">
                    <p className="text-lg font-display font-semibold text-sky-700">
                      {(result.responseTime / 1000).toFixed(0)}s
                    </p>
                    <p className="text-xs text-ink-500">Time</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  {struggled ? (
                    <Button onClick={() => setResult(null)}>Try Again Together</Button>
                  ) : (
                    <Button onClick={() => navigate("/subjects")}>Next Level</Button>
                  )}
                  <Link to="/dashboard">
                    <Button variant="secondary">Back to Adventure Map</Button>
                  </Link>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AppShell>
  );
}
