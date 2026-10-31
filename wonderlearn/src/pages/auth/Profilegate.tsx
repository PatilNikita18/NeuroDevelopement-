// import { useEffect, useState, type ReactNode } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "@clerk/react";
// import { fetchUserProfile } from "@/lib/api";

// // Wraps any protected route (Dashboard, etc). Looks the signed-in Clerk
// // user up in MongoDB:
// //   - not signed in    -> /login
// //   - no profile yet   -> /onboarding (collects the missing details)
// //   - profile exists   -> render the page normally
// export function ProfileGate({ children }: { children: ReactNode }) {
//   const { isLoaded, isSignedIn, getToken } = useAuth();
//   const navigate = useNavigate();
//   const [checking, setChecking] = useState(true);

//   useEffect(() => {
//     if (!isLoaded) return;

//     if (!isSignedIn) {
//       navigate("/login", { replace: true });
//       return;
//     }

//     let cancelled = false;

//     (async () => {
//       try {
//         const profile = await fetchUserProfile(getToken);
//         if (cancelled) return;

//         if (!profile) {
//           navigate("/onboarding", { replace: true });
//           return;
//         }

//         setChecking(false);
//       } catch (err) {
//         console.error("Profile check failed:", err);
//         if (!cancelled) setChecking(false);
//       }
//     })();

//     return () => {
//       cancelled = true;
//     };
//   }, [isLoaded, isSignedIn, getToken, navigate]);

//   if (!isLoaded || checking) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-slate-500">
//         Loading your learning universe...
//       </div>
//     );
//   }

//   return <>{children}</>;
// }


// import {
//   useEffect,
//   useState,
//   type ReactNode,
// } from "react";

// import { useNavigate } from "react-router-dom";
// import { useAuth } from "@clerk/react";

// import { fetchUserProfile } from "@/lib/api";

// // =========================================================
// // TYPES
// // =========================================================

// type ProfileGateProps = {
//   children: ReactNode;
// };

// // =========================================================
// // COMPONENT
// // =========================================================

// export function ProfileGate({
//   children,
// }: ProfileGateProps) {
//   const navigate = useNavigate();

//   const {
//     isLoaded,
//     isSignedIn,
//     userId,
//     getToken,
//   } = useAuth();

//   const [checking, setChecking] = useState(true);

//   // =======================================================
//   // CHECK USER + PROFILE
//   // =======================================================

//   useEffect(() => {
//     // -----------------------------------------------------
//     // CLERK IS STILL LOADING
//     // -----------------------------------------------------

//     if (!isLoaded) {
//       return;
//     }

//     // -----------------------------------------------------
//     // USER IS NOT LOGGED IN
//     // -----------------------------------------------------

//     if (!isSignedIn || !userId) {
//       console.log("❌ User is not signed in.");

//       setChecking(false);

//       navigate("/login", {
//         replace: true,
//       });

//       return;
//     }

//     // =====================================================
//     // IMPORTANT FIX
//     // =====================================================
//     // After the above check, userId is guaranteed to be
//     // a string.
//     //
//     // Creating a separate constant prevents TypeScript
//     // from treating userId as:
//     //
//     // string | null | undefined
//     // =====================================================

//     const authenticatedUserId: string = userId;

//     let cancelled = false;

//     // -----------------------------------------------------
//     // CHECK PROFILE
//     // -----------------------------------------------------

//     async function checkProfile() {
//       try {
//         console.log(
//           "🔍 Checking profile for Clerk ID:",
//           authenticatedUserId
//         );

//         const profile = await fetchUserProfile(
//           getToken,
//           authenticatedUserId
//         );

//         // Component was unmounted
//         if (cancelled) {
//           return;
//         }

//         console.log(
//           "📥 ProfileGate response:",
//           profile
//         );

//         // -------------------------------------------------
//         // PROFILE DOES NOT EXIST
//         // -------------------------------------------------

//         if (!profile) {
//           console.log(
//             "⚠️ Profile not found."
//           );

//           setChecking(false);

//           navigate("/onboarding", {
//             replace: true,
//           });

//           return;
//         }

//         // -------------------------------------------------
//         // PROFILE EXISTS
//         // -------------------------------------------------

//         console.log(
//           "✅ Profile found."
//         );

//         console.log(
//           "🚀 Allowing Dashboard to render."
//         );

//         setChecking(false);
//       } catch (error) {
//         // -------------------------------------------------
//         // PROFILE CHECK ERROR
//         // -------------------------------------------------

//         console.error(
//           "❌ Profile check failed:",
//           error
//         );

//         if (!cancelled) {
//           /*
//            * Do not redirect to onboarding when the API
//            * itself fails.
//            *
//            * This prevents a temporary backend/network
//            * problem from being treated as a missing
//            * profile.
//            */
//           setChecking(false);
//         }
//       }
//     }

//     checkProfile();

//     // -----------------------------------------------------
//     // CLEANUP
//     // -----------------------------------------------------

//     return () => {
//       cancelled = true;
//     };
//   }, [
//     isLoaded,
//     isSignedIn,
//     userId,
//     getToken,
//     navigate,
//   ]);

//   // =======================================================
//   // LOADING
//   // =======================================================

//   if (!isLoaded || checking) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-300">
//         <div className="text-center">
//           <div className="text-4xl mb-4 animate-pulse">
//             🌈
//           </div>

//           <p className="text-sm">
//             Loading your learning universe...
//           </p>
//         </div>
//       </div>
//     );
//   }

//   // =======================================================
//   // USER AUTHENTICATED + PROFILE AVAILABLE
//   // =======================================================

//   return <>{children}</>;
// }



//next updated 

import {
  useEffect,
  useState,
  type ReactNode,
} from "react";

import { useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/react";

import { fetchUserProfile } from "@/lib/api";

type ProfileGateProps = {
  children: ReactNode;
};

export function ProfileGate({
  children,
}: ProfileGateProps) {
  const navigate = useNavigate();

  const {
    isLoaded,
    isSignedIn,
    userId,
    getToken,
  } = useAuth();

  const [checking, setChecking] =
    useState(true);

  useEffect(() => {
    // Clerk still loading
    if (!isLoaded) {
      return;
    }

    // -----------------------------------------------------
    // NOT SIGNED IN
    // -----------------------------------------------------

    if (!isSignedIn || !userId) {
      console.log(
        "❌ User is not signed in"
      );

      setChecking(false);

      navigate("/login", {
        replace: true,
      });

      return;
    }

    // userId is now guaranteed to be a string
    const authenticatedUserId: string =
      userId;

    let cancelled = false;

    // -----------------------------------------------------
    // CHECK PROFILE
    // -----------------------------------------------------

    async function checkProfile() {
      try {
        console.log(
          "🔍 Checking profile:"
        );

        console.log(
          "Clerk ID:",
          authenticatedUserId
        );

        const profile =
          await fetchUserProfile(
            getToken,
            authenticatedUserId
          );

        if (cancelled) {
          return;
        }

        console.log(
          "📥 Profile response:",
          profile
        );

        // -------------------------------------------------
        // PROFILE NOT FOUND
        // -------------------------------------------------

        if (!profile) {
          console.log(
            "⚠️ Profile not found"
          );

          setChecking(false);

          navigate("/onboarding", {
            replace: true,
          });

          return;
        }

        // -------------------------------------------------
        // PROFILE FOUND
        // -------------------------------------------------

        console.log(
          "✅ Profile found"
        );

        console.log(
          "🚀 Dashboard allowed"
        );

        setChecking(false);
      } catch (error) {
        console.error(
          "❌ Profile check failed:",
          error
        );

        if (!cancelled) {
          setChecking(false);
        }
      }
    }

    checkProfile();

    return () => {
      cancelled = true;
    };
  }, [
    isLoaded,
    isSignedIn,
    userId,
    getToken,
    navigate,
  ]);

  // -------------------------------------------------------
  // LOADING
  // -------------------------------------------------------

  if (!isLoaded || checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-300">
        <div className="text-center">
          <div className="text-4xl mb-4 animate-pulse">
            🌈
          </div>

          <p className="text-sm">
            Loading your learning universe...
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

