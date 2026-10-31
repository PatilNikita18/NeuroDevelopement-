
import type { AssessmentQuestion } from "../types/assessment";

export const preAssessmentQuestions: AssessmentQuestion[] = [
  // 1. ATTENTION
  {
    id: "attention_1",
    skill: "attention",
    type: "single",
    title: "Help the Bunny Find a Star!",
    instruction: "Tap the star.",
    emojiHint: "🐰",
    audioText: "Help the bunny find a star. Tap the star!",
    visual: "🐰 🔍",
    options: ["🔵", "⭐", "🟢"],
    answer: "⭐",
  },

  // 2. MEMORY
  {
    id: "memory_1",
    skill: "memory",
    type: "memory",
    title: "Remember the Pictures!",
    instruction: "Look carefully and remember these pictures.",
    emojiHint: "🧠",
    audioText: "Look carefully. Remember the pictures!",
    memoryItems: ["🐶", "🍎", "⭐"],
    options: [
      "🐶 🍎 ⭐",
      "🐱 🍎 🚗",
      "⭐ 🐶 🍌",
    ],
    answer: "🐶 🍎 ⭐",
  },

  // 3. MATH
  {
    id: "math_1",
    skill: "math",
    type: "single",
    title: "Help the Monkey Count!",
    instruction: "How many apples can you see?",
    emojiHint: "🐵",
    audioText: "Help the monkey count the apples!",
    visual: "🍎 🍎 🍎 🍎",
    options: ["3", "4", "5"],
    answer: "4",
  },

  // 4. READING
  {
    id: "reading_1",
    skill: "reading",
    type: "single",
    title: "What Is This Animal?",
    instruction: "Choose the word that matches the picture.",
    emojiHint: "🐶",
    audioText: "Look at the dog. Which word matches?",
    visual: "🐶",
    options: ["Cat", "Dog", "Fish"],
    answer: "Dog",
  },

  // 5. PROBLEM SOLVING
  {
    id: "problem_1",
    skill: "problemSolving",
    type: "single",
    title: "Complete the Pattern!",
    instruction: "Which color comes next?",
    emojiHint: "🧩",
    audioText: "Look at the pattern. Which color comes next?",
    visual: "🔴 🔵 🔴 🔵 ❓",
    options: ["🔴", "🟢", "🔵"],
    answer: "🔴",
  },

  // 6. COMMUNICATION
  {
    id: "communication_1",
    skill: "communication",
    type: "single",
    title: "The Bunny Needs Help!",
    instruction: "What can you say when you need help?",
    emojiHint: "🐰",
    audioText: "The bunny needs help. What can you say?",
    visual: "🐰 🙋",
    options: ["Help please", "Good night", "Goodbye"],
    answer: "Help please",
  },
];
