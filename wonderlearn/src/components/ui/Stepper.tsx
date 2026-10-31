// import { motion } from "framer-motion";
// import { cn } from "@/lib/cn";

// export function Stepper({
//   steps,
//   current,
// }: {
//   steps: string[];
//   current: number;
// }) {
//   return (
//     <div className="flex items-center justify-center gap-2 sm:gap-3" role="list" aria-label="Registration progress">
//       {steps.map((label, i) => {
//         const state = i < current ? "done" : i === current ? "active" : "upcoming";
//         return (
//           <div key={label} className="flex items-center gap-2 sm:gap-3" role="listitem">
//             <div className="flex flex-col items-center gap-1.5">
//               <motion.div
//                 animate={state === "active" ? { scale: [1, 1.08, 1] } : {}}
//                 transition={{ repeat: state === "active" ? Infinity : 0, duration: 1.8 }}
//                 className={cn(
//                   "w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-display font-semibold text-sm border-2",
//                   state === "done" && "bg-mint-500 border-mint-500 text-white",
//                   state === "active" && "bg-purple-500 border-purple-500 text-white",
//                   state === "upcoming" && "bg-white border-purple-100 text-ink-300"
//                 )}
//               >
//                 {state === "done" ? "✓" : i + 1}
//               </motion.div>
//               <span
//                 className={cn(
//                   "text-[11px] sm:text-xs font-medium hidden sm:block",
//                   state === "upcoming" ? "text-ink-300" : "text-ink-700"
//                 )}
//               >
//                 {label}
//               </span>
//             </div>
//             {i < steps.length - 1 && (
//               <div
//                 className={cn(
//                   "w-6 sm:w-10 h-0.5 rounded-full",
//                   i < current ? "bg-mint-500" : "bg-purple-100"
//                 )}
//               />
//             )}
//           </div>
//         );
//       })}
//     </div>
//   );
// }


interface StepperProps {
  steps: string[];
  current: number;
}

export function Stepper({
  steps,
  current,
}: StepperProps) {
  return (
    <div className="flex items-center gap-2 sm:gap-3">

      {steps.map((step, index) => {

        const completed =
          index < current;

        const active =
          index === current;

        return (
          <div
            key={step}
            className="flex items-center gap-2 sm:gap-3"
          >

            <div className="flex flex-col items-center gap-1">

              <div
                className={`
                  flex
                  items-center
                  justify-center
                  w-8
                  h-8
                  rounded-full
                  text-xs
                  font-bold
                  transition-all

                  ${
                    completed
                      ? "bg-purple-600 text-white"
                      : active
                      ? "bg-purple-500 text-white ring-4 ring-purple-200/40"
                      : "bg-white/20 text-white/70"
                  }
                `}
              >
                {completed
                  ? "✓"
                  : index + 1}
              </div>

              <span
                className={`
                  hidden
                  sm:block
                  text-[10px]
                  font-semibold
                  whitespace-nowrap

                  ${
                    active
                      ? "text-white"
                      : "text-white/60"
                  }
                `}
              >
                {step}
              </span>

            </div>

            {index < steps.length - 1 && (
              <div
                className={`
                  w-4
                  sm:w-8
                  h-px
                  ${
                    completed
                      ? "bg-purple-400"
                      : "bg-white/20"
                  }
                `}
              />
            )}

          </div>
        );
      })}

    </div>
  );
}