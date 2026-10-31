import { useEffect, useRef } from "react";
import Phaser from "phaser";

export interface GameResult {
  score: number;
  accuracy: number;
  responseTime: number;
  mistakes: number;
  attempts: number;
  completed: boolean;
}

export type GameType =
  | "memory-match"
  | "object-matching"
  | "focus-finder"
  | "number-catch"
  | "sequence-builder"
  | "pattern-recognition";

/**
 * Reusable Phaser mini-game container. Each `gameType` maps to a scene
 * placeholder — swap in the real game logic per type later. All scenes
 * report the same GameResult shape back to React via `onComplete`, which
 * is exactly what will be POSTed to /api/attempts once the backend exists.
 */
export function PhaserGameContainer({
  gameType,
  onComplete,
}: {
  gameType: GameType;
  onComplete: (result: GameResult) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const gameRef = useRef<Phaser.Game | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const startTime = Date.now();
    let matches = 0;
    let mistakes = 0;
    const targetMatches = 4;

    const emojiSets: Record<string, string[]> = {
      "memory-match": ["🍎", "🐶", "🚗", "⭐", "🏠", "🌸"],
      "object-matching": ["🍎", "🐶", "🚗", "⭐"],
      "focus-finder": ["🎯", "🎯", "🎯", "🎪", "🎯", "🎯"],
      "number-catch": ["1", "2", "3", "4", "5"],
      "sequence-builder": ["🔵", "🟢", "🟡", "🔴"],
      "pattern-recognition": ["▲", "●", "■", "▲", "●"],
    };

    class WonderScene extends Phaser.Scene {
      constructor() {
        super("wonder-scene");
      }
      create() {
        const { width, height } = this.scale;
        this.cameras.main.setBackgroundColor("#F0ECFB");

        this.add
          .text(width / 2, 40, "Tap the matching cards!", {
            fontFamily: "Fredoka, sans-serif",
            fontSize: "22px",
            color: "#2B2540",
          })
          .setOrigin(0.5);

        const items = emojiSets[gameType] ?? emojiSets["memory-match"];
        const cols = 3;
        const startX = width / 2 - ((cols - 1) * 110) / 2;
        const startY = 130;

        items.forEach((emoji, i) => {
          const x = startX + (i % cols) * 110;
          const y = startY + Math.floor(i / cols) * 110;

          const bg = this.add
            .rectangle(x, y, 90, 90, 0xffffff, 1)
            .setStrokeStyle(3, 0x8b7bdb)
            .setInteractive({ useHandCursor: true });

          const label = this.add
            .text(x, y, emoji, { fontSize: "40px" })
            .setOrigin(0.5);

          bg.on("pointerdown", () => {
            bg.setFillStyle(0xdaf3e6);
            this.tweens.add({
              targets: [bg, label],
              scale: 1.1,
              yoyo: true,
              duration: 150,
            });

            const isMatch = Math.random() > 0.3;
            if (isMatch) {
              matches += 1;
            } else {
              mistakes += 1;
            }

            if (matches >= targetMatches) {
              const responseTime = Date.now() - startTime;
              const attempts = matches + mistakes;
              const accuracy = Math.round((matches / attempts) * 100);
              onComplete({
                score: matches * 10,
                accuracy,
                responseTime,
                mistakes,
                attempts,
                completed: true,
              });
            }
          });
        });
      }
    }

    const width = containerRef.current.clientWidth || 480;
    gameRef.current = new Phaser.Game({
      type: Phaser.AUTO,
      parent: containerRef.current,
      width,
      height: 380,
      transparent: true,
      scene: [WonderScene],
      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
      },
    });

    return () => {
      gameRef.current?.destroy(true);
      gameRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameType]);

  return (
    <div
      ref={containerRef}
      className="w-full rounded-3xl overflow-hidden border border-purple-100 shadow-[var(--shadow-softer)]"
      role="application"
      aria-label="Learning mini-game"
    />
  );
}
