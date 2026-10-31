// import type { AgeRange, LearningPreference, SessionLength, SupportCondition } from "@/types";

// export const AVATARS = ["😊", "🦊", "🐼", "🐰", "🦁", "🐸", "🐯"];

// export const AGE_CARDS: { range: AgeRange; emoji: string; title: string; blurb: string }[] = [
//   { range: "5-8", emoji: "🌱", title: "Early Explorer", blurb: "Let's discover the basics." },
//   { range: "9-12", emoji: "🌿", title: "Growing Explorer", blurb: "Let's build new skills." },
//   { range: "13-18", emoji: "🌳", title: "Young Adventurer", blurb: "Let's explore advanced learning." },
// ];

// export const CONDITION_CARDS: { key: SupportCondition; emoji: string; title: string; blurb: string }[] = [
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
//   {
//     key: "DS",
//     emoji: "💙",
//     title: "Down Syndrome (DS)",
//     blurb: "Learning activities can be adapted with clear visuals, repetition, and a steady, encouraging pace.",
//   },
// ];

// export const PREFERENCES: { key: LearningPreference; emoji: string; label: string }[] = [
//   { key: "pictures", emoji: "🎨", label: "Pictures" },
//   { key: "listening", emoji: "🔊", label: "Listening" },
//   { key: "games", emoji: "🎮", label: "Games" },
//   { key: "reading", emoji: "📖", label: "Reading" },
//   { key: "puzzles", emoji: "🧩", label: "Puzzles" },
//   { key: "animations", emoji: "🎬", label: "Animations" },
// ];

// export const SESSION_LENGTHS: { value: SessionLength; emoji: string; label: string }[] = [
//   { value: 5, emoji: "⚡", label: "5 minutes" },
//   { value: 10, emoji: "🌱", label: "10 minutes" },
//   { value: 15, emoji: "🌳", label: "15 minutes" },
// ];

// export const ageLabel: Record<AgeRange, string> = {
//   "5-8": "5–8",
//   "9-12": "9–12",
//   "13-18": "13–18",
// };

// export const conditionLabel: Record<SupportCondition, string> = {
//   ID: "Intellectual Disability (ID)",
//   DS: "Down Syndrome (DS)",
//   ADHD: "ADHD",
//   AUTISM: "Autism",
// };


import type {
  AgeRange,
  Condition,
} from "@/stores/childProfileStore";

export const AVATARS = [
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
];

export const AGE_CARDS: {
  range: AgeRange;
  title: string;
  emoji: string;
  blurb: string;
}[] = [
  {
    range: "5-8",
    title: "Little Explorer",
    emoji: "🌱",
    blurb:
      "Playful activities for early learning and discovery.",
  },

  {
    range: "9-12",
    title: "Curious Adventurer",
    emoji: "🚀",
    blurb:
      "Interactive challenges that build confidence and skills.",
  },

  {
    range: "13-18",
    title: "Growing Champion",
    emoji: "🌟",
    blurb:
      "More independent activities for growing learners.",
  },
];

export const ageLabel: Record<
  AgeRange,
  string
> = {
  "5-8": "5–8 years",
  "9-12": "9–12 years",
  "13-18": "13–18 years",
};

export const CONDITION_CARDS: {
  key: Condition;
  title: string;
  emoji: string;
  blurb: string;
}[] = [
  {
    key: "adhd",
    title: "ADHD Support",
    emoji: "⚡",
    blurb:
      "Activities designed to encourage focus, attention and active learning.",
  },

  {
    key: "intellectual-disability",
    title: "Intellectual Disability Support",
    emoji: "🌈",
    blurb:
      "Simple, structured activities supporting learning and everyday skills.",
  },
{
  key: "Autism",
  title: "Autism Support",
  emoji: "💙",
  blurb:
    "Personalized activities supporting communication, learning, social skills, and confidence.",
},
];

export const conditionLabel: Record<
  Condition,
  string
> = {
  adhd: "ADHD Support",

  "intellectual-disability":
    "Intellectual Disability Support",

  "Autism":
    "Autism Support",
};

export const PREFERENCES = [
  {
    key: "games",
    label: "Games",
    emoji: "🎮",
  },

  {
    key: "stories",
    label: "Stories",
    emoji: "📚",
  },

  {
    key: "music",
    label: "Music",
    emoji: "🎵",
  },

  {
    key: "drawing",
    label: "Drawing",
    emoji: "🎨",
  },

  {
    key: "puzzles",
    label: "Puzzles",
    emoji: "🧩",
  },

  {
    key: "videos",
    label: "Videos",
    emoji: "🎬",
  },

  {
    key: "movement",
    label: "Movement",
    emoji: "🏃",
  },

  {
    key: "animals",
    label: "Animals",
    emoji: "🐶",
  },

  {
    key: "science",
    label: "Science",
    emoji: "🔬",
  },
];

export const SESSION_LENGTHS = [
  {
    value: 5,
    label: "5 min",
    emoji: "🌱",
  },

  {
    value: 10,
    label: "10 min",
    emoji: "🌈",
  },

  {
    value: 20,
    label: "20 min",
    emoji: "🚀",
  },
];