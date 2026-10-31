import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAccessibilityStore } from "@/stores/accessibilityStore";
import { cn } from "@/lib/cn";

export function AccessibilityBar() {
  const [open, setOpen] = useState(false);
  const a11y = useAccessibilityStore();

  const toggles: { key: any; label: string; emoji: string }[] = [
    { key: "readAloud", label: "Read Aloud", emoji: "🔊" },
    { key: "highContrast", label: "Contrast", emoji: "🎨" },
    { key: "animationsEnabled", label: "Animation", emoji: "✨" },
    { key: "soundEnabled", label: "Sound", emoji: "🔇" },
    { key: "reduceDistractions", label: "Reduce Distractions", emoji: "🧘" },
  ];

  return (
    <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-40 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="bg-white rounded-3xl shadow-[var(--shadow-soft)] p-4 w-64"
          >
            <p className="font-display font-semibold text-sm text-ink-900 mb-3">
              Accessibility
            </p>
            <div className="flex flex-col gap-1.5 mb-3">
              {toggles.map((t) => (
                <button
                  key={t.key}
                  onClick={() => a11y.toggle(t.key)}
                  className={cn(
                    "flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium transition-colors",
                    (a11y as any)[t.key]
                      ? "bg-purple-100 text-purple-700"
                      : "bg-purple-50/60 text-ink-500"
                  )}
                  aria-pressed={(a11y as any)[t.key]}
                >
                  <span>
                    {t.emoji} {t.label}
                  </span>
                  <span>{(a11y as any)[t.key] ? "On" : "Off"}</span>
                </button>
              ))}
            </div>
            <div>
              <p className="text-xs font-semibold text-ink-500 mb-1.5">🔤 Text Size</p>
              <div className="flex gap-1.5">
                {(["sm", "md", "lg", "xl"] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => a11y.setTextSize(s)}
                    className={cn(
                      "flex-1 py-1.5 rounded-lg text-xs font-semibold border",
                      a11y.textSize === s
                        ? "bg-purple-500 text-white border-purple-500"
                        : "bg-white text-ink-500 border-purple-100"
                    )}
                  >
                    {s.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        onClick={() => setOpen((o) => !o)}
        aria-label="Accessibility settings"
        aria-expanded={open}
        className="w-14 h-14 rounded-full bg-purple-500 text-white shadow-[var(--shadow-soft)] flex items-center justify-center text-2xl"
      >
        ♿
      </motion.button>
    </div>
  );
}
