import { motion } from "framer-motion";

/** Soft magical "wonder garden" backdrop used across the main app. */
export function GardenBackground({ children }: { children?: React.ReactNode }) {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-lavender via-cream to-mintwash">
      <div className="absolute inset-0 pointer-events-none">
        {[
          { emoji: "☁️", top: "6%", left: "10%", size: "text-4xl", dur: 20 },
          { emoji: "☁️", top: "14%", left: "78%", size: "text-3xl", dur: 26 },
          { emoji: "🦋", top: "30%", left: "88%", size: "text-2xl", dur: 14 },
          { emoji: "🦋", top: "70%", left: "4%", size: "text-xl", dur: 16 },
          { emoji: "⭐", top: "45%", left: "6%", size: "text-lg", dur: 8 },
          { emoji: "⭐", top: "8%", left: "45%", size: "text-lg", dur: 10 },
          { emoji: "🌸", bottom: "4%", left: "8%", size: "text-3xl", dur: 12, top: undefined },
          { emoji: "🌿", bottom: "0%", left: "85%", size: "text-4xl", dur: 12, top: undefined },
        ].map((e, i) => (
          <motion.span
            key={i}
            className={`absolute ${e.size} opacity-70 select-none`}
            style={{ top: e.top as any, left: e.left, bottom: (e as any).bottom }}
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: e.dur, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden
          >
            {e.emoji}
          </motion.span>
        ))}
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  );
}


// import type { ReactNode } from "react";

// interface GardenBackgroundProps {
//   children: ReactNode;
// }

// export function GardenBackground({
//   children,
// }: GardenBackgroundProps) {
//   return (
//     <div className="
//       relative
//       min-h-screen
//       overflow-hidden
//       bg-gradient-to-br
//       from-[#f8f4ff]
//       via-[#f3efff]
//       to-[#e7f8ed]
//     ">

//       {/* Decorative circles */}

//       <div className="
//         absolute
//         -left-24
//         -top-24
//         w-80
//         h-80
//         rounded-full
//         bg-purple-200/50
//         blur-3xl
//       " />

//       <div className="
//         absolute
//         -right-24
//         -bottom-24
//         w-96
//         h-96
//         rounded-full
//         bg-green-200/40
//         blur-3xl
//       " />

//       {/* Garden decorations */}

//       <div className="
//         pointer-events-none
//         absolute
//         left-[8%]
//         bottom-[8%]
//         text-5xl
//         opacity-60
//       ">
//         🌸
//       </div>

//       <div className="
//         pointer-events-none
//         absolute
//         right-[10%]
//         bottom-[12%]
//         text-5xl
//         opacity-60
//       ">
//         🌿
//       </div>

//       <div className="
//         pointer-events-none
//         absolute
//         left-[15%]
//         top-[12%]
//         text-3xl
//         opacity-60
//       ">
//         ✨
//       </div>

//       <div className="
//         pointer-events-none
//         absolute
//         right-[15%]
//         top-[10%]
//         text-3xl
//         opacity-60
//       ">
//         🦋
//       </div>

//       <div className="relative z-10">
//         {children}
//       </div>

//     </div>
//   );
// }