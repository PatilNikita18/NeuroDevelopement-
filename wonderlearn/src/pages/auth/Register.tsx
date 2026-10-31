
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { AnimatePresence, motion } from "framer-motion";
// import { useSignUp, useClerk } from "@clerk/react";
// import { CloudBackground } from "@/components/backgrounds/CloudBackground";
// import { GardenBackground } from "@/components/backgrounds/GardenBackground";
// import { Button } from "@/components/ui/Button";
// import { Stepper } from "@/components/ui/Stepper";
// import { useChildProfileStore } from "@/stores/childProfileStore";
// import type { AgeRange, LearningPreference, SessionLength, SupportCondition } from "@/types";
// import { cn } from "@/lib/cn";

// const STEP_LABELS = ["Child", "Age", "Support", "Preferences", "Ready"];
// const AVATARS = ["😊", "🦊", "🐼", "🐰", "🦁", "🐸", "🐯"];

// const AGE_CARDS: { range: AgeRange; emoji: string; title: string; blurb: string }[] = [
//   { range: "5-8", emoji: "🌱", title: "Early Explorer", blurb: "Let's discover the basics." },
//   { range: "9-12", emoji: "🌿", title: "Growing Explorer", blurb: "Let's build new skills." },
//   { range: "13-18", emoji: "🌳", title: "Young Adventurer", blurb: "Let's explore advanced learning." },
// ];

// const CONDITION_CARDS: { key: SupportCondition; emoji: string; title: string; blurb: string }[] = [
//   {
//     key: "ID",
//     emoji: "🧩",
//     title: "Intellectual Disability (ID)",
//     blurb: "Learning activities can be adapted with clear steps, repetition, visual support and flexible pacing.",
//   },
//   {
//     key: "AUTISM",
//     emoji: "🌟",
//     title: "Autism",
//     blurb: "Learning activities can be adapted with visual learning, structured activities, customizable experiences and consistent routines.",
//   },
//   {
//     key: "ADHD",
//     emoji: "🚀",
//     title: "ADHD",
//     blurb: "Learning activities can be adapted with short activities, interactive challenges, focus support and flexible pacing.",
//   },
// ];

// const PREFERENCES: { key: LearningPreference; emoji: string; label: string }[] = [
//   { key: "pictures", emoji: "🎨", label: "Pictures" },
//   { key: "listening", emoji: "🔊", label: "Listening" },
//   { key: "games", emoji: "🎮", label: "Games" },
//   { key: "reading", emoji: "📖", label: "Reading" },
//   { key: "puzzles", emoji: "🧩", label: "Puzzles" },
//   { key: "animations", emoji: "🎬", label: "Animations" },
// ];

// const SESSION_LENGTHS: { value: SessionLength; emoji: string; label: string }[] = [
//   { value: 5, emoji: "⚡", label: "5 minutes" },
//   { value: 10, emoji: "🌱", label: "10 minutes" },
//   { value: 15, emoji: "🌳", label: "15 minutes" },
// ];

// const ageLabel: Record<AgeRange, string> = {
//   "5-8": "5–8",
//   "9-12": "9–12",
//   "13-18": "13–18",
// };

// const conditionLabel: Record<SupportCondition, string> = {
//   ID: "Intellectual Disability (ID)",
//   DS: "Down Syndrome (DS)",
//   ADHD: "ADHD",
//   AUTISM: "Autism",
// };

// export default function Register() {
//   const [step, setStep] = useState(0);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState("");

//   // --- Email verification state ---
//   const [pendingVerification, setPendingVerification] = useState(false);
//   const [code, setCode] = useState("");

//   const { draft, updateDraft, togglePreference, completeRegistration } = useChildProfileStore();
//   const { signUp } = useSignUp();
//   const { setActive } = useClerk();
//   const navigate = useNavigate();

//   const canNext = [
//     draft.name.trim().length > 0 && email.trim().length > 0 && password.trim().length >= 6,
//     !!draft.ageRange,
//     !!draft.condition,
//     draft.preferences.length > 0,
//     true,
//   ][step];

//   function next() {
//     if (step < STEP_LABELS.length - 1) setStep(step + 1);
//   }
//   function back() {
//     if (step > 0) setStep(step - 1);
//   }

//   // Kicks off the sign-up. If Clerk requires email verification (the default),
//   // this sends the code and flips the UI into "enter code" mode instead of
//   // silently failing to ever create a User.
//   async function finish() {
//     setIsLoading(true);
//     setError("");

//     try {
//       if (!signUp) throw new Error("Sign up is not ready yet.");

//       const signUpAttempt = await signUp.create({
//         emailAddress: email,
//         password: password,
//         firstName: draft.name,
//         // IMPORTANT: use `unsafeMetadata` here, not `publicMetadata` —
//         // Clerk's client SDK is not allowed to write publicMetadata,
//         // only the backend can.
//         unsafeMetadata: {
//           childName: draft.name,
//           childNickname: draft.nickname || "",
//           ageRange: draft.ageRange,
//           condition: draft.condition,
//           preferences: draft.preferences,
//           avatar: draft.avatar || "😊",
//           sessionDuration: draft.sessionDuration || 10,
//         },
//       });

//       if (signUpAttempt.status === "complete") {
//         // Verification not required (or already satisfied) — session is ready immediately.
//         await setActive({ session: signUpAttempt.createdSessionId });
//         completeRegistration();
//         navigate("/dashboard");
//         return;
//       }

//       if (signUpAttempt.status === "missing_requirements") {
//         // This is the normal path when email verification is enabled in Clerk.
//         // Send the code, then show the "enter code" screen.
//         await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
//         setPendingVerification(true);
//       } else {
//         console.log("Sign-up incomplete:", signUpAttempt);
//         setError("Something unexpected happened. Please try again.");
//       }
//     } catch (err: any) {
//       console.error("Registration failed:", err);
//       if (err.errors && err.errors.length > 0) {
//         setError(err.errors[0].message || "Failed to create account. Please try again.");
//       } else {
//         setError("Failed to create account. Please try again.");
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   }

//   // Completes the sign-up once the user types in the emailed code.
//   // This is the step that was missing before — without it, Clerk never
//   // finishes the sign-up, so no User record is ever created and nothing
//   // shows up in the Clerk dashboard.
//   async function verifyCode() {
//     setIsLoading(true);
//     setError("");

//     try {
//       if (!signUp) throw new Error("Sign up is not ready yet.");

//       const attempt = await signUp.attemptEmailAddressVerification({ code });

//       if (attempt.status === "complete") {
//         await setActive({ session: attempt.createdSessionId });
//         completeRegistration();
//         navigate("/dashboard");
//       } else {
//         console.log("Verification incomplete:", attempt);
//         setError("That code didn't work. Please check it and try again.");
//       }
//     } catch (err: any) {
//       console.error("Verification failed:", err);
//       setError(err.errors?.[0]?.message || "Verification failed. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   }

//   async function resendCode() {
//     setError("");
//     try {
//       if (!signUp) return;
//       await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
//     } catch (err: any) {
//       console.error("Resend failed:", err);
//       setError(err.errors?.[0]?.message || "Couldn't resend the code. Please try again.");
//     }
//   }

//   const isReadyStep = step === 4;
//   const Wrapper = isReadyStep ? GardenBackground : CloudBackground;

//   return (
//     <Wrapper>
//       <div className="min-h-screen flex flex-col items-center px-5 py-10">
//         <h1
//           className={cn(
//             "font-display font-semibold text-2xl sm:text-3xl text-center mb-6",
//             isReadyStep ? "text-ink-900" : "text-white"
//           )}
//         >
//           Let's Create Your Learning Adventure <span aria-hidden>✨</span>
//         </h1>

//         <div
//           className={cn(
//             "rounded-full px-4 py-3 mb-8",
//             isReadyStep ? "bg-white/70" : "bg-white/10 backdrop-blur"
//           )}
//         >
//           <Stepper steps={STEP_LABELS} current={step} />
//         </div>

//         <div
//           className={cn(
//             "w-full max-w-2xl rounded-3xl p-6 sm:p-8 shadow-[var(--shadow-soft)]",
//             isReadyStep ? "bg-white" : "bg-white/10 backdrop-blur-xl border border-white/20"
//           )}
//         >
//           <AnimatePresence mode="wait">
//             <motion.div
//               key={pendingVerification ? "verify" : step}
//               initial={{ opacity: 0, x: 24 }}
//               animate={{ opacity: 1, x: 0 }}
//               exit={{ opacity: 0, x: -24 }}
//               transition={{ duration: 0.3 }}
//             >
//               {step === 0 && (
//                 <div className="flex flex-col gap-5">
//                   {error && (
//                     <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-xl text-sm">
//                       {error}
//                     </div>
//                   )}
//                   <label className="block">
//                     <span className={cn("text-sm font-semibold", isReadyStep ? "text-ink-700" : "text-purple-100")}>
//                       Email Address
//                     </span>
//                     <input
//                       type="email"
//                       value={email}
//                       onChange={(e) => setEmail(e.target.value)}
//                       placeholder="you@example.com"
//                       className="mt-1.5 w-full rounded-2xl bg-white/90 px-4 py-3 text-ink-900 placeholder:text-ink-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-300"
//                     />
//                   </label>

//                   <label className="block">
//                     <span className={cn("text-sm font-semibold", isReadyStep ? "text-ink-700" : "text-purple-100")}>
//                       Password (min 6 characters)
//                     </span>
//                     <input
//                       type="password"
//                       value={password}
//                       onChange={(e) => setPassword(e.target.value)}
//                       placeholder="••••••••"
//                       className="mt-1.5 w-full rounded-2xl bg-white/90 px-4 py-3 text-ink-900 placeholder:text-ink-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-300"
//                     />
//                   </label>

//                   <label className="block">
//                     <span className={cn("text-sm font-semibold", isReadyStep ? "text-ink-700" : "text-purple-100")}>
//                       Child's Name
//                     </span>
//                     <input
//                       value={draft.name}
//                       onChange={(e) => updateDraft({ name: e.target.value })}
//                       placeholder="e.g. Aarav"
//                       className="mt-1.5 w-full rounded-2xl bg-white/90 px-4 py-3 text-ink-900 placeholder:text-ink-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-300"
//                     />
//                   </label>
//                   <label className="block">
//                     <span className={cn("text-sm font-semibold", isReadyStep ? "text-ink-700" : "text-purple-100")}>
//                       Nickname (optional)
//                     </span>
//                     <input
//                       value={draft.nickname}
//                       onChange={(e) => updateDraft({ nickname: e.target.value })}
//                       placeholder="e.g. Aar"
//                       className="mt-1.5 w-full rounded-2xl bg-white/90 px-4 py-3 text-ink-900 placeholder:text-ink-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-300"
//                     />
//                   </label>
//                   <div>
//                     <span className={cn("text-sm font-semibold", isReadyStep ? "text-ink-700" : "text-purple-100")}>
//                       Profile Avatar
//                     </span>
//                     <div className="flex flex-wrap gap-3 mt-2">
//                       {AVATARS.map((a) => (
//                         <button
//                           key={a}
//                           type="button"
//                           onClick={() => updateDraft({ avatar: a })}
//                           aria-pressed={draft.avatar === a}
//                           className={cn(
//                             "w-14 h-14 rounded-full text-2xl flex items-center justify-center bg-white/90 border-2 transition-all",
//                             draft.avatar === a
//                               ? "border-purple-500 scale-110 shadow-[var(--shadow-glow-purple)]"
//                               : "border-transparent"
//                           )}
//                         >
//                           {a}
//                         </button>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {step === 1 && (
//                 <div className="grid gap-4">
//                   {AGE_CARDS.map((c) => {
//                     const selected = draft.ageRange === c.range;
//                     return (
//                       <button
//                         key={c.range}
//                         type="button"
//                         onClick={() => updateDraft({ ageRange: c.range })}
//                         className={cn(
//                           "text-left rounded-2xl p-5 flex items-center gap-4 border-2 transition-all bg-white/95",
//                           selected
//                             ? "border-purple-500 shadow-[var(--shadow-glow-purple)] scale-[1.01]"
//                             : "border-transparent"
//                         )}
//                       >
//                         <span className="text-4xl" aria-hidden>{c.emoji}</span>
//                         <div className="flex-1">
//                           <p className="font-display font-semibold text-lg text-ink-900">
//                             {c.title} <span className="text-ink-500 font-normal text-base">· Age {ageLabel[c.range]}</span>
//                           </p>
//                           <p className="text-ink-500 text-sm">{c.blurb}</p>
//                         </div>
//                         {selected && <span className="text-purple-500 text-2xl">✓</span>}
//                       </button>
//                     );
//                   })}
//                 </div>
//               )}

//               {step === 2 && (
//                 <div>
//                   <h2 className={cn("font-display font-semibold text-xl mb-4", isReadyStep ? "text-ink-900" : "text-white")}>
//                     How can we personalize the adventure?
//                   </h2>
//                   <div className="grid gap-4">
//                     {CONDITION_CARDS.map((c) => {
//                       const selected = draft.condition === c.key;
//                       return (
//                         <button
//                           key={c.key}
//                           type="button"
//                           onClick={() => updateDraft({ condition: c.key })}
//                           className={cn(
//                             "text-left rounded-2xl p-5 flex items-start gap-4 border-2 transition-all bg-white/95",
//                             selected
//                               ? "border-purple-500 shadow-[var(--shadow-glow-purple)]"
//                               : "border-transparent"
//                           )}
//                         >
//                           <span className="text-3xl" aria-hidden>{c.emoji}</span>
//                           <div className="flex-1">
//                             <p className="font-display font-semibold text-ink-900">{c.title}</p>
//                             <p className="text-ink-500 text-sm mt-1">{c.blurb}</p>
//                           </div>
//                           {selected && <span className="text-purple-500 text-2xl">✓</span>}
//                         </button>
//                       );
//                     })}
//                   </div>
//                   <p className="text-xs mt-4 text-center italic px-4 text-ink-500 sm:text-purple-100">
//                     This information helps personalize educational support. InspireNest does
//                     not diagnose or treat medical conditions.
//                   </p>
//                 </div>
//               )}

//               {step === 3 && (
//                 <div className="flex flex-col gap-6">
//                   <div>
//                     <h2 className={cn("font-display font-semibold text-xl mb-3", isReadyStep ? "text-ink-900" : "text-white")}>
//                       What makes learning fun for you?
//                     </h2>
//                     <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
//                       {PREFERENCES.map((p) => {
//                         const selected = draft.preferences.includes(p.key);
//                         return (
//                           <button
//                             key={p.key}
//                             type="button"
//                             onClick={() => togglePreference(p.key)}
//                             aria-pressed={selected}
//                             className={cn(
//                               "rounded-2xl p-4 flex flex-col items-center gap-1.5 border-2 bg-white/95 transition-all",
//                               selected ? "border-purple-500 scale-105 shadow-[var(--shadow-glow-purple)]" : "border-transparent"
//                             )}
//                           >
//                             <span className="text-2xl">{p.emoji}</span>
//                             <span className="text-sm font-semibold text-ink-900">{p.label}</span>
//                           </button>
//                         );
//                       })}
//                     </div>
//                   </div>
//                   <div>
//                     <h3 className={cn("font-semibold mb-2", isReadyStep ? "text-ink-700" : "text-purple-100")}>
//                       Preferred Session Length
//                     </h3>
//                     <div className="grid grid-cols-3 gap-3">
//                       {SESSION_LENGTHS.map((s) => {
//                         const selected = draft.sessionDuration === s.value;
//                         return (
//                           <button
//                             key={s.value}
//                             type="button"
//                             onClick={() => updateDraft({ sessionDuration: s.value })}
//                             className={cn(
//                               "rounded-2xl p-3 flex flex-col items-center gap-1 border-2 bg-white/95 transition-all",
//                               selected ? "border-purple-500 shadow-[var(--shadow-glow-purple)]" : "border-transparent"
//                             )}
//                           >
//                             <span className="text-xl">{s.emoji}</span>
//                             <span className="text-xs font-semibold text-ink-900">{s.label}</span>
//                           </button>
//                         );
//                       })}
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {step === 4 && !pendingVerification && (
//                 <div className="text-center flex flex-col items-center gap-4">
//                   <motion.div
//                     animate={{ scale: [1, 1.1, 1] }}
//                     transition={{ duration: 2, repeat: Infinity }}
//                     className="text-6xl"
//                     aria-hidden
//                   >
//                     ✨
//                   </motion.div>
//                   <h2 className="font-display font-semibold text-2xl text-ink-900">
//                     Your Learning Universe is Ready! ✨
//                   </h2>
//                   <div className="w-full max-w-sm bg-purple-50 rounded-2xl p-5 text-left flex flex-col gap-2">
//                     <p className="text-ink-700">
//                       <span className="font-semibold">Email:</span> {email || "—"}
//                     </p>
//                     <p className="text-ink-700">
//                       <span className="font-semibold">Name:</span> {draft.name || "Explorer"}
//                     </p>
//                     <p className="text-ink-700">
//                       <span className="font-semibold">Age Group:</span>{" "}
//                       {draft.ageRange ? ageLabel[draft.ageRange] : "—"}
//                     </p>
//                     <p className="text-ink-700">
//                       <span className="font-semibold">Learning Support:</span>{" "}
//                       {draft.condition ? conditionLabel[draft.condition] : "—"}
//                     </p>
//                   </div>
//                   <p className="text-ink-500">Your adventure is about to begin.</p>
//                   <Button size="xl" onClick={finish} disabled={isLoading}>
//                     {isLoading ? "Creating Account..." : "Enter Wonder Garden 🌈"}
//                   </Button>
//                   {error && (
//                     <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-xl text-sm max-w-sm">
//                       {error}
//                     </div>
//                   )}
//                 </div>
//               )}

//               {step === 4 && pendingVerification && (
//                 <div className="text-center flex flex-col items-center gap-4">
//                   <div className="text-6xl" aria-hidden>
//                     ✉️
//                   </div>
//                   <h2 className="font-display font-semibold text-2xl text-ink-900">
//                     Check your email
//                   </h2>
//                   <p className="text-ink-500 max-w-sm">
//                     We sent a 6-digit code to <span className="font-semibold">{email}</span>. Enter it
//                     below to finish creating the account.
//                   </p>
//                   <input
//                     value={code}
//                     onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
//                     placeholder="123456"
//                     inputMode="numeric"
//                     maxLength={6}
//                     className="w-full max-w-xs text-center text-lg tracking-[0.4em] rounded-2xl bg-white/90 px-4 py-3 text-ink-900 placeholder:text-ink-300 placeholder:tracking-normal focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-300"
//                   />
//                   <Button size="xl" onClick={verifyCode} disabled={isLoading || code.length < 6}>
//                     {isLoading ? "Verifying..." : "Verify & Enter 🌈"}
//                   </Button>
//                   <button
//                     type="button"
//                     onClick={resendCode}
//                     className="text-sm font-semibold text-purple-600 hover:underline"
//                   >
//                     Resend code
//                   </button>
//                   {error && (
//                     <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-xl text-sm max-w-sm">
//                       {error}
//                     </div>
//                   )}
//                 </div>
//               )}
//             </motion.div>
//           </AnimatePresence>
//         </div>

//         {!isReadyStep && (
//           <div className="flex items-center gap-3 mt-6">
//             {step > 0 && (
//               <Button variant="secondary" size="md" onClick={back}>
//                 Back
//               </Button>
//             )}
//             <Button size="md" onClick={next} disabled={!canNext}>
//               Continue
//             </Button>
//           </div>
//         )}
//       </div>
//     </Wrapper>
//   );
// }



// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { AnimatePresence, motion } from "framer-motion";
// import { useSignUp, useClerk, useAuth } from "@clerk/react";
// import { CloudBackground } from "@/components/backgrounds/CloudBackground";
// import { GardenBackground } from "@/components/backgrounds/GardenBackground";
// import { Button } from "@/components/ui/Button";
// import { Stepper } from "@/components/ui/Stepper";
// import { useChildProfileStore } from "@/stores/childProfileStore";
// import { cn } from "@/lib/cn";
// import { saveUserProfile } from "@/lib/api";
// import {
//   AVATARS,
//   AGE_CARDS,
//   CONDITION_CARDS,
//   PREFERENCES,
//   SESSION_LENGTHS,
//   ageLabel,
//   conditionLabel,
// } from "@/lib/Registrationoptions";

// const STEP_LABELS = ["Child", "Age", "Support", "Preferences", "Ready"];

// export default function Register() {
//   const [step, setStep] = useState(0);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState("");

//   // --- Email verification state ---
//   const [pendingVerification, setPendingVerification] = useState(false);
//   const [code, setCode] = useState("");

//   const { draft, updateDraft, togglePreference, completeRegistration } = useChildProfileStore();
//   const { signUp } = useSignUp();
//   const { setActive } = useClerk();
//   const { getToken } = useAuth();
//   const navigate = useNavigate();

//   const canNext = [
//     draft.name.trim().length > 0 && email.trim().length > 0 && password.trim().length >= 6,
//     !!draft.ageRange,
//     !!draft.condition,
//     draft.preferences.length > 0,
//     true,
//   ][step];

//   function next() {
//     if (step < STEP_LABELS.length - 1) setStep(step + 1);
//   }
//   function back() {
//     if (step > 0) setStep(step - 1);
//   }

//   // Sends what the stepper collected to the Express backend, which upserts
//   // the MongoDB User document. Never blocks navigation on failure — if this
//   // fails, ProfileGate will catch the missing profile on /dashboard and
//   // send the user to /onboarding to try again instead of stranding them.
//   async function persistProfile() {
//     try {
//       await saveUserProfile(getToken, {
//         child: {
//           name: draft.name,
//           nickname: draft.nickname,
//           avatar: draft.avatar || "😊",
//           ageRange: draft.ageRange,
//           condition: draft.condition,
//         },
//         preferences: draft.preferences,
//         sessionDuration: draft.sessionDuration || 10,
//       });
//     } catch (err) {
//       console.error("Saving profile to MongoDB failed:", err);
//     }
//   }

//   // Starts Google sign-up. Clerk handles the OAuth redirect; we land back
//   // on /sso-callback, then /dashboard, where ProfileGate sends brand-new
//   // users to /onboarding to finish the child-profile steps that Google
//   // obviously can't provide.
//   async function continueWithGoogle() {
//     setError("");
//     try {
//       if (!signUp) throw new Error("Sign up is not ready yet.");
//       await signUp.authenticateWithRedirect({
//         strategy: "oauth_google",
//         redirectUrl: "/sso-callback",
//         redirectUrlComplete: "/dashboard",
//       });
//     } catch (err: any) {
//       console.error("Google sign-up failed:", err);
//       setError(err.errors?.[0]?.message || "Couldn't start Google sign-up. Please try again.");
//     }
//   }

//   // Kicks off the sign-up. If Clerk requires email verification (the
//   // default), this sends the code and flips the UI into "enter code" mode
//   // instead of silently failing to ever create a User.
//   async function finish() {
//     setIsLoading(true);
//     setError("");

//     try {
//       if (!signUp) throw new Error("Sign up is not ready yet.");

//       const signUpAttempt = await signUp.create({
//         emailAddress: email,
//         password: password,
//         firstName: draft.name,
//         unsafeMetadata: {
//           childName: draft.name,
//           childNickname: draft.nickname || "",
//           ageRange: draft.ageRange,
//           condition: draft.condition,
//           preferences: draft.preferences,
//           avatar: draft.avatar || "😊",
//           sessionDuration: draft.sessionDuration || 10,
//         },
//       });

//       if (signUpAttempt.status === "complete") {
//         // Verification not required (or already satisfied) — session is ready immediately.
//         await setActive({ session: signUpAttempt.createdSessionId });
//         await persistProfile();
//         completeRegistration();
//         navigate("/dashboard");
//         return;
//       }

//       if (signUpAttempt.status === "missing_requirements") {
//         // Normal path when email verification is enabled in Clerk.
//         await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
//         setPendingVerification(true);
//       } else {
//         console.log("Sign-up incomplete:", signUpAttempt);
//         setError("Something unexpected happened. Please try again.");
//       }
//     } catch (err: any) {
//       console.error("Registration failed:", err);
//       if (err.errors && err.errors.length > 0) {
//         setError(err.errors[0].message || "Failed to create account. Please try again.");
//       } else {
//         setError("Failed to create account. Please try again.");
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   }

//   // Completes the sign-up once the user types in the emailed code, then
//   // saves the profile. This is the step that was missing before — without
//   // it, Clerk never finishes the sign-up, so no User is ever created.
//   async function verifyCode() {
//     setIsLoading(true);
//     setError("");

//     try {
//       if (!signUp) throw new Error("Sign up is not ready yet.");

//       const attempt = await signUp.attemptEmailAddressVerification({ code });

//       if (attempt.status === "complete") {
//         await setActive({ session: attempt.createdSessionId });
//         await persistProfile();
//         completeRegistration();
//         navigate("/dashboard");
//       } else {
//         console.log("Verification incomplete:", attempt);
//         setError("That code didn't work. Please check it and try again.");
//       }
//     } catch (err: any) {
//       console.error("Verification failed:", err);
//       setError(err.errors?.[0]?.message || "Verification failed. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   }

//   async function resendCode() {
//     setError("");
//     try {
//       if (!signUp) return;
//       await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
//     } catch (err: any) {
//       console.error("Resend failed:", err);
//       setError(err.errors?.[0]?.message || "Couldn't resend the code. Please try again.");
//     }
//   }

//   const isReadyStep = step === 4;
//   const Wrapper = isReadyStep ? GardenBackground : CloudBackground;

//   return (
//     <Wrapper>
//       <div className="min-h-screen flex flex-col items-center px-5 py-10">
//         <h1
//           className={cn(
//             "font-display font-semibold text-2xl sm:text-3xl text-center mb-6",
//             isReadyStep ? "text-ink-900" : "text-white"
//           )}
//         >
//           Let's Create Your Learning Adventure <span aria-hidden>✨</span>
//         </h1>

//         <div
//           className={cn(
//             "rounded-full px-4 py-3 mb-8",
//             isReadyStep ? "bg-white/70" : "bg-white/10 backdrop-blur"
//           )}
//         >
//           <Stepper steps={STEP_LABELS} current={step} />
//         </div>

//         <div
//           className={cn(
//             "w-full max-w-2xl rounded-3xl p-6 sm:p-8 shadow-[var(--shadow-soft)]",
//             isReadyStep ? "bg-white" : "bg-white/10 backdrop-blur-xl border border-white/20"
//           )}
//         >
//           <AnimatePresence mode="wait">
//             <motion.div
//               key={pendingVerification ? "verify" : step}
//               initial={{ opacity: 0, x: 24 }}
//               animate={{ opacity: 1, x: 0 }}
//               exit={{ opacity: 0, x: -24 }}
//               transition={{ duration: 0.3 }}
//             >
//               {step === 0 && (
//                 <div className="flex flex-col gap-5">
//                   {error && (
//                     <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-xl text-sm">
//                       {error}
//                     </div>
//                   )}

//                   <button
//                     type="button"
//                     onClick={continueWithGoogle}
//                     className="flex items-center justify-center gap-2 w-full rounded-2xl bg-white px-4 py-3 font-semibold text-ink-900 shadow-md hover:opacity-90 transition"
//                   >
//                     <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden>
//                       <path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.9c1.7-1.57 2.7-3.88 2.7-6.62z" />
//                       <path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.9-2.26c-.8.54-1.84.86-3.06.86-2.35 0-4.34-1.59-5.05-3.72H.98v2.33A9 9 0 0 0 9 18z" />
//                       <path fill="#FBBC05" d="M3.95 10.7A5.4 5.4 0 0 1 3.67 9c0-.59.1-1.17.28-1.7V4.97H.98A9 9 0 0 0 0 9c0 1.45.35 2.83.98 4.03l2.97-2.33z" />
//                       <path fill="#EA4335" d="M9 3.58c1.32 0 2.51.46 3.44 1.35l2.58-2.58C13.46.89 11.43 0 9 0A9 9 0 0 0 .98 4.97l2.97 2.33C4.66 5.17 6.65 3.58 9 3.58z" />
//                     </svg>
//                     Continue with Google
//                   </button>

//                   <div className="flex items-center gap-3">
//                     <div className={cn("h-px flex-1", isReadyStep ? "bg-ink-200" : "bg-white/20")} />
//                     <span className={cn("text-xs font-semibold", isReadyStep ? "text-ink-400" : "text-purple-100")}>
//                       OR
//                     </span>
//                     <div className={cn("h-px flex-1", isReadyStep ? "bg-ink-200" : "bg-white/20")} />
//                   </div>

//                   <label className="block">
//                     <span className={cn("text-sm font-semibold", isReadyStep ? "text-ink-700" : "text-purple-100")}>
//                       Email Address
//                     </span>
//                     <input
//                       type="email"
//                       value={email}
//                       onChange={(e) => setEmail(e.target.value)}
//                       placeholder="you@example.com"
//                       className="mt-1.5 w-full rounded-2xl bg-white/90 px-4 py-3 text-ink-900 placeholder:text-ink-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-300"
//                     />
//                   </label>

//                   <label className="block">
//                     <span className={cn("text-sm font-semibold", isReadyStep ? "text-ink-700" : "text-purple-100")}>
//                       Password (min 6 characters)
//                     </span>
//                     <input
//                       type="password"
//                       value={password}
//                       onChange={(e) => setPassword(e.target.value)}
//                       placeholder="••••••••"
//                       className="mt-1.5 w-full rounded-2xl bg-white/90 px-4 py-3 text-ink-900 placeholder:text-ink-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-300"
//                     />
//                   </label>

//                   <label className="block">
//                     <span className={cn("text-sm font-semibold", isReadyStep ? "text-ink-700" : "text-purple-100")}>
//                       Child's Name
//                     </span>
//                     <input
//                       value={draft.name}
//                       onChange={(e) => updateDraft({ name: e.target.value })}
//                       placeholder="e.g. Aarav"
//                       className="mt-1.5 w-full rounded-2xl bg-white/90 px-4 py-3 text-ink-900 placeholder:text-ink-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-300"
//                     />
//                   </label>
//                   <label className="block">
//                     <span className={cn("text-sm font-semibold", isReadyStep ? "text-ink-700" : "text-purple-100")}>
//                       Nickname (optional)
//                     </span>
//                     <input
//                       value={draft.nickname}
//                       onChange={(e) => updateDraft({ nickname: e.target.value })}
//                       placeholder="e.g. Aar"
//                       className="mt-1.5 w-full rounded-2xl bg-white/90 px-4 py-3 text-ink-900 placeholder:text-ink-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-300"
//                     />
//                   </label>
//                   <div>
//                     <span className={cn("text-sm font-semibold", isReadyStep ? "text-ink-700" : "text-purple-100")}>
//                       Profile Avatar
//                     </span>
//                     <div className="flex flex-wrap gap-3 mt-2">
//                       {AVATARS.map((a) => (
//                         <button
//                           key={a}
//                           type="button"
//                           onClick={() => updateDraft({ avatar: a })}
//                           aria-pressed={draft.avatar === a}
//                           className={cn(
//                             "w-14 h-14 rounded-full text-2xl flex items-center justify-center bg-white/90 border-2 transition-all",
//                             draft.avatar === a
//                               ? "border-purple-500 scale-110 shadow-[var(--shadow-glow-purple)]"
//                               : "border-transparent"
//                           )}
//                         >
//                           {a}
//                         </button>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {step === 1 && (
//                 <div className="grid gap-4">
//                   {AGE_CARDS.map((c) => {
//                     const selected = draft.ageRange === c.range;
//                     return (
//                       <button
//                         key={c.range}
//                         type="button"
//                         onClick={() => updateDraft({ ageRange: c.range })}
//                         className={cn(
//                           "text-left rounded-2xl p-5 flex items-center gap-4 border-2 transition-all bg-white/95",
//                           selected
//                             ? "border-purple-500 shadow-[var(--shadow-glow-purple)] scale-[1.01]"
//                             : "border-transparent"
//                         )}
//                       >
//                         <span className="text-4xl" aria-hidden>{c.emoji}</span>
//                         <div className="flex-1">
//                           <p className="font-display font-semibold text-lg text-ink-900">
//                             {c.title} <span className="text-ink-500 font-normal text-base">· Age {ageLabel[c.range]}</span>
//                           </p>
//                           <p className="text-ink-500 text-sm">{c.blurb}</p>
//                         </div>
//                         {selected && <span className="text-purple-500 text-2xl">✓</span>}
//                       </button>
//                     );
//                   })}
//                 </div>
//               )}

//               {step === 2 && (
//                 <div>
//                   <h2 className={cn("font-display font-semibold text-xl mb-4", isReadyStep ? "text-ink-900" : "text-white")}>
//                     How can we personalize the adventure?
//                   </h2>
//                   <div className="grid gap-4">
//                     {CONDITION_CARDS.map((c) => {
//                       const selected = draft.condition === c.key;
//                       return (
//                         <button
//                           key={c.key}
//                           type="button"
//                           onClick={() => updateDraft({ condition: c.key })}
//                           className={cn(
//                             "text-left rounded-2xl p-5 flex items-start gap-4 border-2 transition-all bg-white/95",
//                             selected
//                               ? "border-purple-500 shadow-[var(--shadow-glow-purple)]"
//                               : "border-transparent"
//                           )}
//                         >
//                           <span className="text-3xl" aria-hidden>{c.emoji}</span>
//                           <div className="flex-1">
//                             <p className="font-display font-semibold text-ink-900">{c.title}</p>
//                             <p className="text-ink-500 text-sm mt-1">{c.blurb}</p>
//                           </div>
//                           {selected && <span className="text-purple-500 text-2xl">✓</span>}
//                         </button>
//                       );
//                     })}
//                   </div>
//                   <p className="text-xs mt-4 text-center italic px-4 text-ink-500 sm:text-purple-100">
//                     This information helps personalize educational support. InspireNest does
//                     not diagnose or treat medical conditions.
//                   </p>
//                 </div>
//               )}

//               {step === 3 && (
//                 <div className="flex flex-col gap-6">
//                   <div>
//                     <h2 className={cn("font-display font-semibold text-xl mb-3", isReadyStep ? "text-ink-900" : "text-white")}>
//                       What makes learning fun for you?
//                     </h2>
//                     <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
//                       {PREFERENCES.map((p) => {
//                         const selected = draft.preferences.includes(p.key);
//                         return (
//                           <button
//                             key={p.key}
//                             type="button"
//                             onClick={() => togglePreference(p.key)}
//                             aria-pressed={selected}
//                             className={cn(
//                               "rounded-2xl p-4 flex flex-col items-center gap-1.5 border-2 bg-white/95 transition-all",
//                               selected ? "border-purple-500 scale-105 shadow-[var(--shadow-glow-purple)]" : "border-transparent"
//                             )}
//                           >
//                             <span className="text-2xl">{p.emoji}</span>
//                             <span className="text-sm font-semibold text-ink-900">{p.label}</span>
//                           </button>
//                         );
//                       })}
//                     </div>
//                   </div>
//                   <div>
//                     <h3 className={cn("font-semibold mb-2", isReadyStep ? "text-ink-700" : "text-purple-100")}>
//                       Preferred Session Length
//                     </h3>
//                     <div className="grid grid-cols-3 gap-3">
//                       {SESSION_LENGTHS.map((s) => {
//                         const selected = draft.sessionDuration === s.value;
//                         return (
//                           <button
//                             key={s.value}
//                             type="button"
//                             onClick={() => updateDraft({ sessionDuration: s.value })}
//                             className={cn(
//                               "rounded-2xl p-3 flex flex-col items-center gap-1 border-2 bg-white/95 transition-all",
//                               selected ? "border-purple-500 shadow-[var(--shadow-glow-purple)]" : "border-transparent"
//                             )}
//                           >
//                             <span className="text-xl">{s.emoji}</span>
//                             <span className="text-xs font-semibold text-ink-900">{s.label}</span>
//                           </button>
//                         );
//                       })}
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {step === 4 && !pendingVerification && (
//                 <div className="text-center flex flex-col items-center gap-4">
//                   <motion.div
//                     animate={{ scale: [1, 1.1, 1] }}
//                     transition={{ duration: 2, repeat: Infinity }}
//                     className="text-6xl"
//                     aria-hidden
//                   >
//                     ✨
//                   </motion.div>
//                   <h2 className="font-display font-semibold text-2xl text-ink-900">
//                     Your Learning Universe is Ready! ✨
//                   </h2>
//                   <div className="w-full max-w-sm bg-purple-50 rounded-2xl p-5 text-left flex flex-col gap-2">
//                     <p className="text-ink-700">
//                       <span className="font-semibold">Email:</span> {email || "—"}
//                     </p>
//                     <p className="text-ink-700">
//                       <span className="font-semibold">Name:</span> {draft.name || "Explorer"}
//                     </p>
//                     <p className="text-ink-700">
//                       <span className="font-semibold">Age Group:</span>{" "}
//                       {draft.ageRange ? ageLabel[draft.ageRange] : "—"}
//                     </p>
//                     <p className="text-ink-700">
//                       <span className="font-semibold">Learning Support:</span>{" "}
//                       {draft.condition ? conditionLabel[draft.condition] : "—"}
//                     </p>
//                   </div>
//                   <p className="text-ink-500">Your adventure is about to begin.</p>
//                   <Button size="xl" onClick={finish} disabled={isLoading}>
//                     {isLoading ? "Creating Account..." : "Enter Wonder Garden 🌈"}
//                   </Button>
//                   {error && (
//                     <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-xl text-sm max-w-sm">
//                       {error}
//                     </div>
//                   )}
//                 </div>
//               )}

//               {step === 4 && pendingVerification && (
//                 <div className="text-center flex flex-col items-center gap-4">
//                   <div className="text-6xl" aria-hidden>
//                     ✉️
//                   </div>
//                   <h2 className="font-display font-semibold text-2xl text-ink-900">
//                     Check your email
//                   </h2>
//                   <p className="text-ink-500 max-w-sm">
//                     We sent a 6-digit code to <span className="font-semibold">{email}</span>. Enter it
//                     below to finish creating the account.
//                   </p>
//                   <input
//                     value={code}
//                     onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
//                     placeholder="123456"
//                     inputMode="numeric"
//                     maxLength={6}
//                     className="w-full max-w-xs text-center text-lg tracking-[0.4em] rounded-2xl bg-white/90 px-4 py-3 text-ink-900 placeholder:text-ink-300 placeholder:tracking-normal focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-300"
//                   />
//                   <Button size="xl" onClick={verifyCode} disabled={isLoading || code.length < 6}>
//                     {isLoading ? "Verifying..." : "Verify & Enter 🌈"}
//                   </Button>
//                   <button
//                     type="button"
//                     onClick={resendCode}
//                     className="text-sm font-semibold text-purple-600 hover:underline"
//                   >
//                     Resend code
//                   </button>
//                   {error && (
//                     <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-xl text-sm max-w-sm">
//                       {error}
//                     </div>
//                   )}
//                 </div>
//               )}
//             </motion.div>
//           </AnimatePresence>
//         </div>

//         {!isReadyStep && (
//           <div className="flex items-center gap-3 mt-6">
//             {step > 0 && (
//               <Button variant="secondary" size="md" onClick={back}>
//                 Back
//               </Button>
//             )}
//             <Button size="md" onClick={next} disabled={!canNext}>
//               Continue
//             </Button>
//           </div>
//         )}
//       </div>
//     </Wrapper>
//   );
// }


// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { AnimatePresence, motion } from "framer-motion";
// import { useSignUp, useClerk, useAuth } from "@clerk/react";

// import { CloudBackground } from "@/components/backgrounds/CloudBackground";
// import { GardenBackground } from "@/components/backgrounds/GardenBackground";
// import { Button } from "@/components/ui/Button";
// import { Stepper } from "@/components/ui/Stepper";

// import { useChildProfileStore } from "@/stores/childProfileStore";
// import { cn } from "@/lib/cn";
// import { saveUserProfile } from "@/lib/api";

// import {
//   AVATARS,
//   AGE_CARDS,
//   CONDITION_CARDS,
//   PREFERENCES,
//   SESSION_LENGTHS,
//   ageLabel,
//   conditionLabel,
// } from "@/lib/Registrationoptions";

// const STEP_LABELS = [
//   "Child",
//   "Age",
//   "Support",
//   "Preferences",
//   "Ready",
// ];

// export default function Register() {
//   const [step, setStep] = useState(0);

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState("");

//   const [pendingVerification, setPendingVerification] = useState(false);
//   const [code, setCode] = useState("");

//   const {
//     draft,
//     updateDraft,
//     togglePreference,
//     completeRegistration,
//   } = useChildProfileStore();

//   const { signUp } = useSignUp();
//   const { setActive } = useClerk();
//   const { getToken } = useAuth();

//   const navigate = useNavigate();

//   const canNext = [
//     draft.name.trim().length > 0 &&
//       email.trim().length > 0 &&
//       password.length >= 6,

//     !!draft.ageRange,

//     !!draft.condition,

//     draft.preferences.length > 0,

//     true,
//   ][step];

//   function next() {
//     setError("");

//     if (step < STEP_LABELS.length - 1) {
//       setStep((current) => current + 1);
//     }
//   }

//   function back() {
//     setError("");

//     if (step > 0) {
//       setStep((current) => current - 1);
//     }
//   }

//   async function persistProfile() {
//     try {
//       await saveUserProfile(getToken, {
//         child: {
//           name: draft.name,
//           nickname: draft.nickname,
//           avatar: draft.avatar || "😊",
//           ageRange: draft.ageRange,
//           condition: draft.condition,
//         },

//         preferences: draft.preferences,

//         sessionDuration:
//           draft.sessionDuration || 10,
//       });
//     } catch (err) {
//       console.error(
//         "Saving profile to MongoDB failed:",
//         err
//       );

//       // Registration should not be blocked if
//       // MongoDB profile saving fails.
//     }
//   }

//   async function continueWithGoogle() {
//     setError("");

//     try {
//       if (!signUp) {
//         throw new Error(
//           "Sign up is not ready yet."
//         );
//       }

//       await signUp.authenticateWithRedirect({
//         strategy: "oauth_google",
//         redirectUrl: "/sso-callback",
//         redirectUrlComplete: "/dashboard",
//       });
//     } catch (err: any) {
//       console.error(
//         "Google sign-up failed:",
//         err
//       );

//       setError(
//         err?.errors?.[0]?.message ||
//           "Couldn't start Google sign-up. Please try again."
//       );
//     }
//   }

//   async function finish() {
//     if (isLoading) return;

//     setIsLoading(true);
//     setError("");

//     try {
//       if (!signUp) {
//         throw new Error(
//           "Sign up is not ready yet."
//         );
//       }

//       if (!email.trim()) {
//         setError("Please enter your email address.");
//         return;
//       }

//       if (password.length < 6) {
//         setError(
//           "Password must contain at least 6 characters."
//         );
//         return;
//       }

//       const signUpAttempt = await signUp.create({
//         emailAddress: email.trim(),
//         password,

//         firstName: draft.name.trim(),

//         unsafeMetadata: {
//           childName: draft.name.trim(),

//           childNickname:
//             draft.nickname?.trim() || "",

//           ageRange: draft.ageRange,

//           condition: draft.condition,

//           preferences: draft.preferences,

//           avatar: draft.avatar || "😊",

//           sessionDuration:
//             draft.sessionDuration || 10,
//         },
//       });

//       if (signUpAttempt.status === "complete") {
//         if (signUpAttempt.createdSessionId) {
//           await setActive({
//             session:
//               signUpAttempt.createdSessionId,
//           });
//         }

//         await persistProfile();

//         completeRegistration();

//         navigate("/dashboard");

//         return;
//       }

//       if (
//         signUpAttempt.status ===
//         "missing_requirements"
//       ) {
//         await signUp.prepareEmailAddressVerification(
//           {
//             strategy: "email_code",
//           }
//         );

//         setPendingVerification(true);

//         return;
//       }

//       console.log(
//         "Incomplete signup:",
//         signUpAttempt
//       );

//       setError(
//         "Your account could not be completed. Please try again."
//       );
//     } catch (err: any) {
//       console.error(
//         "Registration failed:",
//         err
//       );

//       const message =
//         err?.errors?.[0]?.message;

//       setError(
//         message ||
//           "Failed to create account. Please try again."
//       );
//     } finally {
//       setIsLoading(false);
//     }
//   }

//   async function verifyCode() {
//     if (isLoading) return;

//     setIsLoading(true);
//     setError("");

//     try {
//       if (!signUp) {
//         throw new Error(
//           "Sign up is not ready yet."
//         );
//       }

//       if (code.length !== 6) {
//         setError(
//           "Please enter the 6-digit verification code."
//         );

//         return;
//       }

//       const attempt =
//         await signUp.attemptEmailAddressVerification(
//           {
//             code,
//           }
//         );

//       if (attempt.status === "complete") {
//         if (attempt.createdSessionId) {
//           await setActive({
//             session:
//               attempt.createdSessionId,
//           });
//         }

//         await persistProfile();

//         completeRegistration();

//         navigate("/dashboard");

//         return;
//       }

//       setError(
//         "That code didn't work. Please check your email and try again."
//       );
//     } catch (err: any) {
//       console.error(
//         "Verification failed:",
//         err
//       );

//       setError(
//         err?.errors?.[0]?.message ||
//           "Verification failed. Please try again."
//       );
//     } finally {
//       setIsLoading(false);
//     }
//   }

//   async function resendCode() {
//     if (isLoading) return;

//     setError("");

//     try {
//       if (!signUp) return;

//       await signUp.prepareEmailAddressVerification(
//         {
//           strategy: "email_code",
//         }
//       );
//     } catch (err: any) {
//       console.error(
//         "Resend failed:",
//         err
//       );

//       setError(
//         err?.errors?.[0]?.message ||
//           "Couldn't resend the code. Please try again."
//       );
//     }
//   }

//   const isReadyStep = step === 4;

//   const Wrapper = isReadyStep
//     ? GardenBackground
//     : CloudBackground;

//   return (
//     <Wrapper>
//       <div className="min-h-screen flex flex-col items-center px-5 py-10">

//         {/* Heading */}

//         <h1
//           className={cn(
//             "font-display font-semibold text-2xl sm:text-3xl text-center mb-6",

//             isReadyStep
//               ? "text-ink-900"
//               : "text-white"
//           )}
//         >
//           Let's Create Your Learning Adventure{" "}
//           <span aria-hidden>✨</span>
//         </h1>

//         {/* Stepper */}

//         <div
//           className={cn(
//             "rounded-full px-4 py-3 mb-8",

//             isReadyStep
//               ? "bg-white/70"
//               : "bg-white/10 backdrop-blur"
//           )}
//         >
//           <Stepper
//             steps={STEP_LABELS}
//             current={step}
//           />
//         </div>

//         {/* Main Card */}

//         <div
//           className={cn(
//             "w-full max-w-2xl rounded-3xl p-6 sm:p-8",
//             "shadow-[var(--shadow-soft)]",

//             isReadyStep
//               ? "bg-white"
//               : "bg-white/10 backdrop-blur-xl border border-white/20"
//           )}
//         >
//           <AnimatePresence mode="wait">

//             <motion.div
//               key={
//                 pendingVerification
//                   ? "verify"
//                   : step
//               }
//               initial={{
//                 opacity: 0,
//                 x: 24,
//               }}
//               animate={{
//                 opacity: 1,
//                 x: 0,
//               }}
//               exit={{
//                 opacity: 0,
//                 x: -24,
//               }}
//               transition={{
//                 duration: 0.3,
//               }}
//             >

//               {/* ================================= */}
//               {/* STEP 0 */}
//               {/* ================================= */}

//               {step === 0 && (
//                 <div className="flex flex-col gap-5">

//                   {error && (
//                     <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-xl text-sm">
//                       {error}
//                     </div>
//                   )}

//                   {/* Google */}

//                   <button
//                     type="button"
//                     onClick={continueWithGoogle}
//                     disabled={isLoading}
//                     className="
//                       flex items-center justify-center gap-2
//                       w-full rounded-2xl
//                       bg-white px-4 py-3
//                       font-semibold text-ink-900
//                       shadow-md
//                       hover:opacity-90
//                       disabled:opacity-50
//                       transition
//                     "
//                   >
//                     <svg
//                       width="18"
//                       height="18"
//                       viewBox="0 0 18 18"
//                       aria-hidden
//                     >
//                       <path
//                         fill="#4285F4"
//                         d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.9c1.7-1.57 2.7-3.88 2.7-6.62z"
//                       />

//                       <path
//                         fill="#34A853"
//                         d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.9-2.26c-.8.54-1.84.86-3.06.86-2.35 0-4.34-1.59-5.05-3.72H.98v2.33A9 9 0 0 0 9 18z"
//                       />

//                       <path
//                         fill="#FBBC05"
//                         d="M3.95 10.7A5.4 5.4 0 0 1 3.67 9c0-.59.1-1.17.28-1.7V4.97H.98A9 9 0 0 0 0 9c0 1.45.35 2.83.98 4.03l2.97-2.33z"
//                       />

//                       <path
//                         fill="#EA4335"
//                         d="M9 3.58c1.32 0 2.51.46 3.44 1.35l2.58-2.58C13.46.89 11.43 0 9 0A9 9 0 0 0 .98 4.97l2.97 2.33C4.66 5.17 6.65 3.58 9 3.58z"
//                       />
//                     </svg>

//                     Continue with Google
//                   </button>

//                   {/* OR */}

//                   <div className="flex items-center gap-3">

//                     <div
//                       className={cn(
//                         "h-px flex-1",
//                         "bg-white/20"
//                       )}
//                     />

//                     <span className="text-xs font-semibold text-purple-100">
//                       OR
//                     </span>

//                     <div
//                       className={cn(
//                         "h-px flex-1",
//                         "bg-white/20"
//                       )}
//                     />

//                   </div>

//                   {/* Email */}

//                   <label className="block">

//                     <span className="text-sm font-semibold text-purple-100">
//                       Email Address
//                     </span>

//                     <input
//                       type="email"
//                       value={email}
//                       onChange={(e) =>
//                         setEmail(e.target.value)
//                       }
//                       placeholder="you@example.com"
//                       autoComplete="email"
//                       className="
//                         mt-1.5 w-full rounded-2xl
//                         bg-white/90
//                         px-4 py-3
//                         text-ink-900
//                         placeholder:text-ink-300
//                         focus:outline-none
//                         focus-visible:ring-2
//                         focus-visible:ring-purple-300
//                       "
//                     />

//                   </label>

//                   {/* Password */}

//                   <label className="block">

//                     <span className="text-sm font-semibold text-purple-100">
//                       Password (min 6 characters)
//                     </span>

//                     <input
//                       type="password"
//                       value={password}
//                       onChange={(e) =>
//                         setPassword(e.target.value)
//                       }
//                       placeholder="••••••••"
//                       autoComplete="new-password"
//                       className="
//                         mt-1.5 w-full rounded-2xl
//                         bg-white/90
//                         px-4 py-3
//                         text-ink-900
//                         placeholder:text-ink-300
//                         focus:outline-none
//                         focus-visible:ring-2
//                         focus-visible:ring-purple-300
//                       "
//                     />

//                   </label>

//                   {/* Child Name */}

//                   <label className="block">

//                     <span className="text-sm font-semibold text-purple-100">
//                       Child's Name
//                     </span>

//                     <input
//                       value={draft.name}
//                       onChange={(e) =>
//                         updateDraft({
//                           name: e.target.value,
//                         })
//                       }
//                       placeholder="e.g. Aarav"
//                       autoComplete="off"
//                       className="
//                         mt-1.5 w-full rounded-2xl
//                         bg-white/90
//                         px-4 py-3
//                         text-ink-900
//                         placeholder:text-ink-300
//                         focus:outline-none
//                         focus-visible:ring-2
//                         focus-visible:ring-purple-300
//                       "
//                     />

//                   </label>

//                   {/* Nickname */}

//                   <label className="block">

//                     <span className="text-sm font-semibold text-purple-100">
//                       Nickname (optional)
//                     </span>

//                     <input
//                       value={draft.nickname}
//                       onChange={(e) =>
//                         updateDraft({
//                           nickname:
//                             e.target.value,
//                         })
//                       }
//                       placeholder="e.g. Aar"
//                       className="
//                         mt-1.5 w-full rounded-2xl
//                         bg-white/90
//                         px-4 py-3
//                         text-ink-900
//                         placeholder:text-ink-300
//                         focus:outline-none
//                         focus-visible:ring-2
//                         focus-visible:ring-purple-300
//                       "
//                     />

//                   </label>

//                   {/* Avatar */}

//                   <div>

//                     <span className="text-sm font-semibold text-purple-100">
//                       Profile Avatar
//                     </span>

//                     <div className="flex flex-wrap gap-3 mt-2">

//                       {AVATARS.map((avatar) => {

//                         const selected =
//                           draft.avatar === avatar;

//                         return (
//                           <button
//                             key={avatar}
//                             type="button"
//                             onClick={() =>
//                               updateDraft({
//                                 avatar,
//                               })
//                             }
//                             aria-pressed={selected}
//                             className={cn(
//                               `
//                               w-14 h-14 rounded-full
//                               text-2xl
//                               flex items-center
//                               justify-center
//                               bg-white/90
//                               border-2
//                               transition-all
//                               `,
//                               selected
//                                 ? `
//                                   border-purple-500
//                                   scale-110
//                                   shadow-[var(--shadow-glow-purple)]
//                                 `
//                                 : "border-transparent"
//                             )}
//                           >
//                             {avatar}
//                           </button>
//                         );
//                       })}

//                     </div>
//                   </div>

//                 </div>
//               )}

//               {/* ================================= */}
//               {/* STEP 1 */}
//               {/* ================================= */}

//               {step === 1 && (
//                 <div className="grid gap-4">

//                   {AGE_CARDS.map((card) => {

//                     const selected =
//                       draft.ageRange ===
//                       card.range;

//                     return (
//                       <button
//                         key={card.range}
//                         type="button"
//                         onClick={() =>
//                           updateDraft({
//                             ageRange:
//                               card.range,
//                           })
//                         }
//                         className={cn(
//                           `
//                           text-left
//                           rounded-2xl
//                           p-5
//                           flex items-center gap-4
//                           border-2
//                           transition-all
//                           bg-white/95
//                           `,
//                           selected
//                             ? `
//                               border-purple-500
//                               shadow-[var(--shadow-glow-purple)]
//                               scale-[1.01]
//                             `
//                             : "border-transparent"
//                         )}
//                       >

//                         <span
//                           className="text-4xl"
//                           aria-hidden
//                         >
//                           {card.emoji}
//                         </span>

//                         <div className="flex-1">

//                           <p className="font-display font-semibold text-lg text-ink-900">

//                             {card.title}

//                             <span className="text-ink-500 font-normal text-base">
//                               {" "}
//                               · Age{" "}
//                               {ageLabel[
//                                 card.range
//                               ]}
//                             </span>

//                           </p>

//                           <p className="text-ink-500 text-sm">
//                             {card.blurb}
//                           </p>

//                         </div>

//                         {selected && (
//                           <span className="text-purple-500 text-2xl">
//                             ✓
//                           </span>
//                         )}

//                       </button>
//                     );
//                   })}

//                 </div>
//               )}

//               {/* ================================= */}
//               {/* STEP 2 */}
//               {/* ================================= */}

//               {step === 2 && (
//                 <div>

//                   <h2 className="font-display font-semibold text-xl mb-4 text-white">
//                     How can we personalize the adventure?
//                   </h2>

//                   <div className="grid gap-4">

//                     {CONDITION_CARDS.map(
//                       (card) => {

//                         const selected =
//                           draft.condition ===
//                           card.key;

//                         return (
//                           <button
//                             key={card.key}
//                             type="button"
//                             onClick={() =>
//                               updateDraft({
//                                 condition:
//                                   card.key,
//                               })
//                             }
//                             className={cn(
//                               `
//                               text-left
//                               rounded-2xl
//                               p-5
//                               flex items-start
//                               gap-4
//                               border-2
//                               transition-all
//                               bg-white/95
//                               `,
//                               selected
//                                 ? `
//                                   border-purple-500
//                                   shadow-[var(--shadow-glow-purple)]
//                                 `
//                                 : "border-transparent"
//                             )}
//                           >

//                             <span
//                               className="text-3xl"
//                               aria-hidden
//                             >
//                               {card.emoji}
//                             </span>

//                             <div className="flex-1">

//                               <p className="font-display font-semibold text-ink-900">
//                                 {card.title}
//                               </p>

//                               <p className="text-ink-500 text-sm mt-1">
//                                 {card.blurb}
//                               </p>

//                             </div>

//                             {selected && (
//                               <span className="text-purple-500 text-2xl">
//                                 ✓
//                               </span>
//                             )}

//                           </button>
//                         );
//                       }
//                     )}

//                   </div>

//                   <p className="text-xs mt-4 text-center italic px-4 text-purple-100">
//                     This information helps personalize
//                     educational support. InspireNest
//                     does not diagnose or treat medical
//                     conditions.
//                   </p>

//                 </div>
//               )}

//               {/* ================================= */}
//               {/* STEP 3 */}
//               {/* ================================= */}

//               {step === 3 && (
//                 <div className="flex flex-col gap-6">

//                   <div>

//                     <h2 className="font-display font-semibold text-xl mb-3 text-white">
//                       What makes learning fun for you?
//                     </h2>

//                     <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">

//                       {PREFERENCES.map(
//                         (preference) => {

//                           const selected =
//                             draft.preferences.includes(
//                               preference.key
//                             );

//                           return (
//                             <button
//                               key={preference.key}
//                               type="button"
//                               onClick={() =>
//                                 togglePreference(
//                                   preference.key
//                                 )
//                               }
//                               aria-pressed={selected}
//                               className={cn(
//                                 `
//                                 rounded-2xl
//                                 p-4
//                                 flex flex-col
//                                 items-center
//                                 gap-1.5
//                                 border-2
//                                 bg-white/95
//                                 transition-all
//                                 `,
//                                 selected
//                                   ? `
//                                     border-purple-500
//                                     scale-105
//                                     shadow-[var(--shadow-glow-purple)]
//                                   `
//                                   : "border-transparent"
//                               )}
//                             >

//                               <span className="text-2xl">
//                                 {preference.emoji}
//                               </span>

//                               <span className="text-sm font-semibold text-ink-900">
//                                 {preference.label}
//                               </span>

//                             </button>
//                           );
//                         }
//                       )}

//                     </div>

//                   </div>

//                   {/* Session */}

//                   <div>

//                     <h3 className="font-semibold mb-2 text-purple-100">
//                       Preferred Session Length
//                     </h3>

//                     <div className="grid grid-cols-3 gap-3">

//                       {SESSION_LENGTHS.map(
//                         (session) => {

//                           const selected =
//                             draft.sessionDuration ===
//                             session.value;

//                           return (
//                             <button
//                               key={session.value}
//                               type="button"
//                               onClick={() =>
//                                 updateDraft({
//                                   sessionDuration:
//                                     session.value,
//                                 })
//                               }
//                               className={cn(
//                                 `
//                                 rounded-2xl
//                                 p-3
//                                 flex flex-col
//                                 items-center
//                                 gap-1
//                                 border-2
//                                 bg-white/95
//                                 transition-all
//                                 `,
//                                 selected
//                                   ? `
//                                     border-purple-500
//                                     shadow-[var(--shadow-glow-purple)]
//                                   `
//                                   : "border-transparent"
//                               )}
//                             >

//                               <span className="text-xl">
//                                 {session.emoji}
//                               </span>

//                               <span className="text-xs font-semibold text-ink-900">
//                                 {session.label}
//                               </span>

//                             </button>
//                           );
//                         }
//                       )}

//                     </div>

//                   </div>

//                 </div>
//               )}

//               {/* ================================= */}
//               {/* STEP 4 READY */}
//               {/* ================================= */}

//               {step === 4 &&
//                 !pendingVerification && (
//                   <div className="text-center flex flex-col items-center gap-4">

//                     <motion.div
//                       animate={{
//                         scale: [1, 1.1, 1],
//                       }}
//                       transition={{
//                         duration: 2,
//                         repeat: Infinity,
//                       }}
//                       className="text-6xl"
//                       aria-hidden
//                     >
//                       ✨
//                     </motion.div>

//                     <h2 className="font-display font-semibold text-2xl text-ink-900">
//                       Your Learning Universe is Ready! ✨
//                     </h2>

//                     <div className="w-full max-w-sm bg-purple-50 rounded-2xl p-5 text-left flex flex-col gap-2">

//                       <p className="text-ink-700">
//                         <span className="font-semibold">
//                           Email:
//                         </span>{" "}
//                         {email || "—"}
//                       </p>

//                       <p className="text-ink-700">
//                         <span className="font-semibold">
//                           Name:
//                         </span>{" "}
//                         {draft.name ||
//                           "Explorer"}
//                       </p>

//                       <p className="text-ink-700">
//                         <span className="font-semibold">
//                           Age Group:
//                         </span>{" "}
//                         {draft.ageRange
//                           ? ageLabel[
//                               draft.ageRange
//                             ]
//                           : "—"}
//                       </p>

//                       <p className="text-ink-700">
//                         <span className="font-semibold">
//                           Learning Support:
//                         </span>{" "}
//                         {draft.condition
//                           ? conditionLabel[
//                               draft.condition
//                             ]
//                           : "—"}
//                       </p>

//                     </div>

//                     <p className="text-ink-500">
//                       Your adventure is about to begin.
//                     </p>

//                     <Button
//                       size="xl"
//                       onClick={finish}
//                       disabled={isLoading}
//                     >
//                       {isLoading
//                         ? "Creating Account..."
//                         : "Enter Wonder Garden 🌈"}
//                     </Button>

//                     {error && (
//                       <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-xl text-sm max-w-sm">
//                         {error}
//                       </div>
//                     )}

//                   </div>
//                 )}

//               {/* ================================= */}
//               {/* VERIFICATION */}
//               {/* ================================= */}

//               {step === 4 &&
//                 pendingVerification && (
//                   <div className="text-center flex flex-col items-center gap-4">

//                     <div
//                       className="text-6xl"
//                       aria-hidden
//                     >
//                       ✉️
//                     </div>

//                     <h2 className="font-display font-semibold text-2xl text-ink-900">
//                       Check your email
//                     </h2>

//                     <p className="text-ink-500 max-w-sm">
//                       We sent a 6-digit code to{" "}
//                       <span className="font-semibold">
//                         {email}
//                       </span>
//                       . Enter it below to finish
//                       creating your account.
//                     </p>

//                     <input
//                       value={code}
//                       onChange={(event) =>
//                         setCode(
//                           event.target.value
//                             .replace(/\D/g, "")
//                             .slice(0, 6)
//                         )
//                       }
//                       placeholder="123456"
//                       inputMode="numeric"
//                       maxLength={6}
//                       className="
//                         w-full
//                         max-w-xs
//                         text-center
//                         text-lg
//                         tracking-[0.4em]
//                         rounded-2xl
//                         bg-white/90
//                         px-4
//                         py-3
//                         text-ink-900
//                         placeholder:text-ink-300
//                         placeholder:tracking-normal
//                         focus:outline-none
//                         focus-visible:ring-2
//                         focus-visible:ring-purple-300
//                       "
//                     />

//                     <Button
//                       size="xl"
//                       onClick={verifyCode}
//                       disabled={
//                         isLoading ||
//                         code.length !== 6
//                       }
//                     >
//                       {isLoading
//                         ? "Verifying..."
//                         : "Verify & Enter 🌈"}
//                     </Button>

//                     <button
//                       type="button"
//                       onClick={resendCode}
//                       disabled={isLoading}
//                       className="
//                         text-sm
//                         font-semibold
//                         text-purple-600
//                         hover:underline
//                         disabled:opacity-50
//                       "
//                     >
//                       Resend code
//                     </button>

//                     {error && (
//                       <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-xl text-sm max-w-sm">
//                         {error}
//                       </div>
//                     )}

//                   </div>
//                 )}

//             </motion.div>

//           </AnimatePresence>
//         </div>

//         {/* Navigation */}

//         {!isReadyStep && (
//           <div className="flex items-center gap-3 mt-6">

//             {step > 0 && (
//               <Button
//                 variant="secondary"
//                 size="md"
//                 onClick={back}
//               >
//                 Back
//               </Button>
//             )}

//             <Button
//               size="md"
//               onClick={next}
//               disabled={!canNext}
//             >
//               Continue
//             </Button>

//           </div>
//         )}

//       </div>
//     </Wrapper>
//   );
// }








// //modify vala not much correct

// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { AnimatePresence, motion } from "framer-motion";
// import { useSignUp, useClerk, useAuth } from "@clerk/react";

// import { CloudBackground } from "@/components/backgrounds/CloudBackground";
// import { GardenBackground } from "@/components/backgrounds/GardenBackground";
// import { Button } from "@/components/ui/Button";
// import { Stepper } from "@/components/ui/Stepper";

// import { useChildProfileStore } from "@/stores/childProfileStore";
// import { cn } from "@/lib/cn";
// import { saveUserProfile } from "@/lib/api";

// import {
//   AVATARS,
//   AGE_CARDS,
//   CONDITION_CARDS,
//   PREFERENCES,
//   SESSION_LENGTHS,
//   ageLabel,
//   conditionLabel,
// } from "@/lib/Registrationoptions";

// const STEP_LABELS = [
//   "Child",
//   "Age",
//   "Support",
//   "Preferences",
//   "Ready",
// ];

// export default function Register() {
//   const [step, setStep] = useState(0);

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState("");

//   const [pendingVerification, setPendingVerification] = useState(false);
//   const [code, setCode] = useState("");

//   const {
//     draft,
//     updateDraft,
//     togglePreference,
//     completeRegistration,
//   } = useChildProfileStore();

//   const { signUp } = useSignUp();
//   const { setActive } = useClerk();
//   const { getToken } = useAuth();

//   const navigate = useNavigate();

//   const canNext = [
//     draft.name.trim().length > 0 &&
//       email.trim().length > 0 &&
//       password.length >= 6,

//     !!draft.ageRange,

//     !!draft.condition,

//     draft.preferences.length > 0,

//     true,
//   ][step];

//   function next() {
//     setError("");

//     if (step < STEP_LABELS.length - 1) {
//       setStep((current) => current + 1);
//     }
//   }

//   function back() {
//     setError("");

//     if (step > 0) {
//       setStep((current) => current - 1);
//     }
//   }
// async function persistProfile() {
//   if (!user) {
//     throw new Error(
//       "User information is not available."
//     );
//   }

//   const emailAddress =
//     user.primaryEmailAddress?.emailAddress;

//   if (!emailAddress) {
//     throw new Error(
//       "User email address is not available."
//     );
//   }

//   console.log("💾 Saving user profile to MongoDB...");

//   const result = await saveUserProfile(getToken, {
//     clerkId: user.id,

//     email: emailAddress,

//     child: {
//       name: draft.name.trim(),

//       nickname:
//         draft.nickname?.trim() || "",

//       avatar:
//         draft.avatar || "😊",

//       ageRange:
//         draft.ageRange || "",

//       condition:
//         draft.condition || "",
//     },

//     preferences:
//       draft.preferences || [],

//     sessionDuration:
//       draft.sessionDuration || 10,
//   });

//   console.log(
//     "✅ MongoDB profile saved:",
//     result
//   );

//   return result;
// }
//   async function continueWithGoogle() {
//     setError("");

//     try {
//       if (!signUp) {
//         throw new Error(
//           "Sign up is not ready yet."
//         );
//       }

//       await signUp.authenticateWithRedirect({
//         strategy: "oauth_google",
//         redirectUrl: "/sso-callback",
//         redirectUrlComplete: "/dashboard",
//       });
//     } catch (err: any) {
//       console.error(
//         "Google sign-up failed:",
//         err
//       );

//       setError(
//         err?.errors?.[0]?.message ||
//           "Couldn't start Google sign-up. Please try again."
//       );
//     }
//   }

//   async function finish() {
//     if (isLoading) return;

//     setIsLoading(true);
//     setError("");

//     try {
//       if (!signUp) {
//         throw new Error(
//           "Sign up is not ready yet."
//         );
//       }

//       if (!email.trim()) {
//         setError("Please enter your email address.");
//         return;
//       }

//       if (password.length < 6) {
//         setError(
//           "Password must contain at least 6 characters."
//         );
//         return;
//       }

//       const signUpAttempt = await signUp.create({
//         emailAddress: email.trim(),
//         password,

//         firstName: draft.name.trim(),

//         unsafeMetadata: {
//           childName: draft.name.trim(),

//           childNickname:
//             draft.nickname?.trim() || "",

//           ageRange: draft.ageRange,

//           condition: draft.condition,

//           preferences: draft.preferences,

//           avatar: draft.avatar || "😊",

//           sessionDuration:
//             draft.sessionDuration || 10,
//         },
//       });

//      if (signUpAttempt.status === "complete") {
//   if (signUpAttempt.createdSessionId) {
//     await setActive({
//       session: signUpAttempt.createdSessionId,
//     });
//   }

  
//         await persistProfile();

//         completeRegistration();

//         navigate("/dashboard");

//         return;
//       }

//       if (
//         signUpAttempt.status ===
//         "missing_requirements"
//       ) {
//         await signUp.prepareEmailAddressVerification(
//           {
//             strategy: "email_code",
//           }
//         );

//         setPendingVerification(true);

//         return;
//       }

//       console.log(
//         "Incomplete signup:",
//         signUpAttempt
//       );

//       setError(
//         "Your account could not be completed. Please try again."
//       );
//     } catch (err: any) {
//       console.error(
//         "Registration failed:",
//         err
//       );

//       const message =
//         err?.errors?.[0]?.message;

//       setError(
//         message ||
//           "Failed to create account. Please try again."
//       );
//     } finally {
//       setIsLoading(false);
//     }
//   }

//   async function verifyCode() {
//     if (isLoading) return;

//     setIsLoading(true);
//     setError("");

//     try {
//       if (!signUp) {
//         throw new Error(
//           "Sign up is not ready yet."
//         );
//       }

//       if (code.length !== 6) {
//         setError(
//           "Please enter the 6-digit verification code."
//         );

//         return;
//       }

//       const attempt =
//         await signUp.attemptEmailAddressVerification(
//           {
//             code,
//           }
//         );

//       if (attempt.status === "complete") {
//         if (attempt.createdSessionId) {
//           await setActive({
//             session:
//               attempt.createdSessionId,
//           });
//         }

//         await persistProfile();

//         completeRegistration();

//         navigate("/dashboard");

//         return;
//       }

//       setError(
//         "That code didn't work. Please check your email and try again."
//       );
//     } catch (err: any) {
//       console.error(
//         "Verification failed:",
//         err
//       );

//       setError(
//         err?.errors?.[0]?.message ||
//           "Verification failed. Please try again."
//       );
//     } finally {
//       setIsLoading(false);
//     }
//   }

//   async function resendCode() {
//     if (isLoading) return;

//     setError("");

//     try {
//       if (!signUp) return;

//       await signUp.prepareEmailAddressVerification(
//         {
//           strategy: "email_code",
//         }
//       );
//     } catch (err: any) {
//       console.error(
//         "Resend failed:",
//         err
//       );

//       setError(
//         err?.errors?.[0]?.message ||
//           "Couldn't resend the code. Please try again."
//       );
//     }
//   }

//   const isReadyStep = step === 4;

//   const Wrapper = isReadyStep
//     ? GardenBackground
//     : CloudBackground;

//   return (
//     <Wrapper>
//       <div className="min-h-screen flex flex-col items-center px-5 py-10">

//         {/* Heading */}

//         <h1
//           className={cn(
//             "font-display font-semibold text-2xl sm:text-3xl text-center mb-6",

//             isReadyStep
//               ? "text-ink-900"
//               : "text-white"
//           )}
//         >
//           Let's Create Your Learning Adventure{" "}
//           <span aria-hidden>✨</span>
//         </h1>

//         {/* Stepper */}

//         <div
//           className={cn(
//             "rounded-full px-4 py-3 mb-8",

//             isReadyStep
//               ? "bg-white/70"
//               : "bg-white/10 backdrop-blur"
//           )}
//         >
//           <Stepper
//             steps={STEP_LABELS}
//             current={step}
//           />
//         </div>

//         {/* Main Card */}

//         <div
//           className={cn(
//             "w-full max-w-2xl rounded-3xl p-6 sm:p-8",
//             "shadow-[var(--shadow-soft)]",

//             isReadyStep
//               ? "bg-white"
//               : "bg-white/10 backdrop-blur-xl border border-white/20"
//           )}
//         >
//           <AnimatePresence mode="wait">

//             <motion.div
//               key={
//                 pendingVerification
//                   ? "verify"
//                   : step
//               }
//               initial={{
//                 opacity: 0,
//                 x: 24,
//               }}
//               animate={{
//                 opacity: 1,
//                 x: 0,
//               }}
//               exit={{
//                 opacity: 0,
//                 x: -24,
//               }}
//               transition={{
//                 duration: 0.3,
//               }}
//             >

//               {/* ================================= */}
//               {/* STEP 0 */}
//               {/* ================================= */}

//               {step === 0 && (
//                 <div className="flex flex-col gap-5">

//                   {error && (
//                     <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-xl text-sm">
//                       {error}
//                     </div>
//                   )}

//                   {/* Google */}

//                   <button
//                     type="button"
//                     onClick={continueWithGoogle}
//                     disabled={isLoading}
//                     className="
//                       flex items-center justify-center gap-2
//                       w-full rounded-2xl
//                       bg-white px-4 py-3
//                       font-semibold text-ink-900
//                       shadow-md
//                       hover:opacity-90
//                       disabled:opacity-50
//                       transition
//                     "
//                   >
//                     <svg
//                       width="18"
//                       height="18"
//                       viewBox="0 0 18 18"
//                       aria-hidden
//                     >
//                       <path
//                         fill="#4285F4"
//                         d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.9c1.7-1.57 2.7-3.88 2.7-6.62z"
//                       />

//                       <path
//                         fill="#34A853"
//                         d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.9-2.26c-.8.54-1.84.86-3.06.86-2.35 0-4.34-1.59-5.05-3.72H.98v2.33A9 9 0 0 0 9 18z"
//                       />

//                       <path
//                         fill="#FBBC05"
//                         d="M3.95 10.7A5.4 5.4 0 0 1 3.67 9c0-.59.1-1.17.28-1.7V4.97H.98A9 9 0 0 0 0 9c0 1.45.35 2.83.98 4.03l2.97-2.33z"
//                       />

//                       <path
//                         fill="#EA4335"
//                         d="M9 3.58c1.32 0 2.51.46 3.44 1.35l2.58-2.58C13.46.89 11.43 0 9 0A9 9 0 0 0 .98 4.97l2.97 2.33C4.66 5.17 6.65 3.58 9 3.58z"
//                       />
//                     </svg>

//                     Continue with Google
//                   </button>

//                   {/* OR */}

//                   <div className="flex items-center gap-3">

//                     <div
//                       className={cn(
//                         "h-px flex-1",
//                         "bg-white/20"
//                       )}
//                     />

//                     <span className="text-xs font-semibold text-purple-100">
//                       OR
//                     </span>

//                     <div
//                       className={cn(
//                         "h-px flex-1",
//                         "bg-white/20"
//                       )}
//                     />

//                   </div>

//                   {/* Email */}

//                   <label className="block">

//                     <span className="text-sm font-semibold text-purple-100">
//                       Email Address
//                     </span>

//                     <input
//                       type="email"
//                       value={email}
//                       onChange={(e) =>
//                         setEmail(e.target.value)
//                       }
//                       placeholder="you@example.com"
//                       autoComplete="email"
//                       className="
//                         mt-1.5 w-full rounded-2xl
//                         bg-white/90
//                         px-4 py-3
//                         text-ink-900
//                         placeholder:text-ink-300
//                         focus:outline-none
//                         focus-visible:ring-2
//                         focus-visible:ring-purple-300
//                       "
//                     />

//                   </label>

//                   {/* Password */}

//                   <label className="block">

//                     <span className="text-sm font-semibold text-purple-100">
//                       Password (min 6 characters)
//                     </span>

//                     <input
//                       type="password"
//                       value={password}
//                       onChange={(e) =>
//                         setPassword(e.target.value)
//                       }
//                       placeholder="••••••••"
//                       autoComplete="new-password"
//                       className="
//                         mt-1.5 w-full rounded-2xl
//                         bg-white/90
//                         px-4 py-3
//                         text-ink-900
//                         placeholder:text-ink-300
//                         focus:outline-none
//                         focus-visible:ring-2
//                         focus-visible:ring-purple-300
//                       "
//                     />

//                   </label>

//                   {/* Child Name */}

//                   <label className="block">

//                     <span className="text-sm font-semibold text-purple-100">
//                       Child's Name
//                     </span>

//                     <input
//                       value={draft.name}
//                       onChange={(e) =>
//                         updateDraft({
//                           name: e.target.value,
//                         })
//                       }
//                       placeholder="e.g. Aarav"
//                       autoComplete="off"
//                       className="
//                         mt-1.5 w-full rounded-2xl
//                         bg-white/90
//                         px-4 py-3
//                         text-ink-900
//                         placeholder:text-ink-300
//                         focus:outline-none
//                         focus-visible:ring-2
//                         focus-visible:ring-purple-300
//                       "
//                     />

//                   </label>

//                   {/* Nickname */}

//                   <label className="block">

//                     <span className="text-sm font-semibold text-purple-100">
//                       Nickname (optional)
//                     </span>

//                     <input
//                       value={draft.nickname}
//                       onChange={(e) =>
//                         updateDraft({
//                           nickname:
//                             e.target.value,
//                         })
//                       }
//                       placeholder="e.g. Aar"
//                       className="
//                         mt-1.5 w-full rounded-2xl
//                         bg-white/90
//                         px-4 py-3
//                         text-ink-900
//                         placeholder:text-ink-300
//                         focus:outline-none
//                         focus-visible:ring-2
//                         focus-visible:ring-purple-300
//                       "
//                     />

//                   </label>

//                   {/* Avatar */}

//                   <div>

//                     <span className="text-sm font-semibold text-purple-100">
//                       Profile Avatar
//                     </span>

//                     <div className="flex flex-wrap gap-3 mt-2">

//                       {AVATARS.map((avatar) => {

//                         const selected =
//                           draft.avatar === avatar;

//                         return (
//                           <button
//                             key={avatar}
//                             type="button"
//                             onClick={() =>
//                               updateDraft({
//                                 avatar,
//                               })
//                             }
//                             aria-pressed={selected}
//                             className={cn(
//                               `
//                               w-14 h-14 rounded-full
//                               text-2xl
//                               flex items-center
//                               justify-center
//                               bg-white/90
//                               border-2
//                               transition-all
//                               `,
//                               selected
//                                 ? `
//                                   border-purple-500
//                                   scale-110
//                                   shadow-[var(--shadow-glow-purple)]
//                                 `
//                                 : "border-transparent"
//                             )}
//                           >
//                             {avatar}
//                           </button>
//                         );
//                       })}

//                     </div>
//                   </div>

//                 </div>
//               )}

//               {/* ================================= */}
//               {/* STEP 1 */}
//               {/* ================================= */}

//               {step === 1 && (
//                 <div className="grid gap-4">

//                   {AGE_CARDS.map((card) => {

//                     const selected =
//                       draft.ageRange ===
//                       card.range;

//                     return (
//                       <button
//                         key={card.range}
//                         type="button"
//                         onClick={() =>
//                           updateDraft({
//                             ageRange:
//                               card.range,
//                           })
//                         }
//                         className={cn(
//                           `
//                           text-left
//                           rounded-2xl
//                           p-5
//                           flex items-center gap-4
//                           border-2
//                           transition-all
//                           bg-white/95
//                           `,
//                           selected
//                             ? `
//                               border-purple-500
//                               shadow-[var(--shadow-glow-purple)]
//                               scale-[1.01]
//                             `
//                             : "border-transparent"
//                         )}
//                       >

//                         <span
//                           className="text-4xl"
//                           aria-hidden
//                         >
//                           {card.emoji}
//                         </span>

//                         <div className="flex-1">

//                           <p className="font-display font-semibold text-lg text-ink-900">

//                             {card.title}

//                             <span className="text-ink-500 font-normal text-base">
//                               {" "}
//                               · Age{" "}
//                               {ageLabel[
//                                 card.range
//                               ]}
//                             </span>

//                           </p>

//                           <p className="text-ink-500 text-sm">
//                             {card.blurb}
//                           </p>

//                         </div>

//                         {selected && (
//                           <span className="text-purple-500 text-2xl">
//                             ✓
//                           </span>
//                         )}

//                       </button>
//                     );
//                   })}

//                 </div>
//               )}

//               {/* ================================= */}
//               {/* STEP 2 */}
//               {/* ================================= */}

//               {step === 2 && (
//                 <div>

//                   <h2 className="font-display font-semibold text-xl mb-4 text-white">
//                     How can we personalize the adventure?
//                   </h2>

//                   <div className="grid gap-4">

//                     {CONDITION_CARDS.map(
//                       (card) => {

//                         const selected =
//                           draft.condition ===
//                           card.key;

//                         return (
//                           <button
//                             key={card.key}
//                             type="button"
//                             onClick={() =>
//                               updateDraft({
//                                 condition:
//                                   card.key,
//                               })
//                             }
//                             className={cn(
//                               `
//                               text-left
//                               rounded-2xl
//                               p-5
//                               flex items-start
//                               gap-4
//                               border-2
//                               transition-all
//                               bg-white/95
//                               `,
//                               selected
//                                 ? `
//                                   border-purple-500
//                                   shadow-[var(--shadow-glow-purple)]
//                                 `
//                                 : "border-transparent"
//                             )}
//                           >

//                             <span
//                               className="text-3xl"
//                               aria-hidden
//                             >
//                               {card.emoji}
//                             </span>

//                             <div className="flex-1">

//                               <p className="font-display font-semibold text-ink-900">
//                                 {card.title}
//                               </p>

//                               <p className="text-ink-500 text-sm mt-1">
//                                 {card.blurb}
//                               </p>

//                             </div>

//                             {selected && (
//                               <span className="text-purple-500 text-2xl">
//                                 ✓
//                               </span>
//                             )}

//                           </button>
//                         );
//                       }
//                     )}

//                   </div>

//                   <p className="text-xs mt-4 text-center italic px-4 text-purple-100">
//                     This information helps personalize
//                     educational support. InspireNest
//                     does not diagnose or treat medical
//                     conditions.
//                   </p>

//                 </div>
//               )}

//               {/* ================================= */}
//               {/* STEP 3 */}
//               {/* ================================= */}

//               {step === 3 && (
//                 <div className="flex flex-col gap-6">

//                   <div>

//                     <h2 className="font-display font-semibold text-xl mb-3 text-white">
//                       What makes learning fun for you?
//                     </h2>

//                     <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">

//                       {PREFERENCES.map(
//                         (preference) => {

//                           const selected =
//                             draft.preferences.includes(
//                               preference.key
//                             );

//                           return (
//                             <button
//                               key={preference.key}
//                               type="button"
//                               onClick={() =>
//                                 togglePreference(
//                                   preference.key
//                                 )
//                               }
//                               aria-pressed={selected}
//                               className={cn(
//                                 `
//                                 rounded-2xl
//                                 p-4
//                                 flex flex-col
//                                 items-center
//                                 gap-1.5
//                                 border-2
//                                 bg-white/95
//                                 transition-all
//                                 `,
//                                 selected
//                                   ? `
//                                     border-purple-500
//                                     scale-105
//                                     shadow-[var(--shadow-glow-purple)]
//                                   `
//                                   : "border-transparent"
//                               )}
//                             >

//                               <span className="text-2xl">
//                                 {preference.emoji}
//                               </span>

//                               <span className="text-sm font-semibold text-ink-900">
//                                 {preference.label}
//                               </span>

//                             </button>
//                           );
//                         }
//                       )}

//                     </div>

//                   </div>

//                   {/* Session */}

//                   <div>

//                     <h3 className="font-semibold mb-2 text-purple-100">
//                       Preferred Session Length
//                     </h3>

//                     <div className="grid grid-cols-3 gap-3">

//                       {SESSION_LENGTHS.map(
//                         (session) => {

//                           const selected =
//                             draft.sessionDuration ===
//                             session.value;

//                           return (
//                             <button
//                               key={session.value}
//                               type="button"
//                               onClick={() =>
//                                 updateDraft({
//                                   sessionDuration:
//                                     session.value,
//                                 })
//                               }
//                               className={cn(
//                                 `
//                                 rounded-2xl
//                                 p-3
//                                 flex flex-col
//                                 items-center
//                                 gap-1
//                                 border-2
//                                 bg-white/95
//                                 transition-all
//                                 `,
//                                 selected
//                                   ? `
//                                     border-purple-500
//                                     shadow-[var(--shadow-glow-purple)]
//                                   `
//                                   : "border-transparent"
//                               )}
//                             >

//                               <span className="text-xl">
//                                 {session.emoji}
//                               </span>

//                               <span className="text-xs font-semibold text-ink-900">
//                                 {session.label}
//                               </span>

//                             </button>
//                           );
//                         }
//                       )}

//                     </div>

//                   </div>

//                 </div>
//               )}

//               {/* ================================= */}
//               {/* STEP 4 READY */}
//               {/* ================================= */}

//               {step === 4 &&
//                 !pendingVerification && (
//                   <div className="text-center flex flex-col items-center gap-4">

//                     <motion.div
//                       animate={{
//                         scale: [1, 1.1, 1],
//                       }}
//                       transition={{
//                         duration: 2,
//                         repeat: Infinity,
//                       }}
//                       className="text-6xl"
//                       aria-hidden
//                     >
//                       ✨
//                     </motion.div>

//                     <h2 className="font-display font-semibold text-2xl text-ink-900">
//                       Your Learning Universe is Ready! ✨
//                     </h2>

//                     <div className="w-full max-w-sm bg-purple-50 rounded-2xl p-5 text-left flex flex-col gap-2">

//                       <p className="text-ink-700">
//                         <span className="font-semibold">
//                           Email:
//                         </span>{" "}
//                         {email || "—"}
//                       </p>

//                       <p className="text-ink-700">
//                         <span className="font-semibold">
//                           Name:
//                         </span>{" "}
//                         {draft.name ||
//                           "Explorer"}
//                       </p>

//                       <p className="text-ink-700">
//                         <span className="font-semibold">
//                           Age Group:
//                         </span>{" "}
//                         {draft.ageRange
//                           ? ageLabel[
//                               draft.ageRange
//                             ]
//                           : "—"}
//                       </p>

//                       <p className="text-ink-700">
//                         <span className="font-semibold">
//                           Learning Support:
//                         </span>{" "}
//                         {draft.condition
//                           ? conditionLabel[
//                               draft.condition
//                             ]
//                           : "—"}
//                       </p>

//                     </div>

//                     <p className="text-ink-500">
//                       Your adventure is about to begin.
//                     </p>

//                     <Button
//                       size="xl"
//                       onClick={finish}
//                       disabled={isLoading}
//                     >
//                       {isLoading
//                         ? "Creating Account..."
//                         : "Enter Wonder Garden 🌈"}
//                     </Button>

//                     {error && (
//                       <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-xl text-sm max-w-sm">
//                         {error}
//                       </div>
//                     )}

//                   </div>
//                 )}

//               {/* ================================= */}
//               {/* VERIFICATION */}
//               {/* ================================= */}

//               {step === 4 &&
//                 pendingVerification && (
//                   <div className="text-center flex flex-col items-center gap-4">

//                     <div
//                       className="text-6xl"
//                       aria-hidden
//                     >
//                       ✉️
//                     </div>

//                     <h2 className="font-display font-semibold text-2xl text-ink-900">
//                       Check your email
//                     </h2>

//                     <p className="text-ink-500 max-w-sm">
//                       We sent a 6-digit code to{" "}
//                       <span className="font-semibold">
//                         {email}
//                       </span>
//                       . Enter it below to finish
//                       creating your account.
//                     </p>

//                     <input
//                       value={code}
//                       onChange={(event) =>
//                         setCode(
//                           event.target.value
//                             .replace(/\D/g, "")
//                             .slice(0, 6)
//                         )
//                       }
//                       placeholder="123456"
//                       inputMode="numeric"
//                       maxLength={6}
//                       className="
//                         w-full
//                         max-w-xs
//                         text-center
//                         text-lg
//                         tracking-[0.4em]
//                         rounded-2xl
//                         bg-white/90
//                         px-4
//                         py-3
//                         text-ink-900
//                         placeholder:text-ink-300
//                         placeholder:tracking-normal
//                         focus:outline-none
//                         focus-visible:ring-2
//                         focus-visible:ring-purple-300
//                       "
//                     />

//                     <Button
//                       size="xl"
//                       onClick={verifyCode}
//                       disabled={
//                         isLoading ||
//                         code.length !== 6
//                       }
//                     >
//                       {isLoading
//                         ? "Verifying..."
//                         : "Verify & Enter 🌈"}
//                     </Button>

//                     <button
//                       type="button"
//                       onClick={resendCode}
//                       disabled={isLoading}
//                       className="
//                         text-sm
//                         font-semibold
//                         text-purple-600
//                         hover:underline
//                         disabled:opacity-50
//                       "
//                     >
//                       Resend code
//                     </button>

//                     {error && (
//                       <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-xl text-sm max-w-sm">
//                         {error}
//                       </div>
//                     )}

//                   </div>
//                 )}

//             </motion.div>

//           </AnimatePresence>
//         </div>

//         {/* Navigation */}

//         {!isReadyStep && (
//           <div className="flex items-center gap-3 mt-6">

//             {step > 0 && (
//               <Button
//                 variant="secondary"
//                 size="md"
//                 onClick={back}
//               >
//                 Back
//               </Button>
//             )}

//             <Button
//               size="md"
//               onClick={next}
//               disabled={!canNext}
//             >
//               Continue
//             </Button>

//           </div>
//         )}

//       </div>
//     </Wrapper>
//   );
// }



// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { AnimatePresence, motion } from "framer-motion";
// import { useSignUp, useUser, useAuth } from "@clerk/react";

// import { CloudBackground } from "@/components/backgrounds/CloudBackground";
// import { GardenBackground } from "@/components/backgrounds/GardenBackground";
// import { Button } from "@/components/ui/Button";
// import { Stepper } from "@/components/ui/Stepper";

// import { useChildProfileStore } from "@/stores/childProfileStore";
// import { cn } from "@/lib/cn";
// import { saveUserProfile } from "@/lib/api";

// import {
//   AVATARS,
//   AGE_CARDS,
//   CONDITION_CARDS,
//   PREFERENCES,
//   SESSION_LENGTHS,
//   ageLabel,
//   conditionLabel,
// } from "@/lib/Registrationoptions";

// const STEP_LABELS = ["Child", "Age", "Support", "Preferences", "Ready"];

// function getErrorMessage(err: unknown, fallback: string): string {
//   if (!err || typeof err !== "object") return fallback;
//   const e = err as { errors?: { message?: string }[]; message?: string };
//   return e.errors?.[0]?.message || e.message || fallback;
// }

// export default function Register() {
//   const [step, setStep] = useState(0);

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState("");

//   const [pendingVerification, setPendingVerification] = useState(false);
//   const [code, setCode] = useState("");

//   const { draft, updateDraft, togglePreference, completeRegistration } = useChildProfileStore();

//   // Your installed @clerk/react is on the "Future" API: signUp is
//   // reactive, methods return { error } (not a full attempt object), and
//   // OAuth is signUp.sso() rather than authenticateWithRedirect().
//   const { signUp } = useSignUp();
//   const { user } = useUser();
//   const { getToken } = useAuth();

//   const navigate = useNavigate();

//   const canNext = [
//     draft.name.trim().length > 0 && email.trim().length > 0 && password.length >= 6,
//     !!draft.ageRange,
//     !!draft.condition,
//     draft.preferences.length > 0,
//     true,
//   ][step];

//   function next() {
//     setError("");
//     if (step < STEP_LABELS.length - 1) setStep((current) => current + 1);
//   }

//   function back() {
//     setError("");
//     if (step > 0) setStep((current) => current - 1);
//   }

//   // Saves what the stepper collected to MongoDB, matching your controller's
//   // flat body shape exactly (clerkId, email, name, nickname, avatar,
//   // ageRange, condition, preferences, sessionDuration).
//   async function persistProfile() {
//     if (!user) {
//       throw new Error("User information is not available.");
//     }

//     const emailAddress = user.primaryEmailAddress?.emailAddress || email;

//     if (!emailAddress) {
//       throw new Error("User email address is not available.");
//     }

//     console.log("💾 Saving user profile to MongoDB...");

//     const result = await saveUserProfile(getToken, {
//       clerkId: user.id,
//       email: emailAddress,
//       name: draft.name.trim(),
//       nickname: draft.nickname?.trim() || "",
//       avatar: draft.avatar || "😊",
//       ageRange: draft.ageRange || "",
//       condition: draft.condition || "",
//       preferences: draft.preferences || [],
//       sessionDuration: draft.sessionDuration || 10,
//     });

//     console.log("✅ MongoDB profile saved:", result);

//     return result;
//   }

//   async function continueWithGoogle() {
//     setError("");

//     try {
//       if (!signUp) {
//         throw new Error("Sign up is not ready yet.");
//       }

//       const { error } = await signUp.sso({
//         strategy: "oauth_google",
//         redirectCallbackUrl: "/sso-callback",
//         redirectUrl: "/dashboard",
//       });

//       if (error) {
//         setError(getErrorMessage(error, "Couldn't start Google sign-up. Please try again."));
//       }
//     } catch (err) {
//       console.error("Google sign-up failed:", err);
//       setError(getErrorMessage(err, "Couldn't start Google sign-up. Please try again."));
//     }
//   }

//   async function finish() {
//     if (isLoading) return;

//     setIsLoading(true);
//     setError("");

//     try {
//       if (!signUp) {
//         throw new Error("Sign up is not ready yet.");
//       }

//       if (!email.trim()) {
//         setError("Please enter your email address.");
//         return;
//       }

//       if (password.length < 6) {
//         setError("Password must contain at least 6 characters.");
//         return;
//       }

//       const { error } = await signUp.password({
//         emailAddress: email.trim(),
//         password,
//         firstName: draft.name.trim(),
//       });

//       if (error) {
//         setError(getErrorMessage(error, "Failed to create account. Please try again."));
//         return;
//       }

//       if (signUp.status === "complete") {
//         const { error: finalizeError } = await signUp.finalize();
//         if (finalizeError) {
//           setError(getErrorMessage(finalizeError, "Couldn't finish signing you in."));
//           return;
//         }

//         await persistProfile();
//         completeRegistration();
//         navigate("/dashboard");
//         return;
//       }

//       if (signUp.status === "missing_requirements") {
//         const { error: codeError } = await signUp.verifications.sendEmailCode();
//         if (codeError) {
//           setError(getErrorMessage(codeError, "Couldn't send the verification code."));
//           return;
//         }
//         setPendingVerification(true);
//         return;
//       }

//       console.log("Incomplete signup:", signUp.status);
//       setError("Your account could not be completed. Please try again.");
//     } catch (err) {
//       console.error("Registration failed:", err);
//       setError(getErrorMessage(err, "Failed to create account. Please try again."));
//     } finally {
//       setIsLoading(false);
//     }
//   }

//   async function verifyCode() {
//     if (isLoading) return;

//     setIsLoading(true);
//     setError("");

//     try {
//       if (!signUp) {
//         throw new Error("Sign up is not ready yet.");
//       }

//       if (code.length !== 6) {
//         setError("Please enter the 6-digit verification code.");
//         return;
//       }

//       const { error } = await signUp.verifications.verifyEmailCode({ code });

//       if (error) {
//         setError(getErrorMessage(error, "That code didn't work. Please check your email and try again."));
//         return;
//       }

//       if (signUp.status === "complete") {
//         const { error: finalizeError } = await signUp.finalize();
//         if (finalizeError) {
//           setError(getErrorMessage(finalizeError, "Couldn't finish signing you in."));
//           return;
//         }

//         await persistProfile();
//         completeRegistration();
//         navigate("/dashboard");
//         return;
//       }

//       setError("That code didn't work. Please check your email and try again.");
//     } catch (err) {
//       console.error("Verification failed:", err);
//       setError(getErrorMessage(err, "Verification failed. Please try again."));
//     } finally {
//       setIsLoading(false);
//     }
//   }

//   async function resendCode() {
//     if (isLoading) return;
//     setError("");

//     try {
//       if (!signUp) return;
//       const { error } = await signUp.verifications.sendEmailCode();
//       if (error) {
//         setError(getErrorMessage(error, "Couldn't resend the code. Please try again."));
//       }
//     } catch (err) {
//       console.error("Resend failed:", err);
//       setError(getErrorMessage(err, "Couldn't resend the code. Please try again."));
//     }
//   }

//   const isReadyStep = step === 4;
//   const Wrapper = isReadyStep ? GardenBackground : CloudBackground;

//   return (
//     <Wrapper>
//       <div className="min-h-screen flex flex-col items-center px-5 py-10">
//         <h1
//           className={cn(
//             "font-display font-semibold text-2xl sm:text-3xl text-center mb-6",
//             isReadyStep ? "text-ink-900" : "text-white"
//           )}
//         >
//           Let's Create Your Learning Adventure <span aria-hidden>✨</span>
//         </h1>

//         <div className={cn("rounded-full px-4 py-3 mb-8", isReadyStep ? "bg-white/70" : "bg-white/10 backdrop-blur")}>
//           <Stepper steps={STEP_LABELS} current={step} />
//         </div>

//         <div
//           className={cn(
//             "w-full max-w-2xl rounded-3xl p-6 sm:p-8 shadow-[var(--shadow-soft)]",
//             isReadyStep ? "bg-white" : "bg-white/10 backdrop-blur-xl border border-white/20"
//           )}
//         >
//           <AnimatePresence mode="wait">
//             <motion.div
//               key={pendingVerification ? "verify" : step}
//               initial={{ opacity: 0, x: 24 }}
//               animate={{ opacity: 1, x: 0 }}
//               exit={{ opacity: 0, x: -24 }}
//               transition={{ duration: 0.3 }}
//             >
//               {step === 0 && (
//                 <div className="flex flex-col gap-5">
//                   {error && (
//                     <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-xl text-sm">
//                       {error}
//                     </div>
//                   )}

//                   <button
//                     type="button"
//                     onClick={continueWithGoogle}
//                     disabled={isLoading}
//                     className="flex items-center justify-center gap-2 w-full rounded-2xl bg-white px-4 py-3 font-semibold text-ink-900 shadow-md hover:opacity-90 disabled:opacity-50 transition"
//                   >
//                     <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden>
//                       <path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.9c1.7-1.57 2.7-3.88 2.7-6.62z" />
//                       <path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.9-2.26c-.8.54-1.84.86-3.06.86-2.35 0-4.34-1.59-5.05-3.72H.98v2.33A9 9 0 0 0 9 18z" />
//                       <path fill="#FBBC05" d="M3.95 10.7A5.4 5.4 0 0 1 3.67 9c0-.59.1-1.17.28-1.7V4.97H.98A9 9 0 0 0 0 9c0 1.45.35 2.83.98 4.03l2.97-2.33z" />
//                       <path fill="#EA4335" d="M9 3.58c1.32 0 2.51.46 3.44 1.35l2.58-2.58C13.46.89 11.43 0 9 0A9 9 0 0 0 .98 4.97l2.97 2.33C4.66 5.17 6.65 3.58 9 3.58z" />
//                     </svg>
//                     Continue with Google
//                   </button>

//                   <div className="flex items-center gap-3">
//                     <div className="h-px flex-1 bg-white/20" />
//                     <span className="text-xs font-semibold text-purple-100">OR</span>
//                     <div className="h-px flex-1 bg-white/20" />
//                   </div>

//                   <label className="block">
//                     <span className="text-sm font-semibold text-purple-100">Email Address</span>
//                     <input
//                       type="email"
//                       value={email}
//                       onChange={(e) => setEmail(e.target.value)}
//                       placeholder="you@example.com"
//                       autoComplete="email"
//                       className="mt-1.5 w-full rounded-2xl bg-white/90 px-4 py-3 text-ink-900 placeholder:text-ink-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-300"
//                     />
//                   </label>

//                   <label className="block">
//                     <span className="text-sm font-semibold text-purple-100">Password (min 6 characters)</span>
//                     <input
//                       type="password"
//                       value={password}
//                       onChange={(e) => setPassword(e.target.value)}
//                       placeholder="••••••••"
//                       autoComplete="new-password"
//                       className="mt-1.5 w-full rounded-2xl bg-white/90 px-4 py-3 text-ink-900 placeholder:text-ink-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-300"
//                     />
//                   </label>

//                   <label className="block">
//                     <span className="text-sm font-semibold text-purple-100">Child's Name</span>
//                     <input
//                       value={draft.name}
//                       onChange={(e) => updateDraft({ name: e.target.value })}
//                       placeholder="e.g. Aarav"
//                       autoComplete="off"
//                       className="mt-1.5 w-full rounded-2xl bg-white/90 px-4 py-3 text-ink-900 placeholder:text-ink-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-300"
//                     />
//                   </label>

//                   <label className="block">
//                     <span className="text-sm font-semibold text-purple-100">Nickname (optional)</span>
//                     <input
//                       value={draft.nickname}
//                       onChange={(e) => updateDraft({ nickname: e.target.value })}
//                       placeholder="e.g. Aar"
//                       className="mt-1.5 w-full rounded-2xl bg-white/90 px-4 py-3 text-ink-900 placeholder:text-ink-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-300"
//                     />
//                   </label>

//                   <div>
//                     <span className="text-sm font-semibold text-purple-100">Profile Avatar</span>
//                     <div className="flex flex-wrap gap-3 mt-2">
//                       {AVATARS.map((avatar) => {
//                         const selected = draft.avatar === avatar;
//                         return (
//                           <button
//                             key={avatar}
//                             type="button"
//                             onClick={() => updateDraft({ avatar })}
//                             aria-pressed={selected}
//                             className={cn(
//                               "w-14 h-14 rounded-full text-2xl flex items-center justify-center bg-white/90 border-2 transition-all",
//                               selected ? "border-purple-500 scale-110 shadow-[var(--shadow-glow-purple)]" : "border-transparent"
//                             )}
//                           >
//                             {avatar}
//                           </button>
//                         );
//                       })}
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {step === 1 && (
//                 <div className="grid gap-4">
//                   {AGE_CARDS.map((card) => {
//                     const selected = draft.ageRange === card.range;
//                     return (
//                       <button
//                         key={card.range}
//                         type="button"
//                         onClick={() => updateDraft({ ageRange: card.range })}
//                         className={cn(
//                           "text-left rounded-2xl p-5 flex items-center gap-4 border-2 transition-all bg-white/95",
//                           selected ? "border-purple-500 shadow-[var(--shadow-glow-purple)] scale-[1.01]" : "border-transparent"
//                         )}
//                       >
//                         <span className="text-4xl" aria-hidden>{card.emoji}</span>
//                         <div className="flex-1">
//                           <p className="font-display font-semibold text-lg text-ink-900">
//                             {card.title}
//                             <span className="text-ink-500 font-normal text-base"> · Age {ageLabel[card.range]}</span>
//                           </p>
//                           <p className="text-ink-500 text-sm">{card.blurb}</p>
//                         </div>
//                         {selected && <span className="text-purple-500 text-2xl">✓</span>}
//                       </button>
//                     );
//                   })}
//                 </div>
//               )}

//               {step === 2 && (
//                 <div>
//                   <h2 className="font-display font-semibold text-xl mb-4 text-white">
//                     How can we personalize the adventure?
//                   </h2>
//                   <div className="grid gap-4">
//                     {CONDITION_CARDS.map((card) => {
//                       const selected = draft.condition === card.key;
//                       return (
//                         <button
//                           key={card.key}
//                           type="button"
//                           onClick={() => updateDraft({ condition: card.key })}
//                           className={cn(
//                             "text-left rounded-2xl p-5 flex items-start gap-4 border-2 transition-all bg-white/95",
//                             selected ? "border-purple-500 shadow-[var(--shadow-glow-purple)]" : "border-transparent"
//                           )}
//                         >
//                           <span className="text-3xl" aria-hidden>{card.emoji}</span>
//                           <div className="flex-1">
//                             <p className="font-display font-semibold text-ink-900">{card.title}</p>
//                             <p className="text-ink-500 text-sm mt-1">{card.blurb}</p>
//                           </div>
//                           {selected && <span className="text-purple-500 text-2xl">✓</span>}
//                         </button>
//                       );
//                     })}
//                   </div>
//                   <p className="text-xs mt-4 text-center italic px-4 text-purple-100">
//                     This information helps personalize educational support. InspireNest
//                     does not diagnose or treat medical conditions.
//                   </p>
//                 </div>
//               )}

//               {step === 3 && (
//                 <div className="flex flex-col gap-6">
//                   <div>
//                     <h2 className="font-display font-semibold text-xl mb-3 text-white">
//                       What makes learning fun for you?
//                     </h2>
//                     <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
//                       {PREFERENCES.map((preference) => {
//                         const selected = draft.preferences.includes(preference.key);
//                         return (
//                           <button
//                             key={preference.key}
//                             type="button"
//                             onClick={() => togglePreference(preference.key)}
//                             aria-pressed={selected}
//                             className={cn(
//                               "rounded-2xl p-4 flex flex-col items-center gap-1.5 border-2 bg-white/95 transition-all",
//                               selected ? "border-purple-500 scale-105 shadow-[var(--shadow-glow-purple)]" : "border-transparent"
//                             )}
//                           >
//                             <span className="text-2xl">{preference.emoji}</span>
//                             <span className="text-sm font-semibold text-ink-900">{preference.label}</span>
//                           </button>
//                         );
//                       })}
//                     </div>
//                   </div>

//                   <div>
//                     <h3 className="font-semibold mb-2 text-purple-100">Preferred Session Length</h3>
//                     <div className="grid grid-cols-3 gap-3">
//                       {SESSION_LENGTHS.map((session) => {
//                         const selected = draft.sessionDuration === session.value;
//                         return (
//                           <button
//                             key={session.value}
//                             type="button"
//                             onClick={() => updateDraft({ sessionDuration: session.value })}
//                             className={cn(
//                               "rounded-2xl p-3 flex flex-col items-center gap-1 border-2 bg-white/95 transition-all",
//                               selected ? "border-purple-500 shadow-[var(--shadow-glow-purple)]" : "border-transparent"
//                             )}
//                           >
//                             <span className="text-xl">{session.emoji}</span>
//                             <span className="text-xs font-semibold text-ink-900">{session.label}</span>
//                           </button>
//                         );
//                       })}
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {step === 4 && !pendingVerification && (
//                 <div className="text-center flex flex-col items-center gap-4">
//                   <motion.div
//                     animate={{ scale: [1, 1.1, 1] }}
//                     transition={{ duration: 2, repeat: Infinity }}
//                     className="text-6xl"
//                     aria-hidden
//                   >
//                     ✨
//                   </motion.div>
//                   <h2 className="font-display font-semibold text-2xl text-ink-900">
//                     Your Learning Universe is Ready! ✨
//                   </h2>
//                   <div className="w-full max-w-sm bg-purple-50 rounded-2xl p-5 text-left flex flex-col gap-2">
//                     <p className="text-ink-700"><span className="font-semibold">Email:</span> {email || "—"}</p>
//                     <p className="text-ink-700"><span className="font-semibold">Name:</span> {draft.name || "Explorer"}</p>
//                     <p className="text-ink-700">
//                       <span className="font-semibold">Age Group:</span> {draft.ageRange ? ageLabel[draft.ageRange] : "—"}
//                     </p>
//                     <p className="text-ink-700">
//                       <span className="font-semibold">Learning Support:</span>{" "}
//                       {draft.condition ? conditionLabel[draft.condition] : "—"}
//                     </p>
//                   </div>
//                   <p className="text-ink-500">Your adventure is about to begin.</p>
//                   <Button size="xl" onClick={finish} disabled={isLoading}>
//                     {isLoading ? "Creating Account..." : "Enter Wonder Garden 🌈"}
//                   </Button>
//                   {error && (
//                     <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-xl text-sm max-w-sm">
//                       {error}
//                     </div>
//                   )}
//                 </div>
//               )}

//               {step === 4 && pendingVerification && (
//                 <div className="text-center flex flex-col items-center gap-4">
//                   <div className="text-6xl" aria-hidden>✉️</div>
//                   <h2 className="font-display font-semibold text-2xl text-ink-900">Check your email</h2>
//                   <p className="text-ink-500 max-w-sm">
//                     We sent a 6-digit code to <span className="font-semibold">{email}</span>. Enter it below
//                     to finish creating your account.
//                   </p>
//                   <input
//                     value={code}
//                     onChange={(event) => setCode(event.target.value.replace(/\D/g, "").slice(0, 6))}
//                     placeholder="123456"
//                     inputMode="numeric"
//                     maxLength={6}
//                     className="w-full max-w-xs text-center text-lg tracking-[0.4em] rounded-2xl bg-white/90 px-4 py-3 text-ink-900 placeholder:text-ink-300 placeholder:tracking-normal focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-300"
//                   />
//                   <Button size="xl" onClick={verifyCode} disabled={isLoading || code.length !== 6}>
//                     {isLoading ? "Verifying..." : "Verify & Enter 🌈"}
//                   </Button>
//                   <button
//                     type="button"
//                     onClick={resendCode}
//                     disabled={isLoading}
//                     className="text-sm font-semibold text-purple-600 hover:underline disabled:opacity-50"
//                   >
//                     Resend code
//                   </button>
//                   {error && (
//                     <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-xl text-sm max-w-sm">
//                       {error}
//                     </div>
//                   )}
//                 </div>
//               )}
//             </motion.div>
//           </AnimatePresence>
//         </div>

//         {!isReadyStep && (
//           <div className="flex items-center gap-3 mt-6">
//             {step > 0 && (
//               <Button variant="secondary" size="md" onClick={back}>
//                 Back
//               </Button>
//             )}
//             <Button size="md" onClick={next} disabled={!canNext}>
//               Continue
//             </Button>
//           </div>
//         )}
//       </div>
//     </Wrapper>
//   );
// }





//final code 

// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { AnimatePresence, motion } from "framer-motion";
// import { useSignUp, useUser, useAuth, useClerk } from "@clerk/react";

// import { CloudBackground } from "@/components/backgrounds/CloudBackground";
// import { GardenBackground } from "@/components/backgrounds/GardenBackground";
// import { Button } from "@/components/ui/Button";
// import { Stepper } from "@/components/ui/Stepper";

// import { useChildProfileStore } from "@/stores/childProfileStore";
// import { cn } from "@/lib/cn";
// import { saveUserProfile } from "@/lib/api";

// import {
//   AVATARS,
//   AGE_CARDS,
//   CONDITION_CARDS,
//   PREFERENCES,
//   SESSION_LENGTHS,
//   ageLabel,
//   conditionLabel,
// } from "@/lib/Registrationoptions";

// const STEP_LABELS = ["Child", "Age", "Support", "Preferences", "Ready"];

// function getErrorMessage(err: unknown, fallback: string): string {
//   if (!err || typeof err !== "object") return fallback;
//   const e = err as { errors?: { message?: string; code?: string }[]; message?: string };
//   return e.errors?.[0]?.message || e.message || fallback;
// }

// export default function Register() {
//   const [step, setStep] = useState(0);

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState("");

//   const [pendingVerification, setPendingVerification] = useState(false);
//   const [code, setCode] = useState("");

//   const [showSuccess, setShowSuccess] = useState(false);
//   const [signingOut, setSigningOut] = useState(false);

//   const { draft, updateDraft, togglePreference, completeRegistration } = useChildProfileStore();

//   const { signUp } = useSignUp();
//   const { user } = useUser();
//   const { getToken, isLoaded, isSignedIn } = useAuth();
//   const { signOut } = useClerk();

//   const navigate = useNavigate();

//   const canNext = [
//     draft.name.trim().length > 0 && email.trim().length > 0 && password.length >= 6,
//     !!draft.ageRange,
//     !!draft.condition,
//     draft.preferences.length > 0,
//     true,
//   ][step];

//   function next() {
//     setError("");
//     if (step < STEP_LABELS.length - 1) setStep((current) => current + 1);
//   }

//   function back() {
//     setError("");
//     if (step > 0) setStep((current) => current - 1);
//   }

//   async function persistProfile() {
//     if (!user) {
//       throw new Error("User information is not available.");
//     }

//     const emailAddress = user.primaryEmailAddress?.emailAddress || email;

//     if (!emailAddress) {
//       throw new Error("User email address is not available.");
//     }

//     console.log("💾 Saving user profile to MongoDB...", { clerkId: user.id, email: emailAddress });

//     const result = await saveUserProfile(getToken, {
//       clerkId: user.id,
//       email: emailAddress,
//       name: draft.name.trim(),
//       nickname: draft.nickname?.trim() || "",
//       avatar: draft.avatar || "😊",
//       ageRange: draft.ageRange || "",
//       condition: draft.condition || "",
//       preferences: draft.preferences || [],
//       sessionDuration: draft.sessionDuration || 10,
//     });

//     console.log("✅ MongoDB profile saved:", result);

//     return result;
//   }

//   async function continueWithGoogle() {
//     setError("");

//     try {
//       if (!signUp) {
//         throw new Error("Sign up is not ready yet.");
//       }

//       const { error } = await signUp.sso({
//         strategy: "oauth_google",
//         redirectCallbackUrl: "/sso-callback",
//         redirectUrl: "/dashboard",
//       });

//       if (error) {
//         setError(getErrorMessage(error, "Couldn't start Google sign-up. Please try again."));
//       }
//     } catch (err) {
//       console.error("Google sign-up failed:", err);
//       setError(getErrorMessage(err, "Couldn't start Google sign-up. Please try again."));
//     }
//   }

//   async function finish() {
//     if (isLoading) return;

//     setIsLoading(true);
//     setError("");

//     try {
//       if (!signUp) {
//         throw new Error("Sign up is not ready yet.");
//       }

//       if (!email.trim()) {
//         setError("Please enter your email address.");
//         return;
//       }

//       if (password.length < 6) {
//         setError("Password must contain at least 6 characters.");
//         return;
//       }

//       const { error } = await signUp.password({
//         emailAddress: email.trim(),
//         password,
//         firstName: draft.name.trim(),
//       });

//       if (error) {
//         console.error("signUp.password() error:", error);
//         setError(getErrorMessage(error, "Failed to create account. Please try again."));
//         return;
//       }

//       if (signUp.status === "complete") {
//         const { error: finalizeError } = await signUp.finalize();
//         if (finalizeError) {
//           setError(getErrorMessage(finalizeError, "Couldn't finish signing you in."));
//           return;
//         }

//         await persistProfile();
//         completeRegistration();
//         setShowSuccess(true);
//         return;
//       }

//       if (signUp.status === "missing_requirements") {
//         const { error: codeError } = await signUp.verifications.sendEmailCode();
//         if (codeError) {
//           setError(getErrorMessage(codeError, "Couldn't send the verification code."));
//           return;
//         }
//         setPendingVerification(true);
//         return;
//       }

//       console.log("Incomplete signup:", signUp.status);
//       setError("Your account could not be completed. Please try again.");
//     } catch (err) {
//       console.error("Registration failed:", err);
//       setError(getErrorMessage(err, "Failed to create account. Please try again."));
//     } finally {
//       setIsLoading(false);
//     }
//   }

//   async function verifyCode() {
//     if (isLoading) return;

//     setIsLoading(true);
//     setError("");

//     try {
//       if (!signUp) {
//         throw new Error("Sign up is not ready yet.");
//       }

//       if (code.length !== 6) {
//         setError("Please enter the 6-digit verification code.");
//         return;
//       }

//       const { error } = await signUp.verifications.verifyEmailCode({ code });

//       if (error) {
//         console.error("verifyEmailCode() error:", error);
//         setError(getErrorMessage(error, "That code didn't work. Please check your email and try again."));
//         return;
//       }

//       if (signUp.status === "complete") {
//         const { error: finalizeError } = await signUp.finalize();
//         if (finalizeError) {
//           setError(getErrorMessage(finalizeError, "Couldn't finish signing you in."));
//           return;
//         }

//         await persistProfile();
//         completeRegistration();
//         setShowSuccess(true);
//         return;
//       }

//       setError("That code didn't work. Please check your email and try again.");
//     } catch (err) {
//       console.error("Verification failed:", err);
//       setError(getErrorMessage(err, "Verification failed. Please try again."));
//     } finally {
//       setIsLoading(false);
//     }
//   }

//   async function resendCode() {
//     if (isLoading) return;
//     setError("");

//     try {
//       if (!signUp) return;
//       const { error } = await signUp.verifications.sendEmailCode();
//       if (error) {
//         setError(getErrorMessage(error, "Couldn't resend the code. Please try again."));
//       }
//     } catch (err) {
//       console.error("Resend failed:", err);
//       setError(getErrorMessage(err, "Couldn't resend the code. Please try again."));
//     }
//   }

//   async function handleSignOutAndContinue() {
//     setSigningOut(true);
//     try {
//       await signOut();
//     } catch (err) {
//       console.error("Sign out failed:", err);
//     } finally {
//       setSigningOut(false);
//     }
//   }

//   const isReadyStep = step === 4;
//   const Wrapper = isReadyStep ? GardenBackground : CloudBackground;

//   // This is what fixes "session already exists": Clerk won't let
//   // signUp.password() or signUp.sso() create a new account while a
//   // session from a previous test is still active in this browser. Rather
//   // than let that call fail silently mid-flow, we catch it here up front
//   // with a clear explanation and a one-click way to clear the old session.
//   if (isLoaded && isSignedIn) {
//     return (
//       <CloudBackground>
//         <div className="min-h-screen flex items-center justify-center px-5">
//           <div className="w-full max-w-md rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 p-8 text-center shadow-[var(--shadow-soft)]">
//             <div className="text-5xl mb-4" aria-hidden>🔐</div>
//             <h2 className="font-display font-semibold text-2xl text-white mb-2">
//               You're already signed in
//             </h2>
//             <p className="text-purple-100 mb-6">
//               This browser has an active session from a previous sign-in. To create a new
//               account, sign out first, then try again.
//             </p>
//             <div className="flex flex-col gap-3">
//               <Button size="xl" onClick={handleSignOutAndContinue} disabled={signingOut}>
//                 {signingOut ? "Signing out..." : "Sign out & continue"}
//               </Button>
//               <Button variant="secondary" size="md" onClick={() => navigate("/dashboard")}>
//                 Go to Dashboard instead
//               </Button>
//             </div>
//           </div>
//         </div>
//       </CloudBackground>
//     );
//   }

//   return (
//     <Wrapper>
//       <div className="min-h-screen flex flex-col items-center px-5 py-10">
//         <h1
//           className={cn(
//             "font-display font-semibold text-2xl sm:text-3xl text-center mb-6",
//             isReadyStep ? "text-ink-900" : "text-white"
//           )}
//         >
//           Let's Create Your Learning Adventure <span aria-hidden>✨</span>
//         </h1>

//         <div className={cn("rounded-full px-4 py-3 mb-8", isReadyStep ? "bg-white/70" : "bg-white/10 backdrop-blur")}>
//           <Stepper steps={STEP_LABELS} current={step} />
//         </div>

//         <div
//           className={cn(
//             "w-full max-w-2xl rounded-3xl p-6 sm:p-8 shadow-[var(--shadow-soft)]",
//             isReadyStep ? "bg-white" : "bg-white/10 backdrop-blur-xl border border-white/20"
//           )}
//         >
//           <AnimatePresence mode="wait">
//             <motion.div
//               key={pendingVerification ? "verify" : step}
//               initial={{ opacity: 0, x: 24 }}
//               animate={{ opacity: 1, x: 0 }}
//               exit={{ opacity: 0, x: -24 }}
//               transition={{ duration: 0.3 }}
//             >
//               {step === 0 && (
//                 <div className="flex flex-col gap-5">
//                   {error && (
//                     <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-xl text-sm">
//                       {error}
//                     </div>
//                   )}

//                   <button
//                     type="button"
//                     onClick={continueWithGoogle}
//                     disabled={isLoading}
//                     className="flex items-center justify-center gap-2 w-full rounded-2xl bg-white px-4 py-3 font-semibold text-ink-900 shadow-md hover:opacity-90 disabled:opacity-50 transition"
//                   >
//                     <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden>
//                       <path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.9c1.7-1.57 2.7-3.88 2.7-6.62z" />
//                       <path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.9-2.26c-.8.54-1.84.86-3.06.86-2.35 0-4.34-1.59-5.05-3.72H.98v2.33A9 9 0 0 0 9 18z" />
//                       <path fill="#FBBC05" d="M3.95 10.7A5.4 5.4 0 0 1 3.67 9c0-.59.1-1.17.28-1.7V4.97H.98A9 9 0 0 0 0 9c0 1.45.35 2.83.98 4.03l2.97-2.33z" />
//                       <path fill="#EA4335" d="M9 3.58c1.32 0 2.51.46 3.44 1.35l2.58-2.58C13.46.89 11.43 0 9 0A9 9 0 0 0 .98 4.97l2.97 2.33C4.66 5.17 6.65 3.58 9 3.58z" />
//                     </svg>
//                     Continue with Google
//                   </button>

//                   <div className="flex items-center gap-3">
//                     <div className="h-px flex-1 bg-white/20" />
//                     <span className="text-xs font-semibold text-purple-100">OR</span>
//                     <div className="h-px flex-1 bg-white/20" />
//                   </div>

//                   <label className="block">
//                     <span className="text-sm font-semibold text-purple-100">Email Address</span>
//                     <input
//                       type="email"
//                       value={email}
//                       onChange={(e) => setEmail(e.target.value)}
//                       placeholder="you@example.com"
//                       autoComplete="email"
//                       className="mt-1.5 w-full rounded-2xl bg-white/90 px-4 py-3 text-ink-900 placeholder:text-ink-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-300"
//                     />
//                   </label>

//                   <label className="block">
//                     <span className="text-sm font-semibold text-purple-100">Password (min 6 characters)</span>
//                     <input
//                       type="password"
//                       value={password}
//                       onChange={(e) => setPassword(e.target.value)}
//                       placeholder="••••••••"
//                       autoComplete="new-password"
//                       className="mt-1.5 w-full rounded-2xl bg-white/90 px-4 py-3 text-ink-900 placeholder:text-ink-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-300"
//                     />
//                   </label>

//                   <label className="block">
//                     <span className="text-sm font-semibold text-purple-100">Child's Name</span>
//                     <input
//                       value={draft.name}
//                       onChange={(e) => updateDraft({ name: e.target.value })}
//                       placeholder="e.g. Aarav"
//                       autoComplete="off"
//                       className="mt-1.5 w-full rounded-2xl bg-white/90 px-4 py-3 text-ink-900 placeholder:text-ink-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-300"
//                     />
//                   </label>

//                   <label className="block">
//                     <span className="text-sm font-semibold text-purple-100">Nickname (optional)</span>
//                     <input
//                       value={draft.nickname}
//                       onChange={(e) => updateDraft({ nickname: e.target.value })}
//                       placeholder="e.g. Aar"
//                       className="mt-1.5 w-full rounded-2xl bg-white/90 px-4 py-3 text-ink-900 placeholder:text-ink-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-300"
//                     />
//                   </label>

//                   <div>
//                     <span className="text-sm font-semibold text-purple-100">Profile Avatar</span>
//                     <div className="flex flex-wrap gap-3 mt-2">
//                       {AVATARS.map((avatar) => {
//                         const selected = draft.avatar === avatar;
//                         return (
//                           <button
//                             key={avatar}
//                             type="button"
//                             onClick={() => updateDraft({ avatar })}
//                             aria-pressed={selected}
//                             className={cn(
//                               "w-14 h-14 rounded-full text-2xl flex items-center justify-center bg-white/90 border-2 transition-all",
//                               selected ? "border-purple-500 scale-110 shadow-[var(--shadow-glow-purple)]" : "border-transparent"
//                             )}
//                           >
//                             {avatar}
//                           </button>
//                         );
//                       })}
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {step === 1 && (
//                 <div className="grid gap-4">
//                   {AGE_CARDS.map((card) => {
//                     const selected = draft.ageRange === card.range;
//                     return (
//                       <button
//                         key={card.range}
//                         type="button"
//                         onClick={() => updateDraft({ ageRange: card.range })}
//                         className={cn(
//                           "text-left rounded-2xl p-5 flex items-center gap-4 border-2 transition-all bg-white/95",
//                           selected ? "border-purple-500 shadow-[var(--shadow-glow-purple)] scale-[1.01]" : "border-transparent"
//                         )}
//                       >
//                         <span className="text-4xl" aria-hidden>{card.emoji}</span>
//                         <div className="flex-1">
//                           <p className="font-display font-semibold text-lg text-ink-900">
//                             {card.title}
//                             <span className="text-ink-500 font-normal text-base"> · Age {ageLabel[card.range]}</span>
//                           </p>
//                           <p className="text-ink-500 text-sm">{card.blurb}</p>
//                         </div>
//                         {selected && <span className="text-purple-500 text-2xl">✓</span>}
//                       </button>
//                     );
//                   })}
//                 </div>
//               )}

//               {step === 2 && (
//                 <div>
//                   <h2 className="font-display font-semibold text-xl mb-4 text-white">
//                     How can we personalize the adventure?
//                   </h2>
//                   <div className="grid gap-4">
//                     {CONDITION_CARDS.map((card) => {
//                       const selected = draft.condition === card.key;
//                       return (
//                         <button
//                           key={card.key}
//                           type="button"
//                           onClick={() => updateDraft({ condition: card.key })}
//                           className={cn(
//                             "text-left rounded-2xl p-5 flex items-start gap-4 border-2 transition-all bg-white/95",
//                             selected ? "border-purple-500 shadow-[var(--shadow-glow-purple)]" : "border-transparent"
//                           )}
//                         >
//                           <span className="text-3xl" aria-hidden>{card.emoji}</span>
//                           <div className="flex-1">
//                             <p className="font-display font-semibold text-ink-900">{card.title}</p>
//                             <p className="text-ink-500 text-sm mt-1">{card.blurb}</p>
//                           </div>
//                           {selected && <span className="text-purple-500 text-2xl">✓</span>}
//                         </button>
//                       );
//                     })}
//                   </div>
//                   <p className="text-xs mt-4 text-center italic px-4 text-purple-100">
//                     This information helps personalize educational support. InspireNest
//                     does not diagnose or treat medical conditions.
//                   </p>
//                 </div>
//               )}

//               {step === 3 && (
//                 <div className="flex flex-col gap-6">
//                   <div>
//                     <h2 className="font-display font-semibold text-xl mb-3 text-white">
//                       What makes learning fun for you?
//                     </h2>
//                     <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
//                       {PREFERENCES.map((preference) => {
//                         const selected = draft.preferences.includes(preference.key);
//                         return (
//                           <button
//                             key={preference.key}
//                             type="button"
//                             onClick={() => togglePreference(preference.key)}
//                             aria-pressed={selected}
//                             className={cn(
//                               "rounded-2xl p-4 flex flex-col items-center gap-1.5 border-2 bg-white/95 transition-all",
//                               selected ? "border-purple-500 scale-105 shadow-[var(--shadow-glow-purple)]" : "border-transparent"
//                             )}
//                           >
//                             <span className="text-2xl">{preference.emoji}</span>
//                             <span className="text-sm font-semibold text-ink-900">{preference.label}</span>
//                           </button>
//                         );
//                       })}
//                     </div>
//                   </div>

//                   <div>
//                     <h3 className="font-semibold mb-2 text-purple-100">Preferred Session Length</h3>
//                     <div className="grid grid-cols-3 gap-3">
//                       {SESSION_LENGTHS.map((session) => {
//                         const selected = draft.sessionDuration === session.value;
//                         return (
//                           <button
//                             key={session.value}
//                             type="button"
//                             onClick={() => updateDraft({ sessionDuration: session.value })}
//                             className={cn(
//                               "rounded-2xl p-3 flex flex-col items-center gap-1 border-2 bg-white/95 transition-all",
//                               selected ? "border-purple-500 shadow-[var(--shadow-glow-purple)]" : "border-transparent"
//                             )}
//                           >
//                             <span className="text-xl">{session.emoji}</span>
//                             <span className="text-xs font-semibold text-ink-900">{session.label}</span>
//                           </button>
//                         );
//                       })}
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {step === 4 && !pendingVerification && (
//                 <div className="text-center flex flex-col items-center gap-4">
//                   <motion.div
//                     animate={{ scale: [1, 1.1, 1] }}
//                     transition={{ duration: 2, repeat: Infinity }}
//                     className="text-6xl"
//                     aria-hidden
//                   >
//                     ✨
//                   </motion.div>
//                   <h2 className="font-display font-semibold text-2xl text-ink-900">
//                     Your Learning Universe is Ready! ✨
//                   </h2>
//                   <div className="w-full max-w-sm bg-purple-50 rounded-2xl p-5 text-left flex flex-col gap-2">
//                     <p className="text-ink-700"><span className="font-semibold">Email:</span> {email || "—"}</p>
//                     <p className="text-ink-700"><span className="font-semibold">Name:</span> {draft.name || "Explorer"}</p>
//                     <p className="text-ink-700">
//                       <span className="font-semibold">Age Group:</span> {draft.ageRange ? ageLabel[draft.ageRange] : "—"}
//                     </p>
//                     <p className="text-ink-700">
//                       <span className="font-semibold">Learning Support:</span>{" "}
//                       {draft.condition ? conditionLabel[draft.condition] : "—"}
//                     </p>
//                   </div>
//                   <p className="text-ink-500">Your adventure is about to begin.</p>
//                   <Button size="xl" onClick={finish} disabled={isLoading}>
//                     {isLoading ? "Creating Account..." : "Enter Wonder Garden 🌈"}
//                   </Button>
//                   {error && (
//                     <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-xl text-sm max-w-sm">
//                       {error}
//                     </div>
//                   )}
//                 </div>
//               )}

//               {step === 4 && pendingVerification && (
//                 <div className="text-center flex flex-col items-center gap-4">
//                   <div className="text-6xl" aria-hidden>✉️</div>
//                   <h2 className="font-display font-semibold text-2xl text-ink-900">Check your email</h2>
//                   <p className="text-ink-500 max-w-sm">
//                     We sent a 6-digit code to <span className="font-semibold">{email}</span>. Enter it below
//                     to finish creating your account.
//                   </p>
//                   <input
//                     value={code}
//                     onChange={(event) => setCode(event.target.value.replace(/\D/g, "").slice(0, 6))}
//                     placeholder="123456"
//                     inputMode="numeric"
//                     maxLength={6}
//                     className="w-full max-w-xs text-center text-lg tracking-[0.4em] rounded-2xl bg-white/90 px-4 py-3 text-ink-900 placeholder:text-ink-300 placeholder:tracking-normal focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-300"
//                   />
//                   <Button size="xl" onClick={verifyCode} disabled={isLoading || code.length !== 6}>
//                     {isLoading ? "Verifying..." : "Verify & Enter 🌈"}
//                   </Button>
//                   <button
//                     type="button"
//                     onClick={resendCode}
//                     disabled={isLoading}
//                     className="text-sm font-semibold text-purple-600 hover:underline disabled:opacity-50"
//                   >
//                     Resend code
//                   </button>
//                   {error && (
//                     <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-xl text-sm max-w-sm">
//                       {error}
//                     </div>
//                   )}
//                 </div>
//               )}
//             </motion.div>
//           </AnimatePresence>
//         </div>

//         {!isReadyStep && (
//           <div className="flex items-center gap-3 mt-6">
//             {step > 0 && (
//               <Button variant="secondary" size="md" onClick={back}>
//                 Back
//               </Button>
//             )}
//             <Button size="md" onClick={next} disabled={!canNext}>
//               Continue
//             </Button>
//           </div>
//         )}
//       </div>

//       <AnimatePresence>
//         {showSuccess && (
//           <motion.div
//             className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-5"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//           >
//             <motion.div
//               className="w-full max-w-sm rounded-3xl bg-white p-8 text-center shadow-2xl"
//               initial={{ opacity: 0, scale: 0.9, y: 20 }}
//               animate={{ opacity: 1, scale: 1, y: 0 }}
//               exit={{ opacity: 0, scale: 0.9, y: 20 }}
//               transition={{ duration: 0.25 }}
//             >
//               <motion.div
//                 animate={{ scale: [1, 1.15, 1] }}
//                 transition={{ duration: 1.2, repeat: Infinity }}
//                 className="text-6xl mb-4"
//                 aria-hidden
//               >
//                 🎉
//               </motion.div>
//               <h2 className="font-display font-semibold text-2xl text-ink-900 mb-2">
//                 Registration Successful!
//               </h2>
//               <p className="text-ink-500 mb-6">
//                 {draft.name || "Your child"}'s profile has been saved. Ready to start the adventure?
//               </p>
//               <Button
//                 size="xl"
//                 onClick={() => {
//                   setShowSuccess(false);
//                   navigate("/dashboard");
//                 }}
//               >
//                 Go to Dashboard 🌈
//               </Button>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </Wrapper>
//   );
// }



//trial 
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { AnimatePresence, motion } from "framer-motion";
// import { useSignUp, useUser, useAuth, useClerk } from "@clerk/react";

// import { CloudBackground } from "@/components/backgrounds/CloudBackground";
// import { GardenBackground } from "@/components/backgrounds/GardenBackground";
// import { Button } from "@/components/ui/Button";
// import { Stepper } from "@/components/ui/Stepper";

// import { useChildProfileStore } from "@/stores/childProfileStore";
// import { cn } from "@/lib/cn";
// import { saveUserProfile } from "@/lib/api";

// import {
//   AVATARS,
//   AGE_CARDS,
//   CONDITION_CARDS,
//   PREFERENCES,
//   SESSION_LENGTHS,
//   ageLabel,
//   conditionLabel,
// } from "@/lib/Registrationoptions";

// const STEP_LABELS = ["Child", "Age", "Support", "Preferences", "Ready"];

// // SSOCallback.tsx reads this key back out after the Google redirect
// // completes and actually persists it to MongoDB.
// const PENDING_PROFILE_KEY = "wonderlearn_pending_profile";

// function getErrorMessage(err: unknown, fallback: string): string {
//   if (!err || typeof err !== "object") return fallback;
//   const e = err as { errors?: { message?: string; code?: string }[]; message?: string };
//   return e.errors?.[0]?.message || e.message || fallback;
// }

// export default function Register() {
//   const [step, setStep] = useState(0);

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState("");

//   const [pendingVerification, setPendingVerification] = useState(false);
//   const [code, setCode] = useState("");

//   const [showSuccess, setShowSuccess] = useState(false);
//   const [signingOut, setSigningOut] = useState(false);

//   const { draft, updateDraft, togglePreference, completeRegistration } = useChildProfileStore();

//   const { signUp } = useSignUp();
//   const { user } = useUser();
//   const { getToken, isLoaded, isSignedIn } = useAuth();
//   const { signOut } = useClerk();

//   const navigate = useNavigate();

//   const canNext = [
//     draft.name.trim().length > 0 && email.trim().length > 0 && password.length >= 6,
//     !!draft.ageRange,
//     !!draft.condition,
//     draft.preferences.length > 0,
//     true,
//   ][step];

//   function next() {
//     setError("");
//     if (step < STEP_LABELS.length - 1) setStep((current) => current + 1);
//   }

//   function back() {
//     setError("");
//     if (step > 0) setStep((current) => current - 1);
//   }

//   // FIXED: takes clerkId + emailAddress as arguments instead of reading
//   // `user` from the useUser() hook. Right after signUp.finalize(), the
//   // hook's `user` value hasn't necessarily re-rendered yet, so reading it
//   // here was racing against React state and throwing "User information
//   // is not available." signUp.createdUserId is populated synchronously
//   // the moment finalize() resolves, so it doesn't have that race.
//   async function persistProfile(clerkId: string, emailAddress: string) {
//     if (!clerkId) {
//       throw new Error("User information is not available.");
//     }

//     if (!emailAddress) {
//       throw new Error("User email address is not available.");
//     }

//     console.log("💾 Saving user profile to MongoDB...", { clerkId, email: emailAddress });

//     const result = await saveUserProfile(getToken, {
//       clerkId,
//       email: emailAddress,
//       name: draft.name.trim(),
//       nickname: draft.nickname?.trim() || "",
//       avatar: draft.avatar || "😊",
//       ageRange: draft.ageRange || "",
//       condition: draft.condition || "",
//       preferences: draft.preferences || [],
//       sessionDuration: draft.sessionDuration || 10,
//     });

//     console.log("✅ MongoDB profile saved:", result);

//     return result;
//   }

//   async function continueWithGoogle() {
//     setError("");

//     try {
//       if (!signUp) {
//         throw new Error("Sign up is not ready yet.");
//       }

//       // The Google redirect is a full page navigation — it wipes the
//       // in-memory Zustand draft. Stash whatever's been filled in so far
//       // in sessionStorage so SSOCallback.tsx can read it back and
//       // actually save it to MongoDB once the OAuth round-trip finishes.
//       // Without this, the Google path never calls saveUserProfile() at
//       // all, which is why no document was ever being created.
//       sessionStorage.setItem(
//         PENDING_PROFILE_KEY,
//         JSON.stringify({
//           name: draft.name.trim(),
//           nickname: draft.nickname?.trim() || "",
//           avatar: draft.avatar || "😊",
//           ageRange: draft.ageRange || "",
//           condition: draft.condition || "",
//           preferences: draft.preferences || [],
//           sessionDuration: draft.sessionDuration || 10,
//         })
//       );

//       const { error } = await signUp.sso({
//         strategy: "oauth_google",
//         redirectCallbackUrl: "/sso-callback",
//         redirectUrl: "/dashboard",
//       });

//       if (error) {
//         sessionStorage.removeItem(PENDING_PROFILE_KEY);
//         setError(getErrorMessage(error, "Couldn't start Google sign-up. Please try again."));
//       }
//     } catch (err) {
//       sessionStorage.removeItem(PENDING_PROFILE_KEY);
//       console.error("Google sign-up failed:", err);
//       setError(getErrorMessage(err, "Couldn't start Google sign-up. Please try again."));
//     }
//   }

//   async function signOutAfterRegistration() {
//     try {
//       await signOut();
//     } catch (err) {
//       console.error("Post-registration sign-out failed:", err);
//     }
//   }

//   async function finish() {
//     if (isLoading) return;

//     setIsLoading(true);
//     setError("");

//     try {
//       if (!signUp) {
//         throw new Error("Sign up is not ready yet.");
//       }

//       if (!email.trim()) {
//         setError("Please enter your email address.");
//         return;
//       }

//       if (password.length < 6) {
//         setError("Password must contain at least 6 characters.");
//         return;
//       }

//       const { error } = await signUp.password({
//         emailAddress: email.trim(),
//         password,
//         firstName: draft.name.trim(),
//       });

//       if (error) {
//         console.error("signUp.password() error:", error);
//         setError(getErrorMessage(error, "Failed to create account. Please try again."));
//         return;
//       }

//       if (signUp.status === "complete") {
//         const { error: finalizeError } = await signUp.finalize();
//         if (finalizeError) {
//           setError(getErrorMessage(finalizeError, "Couldn't finish signing you in."));
//           return;
//         }

//         // FIXED: pull the id straight off signUp instead of the
//         // useUser() hook — this is the value that used to be missing.
//         const clerkId = signUp.createdUserId || user?.id;
//         if (!clerkId) {
//           setError("Something went wrong finishing sign-in. Please try again.");
//           return;
//         }

//         await persistProfile(clerkId, email.trim());
//         completeRegistration();
//         await signOutAfterRegistration();
//         setShowSuccess(true);
//         return;
//       }

//       if (signUp.status === "missing_requirements") {
//         const { error: codeError } = await signUp.verifications.sendEmailCode();
//         if (codeError) {
//           setError(getErrorMessage(codeError, "Couldn't send the verification code."));
//           return;
//         }
//         setPendingVerification(true);
//         return;
//       }

//       console.log("Incomplete signup:", signUp.status);
//       setError("Your account could not be completed. Please try again.");
//     } catch (err) {
//       console.error("Registration failed:", err);
//       setError(getErrorMessage(err, "Failed to create account. Please try again."));
//     } finally {
//       setIsLoading(false);
//     }
//   }

//   async function verifyCode() {
//     if (isLoading) return;

//     setIsLoading(true);
//     setError("");

//     try {
//       if (!signUp) {
//         throw new Error("Sign up is not ready yet.");
//       }

//       if (code.length !== 6) {
//         setError("Please enter the 6-digit verification code.");
//         return;
//       }

//       const { error } = await signUp.verifications.verifyEmailCode({ code });

//       if (error) {
//         console.error("verifyEmailCode() error:", error);
//         setError(getErrorMessage(error, "That code didn't work. Please check your email and try again."));
//         return;
//       }

//       if (signUp.status === "complete") {
//         const { error: finalizeError } = await signUp.finalize();
//         if (finalizeError) {
//           setError(getErrorMessage(finalizeError, "Couldn't finish signing you in."));
//           return;
//         }

//         // FIXED: this was the exact call site that threw "User
//         // information is not available." — now uses signUp.createdUserId
//         // instead of racing against the useUser() hook.
//         const clerkId = signUp.createdUserId || user?.id;
//         if (!clerkId) {
//           setError("Something went wrong finishing sign-in. Please try again.");
//           return;
//         }

//         await persistProfile(clerkId, email.trim());
//         completeRegistration();
//         await signOutAfterRegistration();
//         setShowSuccess(true);
//         return;
//       }

//       setError("That code didn't work. Please check your email and try again.");
//     } catch (err) {
//       console.error("Verification failed:", err);
//       setError(getErrorMessage(err, "Verification failed. Please try again."));
//     } finally {
//       setIsLoading(false);
//     }
//   }

//   async function resendCode() {
//     if (isLoading) return;
//     setError("");

//     try {
//       if (!signUp) return;
//       const { error } = await signUp.verifications.sendEmailCode();
//       if (error) {
//         setError(getErrorMessage(error, "Couldn't resend the code. Please try again."));
//       }
//     } catch (err) {
//       console.error("Resend failed:", err);
//       setError(getErrorMessage(err, "Couldn't resend the code. Please try again."));
//     }
//   }

//   async function handleSignOutAndContinue() {
//     setSigningOut(true);
//     try {
//       await signOut();
//     } catch (err) {
//       console.error("Sign out failed:", err);
//     } finally {
//       setSigningOut(false);
//     }
//   }

//   const isReadyStep = step === 4;
//   const Wrapper = isReadyStep ? GardenBackground : CloudBackground;

//   if (isLoaded && isSignedIn) {
//     return (
//       <CloudBackground>
//         <div className="min-h-screen flex items-center justify-center px-5">
//           <div className="w-full max-w-md rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 p-8 text-center shadow-[var(--shadow-soft)]">
//             <div className="text-5xl mb-4" aria-hidden>🔐</div>
//             <h2 className="font-display font-semibold text-2xl text-white mb-2">
//               You're already signed in
//             </h2>
//             <p className="text-purple-100 mb-6">
//               This browser has an active session from a previous sign-in. To create a new
//               account, sign out first, then try again.
//             </p>
//             <div className="flex flex-col gap-3">
//               <Button size="xl" onClick={handleSignOutAndContinue} disabled={signingOut}>
//                 {signingOut ? "Signing out..." : "Sign out & continue"}
//               </Button>
//               <Button variant="secondary" size="md" onClick={() => navigate("/dashboard")}>
//                 Go to Dashboard instead
//               </Button>
//             </div>
//           </div>
//         </div>
//       </CloudBackground>
//     );
//   }

//   return (
//     <Wrapper>
//       <div className="min-h-screen flex flex-col items-center px-5 py-10">
//         <h1
//           className={cn(
//             "font-display font-semibold text-2xl sm:text-3xl text-center mb-6",
//             isReadyStep ? "text-ink-900" : "text-white"
//           )}
//         >
//           Let's Create Your Learning Adventure <span aria-hidden>✨</span>
//         </h1>

//         <div className={cn("rounded-full px-4 py-3 mb-8", isReadyStep ? "bg-white/70" : "bg-white/10 backdrop-blur")}>
//           <Stepper steps={STEP_LABELS} current={step} />
//         </div>

//         <div
//           className={cn(
//             "w-full max-w-2xl rounded-3xl p-6 sm:p-8 shadow-[var(--shadow-soft)]",
//             isReadyStep ? "bg-white" : "bg-white/10 backdrop-blur-xl border border-white/20"
//           )}
//         >
//           <AnimatePresence mode="wait">
//             <motion.div
//               key={pendingVerification ? "verify" : step}
//               initial={{ opacity: 0, x: 24 }}
//               animate={{ opacity: 1, x: 0 }}
//               exit={{ opacity: 0, x: -24 }}
//               transition={{ duration: 0.3 }}
//             >
//               {step === 0 && (
//                 <div className="flex flex-col gap-5">
//                   {error && (
//                     <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-xl text-sm">
//                       {error}
//                     </div>
//                   )}

//                   <button
//                     type="button"
//                     onClick={continueWithGoogle}
//                     disabled={isLoading}
//                     className="flex items-center justify-center gap-2 w-full rounded-2xl bg-white px-4 py-3 font-semibold text-ink-900 shadow-md hover:opacity-90 disabled:opacity-50 transition"
//                   >
//                     <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden>
//                       <path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.9c1.7-1.57 2.7-3.88 2.7-6.62z" />
//                       <path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.9-2.26c-.8.54-1.84.86-3.06.86-2.35 0-4.34-1.59-5.05-3.72H.98v2.33A9 9 0 0 0 9 18z" />
//                       <path fill="#FBBC05" d="M3.95 10.7A5.4 5.4 0 0 1 3.67 9c0-.59.1-1.17.28-1.7V4.97H.98A9 9 0 0 0 0 9c0 1.45.35 2.83.98 4.03l2.97-2.33z" />
//                       <path fill="#EA4335" d="M9 3.58c1.32 0 2.51.46 3.44 1.35l2.58-2.58C13.46.89 11.43 0 9 0A9 9 0 0 0 .98 4.97l2.97 2.33C4.66 5.17 6.65 3.58 9 3.58z" />
//                     </svg>
//                     Continue with Google
//                   </button>

//                   <div className="flex items-center gap-3">
//                     <div className="h-px flex-1 bg-white/20" />
//                     <span className="text-xs font-semibold text-purple-100">OR</span>
//                     <div className="h-px flex-1 bg-white/20" />
//                   </div>

//                   <label className="block">
//                     <span className="text-sm font-semibold text-purple-100">Email Address</span>
//                     <input
//                       type="email"
//                       value={email}
//                       onChange={(e) => setEmail(e.target.value)}
//                       placeholder="you@example.com"
//                       autoComplete="email"
//                       className="mt-1.5 w-full rounded-2xl bg-white/90 px-4 py-3 text-ink-900 placeholder:text-ink-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-300"
//                     />
//                   </label>

//                   <label className="block">
//                     <span className="text-sm font-semibold text-purple-100">Password (min 6 characters)</span>
//                     <input
//                       type="password"
//                       value={password}
//                       onChange={(e) => setPassword(e.target.value)}
//                       placeholder="••••••••"
//                       autoComplete="new-password"
//                       className="mt-1.5 w-full rounded-2xl bg-white/90 px-4 py-3 text-ink-900 placeholder:text-ink-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-300"
//                     />
//                   </label>

//                   <label className="block">
//                     <span className="text-sm font-semibold text-purple-100">Child's Name</span>
//                     <input
//                       value={draft.name}
//                       onChange={(e) => updateDraft({ name: e.target.value })}
//                       placeholder="e.g. Aarav"
//                       autoComplete="off"
//                       className="mt-1.5 w-full rounded-2xl bg-white/90 px-4 py-3 text-ink-900 placeholder:text-ink-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-300"
//                     />
//                   </label>

//                   <label className="block">
//                     <span className="text-sm font-semibold text-purple-100">Nickname (optional)</span>
//                     <input
//                       value={draft.nickname}
//                       onChange={(e) => updateDraft({ nickname: e.target.value })}
//                       placeholder="e.g. Aar"
//                       className="mt-1.5 w-full rounded-2xl bg-white/90 px-4 py-3 text-ink-900 placeholder:text-ink-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-300"
//                     />
//                   </label>

//                   <div>
//                     <span className="text-sm font-semibold text-purple-100">Profile Avatar</span>
//                     <div className="flex flex-wrap gap-3 mt-2">
//                       {AVATARS.map((avatar) => {
//                         const selected = draft.avatar === avatar;
//                         return (
//                           <button
//                             key={avatar}
//                             type="button"
//                             onClick={() => updateDraft({ avatar })}
//                             aria-pressed={selected}
//                             className={cn(
//                               "w-14 h-14 rounded-full text-2xl flex items-center justify-center bg-white/90 border-2 transition-all",
//                               selected ? "border-purple-500 scale-110 shadow-[var(--shadow-glow-purple)]" : "border-transparent"
//                             )}
//                           >
//                             {avatar}
//                           </button>
//                         );
//                       })}
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {step === 1 && (
//                 <div className="grid gap-4">
//                   {AGE_CARDS.map((card) => {
//                     const selected = draft.ageRange === card.range;
//                     return (
//                       <button
//                         key={card.range}
//                         type="button"
//                         onClick={() => updateDraft({ ageRange: card.range })}
//                         className={cn(
//                           "text-left rounded-2xl p-5 flex items-center gap-4 border-2 transition-all bg-white/95",
//                           selected ? "border-purple-500 shadow-[var(--shadow-glow-purple)] scale-[1.01]" : "border-transparent"
//                         )}
//                       >
//                         <span className="text-4xl" aria-hidden>{card.emoji}</span>
//                         <div className="flex-1">
//                           <p className="font-display font-semibold text-lg text-ink-900">
//                             {card.title}
//                             <span className="text-ink-500 font-normal text-base"> · Age {ageLabel[card.range]}</span>
//                           </p>
//                           <p className="text-ink-500 text-sm">{card.blurb}</p>
//                         </div>
//                         {selected && <span className="text-purple-500 text-2xl">✓</span>}
//                       </button>
//                     );
//                   })}
//                 </div>
//               )}

//               {step === 2 && (
//                 <div>
//                   <h2 className="font-display font-semibold text-xl mb-4 text-white">
//                     How can we personalize the adventure?
//                   </h2>
//                   <div className="grid gap-4">
//                     {CONDITION_CARDS.map((card) => {
//                       const selected = draft.condition === card.key;
//                       return (
//                         <button
//                           key={card.key}
//                           type="button"
//                           onClick={() => updateDraft({ condition: card.key })}
//                           className={cn(
//                             "text-left rounded-2xl p-5 flex items-start gap-4 border-2 transition-all bg-white/95",
//                             selected ? "border-purple-500 shadow-[var(--shadow-glow-purple)]" : "border-transparent"
//                           )}
//                         >
//                           <span className="text-3xl" aria-hidden>{card.emoji}</span>
//                           <div className="flex-1">
//                             <p className="font-display font-semibold text-ink-900">{card.title}</p>
//                             <p className="text-ink-500 text-sm mt-1">{card.blurb}</p>
//                           </div>
//                           {selected && <span className="text-purple-500 text-2xl">✓</span>}
//                         </button>
//                       );
//                     })}
//                   </div>
//                   <p className="text-xs mt-4 text-center italic px-4 text-purple-100">
//                     This information helps personalize educational support. InspireNest
//                     does not diagnose or treat medical conditions.
//                   </p>
//                 </div>
//               )}

//               {step === 3 && (
//                 <div className="flex flex-col gap-6">
//                   <div>
//                     <h2 className="font-display font-semibold text-xl mb-3 text-white">
//                       What makes learning fun for you?
//                     </h2>
//                     <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
//                       {PREFERENCES.map((preference) => {
//                         const selected = draft.preferences.includes(preference.key);
//                         return (
//                           <button
//                             key={preference.key}
//                             type="button"
//                             onClick={() => togglePreference(preference.key)}
//                             aria-pressed={selected}
//                             className={cn(
//                               "rounded-2xl p-4 flex flex-col items-center gap-1.5 border-2 bg-white/95 transition-all",
//                               selected ? "border-purple-500 scale-105 shadow-[var(--shadow-glow-purple)]" : "border-transparent"
//                             )}
//                           >
//                             <span className="text-2xl">{preference.emoji}</span>
//                             <span className="text-sm font-semibold text-ink-900">{preference.label}</span>
//                           </button>
//                         );
//                       })}
//                     </div>
//                   </div>

//                   <div>
//                     <h3 className="font-semibold mb-2 text-purple-100">Preferred Session Length</h3>
//                     <div className="grid grid-cols-3 gap-3">
//                       {SESSION_LENGTHS.map((session) => {
//                         const selected = draft.sessionDuration === session.value;
//                         return (
//                           <button
//                             key={session.value}
//                             type="button"
//                             onClick={() => updateDraft({ sessionDuration: session.value })}
//                             className={cn(
//                               "rounded-2xl p-3 flex flex-col items-center gap-1 border-2 bg-white/95 transition-all",
//                               selected ? "border-purple-500 shadow-[var(--shadow-glow-purple)]" : "border-transparent"
//                             )}
//                           >
//                             <span className="text-xl">{session.emoji}</span>
//                             <span className="text-xs font-semibold text-ink-900">{session.label}</span>
//                           </button>
//                         );
//                       })}
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {step === 4 && !pendingVerification && (
//                 <div className="text-center flex flex-col items-center gap-4">
//                   <motion.div
//                     animate={{ scale: [1, 1.1, 1] }}
//                     transition={{ duration: 2, repeat: Infinity }}
//                     className="text-6xl"
//                     aria-hidden
//                   >
//                     ✨
//                   </motion.div>
//                   <h2 className="font-display font-semibold text-2xl text-ink-900">
//                     Your Learning Universe is Ready! ✨
//                   </h2>
//                   <div className="w-full max-w-sm bg-purple-50 rounded-2xl p-5 text-left flex flex-col gap-2">
//                     <p className="text-ink-700"><span className="font-semibold">Email:</span> {email || "—"}</p>
//                     <p className="text-ink-700"><span className="font-semibold">Name:</span> {draft.name || "Explorer"}</p>
//                     <p className="text-ink-700">
//                       <span className="font-semibold">Age Group:</span> {draft.ageRange ? ageLabel[draft.ageRange] : "—"}
//                     </p>
//                     <p className="text-ink-700">
//                       <span className="font-semibold">Learning Support:</span>{" "}
//                       {draft.condition ? conditionLabel[draft.condition] : "—"}
//                     </p>
//                   </div>
//                   <p className="text-ink-500">Your adventure is about to begin.</p>
//                   <Button size="xl" onClick={finish} disabled={isLoading}>
//                     {isLoading ? "Creating Account..." : "Enter Wonder Garden 🌈"}
//                   </Button>
//                   {error && (
//                     <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-xl text-sm max-w-sm">
//                       {error}
//                     </div>
//                   )}
//                 </div>
//               )}

//               {step === 4 && pendingVerification && (
//                 <div className="text-center flex flex-col items-center gap-4">
//                   <div className="text-6xl" aria-hidden>✉️</div>
//                   <h2 className="font-display font-semibold text-2xl text-ink-900">Check your email</h2>
//                   <p className="text-ink-500 max-w-sm">
//                     We sent a 6-digit code to <span className="font-semibold">{email}</span>. Enter it below
//                     to finish creating your account.
//                   </p>
//                   <input
//                     value={code}
//                     onChange={(event) => setCode(event.target.value.replace(/\D/g, "").slice(0, 6))}
//                     placeholder="123456"
//                     inputMode="numeric"
//                     maxLength={6}
//                     className="w-full max-w-xs text-center text-lg tracking-[0.4em] rounded-2xl bg-white/90 px-4 py-3 text-ink-900 placeholder:text-ink-300 placeholder:tracking-normal focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-300"
//                   />
//                   <Button size="xl" onClick={verifyCode} disabled={isLoading || code.length !== 6}>
//                     {isLoading ? "Verifying..." : "Verify & Enter 🌈"}
//                   </Button>
//                   <button
//                     type="button"
//                     onClick={resendCode}
//                     disabled={isLoading}
//                     className="text-sm font-semibold text-purple-600 hover:underline disabled:opacity-50"
//                   >
//                     Resend code
//                   </button>
//                   {error && (
//                     <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-xl text-sm max-w-sm">
//                       {error}
//                     </div>
//                   )}
//                 </div>
//               )}
//             </motion.div>
//           </AnimatePresence>
//         </div>

//         {!isReadyStep && (
//           <div className="flex items-center gap-3 mt-6">
//             {step > 0 && (
//               <Button variant="secondary" size="md" onClick={back}>
//                 Back
//               </Button>
//             )}
//             <Button size="md" onClick={next} disabled={!canNext}>
//               Continue
//             </Button>
//           </div>
//         )}
//       </div>

//       <AnimatePresence>
//         {showSuccess && (
//           <motion.div
//             className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-5"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//           >
//             <motion.div
//               className="w-full max-w-sm rounded-3xl bg-white p-8 text-center shadow-2xl"
//               initial={{ opacity: 0, scale: 0.9, y: 20 }}
//               animate={{ opacity: 1, scale: 1, y: 0 }}
//               exit={{ opacity: 0, scale: 0.9, y: 20 }}
//               transition={{ duration: 0.25 }}
//             >
//               <motion.div
//                 animate={{ scale: [1, 1.15, 1] }}
//                 transition={{ duration: 1.2, repeat: Infinity }}
//                 className="text-6xl mb-4"
//                 aria-hidden
//               >
//                 🎉
//               </motion.div>
//               <h2 className="font-display font-semibold text-2xl text-ink-900 mb-2">
//                 Registration Successful!
//               </h2>
//               <p className="text-ink-500 mb-6">
//                 {draft.name || "Your child"}'s profile has been saved. Please log in to continue.
//               </p>
//               <Button
//                 size="xl"
//                 onClick={() => {
//                   setShowSuccess(false);
//                   navigate("/login");
//                 }}
//               >
//                 Continue to Login 🌈
//               </Button>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </Wrapper>
//   );
// }





//new register page 



// Register.tsx

// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { AnimatePresence, motion } from "framer-motion";
// import { useSignUp, useUser, useAuth, useClerk } from "@clerk/react";

// import { CloudBackground } from "@/components/backgrounds/CloudBackground";
// import { Button } from "@/components/ui/Button";
// import { Stepper } from "@/components/ui/Stepper";

// import { cn } from "@/lib/cn";

// const STEP_LABELS = ["Child", "Ready"];

// function getErrorMessage(err: unknown, fallback: string): string {
//   if (!err || typeof err !== "object") return fallback;

//   const e = err as {
//     errors?: { message?: string; code?: string }[];
//     message?: string;
//   };

//   return e.errors?.[0]?.message || e.message || fallback;
// }

// export default function Register() {
//   const [step, setStep] = useState(0);

//   // ============================================================
//   // BASIC REGISTRATION INFORMATION
//   // ============================================================

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [childName, setChildName] = useState("");
//   const [nickname, setNickname] = useState("");

//   // ============================================================
//   // LOADING / ERROR STATE
//   // ============================================================

//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState("");

//   // ============================================================
//   // EMAIL VERIFICATION STATE
//   // ============================================================

//   const [pendingVerification, setPendingVerification] = useState(false);
//   const [code, setCode] = useState("");

//   // ============================================================
//   // CLERK
//   // ============================================================

//   const { signUp } = useSignUp();
//   const { user } = useUser();
//   const { isLoaded, isSignedIn } = useAuth();
//   const { signOut } = useClerk();

//   // ============================================================
//   // NAVIGATION
//   // ============================================================

//   const navigate = useNavigate();

//   // ============================================================
//   // CHECK WHETHER USER CAN MOVE TO NEXT STEP
//   // ============================================================

//   const canNext = [
//     childName.trim().length > 0 &&
//       email.trim().length > 0 &&
//       password.length >= 6,

//     true,
//   ][step];

//   // ============================================================
//   // NEXT
//   // ============================================================

//   function next() {
//     setError("");

//     if (step < STEP_LABELS.length - 1) {
//       setStep((current) => current + 1);
//     }
//   }

//   // ============================================================
//   // BACK
//   // ============================================================

//   function back() {
//     setError("");

//     if (step > 0) {
//       setStep((current) => current - 1);
//     }
//   }

//   // ============================================================
//   // GOOGLE SIGN-UP
//   // ============================================================

//   async function continueWithGoogle() {
//     setError("");

//     try {
//       if (!signUp) {
//         throw new Error("Sign up is not ready yet.");
//       }

//       const { error } = await signUp.sso({
//         strategy: "oauth_google",

//         // After Google authentication
//         // Clerk will return to this callback
//         redirectCallbackUrl: "/sso-callback",

//         // Final destination
//         redirectUrl: "/dashboard",
//       });

//       if (error) {
//         setError(
//           getErrorMessage(
//             error,
//             "Couldn't start Google sign-up. Please try again."
//           )
//         );
//       }
//     } catch (err) {
//       console.error("Google sign-up failed:", err);

//       setError(
//         getErrorMessage(
//           err,
//           "Couldn't start Google sign-up. Please try again."
//         )
//       );
//     }
//   }

//   // ============================================================
//   // EMAIL + PASSWORD REGISTRATION
//   // ============================================================

//   async function finish() {
//     if (isLoading) return;

//     setIsLoading(true);
//     setError("");

//     try {
//       if (!signUp) {
//         throw new Error("Sign up is not ready yet.");
//       }

//       // --------------------------------------------------------
//       // VALIDATE EMAIL
//       // --------------------------------------------------------

//       if (!email.trim()) {
//         setError("Please enter your email address.");
//         return;
//       }

//       // --------------------------------------------------------
//       // VALIDATE PASSWORD
//       // --------------------------------------------------------

//       if (password.length < 6) {
//         setError("Password must contain at least 6 characters.");
//         return;
//       }

//       // --------------------------------------------------------
//       // VALIDATE CHILD NAME
//       // --------------------------------------------------------

//       if (!childName.trim()) {
//         setError("Please enter the child's name.");
//         return;
//       }

//       // --------------------------------------------------------
//       // CREATE CLERK ACCOUNT
//       // --------------------------------------------------------

//       const { error } = await signUp.password({
//         emailAddress: email.trim(),
//         password,
//         firstName: childName.trim(),
//       });

//       if (error) {
//         console.error("signUp.password() error:", error);

//         setError(
//           getErrorMessage(
//             error,
//             "Failed to create account. Please try again."
//           )
//         );

//         return;
//       }

//       // ========================================================
//       // CASE 1:
//       // EMAIL VERIFICATION IS NOT REQUIRED
//       // ========================================================

//       if (signUp.status === "complete") {
//         const { error: finalizeError } = await signUp.finalize();

//         if (finalizeError) {
//           setError(
//             getErrorMessage(
//               finalizeError,
//               "Couldn't finish signing you in."
//             )
//           );

//           return;
//         }

//         const clerkId = signUp.createdUserId || user?.id;

//         if (!clerkId) {
//           setError(
//             "Something went wrong finishing sign-in. Please try again."
//           );

//           return;
//         }

//         console.log("✅ Clerk account created:", clerkId);

//         // ------------------------------------------------------
//         // IMPORTANT:
//         // DO NOT SIGN OUT
//         //
//         // The user is already authenticated.
//         // Send them directly to Dashboard.
//         // ------------------------------------------------------

//         navigate("/dashboard");

//         return;
//       }

//       // ========================================================
//       // CASE 2:
//       // EMAIL VERIFICATION IS REQUIRED
//       // ========================================================

//       if (signUp.status === "missing_requirements") {
//         const { error: codeError } =
//           await signUp.verifications.sendEmailCode();

//         if (codeError) {
//           setError(
//             getErrorMessage(
//               codeError,
//               "Couldn't send the verification code."
//             )
//           );

//           return;
//         }

//         // Show verification screen
//         setPendingVerification(true);

//         return;
//       }

//       // ========================================================
//       // OTHER / INCOMPLETE STATUS
//       // ========================================================

//       console.log("Incomplete signup:", signUp.status);

//       setError(
//         "Your account could not be completed. Please try again."
//       );
//     } catch (err) {
//       console.error("Registration failed:", err);

//       setError(
//         getErrorMessage(
//           err,
//           "Failed to create account. Please try again."
//         )
//       );
//     } finally {
//       setIsLoading(false);
//     }
//   }

//   // ============================================================
//   // VERIFY EMAIL CODE
//   // ============================================================

//   async function verifyCode() {
//     if (isLoading) return;

//     setIsLoading(true);
//     setError("");

//     try {
//       if (!signUp) {
//         throw new Error("Sign up is not ready yet.");
//       }

//       // --------------------------------------------------------
//       // VALIDATE CODE
//       // --------------------------------------------------------

//       if (code.length !== 6) {
//         setError("Please enter the 6-digit verification code.");
//         return;
//       }

//       // --------------------------------------------------------
//       // VERIFY CODE USING CLERK
//       // --------------------------------------------------------

//       const { error } =
//         await signUp.verifications.verifyEmailCode({
//           code,
//         });

//       if (error) {
//         console.error("verifyEmailCode() error:", error);

//         setError(
//           getErrorMessage(
//             error,
//             "That code didn't work. Please check your email and try again."
//           )
//         );

//         return;
//       }

//       // ========================================================
//       // CHECK WHETHER SIGN-UP IS COMPLETE
//       // ========================================================

//       if (signUp.status === "complete") {
//         // ------------------------------------------------------
//         // FINALIZE CLERK SIGN-UP
//         // ------------------------------------------------------

//         const { error: finalizeError } =
//           await signUp.finalize();

//         if (finalizeError) {
//           setError(
//             getErrorMessage(
//               finalizeError,
//               "Couldn't finish signing you in."
//             )
//           );

//           return;
//         }

//         // ------------------------------------------------------
//         // GET CLERK USER ID
//         // ------------------------------------------------------

//         const clerkId =
//           signUp.createdUserId || user?.id;

//         if (!clerkId) {
//           setError(
//             "Something went wrong finishing sign-in. Please try again."
//           );

//           return;
//         }

//         console.log(
//           "✅ Email verified. Clerk account created:",
//           clerkId
//         );

//         // ======================================================
//         // IMPORTANT:
//         // DO NOT SIGN OUT HERE
//         //
//         // Clerk has now authenticated the user.
//         // Navigate directly to Dashboard.
//         // ======================================================

//         navigate("/dashboard");

//         return;
//       }

//       // ========================================================
//       // VERIFICATION DID NOT COMPLETE
//       // ========================================================

//       setError(
//         "That code didn't work. Please check your email and try again."
//       );
//     } catch (err) {
//       console.error("Verification failed:", err);

//       setError(
//         getErrorMessage(
//           err,
//           "Verification failed. Please try again."
//         )
//       );
//     } finally {
//       setIsLoading(false);
//     }
//   }

//   // ============================================================
//   // RESEND VERIFICATION CODE
//   // ============================================================

//   async function resendCode() {
//     if (isLoading) return;

//     setError("");

//     try {
//       if (!signUp) return;

//       const { error } =
//         await signUp.verifications.sendEmailCode();

//       if (error) {
//         setError(
//           getErrorMessage(
//             error,
//             "Couldn't resend the code. Please try again."
//           )
//         );
//       }
//     } catch (err) {
//       console.error("Resend failed:", err);

//       setError(
//         getErrorMessage(
//           err,
//           "Couldn't resend the code. Please try again."
//         )
//       );
//     }
//   }

//   // ============================================================
//   // SIGN OUT EXISTING USER
//   // ============================================================

//   async function handleSignOutAndContinue() {
//     try {
//       await signOut();
//     } catch (err) {
//       console.error("Sign out failed:", err);
//     }
//   }

//   // ============================================================
//   // IF USER IS ALREADY SIGNED IN
//   // ============================================================

//   if (isLoaded && isSignedIn) {
//     return (
//       <CloudBackground>
//         <div className="min-h-screen flex items-center justify-center px-5">
//           <div className="w-full max-w-md rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 p-8 text-center shadow-[var(--shadow-soft)]">

//             <div
//               className="text-5xl mb-4"
//               aria-hidden
//             >
//               🔐
//             </div>

//             <h2 className="font-display font-semibold text-2xl text-white mb-2">
//               You're already signed in
//             </h2>

//             <p className="text-purple-100 mb-6">
//               This browser has an active session from a previous
//               sign-in. You can continue directly to the dashboard.
//             </p>

//             <div className="flex flex-col gap-3">

//               <Button
//                 size="xl"
//                 onClick={() => navigate("/dashboard")}
//               >
//                 Go to Dashboard 🌈
//               </Button>

//               <Button
//                 variant="secondary"
//                 size="md"
//                 onClick={handleSignOutAndContinue}
//               >
//                 Sign out & register another account
//               </Button>

//             </div>
//           </div>
//         </div>
//       </CloudBackground>
//     );
//   }

//   // ============================================================
//   // REGISTER PAGE
//   // ============================================================

//   return (
//     <CloudBackground>

//       <div className="min-h-screen flex flex-col items-center px-5 py-10">

//         {/* ======================================================
//             PAGE TITLE
//         ====================================================== */}

//         <h1
//           className={cn(
//             "font-display font-semibold text-2xl sm:text-3xl text-center mb-6",
//             "text-white"
//           )}
//         >
//           Let's Create Your Learning Adventure{" "}
//           <span aria-hidden>✨</span>
//         </h1>

//         {/* ======================================================
//             STEPPER
//         ====================================================== */}

//         <div className="rounded-full px-4 py-3 mb-8 bg-white/10 backdrop-blur">
//           <Stepper
//             steps={STEP_LABELS}
//             current={step}
//           />
//         </div>

//         {/* ======================================================
//             MAIN CARD
//         ====================================================== */}

//         <div
//           className="
//             w-full
//             max-w-2xl
//             rounded-3xl
//             p-6
//             sm:p-8
//             shadow-[var(--shadow-soft)]
//             bg-white/10
//             backdrop-blur-xl
//             border
//             border-white/20
//           "
//         >

//           <AnimatePresence mode="wait">

//             <motion.div
//               key={pendingVerification ? "verify" : step}
//               initial={{
//                 opacity: 0,
//                 x: 24,
//               }}
//               animate={{
//                 opacity: 1,
//                 x: 0,
//               }}
//               exit={{
//                 opacity: 0,
//                 x: -24,
//               }}
//               transition={{
//                 duration: 0.3,
//               }}
//             >

//               {/* =================================================
//                   STEP 0 — BASIC CHILD INFORMATION
//               ================================================= */}

//               {step === 0 && (
//                 <div className="flex flex-col gap-5">

//                   {/* ERROR */}

//                   {error && (
//                     <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-xl text-sm">
//                       {error}
//                     </div>
//                   )}

//                   {/* =================================================
//                       GOOGLE BUTTON
//                   ================================================= */}

//                   <button
//                     type="button"
//                     onClick={continueWithGoogle}
//                     disabled={isLoading}
//                     className="
//                       flex
//                       items-center
//                       justify-center
//                       gap-2
//                       w-full
//                       rounded-2xl
//                       bg-white
//                       px-4
//                       py-3
//                       font-semibold
//                       text-ink-900
//                       shadow-md
//                       hover:opacity-90
//                       disabled:opacity-50
//                       transition
//                     "
//                   >

//                     <svg
//                       width="18"
//                       height="18"
//                       viewBox="0 0 18 18"
//                       aria-hidden
//                     >

//                       <path
//                         fill="#4285F4"
//                         d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.9c1.7-1.57 2.7-3.88 2.7-6.62z"
//                       />

//                       <path
//                         fill="#34A853"
//                         d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.9-2.26c-.8.54-1.84.86-3.06.86-2.35 0-4.34-1.59-5.05-3.72H.98v2.33A9 9 0 0 0 9 18z"
//                       />

//                       <path
//                         fill="#FBBC05"
//                         d="M3.95 10.7A5.4 5.4 0 0 1 3.67 9c0-.59.1-1.17.28-1.7V4.97H.98A9 9 0 0 0 .98 13l2.97-2.33z"
//                       />

//                       <path
//                         fill="#EA4335"
//                         d="M9 3.58c1.32 0 2.51.46 3.44 1.35l2.58-2.58C13.46.89 11.43 0 9 0A9 9 0 0 0 .98 4.97l2.97 2.33C4.66 5.17 6.65 3.58 9 3.58z"
//                       />

//                     </svg>

//                     Continue with Google

//                   </button>

//                   {/* =================================================
//                       DIVIDER
//                   ================================================= */}

//                   <div className="flex items-center gap-3">

//                     <div className="h-px flex-1 bg-white/20" />

//                     <span className="text-xs font-semibold text-purple-100">
//                       OR
//                     </span>

//                     <div className="h-px flex-1 bg-white/20" />

//                   </div>

//                   {/* =================================================
//                       EMAIL
//                   ================================================= */}

//                   <label className="block">

//                     <span className="text-sm font-semibold text-purple-100">
//                       Email Address
//                     </span>

//                     <input
//                       type="email"
//                       value={email}
//                       onChange={(e) =>
//                         setEmail(e.target.value)
//                       }
//                       placeholder="you@example.com"
//                       autoComplete="email"
//                       className="
//                         mt-1.5
//                         w-full
//                         rounded-2xl
//                         bg-white/90
//                         px-4
//                         py-3
//                         text-ink-900
//                         placeholder:text-ink-300
//                         focus:outline-none
//                         focus-visible:ring-2
//                         focus-visible:ring-purple-300
//                       "
//                     />

//                   </label>

//                   {/* =================================================
//                       PASSWORD
//                   ================================================= */}

//                   <label className="block">

//                     <span className="text-sm font-semibold text-purple-100">
//                       Password (min 6 characters)
//                     </span>

//                     <input
//                       type="password"
//                       value={password}
//                       onChange={(e) =>
//                         setPassword(e.target.value)
//                       }
//                       placeholder="••••••••"
//                       autoComplete="new-password"
//                       className="
//                         mt-1.5
//                         w-full
//                         rounded-2xl
//                         bg-white/90
//                         px-4
//                         py-3
//                         text-ink-900
//                         placeholder:text-ink-300
//                         focus:outline-none
//                         focus-visible:ring-2
//                         focus-visible:ring-purple-300
//                       "
//                     />

//                   </label>

//                   {/* =================================================
//                       CHILD NAME
//                   ================================================= */}

//                   <label className="block">

//                     <span className="text-sm font-semibold text-purple-100">
//                       Child's Name
//                     </span>

//                     <input
//                       value={childName}
//                       onChange={(e) =>
//                         setChildName(e.target.value)
//                       }
//                       placeholder="e.g. Aarav"
//                       autoComplete="off"
//                       className="
//                         mt-1.5
//                         w-full
//                         rounded-2xl
//                         bg-white/90
//                         px-4
//                         py-3
//                         text-ink-900
//                         placeholder:text-ink-300
//                         focus:outline-none
//                         focus-visible:ring-2
//                         focus-visible:ring-purple-300
//                       "
//                     />

//                   </label>

//                   {/* =================================================
//                       NICKNAME
//                   ================================================= */}

//                   <label className="block">

//                     <span className="text-sm font-semibold text-purple-100">
//                       Nickname (optional)
//                     </span>

//                     <input
//                       value={nickname}
//                       onChange={(e) =>
//                         setNickname(e.target.value)
//                       }
//                       placeholder="e.g. Aar"
//                       className="
//                         mt-1.5
//                         w-full
//                         rounded-2xl
//                         bg-white/90
//                         px-4
//                         py-3
//                         text-ink-900
//                         placeholder:text-ink-300
//                         focus:outline-none
//                         focus-visible:ring-2
//                         focus-visible:ring-purple-300
//                       "
//                     />

//                   </label>

//                 </div>
//               )}

//               {/* =================================================
//                   STEP 1 — READY
//               ================================================= */}

//               {step === 1 && !pendingVerification && (
//                 <div className="text-center flex flex-col items-center gap-4">

//                   <motion.div
//                     animate={{
//                       scale: [1, 1.1, 1],
//                     }}
//                     transition={{
//                       duration: 2,
//                       repeat: Infinity,
//                     }}
//                     className="text-6xl"
//                     aria-hidden
//                   >
//                     ✨
//                   </motion.div>

//                   <h2 className="font-display font-semibold text-2xl text-white">
//                     Your Learning Adventure is Ready! ✨
//                   </h2>

//                   <div className="w-full max-w-sm bg-white/90 rounded-2xl p-5 text-left flex flex-col gap-2">

//                     <p className="text-ink-700">
//                       <span className="font-semibold">
//                         Email:
//                       </span>{" "}
//                       {email || "—"}
//                     </p>

//                     <p className="text-ink-700">
//                       <span className="font-semibold">
//                         Name:
//                       </span>{" "}
//                       {childName || "—"}
//                     </p>

//                     <p className="text-ink-700">
//                       <span className="font-semibold">
//                         Nickname:
//                       </span>{" "}
//                       {nickname || "Not provided"}
//                     </p>

//                   </div>

//                   <p className="text-purple-100">
//                     Your adventure is about to begin.
//                   </p>

//                   <Button
//                     size="xl"
//                     onClick={finish}
//                     disabled={isLoading}
//                   >
//                     {isLoading
//                       ? "Creating Account..."
//                       : "Enter Wonder Garden 🌈"}
//                   </Button>

//                   {error && (
//                     <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-xl text-sm max-w-sm">
//                       {error}
//                     </div>
//                   )}

//                 </div>
//               )}

//               {/* =================================================
//                   EMAIL VERIFICATION
//               ================================================= */}

//               {step === 1 && pendingVerification && (
//                 <div className="text-center flex flex-col items-center gap-4">

//                   <div
//                     className="text-6xl"
//                     aria-hidden
//                   >
//                     ✉️
//                   </div>

//                   <h2 className="font-display font-semibold text-2xl text-white">
//                     Check your email
//                   </h2>

//                   <p className="text-purple-100 max-w-sm">
//                     We sent a 6-digit code to{" "}
//                     <span className="font-semibold">
//                       {email}
//                     </span>
//                     . Enter it below to finish creating
//                     your account.
//                   </p>

//                   {/* =================================================
//                       VERIFICATION CODE
//                   ================================================= */}

//                   <input
//                     value={code}
//                     onChange={(event) =>
//                       setCode(
//                         event.target.value
//                           .replace(/\D/g, "")
//                           .slice(0, 6)
//                       )
//                     }
//                     placeholder="123456"
//                     inputMode="numeric"
//                     maxLength={6}
//                     className="
//                       w-full
//                       max-w-xs
//                       text-center
//                       text-lg
//                       tracking-[0.4em]
//                       rounded-2xl
//                       bg-white/90
//                       px-4
//                       py-3
//                       text-ink-900
//                       placeholder:text-ink-300
//                       placeholder:tracking-normal
//                       focus:outline-none
//                       focus-visible:ring-2
//                       focus-visible:ring-purple-300
//                     "
//                   />

//                   {/* =================================================
//                       VERIFY BUTTON
//                   ================================================= */}

//                   <Button
//                     size="xl"
//                     onClick={verifyCode}
//                     disabled={
//                       isLoading ||
//                       code.length !== 6
//                     }
//                   >
//                     {isLoading
//                       ? "Verifying..."
//                       : "Verify & Enter 🌈"}
//                   </Button>

//                   {/* =================================================
//                       RESEND CODE
//                   ================================================= */}

//                   <button
//                     type="button"
//                     onClick={resendCode}
//                     disabled={isLoading}
//                     className="
//                       text-sm
//                       font-semibold
//                       text-purple-200
//                       hover:underline
//                       disabled:opacity-50
//                     "
//                   >
//                     Resend code
//                   </button>

//                   {/* ERROR */}

//                   {error && (
//                     <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-xl text-sm max-w-sm">
//                       {error}
//                     </div>
//                   )}

//                 </div>
//               )}

//             </motion.div>

//           </AnimatePresence>

//         </div>

//         {/* ======================================================
//             BACK / CONTINUE BUTTONS
//         ====================================================== */}

//         {!isReadyStep(step) && !pendingVerification && (
//           <div className="flex items-center gap-3 mt-6">

//             {step > 0 && (
//               <Button
//                 variant="secondary"
//                 size="md"
//                 onClick={back}
//               >
//                 Back
//               </Button>
//             )}

//             <Button
//               size="md"
//               onClick={next}
//               disabled={!canNext}
//             >
//               Continue
//             </Button>

//           </div>
//         )}

//       </div>

//     </CloudBackground>
//   );
// }

// // ============================================================
// // HELPER
// // ============================================================

// function isReadyStep(step: number) {
//   return step === 1;
// }


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  useSignUp,
  useUser,
  useAuth,
  useClerk,
} from "@clerk/react";

import { CloudBackground } from "@/components/backgrounds/CloudBackground";
import { Button } from "@/components/ui/Button";
import { Stepper } from "@/components/ui/Stepper";

import { cn } from "@/lib/cn";

const STEP_LABELS = ["Child", "Ready"];

function getErrorMessage(
  err: unknown,
  fallback: string
): string {
  if (!err || typeof err !== "object") {
    return fallback;
  }

  const e = err as {
    errors?: {
      message?: string;
      code?: string;
    }[];
    message?: string;
  };

  return (
    e.errors?.[0]?.message ||
    e.message ||
    fallback
  );
}

export default function Register() {
  const navigate = useNavigate();

  // ============================================================
  // STEP
  // ============================================================

  const [step, setStep] = useState(0);

  // ============================================================
  // REGISTRATION INFORMATION
  // ============================================================

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [childName, setChildName] = useState("");
  const [nickname, setNickname] = useState("");

  // ============================================================
  // LOADING / ERROR
  // ============================================================

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // ============================================================
  // EMAIL VERIFICATION
  // ============================================================

  const [pendingVerification, setPendingVerification] =
    useState(false);

  const [code, setCode] = useState("");

  // ============================================================
  // CLERK
  // ============================================================

  const { signUp } = useSignUp();
  const { user } = useUser();
  const { isLoaded, isSignedIn } = useAuth();
  const { signOut } = useClerk();

  // ============================================================
  // CAN NEXT
  // ============================================================

  const canNext =
    step === 0
      ? childName.trim().length > 0 &&
        email.trim().length > 0 &&
        password.length >= 6
      : true;

  // ============================================================
  // NEXT
  // ============================================================

  function next() {
    setError("");

    if (step < STEP_LABELS.length - 1) {
      setStep((current) => current + 1);
    }
  }

  // ============================================================
  // BACK
  // ============================================================

  function back() {
    setError("");

    if (step > 0) {
      setStep((current) => current - 1);
    }
  }

  // ============================================================
  // GOOGLE SIGN-UP
  // ============================================================

  async function continueWithGoogle() {
    setError("");

    try {
      if (!signUp) {
        throw new Error(
          "Sign up is not ready yet."
        );
      }

      const { error } = await signUp.sso({
        strategy: "oauth_google",

        // Clerk callback
        redirectCallbackUrl: "/sso-callback",

        // ⭐ UPDATED
        // After Google authentication,
        // go to User Profile instead of Dashboard.
        redirectUrl: "/user-profile",
      });

      if (error) {
        setError(
          getErrorMessage(
            error,
            "Couldn't start Google sign-up. Please try again."
          )
        );
      }
    } catch (err) {
      console.error(
        "Google sign-up failed:",
        err
      );

      setError(
        getErrorMessage(
          err,
          "Couldn't start Google sign-up. Please try again."
        )
      );
    }
  }

  // ============================================================
  // EMAIL + PASSWORD REGISTRATION
  // ============================================================

  async function finish() {
    if (isLoading) return;

    setIsLoading(true);
    setError("");

    try {
      if (!signUp) {
        throw new Error(
          "Sign up is not ready yet."
        );
      }

      // --------------------------------------------------------
      // VALIDATE EMAIL
      // --------------------------------------------------------

      if (!email.trim()) {
        setError(
          "Please enter your email address."
        );
        return;
      }

      // --------------------------------------------------------
      // VALIDATE PASSWORD
      // --------------------------------------------------------

      if (password.length < 6) {
        setError(
          "Password must contain at least 6 characters."
        );
        return;
      }

      // --------------------------------------------------------
      // VALIDATE NAME
      // --------------------------------------------------------

      if (!childName.trim()) {
        setError(
          "Please enter the child's name."
        );
        return;
      }

      // --------------------------------------------------------
      // CREATE CLERK ACCOUNT
      // --------------------------------------------------------

      const { error } =
        await signUp.password({
          emailAddress: email.trim(),
          password,
          firstName: childName.trim(),
        });

      if (error) {
        console.error(
          "signUp.password() error:",
          error
        );

        setError(
          getErrorMessage(
            error,
            "Failed to create account. Please try again."
          )
        );

        return;
      }

      // ========================================================
      // ACCOUNT CREATED WITHOUT VERIFICATION
      // ========================================================

      if (signUp.status === "complete") {
        const {
          error: finalizeError,
        } = await signUp.finalize();

        if (finalizeError) {
          setError(
            getErrorMessage(
              finalizeError,
              "Couldn't finish signing you in."
            )
          );

          return;
        }

        const clerkId =
          signUp.createdUserId ||
          user?.id;

        if (!clerkId) {
          setError(
            "Something went wrong finishing sign-in. Please try again."
          );

          return;
        }

        console.log(
          "✅ Clerk account created:",
          clerkId
        );

        // ======================================================
        // ⭐ UPDATED
        // REGISTER → USER PROFILE
        // ======================================================

        navigate("/user-profile", {
          replace: true,
        });

        return;
      }

      // ========================================================
      // EMAIL VERIFICATION REQUIRED
      // ========================================================

      if (
        signUp.status ===
        "missing_requirements"
      ) {
        const {
          error: codeError,
        } =
          await signUp.verifications.sendEmailCode();

        if (codeError) {
          setError(
            getErrorMessage(
              codeError,
              "Couldn't send the verification code."
            )
          );

          return;
        }

        setPendingVerification(true);

        return;
      }

      console.log(
        "Incomplete signup:",
        signUp.status
      );

      setError(
        "Your account could not be completed. Please try again."
      );
    } catch (err) {
      console.error(
        "Registration failed:",
        err
      );

      setError(
        getErrorMessage(
          err,
          "Failed to create account. Please try again."
        )
      );
    } finally {
      setIsLoading(false);
    }
  }

  // ============================================================
  // VERIFY EMAIL CODE
  // ============================================================

  async function verifyCode() {
    if (isLoading) return;

    setIsLoading(true);
    setError("");

    try {
      if (!signUp) {
        throw new Error(
          "Sign up is not ready yet."
        );
      }

      if (code.length !== 6) {
        setError(
          "Please enter the 6-digit verification code."
        );
        return;
      }

      // --------------------------------------------------------
      // VERIFY EMAIL
      // --------------------------------------------------------

      const { error } =
        await signUp.verifications.verifyEmailCode(
          {
            code,
          }
        );

      if (error) {
        console.error(
          "verifyEmailCode() error:",
          error
        );

        setError(
          getErrorMessage(
            error,
            "That code didn't work. Please check your email and try again."
          )
        );

        return;
      }

      // ========================================================
      // VERIFICATION COMPLETE
      // ========================================================

      if (signUp.status === "complete") {
        const {
          error: finalizeError,
        } = await signUp.finalize();

        if (finalizeError) {
          setError(
            getErrorMessage(
              finalizeError,
              "Couldn't finish signing you in."
            )
          );

          return;
        }

        const clerkId =
          signUp.createdUserId ||
          user?.id;

        if (!clerkId) {
          setError(
            "Something went wrong finishing sign-in. Please try again."
          );

          return;
        }

        console.log(
          "✅ Email verified. Clerk account created:",
          clerkId
        );

        // ======================================================
        // ⭐ IMPORTANT UPDATED FLOW
        //
        // Register
        //     ↓
        // Email Verification
        //     ↓
        // User Profile
        //     ↓
        // Dashboard
        // ======================================================

        navigate("/user-profile", {
          replace: true,
        });

        return;
      }

      setError(
        "That code didn't work. Please check your email and try again."
      );
    } catch (err) {
      console.error(
        "Verification failed:",
        err
      );

      setError(
        getErrorMessage(
          err,
          "Verification failed. Please try again."
        )
      );
    } finally {
      setIsLoading(false);
    }
  }

  // ============================================================
  // RESEND CODE
  // ============================================================

  async function resendCode() {
    if (isLoading) return;

    setError("");

    try {
      if (!signUp) return;

      const { error } =
        await signUp.verifications.sendEmailCode();

      if (error) {
        setError(
          getErrorMessage(
            error,
            "Couldn't resend the code. Please try again."
          )
        );
      }
    } catch (err) {
      console.error(
        "Resend failed:",
        err
      );

      setError(
        getErrorMessage(
          err,
          "Couldn't resend the code. Please try again."
        )
      );
    }
  }

  // ============================================================
  // SIGN OUT
  // ============================================================

  async function handleSignOutAndContinue() {
    try {
      await signOut();
    } catch (err) {
      console.error(
        "Sign out failed:",
        err
      );
    }
  }

  // ============================================================
  // ALREADY SIGNED IN
  // ============================================================

  if (isLoaded && isSignedIn) {
    return (
      <CloudBackground>
        <div className="min-h-screen flex items-center justify-center px-5">
          <div
            className="
              w-full
              max-w-md
              rounded-3xl
              bg-white/10
              backdrop-blur-xl
              border
              border-white/20
              p-8
              text-center
              shadow-[var(--shadow-soft)]
            "
          >
            <div
              className="text-5xl mb-4"
              aria-hidden
            >
              🔐
            </div>

            <h2
              className="
                font-display
                font-semibold
                text-2xl
                text-white
                mb-2
              "
            >
              You're already signed in
            </h2>

            <p className="text-purple-100 mb-6">
              You already have an active
              account session.
            </p>

            <div className="flex flex-col gap-3">

              {/* ⭐ UPDATED */}
              <Button
                size="xl"
                onClick={() =>
                  navigate(
                    "/user-profile"
                  )
                }
              >
                Continue to Profile 🌈
              </Button>

              <Button
                variant="secondary"
                size="md"
                onClick={
                  handleSignOutAndContinue
                }
              >
                Sign out & register another
                account
              </Button>

            </div>
          </div>
        </div>
      </CloudBackground>
    );
  }

  // ============================================================
  // REGISTER PAGE
  // ============================================================

  return (
    <CloudBackground>

      <div
        className="
          min-h-screen
          flex
          flex-col
          items-center
          px-5
          py-10
        "
      >

        {/* TITLE */}

        <h1
          className={cn(
            "font-display font-semibold text-2xl sm:text-3xl",
            "text-center mb-6 text-white"
          )}
        >
          Let's Create Your Learning Adventure{" "}
          <span aria-hidden>
            ✨
          </span>
        </h1>

        {/* STEPPER */}

        <div
          className="
            rounded-full
            px-4
            py-3
            mb-8
            bg-white/10
            backdrop-blur
          "
        >
          <Stepper
            steps={STEP_LABELS}
            current={step}
          />
        </div>

        {/* CARD */}

        <div
          className="
            w-full
            max-w-2xl
            rounded-3xl
            p-6
            sm:p-8
            shadow-[var(--shadow-soft)]
            bg-white/10
            backdrop-blur-xl
            border
            border-white/20
          "
        >

          <AnimatePresence mode="wait">

            <motion.div
              key={
                pendingVerification
                  ? "verify"
                  : step
              }
              initial={{
                opacity: 0,
                x: 24,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              exit={{
                opacity: 0,
                x: -24,
              }}
              transition={{
                duration: 0.3,
              }}
            >

              {/* =================================================
                  STEP 0
              ================================================= */}

              {step === 0 && (
                <div className="flex flex-col gap-5">

                  {error && (
                    <div
                      className="
                        bg-red-500/20
                        border
                        border-red-500/50
                        text-red-200
                        px-4
                        py-3
                        rounded-xl
                        text-sm
                      "
                    >
                      {error}
                    </div>
                  )}

                  {/* GOOGLE */}

                  <button
                    type="button"
                    onClick={
                      continueWithGoogle
                    }
                    disabled={isLoading}
                    className="
                      flex
                      items-center
                      justify-center
                      gap-2
                      w-full
                      rounded-2xl
                      bg-white
                      px-4
                      py-3
                      font-semibold
                      text-ink-900
                      shadow-md
                      hover:opacity-90
                      disabled:opacity-50
                      transition
                    "
                  >

                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      aria-hidden
                    >
                      <path
                        fill="#4285F4"
                        d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.9c1.7-1.57 2.7-3.88 2.7-6.62z"
                      />

                      <path
                        fill="#34A853"
                        d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.9-2.26c-.8.54-1.84.86-3.06.86-2.35 0-4.34-1.59-5.05-3.72H.98v2.33A9 9 0 0 0 9 18z"
                      />

                      <path
                        fill="#FBBC05"
                        d="M3.95 10.7A5.4 5.4 0 0 1 3.67 9c0-.59.1-1.17.28-1.7V4.97H.98A9 9 0 0 0 .98 13l2.97-2.33z"
                      />

                      <path
                        fill="#EA4335"
                        d="M9 3.58c1.32 0 2.51.46 3.44 1.35l2.58-2.58C13.46.89 11.43 0 9 0A9 9 0 0 0 .98 4.97l2.97 2.33C4.66 5.17 6.65 3.58 9 3.58z"
                      />
                    </svg>

                    Continue with Google

                  </button>

                  {/* DIVIDER */}

                  <div className="flex items-center gap-3">

                    <div className="h-px flex-1 bg-white/20" />

                    <span className="text-xs font-semibold text-purple-100">
                      OR
                    </span>

                    <div className="h-px flex-1 bg-white/20" />

                  </div>

                  {/* EMAIL */}

                  <label>
                    <span className="text-sm font-semibold text-purple-100">
                      Email Address
                    </span>

                    <input
                      type="email"
                      value={email}
                      onChange={(e) =>
                        setEmail(
                          e.target.value
                        )
                      }
                      placeholder="you@example.com"
                      autoComplete="email"
                      className="
                        mt-1.5
                        w-full
                        rounded-2xl
                        bg-white/90
                        px-4
                        py-3
                        text-ink-900
                        placeholder:text-ink-300
                        focus:outline-none
                        focus-visible:ring-2
                        focus-visible:ring-purple-300
                      "
                    />
                  </label>

                  {/* PASSWORD */}

                  <label>
                    <span className="text-sm font-semibold text-purple-100">
                      Password (min 6 characters)
                    </span>

                    <input
                      type="password"
                      value={password}
                      onChange={(e) =>
                        setPassword(
                          e.target.value
                        )
                      }
                      placeholder="••••••••"
                      autoComplete="new-password"
                      className="
                        mt-1.5
                        w-full
                        rounded-2xl
                        bg-white/90
                        px-4
                        py-3
                        text-ink-900
                        placeholder:text-ink-300
                        focus:outline-none
                        focus-visible:ring-2
                        focus-visible:ring-purple-300
                      "
                    />
                  </label>

                  {/* CHILD NAME */}

                  <label>
                    <span className="text-sm font-semibold text-purple-100">
                      Child's Name
                    </span>

                    <input
                      value={childName}
                      onChange={(e) =>
                        setChildName(
                          e.target.value
                        )
                      }
                      placeholder="e.g. Aarav"
                      autoComplete="off"
                      className="
                        mt-1.5
                        w-full
                        rounded-2xl
                        bg-white/90
                        px-4
                        py-3
                        text-ink-900
                        placeholder:text-ink-300
                        focus:outline-none
                        focus-visible:ring-2
                        focus-visible:ring-purple-300
                      "
                    />
                  </label>

                  {/* NICKNAME */}

                  <label>
                    <span className="text-sm font-semibold text-purple-100">
                      Nickname (optional)
                    </span>

                    <input
                      value={nickname}
                      onChange={(e) =>
                        setNickname(
                          e.target.value
                        )
                      }
                      placeholder="e.g. Aar"
                      className="
                        mt-1.5
                        w-full
                        rounded-2xl
                        bg-white/90
                        px-4
                        py-3
                        text-ink-900
                        placeholder:text-ink-300
                        focus:outline-none
                        focus-visible:ring-2
                        focus-visible:ring-purple-300
                      "
                    />
                  </label>

                </div>
              )}

              {/* =================================================
                  STEP 1
              ================================================= */}

              {step === 1 &&
                !pendingVerification && (
                  <div className="text-center flex flex-col items-center gap-4">

                    <motion.div
                      animate={{
                        scale: [
                          1,
                          1.1,
                          1,
                        ],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                      className="text-6xl"
                    >
                      ✨
                    </motion.div>

                    <h2
                      className="
                        font-display
                        font-semibold
                        text-2xl
                        text-white
                      "
                    >
                      Your Learning Adventure
                      is Ready! ✨
                    </h2>

                    <div
                      className="
                        w-full
                        max-w-sm
                        bg-white/90
                        rounded-2xl
                        p-5
                        text-left
                        flex
                        flex-col
                        gap-2
                      "
                    >

                      <p className="text-ink-700">
                        <span className="font-semibold">
                          Email:
                        </span>{" "}
                        {email || "—"}
                      </p>

                      <p className="text-ink-700">
                        <span className="font-semibold">
                          Name:
                        </span>{" "}
                        {childName || "—"}
                      </p>

                      <p className="text-ink-700">
                        <span className="font-semibold">
                          Nickname:
                        </span>{" "}
                        {nickname ||
                          "Not provided"}
                      </p>

                    </div>

                    <p className="text-purple-100">
                      Your adventure is about to
                      begin.
                    </p>

                    <Button
                      size="xl"
                      onClick={finish}
                      disabled={isLoading}
                    >
                      {isLoading
                        ? "Creating Account..."
                        : "Create Account 🌈"}
                    </Button>

                    {error && (
                      <div
                        className="
                          bg-red-100
                          border
                          border-red-300
                          text-red-700
                          px-4
                          py-3
                          rounded-xl
                          text-sm
                          max-w-sm
                        "
                      >
                        {error}
                      </div>
                    )}

                  </div>
                )}

              {/* =================================================
                  EMAIL VERIFICATION
              ================================================= */}

              {step === 1 &&
                pendingVerification && (
                  <div className="text-center flex flex-col items-center gap-4">

                    <div
                      className="text-6xl"
                      aria-hidden
                    >
                      ✉️
                    </div>

                    <h2
                      className="
                        font-display
                        font-semibold
                        text-2xl
                        text-white
                      "
                    >
                      Check your email
                    </h2>

                    <p className="text-purple-100 max-w-sm">
                      We sent a 6-digit code to{" "}
                      <span className="font-semibold">
                        {email}
                      </span>
                      . Enter it below to finish
                      creating your account.
                    </p>

                    <input
                      value={code}
                      onChange={(event) =>
                        setCode(
                          event.target.value
                            .replace(/\D/g, "")
                            .slice(0, 6)
                        )
                      }
                      placeholder="123456"
                      inputMode="numeric"
                      maxLength={6}
                      className="
                        w-full
                        max-w-xs
                        text-center
                        text-lg
                        tracking-[0.4em]
                        rounded-2xl
                        bg-white/90
                        px-4
                        py-3
                        text-ink-900
                        placeholder:text-ink-300
                        placeholder:tracking-normal
                        focus:outline-none
                        focus-visible:ring-2
                        focus-visible:ring-purple-300
                      "
                    />

                    <Button
                      size="xl"
                      onClick={verifyCode}
                      disabled={
                        isLoading ||
                        code.length !== 6
                      }
                    >
                      {isLoading
                        ? "Verifying..."
                        : "Verify & Continue 🌈"}
                    </Button>

                    <button
                      type="button"
                      onClick={resendCode}
                      disabled={isLoading}
                      className="
                        text-sm
                        font-semibold
                        text-purple-200
                        hover:underline
                        disabled:opacity-50
                      "
                    >
                      Resend code
                    </button>

                    {error && (
                      <div
                        className="
                          bg-red-100
                          border
                          border-red-300
                          text-red-700
                          px-4
                          py-3
                          rounded-xl
                          text-sm
                          max-w-sm
                        "
                      >
                        {error}
                      </div>
                    )}

                  </div>
                )}

            </motion.div>

          </AnimatePresence>

        </div>

        {/* BACK / CONTINUE */}

        {!isReadyStep(step) &&
          !pendingVerification && (
            <div className="flex items-center gap-3 mt-6">

              {step > 0 && (
                <Button
                  variant="secondary"
                  size="md"
                  onClick={back}
                >
                  Back
                </Button>
              )}

              <Button
                size="md"
                onClick={next}
                disabled={!canNext}
              >
                Continue
              </Button>

            </div>
          )}

      </div>

    </CloudBackground>
  );
}

// ============================================================
// HELPER
// ============================================================

function isReadyStep(step: number) {
  return step === 1;
}