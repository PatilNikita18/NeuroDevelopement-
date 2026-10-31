import { motion } from "framer-motion";

const stars = Array.from({ length: 34 }).map((_, i) => ({
  id: i,
  top: Math.random() * 100,
  left: Math.random() * 100,
  size: 1 + Math.random() * 2.2,
  delay: Math.random() * 4,
}));

/** Dreamy night-sky "universe" theme used for auth screens. */
export function CloudBackground({ children }: { children?: React.ReactNode }) {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-nightsky-900 via-nightsky-700 to-nightsky-500">
      {/* stars */}
      <div className="absolute inset-0">
        {stars.map((s) => (
          <motion.span
            key={s.id}
            className="absolute rounded-full bg-starlight"
            style={{
              top: `${s.top}%`,
              left: `${s.left}%`,
              width: s.size,
              height: s.size,
            }}
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{ duration: 3 + Math.random() * 3, repeat: Infinity, delay: s.delay }}
          />
        ))}
      </div>

      {/* moon */}
      <motion.div
        className="absolute top-10 right-10 sm:right-20 w-16 h-16 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-sun-100 to-sun-300 shadow-[0_0_60px_20px_rgba(253,240,206,0.35)]"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* floating clouds */}
      {[
        { top: "18%", left: "8%", scale: 1, duration: 22 },
        { top: "62%", left: "-4%", scale: 1.4, duration: 30 },
        { top: "38%", left: "70%", scale: 0.8, duration: 26 },
        { top: "78%", left: "62%", scale: 1.1, duration: 34 },
      ].map((c, i) => (
        <motion.div
          key={i}
          className="absolute text-6xl sm:text-8xl opacity-80 select-none"
          style={{ top: c.top, left: c.left, scale: c.scale }}
          animate={{ x: [0, 40, 0] }}
          transition={{ duration: c.duration, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden
        >
          ☁️
        </motion.div>
      ))}

      {/* small planets */}
      <motion.div
        className="absolute bottom-24 left-12 text-4xl opacity-90"
        animate={{ rotate: [0, 15, 0], y: [0, -6, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
        aria-hidden
      >
        🪐
      </motion.div>
      <motion.div
        className="absolute top-24 left-1/2 text-2xl opacity-80"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
        aria-hidden
      >
        ✨
      </motion.div>

      <div className="relative z-10">{children}</div>
    </div>
  );
}



// import type { ReactNode } from "react";

// interface CloudBackgroundProps {
//   children: ReactNode;
// }

// export function CloudBackground({
//   children,
// }: CloudBackgroundProps) {
//   return (
//     <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#111b4d] via-[#30266f] to-[#552a78]">

//       {/* Decorative stars */}

//       <div className="pointer-events-none absolute inset-0 overflow-hidden">

//         <div className="absolute left-[8%] top-[12%] text-white/70 text-xl">
//           ✦
//         </div>

//         <div className="absolute left-[25%] top-[28%] text-purple-200/70 text-sm">
//           ✧
//         </div>

//         <div className="absolute right-[12%] top-[18%] text-white/70 text-lg">
//           ✦
//         </div>

//         <div className="absolute right-[30%] top-[8%] text-purple-200/70">
//           ✧
//         </div>

//         <div className="absolute left-[15%] bottom-[20%] text-white/50">
//           ✦
//         </div>

//         <div className="absolute right-[18%] bottom-[25%] text-white/60">
//           ✧
//         </div>

//       </div>

//       {/* Clouds */}

//       <div className="
//         pointer-events-none
//         absolute
//         -left-20
//         top-20
//         h-40
//         w-80
//         rounded-full
//         bg-white/10
//         blur-3xl
//       " />

//       <div className="
//         pointer-events-none
//         absolute
//         -right-20
//         bottom-20
//         h-52
//         w-96
//         rounded-full
//         bg-purple-300/10
//         blur-3xl
//       " />

//       <div className="relative z-10">
//         {children}
//       </div>

//     </div>
//   );
// }