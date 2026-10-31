// // import {
// //   useEffect,
// //   useState,
// // } from "react";

// // import { useNavigate } from "react-router-dom";

// // import {
// //   motion,
// //   AnimatePresence,
// // } from "framer-motion";

// // import { useUser } from "@clerk/react";

// // import { CloudBackground } from "@/components/backgrounds/CloudBackground";

// // import { Button } from "@/components/ui/Button";

// // import { Stepper } from "@/components/ui/Stepper";

// // import { cn } from "@/lib/cn";

// // // ============================================================
// // // TYPES
// // // ============================================================

// // type AgeGroup =
// //   | "5-8"
// //   | "9-12"
// //   | "13-18"
// //   | "";

// // type SupportType =
// //   | "ADHD"
// //   | "Intellectual Disability"
// //   | "Autism"
// //   | "";

// // type Preference =
// //   | "Games"
// //   | "Stories"
// //   | "Music"
// //   | "Drawing"
// //   | "Puzzles"
// //   | "Videos"
// //   | "Movement"
// //   | "Animals"
// //   | "Science";

// // // ============================================================
// // // STEPS
// // // ============================================================

// // const STEP_LABELS = [
// //   "Basic",
// //   "Avatar",
// //   "Age",
// //   "Support",
// //   "Preferences",
// //   "Session",
// //   "Ready",
// // ];

// // // ============================================================
// // // AVATARS
// // // ============================================================

// // const AVATARS = [
// //   "😊",
// //   "🦊",
// //   "🐼",
// //   "🐯",
// //   "🐰",
// //   "🦁",
// //   "🐨",
// //   "🐸",
// //   "🐵",
// //   "🦄",
// //   "🐶",
// //   "🐱",
// // ];

// // // ============================================================
// // // AGE OPTIONS
// // // ============================================================

// // const AGE_OPTIONS = [
// //   {
// //     value: "5-8" as AgeGroup,
// //     title: "5–8 Years",
// //     emoji: "🌱",
// //     description: "Early learners",
// //   },
// //   {
// //     value: "9-12" as AgeGroup,
// //     title: "9–12 Years",
// //     emoji: "🌈",
// //     description: "Growing learners",
// //   },
// //   {
// //     value: "13-18" as AgeGroup,
// //     title: "13–18 Years",
// //     emoji: "🚀",
// //     description: "Young learners",
// //   },
// // ];

// // // ============================================================
// // // SUPPORT OPTIONS
// // // ============================================================

// // const SUPPORT_OPTIONS = [
// //   {
// //     value: "ADHD" as SupportType,
// //     title: "ADHD Support",
// //     emoji: "⚡",
// //     description:
// //       "Focus, attention & activity",
// //   },
// //   {
// //     value:
// //       "Intellectual Disability" as SupportType,
// //     title: "Intellectual Disability",
// //     emoji: "💜",
// //     description:
// //       "Accessible learning support",
// //   },
// //   {
// //     value: "Autism" as SupportType,
// //     title: "Autism Support",
// //     emoji: "💙",
// //     description:
// //       "Communication & confidence",
// //   },
// // ];

// // // ============================================================
// // // PREFERENCES
// // // ============================================================

// // const PREFERENCE_OPTIONS: {
// //   value: Preference;
// //   emoji: string;
// // }[] = [
// //   {
// //     value: "Games",
// //     emoji: "🎮",
// //   },
// //   {
// //     value: "Stories",
// //     emoji: "📖",
// //   },
// //   {
// //     value: "Music",
// //     emoji: "🎵",
// //   },
// //   {
// //     value: "Drawing",
// //     emoji: "🎨",
// //   },
// //   {
// //     value: "Puzzles",
// //     emoji: "🧩",
// //   },
// //   {
// //     value: "Videos",
// //     emoji: "🎬",
// //   },
// //   {
// //     value: "Movement",
// //     emoji: "🏃",
// //   },
// //   {
// //     value: "Animals",
// //     emoji: "🐾",
// //   },
// //   {
// //     value: "Science",
// //     emoji: "🔬",
// //   },
// // ];

// // // ============================================================
// // // SESSION OPTIONS
// // // ============================================================

// // const SESSION_OPTIONS = [
// //   {
// //     value: 5,
// //     title: "5 min",
// //     emoji: "🌱",
// //     description: "Quick & easy",
// //   },
// //   {
// //     value: 10,
// //     title: "10 min",
// //     emoji: "🌈",
// //     description: "Balanced session",
// //   },
// //   {
// //     value: 20,
// //     title: "20 min",
// //     emoji: "🚀",
// //     description: "Deep learning",
// //   },
// // ];

// // // ============================================================
// // // COMPONENT
// // // ============================================================

// // export default function User_profile() {
// //   const navigate = useNavigate();

// //   // ==========================================================
// //   // CLERK
// //   // ==========================================================

// //   const {
// //     user,
// //     isLoaded,
// //   } = useUser();

// //   // ==========================================================
// //   // STEP
// //   // ==========================================================

// //   const [step, setStep] =
// //     useState(0);

// //   // ==========================================================
// //   // BASIC INFORMATION
// //   // ==========================================================

// //   const [name, setName] =
// //     useState("");

// //   const [email, setEmail] =
// //     useState("");

// //   const [nickname, setNickname] =
// //     useState("");

// //   // ==========================================================
// //   // PROFILE INFORMATION
// //   // ==========================================================

// //   const [avatar, setAvatar] =
// //     useState("😊");

// //   const [age, setAge] =
// //     useState<AgeGroup>("");

// //   const [support, setSupport] =
// //     useState<SupportType>("");

// //   const [preferences, setPreferences] =
// //     useState<Preference[]>([]);

// //   const [sessionLength, setSessionLength] =
// //     useState<number>(10);

// //   // ==========================================================
// //   // UI
// //   // ==========================================================

// //   const [isSaving, setIsSaving] =
// //     useState(false);

// //   const [error, setError] =
// //     useState("");

// //   const [showSuccess, setShowSuccess] =
// //     useState(false);

// //   // ==========================================================
// //   // LOAD CLERK USER
// //   // ==========================================================

// //   useEffect(() => {
// //     if (!user) return;

// //     setName(
// //       user.firstName || ""
// //     );

// //     setEmail(
// //       user.primaryEmailAddress
// //         ?.emailAddress || ""
// //     );
// //   }, [user]);

// //   // ==========================================================
// //   // PROTECT PROFILE PAGE
// //   // ==========================================================

// //   useEffect(() => {
// //     if (
// //       isLoaded &&
// //       !user
// //     ) {
// //       navigate("/register", {
// //         replace: true,
// //       });
// //     }
// //   }, [
// //     isLoaded,
// //     user,
// //     navigate,
// //   ]);

// //   // ==========================================================
// //   // TOGGLE PREFERENCE
// //   // ==========================================================

// //   function togglePreference(
// //     preference: Preference
// //   ) {
// //     setPreferences((current) => {
// //       if (
// //         current.includes(
// //           preference
// //         )
// //       ) {
// //         return current.filter(
// //           (item) =>
// //             item !== preference
// //         );
// //       }

// //       return [
// //         ...current,
// //         preference,
// //       ];
// //     });
// //   }

// //   // ==========================================================
// //   // VALIDATE CURRENT STEP
// //   // ==========================================================

// //   function validateStep(): boolean {
// //     setError("");

// //     // STEP 0
// //     if (step === 0) {
// //       if (!name.trim()) {
// //         setError(
// //           "Please enter the child's name."
// //         );
// //         return false;
// //       }

// //       if (!email.trim()) {
// //         setError(
// //           "Please enter the email address."
// //         );
// //         return false;
// //       }
// //     }

// //     // STEP 1
// //     if (step === 1) {
// //       if (!avatar) {
// //         setError(
// //           "Please choose an avatar."
// //         );
// //         return false;
// //       }
// //     }

// //     // STEP 2
// //     if (step === 2) {
// //       if (!age) {
// //         setError(
// //           "Please select an age group."
// //         );
// //         return false;
// //       }
// //     }

// //     // STEP 3
// //     if (step === 3) {
// //       if (!support) {
// //         setError(
// //           "Please select a learning support option."
// //         );
// //         return false;
// //       }
// //     }

// //     // STEP 4
// //     if (step === 4) {
// //       if (
// //         preferences.length === 0
// //       ) {
// //         setError(
// //           "Please select at least one learning preference."
// //         );
// //         return false;
// //       }
// //     }

// //     // STEP 5
// //     if (step === 5) {
// //       if (!sessionLength) {
// //         setError(
// //           "Please select a session length."
// //         );
// //         return false;
// //       }
// //     }

// //     return true;
// //   }

// //   // ==========================================================
// //   // NEXT
// //   // ==========================================================

// //   function next() {
// //     if (!validateStep()) {
// //       return;
// //     }

// //     if (
// //       step <
// //       STEP_LABELS.length - 1
// //     ) {
// //       setStep(
// //         (current) =>
// //           current + 1
// //       );
// //     }
// //   }

// //   // ==========================================================
// //   // BACK
// //   // ==========================================================

// //   function back() {
// //     setError("");

// //     if (step > 0) {
// //       setStep(
// //         (current) =>
// //           current - 1
// //       );
// //     }
// //   }

// //   // ==========================================================
// //   // SAVE PROFILE
// //   // ==========================================================

// //   async function saveProfile() {
// //     if (isSaving) return;

// //     if (!validateStep()) {
// //       return;
// //     }

// //     if (!user?.id) {
// //       setError(
// //         "Your account session could not be found. Please sign in again."
// //       );
// //       return;
// //     }

// //     setIsSaving(true);
// //     setError("");

// //     try {
// //       const profileData = {
// //         clerkId: user.id,

// //         name: name.trim(),

// //         nickname:
// //           nickname.trim(),

// //         email: email.trim(),

// //         avatar,

// //         age,

// //         support,

// //         preferences,

// //         sessionLength,
// //       };

// //       // ======================================================
// //       // FOR NOW
// //       // ======================================================

// //       console.log(
// //         "✅ Profile data:",
// //         profileData
// //       );

// //       // ======================================================
// //       // MONGODB API
// //       // ======================================================
// //       //
// //       // Later you can replace the console.log above with:
// //       //
// //       // const response = await fetch(
// //       //   "http://localhost:5000/api/users/profile",
// //       //   {
// //       //     method: "POST",
// //       //     headers: {
// //       //       "Content-Type":
// //       //         "application/json",
// //       //     },
// //       //     body: JSON.stringify(
// //       //       profileData
// //       //     ),
// //       //   }
// //       // );
// //       //
// //       // if (!response.ok) {
// //       //   throw new Error(
// //       //     "Failed to save profile"
// //       //   );
// //       // }

// //       setShowSuccess(true);

// //       // ======================================================
// //       // PROFILE → DASHBOARD
// //       // ======================================================

// //       setTimeout(() => {
// //         navigate("/dashboard", {
// //           replace: true,
// //         });
// //       }, 1200);

// //     } catch (err) {
// //       console.error(
// //         "Profile saving failed:",
// //         err
// //       );

// //       setError(
// //         "Couldn't save your profile. Please try again."
// //       );
// //     } finally {
// //       setIsSaving(false);
// //     }
// //   }

// //   // ==========================================================
// //   // SKIP PROFILE
// //   // ==========================================================

// //   function skipProfile() {
// //     navigate("/dashboard", {
// //       replace: true,
// //     });
// //   }

// //   // ==========================================================
// //   // CLERK LOADING
// //   // ==========================================================

// //   if (!isLoaded) {
// //     return (
// //       <CloudBackground>

// //         <div
// //           className="
// //             min-h-screen
// //             flex
// //             items-center
// //             justify-center
// //           "
// //         >

// //           <div className="text-center text-white">

// //             <motion.div
// //               animate={{
// //                 rotate: 360,
// //               }}
// //               transition={{
// //                 duration: 1.5,
// //                 repeat: Infinity,
// //                 ease: "linear",
// //               }}
// //               className="text-5xl mb-4"
// //             >
// //               🌈
// //             </motion.div>

// //             <p className="text-purple-100">
// //               Loading your profile...
// //             </p>

// //           </div>

// //         </div>

// //       </CloudBackground>
// //     );
// //   }

// //   // ==========================================================
// //   // MAIN UI
// //   // ==========================================================

// //   return (
// //     <CloudBackground>

// //       <div
// //         className="
// //           min-h-screen
// //           flex
// //           flex-col
// //           items-center
// //           px-5
// //           py-10
// //         "
// //       >

// //         {/* ====================================================
// //             HEADER
// //         ==================================================== */}

// //         <div className="text-center mb-6">

// //           <motion.div
// //             initial={{
// //               opacity: 0,
// //               y: -20,
// //             }}
// //             animate={{
// //               opacity: 1,
// //               y: 0,
// //             }}
// //             className="text-5xl mb-3"
// //           >
// //             🌈
// //           </motion.div>

// //           <h1
// //             className="
// //               font-display
// //               font-semibold
// //               text-2xl
// //               sm:text-3xl
// //               text-white
// //               mb-2
// //             "
// //           >
// //             Create Your Learning Profile ✨
// //           </h1>

// //           <p className="text-purple-100">
// //             Let's personalize your learning adventure.
// //           </p>

// //         </div>

// //         {/* ====================================================
// //             STEPPER
// //         ==================================================== */}

// //         <div
// //           className="
// //             rounded-full
// //             px-4
// //             py-3
// //             mb-8
// //             bg-white/10
// //             backdrop-blur
// //             overflow-x-auto
// //             max-w-full
// //           "
// //         >
// //           <Stepper
// //             steps={STEP_LABELS}
// //             current={step}
// //           />
// //         </div>

// //         {/* ====================================================
// //             CARD
// //         ==================================================== */}

// //         <div
// //           className="
// //             w-full
// //             max-w-3xl
// //             rounded-3xl
// //             p-6
// //             sm:p-8
// //             shadow-[var(--shadow-soft)]
// //             bg-white/10
// //             backdrop-blur-xl
// //             border
// //             border-white/20
// //           "
// //         >

// //           {/* ERROR */}

// //           <AnimatePresence>
// //             {error && (
// //               <motion.div
// //                 initial={{
// //                   opacity: 0,
// //                   y: -10,
// //                 }}
// //                 animate={{
// //                   opacity: 1,
// //                   y: 0,
// //                 }}
// //                 exit={{
// //                   opacity: 0,
// //                   y: -10,
// //                 }}
// //                 className="
// //                   mb-6
// //                   bg-red-500/20
// //                   border
// //                   border-red-500/50
// //                   text-red-200
// //                   px-4
// //                   py-3
// //                   rounded-xl
// //                   text-sm
// //                 "
// //               >
// //                 {error}
// //               </motion.div>
// //             )}
// //           </AnimatePresence>

// //           {/* ==================================================
// //               STEP CONTENT
// //           ================================================== */}

// //           <AnimatePresence mode="wait">

// //             <motion.div
// //               key={step}
// //               initial={{
// //                 opacity: 0,
// //                 x: 30,
// //               }}
// //               animate={{
// //                 opacity: 1,
// //                 x: 0,
// //               }}
// //               exit={{
// //                 opacity: 0,
// //                 x: -30,
// //               }}
// //               transition={{
// //                 duration: 0.3,
// //               }}
// //             >

// //               {/* =================================================
// //                   STEP 0 — BASIC
// //               ================================================= */}

// //               {step === 0 && (
// //                 <div>

// //                   <SectionTitle
// //                     emoji="👋"
// //                     title="About You"
// //                     description="Let's start with some basic information."
// //                   />

// //                   <div className="flex flex-col gap-5">

// //                     <label>
// //                       <span className="text-sm font-semibold text-purple-100">
// //                         Child's Name
// //                       </span>

// //                       <input
// //                         value={name}
// //                         onChange={(e) =>
// //                           setName(
// //                             e.target.value
// //                           )
// //                         }
// //                         placeholder="e.g. Aarav"
// //                         className="
// //                           mt-1.5
// //                           w-full
// //                           rounded-2xl
// //                           bg-white/90
// //                           px-4
// //                           py-3
// //                           text-ink-900
// //                           placeholder:text-ink-300
// //                           focus:outline-none
// //                           focus-visible:ring-2
// //                           focus-visible:ring-purple-300
// //                         "
// //                       />
// //                     </label>

// //                     <label>
// //                       <span className="text-sm font-semibold text-purple-100">
// //                         Nickname (optional)
// //                       </span>

// //                       <input
// //                         value={nickname}
// //                         onChange={(e) =>
// //                           setNickname(
// //                             e.target.value
// //                           )
// //                         }
// //                         placeholder="e.g. Aar"
// //                         className="
// //                           mt-1.5
// //                           w-full
// //                           rounded-2xl
// //                           bg-white/90
// //                           px-4
// //                           py-3
// //                           text-ink-900
// //                           placeholder:text-ink-300
// //                           focus:outline-none
// //                           focus-visible:ring-2
// //                           focus-visible:ring-purple-300
// //                         "
// //                       />
// //                     </label>

// //                     <label>
// //                       <span className="text-sm font-semibold text-purple-100">
// //                         Email Address
// //                       </span>

// //                       <input
// //                         type="email"
// //                         value={email}
// //                         onChange={(e) =>
// //                           setEmail(
// //                             e.target.value
// //                           )
// //                         }
// //                         placeholder="you@example.com"
// //                         className="
// //                           mt-1.5
// //                           w-full
// //                           rounded-2xl
// //                           bg-white/90
// //                           px-4
// //                           py-3
// //                           text-ink-900
// //                           placeholder:text-ink-300
// //                           focus:outline-none
// //                           focus-visible:ring-2
// //                           focus-visible:ring-purple-300
// //                         "
// //                       />
// //                     </label>

// //                   </div>

// //                 </div>
// //               )}

// //               {/* =================================================
// //                   STEP 1 — AVATAR
// //               ================================================= */}

// //               {step === 1 && (
// //                 <div>

// //                   <SectionTitle
// //                     emoji="🎭"
// //                     title="Choose Your Avatar"
// //                     description="Pick a character that feels like you!"
// //                   />

// //                   <div
// //                     className="
// //                       grid
// //                       grid-cols-3
// //                       sm:grid-cols-4
// //                       md:grid-cols-6
// //                       gap-4
// //                     "
// //                   >

// //                     {AVATARS.map(
// //                       (item) => (
// //                         <motion.button
// //                           key={item}
// //                           type="button"
// //                           whileHover={{
// //                             scale: 1.08,
// //                           }}
// //                           whileTap={{
// //                             scale: 0.95,
// //                           }}
// //                           onClick={() =>
// //                             setAvatar(
// //                               item
// //                             )
// //                           }
// //                           className={cn(
// //                             `
// //                               aspect-square
// //                               rounded-2xl
// //                               flex
// //                               items-center
// //                               justify-center
// //                               text-4xl
// //                               transition
// //                               border
// //                             `,
// //                             avatar ===
// //                               item
// //                               ? `
// //                                 bg-white/30
// //                                 border-white
// //                                 ring-2
// //                                 ring-purple-300
// //                                 scale-105
// //                               `
// //                               : `
// //                                 bg-white/10
// //                                 border-white/10
// //                                 hover:bg-white/20
// //                               `
// //                           )}
// //                         >
// //                           {item}
// //                         </motion.button>
// //                       )
// //                     )}

// //                   </div>

// //                 </div>
// //               )}

// //               {/* =================================================
// //                   STEP 2 — AGE
// //               ================================================= */}

// //               {step === 2 && (
// //                 <div>

// //                   <SectionTitle
// //                     emoji="🎂"
// //                     title="How Old Are You?"
// //                     description="Choose your age group."
// //                   />

// //                   <div
// //                     className="
// //                       grid
// //                       grid-cols-1
// //                       sm:grid-cols-3
// //                       gap-4
// //                     "
// //                   >

// //                     {AGE_OPTIONS.map(
// //                       (option) => (
// //                         <SelectionCard
// //                           key={
// //                             option.value
// //                           }
// //                           selected={
// //                             age ===
// //                             option.value
// //                           }
// //                           onClick={() =>
// //                             setAge(
// //                               option.value
// //                             )
// //                           }
// //                           emoji={
// //                             option.emoji
// //                           }
// //                           title={
// //                             option.title
// //                           }
// //                           description={
// //                             option.description
// //                           }
// //                         />
// //                       )
// //                     )}

// //                   </div>

// //                 </div>
// //               )}

// //               {/* =================================================
// //                   STEP 3 — SUPPORT
// //               ================================================= */}

// //               {step === 3 && (
// //                 <div>

// //                   <SectionTitle
// //                     emoji="💜"
// //                     title="Learning Support"
// //                     description="Choose the support that best matches your learning needs."
// //                   />

// //                   <div
// //                     className="
// //                       grid
// //                       grid-cols-1
// //                       md:grid-cols-3
// //                       gap-4
// //                     "
// //                   >

// //                     {SUPPORT_OPTIONS.map(
// //                       (option) => (
// //                         <SelectionCard
// //                           key={
// //                             option.value
// //                           }
// //                           selected={
// //                             support ===
// //                             option.value
// //                           }
// //                           onClick={() =>
// //                             setSupport(
// //                               option.value
// //                             )
// //                           }
// //                           emoji={
// //                             option.emoji
// //                           }
// //                           title={
// //                             option.title
// //                           }
// //                           description={
// //                             option.description
// //                           }
// //                         />
// //                       )
// //                     )}

// //                   </div>

// //                 </div>
// //               )}

// //               {/* =================================================
// //                   STEP 4 — PREFERENCES
// //               ================================================= */}

// //               {step === 4 && (
// //                 <div>

// //                   <SectionTitle
// //                     emoji="🎨"
// //                     title="Learning Preferences"
// //                     description="What makes learning fun for you? Choose one or more."
// //                   />

// //                   <div
// //                     className="
// //                       grid
// //                       grid-cols-2
// //                       sm:grid-cols-3
// //                       gap-3
// //                     "
// //                   >

// //                     {PREFERENCE_OPTIONS.map(
// //                       (option) => {

// //                         const selected =
// //                           preferences.includes(
// //                             option.value
// //                           );

// //                         return (
// //                           <motion.button
// //                             key={
// //                               option.value
// //                             }
// //                             type="button"
// //                             whileHover={{
// //                               scale: 1.03,
// //                             }}
// //                             whileTap={{
// //                               scale: 0.97,
// //                             }}
// //                             onClick={() =>
// //                               togglePreference(
// //                                 option.value
// //                               )
// //                             }
// //                             className={cn(
// //                               `
// //                                 rounded-2xl
// //                                 px-4
// //                                 py-5
// //                                 border
// //                                 transition
// //                                 text-center
// //                                 flex
// //                                 flex-col
// //                                 items-center
// //                                 gap-2
// //                               `,
// //                               selected
// //                                 ? `
// //                                   bg-white/30
// //                                   border-white
// //                                   ring-2
// //                                   ring-purple-300
// //                                 `
// //                                 : `
// //                                   bg-white/10
// //                                   border-white/10
// //                                   hover:bg-white/20
// //                                 `
// //                             )}
// //                           >

// //                             <span className="text-3xl">
// //                               {
// //                                 option.emoji
// //                               }
// //                             </span>

// //                             <span className="text-sm font-semibold text-white">
// //                               {
// //                                 option.value
// //                               }
// //                             </span>

// //                             {selected && (
// //                               <span className="text-xs text-purple-100">
// //                                 ✓ Selected
// //                               </span>
// //                             )}

// //                           </motion.button>
// //                         );
// //                       }
// //                     )}

// //                   </div>

// //                 </div>
// //               )}

// //               {/* =================================================
// //                   STEP 5 — SESSION
// //               ================================================= */}

// //               {step === 5 && (
// //                 <div>

// //                   <SectionTitle
// //                     emoji="⏱️"
// //                     title="Preferred Session Length"
// //                     description="How long would you like each learning session to be?"
// //                   />

// //                   <div
// //                     className="
// //                       grid
// //                       grid-cols-1
// //                       sm:grid-cols-3
// //                       gap-4
// //                     "
// //                   >

// //                     {SESSION_OPTIONS.map(
// //                       (option) => (
// //                         <SelectionCard
// //                           key={
// //                             option.value
// //                           }
// //                           selected={
// //                             sessionLength ===
// //                             option.value
// //                           }
// //                           onClick={() =>
// //                             setSessionLength(
// //                               option.value
// //                             )
// //                           }
// //                           emoji={
// //                             option.emoji
// //                           }
// //                           title={
// //                             option.title
// //                           }
// //                           description={
// //                             option.description
// //                           }
// //                         />
// //                       )
// //                     )}

// //                   </div>

// //                 </div>
// //               )}

// //               {/* =================================================
// //                   STEP 6 — READY / REVIEW
// //               ================================================= */}

// //               {step === 6 && (
// //                 <div>

// //                   <SectionTitle
// //                     emoji="🎉"
// //                     title="Your Profile Is Ready!"
// //                     description="Review your choices before starting your personalized learning adventure."
// //                   />

// //                   <div className="space-y-4">

// //                     {/* BASIC */}

// //                     <ReviewRow
// //                       label="Name"
// //                       value={
// //                         name || "Not provided"
// //                       }
// //                     />

// //                     <ReviewRow
// //                       label="Nickname"
// //                       value={
// //                         nickname ||
// //                         "Not provided"
// //                       }
// //                     />

// //                     <ReviewRow
// //                       label="Email"
// //                       value={
// //                         email ||
// //                         "Not provided"
// //                       }
// //                     />

// //                     {/* AVATAR */}

// //                     <ReviewRow
// //                       label="Avatar"
// //                       value={avatar}
// //                     />

// //                     {/* AGE */}

// //                     <ReviewRow
// //                       label="Age"
// //                       value={
// //                         age || "Not selected"
// //                       }
// //                     />

// //                     {/* SUPPORT */}

// //                     <ReviewRow
// //                       label="Learning Support"
// //                       value={
// //                         support ||
// //                         "Not selected"
// //                       }
// //                     />

// //                     {/* PREFERENCES */}

// //                     <ReviewRow
// //                       label="Preferences"
// //                       value={
// //                         preferences.length > 0
// //                           ? preferences.join(
// //                               ", "
// //                             )
// //                           : "Not selected"
// //                       }
// //                     />

// //                     {/* SESSION */}

// //                     <ReviewRow
// //                       label="Session Length"
// //                       value={`${sessionLength} minutes`}
// //                     />

// //                   </div>

// //                   <div
// //                     className="
// //                       mt-6
// //                       rounded-2xl
// //                       bg-white/10
// //                       border
// //                       border-white/10
// //                       p-5
// //                       text-center
// //                     "
// //                   >
// //                     <div className="text-4xl mb-2">
// //                       🌈
// //                     </div>

// //                     <p className="text-purple-100">
// //                       Everything looks great!
// //                       Let's start learning.
// //                     </p>
// //                   </div>

// //                 </div>
// //               )}

// //             </motion.div>

// //           </AnimatePresence>

// //           {/* ====================================================
// //               NAVIGATION
// //           ==================================================== */}

// //           <div
// //             className="
// //               flex
// //               items-center
// //               justify-between
// //               gap-4
// //               mt-8
// //               pt-6
// //               border-t
// //               border-white/10
// //             "
// //           >

// //             {/* BACK */}

// //             {step > 0 ? (
// //               <Button
// //                 variant="secondary"
// //                 size="lg"
// //                 onClick={back}
// //                 disabled={isSaving}
// //               >
// //                 ← Back
// //               </Button>
// //             ) : (
// //               <Button
// //                 variant="secondary"
// //                 size="lg"
// //                 onClick={
// //                   skipProfile
// //                 }
// //                 disabled={isSaving}
// //               >
// //                 Skip for Now
// //               </Button>
// //             )}

// //             {/* CONTINUE / SAVE */}

// //             {step <
// //             STEP_LABELS.length - 1 ? (
// //               <Button
// //                 size="lg"
// //                 onClick={next}
// //                 disabled={isSaving}
// //               >
// //                 Continue →
// //               </Button>
// //             ) : (
// //               <Button
// //                 size="xl"
// //                 onClick={
// //                   saveProfile
// //                 }
// //                 disabled={isSaving}
// //               >
// //                 {isSaving
// //                   ? "Saving Profile..."
// //                   : "Save & Start Learning 🌈"}
// //               </Button>
// //             )}

// //           </div>

// //         </div>

// //         {/* FOOTER */}

// //         <p
// //           className="
// //             text-center
// //             text-purple-200
// //             text-sm
// //             mt-6
// //             max-w-xl
// //           "
// //         >
// //           You can change these preferences
// //           later from your profile settings.
// //         </p>

// //       </div>

// //       {/* ========================================================
// //           SUCCESS POPUP
// //       ======================================================== */}

// //       <AnimatePresence>

// //         {showSuccess && (
// //           <motion.div
// //             className="
// //               fixed
// //               inset-0
// //               z-50
// //               flex
// //               items-center
// //               justify-center
// //               bg-black/50
// //               px-5
// //             "
// //             initial={{
// //               opacity: 0,
// //             }}
// //             animate={{
// //               opacity: 1,
// //             }}
// //           >

// //             <motion.div
// //               className="
// //                 w-full
// //                 max-w-sm
// //                 rounded-3xl
// //                 bg-white
// //                 p-8
// //                 text-center
// //                 shadow-2xl
// //               "
// //               initial={{
// //                 opacity: 0,
// //                 scale: 0.9,
// //                 y: 20,
// //               }}
// //               animate={{
// //                 opacity: 1,
// //                 scale: 1,
// //                 y: 0,
// //               }}
// //             >

// //               <motion.div
// //                 animate={{
// //                   scale: [
// //                     1,
// //                     1.2,
// //                     1,
// //                   ],
// //                 }}
// //                 transition={{
// //                   duration: 1,
// //                   repeat: Infinity,
// //                 }}
// //                 className="text-6xl mb-4"
// //               >
// //                 🎉
// //               </motion.div>

// //               <h2
// //                 className="
// //                   font-display
// //                   font-semibold
// //                   text-2xl
// //                   text-ink-900
// //                   mb-2
// //                 "
// //               >
// //                 Profile Ready!
// //               </h2>

// //               <p className="text-ink-500">
// //                 Your personalized learning
// //                 adventure is ready to begin.
// //               </p>

// //             </motion.div>

// //           </motion.div>
// //         )}

// //       </AnimatePresence>

// //     </CloudBackground>
// //   );
// // }

// // // ============================================================
// // // SECTION TITLE
// // // ============================================================

// // function SectionTitle({
// //   emoji,
// //   title,
// //   description,
// // }: {
// //   emoji: string;
// //   title: string;
// //   description: string;
// // }) {
// //   return (
// //     <div className="mb-6">

// //       <div
// //         className="
// //           flex
// //           items-center
// //           gap-2
// //           mb-2
// //         "
// //       >

// //         <span className="text-3xl">
// //           {emoji}
// //         </span>

// //         <h2
// //           className="
// //             font-display
// //             font-semibold
// //             text-xl
// //             sm:text-2xl
// //             text-white
// //           "
// //         >
// //           {title}
// //         </h2>

// //       </div>

// //       <p
// //         className="
// //           text-purple-200
// //           text-sm
// //           sm:text-base
// //         "
// //       >
// //         {description}
// //       </p>

// //     </div>
// //   );
// // }

// // // ============================================================
// // // SELECTION CARD
// // // ============================================================

// // function SelectionCard({
// //   selected,
// //   onClick,
// //   emoji,
// //   title,
// //   description,
// // }: {
// //   selected: boolean;
// //   onClick: () => void;
// //   emoji: string;
// //   title: string;
// //   description: string;
// // }) {
// //   return (
// //     <motion.button
// //       type="button"
// //       whileHover={{
// //         y: -3,
// //       }}
// //       whileTap={{
// //         scale: 0.98,
// //       }}
// //       onClick={onClick}
// //       className={cn(
// //         `
// //           text-left
// //           rounded-2xl
// //           p-5
// //           border
// //           transition
// //           w-full
// //         `,
// //         selected
// //           ? `
// //             bg-white/30
// //             border-white
// //             ring-2
// //             ring-purple-300
// //           `
// //           : `
// //             bg-white/10
// //             border-white/10
// //             hover:bg-white/20
// //           `
// //       )}
// //     >

// //       <div
// //         className="
// //           flex
// //           items-start
// //           justify-between
// //           gap-3
// //         "
// //       >

// //         <div>

// //           <div className="text-4xl mb-3">
// //             {emoji}
// //           </div>

// //           <h3
// //             className="
// //               font-semibold
// //               text-white
// //               text-base
// //               sm:text-lg
// //             "
// //           >
// //             {title}
// //           </h3>

// //           <p
// //             className="
// //               text-purple-200
// //               text-sm
// //               mt-1
// //             "
// //           >
// //             {description}
// //           </p>

// //         </div>

// //         {selected && (
// //           <div
// //             className="
// //               w-7
// //               h-7
// //               rounded-full
// //               bg-white
// //               text-purple-700
// //               flex
// //               items-center
// //               justify-center
// //               font-bold
// //               shrink-0
// //             "
// //           >
// //             ✓
// //           </div>
// //         )}

// //       </div>

// //     </motion.button>
// //   );
// // }

// // // ============================================================
// // // REVIEW ROW
// // // ============================================================

// // function ReviewRow({
// //   label,
// //   value,
// // }: {
// //   label: string;
// //   value: string;
// // }) {
// //   return (
// //     <div
// //       className="
// //         flex
// //         flex-col
// //         sm:flex-row
// //         sm:items-center
// //         sm:justify-between
// //         gap-2
// //         rounded-2xl
// //         bg-white/10
// //         border
// //         border-white/10
// //         px-4
// //         py-3
// //       "
// //     >

// //       <span className="text-purple-200 font-semibold">
// //         {label}
// //       </span>

// //       <span className="text-white sm:text-right">
// //         {value}
// //       </span>

// //     </div>
// //   );
// // }



// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useUser } from "@clerk/react";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   ArrowLeft,
//   ArrowRight,
//   Check,
//   Sparkles,
//   User,
//   Heart,
//   Gamepad2,
//   Clock,
//   Save,
//   Loader2,
// } from "lucide-react";

// // ---------------------------------------------------------
// // TYPES
// // ---------------------------------------------------------

// type AgeGroup = "5-8" | "9-12" | "13-18";

// type SupportType =
//   | "ADHD"
//   | "Intellectual Disability"
//   | "Autism";

// type LearningPreference =
//   | "Games"
//   | "Stories"
//   | "Music"
//   | "Drawing"
//   | "Puzzles"
//   | "Videos"
//   | "Movement"
//   | "Animals"
//   | "Science";

// type ProfileData = {
//   name: string;
//   email: string;
//   nickname: string;
//   avatar: string;
//   age: AgeGroup | "";
//   support: SupportType | "";
//   preferences: LearningPreference[];
//   sessionLength: 5 | 10 | 20;
//   clerkId: string;
// };

// // ---------------------------------------------------------
// // OPTIONS
// // ---------------------------------------------------------

// const avatars = [
//   "😊",
//   "🦊",
//   "🐼",
//   "🐯",
//   "🐸",
//   "🦄",
//   "🐨",
//   "🐰",
//   "🐻",
//   "🐱",
//   "🐶",
//   "🦁",
// ];

// const ageOptions: {
//   value: AgeGroup;
//   title: string;
//   description: string;
//   emoji: string;
// }[] = [
//   {
//     value: "5-8",
//     title: "5 - 8 years",
//     description: "Early learning and basic skills",
//     emoji: "🌱",
//   },
//   {
//     value: "9-12",
//     title: "9 - 12 years",
//     description: "Growing skills and exploration",
//     emoji: "🚀",
//   },
//   {
//     value: "13-18",
//     title: "13 - 18 years",
//     description: "Advanced learning and independence",
//     emoji: "🌟",
//   },
// ];

// const supportOptions: {
//   value: SupportType;
//   title: string;
//   description: string;
//   emoji: string;
// }[] = [
//   {
//     value: "ADHD",
//     title: "ADHD",
//     description:
//       "Activities designed to support focus, attention and engagement.",
//     emoji: "🎯",
//   },
//   {
//     value: "Intellectual Disability",
//     title: "Intellectual Disability",
//     description:
//       "Simple and supportive activities for learning and confidence.",
//     emoji: "💙",
//   },
//   {
//     value: "Autism",
//     title: "Autism",
//     description:
//       "Structured activities supporting communication, learning and confidence.",
//     emoji: "🌈",
//   },
// ];

// const preferenceOptions: {
//   value: LearningPreference;
//   label: string;
//   emoji: string;
// }[] = [
//   {
//     value: "Games",
//     label: "Games",
//     emoji: "🎮",
//   },
//   {
//     value: "Stories",
//     label: "Stories",
//     emoji: "📖",
//   },
//   {
//     value: "Music",
//     label: "Music",
//     emoji: "🎵",
//   },
//   {
//     value: "Drawing",
//     label: "Drawing",
//     emoji: "🎨",
//   },
//   {
//     value: "Puzzles",
//     label: "Puzzles",
//     emoji: "🧩",
//   },
//   {
//     value: "Videos",
//     label: "Videos",
//     emoji: "🎬",
//   },
//   {
//     value: "Movement",
//     label: "Movement",
//     emoji: "🏃",
//   },
//   {
//     value: "Animals",
//     label: "Animals",
//     emoji: "🐾",
//   },
//   {
//     value: "Science",
//     label: "Science",
//     emoji: "🔬",
//   },
// ];

// const sessionOptions: {
//   value: 5 | 10 | 20;
//   title: string;
//   description: string;
//   emoji: string;
// }[] = [
//   {
//     value: 5,
//     title: "5 minutes",
//     description: "Quick learning session",
//     emoji: "⚡",
//   },
//   {
//     value: 10,
//     title: "10 minutes",
//     description: "Balanced learning session",
//     emoji: "🌱",
//   },
//   {
//     value: 20,
//     title: "20 minutes",
//     description: "Longer learning session",
//     emoji: "🚀",
//   },
// ];

// // ---------------------------------------------------------
// // COMPONENT
// // ---------------------------------------------------------

// export default function User_profile() {
//   const navigate = useNavigate();

//   const { user, isLoaded } = useUser();

//   // -------------------------------------------------------
//   // FORM STATE
//   // -------------------------------------------------------

//   const [step, setStep] = useState(0);

//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");

//   const [nickname, setNickname] = useState("");

//   const [avatar, setAvatar] = useState("😊");

//   const [age, setAge] = useState<AgeGroup | "">("");

//   const [support, setSupport] = useState<SupportType | "">("");

//   const [preferences, setPreferences] = useState<
//     LearningPreference[]
//   >([]);

//   const [sessionLength, setSessionLength] =
//     useState<5 | 10 | 20>(10);

//   // -------------------------------------------------------
//   // UI STATE
//   // -------------------------------------------------------

//   const [error, setError] = useState("");

//   const [isSaving, setIsSaving] = useState(false);

//   const [showSuccess, setShowSuccess] = useState(false);

//   // -------------------------------------------------------
//   // AUTH GUARD
//   // -------------------------------------------------------

//   useEffect(() => {
//     if (isLoaded && !user) {
//       navigate("/register", {
//         replace: true,
//       });
//     }
//   }, [isLoaded, user, navigate]);

//   // -------------------------------------------------------
//   // LOAD USER INFORMATION FROM CLERK
//   // -------------------------------------------------------

//   useEffect(() => {
//     if (!user) return;

//     // Get email from Clerk
//     const clerkEmail =
//       user.primaryEmailAddress?.emailAddress || "";

//     // Get name from Clerk
//     const clerkName =
//       user.fullName ||
//       `${user.firstName || ""} ${user.lastName || ""}`.trim();

//     setName(clerkName);
//     setEmail(clerkEmail);
//   }, [user]);

//   // -------------------------------------------------------
//   // LOADING
//   // -------------------------------------------------------

//   if (!isLoaded) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
//         <div className="flex flex-col items-center gap-4">
//           <Loader2 className="w-10 h-10 animate-spin" />

//           <p className="text-lg">
//             Loading your profile...
//           </p>
//         </div>
//       </div>
//     );
//   }

//   // -------------------------------------------------------
//   // IF USER IS NOT LOGGED IN
//   // -------------------------------------------------------

//   if (!user) {
//     return null;
//   }

//   // -------------------------------------------------------
//   // STEP TITLES
//   // -------------------------------------------------------

//   const stepTitles = [
//     "Let's get to know you",
//     "Choose your avatar",
//     "How old are you?",
//     "How can we support you?",
//     "What do you enjoy?",
//     "Choose your session",
//     "You're all set!",
//   ];

//   // -------------------------------------------------------
//   // PROGRESS
//   // -------------------------------------------------------

//   const progress =
//     ((step + 1) / stepTitles.length) * 100;

//   // -------------------------------------------------------
//   // VALIDATE CURRENT STEP
//   // -------------------------------------------------------

//   function validateStep(): boolean {
//     setError("");

//     // STEP 0
//     if (step === 0) {
//       if (!name.trim()) {
//         setError("Please enter your name.");
//         return false;
//       }

//       if (!email.trim()) {
//         setError("Please enter your email.");
//         return false;
//       }

//       return true;
//     }

//     // STEP 1
//     if (step === 1) {
//       if (!avatar) {
//         setError("Please choose an avatar.");
//         return false;
//       }

//       return true;
//     }

//     // STEP 2
//     if (step === 2) {
//       if (!age) {
//         setError("Please select your age group.");
//         return false;
//       }

//       return true;
//     }

//     // STEP 3
//     if (step === 3) {
//       if (!support) {
//         setError(
//           "Please select the learning support option."
//         );

//         return false;
//       }

//       return true;
//     }

//     // STEP 4
//     if (step === 4) {
//       if (preferences.length === 0) {
//         setError(
//           "Please select at least one learning preference."
//         );

//         return false;
//       }

//       return true;
//     }

//     // STEP 5
//     if (step === 5) {
//       if (![5, 10, 20].includes(sessionLength)) {
//         setError(
//           "Please select a session length."
//         );

//         return false;
//       }

//       return true;
//     }

//     // STEP 6
//     return true;
//   }

//   // -------------------------------------------------------
//   // NEXT STEP
//   // -------------------------------------------------------

//   function nextStep() {
//     if (!validateStep()) {
//       return;
//     }

//     setError("");

//     if (step < 6) {
//       setStep((previousStep) => previousStep + 1);
//     }
//   }

//   // -------------------------------------------------------
//   // PREVIOUS STEP
//   // -------------------------------------------------------

//   function previousStep() {
//     setError("");

//     if (step > 0) {
//       setStep((previousStep) => previousStep - 1);
//     }
//   }

//   // -------------------------------------------------------
//   // TOGGLE PREFERENCE
//   // -------------------------------------------------------

//   function togglePreference(
//     preference: LearningPreference
//   ) {
//     setPreferences((currentPreferences) => {
//       if (currentPreferences.includes(preference)) {
//         return currentPreferences.filter(
//           (item) => item !== preference
//         );
//       }

//       return [
//         ...currentPreferences,
//         preference,
//       ];
//     });
//   }

//   // -------------------------------------------------------
//   // SAVE PROFILE TO MONGODB
//   // -------------------------------------------------------

//   async function saveProfile() {
//     if (isSaving) {
//       return;
//     }

//     setError("");

//     // Make sure all required values exist
//     if (!name.trim()) {
//       setError("Name is required.");
//       setStep(0);
//       return;
//     }

//     if (!email.trim()) {
//       setError("Email is required.");
//       setStep(0);
//       return;
//     }

//     if (!avatar) {
//       setError("Please select an avatar.");
//       setStep(1);
//       return;
//     }

//     if (!age) {
//       setError("Please select your age group.");
//       setStep(2);
//       return;
//     }

//     if (!support) {
//       setError(
//         "Please select your learning support."
//       );
//       setStep(3);
//       return;
//     }

//     if (preferences.length === 0) {
//       setError(
//         "Please select at least one learning preference."
//       );
//       setStep(4);
//       return;
//     }

//     if (![5, 10, 20].includes(sessionLength)) {
//       setError(
//         "Please select a valid session length."
//       );
//       setStep(5);
//       return;
//     }

//     // Make sure Clerk user ID exists
//     if (!user?.id) {
//       setError(
//         "Your account session could not be found. Please sign in again."
//       );

//       return;
//     }

//     // -----------------------------------------------------
//     // DATA SENT TO BACKEND
//     // -----------------------------------------------------

//     const profileData: ProfileData = {
//       clerkId: user.id,

//       name: name.trim(),

//       email: email.trim(),

//       nickname: nickname.trim(),

//       avatar,

//       age,

//       support,

//       preferences,

//       sessionLength,
//     };

//     console.log(
//       "📤 Sending profile data to backend:",
//       profileData
//     );

//     setIsSaving(true);

//     try {
//       // ---------------------------------------------------
//       // BACKEND REQUEST
//       // ---------------------------------------------------

//       const response = await fetch(
//         "http://localhost:5000/api/users/profile",
//         {
//           method: "POST",

//           headers: {
//             "Content-Type": "application/json",
//           },

//           body: JSON.stringify(profileData),
//         }
//       );

//       // ---------------------------------------------------
//       // READ SERVER RESPONSE
//       // ---------------------------------------------------

//       const data = await response.json();

//       console.log(
//         "📥 Backend response:",
//         data
//       );

//       // ---------------------------------------------------
//       // HANDLE ERROR RESPONSE
//       // ---------------------------------------------------

//       if (!response.ok) {
//         throw new Error(
//           data.message ||
//             "Failed to save profile."
//         );
//       }

//       // ---------------------------------------------------
//       // SUCCESS
//       // ---------------------------------------------------

//       console.log(
//         "✅ Profile successfully saved in MongoDB!"
//       );

//       setShowSuccess(true);

//       // ---------------------------------------------------
//       // GO TO DASHBOARD
//       // ---------------------------------------------------

//       setTimeout(() => {
//         navigate("/dashboard", {
//           replace: true,
//         });
//       }, 1200);
//     } catch (error) {
//       console.error(
//         "❌ Profile save failed:",
//         error
//       );

//       if (error instanceof Error) {
//         setError(error.message);
//       } else {
//         setError(
//           "Couldn't save your profile. Please try again."
//         );
//       }
//     } finally {
//       setIsSaving(false);
//     }
//   }

//   // -------------------------------------------------------
//   // SKIP PROFILE
//   // -------------------------------------------------------

//   function skipProfile() {
//     navigate("/dashboard", {
//       replace: true,
//     });
//   }

//   // -------------------------------------------------------
//   // RENDER
//   // -------------------------------------------------------

//   return (
//     <div className="min-h-screen bg-slate-950 text-white relative overflow-hidden">
//       {/* =================================================
//           BACKGROUND
//       ================================================= */}

//       <div className="absolute inset-0 pointer-events-none">
//         <div className="absolute top-[-200px] left-[-200px] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-3xl" />

//         <div className="absolute bottom-[-200px] right-[-200px] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-3xl" />

//         <div className="absolute top-[40%] left-[50%] w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-3xl" />
//       </div>

//       {/* =================================================
//           HEADER
//       ================================================= */}

//       <div className="relative z-10 max-w-5xl mx-auto px-6 pt-8">
//         <div className="flex items-center justify-between">
//           {/* LOGO / TITLE */}

//           <div className="flex items-center gap-3">
//             <div className="w-11 h-11 rounded-2xl bg-blue-600/20 border border-blue-400/30 flex items-center justify-center">
//               <Sparkles className="w-6 h-6 text-blue-300" />
//             </div>

//             <div>
//               <h1 className="font-bold text-xl">
//                 Inspirenest
//               </h1>

//               <p className="text-xs text-slate-400">
//                 Personalized learning
//               </p>
//             </div>
//           </div>

//           {/* SKIP */}

//           {step < 6 && (
//             <button
//               onClick={skipProfile}
//               className="text-sm text-slate-400 hover:text-white transition"
//             >
//               Skip for now
//             </button>
//           )}
//         </div>

//         {/* =================================================
//             PROGRESS
//         ================================================= */}

//         <div className="mt-8">
//           <div className="flex justify-between items-center mb-3">
//             <span className="text-sm text-slate-400">
//               Step {step + 1} of 7
//             </span>

//             <span className="text-sm text-blue-300">
//               {Math.round(progress)}%
//             </span>
//           </div>

//           <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
//             <motion.div
//               className="h-full bg-blue-500 rounded-full"
//               initial={{ width: 0 }}
//               animate={{
//                 width: `${progress}%`,
//               }}
//               transition={{
//                 duration: 0.4,
//               }}
//             />
//           </div>
//         </div>
//       </div>

//       {/* =================================================
//           MAIN CONTENT
//       ================================================= */}

//       <main className="relative z-10 max-w-3xl mx-auto px-6 py-12">
//         <AnimatePresence mode="wait">
//           {/* =================================================
//               STEP 0 - BASIC INFORMATION
//           ================================================= */}

//           {step === 0 && (
//             <motion.div
//               key="step-0"
//               initial={{
//                 opacity: 0,
//                 x: 30,
//               }}
//               animate={{
//                 opacity: 1,
//                 x: 0,
//               }}
//               exit={{
//                 opacity: 0,
//                 x: -30,
//               }}
//               className="space-y-8"
//             >
//               <StepHeading
//                 icon={<User />}
//                 title="Let's get to know you"
//                 description="Tell us a little about yourself."
//               />

//               <div className="space-y-6">
//                 {/* NAME */}

//                 <div>
//                   <label className="block text-sm font-medium text-slate-300 mb-2">
//                     Name
//                   </label>

//                   <input
//                     type="text"
//                     value={name}
//                     onChange={(event) =>
//                       setName(event.target.value)
//                     }
//                     placeholder="Enter your name"
//                     className="w-full px-5 py-4 rounded-2xl bg-slate-900 border border-slate-700 focus:border-blue-500 focus:outline-none transition text-white placeholder:text-slate-500"
//                   />
//                 </div>

//                 {/* EMAIL */}

//                 <div>
//                   <label className="block text-sm font-medium text-slate-300 mb-2">
//                     Email
//                   </label>

//                   <input
//                     type="email"
//                     value={email}
//                     onChange={(event) =>
//                       setEmail(event.target.value)
//                     }
//                     placeholder="Enter your email"
//                     className="w-full px-5 py-4 rounded-2xl bg-slate-900 border border-slate-700 focus:border-blue-500 focus:outline-none transition text-white placeholder:text-slate-500"
//                   />
//                 </div>

//                 {/* NICKNAME */}

//                 <div>
//                   <label className="block text-sm font-medium text-slate-300 mb-2">
//                     Nickname
//                     <span className="text-slate-500 ml-2">
//                       (optional)
//                     </span>
//                   </label>

//                   <input
//                     type="text"
//                     value={nickname}
//                     onChange={(event) =>
//                       setNickname(event.target.value)
//                     }
//                     placeholder="What should we call you?"
//                     className="w-full px-5 py-4 rounded-2xl bg-slate-900 border border-slate-700 focus:border-blue-500 focus:outline-none transition text-white placeholder:text-slate-500"
//                   />
//                 </div>
//               </div>
//             </motion.div>
//           )}

//           {/* =================================================
//               STEP 1 - AVATAR
//           ================================================= */}

//           {step === 1 && (
//             <motion.div
//               key="step-1"
//               initial={{
//                 opacity: 0,
//                 x: 30,
//               }}
//               animate={{
//                 opacity: 1,
//                 x: 0,
//               }}
//               exit={{
//                 opacity: 0,
//                 x: -30,
//               }}
//               className="space-y-8"
//             >
//               <StepHeading
//                 icon={<Sparkles />}
//                 title="Choose your avatar"
//                 description="Pick a character that feels like you!"
//               />

//               <div className="grid grid-cols-3 sm:grid-cols-4 gap-5">
//                 {avatars.map((item) => (
//                   <button
//                     key={item}
//                     type="button"
//                     onClick={() => setAvatar(item)}
//                     className={`aspect-square rounded-3xl border-2 flex items-center justify-center text-5xl transition ${
//                       avatar === item
//                         ? "border-blue-500 bg-blue-500/20 scale-105"
//                         : "border-slate-700 bg-slate-900 hover:border-slate-500"
//                     }`}
//                   >
//                     {item}

//                     {avatar === item && (
//                       <div className="absolute" />
//                     )}
//                   </button>
//                 ))}
//               </div>

//               <div className="text-center">
//                 <p className="text-slate-400">
//                   Your selected avatar
//                 </p>

//                 <div className="text-7xl mt-3">
//                   {avatar}
//                 </div>
//               </div>
//             </motion.div>
//           )}

//           {/* =================================================
//               STEP 2 - AGE
//           ================================================= */}

//           {step === 2 && (
//             <motion.div
//               key="step-2"
//               initial={{
//                 opacity: 0,
//                 x: 30,
//               }}
//               animate={{
//                 opacity: 1,
//                 x: 0,
//               }}
//               exit={{
//                 opacity: 0,
//                 x: -30,
//               }}
//               className="space-y-8"
//             >
//               <StepHeading
//                 icon={<Heart />}
//                 title="How old are you?"
//                 description="This helps us personalize your learning activities."
//               />

//               <div className="space-y-4">
//                 {ageOptions.map((option) => (
//                   <button
//                     key={option.value}
//                     type="button"
//                     onClick={() =>
//                       setAge(option.value)
//                     }
//                     className={`w-full p-5 rounded-3xl border-2 text-left flex items-center gap-5 transition ${
//                       age === option.value
//                         ? "border-blue-500 bg-blue-500/15"
//                         : "border-slate-700 bg-slate-900 hover:border-slate-500"
//                     }`}
//                   >
//                     <div className="text-4xl">
//                       {option.emoji}
//                     </div>

//                     <div className="flex-1">
//                       <h3 className="font-bold text-lg">
//                         {option.title}
//                       </h3>

//                       <p className="text-sm text-slate-400 mt-1">
//                         {option.description}
//                       </p>
//                     </div>

//                     {age === option.value && (
//                       <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
//                         <Check className="w-5 h-5" />
//                       </div>
//                     )}
//                   </button>
//                 ))}
//               </div>
//             </motion.div>
//           )}

//           {/* =================================================
//               STEP 3 - SUPPORT
//           ================================================= */}

//           {step === 3 && (
//             <motion.div
//               key="step-3"
//               initial={{
//                 opacity: 0,
//                 x: 30,
//               }}
//               animate={{
//                 opacity: 1,
//                 x: 0,
//               }}
//               exit={{
//                 opacity: 0,
//                 x: -30,
//               }}
//               className="space-y-8"
//             >
//               <StepHeading
//                 icon={<Heart />}
//                 title="How can we support you?"
//                 description="Choose the option that best matches your learning support needs."
//               />

//               <div className="space-y-4">
//                 {supportOptions.map((option) => (
//                   <button
//                     key={option.value}
//                     type="button"
//                     onClick={() =>
//                       setSupport(option.value)
//                     }
//                     className={`w-full p-5 rounded-3xl border-2 text-left flex items-center gap-5 transition ${
//                       support === option.value
//                         ? "border-blue-500 bg-blue-500/15"
//                         : "border-slate-700 bg-slate-900 hover:border-slate-500"
//                     }`}
//                   >
//                     <div className="text-4xl">
//                       {option.emoji}
//                     </div>

//                     <div className="flex-1">
//                       <h3 className="font-bold text-lg">
//                         {option.title}
//                       </h3>

//                       <p className="text-sm text-slate-400 mt-1">
//                         {option.description}
//                       </p>
//                     </div>

//                     {support === option.value && (
//                       <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
//                         <Check className="w-5 h-5" />
//                       </div>
//                     )}
//                   </button>
//                 ))}
//               </div>
//             </motion.div>
//           )}

//           {/* =================================================
//               STEP 4 - PREFERENCES
//           ================================================= */}

//           {step === 4 && (
//             <motion.div
//               key="step-4"
//               initial={{
//                 opacity: 0,
//                 x: 30,
//               }}
//               animate={{
//                 opacity: 1,
//                 x: 0,
//               }}
//               exit={{
//                 opacity: 0,
//                 x: -30,
//               }}
//               className="space-y-8"
//             >
//               <StepHeading
//                 icon={<Gamepad2 />}
//                 title="What do you enjoy?"
//                 description="Choose one or more activities you would like to learn with."
//               />

//               <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
//                 {preferenceOptions.map(
//                   (option) => {
//                     const selected =
//                       preferences.includes(
//                         option.value
//                       );

//                     return (
//                       <button
//                         key={option.value}
//                         type="button"
//                         onClick={() =>
//                           togglePreference(
//                             option.value
//                           )
//                         }
//                         className={`relative p-5 rounded-3xl border-2 flex flex-col items-center justify-center gap-3 min-h-[140px] transition ${
//                           selected
//                             ? "border-blue-500 bg-blue-500/15"
//                             : "border-slate-700 bg-slate-900 hover:border-slate-500"
//                         }`}
//                       >
//                         <span className="text-4xl">
//                           {option.emoji}
//                         </span>

//                         <span className="font-medium">
//                           {option.label}
//                         </span>

//                         {selected && (
//                           <span className="absolute top-3 right-3 w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
//                             <Check className="w-4 h-4" />
//                           </span>
//                         )}
//                       </button>
//                     );
//                   }
//                 )}
//               </div>

//               <p className="text-center text-sm text-slate-400">
//                 {preferences.length}{" "}
//                 {preferences.length === 1
//                   ? "preference"
//                   : "preferences"}{" "}
//                 selected
//               </p>
//             </motion.div>
//           )}

//           {/* =================================================
//               STEP 5 - SESSION LENGTH
//           ================================================= */}

//           {step === 5 && (
//             <motion.div
//               key="step-5"
//               initial={{
//                 opacity: 0,
//                 x: 30,
//               }}
//               animate={{
//                 opacity: 1,
//                 x: 0,
//               }}
//               exit={{
//                 opacity: 0,
//                 x: -30,
//               }}
//               className="space-y-8"
//             >
//               <StepHeading
//                 icon={<Clock />}
//                 title="Choose your session length"
//                 description="How long would you like each learning session to be?"
//               />

//               <div className="space-y-4">
//                 {sessionOptions.map(
//                   (option) => (
//                     <button
//                       key={option.value}
//                       type="button"
//                       onClick={() =>
//                         setSessionLength(
//                           option.value
//                         )
//                       }
//                       className={`w-full p-6 rounded-3xl border-2 text-left flex items-center gap-5 transition ${
//                         sessionLength ===
//                         option.value
//                           ? "border-blue-500 bg-blue-500/15"
//                           : "border-slate-700 bg-slate-900 hover:border-slate-500"
//                       }`}
//                     >
//                       <div className="text-4xl">
//                         {option.emoji}
//                       </div>

//                       <div className="flex-1">
//                         <h3 className="font-bold text-lg">
//                           {option.title}
//                         </h3>

//                         <p className="text-sm text-slate-400 mt-1">
//                           {option.description}
//                         </p>
//                       </div>

//                       {sessionLength ===
//                         option.value && (
//                         <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
//                           <Check className="w-5 h-5" />
//                         </div>
//                       )}
//                     </button>
//                   )
//                 )}
//               </div>
//             </motion.div>
//           )}

//           {/* =================================================
//               STEP 6 - READY
//           ================================================= */}

//           {step === 6 && (
//             <motion.div
//               key="step-6"
//               initial={{
//                 opacity: 0,
//                 scale: 0.95,
//               }}
//               animate={{
//                 opacity: 1,
//                 scale: 1,
//               }}
//               className="text-center space-y-8"
//             >
//               <div className="flex justify-center">
//                 <motion.div
//                   animate={{
//                     y: [0, -10, 0],
//                   }}
//                   transition={{
//                     repeat: Infinity,
//                     duration: 2,
//                   }}
//                   className="text-8xl"
//                 >
//                   {avatar}
//                 </motion.div>
//               </div>

//               <div>
//                 <div className="flex items-center justify-center gap-2">
//                   <Sparkles className="w-6 h-6 text-yellow-300" />

//                   <h2 className="text-3xl sm:text-4xl font-bold">
//                     You're all set!
//                   </h2>

//                   <Sparkles className="w-6 h-6 text-yellow-300" />
//                 </div>

//                 <p className="text-slate-400 mt-4 max-w-lg mx-auto">
//                   Your personalized learning
//                   experience is ready. Let's start
//                   learning and exploring together!
//                 </p>
//               </div>

//               {/* PROFILE SUMMARY */}

//               <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6 text-left space-y-4">
//                 <SummaryRow
//                   label="Name"
//                   value={
//                     nickname.trim() ||
//                     name
//                   }
//                 />

//                 <SummaryRow
//                   label="Age"
//                   value={age}
//                 />

//                 <SummaryRow
//                   label="Support"
//                   value={support}
//                 />

//                 <SummaryRow
//                   label="Session"
//                   value={`${sessionLength} minutes`}
//                 />

//                 <div>
//                   <p className="text-sm text-slate-500 mb-2">
//                     Preferences
//                   </p>

//                   <div className="flex flex-wrap gap-2">
//                     {preferences.map(
//                       (preference) => (
//                         <span
//                           key={preference}
//                           className="px-3 py-1.5 rounded-full bg-blue-500/15 text-blue-300 text-sm"
//                         >
//                           {preference}
//                         </span>
//                       )
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* =================================================
//             ERROR MESSAGE
//         ================================================= */}

//         {error && (
//           <motion.div
//             initial={{
//               opacity: 0,
//               y: 10,
//             }}
//             animate={{
//               opacity: 1,
//               y: 0,
//             }}
//             className="mt-8 p-4 rounded-2xl border border-red-500/30 bg-red-500/10 text-red-300 text-sm text-center"
//           >
//             {error}
//           </motion.div>
//         )}

//         {/* =================================================
//             SUCCESS MESSAGE
//         ================================================= */}

//         {showSuccess && (
//           <motion.div
//             initial={{
//               opacity: 0,
//               scale: 0.95,
//             }}
//             animate={{
//               opacity: 1,
//               scale: 1,
//             }}
//             className="mt-8 p-5 rounded-2xl border border-green-500/30 bg-green-500/10 text-green-300 text-center"
//           >
//             <div className="flex items-center justify-center gap-2">
//               <Check className="w-5 h-5" />

//               <span>
//                 Profile saved successfully!
//                 Redirecting to dashboard...
//               </span>
//             </div>
//           </motion.div>
//         )}

//         {/* =================================================
//             NAVIGATION BUTTONS
//         ================================================= */}

//         <div className="flex items-center justify-between mt-10">
//           {/* BACK */}

//           <button
//             type="button"
//             onClick={previousStep}
//             disabled={step === 0 || isSaving}
//             className={`flex items-center gap-2 px-5 py-3 rounded-2xl transition ${
//               step === 0
//                 ? "opacity-0 pointer-events-none"
//                 : "bg-slate-800 hover:bg-slate-700"
//             }`}
//           >
//             <ArrowLeft className="w-5 h-5" />

//             Back
//           </button>

//           {/* NEXT / SAVE */}

//           {step < 6 ? (
//             <button
//               type="button"
//               onClick={nextStep}
//               disabled={isSaving}
//               className="flex items-center gap-2 px-7 py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 transition font-semibold disabled:opacity-50"
//             >
//               Continue

//               <ArrowRight className="w-5 h-5" />
//             </button>
//           ) : (
//             <button
//               type="button"
//               onClick={saveProfile}
//               disabled={isSaving || showSuccess}
//               className="flex items-center gap-2 px-7 py-4 rounded-2xl bg-blue-600 hover:bg-blue-500 transition font-semibold disabled:opacity-50"
//             >
//               {isSaving ? (
//                 <>
//                   <Loader2 className="w-5 h-5 animate-spin" />

//                   Saving...
//                 </>
//               ) : (
//                 <>
//                   <Save className="w-5 h-5" />

//                   Save & Start Learning 🌈
//                 </>
//               )}
//             </button>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// }

// // =========================================================
// // STEP HEADING COMPONENT
// // =========================================================

// function StepHeading({
//   icon,
//   title,
//   description,
// }: {
//   icon: React.ReactNode;
//   title: string;
//   description: string;
// }) {
//   return (
//     <div className="text-center">
//       <div className="flex justify-center mb-5">
//         <div className="w-14 h-14 rounded-2xl bg-blue-500/15 border border-blue-400/20 flex items-center justify-center text-blue-300">
//           {icon}
//         </div>
//       </div>

//       <h2 className="text-3xl sm:text-4xl font-bold">
//         {title}
//       </h2>

//       <p className="text-slate-400 mt-3 max-w-xl mx-auto">
//         {description}
//       </p>
//     </div>
//   );
// }

// // =========================================================
// // SUMMARY ROW
// // =========================================================

// function SummaryRow({
//   label,
//   value,
// }: {
//   label: string;
//   value: string | number;
// }) {
//   return (
//     <div className="flex items-center justify-between gap-4 border-b border-slate-800 pb-3">
//       <span className="text-slate-500 text-sm">
//         {label}
//       </span>

//       <span className="font-medium text-right">
//         {value || "Not selected"}
//       </span>
//     </div>
//   );
// }



// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useUser } from "@clerk/react";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   ArrowLeft,
//   ArrowRight,
//   Check,
//   Sparkles,
//   User,
//   Heart,
//   Gamepad2,
//   Clock,
//   Save,
//   Loader2,
// } from "lucide-react";

// import { CloudBackground } from "@/components/backgrounds/CloudBackground";
// import { Button } from "@/components/ui/Button";
// import { Stepper } from "@/components/ui/Stepper";
// import { cn } from "@/lib/cn";

// // ---------------------------------------------------------
// // TYPES
// // ---------------------------------------------------------

// type AgeGroup = "5-8" | "9-12" | "13-18";

// type SupportType =
//   | "ADHD"
//   | "Intellectual Disability"
//   | "Autism";

// type LearningPreference =
//   | "Games"
//   | "Stories"
//   | "Music"
//   | "Drawing"
//   | "Puzzles"
//   | "Videos"
//   | "Movement"
//   | "Animals"
//   | "Science";

// type ProfileData = {
//   name: string;
//   email: string;
//   nickname: string;
//   avatar: string;
//   age: AgeGroup | "";
//   support: SupportType | "";
//   preferences: LearningPreference[];
//   sessionLength: 5 | 10 | 20;
//   clerkId: string;
// };

// // ---------------------------------------------------------
// // OPTIONS
// // ---------------------------------------------------------

// const avatars = [
//   "😊",
//   "🦊",
//   "🐼",
//   "🐯",
//   "🐸",
//   "🦄",
//   "🐨",
//   "🐰",
//   "🐻",
//   "🐱",
//   "🐶",
//   "🦁",
// ];

// const ageOptions: {
//   value: AgeGroup;
//   title: string;
//   description: string;
//   emoji: string;
// }[] = [
//   {
//     value: "5-8",
//     title: "5 - 8 years",
//     description: "Early learning and basic skills",
//     emoji: "🌱",
//   },
//   {
//     value: "9-12",
//     title: "9 - 12 years",
//     description: "Growing skills and exploration",
//     emoji: "🚀",
//   },
//   {
//     value: "13-18",
//     title: "13 - 18 years",
//     description: "Advanced learning and independence",
//     emoji: "🌟",
//   },
// ];

// const supportOptions: {
//   value: SupportType;
//   title: string;
//   description: string;
//   emoji: string;
// }[] = [
//   {
//     value: "ADHD",
//     title: "ADHD Support",
//     description: "Focus, attention & activity",
//     emoji: "⚡",
//   },
//   {
//     value: "Intellectual Disability",
//     title: "Intellectual Disability",
//     description: "Accessible learning support",
//     emoji: "💜",
//   },
//   {
//     value: "Autism",
//     title: "Autism Support",
//     description: "Communication & confidence",
//     emoji: "💙",
//   },
// ];

// const preferenceOptions: {
//   value: LearningPreference;
//   label: string;
//   emoji: string;
// }[] = [
//   { value: "Games", label: "Games", emoji: "🎮" },
//   { value: "Stories", label: "Stories", emoji: "📖" },
//   { value: "Music", label: "Music", emoji: "🎵" },
//   { value: "Drawing", label: "Drawing", emoji: "🎨" },
//   { value: "Puzzles", label: "Puzzles", emoji: "🧩" },
//   { value: "Videos", label: "Videos", emoji: "🎬" },
//   { value: "Movement", label: "Movement", emoji: "🏃" },
//   { value: "Animals", label: "Animals", emoji: "🐾" },
//   { value: "Science", label: "Science", emoji: "🔬" },
// ];

// const sessionOptions: {
//   value: 5 | 10 | 20;
//   title: string;
//   description: string;
//   emoji: string;
// }[] = [
//   {
//     value: 5,
//     title: "5 min",
//     description: "Quick & easy",
//     emoji: "🌱",
//   },
//   {
//     value: 10,
//     title: "10 min",
//     description: "Balanced session",
//     emoji: "🌈",
//   },
//   {
//     value: 20,
//     title: "20 min",
//     description: "Deep learning",
//     emoji: "🚀",
//   },
// ];

// // ---------------------------------------------------------
// // STEP LABELS
// // ---------------------------------------------------------

// const STEP_LABELS = [
//   "Basic",
//   "Avatar",
//   "Age",
//   "Support",
//   "Preferences",
//   "Session",
//   "Ready",
// ];

// // ---------------------------------------------------------
// // COMPONENT
// // ---------------------------------------------------------

// export default function User_profile() {
//   const navigate = useNavigate();

//   const { user, isLoaded } = useUser();

//   // -------------------------------------------------------
//   // FORM STATE
//   // -------------------------------------------------------

//   const [step, setStep] = useState(0);

//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");

//   const [nickname, setNickname] = useState("");

//   const [avatar, setAvatar] = useState("😊");

//   const [age, setAge] = useState<AgeGroup | "">("");

//   const [support, setSupport] = useState<SupportType | "">("");

//   const [preferences, setPreferences] = useState<
//     LearningPreference[]
//   >([]);

//   const [sessionLength, setSessionLength] =
//     useState<5 | 10 | 20>(10);

//   // -------------------------------------------------------
//   // UI STATE
//   // -------------------------------------------------------

//   const [error, setError] = useState("");

//   const [isSaving, setIsSaving] = useState(false);

//   const [showSuccess, setShowSuccess] = useState(false);

//   // -------------------------------------------------------
//   // AUTH GUARD
//   // -------------------------------------------------------

//   useEffect(() => {
//     if (isLoaded && !user) {
//       navigate("/register", {
//         replace: true,
//       });
//     }
//   }, [isLoaded, user, navigate]);

//   // -------------------------------------------------------
//   // LOAD USER INFORMATION FROM CLERK
//   // -------------------------------------------------------

//   useEffect(() => {
//     if (!user) return;

//     const clerkEmail =
//       user.primaryEmailAddress?.emailAddress || "";

//     const clerkName =
//       user.fullName ||
//       `${user.firstName || ""} ${user.lastName || ""}`.trim();

//     setName(clerkName);
//     setEmail(clerkEmail);
//   }, [user]);

//   // -------------------------------------------------------
//   // LOADING
//   // -------------------------------------------------------

//   if (!isLoaded) {
//     return (
//       <CloudBackground>
//         <div className="min-h-screen flex items-center justify-center">
//           <div className="text-center text-white">
//             <motion.div
//               animate={{
//                 rotate: 360,
//               }}
//               transition={{
//                 duration: 1.5,
//                 repeat: Infinity,
//                 ease: "linear",
//               }}
//               className="text-5xl mb-4"
//             >
//               🌈
//             </motion.div>
//             <p className="text-purple-100">
//               Loading your profile...
//             </p>
//           </div>
//         </div>
//       </CloudBackground>
//     );
//   }

//   if (!user) {
//     return null;
//   }

//   // -------------------------------------------------------
//   // VALIDATE CURRENT STEP
//   // -------------------------------------------------------

//   function validateStep(): boolean {
//     setError("");

//     if (step === 0) {
//       if (!name.trim()) {
//         setError("Please enter the child's name.");
//         return false;
//       }

//       if (!email.trim()) {
//         setError("Please enter the email address.");
//         return false;
//       }

//       return true;
//     }

//     if (step === 1) {
//       if (!avatar) {
//         setError("Please choose an avatar.");
//         return false;
//       }

//       return true;
//     }

//     if (step === 2) {
//       if (!age) {
//         setError("Please select an age group.");
//         return false;
//       }

//       return true;
//     }

//     if (step === 3) {
//       if (!support) {
//         setError(
//           "Please select a learning support option."
//         );

//         return false;
//       }

//       return true;
//     }

//     if (step === 4) {
//       if (preferences.length === 0) {
//         setError(
//           "Please select at least one learning preference."
//         );

//         return false;
//       }

//       return true;
//     }

//     if (step === 5) {
//       if (![5, 10, 20].includes(sessionLength)) {
//         setError("Please select a session length.");

//         return false;
//       }

//       return true;
//     }

//     return true;
//   }

//   // -------------------------------------------------------
//   // NEXT STEP
//   // -------------------------------------------------------

//   function nextStep() {
//     if (!validateStep()) {
//       return;
//     }

//     setError("");

//     if (step < 6) {
//       setStep((previousStep) => previousStep + 1);
//     }
//   }

//   // -------------------------------------------------------
//   // PREVIOUS STEP
//   // -------------------------------------------------------

//   function previousStep() {
//     setError("");

//     if (step > 0) {
//       setStep((previousStep) => previousStep - 1);
//     }
//   }

//   // -------------------------------------------------------
//   // TOGGLE PREFERENCE
//   // -------------------------------------------------------

//   function togglePreference(
//     preference: LearningPreference
//   ) {
//     setPreferences((currentPreferences) => {
//       if (currentPreferences.includes(preference)) {
//         return currentPreferences.filter(
//           (item) => item !== preference
//         );
//       }

//       return [
//         ...currentPreferences,
//         preference,
//       ];
//     });
//   }

//   // -------------------------------------------------------
//   // SAVE PROFILE TO MONGODB
//   // -------------------------------------------------------

//   async function saveProfile() {
//     if (isSaving) {
//       return;
//     }

//     setError("");

//     if (!name.trim()) {
//       setError("Name is required.");
//       setStep(0);
//       return;
//     }

//     if (!email.trim()) {
//       setError("Email is required.");
//       setStep(0);
//       return;
//     }

//     if (!avatar) {
//       setError("Please select an avatar.");
//       setStep(1);
//       return;
//     }

//     if (!age) {
//       setError("Please select your age group.");
//       setStep(2);
//       return;
//     }

//     if (!support) {
//       setError(
//         "Please select your learning support."
//       );
//       setStep(3);
//       return;
//     }

//     if (preferences.length === 0) {
//       setError(
//         "Please select at least one learning preference."
//       );
//       setStep(4);
//       return;
//     }

//     if (![5, 10, 20].includes(sessionLength)) {
//       setError("Please select a valid session length.");
//       setStep(5);
//       return;
//     }

//     if (!user?.id) {
//       setError(
//         "Your account session could not be found. Please sign in again."
//       );

//       return;
//     }

//     const profileData: ProfileData = {
//       clerkId: user.id,
//       name: name.trim(),
//       email: email.trim(),
//       nickname: nickname.trim(),
//       avatar,
//       age,
//       support,
//       preferences,
//       sessionLength,
//     };

//     console.log("📤 Sending profile data:", profileData);

//     setIsSaving(true);

//     try {
//       const response = await fetch(
//         "http://localhost:5000/api/users/profile",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(profileData),
//         }
//       );

//       const data = await response.json();

//       console.log("📥 Backend response:", data);

//       if (!response.ok) {
//         throw new Error(
//           data.message ||
//             "Failed to save profile."
//         );
//       }

//       console.log("✅ Profile successfully saved!");

//       setShowSuccess(true);

//       setTimeout(() => {
//         navigate("/dashboard", {
//           replace: true,
//         });
//       }, 1200);
//     } catch (error) {
//       console.error("❌ Profile save failed:", error);

//       if (error instanceof Error) {
//         setError(error.message);
//       } else {
//         setError(
//           "Couldn't save your profile. Please try again."
//         );
//       }
//     } finally {
//       setIsSaving(false);
//     }
//   }

//   // -------------------------------------------------------
//   // SKIP PROFILE
//   // -------------------------------------------------------

//   function skipProfile() {
//     navigate("/dashboard", {
//       replace: true,
//     });
//   }

//   // -------------------------------------------------------
//   // RENDER
//   // -------------------------------------------------------

//   return (
//     <CloudBackground>
//       <div
//         className={cn(
//           "min-h-screen flex flex-col items-center px-5 py-10"
//         )}
//       >
//         {/* =================================================
//             HEADER
//         ================================================= */}

//         <div className="text-center mb-6">
//           <motion.div
//             initial={{
//               opacity: 0,
//               y: -20,
//             }}
//             animate={{
//               opacity: 1,
//               y: 0,
//             }}
//             className="text-5xl mb-3"
//           >
//             🌈
//           </motion.div>

//           <h1
//             className={cn(
//               "font-display font-semibold text-2xl sm:text-3xl",
//               "text-center mb-2 text-white"
//             )}
//           >
//             Create Your Learning Profile ✨
//           </h1>

//           <p className="text-purple-100">
//             Let's personalize your learning adventure.
//           </p>
//         </div>

//         {/* =================================================
//             STEPPER
//         ================================================= */}

//         <div
//           className={cn(
//             "rounded-full px-4 py-3 mb-8",
//             "bg-white/10 backdrop-blur",
//             "overflow-x-auto max-w-full"
//           )}
//         >
//           <Stepper
//             steps={STEP_LABELS}
//             current={step}
//           />
//         </div>

//         {/* =================================================
//             CARD
//         ================================================= */}

//         <div
//           className={cn(
//             "w-full max-w-3xl rounded-3xl p-6 sm:p-8",
//             "shadow-[var(--shadow-soft)]",
//             "bg-white/10 backdrop-blur-xl",
//             "border border-white/20"
//           )}
//         >
//           {/* =================================================
//               ERROR
//           ================================================= */}

//           <AnimatePresence>
//             {error && (
//               <motion.div
//                 initial={{
//                   opacity: 0,
//                   y: -10,
//                 }}
//                 animate={{
//                   opacity: 1,
//                   y: 0,
//                 }}
//                 exit={{
//                   opacity: 0,
//                   y: -10,
//                 }}
//                 className={cn(
//                   "mb-6",
//                   "bg-red-500/20 border border-red-500/50",
//                   "text-red-200 px-4 py-3 rounded-xl text-sm"
//                 )}
//               >
//                 {error}
//               </motion.div>
//             )}
//           </AnimatePresence>

//           {/* =================================================
//               STEP CONTENT
//           ================================================= */}

//           <AnimatePresence mode="wait">
//             <motion.div
//               key={step}
//               initial={{
//                 opacity: 0,
//                 x: 30,
//               }}
//               animate={{
//                 opacity: 1,
//                 x: 0,
//               }}
//               exit={{
//                 opacity: 0,
//                 x: -30,
//               }}
//               transition={{
//                 duration: 0.3,
//               }}
//             >
//               {/* =================================================
//                   STEP 0 — BASIC
//               ================================================= */}

//               {step === 0 && (
//                 <div>
//                   <SectionTitle
//                     emoji="👋"
//                     title="About You"
//                     description="Let's start with some basic information."
//                   />

//                   <div className="flex flex-col gap-5">
//                     <label>
//                       <span className="text-sm font-semibold text-purple-100">
//                         Child's Name
//                       </span>

//                       <input
//                         value={name}
//                         onChange={(e) =>
//                           setName(
//                             e.target.value
//                           )
//                         }
//                         placeholder="e.g. Aarav"
//                         className={cn(
//                           "mt-1.5 w-full rounded-2xl",
//                           "bg-white/90 px-4 py-3",
//                           "text-ink-900 placeholder:text-ink-300",
//                           "focus:outline-none focus-visible:ring-2",
//                           "focus-visible:ring-purple-300"
//                         )}
//                       />
//                     </label>

//                     <label>
//                       <span className="text-sm font-semibold text-purple-100">
//                         Nickname (optional)
//                       </span>

//                       <input
//                         value={nickname}
//                         onChange={(e) =>
//                           setNickname(
//                             e.target.value
//                           )
//                         }
//                         placeholder="e.g. Aar"
//                         className={cn(
//                           "mt-1.5 w-full rounded-2xl",
//                           "bg-white/90 px-4 py-3",
//                           "text-ink-900 placeholder:text-ink-300",
//                           "focus:outline-none focus-visible:ring-2",
//                           "focus-visible:ring-purple-300"
//                         )}
//                       />
//                     </label>

//                     <label>
//                       <span className="text-sm font-semibold text-purple-100">
//                         Email Address
//                       </span>

//                       <input
//                         type="email"
//                         value={email}
//                         onChange={(e) =>
//                           setEmail(
//                             e.target.value
//                           )
//                         }
//                         placeholder="you@example.com"
//                         className={cn(
//                           "mt-1.5 w-full rounded-2xl",
//                           "bg-white/90 px-4 py-3",
//                           "text-ink-900 placeholder:text-ink-300",
//                           "focus:outline-none focus-visible:ring-2",
//                           "focus-visible:ring-purple-300"
//                         )}
//                       />
//                     </label>
//                   </div>
//                 </div>
//               )}

//               {/* =================================================
//                   STEP 1 — AVATAR
//               ================================================= */}

//               {step === 1 && (
//                 <div>
//                   <SectionTitle
//                     emoji="🎭"
//                     title="Choose Your Avatar"
//                     description="Pick a character that feels like you!"
//                   />

//                   <div
//                     className={cn(
//                       "grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6",
//                       "gap-4"
//                     )}
//                   >
//                     {avatars.map((item) => (
//                       <motion.button
//                         key={item}
//                         type="button"
//                         whileHover={{
//                           scale: 1.08,
//                         }}
//                         whileTap={{
//                           scale: 0.95,
//                         }}
//                         onClick={() =>
//                           setAvatar(item)
//                         }
//                         className={cn(
//                           "aspect-square rounded-2xl",
//                           "flex items-center justify-center",
//                           "text-4xl transition border",
//                           avatar === item
//                             ? cn(
//                                 "bg-white/30 border-white",
//                                 "ring-2 ring-purple-300",
//                                 "scale-105"
//                               )
//                             : cn(
//                                 "bg-white/10 border-white/10",
//                                 "hover:bg-white/20"
//                               )
//                         )}
//                       >
//                         {item}
//                       </motion.button>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {/* =================================================
//                   STEP 2 — AGE
//               ================================================= */}

//               {step === 2 && (
//                 <div>
//                   <SectionTitle
//                     emoji="🎂"
//                     title="How Old Are You?"
//                     description="Choose your age group."
//                   />

//                   <div
//                     className={cn(
//                       "grid grid-cols-1 sm:grid-cols-3 gap-4"
//                     )}
//                   >
//                     {ageOptions.map((option) => (
//                       <SelectionCard
//                         key={option.value}
//                         selected={age === option.value}
//                         onClick={() =>
//                           setAge(option.value)
//                         }
//                         emoji={option.emoji}
//                         title={option.title}
//                         description={
//                           option.description
//                         }
//                       />
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {/* =================================================
//                   STEP 3 — SUPPORT
//               ================================================= */}

//               {step === 3 && (
//                 <div>
//                   <SectionTitle
//                     emoji="💜"
//                     title="Learning Support"
//                     description="Choose the support that best matches your learning needs."
//                   />

//                   <div
//                     className={cn(
//                       "grid grid-cols-1 md:grid-cols-3 gap-4"
//                     )}
//                   >
//                     {supportOptions.map((option) => (
//                       <SelectionCard
//                         key={option.value}
//                         selected={support === option.value}
//                         onClick={() =>
//                           setSupport(option.value)
//                         }
//                         emoji={option.emoji}
//                         title={option.title}
//                         description={
//                           option.description
//                         }
//                       />
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {/* =================================================
//                   STEP 4 — PREFERENCES
//               ================================================= */}

//               {step === 4 && (
//                 <div>
//                   <SectionTitle
//                     emoji="🎨"
//                     title="Learning Preferences"
//                     description="What makes learning fun for you? Choose one or more."
//                   />

//                   <div
//                     className={cn(
//                       "grid grid-cols-2 sm:grid-cols-3 gap-3"
//                     )}
//                   >
//                     {preferenceOptions.map((option) => {
//                       const selected = preferences.includes(
//                         option.value
//                       );

//                       return (
//                         <motion.button
//                           key={option.value}
//                           type="button"
//                           whileHover={{
//                             scale: 1.03,
//                           }}
//                           whileTap={{
//                             scale: 0.97,
//                           }}
//                           onClick={() =>
//                             togglePreference(
//                               option.value
//                             )
//                           }
//                           className={cn(
//                             "rounded-2xl px-4 py-5",
//                             "border transition text-center",
//                             "flex flex-col items-center gap-2",
//                             selected
//                               ? cn(
//                                   "bg-white/30 border-white",
//                                   "ring-2 ring-purple-300"
//                                 )
//                               : cn(
//                                   "bg-white/10 border-white/10",
//                                   "hover:bg-white/20"
//                                 )
//                           )}
//                         >
//                           <span className="text-3xl">
//                             {option.emoji}
//                           </span>

//                           <span className="text-sm font-semibold text-white">
//                             {option.label}
//                           </span>

//                           {selected && (
//                             <span className="text-xs text-purple-100">
//                               ✓ Selected
//                             </span>
//                           )}
//                         </motion.button>
//                       );
//                     })}
//                   </div>
//                 </div>
//               )}

//               {/* =================================================
//                   STEP 5 — SESSION
//               ================================================= */}

//               {step === 5 && (
//                 <div>
//                   <SectionTitle
//                     emoji="⏱️"
//                     title="Preferred Session Length"
//                     description="How long would you like each learning session to be?"
//                   />

//                   <div
//                     className={cn(
//                       "grid grid-cols-1 sm:grid-cols-3 gap-4"
//                     )}
//                   >
//                     {sessionOptions.map((option) => (
//                       <SelectionCard
//                         key={option.value}
//                         selected={sessionLength === option.value}
//                         onClick={() =>
//                           setSessionLength(
//                             option.value
//                           )
//                         }
//                         emoji={option.emoji}
//                         title={option.title}
//                         description={
//                           option.description
//                         }
//                       />
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {/* =================================================
//                   STEP 6 — READY
//               ================================================= */}

//               {step === 6 && (
//                 <div>
//                   <SectionTitle
//                     emoji="🎉"
//                     title="Your Profile Is Ready!"
//                     description="Review your choices before starting your personalized learning adventure."
//                   />

//                   <div className="space-y-4">
//                     <ReviewRow
//                       label="Name"
//                       value={name || "Not provided"}
//                     />

//                     <ReviewRow
//                       label="Nickname"
//                       value={nickname || "Not provided"}
//                     />

//                     <ReviewRow
//                       label="Email"
//                       value={email || "Not provided"}
//                     />

//                     <ReviewRow
//                       label="Avatar"
//                       value={avatar}
//                     />

//                     <ReviewRow
//                       label="Age"
//                       value={age || "Not selected"}
//                     />

//                     <ReviewRow
//                       label="Learning Support"
//                       value={support || "Not selected"}
//                     />

//                     <ReviewRow
//                       label="Preferences"
//                       value={
//                         preferences.length > 0
//                           ? preferences.join(
//                               ", "
//                             )
//                           : "Not selected"
//                       }
//                     />

//                     <ReviewRow
//                       label="Session Length"
//                       value={`${sessionLength} minutes`}
//                     />
//                   </div>

//                   <div
//                     className={cn(
//                       "mt-6 rounded-2xl",
//                       "bg-white/10 border border-white/10",
//                       "p-5 text-center"
//                     )}
//                   >
//                     <div className="text-4xl mb-2">
//                       🌈
//                     </div>

//                     <p className="text-purple-100">
//                       Everything looks great! Let's
//                       start learning.
//                     </p>
//                   </div>
//                 </div>
//               )}
//             </motion.div>
//           </AnimatePresence>

//           {/* =================================================
//               NAVIGATION
//           ================================================= */}

//           <div
//             className={cn(
//               "flex items-center justify-between gap-4 mt-8",
//               "pt-6 border-t border-white/10"
//             )}
//           >
//             {step > 0 ? (
//               <Button
//                 variant="secondary"
//                 size="lg"
//                 onClick={previousStep}
//                 disabled={isSaving}
//               >
//                 ← Back
//               </Button>
//             ) : (
//               <Button
//                 variant="secondary"
//                 size="lg"
//                 onClick={skipProfile}
//                 disabled={isSaving}
//               >
//                 Skip for Now
//               </Button>
//             )}

//             {step < 6 ? (
//               <Button
//                 size="lg"
//                 onClick={nextStep}
//                 disabled={isSaving}
//               >
//                 Continue →
//               </Button>
//             ) : (
//               <Button
//                 size="xl"
//                 onClick={saveProfile}
//                 disabled={isSaving}
//               >
//                 {isSaving
//                   ? "Saving Profile..."
//                   : "Save & Start Learning 🌈"}
//               </Button>
//             )}
//           </div>
//         </div>

//         {/* FOOTER */}

//         <p
//           className={cn(
//             "text-center text-purple-200 text-sm mt-6",
//             "max-w-xl"
//           )}
//         >
//           You can change these preferences later
//           from your profile settings.
//         </p>
//       </div>

//       {/* =================================================
//           SUCCESS POPUP
//       ================================================= */}

//       <AnimatePresence>
//         {showSuccess && (
//           <motion.div
//             className={cn(
//               "fixed inset-0 z-50",
//               "flex items-center justify-center",
//               "bg-black/50 px-5"
//             )}
//             initial={{
//               opacity: 0,
//             }}
//             animate={{
//               opacity: 1,
//             }}
//           >
//             <motion.div
//               className={cn(
//                 "w-full max-w-sm rounded-3xl",
//                 "bg-white p-8 text-center",
//                 "shadow-2xl"
//               )}
//               initial={{
//                 opacity: 0,
//                 scale: 0.9,
//                 y: 20,
//               }}
//               animate={{
//                 opacity: 1,
//                 scale: 1,
//                 y: 0,
//               }}
//             >
//               <motion.div
//                 animate={{
//                   scale: [1, 1.2, 1],
//                 }}
//                 transition={{
//                   duration: 1,
//                   repeat: Infinity,
//                 }}
//                 className="text-6xl mb-4"
//               >
//                 🎉
//               </motion.div>

//               <h2
//                 className={cn(
//                   "font-display font-semibold text-2xl",
//                   "text-ink-900 mb-2"
//                 )}
//               >
//                 Profile Ready!
//               </h2>

//               <p className="text-ink-500">
//                 Your personalized learning
//                 adventure is ready to begin.
//               </p>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </CloudBackground>
//   );
// }

// // =========================================================
// // SECTION TITLE
// // =========================================================

// function SectionTitle({
//   emoji,
//   title,
//   description,
// }: {
//   emoji: string;
//   title: string;
//   description: string;
// }) {
//   return (
//     <div className="mb-6">
//       <div className="flex items-center gap-2 mb-2">
//         <span className="text-3xl">{emoji}</span>

//         <h2
//           className={cn(
//             "font-display font-semibold",
//             "text-xl sm:text-2xl text-white"
//           )}
//         >
//           {title}
//         </h2>
//       </div>

//       <p className="text-purple-200 text-sm sm:text-base">
//         {description}
//       </p>
//     </div>
//   );
// }

// // =========================================================
// // SELECTION CARD
// // =========================================================

// function SelectionCard({
//   selected,
//   onClick,
//   emoji,
//   title,
//   description,
// }: {
//   selected: boolean;
//   onClick: () => void;
//   emoji: string;
//   title: string;
//   description: string;
// }) {
//   return (
//     <motion.button
//       type="button"
//       whileHover={{
//         y: -3,
//       }}
//       whileTap={{
//         scale: 0.98,
//       }}
//       onClick={onClick}
//       className={cn(
//         "text-left rounded-2xl p-5",
//         "border transition w-full",
//         selected
//           ? cn(
//               "bg-white/30 border-white",
//               "ring-2 ring-purple-300"
//             )
//           : cn(
//               "bg-white/10 border-white/10",
//               "hover:bg-white/20"
//             )
//       )}
//     >
//       <div className="flex items-start justify-between gap-3">
//         <div>
//           <div className="text-4xl mb-3">{emoji}</div>

//           <h3
//             className={cn(
//               "font-semibold text-white",
//               "text-base sm:text-lg"
//             )}
//           >
//             {title}
//           </h3>

//           <p className="text-purple-200 text-sm mt-1">
//             {description}
//           </p>
//         </div>

//         {selected && (
//           <div
//             className={cn(
//               "w-7 h-7 rounded-full bg-white",
//               "text-purple-700",
//               "flex items-center justify-center",
//               "font-bold shrink-0"
//             )}
//           >
//             ✓
//           </div>
//         )}
//       </div>
//     </motion.button>
//   );
// }

// // =========================================================
// // REVIEW ROW
// // =========================================================

// function ReviewRow({
//   label,
//   value,
// }: {
//   label: string;
//   value: string;
// }) {
//   return (
//     <div
//       className={cn(
//         "flex flex-col sm:flex-row",
//         "sm:items-center sm:justify-between",
//         "gap-2 rounded-2xl",
//         "bg-white/10 border border-white/10",
//         "px-4 py-3"
//       )}
//     >
//       <span className="text-purple-200 font-semibold">
//         {label}
//       </span>

//       <span className="text-white sm:text-right">
//         {value}
//       </span>
//     </div>
//   );
// }






import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Sparkles,
  User,
  Heart,
  Gamepad2,
  Clock,
  Save,
  Loader2,
} from "lucide-react";

import { CloudBackground } from "@/components/backgrounds/CloudBackground";
import { Button } from "@/components/ui/Button";
import { Stepper } from "@/components/ui/Stepper";
import { cn } from "@/lib/cn";

// ---------------------------------------------------------
// TYPES
// ---------------------------------------------------------

type AgeGroup = "5-8" | "9-12" | "13-18";

type SupportType =
  | "ADHD"
  | "Intellectual Disability"
  | "Autism";

type LearningPreference =
  | "Games"
  | "Stories"
  | "Music"
  | "Drawing"
  | "Puzzles"
  | "Videos"
  | "Movement"
  | "Animals"
  | "Science";

type ProfileData = {
  name: string;
  email: string;
  nickname: string;
  avatar: string;
  age: AgeGroup | "";
  support: SupportType | "";
  preferences: LearningPreference[];
  sessionLength: 5 | 10 | 20;
  clerkId: string;
};

// ---------------------------------------------------------
// OPTIONS
// ---------------------------------------------------------

const avatars = [
  "😊",
  "🦊",
  "🐼",
  "🐯",
  "🐸",
  "🦄",
  "🐨",
  "🐰",
  "🐻",
  "🐱",
  "🐶",
  "🦁",
];

const ageOptions: {
  value: AgeGroup;
  title: string;
  description: string;
  emoji: string;
}[] = [
  {
    value: "5-8",
    title: "5 - 8 years",
    description: "Early learning and basic skills",
    emoji: "🌱",
  },
  {
    value: "9-12",
    title: "9 - 12 years",
    description: "Growing skills and exploration",
    emoji: "🚀",
  },
  {
    value: "13-18",
    title: "13 - 18 years",
    description: "Advanced learning and independence",
    emoji: "🌟",
  },
];

const supportOptions: {
  value: SupportType;
  title: string;
  description: string;
  emoji: string;
}[] = [
  {
    value: "ADHD",
    title: "ADHD Support",
    description: "Focus, attention & activity",
    emoji: "⚡",
  },
  {
    value: "Intellectual Disability",
    title: "Intellectual Disability",
    description: "Accessible learning support",
    emoji: "💜",
  },
  {
    value: "Autism",
    title: "Autism Support",
    description: "Communication & confidence",
    emoji: "💙",
  },
];

const preferenceOptions: {
  value: LearningPreference;
  label: string;
  emoji: string;
}[] = [
  {
    value: "Games",
    label: "Games",
    emoji: "🎮",
  },
  {
    value: "Stories",
    label: "Stories",
    emoji: "📖",
  },
  {
    value: "Music",
    label: "Music",
    emoji: "🎵",
  },
  {
    value: "Drawing",
    label: "Drawing",
    emoji: "🎨",
  },
  {
    value: "Puzzles",
    label: "Puzzles",
    emoji: "🧩",
  },
  {
    value: "Videos",
    label: "Videos",
    emoji: "🎬",
  },
  {
    value: "Movement",
    label: "Movement",
    emoji: "🏃",
  },
  {
    value: "Animals",
    label: "Animals",
    emoji: "🐾",
  },
  {
    value: "Science",
    label: "Science",
    emoji: "🔬",
  },
];

const sessionOptions: {
  value: 5 | 10 | 20;
  title: string;
  description: string;
  emoji: string;
}[] = [
  {
    value: 5,
    title: "5 min",
    description: "Quick & easy",
    emoji: "🌱",
  },
  {
    value: 10,
    title: "10 min",
    description: "Balanced session",
    emoji: "🌈",
  },
  {
    value: 20,
    title: "20 min",
    description: "Deep learning",
    emoji: "🚀",
  },
];

// ---------------------------------------------------------
// STEP LABELS
// ---------------------------------------------------------

const STEP_LABELS = [
  "Basic",
  "Avatar",
  "Age",
  "Support",
  "Preferences",
  "Session",
  "Ready",
];

// ---------------------------------------------------------
// COMPONENT
// ---------------------------------------------------------

export default function User_profile() {
  const navigate = useNavigate();

  const { user, isLoaded } = useUser();

  // -------------------------------------------------------
  // FORM STATE
  // -------------------------------------------------------

  const [step, setStep] = useState(0);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [nickname, setNickname] = useState("");

  const [avatar, setAvatar] = useState("😊");

  const [age, setAge] = useState<AgeGroup | "">("");

  const [support, setSupport] =
    useState<SupportType | "">("");

  const [preferences, setPreferences] = useState<
    LearningPreference[]
  >([]);

  const [sessionLength, setSessionLength] =
    useState<5 | 10 | 20>(10);

  // -------------------------------------------------------
  // UI STATE
  // -------------------------------------------------------

  const [error, setError] = useState("");

  const [isSaving, setIsSaving] = useState(false);

  const [showSuccess, setShowSuccess] = useState(false);

  // -------------------------------------------------------
  // AUTH GUARD
  // -------------------------------------------------------

  useEffect(() => {
    if (isLoaded && !user) {
      navigate("/register", {
        replace: true,
      });
    }
  }, [isLoaded, user, navigate]);

  // -------------------------------------------------------
  // LOAD USER INFORMATION FROM CLERK
  // -------------------------------------------------------

  useEffect(() => {
    if (!user) return;

    const clerkEmail =
      user.primaryEmailAddress?.emailAddress || "";

    const clerkName =
      user.fullName ||
      `${user.firstName || ""} ${
        user.lastName || ""
      }`.trim();

    setName(clerkName);
    setEmail(clerkEmail);
  }, [user]);

  // -------------------------------------------------------
  // LOADING
  // -------------------------------------------------------

  if (!isLoaded) {
    return (
      <CloudBackground>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center text-white">
            <motion.div
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "linear",
              }}
              className="text-5xl mb-4"
            >
              🌈
            </motion.div>

            <p className="text-purple-100">
              Loading your profile...
            </p>
          </div>
        </div>
      </CloudBackground>
    );
  }

  if (!user) {
    return null;
  }

  // -------------------------------------------------------
  // VALIDATE CURRENT STEP
  // -------------------------------------------------------

  function validateStep(): boolean {
    setError("");

    if (step === 0) {
      if (!name.trim()) {
        setError("Please enter the child's name.");
        return false;
      }

      if (!email.trim()) {
        setError("Please enter the email address.");
        return false;
      }

      return true;
    }

    if (step === 1) {
      if (!avatar) {
        setError("Please choose an avatar.");
        return false;
      }

      return true;
    }

    if (step === 2) {
      if (!age) {
        setError("Please select an age group.");
        return false;
      }

      return true;
    }

    if (step === 3) {
      if (!support) {
        setError(
          "Please select a learning support option."
        );

        return false;
      }

      return true;
    }

    if (step === 4) {
      if (preferences.length === 0) {
        setError(
          "Please select at least one learning preference."
        );

        return false;
      }

      return true;
    }

    if (step === 5) {
      if (![5, 10, 20].includes(sessionLength)) {
        setError("Please select a session length.");

        return false;
      }

      return true;
    }

    return true;
  }

  // -------------------------------------------------------
  // NEXT STEP
  // -------------------------------------------------------

  function nextStep() {
    if (!validateStep()) {
      return;
    }

    setError("");

    if (step < 6) {
      setStep(
        (previousStep) => previousStep + 1
      );
    }
  }

  // -------------------------------------------------------
  // PREVIOUS STEP
  // -------------------------------------------------------

  function previousStep() {
    setError("");

    if (step > 0) {
      setStep(
        (previousStep) => previousStep - 1
      );
    }
  }

  // -------------------------------------------------------
  // TOGGLE PREFERENCE
  // -------------------------------------------------------

  function togglePreference(
    preference: LearningPreference
  ) {
    setPreferences((currentPreferences) => {
      if (
        currentPreferences.includes(preference)
      ) {
        return currentPreferences.filter(
          (item) => item !== preference
        );
      }

      return [
        ...currentPreferences,
        preference,
      ];
    });
  }

  // -------------------------------------------------------
  // SAVE PROFILE TO MONGODB
  // -------------------------------------------------------

  async function saveProfile() {
    if (isSaving) {
      return;
    }

    setError("");

    if (!name.trim()) {
      setError("Name is required.");
      setStep(0);
      return;
    }

    if (!email.trim()) {
      setError("Email is required.");
      setStep(0);
      return;
    }

    if (!avatar) {
      setError("Please select an avatar.");
      setStep(1);
      return;
    }

    if (!age) {
      setError("Please select your age group.");
      setStep(2);
      return;
    }

    if (!support) {
      setError(
        "Please select your learning support."
      );
      setStep(3);
      return;
    }

    if (preferences.length === 0) {
      setError(
        "Please select at least one learning preference."
      );
      setStep(4);
      return;
    }

    if (![5, 10, 20].includes(sessionLength)) {
      setError(
        "Please select a valid session length."
      );
      setStep(5);
      return;
    }

    if (!user?.id) {
      setError(
        "Your account session could not be found. Please sign in again."
      );

      return;
    }

    const profileData: ProfileData = {
      clerkId: user.id,
      name: name.trim(),
      email: email.trim(),
      nickname: nickname.trim(),
      avatar,
      age,
      support,
      preferences,
      sessionLength,
    };

    console.log(
      "📤 Sending profile data:",
      profileData
    );

    setIsSaving(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/users/profile",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(profileData),
        }
      );

      const data = await response.json();

      console.log(
        "📥 Backend response:",
        data
      );

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to save profile."
        );
      }

      console.log(
        "✅ Profile successfully saved!"
      );

      // ---------------------------------------------------
      // SUCCESS
      // ---------------------------------------------------

      setShowSuccess(true);

      // ---------------------------------------------------
      // REDIRECT TO DASHBOARD
      // ---------------------------------------------------

      setTimeout(() => {
        navigate("/dashboard", {
          replace: true,
        });
      }, 1200);
    } catch (error) {
      console.error(
        "❌ Profile save failed:",
        error
      );

      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError(
          "Couldn't save your profile. Please try again."
        );
      }
    } finally {
      setIsSaving(false);
    }
  }

  // -------------------------------------------------------
  // SKIP PROFILE
  // -------------------------------------------------------

  function skipProfile() {
    navigate("/dashboard", {
      replace: true,
    });
  }

  // -------------------------------------------------------
  // RENDER
  // -------------------------------------------------------

  return (
    <CloudBackground>
      <div
        className={cn(
          "min-h-screen flex flex-col",
          "items-center px-5 py-10"
        )}
      >

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="text-center mb-6">
          <motion.div
            initial={{
              opacity: 0,
              y: -20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="text-5xl mb-3"
          >
            🌈
          </motion.div>

          <h1
            className={cn(
              "font-display font-semibold",
              "text-2xl sm:text-3xl",
              "text-center mb-2 text-white"
            )}
          >
            Create Your Learning Profile ✨
          </h1>

          <p className="text-purple-100">
            Let's personalize your learning adventure.
          </p>
        </div>

        {/* =================================================
            STEPPER
        ================================================= */}

        <div
          className={cn(
            "rounded-full px-4 py-3 mb-8",
            "bg-white/10 backdrop-blur",
            "overflow-x-auto max-w-full"
          )}
        >
          <Stepper
            steps={STEP_LABELS}
            current={step}
          />
        </div>

        {/* =================================================
            CARD
        ================================================= */}

        <div
          className={cn(
            "w-full max-w-3xl rounded-3xl",
            "p-6 sm:p-8",
            "shadow-[var(--shadow-soft)]",
            "bg-white/10 backdrop-blur-xl",
            "border border-white/20"
          )}
        >

          {/* =================================================
              ERROR
          ================================================= */}

          <AnimatePresence>
            {error && (
              <motion.div
                initial={{
                  opacity: 0,
                  y: -10,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: -10,
                }}
                className={cn(
                  "mb-6",
                  "bg-red-500/20",
                  "border border-red-500/50",
                  "text-red-200",
                  "px-4 py-3 rounded-xl",
                  "text-sm"
                )}
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          {/* =================================================
              STEP CONTENT
          ================================================= */}

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{
                opacity: 0,
                x: 30,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              exit={{
                opacity: 0,
                x: -30,
              }}
              transition={{
                duration: 0.3,
              }}
            >

              {/* =================================================
                  STEP 0 — BASIC
              ================================================= */}

              {step === 0 && (
                <div>
                  <SectionTitle
                    emoji="👋"
                    title="About You"
                    description="Let's start with some basic information."
                  />

                  <div className="flex flex-col gap-5">

                    <label>
                      <span className="text-sm font-semibold text-purple-100">
                        Child's Name
                      </span>

                      <input
                        value={name}
                        onChange={(e) =>
                          setName(
                            e.target.value
                          )
                        }
                        placeholder="e.g. Aarav"
                        className={cn(
                          "mt-1.5 w-full rounded-2xl",
                          "bg-white/90 px-4 py-3",
                          "text-ink-900",
                          "placeholder:text-ink-300",
                          "focus:outline-none",
                          "focus-visible:ring-2",
                          "focus-visible:ring-purple-300"
                        )}
                      />
                    </label>

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
                        className={cn(
                          "mt-1.5 w-full rounded-2xl",
                          "bg-white/90 px-4 py-3",
                          "text-ink-900",
                          "placeholder:text-ink-300",
                          "focus:outline-none",
                          "focus-visible:ring-2",
                          "focus-visible:ring-purple-300"
                        )}
                      />
                    </label>

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
                        className={cn(
                          "mt-1.5 w-full rounded-2xl",
                          "bg-white/90 px-4 py-3",
                          "text-ink-900",
                          "placeholder:text-ink-300",
                          "focus:outline-none",
                          "focus-visible:ring-2",
                          "focus-visible:ring-purple-300"
                        )}
                      />
                    </label>

                  </div>
                </div>
              )}

              {/* =================================================
                  STEP 1 — AVATAR
              ================================================= */}

              {step === 1 && (
                <div>
                  <SectionTitle
                    emoji="🎭"
                    title="Choose Your Avatar"
                    description="Pick a character that feels like you!"
                  />

                  <div
                    className={cn(
                      "grid grid-cols-3",
                      "sm:grid-cols-4",
                      "md:grid-cols-6",
                      "gap-4"
                    )}
                  >
                    {avatars.map((item) => (
                      <motion.button
                        key={item}
                        type="button"
                        whileHover={{
                          scale: 1.08,
                        }}
                        whileTap={{
                          scale: 0.95,
                        }}
                        onClick={() =>
                          setAvatar(item)
                        }
                        className={cn(
                          "aspect-square rounded-2xl",
                          "flex items-center justify-center",
                          "text-4xl transition border",

                          avatar === item
                            ? cn(
                                "bg-white/30",
                                "border-white",
                                "ring-2",
                                "ring-purple-300",
                                "scale-105"
                              )
                            : cn(
                                "bg-white/10",
                                "border-white/10",
                                "hover:bg-white/20"
                              )
                        )}
                      >
                        {item}
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}

              {/* =================================================
                  STEP 2 — AGE
              ================================================= */}

              {step === 2 && (
                <div>
                  <SectionTitle
                    emoji="🎂"
                    title="How Old Are You?"
                    description="Choose your age group."
                  />

                  <div
                    className={cn(
                      "grid grid-cols-1",
                      "sm:grid-cols-3 gap-4"
                    )}
                  >
                    {ageOptions.map(
                      (option) => (
                        <SelectionCard
                          key={option.value}
                          selected={
                            age ===
                            option.value
                          }
                          onClick={() =>
                            setAge(
                              option.value
                            )
                          }
                          emoji={
                            option.emoji
                          }
                          title={
                            option.title
                          }
                          description={
                            option.description
                          }
                        />
                      )
                    )}
                  </div>
                </div>
              )}

              {/* =================================================
                  STEP 3 — SUPPORT
              ================================================= */}

              {step === 3 && (
                <div>
                  <SectionTitle
                    emoji="💜"
                    title="Learning Support"
                    description="Choose the support that best matches your learning needs."
                  />

                  <div
                    className={cn(
                      "grid grid-cols-1",
                      "md:grid-cols-3 gap-4"
                    )}
                  >
                    {supportOptions.map(
                      (option) => (
                        <SelectionCard
                          key={option.value}
                          selected={
                            support ===
                            option.value
                          }
                          onClick={() =>
                            setSupport(
                              option.value
                            )
                          }
                          emoji={
                            option.emoji
                          }
                          title={
                            option.title
                          }
                          description={
                            option.description
                          }
                        />
                      )
                    )}
                  </div>
                </div>
              )}

              {/* =================================================
                  STEP 4 — PREFERENCES
              ================================================= */}

              {step === 4 && (
                <div>
                  <SectionTitle
                    emoji="🎨"
                    title="Learning Preferences"
                    description="What makes learning fun for you? Choose one or more."
                  />

                  <div
                    className={cn(
                      "grid grid-cols-2",
                      "sm:grid-cols-3 gap-3"
                    )}
                  >
                    {preferenceOptions.map(
                      (option) => {
                        const selected =
                          preferences.includes(
                            option.value
                          );

                        return (
                          <motion.button
                            key={
                              option.value
                            }
                            type="button"
                            whileHover={{
                              scale: 1.03,
                            }}
                            whileTap={{
                              scale: 0.97,
                            }}
                            onClick={() =>
                              togglePreference(
                                option.value
                              )
                            }
                            className={cn(
                              "rounded-2xl",
                              "px-4 py-5",
                              "border transition",
                              "text-center",
                              "flex flex-col",
                              "items-center gap-2",

                              selected
                                ? cn(
                                    "bg-white/30",
                                    "border-white",
                                    "ring-2",
                                    "ring-purple-300"
                                  )
                                : cn(
                                    "bg-white/10",
                                    "border-white/10",
                                    "hover:bg-white/20"
                                  )
                            )}
                          >
                            <span className="text-3xl">
                              {
                                option.emoji
                              }
                            </span>

                            <span className="text-sm font-semibold text-white">
                              {
                                option.label
                              }
                            </span>

                            {selected && (
                              <span className="text-xs text-purple-100">
                                ✓ Selected
                              </span>
                            )}
                          </motion.button>
                        );
                      }
                    )}
                  </div>
                </div>
              )}

              {/* =================================================
                  STEP 5 — SESSION
              ================================================= */}

              {step === 5 && (
                <div>
                  <SectionTitle
                    emoji="⏱️"
                    title="Preferred Session Length"
                    description="How long would you like each learning session to be?"
                  />

                  <div
                    className={cn(
                      "grid grid-cols-1",
                      "sm:grid-cols-3 gap-4"
                    )}
                  >
                    {sessionOptions.map(
                      (option) => (
                        <SelectionCard
                          key={
                            option.value
                          }
                          selected={
                            sessionLength ===
                            option.value
                          }
                          onClick={() =>
                            setSessionLength(
                              option.value
                            )
                          }
                          emoji={
                            option.emoji
                          }
                          title={
                            option.title
                          }
                          description={
                            option.description
                          }
                        />
                      )
                    )}
                  </div>
                </div>
              )}

              {/* =================================================
                  STEP 6 — READY
              ================================================= */}

              {step === 6 && (
                <div>
                  <SectionTitle
                    emoji="🎉"
                    title="Your Profile Is Ready!"
                    description="Review your choices before starting your personalized learning adventure."
                  />

                  <div className="space-y-4">

                    <ReviewRow
                      label="Name"
                      value={
                        name ||
                        "Not provided"
                      }
                    />

                    <ReviewRow
                      label="Nickname"
                      value={
                        nickname ||
                        "Not provided"
                      }
                    />

                    <ReviewRow
                      label="Email"
                      value={
                        email ||
                        "Not provided"
                      }
                    />

                    <ReviewRow
                      label="Avatar"
                      value={avatar}
                    />

                    <ReviewRow
                      label="Age"
                      value={
                        age ||
                        "Not selected"
                      }
                    />

                    <ReviewRow
                      label="Learning Support"
                      value={
                        support ||
                        "Not selected"
                      }
                    />

                    <ReviewRow
                      label="Preferences"
                      value={
                        preferences.length >
                        0
                          ? preferences.join(
                              ", "
                            )
                          : "Not selected"
                      }
                    />

                    <ReviewRow
                      label="Session Length"
                      value={`${sessionLength} minutes`}
                    />

                  </div>

                  <div
                    className={cn(
                      "mt-6 rounded-2xl",
                      "bg-white/10",
                      "border border-white/10",
                      "p-5 text-center"
                    )}
                  >
                    <div className="text-4xl mb-2">
                      🌈
                    </div>

                    <p className="text-purple-100">
                      Everything looks great!
                      Let's start learning.
                    </p>
                  </div>
                </div>
              )}

            </motion.div>
          </AnimatePresence>

          {/* =================================================
              NAVIGATION
          ================================================= */}

          <div
            className={cn(
              "flex items-center",
              "justify-between gap-4",
              "mt-8 pt-6",
              "border-t border-white/10"
            )}
          >

            {step > 0 ? (
              <Button
                variant="secondary"
                size="lg"
                onClick={
                  previousStep
                }
                disabled={isSaving}
              >
                ← Back
              </Button>
            ) : (
              <Button
                variant="secondary"
                size="lg"
                onClick={
                  skipProfile
                }
                disabled={isSaving}
              >
                Skip for Now
              </Button>
            )}

            {step < 6 ? (
              <Button
                size="lg"
                onClick={nextStep}
                disabled={isSaving}
              >
                Continue →
              </Button>
            ) : (
              <Button
                size="xl"
                onClick={
                  saveProfile
                }
                disabled={isSaving}
              >
                {isSaving
                  ? "Saving Profile..."
                  : "Save & Start Learning 🌈"}
              </Button>
            )}

          </div>
        </div>

        {/* =================================================
            FOOTER
        ================================================= */}

        <p
          className={cn(
            "text-center",
            "text-purple-200",
            "text-sm mt-6",
            "max-w-xl"
          )}
        >
          You can change these preferences later
          from your profile settings.
        </p>

      </div>

      {/* =====================================================
          SUCCESS POPUP
      ===================================================== */}

      <AnimatePresence>
        {showSuccess && (
          <motion.div
            className={cn(
              "fixed inset-0 z-50",
              "flex items-center justify-center",
              "bg-black/50 px-5"
            )}
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
          >
            <motion.div
              className={cn(
                "w-full max-w-sm",
                "rounded-3xl",
                "bg-white p-8",
                "text-center",
                "shadow-2xl"
              )}
              initial={{
                opacity: 0,
                scale: 0.9,
                y: 20,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
            >

              <motion.div
                animate={{
                  scale: [
                    1,
                    1.2,
                    1,
                  ],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                }}
                className="text-6xl mb-4"
              >
                🎉
              </motion.div>

              <h2
                className={cn(
                  "font-display",
                  "font-semibold",
                  "text-2xl",
                  "text-ink-900",
                  "mb-2"
                )}
              >
                Profile Ready!
              </h2>

              <p className="text-ink-500">
                Your personalized learning
                adventure is ready to begin.
              </p>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </CloudBackground>
  );
}

// =========================================================
// SECTION TITLE
// =========================================================

function SectionTitle({
  emoji,
  title,
  description,
}: {
  emoji: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mb-6">

      <div className="flex items-center gap-2 mb-2">

        <span className="text-3xl">
          {emoji}
        </span>

        <h2
          className={cn(
            "font-display",
            "font-semibold",
            "text-xl sm:text-2xl",
            "text-white"
          )}
        >
          {title}
        </h2>

      </div>

      <p className="text-purple-200 text-sm sm:text-base">
        {description}
      </p>

    </div>
  );
}

// =========================================================
// SELECTION CARD
// =========================================================

function SelectionCard({
  selected,
  onClick,
  emoji,
  title,
  description,
}: {
  selected: boolean;
  onClick: () => void;
  emoji: string;
  title: string;
  description: string;
}) {
  return (
    <motion.button
      type="button"
      whileHover={{
        y: -3,
      }}
      whileTap={{
        scale: 0.98,
      }}
      onClick={onClick}
      className={cn(
        "text-left",
        "rounded-2xl",
        "p-5",
        "border transition",
        "w-full",

        selected
          ? cn(
              "bg-white/30",
              "border-white",
              "ring-2",
              "ring-purple-300"
            )
          : cn(
              "bg-white/10",
              "border-white/10",
              "hover:bg-white/20"
            )
      )}
    >

      <div className="flex items-start justify-between gap-3">

        <div>

          <div className="text-4xl mb-3">
            {emoji}
          </div>

          <h3
            className={cn(
              "font-semibold",
              "text-white",
              "text-base sm:text-lg"
            )}
          >
            {title}
          </h3>

          <p className="text-purple-200 text-sm mt-1">
            {description}
          </p>

        </div>

        {selected && (
          <div
            className={cn(
              "w-7 h-7",
              "rounded-full",
              "bg-white",
              "text-purple-700",
              "flex items-center",
              "justify-center",
              "font-bold",
              "shrink-0"
            )}
          >
            ✓
          </div>
        )}

      </div>

    </motion.button>
  );
}

// =========================================================
// REVIEW ROW
// =========================================================

function ReviewRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col",
        "sm:flex-row",
        "sm:items-center",
        "sm:justify-between",
        "gap-2",
        "rounded-2xl",
        "bg-white/10",
        "border border-white/10",
        "px-4 py-3"
      )}
    >

      <span className="text-purple-200 font-semibold">
        {label}
      </span>

      <span className="text-white sm:text-right">
        {value}
      </span>

    </div>
  );
}

