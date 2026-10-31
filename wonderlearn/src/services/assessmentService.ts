// import type {
//   AssessmentResult,
// } from "../types/assessment";

// const API_URL =
//   "http://localhost:5000/api";

// export const saveAssessmentResult =
//   async (
//     clerkId: string,
//     result: AssessmentResult
//   ) => {
//     const response =
//       await fetch(
//         `${API_URL}/assessment/results`,
//         {
//           method: "POST",

//           headers: {
//             "Content-Type":
//               "application/json",
//           },

//           body: JSON.stringify({
//             clerkId,

//             scores:
//               result.scores,

//             activities:
//               result.activities,

//             completedAt:
//               result.completedAt,
//           }),
//         }
//       );

//     const data =
//       await response.json();

//     if (!response.ok) {
//       throw new Error(
//         data.message ||
//           "Failed to save assessment"
//       );
//     }

//     return data;
//   };



// src/services/assessmentService.ts
// Same as before, plus an optional Clerk token so the API can verify who is calling.
// import type { AssessmentResult } from "../types/assessment";

// const API_URL: string = import.meta.env.VITE_API_URL ?? "http://localhost:5000/api";

// export const saveAssessmentResult = async (
//   clerkId: string,
//   result: AssessmentResult,
//   token?: string
// ) => {
//   const response = await fetch(`${API_URL}/assessment/results`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       ...(token ? { Authorization: `Bearer ${token}` } : {}),
//     },
//     body: JSON.stringify({
//       clerkId,
//       scores: result.scores,
//       activities: result.activities,
//       completedAt: result.completedAt,
//     }),
//   });

//   const data = await response.json();
//   if (!response.ok) throw new Error(data.message || "Failed to save assessment");
//   return data;
// };



// assessmentService.ts
// import type { AssessmentResult } from "../types/assessment";

// const rawBaseUrl: string = import.meta.env.VITE_API_URL ?? "http://localhost:5000/api";

// // Normalize: strip trailing slash, ensure it ends in /api
// const normalizeApiUrl = (url: string): string => {
//   const trimmed = url.replace(/\/+$/, "");
//   return trimmed.endsWith("/api") ? trimmed : `${trimmed}/api`;
// };

// const API_URL: string = normalizeApiUrl(rawBaseUrl);

// export const saveAssessmentResult = async (
//   clerkId: string,
//   result: AssessmentResult,
//   token?: string
// ) => {
//   const url = `${API_URL}/assessment/results`;

//   console.log("📤 Saving assessment to:", url);

//   const response = await fetch(url, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       ...(token ? { Authorization: `Bearer ${token}` } : {}),
//     },
//     body: JSON.stringify({
//       clerkId,
//       scores: result.scores,
//       activities: result.activities,
//       completedAt: result.completedAt,
//     }),
//   });

//   const data = await response.json();

//   console.log("📥 Assessment API response:", data);

//   if (!response.ok) {
//     throw new Error(data.message || "Failed to save assessment");
//   }

//   return data;
// };



// src/services/assessmentService.ts
import type { AssessmentResult } from "../types/assessment";

const rawBaseUrl: string =
  import.meta.env.VITE_API_URL ?? "http://localhost:5000/api";

// Normalize: strip trailing slash, ensure it ends in /api
const normalizeApiUrl = (url: string): string => {
  const trimmed = url.replace(/\/+$/, "");
  return trimmed.endsWith("/api") ? trimmed : `${trimmed}/api`;
};

const API_URL: string = normalizeApiUrl(rawBaseUrl);

export const saveAssessmentResult = async (
  clerkId: string,
  result: AssessmentResult,
  token?: string
) => {
  const url = `${API_URL}/assessment/results`;

  console.log("📤 Saving assessment to:", url);

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({
      clerkId,
      scores: result.scores,
      activities: result.activities,
      completedAt: result.completedAt,
    }),
  });

  // Don't crash if the server returns something that isn't JSON
  const data = await response.json().catch(() => ({}));

  console.log("📥 Assessment API response:", data);

  if (!response.ok) {
    throw new Error(
      data.message || `Failed to save assessment (HTTP ${response.status})`
    );
  }

  return data;
};