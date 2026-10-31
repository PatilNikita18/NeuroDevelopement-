import { motion } from "framer-motion";

const COLORS = ["#f43f5e", "#f59e0b", "#10b981", "#3b82f6", "#a855f7", "#ec4899"];

export function ConfettiBlast({ show }: { show: boolean }) {
  if (!show) return null;
  const pieces = Array.from({ length: 60 });
  return (
    <div className="pointer-events-none fixed inset-0 z-[200] overflow-hidden">
      {pieces.map((_, i) => {
        const x = Math.random() * 100;
        const delay = Math.random() * 0.3;
        const dur = 1.5 + Math.random() * 1.5;
        const color = COLORS[i % COLORS.length];
        const size = 8 + Math.random() * 8;
        return (
          <motion.div
            key={i}
            initial={{ y: -40, x: `${x}vw`, rotate: 0, opacity: 1 }}
            animate={{ y: "110vh", rotate: 720, opacity: 0.9 }}
            transition={{ duration: dur, delay, ease: "easeIn" }}
            style={{
              position: "absolute",
              width: size,
              height: size,
              background: color,
              borderRadius: i % 2 ? "50%" : "3px",
            }}
          />
        );
      })}
    </div>
  );
}