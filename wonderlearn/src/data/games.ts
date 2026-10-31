import { Game } from "../types/game";

export const games: Game[] = [
  {
    id: "math-count-animals-01",
    title: "Count the Animals",
    description: "Count the animals and choose the correct number.",
    domain: "math",
    skill: "counting",
    level: "beginner",
    ageGroups: ["5-8"],
    duration: 3,
    stars: 10,
    emoji: "🐶",

    questions: [
      {
        id: "q1",
        question: "How many dogs do you see?",
        items: ["🐶", "🐶", "🐶"],
        correctAnswer: "3",
        options: ["2", "3", "4"]
      },
      {
        id: "q2",
        question: "How many cats do you see?",
        items: ["🐱", "🐱"],
        correctAnswer: "2",
        options: ["1", "2", "3"]
      },
      {
        id: "q3",
        question: "How many rabbits do you see?",
        items: ["🐰", "🐰", "🐰", "🐰"],
        correctAnswer: "4",
        options: ["3", "4", "5"]
      },
      {
        id: "q4",
        question: "How many elephants do you see?",
        items: ["🐘"],
        correctAnswer: "1",
        options: ["1", "2", "3"]
      }
    ]
  },

  {
    id: "attention-find-red-01",
    title: "Find the Red Object",
    description: "Look carefully and find the red object.",
    domain: "attention",
    skill: "visualAttention",
    level: "beginner",
    ageGroups: ["5-8", "9-12"],
    duration: 2,
    stars: 10,
    emoji: "👀",

    questions: [
      {
        id: "q1",
        question: "Find the RED object.",
        items: ["🍎", "🍌", "🥦"],
        correctAnswer: "🍎",
        options: ["🍎", "🍌", "🥦"]
      },
      {
        id: "q2",
        question: "Find the RED object.",
        items: ["🐟", "🍓", "🌱"],
        correctAnswer: "🍓",
        options: ["🐟", "🍓", "🌱"]
      }
    ]
  },

  {
    id: "memory-disappear-01",
    title: "What Disappeared?",
    description: "Remember the objects and find what disappeared.",
    domain: "memory",
    skill: "visualMemory",
    level: "beginner",
    ageGroups: ["5-8", "9-12"],
    duration: 3,
    stars: 10,
    emoji: "🧠",

    questions: [
      {
        id: "q1",
        question: "What disappeared?",
        items: ["🍎", "🐶", "🚗"],
        correctAnswer: "🐶",
        options: ["🍎", "🐶", "🚗"]
      },
      {
        id: "q2",
        question: "What disappeared?",
        items: ["🐱", "🍌", "⚽"],
        correctAnswer: "⚽",
        options: ["🐱", "🍌", "⚽"]
      }
    ]
  }
];