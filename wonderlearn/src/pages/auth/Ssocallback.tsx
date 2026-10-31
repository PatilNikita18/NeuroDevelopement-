// import { AuthenticateWithRedirectCallback } from "@clerk/react";

// // Landing spot for the Google OAuth redirect started from Register.tsx's
// // "Continue with Google" button. Clerk finishes the sign-in/sign-up here,
// // then sends the browser on to /dashboard, where ProfileGate decides
// // whether this is a brand new user (-> /onboarding) or a returning one.
// export default function SSOCallback() {
//   return (
//     <AuthenticateWithRedirectCallback
//       signInFallbackRedirectUrl="/dashboard"
//       signUpFallbackRedirectUrl="/dashboard"
//     />
//   );
// }


// import { useEffect, useRef, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useSignIn, useSignUp, useAuth } from "@clerk/react";
// import { CloudBackground } from "@/components/backgrounds/CloudBackground";
// import { fetchUserProfile } from "@/lib/api";

// // Landing spot for the Google OAuth redirect — reached either from
// // Login.tsx's prebuilt <SignIn> (returning user) or Register.tsx's custom
// // "Continue with Google" button (new user). Finishes whichever Clerk flow
// // was in progress, then checks MongoDB by clerkId to decide where to send
// // the browser next, per the diagram:
// //   Clerk Authentication -> Check user in DATABASE -> route
// export default function SSOCallback() {
//   const { signIn } = useSignIn();
//   const { signUp } = useSignUp();
//   const { userId, getToken } = useAuth();
//   const navigate = useNavigate();
//   const handled = useRef(false);
//   const [errorMsg, setErrorMsg] = useState("");

//   useEffect(() => {
//     async function complete() {
//       if (handled.current) return;

//       const routeByProfile = async () => {
//         if (!userId) {
//           setErrorMsg("Something went wrong finishing sign-in. Please try again.");
//           return;
//         }

//         try {
//           const profile = await fetchUserProfile(getToken, userId);
//           navigate(profile ? "/dashboard" : "/onboarding", { replace: true });
//         } catch (err) {
//           console.error("Profile check failed:", err);
//           // Fail toward onboarding rather than stranding the user here.
//           navigate("/onboarding", { replace: true });
//         }
//       };

//       if (signIn?.status === "complete") {
//         handled.current = true;
//         const { error } = await signIn.finalize();
//         if (error) {
//           console.error("Sign-in finalize failed:", error);
//           setErrorMsg("Something went wrong finishing sign-in. Please try again.");
//           return;
//         }
//         await routeByProfile();
//         return;
//       }

//       if (signUp?.status === "complete") {
//         handled.current = true;
//         const { error } = await signUp.finalize();
//         if (error) {
//           console.error("Sign-up finalize failed:", error);
//           setErrorMsg("Something went wrong finishing sign-in. Please try again.");
//           return;
//         }
//         await routeByProfile();
//         return;
//       }
//     }

//     complete();
//   }, [signIn, signUp, userId, getToken, navigate]);

//   return (
//     <CloudBackground>
//       <div className="min-h-screen flex items-center justify-center px-5">
//         {errorMsg ? (
//           <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-xl text-sm max-w-sm text-center">
//             {errorMsg}
//           </div>
//         ) : (
//           <p className="text-white font-semibold">Signing you in…</p>
//         )}
//       </div>
//     </CloudBackground>
//   );
// }




import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSignIn, useSignUp, useAuth, useUser } from "@clerk/react";
import { CloudBackground } from "@/components/backgrounds/CloudBackground";
import { fetchUserProfile, saveUserProfile } from "@/lib/api";

// Matches the key Register.tsx's continueWithGoogle() writes to before
// redirecting to Google.
const PENDING_PROFILE_KEY = "wonderlearn_pending_profile";

// Landing spot for the Google OAuth redirect — reached either from
// Login.tsx's prebuilt <SignIn> (returning user) or Register.tsx's custom
// "Continue with Google" button (new user). Finishes whichever Clerk flow
// was in progress, then checks MongoDB by clerkId to decide where to send
// the browser next, per the diagram:
//   Clerk Authentication -> Check user in DATABASE -> route
export default function SSOCallback() {
  const { signIn } = useSignIn();
  const { signUp } = useSignUp();
  const { userId, getToken } = useAuth();
  const { user } = useUser();
  const navigate = useNavigate();
  const handled = useRef(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    async function complete() {
      if (handled.current) return;

      const routeByProfile = async () => {
        if (!userId) {
          setErrorMsg("Something went wrong finishing sign-in. Please try again.");
          return;
        }

        try {
          let profile = await fetchUserProfile(getToken, userId);

          // If Register.tsx's "Continue with Google" button stashed
          // in-progress form data before the OAuth redirect, this is the
          // only place that data ever gets saved to MongoDB — nothing
          // else calls saveUserProfile() for the Google sign-up path.
          if (!profile) {
            const pendingRaw = sessionStorage.getItem(PENDING_PROFILE_KEY);

            if (pendingRaw) {
              try {
                const pending = JSON.parse(pendingRaw);
                const emailAddress = user?.primaryEmailAddress?.emailAddress || "";

                if (emailAddress) {
                  console.log("💾 Saving Google sign-up profile to MongoDB...", {
                    clerkId: userId,
                    email: emailAddress,
                  });

                  profile = await saveUserProfile(getToken, {
                    clerkId: userId,
                    email: emailAddress,
                    name: pending.name || user?.firstName || "Explorer",
                    nickname: pending.nickname || "",
                    avatar: pending.avatar || "😊",
                    ageRange: pending.ageRange || "",
                    condition: pending.condition || "",
                    preferences: pending.preferences || [],
                    sessionDuration: pending.sessionDuration || 10,
                  });

                  console.log("✅ MongoDB profile saved:", profile);
                }
              } catch (saveErr) {
                console.error("Failed to save pending profile after Google sign-up:", saveErr);
              } finally {
                sessionStorage.removeItem(PENDING_PROFILE_KEY);
              }
            }
          }

          navigate(profile ? "/dashboard" : "/onboarding", { replace: true });
        } catch (err) {
          console.error("Profile check failed:", err);
          // Fail toward onboarding rather than stranding the user here.
          navigate("/onboarding", { replace: true });
        }
      };

      if (signIn?.status === "complete") {
        handled.current = true;
        const { error } = await signIn.finalize();
        if (error) {
          console.error("Sign-in finalize failed:", error);
          setErrorMsg("Something went wrong finishing sign-in. Please try again.");
          return;
        }
        await routeByProfile();
        return;
      }

      if (signUp?.status === "complete") {
        handled.current = true;
        const { error } = await signUp.finalize();
        if (error) {
          console.error("Sign-up finalize failed:", error);
          setErrorMsg("Something went wrong finishing sign-in. Please try again.");
          return;
        }
        await routeByProfile();
        return;
      }
    }

    complete();
  }, [signIn, signUp, userId, getToken, user, navigate]);

  return (
    <CloudBackground>
      <div className="min-h-screen flex items-center justify-center px-5">
        {errorMsg ? (
          <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-xl text-sm max-w-sm text-center">
            {errorMsg}
          </div>
        ) : (
          <p className="text-white font-semibold">Signing you in…</p>
        )}
      </div>
    </CloudBackground>
  );
}