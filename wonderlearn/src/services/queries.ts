// TanStack Query hooks. These wrap the mock data / aiService calls today
// and are the seam where real REST calls to Express + Mongo will land.

import { useQuery } from "@tanstack/react-query";
import {
  achievements as mockAchievements,
  activities as mockActivities,
  learningWorlds as mockWorlds,
  progressSnapshot as mockProgress,
} from "@/lib/mockData";
import { getLearningRecommendation } from "./aiService";

const delay = (ms = 300) => new Promise((res) => setTimeout(res, ms));

export function useActivities(worldKey?: string) {
  return useQuery({
    queryKey: ["activities", worldKey ?? "all"],
    queryFn: async () => {
      await delay();
      return worldKey
        ? mockActivities.filter((a) => a.worldKey === worldKey)
        : mockActivities;
    },
  });
}

export function useLearningWorlds() {
  return useQuery({
    queryKey: ["learning-worlds"],
    queryFn: async () => {
      await delay();
      return mockWorlds;
    },
  });
}

export function useProgress() {
  return useQuery({
    queryKey: ["progress"],
    queryFn: async () => {
      await delay();
      return mockProgress;
    },
  });
}

export function useAchievements() {
  return useQuery({
    queryKey: ["achievements"],
    queryFn: async () => {
      await delay();
      return mockAchievements;
    },
  });
}

export function useRecommendation() {
  return useQuery({
    queryKey: ["ai-recommendation"],
    queryFn: getLearningRecommendation,
  });
}
