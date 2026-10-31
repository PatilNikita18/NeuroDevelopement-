import { useCallback, useEffect, useMemo, useReducer, useRef } from "react";
import {
  Difficulty,
  Question,
  SessionConfig,
  generateSession,
  pickNextMultiplier,
  generateQuestion,
} from "@/utils/questionGenerator";

export interface SessionState {
  status: "idle" | "playing" | "paused" | "finished";
  questions: Question[];
  currentIndex: number;
  history: {
    questionId: string;
    multiplier: number;
    correct: boolean;
    timeMs: number;
    userAnswer: number;
  }[];
  score: number;
  streak: number;
  bestStreak: number;
  starsEarned: number;
  startedAt: number | null;
}

type Action =
  | { type: "START"; payload: { questions: Question[] } }
  | { type: "ANSWER"; payload: { answer: number; timeMs: number } }
  | { type: "NEXT" }
  | { type: "PAUSE" }
  | { type: "RESUME" }
  | { type: "RESET" }
  | { type: "PUSH"; payload: { question: Question } };

const initialState: SessionState = {
  status: "idle",
  questions: [],
  currentIndex: 0,
  history: [],
  score: 0,
  streak: 0,
  bestStreak: 0,
  starsEarned: 0,
  startedAt: null,
};

function reducer(state: SessionState, action: Action): SessionState {
  switch (action.type) {
    case "START":
      return {
        ...initialState,
        status: "playing",
        questions: action.payload.questions,
        startedAt: Date.now(),
      };
    case "ANSWER": {
      const q = state.questions[state.currentIndex];
      if (!q) return state;
      const correct = action.payload.answer === q.answer;
      const newStreak = correct ? state.streak + 1 : 0;
      const stars = correct
        ? Math.max(1, Math.min(3, Math.floor(newStreak / 2) + 1))
        : 0;
      return {
        ...state,
        history: [
          ...state.history,
          {
            questionId: q.id,
            multiplier: q.multiplier,
            correct,
            timeMs: action.payload.timeMs,
            userAnswer: action.payload.answer,
          },
        ],
        score: state.score + (correct ? 10 + newStreak * 2 : 0),
        streak: newStreak,
        bestStreak: Math.max(state.bestStreak, newStreak),
        starsEarned: state.starsEarned + stars,
      };
    }
    case "NEXT": {
      const next = state.currentIndex + 1;
      if (next >= state.questions.length) {
        return { ...state, status: "finished" };
      }
      return { ...state, currentIndex: next };
    }
    case "PUSH":
      return { ...state, questions: [...state.questions, action.payload.question] };
    case "PAUSE":
      return { ...state, status: "paused" };
    case "RESUME":
      return { ...state, status: "playing" };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

export function useTimesTables(config: SessionConfig) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const questionStartRef = useRef<number>(Date.now());

  const currentQuestion = state.questions[state.currentIndex] ?? null;
  const progress = state.questions.length
    ? (state.currentIndex / state.questions.length) * 100
    : 0;

  // Restart timer on each question
  useEffect(() => {
    if (state.status === "playing" && currentQuestion) {
      questionStartRef.current = Date.now();
    }
  }, [state.currentIndex, state.status, currentQuestion]);

  const start = useCallback(() => {
    const questions = generateSession(config);
    dispatch({ type: "START", payload: { questions } });
  }, [config]);

  const reset = useCallback(() => dispatch({ type: "RESET" }), []);

  const submitAnswer = useCallback(
    (answer: number) => {
      const timeMs = Date.now() - questionStartRef.current;
      dispatch({ type: "ANSWER", payload: { answer, timeMs } });
    },
    []
  );

  const next = useCallback(() => {
    // Adaptive: if session has more room, generate one targeting weakness
    if (
      state.status === "playing" &&
      config.difficulty !== "easy" &&
      state.history.length >= 5 &&
      state.currentIndex >= state.questions.length - 1
    ) {
      const nextMult = pickNextMultiplier(
        state.history,
        Array.from({ length: 12 }, (_, i) => i + 1)
      );
      const q = generateQuestion(
        config.table,
        nextMult,
        "direct",
        config.allowMultipleChoice
      );
      dispatch({ type: "PUSH", payload: { question: q } });
    }
    dispatch({ type: "NEXT" });
  }, [state, config]);

  const lastAnswerCorrect = useMemo(() => {
    const last = state.history[state.history.length - 1];
    return last ? last.correct : null;
  }, [state.history]);

  const accuracy = useMemo(() => {
    if (!state.history.length) return 0;
    const correct = state.history.filter((h) => h.correct).length;
    return Math.round((correct / state.history.length) * 100);
  }, [state.history]);

  return {
    state,
    currentQuestion,
    progress,
    accuracy,
    lastAnswerCorrect,
    start,
    reset,
    submitAnswer,
    next,
  };
}