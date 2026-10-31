// profile.tsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, User, Loader2, AlertCircle } from "lucide-react";
import { useUser } from "@clerk/react";
import { CloudBackground } from "@/components/backgrounds/CloudBackground";
import { cn } from "@/lib/cn";

// =========================================================
// TYPES
// =========================================================

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

type ProfileResponse = {
  _id: string;
  clerkId: string;
  name: string;
  nickname?: string;
  email: string;
  avatar: string;
  age: AgeGroup;
  support: SupportType;
  preferences: LearningPreference[];
  sessionLength: number;
  createdAt: string;
  updatedAt: string;
};

// =========================================================
// PROFILE PAGE
// =========================================================

export default function Profile() {
  const { user, isLoaded } = useUser();

  const [profile, setProfile] =
    useState<ProfileResponse | null>(null);

  const [isLoading, setIsLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  // -------------------------------------------------------
  // FETCH PROFILE FROM MONGODB
  // -------------------------------------------------------

  useEffect(() => {
    if (!isLoaded) return;

    if (!user?.id) {
      setError(
        "You must be signed in to view your profile."
      );
      setIsLoading(false);
      return;
    }

    const fetchProfile = async () => {
      try {
        setIsLoading(true);
        setError("");

        const response = await fetch(
          `http://localhost:5000/api/users/profile/${user.id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 404) {
          setError(
            "No profile found. Please create your profile first."
          );
          setIsLoading(false);
          return;
        }

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to load profile."
          );
        }

        const profileData =
          data.user || data.profile || data;

        setProfile(profileData);
      } catch (err) {
        console.error(
          "❌ Failed to fetch profile:",
          err
        );

        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError(
            "Couldn't load your profile. Please try again."
          );
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [isLoaded, user?.id]);

  // -------------------------------------------------------
  // LOADING STATE
  // -------------------------------------------------------

  if (!isLoaded || isLoading) {
    return (
      <CloudBackground>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center text-white">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "linear",
              }}
              className="flex justify-center mb-4"
            >
              <Loader2 className="w-12 h-12" />
            </motion.div>
            <p className="text-purple-100">
              Loading your profile...
            </p>
          </div>
        </div>
      </CloudBackground>
    );
  }

  // -------------------------------------------------------
  // RENDER
  // -------------------------------------------------------

  return (
    <CloudBackground>
      <div className="min-h-screen w-full px-4 md:px-8 py-6 md:py-10">
        <div className="max-w-5xl mx-auto space-y-6">

          {/* =============================================
              HEADER
          ============================================= */}

          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3"
          >
            <Link to="/dashboard">
              <button className="p-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-lg hover:bg-white/20 transition">
                <ArrowLeft className="w-5 h-5 text-white" />
              </button>
            </Link>

            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-2">
                <User className="w-6 h-6 md:w-7 md:h-7 text-purple-200" />
                My Profile
              </h1>
              <p className="text-purple-100 text-sm mt-0.5">
                Your personalized learning identity
              </p>
            </div>
          </motion.div>

          {/* =============================================
              ERROR STATE
          ============================================= */}

          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                "rounded-2xl p-5",
                "bg-red-500/20 border border-red-400/40",
                "backdrop-blur-md",
                "flex items-start gap-3"
              )}
            >
              <AlertCircle className="w-5 h-5 text-red-200 shrink-0 mt-0.5" />

              <div className="flex-1">
                <p className="text-sm font-semibold text-red-100">
                  {error}
                </p>

                <Link
                  to="/user-profile"
                  className="text-xs font-semibold text-red-100 underline mt-2 inline-block"
                >
                  Create your profile →
                </Link>
              </div>
            </motion.div>
          )}

          {/* =============================================
              PROFILE CONTENT
          ============================================= */}

          {profile && (
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

              {/* =========================================
                  LEFT COLUMN — HERO IDENTITY
              ========================================= */}

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 }}
                className="lg:col-span-2"
              >
                <div
                  className={cn(
                    "relative overflow-hidden rounded-3xl p-8 h-full",
                    "bg-gradient-to-br from-purple-600/40 via-pink-500/30 to-orange-400/30",
                    "backdrop-blur-xl",
                    "border border-white/20",
                    "shadow-2xl"
                  )}
                >
                  {/* decorative blobs */}
                  <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/10 blur-2xl" />
                  <div className="absolute -bottom-16 -left-10 w-44 h-44 rounded-full bg-white/10 blur-2xl" />

                  <div className="relative z-10 flex flex-col items-center text-center">

                    <div
                      className={cn(
                        "flex h-32 w-32 items-center justify-center rounded-full",
                        "bg-white/20 backdrop-blur-md",
                        "text-6xl shadow-lg",
                        "ring-4 ring-white/30"
                      )}
                    >
                      {profile.avatar}
                    </div>

                    <h2 className="mt-5 text-2xl font-bold text-white">
                      {profile.nickname || profile.name}
                    </h2>

                    {profile.nickname &&
                      profile.name !== profile.nickname && (
                        <p className="text-purple-100 text-sm mt-1">
                          ({profile.name})
                        </p>
                      )}

                    <div className="flex flex-wrap items-center justify-center gap-2 mt-5">
                      <span
                        className={cn(
                          "rounded-full px-4 py-1.5",
                          "bg-white/20 backdrop-blur-sm",
                          "text-xs font-semibold text-white",
                          "border border-white/20"
                        )}
                      >
                        🎂 {profile.age} years
                      </span>

                      <span
                        className={cn(
                          "rounded-full px-4 py-1.5",
                          "bg-white/20 backdrop-blur-sm",
                          "text-xs font-semibold text-white",
                          "border border-white/20"
                        )}
                      >
                        💙 {profile.support}
                      </span>
                    </div>

                    {/* Divider */}
                    <div className="w-full h-px bg-white/20 my-6" />

                    {/* Email inline */}
                    <div className="w-full text-left">
                      <p className="text-[11px] uppercase tracking-wider text-purple-200 font-semibold">
                        Email
                      </p>
                      <p className="text-sm font-semibold text-white mt-1 truncate">
                        {profile.email}
                      </p>
                    </div>

                  </div>
                </div>
              </motion.div>

              {/* =========================================
                  RIGHT COLUMN — DETAILS
              ========================================= */}

              <div className="lg:col-span-3 space-y-6">

                {/* ---------------------------------------
                    LEARNING PROFILE
                --------------------------------------- */}

                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <div
                    className={cn(
                      "rounded-3xl p-6",
                      "bg-gradient-to-br from-indigo-600/30 via-purple-600/25 to-pink-500/25",
                      "backdrop-blur-xl",
                      "border border-white/20",
                      "shadow-xl"
                    )}
                  >
                    <h3 className="text-white font-bold text-lg flex items-center gap-2 mb-5">
                      🎓 Learning Profile
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <StatBlock
                        label="Age Group"
                        value={`${profile.age}`}
                        suffix="years"
                      />
                      <StatBlock
                        label="Support"
                        value={profile.support}
                      />
                      <StatBlock
                        label="Session"
                        value={`${profile.sessionLength}`}
                        suffix="min"
                      />
                    </div>
                  </div>
                </motion.div>

                {/* ---------------------------------------
                    BASIC INFO
                --------------------------------------- */}

                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                >
                  <div
                    className={cn(
                      "rounded-3xl p-6",
                      "bg-gradient-to-br from-cyan-500/20 via-blue-500/20 to-indigo-500/25",
                      "backdrop-blur-xl",
                      "border border-white/20",
                      "shadow-xl"
                    )}
                  >
                    <h3 className="text-white font-bold text-lg flex items-center gap-2 mb-5">
                      📋 Basic Info
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <InfoRow
                        label="Name"
                        value={profile.name}
                      />
                      <InfoRow
                        label="Nickname"
                        value={profile.nickname || "—"}
                      />
                    </div>
                  </div>
                </motion.div>

                {/* ---------------------------------------
                    PREFERENCES
                --------------------------------------- */}

                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div
                    className={cn(
                      "rounded-3xl p-6",
                      "bg-gradient-to-br from-pink-500/25 via-rose-500/20 to-orange-400/25",
                      "backdrop-blur-xl",
                      "border border-white/20",
                      "shadow-xl"
                    )}
                  >
                    <h3 className="text-white font-bold text-lg flex items-center gap-2 mb-5">
                      ❤️ Learning Preferences
                    </h3>

                    {profile.preferences &&
                    profile.preferences.length > 0 ? (
                      <div className="flex flex-wrap gap-2.5">
                        {profile.preferences.map((p) => (
                          <span
                            key={p}
                            className={cn(
                              "rounded-full px-4 py-2 text-sm font-semibold",
                              "bg-white/20 backdrop-blur-sm",
                              "text-white",
                              "border border-white/25",
                              "hover:bg-white/30 transition"
                            )}
                          >
                            {p}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-purple-100 italic">
                        No preferences selected yet.
                      </p>
                    )}
                  </div>
                </motion.div>

              </div>
            </div>
          )}
        </div>
      </div>
    </CloudBackground>
  );
}

// =========================================================
// INFO ROW
// =========================================================

function InfoRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl px-4 py-3.5",
        "bg-white/10 backdrop-blur-sm",
        "border border-white/15"
      )}
    >
      <p className="text-[11px] uppercase tracking-wider text-purple-200 font-semibold">
        {label}
      </p>
      <p className="text-sm font-bold text-white mt-1 truncate">
        {value}
      </p>
    </div>
  );
}

// =========================================================
// STAT BLOCK
// =========================================================

function StatBlock({
  label,
  value,
  suffix,
}: {
  label: string;
  value: string;
  suffix?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl px-4 py-5 text-center",
        "bg-white/10 backdrop-blur-sm",
        "border border-white/15"
      )}
    >
      <p className="text-[11px] uppercase tracking-wider text-purple-200 font-semibold mb-2">
        {label}
      </p>
      <p className="text-white font-bold text-lg leading-tight">
        {value}
        {suffix && (
          <span className="text-xs font-medium text-purple-100 ml-1">
            {suffix}
          </span>
        )}
      </p>
    </div>
  );
}