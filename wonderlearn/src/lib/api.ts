// const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// type GetToken = () => Promise<string | null>;

// interface ChildProfilePayload {
//   child: {
//     name: string;
//     nickname?: string;
//     avatar?: string;
//     ageRange?: "5-8" | "9-12" | "13-18";
//     condition?: "ID" | "AUTISM" | "ADHD" ;
//   };
//   preferences: string[];
//   sessionDuration: number;
// }

// async function authedRequest(path: string, getToken: GetToken, options: RequestInit = {}) {
//   const token = await getToken();

//   return fetch(`${API_BASE_URL}${path}`, {
//     ...options,
//     headers: {
//       "Content-Type": "application/json",
//       ...(token ? { Authorization: `Bearer ${token}` } : {}),
//       ...(options.headers || {}),
//     },
//   });
// }

// // Creates the profile the first time it's called, updates it on later calls
// // (the backend upserts on clerkUserId).
// export async function saveUserProfile(getToken: GetToken, payload: ChildProfilePayload) {
//   const res = await authedRequest("/api/users/profile", getToken, {
//     method: "POST",
//     body: JSON.stringify(payload),
//   });

//   const data = await res.json().catch(() => ({}));

//   if (!res.ok) {
//     throw new Error(data.message || "Failed to save profile.");
//   }

//   return data;
// }

// // Returns the saved profile, or null if this Clerk user has no MongoDB
// // profile yet — used to decide between /onboarding and /dashboard.
// export async function fetchUserProfile(getToken: GetToken) {
//   const res = await authedRequest("/api/users/profile", getToken, { method: "GET" });

//   if (res.status === 404) return null;

//   const data = await res.json().catch(() => ({}));

//   if (!res.ok) {
//     throw new Error(data.message || "Failed to fetch profile.");
//   }

//   return data.user;
// }


// const API_URL =
//   import.meta.env.VITE_API_URL ||
//   "http://localhost:5000/api";

// export interface SaveUserProfilePayload {
//   child: {
//     name: string;
//     nickname?: string;
//     avatar: string;
//     ageRange: string;
//     condition: string;
//   };

//   preferences: string[];

//   sessionDuration: number;
// }

// export async function saveUserProfile(
//   getToken: () => Promise<string | null>,
//   data: SaveUserProfilePayload
// ) {
//   const token = await getToken();

//   if (!token) {
//     throw new Error(
//       "Authentication token not available."
//     );
//   }

//   const response = await fetch(
//     `${API_URL}/users/profile`,
//     {
//       method: "POST",

//       headers: {
//         "Content-Type": "application/json",

//         Authorization: `Bearer ${token}`,
//       },

//       body: JSON.stringify(data),
//     }
//   );

//   const result = await response
//     .json()
//     .catch(() => null);

//   if (!response.ok) {
//     throw new Error(
//       result?.message ||
//         "Failed to save user profile."
//     );
//   }

//   return result;
// }

// type GetToken = () => Promise<string | null>;

// interface ChildProfile {
//   name: string;
//   nickname?: string;
//   avatar?: string;
//   ageRange?: string;
//   condition?: string;
// }

// interface UserProfileData {
//   clerkId: string;
//   email: string;
//   child: ChildProfile;
//   preferences: string[];
//   sessionDuration: number;
// }

// export async function saveUserProfile(
//   getToken: GetToken,
//   data: UserProfileData
// ) {
//   const token = await getToken();

//   if (!token) {
//     throw new Error(
//       "Authentication token is missing."
//     );
//   }

//   const response = await fetch(
//     "http://localhost:5000/api/users",
//     {
//       method: "POST",

//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },

//       body: JSON.stringify({
//         clerkId: data.clerkId,

//         name: data.child.name,

//         email: data.email,

//         nickname:
//           data.child.nickname || "",

//         avatar:
//           data.child.avatar || "😊",

//         ageRange:
//           data.child.ageRange || "",

//         condition:
//           data.child.condition || "",

//         preferences:
//           data.preferences || [],

//         sessionDuration:
//           data.sessionDuration || 10,
//       }),
//     }
//   );

//   const result = await response.json();

//   console.log(
//     "📥 Backend response:",
//     result
//   );

//   if (!response.ok) {
//     throw new Error(
//       result?.message ||
//         "Failed to save user profile."
//     );
//   }

//   return result;
// }

// Final -and working

// const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// type GetToken = () => Promise<string | null>;

// interface SaveUserPayload {
//   clerkId: string;
//   email: string;
//   name: string;
//   nickname?: string;
//   avatar?: string;
//   ageRange?: string;
//   condition?: string;
//   preferences?: string[];
//   sessionDuration?: number;
// }

// async function authedRequest(path: string, getToken: GetToken, options: RequestInit = {}) {
//   const token = await getToken();

//   return fetch(`${API_BASE_URL}${path}`, {
//     ...options,
//     headers: {
//       "Content-Type": "application/json",
//       ...(token ? { Authorization: `Bearer ${token}` } : {}),
//       ...(options.headers || {}),
//     },
//   });
// }

// // Matches userController.ts's createUser exactly: POST /api/users/register
// // with a flat body. Returns the existing user (200) if this clerkId was
// // already saved, or the new one (201) — either way, safe to call again.
// export async function saveUserProfile(getToken: GetToken, payload: SaveUserPayload) {
//   const res = await authedRequest("/api/users/register", getToken, {
//     method: "POST",
//     body: JSON.stringify(payload),
//   });

//   const data = await res.json().catch(() => ({}));

//   if (!res.ok) {
//     throw new Error(data.message || "Failed to save profile.");
//   }

//   return data.user;
// }

// // Looks a user up by their Clerk ID. Returns null on 404 so ProfileGate can
// // send brand-new users (especially Google sign-ups) to /onboarding.
// export async function fetchUserProfile(getToken: GetToken, clerkId: string) {
//   const res = await authedRequest(`/api/users/clerk/${clerkId}`, getToken, { method: "GET" });

//   if (res.status === 404) return null;

//   const data = await res.json().catch(() => ({}));

//   if (!res.ok) {
//     throw new Error(data.message || "Failed to fetch profile.");
//   }

//   return data.user;
// }


//this is tryal 
// const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// type GetToken = () => Promise<string | null>;

// interface SaveUserPayload {
//   clerkId: string;
//   email: string;
//   name: string;
//   nickname?: string;
//   avatar?: string;
//   ageRange?: string;
//   condition?: string;
//   preferences?: string[];
//   sessionDuration?: number;
// }

// async function authedRequest(path: string, getToken: GetToken, options: RequestInit = {}) {
//   const token = await getToken();

//   const url = `${API_BASE_URL}${path}`;
//   console.log(`➡️ ${options.method || "GET"} ${url}`);

//   const res = await fetch(url, {
//     ...options,
//     headers: {
//       "Content-Type": "application/json",
//       ...(token ? { Authorization: `Bearer ${token}` } : {}),
//       ...(options.headers || {}),
//     },
//   });

//   console.log(`⬅️ ${res.status} ${url}`);
//   return res;
// }

// export async function saveUserProfile(getToken: GetToken, payload: SaveUserPayload) {
//   const res = await authedRequest("/api/users/register", getToken, {
//     method: "POST",
//     body: JSON.stringify(payload),
//   });

//   const data = await res.json().catch(() => ({}));

//   if (!res.ok) {
//     console.error("❌ saveUserProfile failed:", res.status, data);
//     throw new Error(data.message || `Failed to save profile (status ${res.status}).`);
//   }

//   return data.user;
// }

// export async function fetchUserProfile(getToken: GetToken, clerkId: string) {
//   const res = await authedRequest(`/api/users/clerk/${clerkId}`, getToken, { method: "GET" });

//   if (res.status === 404) return null;

//   const data = await res.json().catch(() => ({}));

//   if (!res.ok) {
//     console.error("❌ fetchUserProfile failed:", res.status, data);
//     throw new Error(data.message || `Failed to fetch profile (status ${res.status}).`);
//   }

//   return data.user;
// }



// const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// export interface UserProfilePayload {
//   clerkId: string;
//   email: string;
//   name: string;
//   nickname?: string;
//   avatar?: string;
//   ageRange?: string;
//   condition?: string;
//   preferences?: string[];
//   sessionDuration?: number;
// }

// type GetToken = () => Promise<string | null>;

// async function authHeaders(getToken: GetToken) {
//   const token = await getToken();
//   return {
//     "Content-Type": "application/json",
//     ...(token ? { Authorization: `Bearer ${token}` } : {}),
//   };
// }

// // Called from Register.tsx's persistProfile() once signUp.finalize()
// // (or verifyCode()) succeeds — this is the write that actually lands the
// // document in the "Enduser" collection.
// export async function saveUserProfile(getToken: GetToken, payload: UserProfilePayload) {
//   const res = await fetch(`${API_URL}/api/users`, {
//     method: "POST",
//     headers: await authHeaders(getToken),
//     body: JSON.stringify(payload),
//   });

//   const data = await res.json();

//   if (!res.ok || !data.success) {
//     throw new Error(data.message || "Failed to save user profile");
//   }

//   return data.user;
// }

// // Called from SSOCallback.tsx to decide whether a signed-in Clerk user
// // already has a MongoDB profile (→ dashboard) or not (→ onboarding).
// export async function fetchUserProfile(getToken: GetToken, clerkId: string) {
//   const res = await fetch(`${API_URL}/api/users/clerk/${clerkId}`, {
//     method: "GET",
//     headers: await authHeaders(getToken),
//   });

//   if (res.status === 404) {
//     return null;
//   }

//   const data = await res.json();

//   if (!res.ok || !data.success) {
//     throw new Error(data.message || "Failed to fetch user profile");
//   }

//   return data.user;
// }




// const API_URL =
//   import.meta.env.VITE_API_URL || "http://localhost:5000";

// export interface UserProfilePayload {
//   clerkId: string;
//   email: string;
//   name: string;
//   nickname?: string;
//   avatar?: string;
//   age?: string;
//   support?: string;
//   preferences?: string[];
//   sessionLength?: number;
// }

// type GetToken = () => Promise<string | null>;

// async function authHeaders(getToken: GetToken) {
//   const token = await getToken();

//   return {
//     "Content-Type": "application/json",
//     ...(token
//       ? {
//           Authorization: `Bearer ${token}`,
//         }
//       : {}),
//   };
// }

// // =========================================================
// // SAVE USER PROFILE
// // =========================================================

// export async function saveUserProfile(
//   getToken: GetToken,
//   payload: UserProfilePayload
// ) {
//   const res = await fetch(
//     `${API_URL}/api/users/profile`,
//     {
//       method: "POST",
//       headers: await authHeaders(getToken),
//       body: JSON.stringify(payload),
//     }
//   );

//   let data: any = {};

//   try {
//     data = await res.json();
//   } catch {
//     throw new Error(
//       `Server returned an invalid response (${res.status})`
//     );
//   }

//   if (!res.ok) {
//     throw new Error(
//       data?.message ||
//         `Failed to save user profile (${res.status})`
//     );
//   }

//   if (data.success === false) {
//     throw new Error(
//       data?.message ||
//         "Failed to save user profile"
//     );
//   }

//   return data.user ?? data.data ?? data;
// }

// // =========================================================
// // FETCH USER PROFILE
// // =========================================================

// export async function fetchUserProfile(
//   getToken: GetToken,
//   clerkId: string
// ) {
//   if (!clerkId) {
//     throw new Error(
//       "Clerk ID is required to fetch user profile"
//     );
//   }

//   const res = await fetch(
//     `${API_URL}/api/users/clerk/${encodeURIComponent(
//       clerkId
//     )}`,
//     {
//       method: "GET",
//       headers: await authHeaders(getToken),
//     }
//   );

//   // Profile doesn't exist
//   if (res.status === 404) {
//     return null;
//   }

//   let data: any = {};

//   try {
//     data = await res.json();
//   } catch {
//     throw new Error(
//       `Server returned an invalid response (${res.status})`
//     );
//   }

//   if (!res.ok) {
//     throw new Error(
//       data?.message ||
//         `Failed to fetch user profile (${res.status})`
//     );
//   }

//   if (data.success === false) {
//     throw new Error(
//       data?.message ||
//         "Failed to fetch user profile"
//     );
//   }

//   return data.user ?? data.data ?? data;
// }

// // =========================================================
// // CHECK PROFILE EXISTS
// // =========================================================

// export async function hasUserProfile(
//   getToken: GetToken,
//   clerkId: string
// ): Promise<boolean> {
//   const profile = await fetchUserProfile(
//     getToken,
//     clerkId
//   );

//   return Boolean(profile);
// }






//next updated 

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

// =========================================================
// USER PROFILE TYPE
// =========================================================

export interface UserProfilePayload {
  clerkId: string;
  email: string;
  name: string;
  nickname?: string;
  avatar?: string;
  age?: string;
  support?: string;
  preferences?: string[];
  sessionLength?: number;
}

// =========================================================
// TOKEN TYPE
// =========================================================

type GetToken = () => Promise<string | null>;

// =========================================================
// AUTH HEADERS
// =========================================================

async function authHeaders(getToken: GetToken) {
  const token = await getToken();

  return {
    "Content-Type": "application/json",

    ...(token
      ? {
          Authorization: `Bearer ${token}`,
        }
      : {}),
  };
}

// =========================================================
// SAVE USER PROFILE
// =========================================================

export async function saveUserProfile(
  getToken: GetToken,
  payload: UserProfilePayload
) {
  const res = await fetch(
    `${API_URL}/api/users/profile`,
    {
      method: "POST",
      headers: await authHeaders(getToken),
      body: JSON.stringify(payload),
    }
  );

  let data: any = {};

  try {
    data = await res.json();
  } catch {
    throw new Error(
      `Invalid server response (${res.status})`
    );
  }

  if (!res.ok || data.success === false) {
    throw new Error(
      data?.message ||
        "Failed to save user profile"
    );
  }

  // Backend returns "profile"
  return data.profile;
}

// =========================================================
// FETCH USER PROFILE
// =========================================================

export async function fetchUserProfile(
  getToken: GetToken,
  clerkId: string
) {
  if (!clerkId) {
    throw new Error(
      "Clerk ID is required"
    );
  }

  // IMPORTANT:
  // Backend route is:
  // GET /api/users/profile/:clerkId

  const res = await fetch(
    `${API_URL}/api/users/profile/${encodeURIComponent(
      clerkId
    )}`,
    {
      method: "GET",
      headers: await authHeaders(getToken),
    }
  );

  // Profile doesn't exist
  if (res.status === 404) {
    return null;
  }

  let data: any = {};

  try {
    data = await res.json();
  } catch {
    throw new Error(
      `Invalid server response (${res.status})`
    );
  }

  if (!res.ok || data.success === false) {
    throw new Error(
      data?.message ||
        "Failed to fetch user profile"
    );
  }

  // Backend returns "profile"
  return data.profile;
}

// =========================================================
// CHECK PROFILE
// =========================================================

export async function hasUserProfile(
  getToken: GetToken,
  clerkId: string
): Promise<boolean> {
  const profile =
    await fetchUserProfile(
      getToken,
      clerkId
    );

  return Boolean(profile);
}

