// import { useEffect, useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { AnimatePresence, motion } from "framer-motion";
// import {
//   ClipboardCheck,
//   Sparkles,
//   ArrowRight,
//   X,
//   Star,
//   Clock,
//   Brain,
//   Target,
// } from "lucide-react";

// import { Button } from "@/components/ui/Button";

// // =========================================================
// // STORAGE KEY — must match whatever key PreAssessment.tsx writes to
// // =========================================================

// const ASSESSMENT_STORAGE_KEY = "assessmentResult";

// // =========================================================
// // HELPERS
// // =========================================================

// /**
//  * Returns true if the user has completed the pre-assessment.
//  * Reads from localStorage — the same key used by PreAssessment.
//  */
// export function hasCompletedPreAssessment(): boolean {
//   try {
//     const raw = localStorage.getItem(ASSESSMENT_STORAGE_KEY);
//     if (!raw) return false;

//     const parsed = JSON.parse(raw);

//     // Guard: must have a scores object with at least one numeric skill
//     const scores = parsed?.scores;
//     if (!scores || typeof scores !== "object") return false;

//     const skillKeys = [
//       "attention",
//       "memory",
//       "math",
//       "reading",
//       "problemSolving",
//       "communication",
//     ];

//     return skillKeys.some(
//       (key) => typeof scores[key] === "number" && Number.isFinite(scores[key])
//     );
//   } catch {
//     return false;
//   }
// }

// /**
//  * Mark that the user chose to skip — but only for this session.
//  * If they return in a new session, they'll be asked again (gently).
//  */
// const SKIP_KEY = "preAssessmentSkippedAt";

// export function hasSkippedRecently(): boolean {
//   try {
//     const raw = localStorage.getItem(SKIP_KEY);
//     if (!raw) return false;
//     const ts = Number(raw);
//     if (!Number.isFinite(ts)) return false;
//     // Skip is valid for 24 hours
//     return Date.now() - ts < 24 * 60 * 60 * 1000;
//   } catch {
//     return false;
//   }
// }

// export function markSkipped() {
//   try {
//     localStorage.setItem(SKIP_KEY, String(Date.now()));
//   } catch {
//     /* ignore */
//   }
// }

// // =========================================================
// // PROPS
// // =========================================================

// type PreAssessmentGateProps = {
//   children: React.ReactNode;
//   /**
//    * If true, don't render anything when assessment is completed
//    * (default) — otherwise the gate always renders children.
//    */
//   enforce?: boolean;
// };

// // =========================================================
// // COMPONENT
// // =========================================================

// export function PreAssessmentGate({
//   children,
//   enforce = true,
// }: PreAssessmentGateProps) {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [showModal, setShowModal] = useState(false);
//   const [checked, setChecked] = useState(false);

//   // -------------------------------------------------------
//   // Check on mount + whenever the route changes
//   // -------------------------------------------------------

//   useEffect(() => {
//     // Never show the modal ON the assessment page itself
//     if (location.pathname === "/pre-assessment") {
//       setShowModal(false);
//       setChecked(true);
//       return;
//     }

//     const completed = hasCompletedPreAssessment();
//     const skipped = hasSkippedRecently();

//     if (!completed && !skipped) {
//       setShowModal(true);
//     } else {
//       setShowModal(false);
//     }
//     setChecked(true);
//   }, [location.pathname]);

//   // -------------------------------------------------------
//   // Also listen for the assessment being completed in another tab
//   // -------------------------------------------------------

//   useEffect(() => {
//     const handleUpdate = () => {
//       if (hasCompletedPreAssessment()) {
//         setShowModal(false);
//       }
//     };
//     window.addEventListener("assessment-result-updated", handleUpdate);
//     window.addEventListener("storage", handleUpdate);
//     window.addEventListener("focus", handleUpdate);

//     return () => {
//       window.removeEventListener("assessment-result-updated", handleUpdate);
//       window.removeEventListener("storage", handleUpdate);
//       window.removeEventListener("focus", handleUpdate);
//     };
//   }, []);

//   // -------------------------------------------------------
//   // Actions
//   // -------------------------------------------------------

//   const handleStart = () => {
//     setShowModal(false);
//     navigate("/pre-assessment");
//   };

//   const handleSkip = () => {
//     markSkipped();
//     setShowModal(false);
//   };

//   // -------------------------------------------------------
//   // Don't show modal until we've checked
//   // -------------------------------------------------------

//   if (!checked) return <>{children}</>;

//   // -------------------------------------------------------
//   // If not enforcing, just render children
//   // -------------------------------------------------------

//   if (!enforce) return <>{children}</>;

//   // -------------------------------------------------------
//   // Completed → render children normally
//   // -------------------------------------------------------

//   if (hasCompletedPreAssessment()) {
//     return <>{children}</>;
//   }

//   // -------------------------------------------------------
//   // Not completed → render modal overlay
//   // -------------------------------------------------------

//   return (
//     <>
//       {children}

//       <AnimatePresence>
//         {showModal && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 z-[200] flex items-center justify-center px-4 bg-black/70 backdrop-blur-md"
//             role="dialog"
//             aria-modal="true"
//             aria-labelledby="pre-assessment-title"
//           >
//             {/* Decorative stars */}
//             <motion.div
//               className="absolute top-16 left-16 text-4xl"
//               animate={{ y: [0, -15, 0], rotate: [0, 10, 0] }}
//               transition={{ duration: 3, repeat: Infinity }}
//             >
//               ⭐
//             </motion.div>
//             <motion.div
//               className="absolute top-24 right-20 text-3xl"
//               animate={{ y: [0, -20, 0], rotate: [0, -10, 0] }}
//               transition={{ duration: 2.5, repeat: Infinity }}
//             >
//               ✨
//             </motion.div>
//             <motion.div
//               className="absolute bottom-28 left-24 text-3xl"
//               animate={{ y: [0, -18, 0], scale: [1, 1.15, 1] }}
//               transition={{ duration: 2.8, repeat: Infinity }}
//             >
//               🪐
//             </motion.div>
//             <motion.div
//               className="absolute bottom-20 right-24 text-4xl"
//               animate={{ y: [0, -22, 0], rotate: [0, 15, 0] }}
//               transition={{ duration: 3.2, repeat: Infinity }}
//             >
//               🌙
//             </motion.div>

//             {/* Modal card */}
//             <motion.div
//               initial={{ scale: 0.85, opacity: 0, y: 30 }}
//               animate={{ scale: 1, opacity: 1, y: 0 }}
//               exit={{ scale: 0.9, opacity: 0, y: 20 }}
//               transition={{ type: "spring", stiffness: 260, damping: 22 }}
//               className="relative w-full max-w-2xl rounded-[2rem] overflow-hidden
//                          bg-gradient-to-br from-[#1e1b4b] via-[#2e1065] to-[#4c1d95]
//                          border-2 border-purple-400/40
//                          shadow-[0_0_80px_rgba(168,85,247,0.5)]"
//             >
//               {/* Glow blobs */}
//               <div className="absolute -top-32 -right-32 w-72 h-72 rounded-full bg-purple-500/30 blur-3xl" />
//               <div className="absolute -bottom-32 -left-32 w-72 h-72 rounded-full bg-pink-500/25 blur-3xl" />

//               {/* Skip button */}
//               <button
//                 onClick={handleSkip}
//                 aria-label="Skip for now"
//                 className="absolute top-4 right-4 z-20 flex h-10 w-10 items-center justify-center rounded-full
//                            bg-white/10 hover:bg-white/20 border border-white/20 text-white/80
//                            transition"
//               >
//                 <X className="w-5 h-5" />
//               </button>

//               <div className="relative p-7 sm:p-10 text-white">
//                 {/* Icon */}
//                 <motion.div
//                   animate={{ y: [0, -8, 0] }}
//                   transition={{ duration: 2.4, repeat: Infinity }}
//                   className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-3xl
//                              bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-500
//                              shadow-[0_0_40px_rgba(168,85,247,0.6)]"
//                 >
//                   <ClipboardCheck className="w-12 h-12 text-white" />
//                 </motion.div>

//                 {/* Title */}
//                 <h2
//                   id="pre-assessment-title"
//                   className="text-3xl sm:text-4xl font-extrabold text-center leading-tight
//                              bg-gradient-to-r from-cyan-300 via-purple-200 to-pink-300
//                              bg-clip-text text-transparent"
//                 >
//                   Ready for your space mission?
//                 </h2>

//                 {/* Subtitle */}
//                 <p className="mt-3 text-center text-base sm:text-lg text-purple-100/90 max-w-lg mx-auto">
//                   Complete a quick <strong className="text-cyan-300">pre-assessment test</strong>{" "}
//                   so we can personalize your learning journey — just for you! 🚀
//                 </p>

//                 {/* Benefits */}
//                 <div className="mt-7 grid grid-cols-1 sm:grid-cols-3 gap-3">
//                   <div className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/15 p-4 flex flex-col items-center text-center">
//                     <Brain className="w-7 h-7 text-cyan-300 mb-2" />
//                     <p className="text-sm font-semibold text-white">Know your skills</p>
//                     <p className="text-xs text-purple-200/70 mt-1">
//                       6 key learning areas
//                     </p>
//                   </div>
//                   <div className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/15 p-4 flex flex-col items-center text-center">
//                     <Target className="w-7 h-7 text-pink-300 mb-2" />
//                     <p className="text-sm font-semibold text-white">
//                       Personalized plan
//                     </p>
//                     <p className="text-xs text-purple-200/70 mt-1">
//                       Built around your needs
//                     </p>
//                   </div>
//                   <div className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/15 p-4 flex flex-col items-center text-center">
//                     <Clock className="w-7 h-7 text-amber-300 mb-2" />
//                     <p className="text-sm font-semibold text-white">Quick & fun</p>
//                     <p className="text-xs text-purple-200/70 mt-1">
//                       Takes ~5–10 minutes
//                     </p>
//                   </div>
//                 </div>

//                 {/* Reassurance */}
//                 <p className="mt-6 text-center text-sm text-purple-200/80">
//                   <Star className="inline w-4 h-4 text-amber-300 mr-1 -mt-0.5" />
//                   No pressure — there are no wrong answers. Just do your best!
//                 </p>

//                 {/* Actions */}
//                 <div className="mt-8 flex flex-col sm:flex-row gap-3">
//                   <button
//                     onClick={handleStart}
//                     className="flex-1 flex items-center justify-center gap-2.5 rounded-2xl
//                                bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500
//                                px-6 py-4 text-base sm:text-lg font-bold text-white
//                                shadow-[0_0_30px_rgba(59,130,246,0.5)]
//                                hover:from-cyan-300 hover:via-blue-400 hover:to-purple-400
//                                transition"
//                   >
//                     <Sparkles className="w-5 h-5" />
//                     Start Pre-Assessment
//                     <ArrowRight className="w-5 h-5" />
//                   </button>

//                   <button
//                     onClick={handleSkip}
//                     className="rounded-2xl bg-white/10 border border-white/20
//                                px-6 py-4 text-base font-semibold text-purple-100
//                                hover:bg-white/20 transition"
//                   >
//                     Maybe later
//                   </button>
//                 </div>

//                 <p className="mt-5 text-center text-xs text-purple-300/60">
//                   You can always retake the assessment from the Dashboard later.
//                 </p>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </>
//   );
// }



// src/components/PreAssessmentGate.tsx
// src/components/PreAssessmentGate.tsx
// src/components/PreAssessmentGate.tsx

import { useEffect, useState, type ReactNode } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useAuth, useUser } from "@clerk/react";
import {
  ClipboardCheck,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Star,
  Clock,
  Brain,
  Target,
} from "lucide-react";

// =========================================================
// STORAGE KEYS
// =========================================================

const DECISION_KEY = "preAssessmentDecision"; // "yes" | "no"
const SESSION_PREFIX = "preAssessmentSession_"; // + userId

// =========================================================
// HELPERS
// =========================================================

function getDecision(): "yes" | "no" | null {
  try {
    const val = localStorage.getItem(DECISION_KEY);
    if (val === "yes" || val === "no") return val;
    return null;
  } catch {
    return null;
  }
}

function setDecision(val: "yes" | "no") {
  try {
    localStorage.setItem(DECISION_KEY, val);
  } catch {
    /* ignore */
  }
}

function clearDecision() {
  try {
    localStorage.removeItem(DECISION_KEY);
  } catch {
    /* ignore */
  }
}

function getSessionFlag(userId: string): boolean {
  try {
    return sessionStorage.getItem(SESSION_PREFIX + userId) === "seen";
  } catch {
    return false;
  }
}

function setSessionFlag(userId: string) {
  try {
    sessionStorage.setItem(SESSION_PREFIX + userId, "seen");
  } catch {
    /* ignore */
  }
}

// =========================================================
// 🌟 PUBLIC HELPER — call this inside your app's logout
//    handler to force the popup to appear on the next login.
//
//    Usage in Dashboard.tsx:
//
//        import { clearPreAssessmentSessionForLogout }
//          from "@/components/PreAssessmentGate";
//
//        const handleLogout = async () => {
//          clearPreAssessmentSessionForLogout(); // ← ADD THIS
//          await signOut({ redirectUrl: "/login" });
//        };
// =========================================================

export function clearPreAssessmentSessionForLogout() {
  try {
    // Wipe the Yes/No decision
    localStorage.removeItem(DECISION_KEY);

    // Wipe ALL "seen this session" flags so the popup
    // shows again on the very next login
    Object.keys(sessionStorage)
      .filter((k) => k.startsWith(SESSION_PREFIX))
      .forEach((k) => sessionStorage.removeItem(k));
  } catch (err) {
    console.warn(
      "[PreAssessmentGate] Failed to clear session flags:",
      err
    );
  }
}

// =========================================================
// PROPS
// =========================================================

type PreAssessmentGateProps = {
  children: ReactNode;
};

// =========================================================
// GATE
// =========================================================

export function PreAssessmentGate({
  children,
}: PreAssessmentGateProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoaded, isSignedIn, userId } = useAuth();
  const { user } = useUser();

  const [phase, setPhase] = useState<
    "checking" | "needs-decision" | "done"
  >("checking");

  // -------------------------------------------------------
  // Extra safety net: when Clerk reports the user is gone,
  // clear every flag so the NEXT login shows the popup.
  // -------------------------------------------------------

  useEffect(() => {
    if (!isLoaded) return;
    if (!isSignedIn && !user) {
      clearPreAssessmentSessionForLogout();
    }
  }, [isLoaded, isSignedIn, user]);

  // -------------------------------------------------------
  // Decide whether to show the popup
  // -------------------------------------------------------

  useEffect(() => {
    if (!isLoaded) return;

    if (!isSignedIn || !userId) {
      setPhase("done");
      return;
    }

    // Never gate the assessment page itself
    if (location.pathname === "/pre-assessment") {
      setPhase("done");
      return;
    }

    // If this is the first render of the dashboard
    // IN THIS BROWSER TAB after login → show popup
    const seen = getSessionFlag(userId);

    if (!seen) {
      setDecision("no"); // reset any old stored decision placeholder
      clearDecision();
      setSessionFlag(userId);
      setPhase("needs-decision");
      return;
    }

    // Already seen the popup this session
    const decision = getDecision();
    if (decision === "yes" || decision === "no") {
      setPhase("done");
    } else {
      setPhase("needs-decision");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded, isSignedIn, userId, location.pathname]);

  // -------------------------------------------------------
  // Auto-mark "yes" when the assessment completes
  // -------------------------------------------------------

  useEffect(() => {
    const onDone = () => {
      setDecision("yes");
      setPhase("done");
    };
    window.addEventListener(
      "assessment-result-updated",
      onDone
    );
    return () => {
      window.removeEventListener(
        "assessment-result-updated",
        onDone
      );
    };
  }, []);

  // -------------------------------------------------------
  // Actions
  // -------------------------------------------------------

  const handleYes = () => {
    setDecision("yes");
    setPhase("done");
  };

  const handleNo = () => {
    setDecision("no");
    setPhase("done");
    navigate("/pre-assessment");
  };

  // -------------------------------------------------------
  // Render
  // -------------------------------------------------------

  if (!isLoaded || phase === "checking") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0b0720] text-white">
        <div className="text-center">
          <div className="text-4xl mb-4 animate-pulse">
            🚀
          </div>
          <p className="text-sm text-purple-200/70">
            Preparing your learning universe...
          </p>
        </div>
      </div>
    );
  }

  if (phase === "done") {
    return <>{children}</>;
  }

  return (
    <>
      {children}

      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center px-4 bg-black/70 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-labelledby="pre-assessment-title"
        >
          <motion.div
            className="absolute top-16 left-16 text-4xl"
            animate={{ y: [0, -15, 0], rotate: [0, 10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            ⭐
          </motion.div>
          <motion.div
            className="absolute top-24 right-20 text-3xl"
            animate={{ y: [0, -20, 0], rotate: [0, -10, 0] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            ✨
          </motion.div>
          <motion.div
            className="absolute bottom-28 left-24 text-3xl"
            animate={{ y: [0, -18, 0], scale: [1, 1.15, 1] }}
            transition={{ duration: 2.8, repeat: Infinity }}
          >
            🪐
          </motion.div>
          <motion.div
            className="absolute bottom-20 right-24 text-4xl"
            animate={{ y: [0, -22, 0], rotate: [0, 15, 0] }}
            transition={{ duration: 3.2, repeat: Infinity }}
          >
            🌙
          </motion.div>

          <motion.div
            initial={{ scale: 0.85, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 22,
            }}
            className="relative w-full max-w-2xl rounded-[2rem] overflow-hidden
                       bg-gradient-to-br from-[#1e1b4b] via-[#2e1065] to-[#4c1d95]
                       border-2 border-purple-400/40
                       shadow-[0_0_80px_rgba(168,85,247,0.5)]"
          >
            <div className="absolute -top-32 -right-32 w-72 h-72 rounded-full bg-purple-500/30 blur-3xl" />
            <div className="absolute -bottom-32 -left-32 w-72 h-72 rounded-full bg-pink-500/25 blur-3xl" />

            <div className="relative p-7 sm:p-10 text-white">
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 2.4,
                  repeat: Infinity,
                }}
                className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-3xl
                           bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-500
                           shadow-[0_0_40px_rgba(168,85,247,0.6)]"
              >
                <ClipboardCheck className="w-12 h-12 text-white" />
              </motion.div>

              <h2
                id="pre-assessment-title"
                className="text-3xl sm:text-4xl font-extrabold text-center leading-tight
                           bg-gradient-to-r from-cyan-300 via-purple-200 to-pink-300
                           bg-clip-text text-transparent"
              >
                Have you completed the
                <br />
                Pre-Assessment Test?
              </h2>

              <p className="mt-4 text-center text-base sm:text-lg text-purple-100/90 max-w-lg mx-auto">
                Answer honestly so we can give you the best
                personalized learning experience! 🚀
              </p>

              <div className="mt-7 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/15 p-4 flex flex-col items-center text-center">
                  <Brain className="w-7 h-7 text-cyan-300 mb-2" />
                  <p className="text-sm font-semibold text-white">
                    Know your skills
                  </p>
                  <p className="text-xs text-purple-200/70 mt-1">
                    6 key learning areas
                  </p>
                </div>
                <div className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/15 p-4 flex flex-col items-center text-center">
                  <Target className="w-7 h-7 text-pink-300 mb-2" />
                  <p className="text-sm font-semibold text-white">
                    Personalized plan
                  </p>
                  <p className="text-xs text-purple-200/70 mt-1">
                    Just for your child
                  </p>
                </div>
                <div className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/15 p-4 flex flex-col items-center text-center">
                  <Clock className="w-7 h-7 text-amber-300 mb-2" />
                  <p className="text-sm font-semibold text-white">
                    Quick & fun
                  </p>
                  <p className="text-xs text-purple-200/70 mt-1">
                    ~5–10 minutes
                  </p>
                </div>
              </div>

              <p className="mt-6 text-center text-sm text-purple-200/80">
                <Star className="inline w-4 h-4 text-amber-300 mr-1 -mt-0.5" />
                No pressure — there are no wrong answers!
              </p>

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  onClick={handleYes}
                  className="group flex items-center justify-center gap-3 rounded-2xl
                             bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500
                             px-6 py-5 text-base sm:text-lg font-bold text-white
                             shadow-[0_0_30px_rgba(16,185,129,0.5)]
                             hover:from-emerald-400 hover:via-teal-400 hover:to-cyan-400
                             transition-all duration-300
                             border-2 border-emerald-300/40"
                >
                  <CheckCircle2 className="w-7 h-7 group-hover:scale-110 transition-transform" />
                  <div className="text-left">
                    <div className="text-xs font-semibold text-emerald-100/90 uppercase tracking-wide">
                      I already completed it
                    </div>
                    <div className="text-lg font-extrabold">
                      Yes, Continue
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={handleNo}
                  className="group flex items-center justify-center gap-3 rounded-2xl
                             bg-gradient-to-r from-rose-500 via-pink-500 to-fuchsia-500
                             px-6 py-5 text-base sm:text-lg font-bold text-white
                             shadow-[0_0_30px_rgba(244,63,94,0.5)]
                             hover:from-rose-400 hover:via-pink-400 hover:to-fuchsia-400
                             transition-all duration-300
                             border-2 border-rose-300/40"
                >
                  <XCircle className="w-7 h-7 group-hover:scale-110 transition-transform" />
                  <div className="text-left">
                    <div className="text-xs font-semibold text-rose-100/90 uppercase tracking-wide">
                      Take me to the test
                    </div>
                    <div className="text-lg font-extrabold">
                      No, Start Now
                    </div>
                  </div>
                  <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                </button>
              </div>

              <p className="mt-6 text-center text-xs text-purple-300/60">
                This prompt appears on every login.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </>
  );
}

// =========================================================
// HELPER — kept for PostLoginRedirect compatibility
// =========================================================

export function hasCompletedPreAssessment(): boolean {
  try {
    const decision = localStorage.getItem(DECISION_KEY);
    if (decision === "yes") return true;
    if (decision === "no") return false;

    const raw = localStorage.getItem("assessmentResult");
    if (!raw) return false;

    const parsed = JSON.parse(raw);
    const scores = parsed?.scores;
    if (!scores || typeof scores !== "object") return false;

    return [
      "attention",
      "memory",
      "math",
      "reading",
      "problemSolving",
      "communication",
    ].some(
      (k) =>
        typeof scores[k] === "number" &&
        Number.isFinite(scores[k])
    );
  } catch {
    return false;
  }
}