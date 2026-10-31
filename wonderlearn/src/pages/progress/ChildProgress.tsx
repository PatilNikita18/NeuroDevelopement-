// import { useEffect, useMemo, useState } from "react";
// import "./ChildProgress.css";

// const SKILLS = [
//   { id: "attention", label: "Attention", icon: "🎯", color: "#8b6df0" },
//   { id: "memory", label: "Memory", icon: "🧠", color: "#45b994" },
//   { id: "math", label: "Math", icon: "🔢", color: "#f5ad43" },
//   { id: "reading", label: "Reading", icon: "📚", color: "#ef76ae" },
//   {
//     id: "problemSolving",
//     label: "Problem Solving",
//     icon: "🧩",
//     color: "#55aee8",
//   },
//   {
//     id: "communication",
//     label: "Communication",
//     icon: "💬",
//     color: "#ed8170",
//   },
// ] as const;

// type SkillId = (typeof SKILLS)[number]["id"];

// type AssessmentActivity = {
//   skill?: string;
//   correct?: boolean;
//   timeSpent?: number;
//   attempts?: number;
//   hintUsed?: boolean;
//   audioUsed?: boolean;
//   visualSupport?: boolean;
// };

// type AssessmentResult = {
//   completedAt?: string;
//   scores?: Record<string, number>;
//   activities?: AssessmentActivity[];
// };

// type ActivityRecord = {
//   id?: string;
//   skill: string;
//   activityName?: string;
//   correct?: boolean;
//   score?: number;
//   total?: number;
//   timeSpent?: number;
//   completedAt?: string;
//   completed?: boolean;
//   hintUsed?: boolean;
//   audioUsed?: boolean;
//   visualSupport?: boolean;
// };

// const ACTIVITY_KEY = "wonderlearnActivityLog";
// const ASSESSMENT_KEY = "assessmentResult";

// function readJson<T>(key: string, fallback: T): T {
//   try {
//     const value = localStorage.getItem(key);
//     return value ? (JSON.parse(value) as T) : fallback;
//   } catch {
//     return fallback;
//   }
// }

// function normalizeSkill(value?: string): SkillId | null {
//   if (!value) return null;

//   const normalized = value.toLowerCase().replace(/[\s_-]/g, "");

//   const aliases: Record<string, SkillId> = {
//     attention: "attention",
//     focus: "attention",
//     memory: "memory",
//     math: "math",
//     mathematics: "math",
//     reading: "reading",
//     phonics: "reading",
//     literacy: "reading",
//     problemsolving: "problemSolving",
//     logic: "problemSolving",
//     communication: "communication",
//     speaking: "communication",
//   };

//   return aliases[normalized] ?? null;
// }

// function formatMinutes(seconds: number) {
//   const minutes = Math.floor(Math.max(0, seconds) / 60);
//   const remainingSeconds = Math.floor(Math.max(0, seconds) % 60);

//   if (minutes === 0) return `${remainingSeconds}s`;
//   if (remainingSeconds === 0) return `${minutes} min`;
//   return `${minutes}m ${remainingSeconds}s`;
// }

// function formatDate(date?: string) {
//   if (!date) return "Date unavailable";

//   const parsed = new Date(date);
//   if (Number.isNaN(parsed.getTime())) return "Date unavailable";

//   return parsed.toLocaleDateString(undefined, {
//     day: "numeric",
//     month: "short",
//   });
// }

// function getAccuracy(activity: ActivityRecord) {
//   if (
//     typeof activity.score === "number" &&
//     typeof activity.total === "number" &&
//     activity.total > 0
//   ) {
//     return Math.round((activity.score / activity.total) * 100);
//   }

//   if (typeof activity.correct === "boolean") {
//     return activity.correct ? 100 : 0;
//   }

//   return null;
// }

// function getWeekDays() {
//   const today = new Date();

//   return Array.from({ length: 7 }, (_, index) => {
//     const date = new Date(today);
//     date.setDate(today.getDate() - (6 - index));

//     return {
//       date,
//       key: `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`,
//       label: date.toLocaleDateString(undefined, { weekday: "short" }),
//     };
//   });
// }

// export default function ChildProgress() {
//   const [assessment, setAssessment] = useState<AssessmentResult | null>(null);
//   const [activities, setActivities] = useState<ActivityRecord[]>([]);
//   const [period, setPeriod] = useState<"week" | "all">("week");
//   const [selectedSkill, setSelectedSkill] = useState<SkillId | "all">("all");

//   function refreshProgress() {
//     setAssessment(readJson<AssessmentResult | null>(ASSESSMENT_KEY, null));
//     setActivities(readJson<ActivityRecord[]>(ACTIVITY_KEY, []));
//   }

//   useEffect(() => {
//     refreshProgress();

//     const onProgressUpdate = () => refreshProgress();
//     const onStorage = (event: StorageEvent) => {
//       if (
//         event.key === ASSESSMENT_KEY ||
//         event.key === ACTIVITY_KEY ||
//         event.key === null
//       ) {
//         refreshProgress();
//       }
//     };

//     window.addEventListener("assessment-result-updated", onProgressUpdate);
//     window.addEventListener("learning-activity-completed", onProgressUpdate);
//     window.addEventListener("storage", onStorage);

//     return () => {
//       window.removeEventListener(
//         "assessment-result-updated",
//         onProgressUpdate
//       );
//       window.removeEventListener(
//         "learning-activity-completed",
//         onProgressUpdate
//       );
//       window.removeEventListener("storage", onStorage);
//     };
//   }, []);

//   const allActivities = useMemo(() => {
//     return activities
//       .map((activity) => ({
//         ...activity,
//         normalizedSkill: normalizeSkill(activity.skill),
//       }))
//       .filter(
//         (activity): activity is ActivityRecord & {
//           normalizedSkill: SkillId;
//         } => activity.normalizedSkill !== null
//       );
//   }, [activities]);

//   const recentActivities = useMemo(() => {
//     const filtered = allActivities.filter((activity) => {
//       if (selectedSkill !== "all") {
//         return activity.normalizedSkill === selectedSkill;
//       }
//       return true;
//     });

//     if (period === "all") return filtered;

//     const cutoff = new Date();
//     cutoff.setDate(cutoff.getDate() - 6);
//     cutoff.setHours(0, 0, 0, 0);

//     return filtered.filter((activity) => {
//       if (!activity.completedAt) return false;
//       const date = new Date(activity.completedAt);
//       return !Number.isNaN(date.getTime()) && date >= cutoff;
//     });
//   }, [allActivities, period, selectedSkill]);

//   const overview = useMemo(() => {
//     const completed = recentActivities.filter(
//       (activity) => activity.completed !== false
//     );

//     const scored = completed
//       .map(getAccuracy)
//       .filter((value): value is number => value !== null);

//     const timeSeconds = completed.reduce(
//       (sum, activity) => sum + Math.max(0, activity.timeSpent ?? 0),
//       0
//     );

//     return {
//       completed: completed.length,
//       timeSeconds,
//       accuracy: scored.length
//         ? Math.round(scored.reduce((sum, score) => sum + score, 0) / scored.length)
//         : null,
//       hints: completed.filter((activity) => activity.hintUsed).length,
//       audio: completed.filter((activity) => activity.audioUsed).length,
//       visual: completed.filter((activity) => activity.visualSupport).length,
//     };
//   }, [recentActivities]);

//   const skillStats = useMemo(() => {
//     return SKILLS.map((skill) => {
//       const assessmentScore = assessment?.scores?.[skill.id];

//       const startingScore =
//         typeof assessmentScore === "number" &&
//         Number.isFinite(assessmentScore)
//           ? Math.max(0, Math.min(100, Math.round(assessmentScore)))
//           : null;

//       const skillActivities = allActivities.filter(
//         (activity) => activity.normalizedSkill === skill.id
//       );

//       const scores = skillActivities
//         .map(getAccuracy)
//         .filter((value): value is number => value !== null);

//       const recentScores = skillActivities
//         .filter((activity) => {
//           if (!activity.completedAt) return false;
//           const date = new Date(activity.completedAt);
//           const cutoff = new Date();
//           cutoff.setDate(cutoff.getDate() - 6);
//           cutoff.setHours(0, 0, 0, 0);
//           return !Number.isNaN(date.getTime()) && date >= cutoff;
//         })
//         .map(getAccuracy)
//         .filter((value): value is number => value !== null);

//       const accuracy = scores.length
//         ? Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length)
//         : null;

//       const recentAccuracy = recentScores.length
//         ? Math.round(
//             recentScores.reduce((sum, score) => sum + score, 0) /
//               recentScores.length
//           )
//         : null;

//       const completedCount = skillActivities.filter(
//         (activity) => activity.completed !== false
//       ).length;

//       return {
//         ...skill,
//         startingScore,
//         accuracy,
//         recentAccuracy,
//         completedCount,
//       };
//     });
//   }, [assessment, allActivities]);

//   const strongestSkills = skillStats
//     .filter((skill) => skill.recentAccuracy !== null)
//     .sort((a, b) => (b.recentAccuracy ?? 0) - (a.recentAccuracy ?? 0))
//     .slice(0, 2);

//   const practiceSkills = skillStats
//     .filter((skill) => skill.recentAccuracy !== null)
//     .sort((a, b) => (a.recentAccuracy ?? 0) - (b.recentAccuracy ?? 0))
//     .slice(0, 2);

//   const weekDays = getWeekDays();

//   const weeklyActivity = weekDays.map((day) => {
//     const dayActivities = allActivities.filter((activity) => {
//       if (!activity.completedAt) return false;
//       const date = new Date(activity.completedAt);

//       return (
//         !Number.isNaN(date.getTime()) &&
//         date.getFullYear() === day.date.getFullYear() &&
//         date.getMonth() === day.date.getMonth() &&
//         date.getDate() === day.date.getDate()
//       );
//     });

//     return {
//       ...day,
//       count: dayActivities.filter(
//         (activity) => activity.completed !== false
//       ).length,
//       seconds: dayActivities.reduce(
//         (sum, activity) => sum + Math.max(0, activity.timeSpent ?? 0),
//         0
//       ),
//     };
//   });

//   const hasAssessment = !!assessment;
//   const hasActivityData = allActivities.length > 0;

//   return (
//     <main className="child-progress">
//       <header className="progress-hero">
//         <div className="progress-hero-copy">
//           <span className="progress-eyebrow">🌈 MY LEARNING JOURNEY</span>
//           <h1>Look how you're growing!</h1>
//           <p>
//             Every activity is a little step forward. Explore your learning
//             achievements and see what you can try next.
//           </p>
//           <div className="progress-hero-tags">
//             <span>⭐ Every effort counts</span>
//             <span>🌱 Learn at your pace</span>
//           </div>
//         </div>
//         <div className="progress-hero-art" aria-hidden="true">
//           <span>🦊</span>
//           <i>✨</i>
//           <b>⭐</b>
//         </div>
//       </header>

//       <section className="progress-toolbar">
//         <div>
//           <h2>Your learning snapshot</h2>
//           <p>
//             {hasActivityData
//               ? "Updated from your recorded learning activities."
//               : "Your progress will appear here as you complete activities."}
//           </p>
//         </div>

//         <label className="progress-filter">
//           <span>Show</span>
//           <select
//             value={period}
//             onChange={(event) =>
//               setPeriod(event.target.value as "week" | "all")
//             }
//           >
//             <option value="week">Last 7 days</option>
//             <option value="all">All recorded activity</option>
//           </select>
//         </label>
//       </section>

//       <section className="progress-metrics">
//         <MetricCard
//           icon="🎮"
//           label="Activities completed"
//           value={overview.completed.toString()}
//           detail={period === "week" ? "In the last 7 days" : "All time"}
//           color="lavender"
//         />
//         <MetricCard
//           icon="⏱️"
//           label="Learning time"
//           value={formatMinutes(overview.timeSeconds)}
//           detail="Time recorded in activities"
//           color="mint"
//         />
//         <MetricCard
//           icon="🎯"
//           label="Average accuracy"
//           value={overview.accuracy === null ? "—" : `${overview.accuracy}%`}
//           detail={
//             overview.accuracy === null
//               ? "Complete a scored activity"
//               : "Across scored activities"
//           }
//           color="peach"
//         />
//         <MetricCard
//           icon="💡"
//           label="Hints used"
//           value={overview.hints.toString()}
//           detail="It's okay to ask for help!"
//           color="pink"
//         />
//       </section>

//       <section className="progress-section-card">
//         <div className="progress-section-heading">
//           <div>
//             <span className="progress-section-kicker">YOUR SKILLS</span>
//             <h2>My learning profile</h2>
//             <p>Starting level and practice results are shown separately.</p>
//           </div>
//           <span className="section-decoration">🧠</span>
//         </div>

//         {!hasAssessment && (
//           <div className="progress-empty">
//             <span>📝</span>
//             <div>
//               <strong>Complete your pre-assessment</strong>
//               <p>
//                 Your starting skill levels will appear here after the
//                 assessment is saved.
//               </p>
//             </div>
//           </div>
//         )}

//         <div className="skill-progress-grid">
//           {skillStats.map((skill) => (
//             <button
//               type="button"
//               className={`skill-progress-card ${
//                 selectedSkill === skill.id ? "skill-selected" : ""
//               }`}
//               key={skill.id}
//               onClick={() =>
//                 setSelectedSkill((current) =>
//                   current === skill.id ? "all" : skill.id
//                 )
//               }
//               aria-pressed={selectedSkill === skill.id}
//               style={{ "--skill-color": skill.color } as React.CSSProperties}
//             >
//               <div className="skill-card-top">
//                 <span className="skill-icon">{skill.icon}</span>
//                 <span className="skill-practice-count">
//                   {skill.completedCount} activities
//                 </span>
//               </div>

//               <strong className="skill-name">{skill.label}</strong>

//               <div className="skill-score-row">
//                 <span>Starting level</span>
//                 <strong>
//                   {skill.startingScore === null
//                     ? "Not assessed"
//                     : `${skill.startingScore}%`}
//                 </strong>
//               </div>
//               <div className="skill-bar">
//                 <span
//                   style={{
//                     width: `${skill.startingScore ?? 0}%`,
//                     background: skill.color,
//                   }}
//                 />
//               </div>

//               <div className="skill-score-row skill-practice-row">
//                 <span>Activity accuracy</span>
//                 <strong>
//                   {skill.accuracy === null ? "No results yet" : `${skill.accuracy}%`}
//                 </strong>
//               </div>
//               <div className="skill-bar skill-bar-soft">
//                 <span
//                   style={{
//                     width: `${skill.accuracy ?? 0}%`,
//                     background: skill.color,
//                   }}
//                 />
//               </div>

//               <div className="skill-card-footer">
//                 <span>
//                   {skill.recentAccuracy === null
//                     ? "Keep exploring"
//                     : `Recent: ${skill.recentAccuracy}%`}
//                 </span>
//                 <span className="skill-open-arrow">
//                   {selectedSkill === skill.id ? "✓" : "↗"}
//                 </span>
//               </div>
//             </button>
//           ))}
//         </div>
//         <p className="skill-filter-note">
//           Tap a skill card to filter the activity history below.
//         </p>
//       </section>

//       <section className="progress-two-column">
//         <div className="progress-section-card weekly-card">
//           <div className="progress-section-heading">
//             <div>
//               <span className="progress-section-kicker">LITTLE STEPS ADD UP</span>
//               <h2>Your week</h2>
//               <p>Activities recorded each day.</p>
//             </div>
//             <span className="section-decoration">📅</span>
//           </div>

//           <div className="week-chart" aria-label="Activities completed each day">
//             {weeklyActivity.map((day) => {
//               const max = Math.max(
//                 1,
//                 ...weeklyActivity.map((item) => item.count)
//               );
//               const height = day.count ? Math.max(12, (day.count / max) * 100) : 5;

//               return (
//                 <div className="week-chart-column" key={day.key}>
//                   <span className="week-chart-count">{day.count || ""}</span>
//                   <div className="week-chart-track">
//                     <div
//                       className={`week-chart-bar ${
//                         day.count ? "week-chart-bar-active" : ""
//                       }`}
//                       style={{ height: `${height}%` }}
//                       title={`${day.count} activities; ${formatMinutes(day.seconds)}`}
//                     />
//                   </div>
//                   <span className="week-chart-day">{day.label}</span>
//                 </div>
//               );
//             })}
//           </div>
//           <div className="chart-legend">
//             <span /> <span>Completed activities</span>
//           </div>
//         </div>

//         <div className="progress-section-card support-card">
//           <div className="progress-section-heading">
//             <div>
//               <span className="progress-section-kicker">LEARNING SUPPORT</span>
//               <h2>What helps me learn?</h2>
//               <p>Recorded support use—not a score.</p>
//             </div>
//             <span className="section-decoration">🌟</span>
//           </div>

//           <SupportRow icon="💡" label="Hints used" value={overview.hints} />
//           <SupportRow icon="🔊" label="Audio support used" value={overview.audio} />
//           <SupportRow icon="🖼️" label="Visual support used" value={overview.visual} />

//           <div className="support-note">
//             💚 Using a hint or support is a learning strategy, not a mistake.
//           </div>
//         </div>
//       </section>

//       <section className="progress-section-card">
//         <div className="progress-section-heading">
//           <div>
//             <span className="progress-section-kicker">YOUR NEXT ADVENTURE</span>
//             <h2>Strengths and practice ideas</h2>
//             <p>Suggestions are based on recorded activity accuracy.</p>
//           </div>
//           <span className="section-decoration">🚀</span>
//         </div>

//         {!hasActivityData ? (
//           <div className="progress-empty">
//             <span>🌱</span>
//             <div>
//               <strong>Your learning story starts here</strong>
//               <p>
//                 Complete a learning activity to see personalized suggestions.
//               </p>
//             </div>
//           </div>
//         ) : (
//           <div className="suggestion-grid">
//             <div className="suggestion-box suggestion-strength">
//               <span className="suggestion-emoji">🏆</span>
//               <h3>Skills to celebrate</h3>
//               {strongestSkills.length ? (
//                 strongestSkills.map((skill) => (
//                   <div className="suggestion-item" key={skill.id}>
//                     <span>{skill.icon} {skill.label}</span>
//                     <strong>{skill.recentAccuracy}% recent accuracy</strong>
//                   </div>
//                 ))
//               ) : (
//                 <p>More scored activities will help identify current strengths.</p>
//               )}
//             </div>

//             <div className="suggestion-box suggestion-practice">
//               <span className="suggestion-emoji">🌼</span>
//               <h3>Skills to practise</h3>
//               {practiceSkills.length ? (
//                 practiceSkills.map((skill) => (
//                   <div className="suggestion-item" key={skill.id}>
//                     <span>{skill.icon} {skill.label}</span>
//                     <strong>{skill.recentAccuracy}% recent accuracy</strong>
//                   </div>
//                 ))
//               ) : (
//                 <p>Try a few activities to get practice suggestions.</p>
//               )}
//             </div>
//           </div>
//         )}

//         <div className="progress-next-step">
//           <span>🎨</span>
//           <div>
//             <strong>Choose your next activity</strong>
//             <p>
//               Try a short activity in a skill you want to explore. Progress is
//               about learning at your own pace.
//             </p>
//           </div>
//           <a href="/phonics">Explore phonics →</a>
//         </div>
//       </section>

//       <section className="progress-section-card history-card">
//         <div className="progress-section-heading">
//           <div>
//             <span className="progress-section-kicker">RECENT ACTIVITY</span>
//             <h2>My learning timeline</h2>
//             <p>
//               {selectedSkill === "all"
//                 ? "Your latest recorded activities."
//                 : `Activities for ${
//                     SKILLS.find((skill) => skill.id === selectedSkill)?.label
//                   }.`}
//             </p>
//           </div>
//           {selectedSkill !== "all" && (
//             <button
//               className="clear-skill-filter"
//               onClick={() => setSelectedSkill("all")}
//               type="button"
//             >
//               Clear filter ×
//             </button>
//           )}
//         </div>

//         {recentActivities.length === 0 ? (
//           <div className="progress-empty">
//             <span>🧭</span>
//             <div>
//               <strong>No activities for this view yet</strong>
//               <p>
//                 Complete an activity, or choose “All recorded activity” to see
//                 older results.
//               </p>
//             </div>
//           </div>
//         ) : (
//           <div className="activity-timeline">
//             {[...recentActivities]
//               .sort(
//                 (a, b) =>
//                   new Date(b.completedAt ?? 0).getTime() -
//                   new Date(a.completedAt ?? 0).getTime()
//               )
//               .slice(0, 12)
//               .map((activity, index) => {
//                 const skill = SKILLS.find(
//                   (item) => item.id === normalizeSkill(activity.skill)
//                 );
//                 const accuracy = getAccuracy(activity);

//                 return (
//                   <article
//                     className="timeline-item"
//                     key={activity.id ?? `${activity.activityName}-${activity.completedAt}-${index}`}
//                   >
//                     <span
//                       className="timeline-icon"
//                       style={{ "--skill-color": skill?.color ?? "#9c8be9" } as React.CSSProperties}
//                     >
//                       {skill?.icon ?? "✨"}
//                     </span>
//                     <div className="timeline-main">
//                       <strong>{activity.activityName ?? skill?.label ?? "Learning activity"}</strong>
//                       <span>
//                         {skill?.label ?? "Learning"} · {formatDate(activity.completedAt)}
//                       </span>
//                     </div>
//                     <div className="timeline-result">
//                       <strong>
//                         {accuracy === null ? "Practised" : `${accuracy}%`}
//                       </strong>
//                       <span>{formatMinutes(activity.timeSpent ?? 0)}</span>
//                     </div>
//                   </article>
//                 );
//               })}
//           </div>
//         )}
//       </section>

//       <footer className="progress-footer">
//         <span>🌈</span>
//         <p>
//           <strong>Every small step matters.</strong>
//           <br />
//           Your progress helps you discover how you learn best.
//         </p>
//       </footer>
//     </main>
//   );
// }

// function MetricCard({
//   icon,
//   label,
//   value,
//   detail,
//   color,
// }: {
//   icon: string;
//   label: string;
//   value: string;
//   detail: string;
//   color: string;
// }) {
//   return (
//     <article className={`progress-metric metric-${color}`}>
//       <span className="metric-icon">{icon}</span>
//       <span className="metric-label">{label}</span>
//       <strong className="metric-value">{value}</strong>
//       <span className="metric-detail">{detail}</span>
//     </article>
//   );
// }

// function SupportRow({
//   icon,
//   label,
//   value,
// }: {
//   icon: string;
//   label: string;
//   value: number;
// }) {
//   return (
//     <div className="support-row">
//       <span className="support-row-icon">{icon}</span>
//       <span>{label}</span>
//       <strong>{value}</strong>
//     </div>
//   );
// }

import { useEffect, useMemo, useState } from "react";
import { useAuth } from "@clerk/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Rocket,
  Sparkles,
  TrendingUp,
  Flame,
  Star,
  Trophy,
  Target,
  Brain,
  BookOpen,
  Calculator,
  MessageCircle,
  Lightbulb,
  Volume2,
  Image as ImageIcon,
  Calendar,
  Clock,
  ArrowRight,
  Palette,
  Compass,
  Heart,
  User,
  ClipboardCheck,
  Award,
  Puzzle,
} from "lucide-react";

import "./ChildProgress.css";

// =========================================================
// SKILLS
// =========================================================

const SKILLS = [
  {
    id: "attention",
    label: "Attention",
    icon: "🎯",
    Icon: Target,
    color: "#a78bfa",
    gradient: "from-fuchsia-500 via-purple-500 to-indigo-600",
    glow: "shadow-purple-500/40",
  },
  {
    id: "memory",
    label: "Memory",
    icon: "🧠",
    Icon: Brain,
    color: "#34d399",
    gradient: "from-emerald-500 via-teal-500 to-cyan-600",
    glow: "shadow-emerald-500/40",
  },
  {
    id: "math",
    label: "Math",
    icon: "🔢",
    Icon: Calculator,
    color: "#fbbf24",
    gradient: "from-amber-500 via-orange-500 to-red-600",
    glow: "shadow-amber-500/40",
  },
  {
    id: "reading",
    label: "Reading",
    icon: "📚",
    Icon: BookOpen,
    color: "#f472b6",
    gradient: "from-rose-500 via-pink-500 to-fuchsia-600",
    glow: "shadow-pink-500/40",
  },
  {
    id: "problemSolving",
    label: "Problem Solving",
    icon: "🧩",
    Icon: Puzzle,
    color: "#60a5fa",
    gradient: "from-sky-500 via-blue-500 to-indigo-600",
    glow: "shadow-blue-500/40",
  },
  {
    id: "communication",
    label: "Communication",
    icon: "💬",
    Icon: MessageCircle,
    color: "#fb923c",
    gradient: "from-orange-500 via-rose-500 to-red-600",
    glow: "shadow-orange-500/40",
  },
] as const;

type SkillId = (typeof SKILLS)[number]["id"];

type AssessmentActivity = {
  skill?: string;
  correct?: boolean;
  timeSpent?: number;
  attempts?: number;
  hintUsed?: boolean;
  audioUsed?: boolean;
  visualSupport?: boolean;
};

type AssessmentResult = {
  completedAt?: string;
  scores?: Record<string, number>;
  activities?: AssessmentActivity[];
  // Fields from the AssessmentResult backend model
  childName?: string;
  userName?: string;
  email?: string;
  ageGroup?: string;
  support?: string;
  createdAt?: string;
  _id?: string;
};

type ActivityRecord = {
  id?: string;
  skill: string;
  activityName?: string;
  correct?: boolean;
  score?: number;
  total?: number;
  timeSpent?: number;
  completedAt?: string;
  completed?: boolean;
  hintUsed?: boolean;
  audioUsed?: boolean;
  visualSupport?: boolean;
};

const ACTIVITY_KEY = "wonderlearnActivityLog";
const ASSESSMENT_KEY = "assessmentResult";

// =========================================================
// HELPERS
// =========================================================

function readJson<T>(key: string, fallback: T): T {
  try {
    const value = localStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : fallback;
  } catch {
    return fallback;
  }
}

function normalizeSkill(value?: string): SkillId | null {
  if (!value) return null;
  const normalized = value.toLowerCase().replace(/[\s_-]/g, "");
  const aliases: Record<string, SkillId> = {
    attention: "attention",
    focus: "attention",
    memory: "memory",
    math: "math",
    mathematics: "math",
    reading: "reading",
    phonics: "reading",
    literacy: "reading",
    problemsolving: "problemSolving",
    logic: "problemSolving",
    communication: "communication",
    speaking: "communication",
  };
  return aliases[normalized] ?? null;
}

function formatMinutes(seconds: number) {
  const minutes = Math.floor(Math.max(0, seconds) / 60);
  const remainingSeconds = Math.floor(Math.max(0, seconds) % 60);
  if (minutes === 0) return `${remainingSeconds}s`;
  if (remainingSeconds === 0) return `${minutes} min`;
  return `${minutes}m ${remainingSeconds}s`;
}

function formatDate(date?: string) {
  if (!date) return "Date unavailable";
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return "Date unavailable";
  return parsed.toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
  });
}

function formatDateTime(date?: string) {
  if (!date) return { date: "Date unavailable", time: "" };
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) {
    return { date: "Date unavailable", time: "" };
  }
  return {
    date: parsed.toLocaleDateString(undefined, {
      weekday: "short",
      day: "numeric",
      month: "long",
      year: "numeric",
    }),
    time: parsed.toLocaleTimeString(undefined, {
      hour: "numeric",
      minute: "2-digit",
    }),
  };
}

function getAccuracy(activity: ActivityRecord) {
  if (
    typeof activity.score === "number" &&
    typeof activity.total === "number" &&
    activity.total > 0
  ) {
    return Math.round((activity.score / activity.total) * 100);
  }
  if (typeof activity.correct === "boolean") {
    return activity.correct ? 100 : 0;
  }
  return null;
}

function getWeekDays() {
  const today = new Date();
  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date(today);
    date.setDate(today.getDate() - (6 - index));
    return {
      date,
      key: `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`,
      label: date.toLocaleDateString(undefined, { weekday: "short" }),
    };
  });
}

// =========================================================
// FETCH LATEST ASSESSMENT FROM BACKEND
// =========================================================

async function fetchLatestAssessmentFromBackend(
  getToken: () => Promise<string | null>,
  clerkId: string
): Promise<AssessmentResult | null> {
  try {
    const token = await getToken();
    const apiBase =
      import.meta.env.VITE_API_URL ?? "http://localhost:5000";

    const res = await fetch(
      `${apiBase}/api/assessment/results/${clerkId}/latest`,
      {
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
          "Content-Type": "application/json",
        },
      }
    );

    if (!res.ok) {
      // 404 = no assessment yet → not an error
      if (res.status === 404) return null;
      console.warn(
        "[ChildProgress] Failed to fetch assessment:",
        res.status
      );
      return null;
    }

    const json = await res.json();
    const assessment: AssessmentResult | undefined =
      json?.assessment ?? json?.data ?? null;

    if (!assessment) return null;

    // Cache locally so refresh works offline
    try {
      localStorage.setItem(
        ASSESSMENT_KEY,
        JSON.stringify({
          ...assessment,
          completedAt: assessment.completedAt,
          scores: assessment.scores,
          activities: assessment.activities,
        })
      );
    } catch {
      /* ignore */
    }

    return assessment;
  } catch (err) {
    console.warn("[ChildProgress] Network error:", err);
    return null;
  }
}

// =========================================================
// SPACE BACKGROUND
// =========================================================

function SpaceBackground() {
  const stars = useMemo(
    () =>
      Array.from({ length: 100 }).map((_, i) => ({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: Math.random() * 2.5 + 1,
        delay: Math.random() * 4,
        duration: Math.random() * 3 + 2,
      })),
    []
  );

  const planets = [
    { size: 220, top: "5%", left: "-5%", from: "#7c3aed", to: "#1e1b4b" },
    { size: 160, top: "60%", left: "92%", from: "#0891b2", to: "#0f172a" },
    { size: 100, top: "85%", left: "3%", from: "#db2777", to: "#4c1d95" },
    { size: 80, top: "22%", left: "85%", from: "#f59e0b", to: "#7c2d12" },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#1e1b4b_0%,#0b0720_45%,#04030e_100%)]" />
      <div className="absolute top-0 left-1/4 w-[700px] h-[700px] rounded-full bg-purple-600/20 blur-[120px]" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] rounded-full bg-cyan-500/15 blur-[120px]" />
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full bg-pink-500/15 blur-[100px]" />

      {stars.map((s) => (
        <motion.div
          key={s.id}
          className="absolute rounded-full bg-white"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: s.size,
            height: s.size,
            boxShadow: "0 0 6px 2px rgba(255,255,255,0.6)",
          }}
          animate={{ opacity: [0.2, 1, 0.2], scale: [1, 1.4, 1] }}
          transition={{
            duration: s.duration,
            repeat: Infinity,
            delay: s.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {planets.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            top: p.top,
            left: p.left,
            background: `radial-gradient(circle at 30% 30%, ${p.from}, ${p.to})`,
            boxShadow: `0 0 60px 20px ${p.from}40, inset -20px -20px 40px rgba(0,0,0,0.5)`,
          }}
          animate={{ y: [0, -25, 0], rotate: [0, 360] }}
          transition={{
            y: { duration: 8 + i, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 60 + i * 20, repeat: Infinity, ease: "linear" },
          }}
        />
      ))}

      <motion.div
        className="absolute h-0.5 w-32 bg-gradient-to-r from-white via-white/60 to-transparent rounded-full"
        style={{ top: "25%", left: "10%" }}
        animate={{ x: [0, 700], y: [0, 300], opacity: [0, 1, 0] }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatDelay: 8,
          ease: "easeOut",
        }}
      />
    </div>
  );
}

// =========================================================
// MAIN COMPONENT
// =========================================================

export default function ChildProgress() {
  const { userId, getToken, isLoaded } = useAuth();

  const [assessment, setAssessment] = useState<AssessmentResult | null>(null);
  const [activities, setActivities] = useState<ActivityRecord[]>([]);
  const [period, setPeriod] = useState<"week" | "all">("week");
  const [selectedSkill, setSelectedSkill] = useState<SkillId | "all">("all");
  const [fetchingAssessment, setFetchingAssessment] = useState(false);

  function refreshProgress() {
    setAssessment(readJson<AssessmentResult | null>(ASSESSMENT_KEY, null));
    setActivities(readJson<ActivityRecord[]>(ACTIVITY_KEY, []));
  }

  useEffect(() => {
    // Instant: read from localStorage first
    refreshProgress();

    // Then try fetching the freshest data from backend
    if (!isLoaded || !userId) return;

    let cancelled = false;
    setFetchingAssessment(true);

    fetchLatestAssessmentFromBackend(getToken, userId)
      .then((remote) => {
        if (cancelled) return;
        if (remote) setAssessment(remote);
      })
      .finally(() => {
        if (!cancelled) setFetchingAssessment(false);
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded, userId]);

  useEffect(() => {
    const onProgressUpdate = () => refreshProgress();
    const onStorage = (event: StorageEvent) => {
      if (
        event.key === ASSESSMENT_KEY ||
        event.key === ACTIVITY_KEY ||
        event.key === null
      ) {
        refreshProgress();
      }
    };

    window.addEventListener("assessment-result-updated", onProgressUpdate);
    window.addEventListener("learning-activity-completed", onProgressUpdate);
    window.addEventListener("storage", onStorage);

    return () => {
      window.removeEventListener("assessment-result-updated", onProgressUpdate);
      window.removeEventListener(
        "learning-activity-completed",
        onProgressUpdate
      );
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  // =========================================================
  // PRE-ASSESSMENT SUMMARY (from AssessmentResult cluster)
  // =========================================================

  const preAssessmentSummary = useMemo(() => {
    if (!assessment) return null;

    const activitiesFromAssessment = assessment.activities ?? [];
    const totalQuestions = activitiesFromAssessment.length;
    const correctCount = activitiesFromAssessment.filter(
      (a) => a.correct === true
    ).length;
    const hintCount = activitiesFromAssessment.filter((a) => a.hintUsed).length;
    const audioCount = activitiesFromAssessment.filter(
      (a) => a.audioUsed
    ).length;
    const visualCount = activitiesFromAssessment.filter(
      (a) => a.visualSupport
    ).length;
    const totalTimeSeconds = activitiesFromAssessment.reduce(
      (sum, a) => sum + Math.max(0, a.timeSpent ?? 0),
      0
    );

    const childName =
      assessment.childName || assessment.userName || "Your child";

    return {
      childName,
      ageGroup: assessment.ageGroup,
      support: assessment.support,
      completedAt: assessment.completedAt,
      correctCount,
      totalQuestions,
      hintCount,
      audioCount,
      visualCount,
      totalTimeSeconds,
    };
  }, [assessment]);

  // =========================================================
  // NORMALIZED ACTIVITIES (unchanged logic)
  // =========================================================

  const allActivities = useMemo(() => {
    return activities
      .map((activity) => ({
        ...activity,
        normalizedSkill: normalizeSkill(activity.skill),
      }))
      .filter(
        (activity): activity is ActivityRecord & { normalizedSkill: SkillId } =>
          activity.normalizedSkill !== null
      );
  }, [activities]);

  const recentActivities = useMemo(() => {
    const filtered = allActivities.filter((activity) => {
      if (selectedSkill !== "all") {
        return activity.normalizedSkill === selectedSkill;
      }
      return true;
    });

    if (period === "all") return filtered;

    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - 6);
    cutoff.setHours(0, 0, 0, 0);

    return filtered.filter((activity) => {
      if (!activity.completedAt) return false;
      const date = new Date(activity.completedAt);
      return !Number.isNaN(date.getTime()) && date >= cutoff;
    });
  }, [allActivities, period, selectedSkill]);

  const overview = useMemo(() => {
    const completed = recentActivities.filter(
      (activity) => activity.completed !== false
    );

    const scored = completed
      .map(getAccuracy)
      .filter((value): value is number => value !== null);

    const timeSeconds = completed.reduce(
      (sum, activity) => sum + Math.max(0, activity.timeSpent ?? 0),
      0
    );

    return {
      completed: completed.length,
      timeSeconds,
      accuracy: scored.length
        ? Math.round(scored.reduce((sum, score) => sum + score, 0) / scored.length)
        : null,
      hints: completed.filter((activity) => activity.hintUsed).length,
      audio: completed.filter((activity) => activity.audioUsed).length,
      visual: completed.filter((activity) => activity.visualSupport).length,
    };
  }, [recentActivities]);

  const skillStats = useMemo(() => {
    return SKILLS.map((skill) => {
      const assessmentScore = assessment?.scores?.[skill.id];

      const startingScore =
        typeof assessmentScore === "number" &&
        Number.isFinite(assessmentScore)
          ? Math.max(0, Math.min(100, Math.round(assessmentScore)))
          : null;

      const skillActivities = allActivities.filter(
        (activity) => activity.normalizedSkill === skill.id
      );

      const scores = skillActivities
        .map(getAccuracy)
        .filter((value): value is number => value !== null);

      const recentScores = skillActivities
        .filter((activity) => {
          if (!activity.completedAt) return false;
          const date = new Date(activity.completedAt);
          const cutoff = new Date();
          cutoff.setDate(cutoff.getDate() - 6);
          cutoff.setHours(0, 0, 0, 0);
          return !Number.isNaN(date.getTime()) && date >= cutoff;
        })
        .map(getAccuracy)
        .filter((value): value is number => value !== null);

      const accuracy = scores.length
        ? Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length)
        : null;

      const recentAccuracy = recentScores.length
        ? Math.round(
            recentScores.reduce((sum, score) => sum + score, 0) /
              recentScores.length
          )
        : null;

      const completedCount = skillActivities.filter(
        (activity) => activity.completed !== false
      ).length;

      return {
        ...skill,
        startingScore,
        accuracy,
        recentAccuracy,
        completedCount,
      };
    });
  }, [assessment, allActivities]);

  const strongestSkills = skillStats
    .filter((skill) => skill.recentAccuracy !== null)
    .sort((a, b) => (b.recentAccuracy ?? 0) - (a.recentAccuracy ?? 0))
    .slice(0, 2);

  const practiceSkills = skillStats
    .filter((skill) => skill.recentAccuracy !== null)
    .sort((a, b) => (a.recentAccuracy ?? 0) - (b.recentAccuracy ?? 0))
    .slice(0, 2);

  const weekDays = getWeekDays();

  const weeklyActivity = weekDays.map((day) => {
    const dayActivities = allActivities.filter((activity) => {
      if (!activity.completedAt) return false;
      const date = new Date(activity.completedAt);
      return (
        !Number.isNaN(date.getTime()) &&
        date.getFullYear() === day.date.getFullYear() &&
        date.getMonth() === day.date.getMonth() &&
        date.getDate() === day.date.getDate()
      );
    });

    return {
      ...day,
      count: dayActivities.filter(
        (activity) => activity.completed !== false
      ).length,
      seconds: dayActivities.reduce(
        (sum, activity) => sum + Math.max(0, activity.timeSpent ?? 0),
        0
      ),
    };
  });

  const hasAssessment = !!assessment;
  const hasActivityData = allActivities.length > 0;
  const assessmentDate = formatDateTime(preAssessmentSummary?.completedAt);

  return (
    <div className="relative min-h-screen text-white">
      <SpaceBackground />

      <div className="relative z-10">
        <main className="child-progress">
          {/* =====================================================
              HERO
          ===================================================== */}

          <motion.header
            className="progress-hero"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="progress-hero-copy">
              <div className="flex items-center gap-3 mb-3">
                <motion.span
                  className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 text-white shadow-lg shadow-purple-500/40"
                  animate={{ rotate: [0, 8, -8, 0] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Rocket className="w-7 h-7" />
                </motion.span>
                <span className="progress-eyebrow">🚀 MY LEARNING JOURNEY</span>
              </div>
              <h1>
                Look how{" "}
                <span className="bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
                  you're growing
                </span>
                {preAssessmentSummary?.childName && (
                  <>
                    {" "}
                    ,{" "}
                    <span className="text-white">
                      {preAssessmentSummary.childName}
                    </span>
                  </>
                )}
                !
              </h1>
              <p>
                Every activity is a little step forward. Explore your learning
                achievements and see what you can try next.
              </p>
              <div className="progress-hero-tags">
                <span className="progress-tag progress-tag--amber">
                  <Star className="w-4 h-4" /> Every effort counts
                </span>
                <span className="progress-tag progress-tag--emerald">
                  <Sparkles className="w-4 h-4" /> Learn at your pace
                </span>
              </div>
            </div>
            <div className="progress-hero-art" aria-hidden="true">
              <motion.div
                className="progress-hero-art-inner"
                animate={{ y: [0, -12, 0], rotate: [0, 5, -5, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Rocket className="w-20 h-20 text-cyan-300" />
                <Sparkles className="w-8 h-8 text-amber-300 absolute -top-2 -right-2" />
                <Star className="w-6 h-6 text-pink-300 absolute -bottom-1 -left-1" />
              </motion.div>
            </div>
          </motion.header>

          {/* =====================================================
              PRE-ASSESSMENT DETAILS CARD
          ===================================================== */}

          {hasAssessment && preAssessmentSummary && (
            <motion.section
              className="pre-assessment-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
            >
              <div className="pre-assessment-header">
                <div className="pre-assessment-badge">
                  <motion.span
                    className="pre-assessment-icon"
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <ClipboardCheck className="w-7 h-7" />
                  </motion.span>
                  <div>
                    <span className="pre-assessment-kicker">
                      PRE-ASSESSMENT COMPLETED
                    </span>
                    <h2>
                      {preAssessmentSummary.childName}'s Starting Point
                    </h2>
                  </div>
                </div>
                <div className="pre-assessment-date">
                  <Calendar className="w-5 h-5 text-cyan-300" />
                  <div>
                    <strong>{assessmentDate.date}</strong>
                    <span>{assessmentDate.time}</span>
                  </div>
                </div>
              </div>

              <div className="pre-assessment-stats">
                <motion.div
                  className="pa-stat pa-stat--correct"
                  whileHover={{ y: -4, scale: 1.03 }}
                >
                  <span className="pa-stat-icon pa-stat-icon--correct">
                    
                  </span>
                  <div>
                    <strong className="pa-stat-value">
                      {preAssessmentSummary.correctCount}
                      <span className="pa-stat-total">
                        /{preAssessmentSummary.totalQuestions}
                      </span>
                    </strong>
                    <span className="pa-stat-label">Correct answers</span>
                  </div>
                </motion.div>

                <motion.div
                  className="pa-stat pa-stat--hints"
                  whileHover={{ y: -4, scale: 1.03 }}
                >
                  <span className="pa-stat-icon pa-stat-icon--hints">
                    <Lightbulb className="w-6 h-6" />
                  </span>
                  <div>
                    <strong className="pa-stat-value">
                      {preAssessmentSummary.hintCount}
                    </strong>
                    <span className="pa-stat-label">Hints used</span>
                  </div>
                </motion.div>

                <motion.div
                  className="pa-stat pa-stat--audio"
                  whileHover={{ y: -4, scale: 1.03 }}
                >
                  <span className="pa-stat-icon pa-stat-icon--audio">
                    <Volume2 className="w-6 h-6" />
                  </span>
                  <div>
                    <strong className="pa-stat-value">
                      {preAssessmentSummary.audioCount}
                    </strong>
                    <span className="pa-stat-label">Audio support</span>
                  </div>
                </motion.div>

                <motion.div
                  className="pa-stat pa-stat--visual"
                  whileHover={{ y: -4, scale: 1.03 }}
                >
                  <span className="pa-stat-icon pa-stat-icon--visual">
                    <ImageIcon className="w-6 h-6" />
                  </span>
                  <div>
                    <strong className="pa-stat-value">
                      {preAssessmentSummary.visualCount}
                    </strong>
                    <span className="pa-stat-label">Visual support</span>
                  </div>
                </motion.div>

                <motion.div
                  className="pa-stat pa-stat--time"
                  whileHover={{ y: -4, scale: 1.03 }}
                >
                  <span className="pa-stat-icon pa-stat-icon--time">
                    <Clock className="w-6 h-6" />
                  </span>
                  <div>
                    <strong className="pa-stat-value">
                      {formatMinutes(preAssessmentSummary.totalTimeSeconds)}
                    </strong>
                    <span className="pa-stat-label">Time spent</span>
                  </div>
                </motion.div>
              </div>

              {(preAssessmentSummary.ageGroup ||
                preAssessmentSummary.support) && (
                <div className="pre-assessment-meta">
                  {preAssessmentSummary.ageGroup && (
                    <span className="pre-meta-pill">
                      <User className="w-4 h-4" />
                      Age group: {preAssessmentSummary.ageGroup}
                    </span>
                  )}
                  {preAssessmentSummary.support && (
                    <span className="pre-meta-pill">
                      <Heart className="w-4 h-4" />
                      Support: {preAssessmentSummary.support}
                    </span>
                  )}
                </div>
              )}
            </motion.section>
          )}

          {/* =====================================================
              TOOLBAR
          ===================================================== */}

          <motion.section
            className="progress-toolbar"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div>
              <h2>Your learning snapshot</h2>
              <p>
                {hasActivityData
                  ? "Updated from your recorded learning activities."
                  : "Your progress will appear here as you complete activities."}
              </p>
            </div>

            <label className="progress-filter">
              <span>Show</span>
              <select
                value={period}
                onChange={(event) =>
                  setPeriod(event.target.value as "week" | "all")
                }
              >
                <option value="week">Last 7 days</option>
                <option value="all">All recorded activity</option>
              </select>
            </label>
          </motion.section>

          {/* =====================================================
              METRIC CARDS
          ===================================================== */}

          <section className="progress-metrics">
            <MetricCard
              Icon={Rocket}
              label="Activities completed"
              value={overview.completed.toString()}
              detail={period === "week" ? "In the last 7 days" : "All time"}
              color="purple"
            />
            <MetricCard
              Icon={Clock}
              label="Learning time"
              value={formatMinutes(overview.timeSeconds)}
              detail="Time recorded in activities"
              color="cyan"
            />
            <MetricCard
              Icon={Target}
              label="Average accuracy"
              value={overview.accuracy === null ? "—" : `${overview.accuracy}%`}
              detail={
                overview.accuracy === null
                  ? "Complete a scored activity"
                  : "Across scored activities"
              }
              color="emerald"
            />
            <MetricCard
              Icon={Lightbulb}
              label="Hints used"
              value={overview.hints.toString()}
              detail="It's okay to ask for help!"
              color="amber"
            />
          </section>

          {/* =====================================================
              SKILLS SECTION
          ===================================================== */}

          <motion.section
            className="progress-section-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="progress-section-heading">
              <div>
                <span className="progress-section-kicker">YOUR SKILLS</span>
                <h2>My learning profile</h2>
                <p>Starting level and practice results are shown separately.</p>
              </div>
              <span className="section-decoration">
                <Brain className="w-7 h-7 text-purple-300" />
              </span>
            </div>

            {!hasAssessment && (
              <div className="progress-empty">
                <span className="progress-empty-icon">
                  <Sparkles className="w-8 h-8 text-cyan-300" />
                </span>
                <div>
                  <strong>Complete your pre-assessment</strong>
                  <p>
                    Your starting skill levels will appear here after the
                    assessment is saved.
                  </p>
                </div>
              </div>
            )}

            {fetchingAssessment && !assessment && (
              <div className="progress-empty">
                <span className="progress-empty-icon">
                  <Sparkles className="w-8 h-8 text-cyan-300 animate-pulse" />
                </span>
                <div>
                  <strong>Fetching your starting level…</strong>
                  <p>Loading your pre-assessment results.</p>
                </div>
              </div>
            )}

            <div className="skill-progress-grid">
              {skillStats.map((skill) => {
                const Icon = skill.Icon;
                const isSelected = selectedSkill === skill.id;

                return (
                  <motion.button
                    type="button"
                    className={`skill-progress-card ${
                      isSelected ? "skill-selected" : ""
                    }`}
                    key={skill.id}
                    onClick={() =>
                      setSelectedSkill((current) =>
                        current === skill.id ? "all" : skill.id
                      )
                    }
                    aria-pressed={isSelected}
                    whileHover={{ y: -4, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="skill-card-top">
                      <span
                        className={`skill-icon flex items-center justify-center bg-gradient-to-br ${skill.gradient} ${skill.glow}`}
                      >
                        <Icon className="w-6 h-6 text-white" />
                      </span>
                      <span className="skill-practice-count">
                        {skill.completedCount} activities
                      </span>
                    </div>

                    <strong className="skill-name">{skill.label}</strong>

                    <div className="skill-score-row">
                      <span>Starting level</span>
                      <strong>
                        {skill.startingScore === null
                          ? "Not assessed"
                          : `${skill.startingScore}%`}
                      </strong>
                    </div>
                    <div className="skill-bar">
                      <span
                        style={{
                          width: `${skill.startingScore ?? 0}%`,
                          background: `linear-gradient(90deg, ${skill.color}, ${skill.color}cc)`,
                          boxShadow: `0 0 12px ${skill.color}80`,
                        }}
                      />
                    </div>

                    <div className="skill-score-row skill-practice-row">
                      <span>Activity accuracy</span>
                      <strong>
                        {skill.accuracy === null
                          ? "No results yet"
                          : `${skill.accuracy}%`}
                      </strong>
                    </div>
                    <div className="skill-bar skill-bar-soft">
                      <span
                        style={{
                          width: `${skill.accuracy ?? 0}%`,
                          background: `linear-gradient(90deg, ${skill.color}, ${skill.color}cc)`,
                          boxShadow: `0 0 12px ${skill.color}80`,
                        }}
                      />
                    </div>

                    <div className="skill-card-footer">
                      <span>
                        {skill.recentAccuracy === null
                          ? "Keep exploring"
                          : `Recent: ${skill.recentAccuracy}%`}
                      </span>
                      <span className="skill-open-arrow">
                        {isSelected ? "✓" : "↗"}
                      </span>
                    </div>
                  </motion.button>
                );
              })}
            </div>
            <p className="skill-filter-note">
              Tap a skill card to filter the activity history below.
            </p>
          </motion.section>

          {/* =====================================================
              WEEKLY + SUPPORT
          ===================================================== */}

          <section className="progress-two-column">
            <motion.div
              className="progress-section-card weekly-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="progress-section-heading">
                <div>
                  <span className="progress-section-kicker">
                    LITTLE STEPS ADD UP
                  </span>
                  <h2>Your week</h2>
                  <p>Activities recorded each day.</p>
                </div>
                <span className="section-decoration">
                  <Calendar className="w-7 h-7 text-cyan-300" />
                </span>
              </div>

              <div
                className="week-chart"
                aria-label="Activities completed each day"
              >
                {weeklyActivity.map((day) => {
                  const max = Math.max(
                    1,
                    ...weeklyActivity.map((item) => item.count)
                  );
                  const height = day.count
                    ? Math.max(12, (day.count / max) * 100)
                    : 5;

                  return (
                    <div className="week-chart-column" key={day.key}>
                      <span className="week-chart-count">
                        {day.count || ""}
                      </span>
                      <div className="week-chart-track">
                        <motion.div
                          className={`week-chart-bar ${
                            day.count ? "week-chart-bar-active" : ""
                          }`}
                          initial={{ height: 0 }}
                          animate={{ height: `${height}%` }}
                          transition={{ duration: 0.8, ease: "easeOut" }}
                          title={`${day.count} activities; ${formatMinutes(
                            day.seconds
                          )}`}
                        />
                      </div>
                      <span className="week-chart-day">{day.label}</span>
                    </div>
                  );
                })}
              </div>
              <div className="chart-legend">
                <span /> <span>Completed activities</span>
              </div>
            </motion.div>

            <motion.div
              className="progress-section-card support-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
            >
              <div className="progress-section-heading">
                <div>
                  <span className="progress-section-kicker">
                    LEARNING SUPPORT
                  </span>
                  <h2>What helps me learn?</h2>
                  <p>Recorded support use—not a score.</p>
                </div>
                <span className="section-decoration">
                  <Heart className="w-7 h-7 text-pink-300" />
                </span>
              </div>

              <SupportRow
                Icon={Lightbulb}
                label="Hints used"
                value={
                  overview.hints +
                  (preAssessmentSummary?.hintCount ?? 0)
                }
                color="amber"
              />
              <SupportRow
                Icon={Volume2}
                label="Audio support used"
                value={
                  overview.audio +
                  (preAssessmentSummary?.audioCount ?? 0)
                }
                color="cyan"
              />
              <SupportRow
                Icon={ImageIcon}
                label="Visual support used"
                value={
                  overview.visual +
                  (preAssessmentSummary?.visualCount ?? 0)
                }
                color="purple"
              />

              <div className="support-note">
                <Heart className="w-4 h-4 inline mr-1 text-pink-300" />
                Using a hint or support is a learning strategy, not a mistake.
              </div>
            </motion.div>
          </section>

          {/* =====================================================
              SUGGESTIONS
          ===================================================== */}

          <motion.section
            className="progress-section-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="progress-section-heading">
              <div>
                <span className="progress-section-kicker">
                  YOUR NEXT ADVENTURE
                </span>
                <h2>Strengths and practice ideas</h2>
                <p>Suggestions are based on recorded activity accuracy.</p>
              </div>
              <span className="section-decoration">
                <Compass className="w-7 h-7 text-violet-300" />
              </span>
            </div>

            {!hasActivityData ? (
              <div className="progress-empty">
                <span className="progress-empty-icon">
                  <Sparkles className="w-8 h-8 text-emerald-300" />
                </span>
                <div>
                  <strong>Your learning story starts here</strong>
                  <p>
                    Complete a learning activity to see personalized
                    suggestions.
                  </p>
                </div>
              </div>
            ) : (
              <div className="suggestion-grid">
                <div className="suggestion-box suggestion-strength">
                  <span className="suggestion-emoji">
                    <Trophy className="w-9 h-9 text-amber-300" />
                  </span>
                  <h3>Skills to celebrate</h3>
                  {strongestSkills.length ? (
                    strongestSkills.map((skill) => (
                      <div className="suggestion-item" key={skill.id}>
                        <span>
                          {skill.icon} {skill.label}
                        </span>
                        <strong>{skill.recentAccuracy}% recent accuracy</strong>
                      </div>
                    ))
                  ) : (
                    <p>
                      More scored activities will help identify current
                      strengths.
                    </p>
                  )}
                </div>

                <div className="suggestion-box suggestion-practice">
                  <span className="suggestion-emoji">
                    <TrendingUp className="w-9 h-9 text-cyan-300" />
                  </span>
                  <h3>Skills to practise</h3>
                  {practiceSkills.length ? (
                    practiceSkills.map((skill) => (
                      <div className="suggestion-item" key={skill.id}>
                        <span>
                          {skill.icon} {skill.label}
                        </span>
                        <strong>{skill.recentAccuracy}% recent accuracy</strong>
                      </div>
                    ))
                  ) : (
                    <p>Try a few activities to get practice suggestions.</p>
                  )}
                </div>
              </div>
            )}

            <div className="progress-next-step">
              <span className="progress-next-step-icon">
                <Palette className="w-7 h-7 text-pink-300" />
              </span>
              <div>
                <strong>Choose your next activity</strong>
                <p>
                  Try a short activity in a skill you want to explore. Progress
                  is about learning at your own pace.
                </p>
              </div>
              <a href="/phonics" className="progress-next-step-link">
                Explore phonics <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </motion.section>

          {/* =====================================================
              TIMELINE
          ===================================================== */}

          <motion.section
            className="progress-section-card history-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
          >
            <div className="progress-section-heading">
              <div>
                <span className="progress-section-kicker">RECENT ACTIVITY</span>
                <h2>My learning timeline</h2>
                <p>
                  {selectedSkill === "all"
                    ? "Your latest recorded activities."
                    : `Activities for ${
                        SKILLS.find((skill) => skill.id === selectedSkill)?.label
                      }.`}
                </p>
              </div>
              {selectedSkill !== "all" && (
                <button
                  className="clear-skill-filter"
                  onClick={() => setSelectedSkill("all")}
                  type="button"
                >
                  Clear filter ×
                </button>
              )}
            </div>

            {recentActivities.length === 0 ? (
              <div className="progress-empty">
                <span className="progress-empty-icon">
                  <Compass className="w-8 h-8 text-cyan-300" />
                </span>
                <div>
                  <strong>No activities for this view yet</strong>
                  <p>
                    Complete an activity, or choose "All recorded activity" to
                    see older results.
                  </p>
                </div>
              </div>
            ) : (
              <div className="activity-timeline">
                <AnimatePresence>
                  {[...recentActivities]
                    .sort(
                      (a, b) =>
                        new Date(b.completedAt ?? 0).getTime() -
                        new Date(a.completedAt ?? 0).getTime()
                    )
                    .slice(0, 12)
                    .map((activity, index) => {
                      const skill = SKILLS.find(
                        (item) => item.id === normalizeSkill(activity.skill)
                      );
                      const accuracy = getAccuracy(activity);

                      return (
                        <motion.article
                          className="timeline-item"
                          key={
                            activity.id ??
                            `${activity.activityName}-${activity.completedAt}-${index}`
                          }
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.04 }}
                        >
                          <span
                            className={`timeline-icon flex items-center justify-center ${
                              skill
                                ? `bg-gradient-to-br ${skill.gradient} ${skill.glow}`
                                : "bg-gradient-to-br from-purple-500 to-pink-600 shadow-purple-500/40"
                            }`}
                          >
                            {skill ? (
                              <skill.Icon className="w-5 h-5 text-white" />
                            ) : (
                              <Sparkles className="w-5 h-5 text-white" />
                            )}
                          </span>
                          <div className="timeline-main">
                            <strong>
                              {activity.activityName ??
                                skill?.label ??
                                "Learning activity"}
                            </strong>
                            <span>
                              {skill?.label ?? "Learning"} ·{" "}
                              {formatDate(activity.completedAt)}
                            </span>
                          </div>
                          <div className="timeline-result">
                            <strong>
                              {accuracy === null ? "Practised" : `${accuracy}%`}
                            </strong>
                            <span>
                              {formatMinutes(activity.timeSpent ?? 0)}
                            </span>
                          </div>
                        </motion.article>
                      );
                    })}
                </AnimatePresence>
              </div>
            )}
          </motion.section>

          {/* =====================================================
              FOOTER
          ===================================================== */}

          <motion.footer
            className="progress-footer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <span className="progress-footer-icon">
              <Award className="w-6 h-6 text-pink-300" />
            </span>
            <p>
              <strong>Every small step matters.</strong>
              <br />
              Your progress helps you discover how you learn best.
            </p>
          </motion.footer>
        </main>
      </div>
    </div>
  );
}

// =========================================================
// METRIC CARD
// =========================================================

function MetricCard({
  Icon,
  label,
  value,
  detail,
  color,
}: {
  Icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  detail: string;
  color: "purple" | "cyan" | "emerald" | "amber";
}) {
  const colorMap = {
    purple: {
      grad: "from-fuchsia-500 via-purple-500 to-indigo-600",
      glow: "shadow-purple-500/40",
      border: "border-purple-500/40",
    },
    cyan: {
      grad: "from-sky-500 via-cyan-500 to-blue-600",
      glow: "shadow-cyan-500/40",
      border: "border-cyan-500/40",
    },
    emerald: {
      grad: "from-emerald-500 via-teal-500 to-cyan-600",
      glow: "shadow-emerald-500/40",
      border: "border-emerald-500/40",
    },
    amber: {
      grad: "from-amber-500 via-orange-500 to-red-600",
      glow: "shadow-amber-500/40",
      border: "border-amber-500/40",
    },
  };

  const c = colorMap[color];

  return (
    <motion.article
      className={`progress-metric ${c.border}`}
      whileHover={{ y: -6, scale: 1.02 }}
    >
      <span
        className={`metric-icon flex items-center justify-center bg-gradient-to-br ${c.grad} ${c.glow}`}
      >
        <Icon className="w-7 h-7 text-white" />
      </span>
      <span className="metric-label">{label}</span>
      <strong className="metric-value">{value}</strong>
      <span className="metric-detail">{detail}</span>
    </motion.article>
  );
}

// =========================================================
// SUPPORT ROW
// =========================================================

function SupportRow({
  Icon,
  label,
  value,
  color,
}: {
  Icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: number;
  color: "amber" | "cyan" | "purple";
}) {
  const colorMap = {
    amber: "from-amber-400 to-orange-500 shadow-amber-500/40",
    cyan: "from-cyan-400 to-blue-500 shadow-cyan-500/40",
    purple: "from-purple-400 to-fuchsia-500 shadow-purple-500/40",
  };

  return (
    <div className="support-row">
      <span
        className={`support-row-icon flex items-center justify-center bg-gradient-to-br ${colorMap[color]}`}
      >
        <Icon className="w-4 h-4 text-white" />
      </span>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}