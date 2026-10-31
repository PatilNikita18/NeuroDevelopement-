// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import { SignIn, SignUp } from "@clerk/react";

// import Landing from "@/pages/Landing";
// import Login from "@/pages/auth/Login";
// import Register from "@/pages/auth/Register";
// import Welcome from "@/pages/onboarding/Welcome";
// import Dashboard from "@/pages/dashboard/Dashboard";
// import Achievements from "@/pages/dashboard/Achievements";
// import Subjects from "@/pages/learning/Subjects";
// import WorldDetail from "@/pages/learning/WorldDetail";
// import ActivityScreen from "@/pages/learning/Activity";
// import ProgressPage from "@/pages/progress/Progress";
// import Profile from "@/pages/profile/Profile";
// import Settings from "@/pages/profile/Settings";

// export default function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         {/* Public routes */}
//         <Route path="/" element={<Landing />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
        
//         {/* Dashboard route - accessible after login */}
//         <Route path="/dashboard" element={<Dashboard />} />
        
//         {/* Other protected routes */}
//         <Route path="/onboarding" element={<Welcome />} />
//         <Route path="/welcome" element={<Welcome />} />
//         <Route path="/learning-map" element={<Dashboard />} />
//         <Route path="/subjects" element={<Subjects />} />
//         <Route path="/subjects/:worldKey" element={<WorldDetail />} />
//         <Route path="/activities" element={<Subjects />} />
//         <Route path="/activity/:id" element={<ActivityScreen />} />
//         <Route path="/progress" element={<ProgressPage />} />
//         <Route path="/achievements" element={<Achievements />} />
//         <Route path="/profile" element={<Profile />} />
//         <Route path="/settings" element={<Settings />} />
        
//         {/* Catch all */}
//         <Route path="*" element={<Navigate to="/" replace />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// import Landing from "@/pages/Landing";
// import Login from "@/pages/auth/Login";
// import Register from "@/pages/auth/Register";
// import Welcome from "@/pages/onboarding/Welcome";
// import Dashboard from "@/pages/dashboard/Dashboard";
// import Achievements from "@/pages/dashboard/Achievements";
// import Subjects from "@/pages/learning/Subjects";
// import WorldDetail from "@/pages/learning/WorldDetail";
// import ActivityScreen from "@/pages/learning/Activity";
// import ProgressPage from "@/pages/progress/Progress";
// import Profile from "@/pages/profile/Profile";
// import Settings from "@/pages/profile/Settings";

// export default function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         {/* Public routes */}
//         <Route path="/" element={<Landing />} />

//         {/* Clerk's <SignIn path="/login" routing="path" /> needs to own every
//             sub-path under /login (verification steps, SSO callback, etc).
//             Without the "/*" here, React Router only matches the exact path
//             and Clerk's internal navigation breaks. */}
//         <Route path="/login/*" element={<Login />} />

//         <Route path="/register" element={<Register />} />

//         {/* Dashboard route - accessible after login */}
//         <Route path="/dashboard" element={<Dashboard />} />

//         {/* Other protected routes */}
//         <Route path="/onboarding" element={<Welcome />} />
//         <Route path="/welcome" element={<Welcome />} />
//         <Route path="/learning-map" element={<Dashboard />} />
//         <Route path="/subjects" element={<Subjects />} />
//         <Route path="/subjects/:worldKey" element={<WorldDetail />} />
//         <Route path="/activities" element={<Subjects />} />
//         <Route path="/activity/:id" element={<ActivityScreen />} />
//         <Route path="/progress" element={<ProgressPage />} />
//         <Route path="/achievements" element={<Achievements />} />
//         <Route path="/profile" element={<Profile />} />
//         <Route path="/settings" element={<Settings />} />

//         {/* Catch all */}
//         <Route path="*" element={<Navigate to="/" replace />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }




// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// import Landing from "@/pages/Landing";
// import Login from "@/pages/auth/Login";
// import Register from "@/pages/auth/Register";
// import SSOCallback from "@/pages/auth/Ssocallback";
// import Welcome from "@/pages/onboarding/Welcome";
// import Dashboard from "@/pages/dashboard/Dashboard";
// import Achievements from "@/pages/dashboard/Achievements";
// import Subjects from "@/pages/learning/Subjects";
// import WorldDetail from "@/pages/learning/WorldDetail";
// import ActivityScreen from "@/pages/learning/Activity";
// import ProgressPage from "@/pages/progress/Progress";
// import Profile from "@/pages/profile/Profile";
// import Settings from "@/pages/profile/Settings";
// import { ProfileGate } from "@/pages/auth/Profilegate";

// export default function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         {/* Public routes */}
//         <Route path="/" element={<Landing />} />

//         {/* Clerk's <SignIn path="/login" routing="path" /> owns every
//             sub-path under /login (verification, SSO callback, etc). */}
//         <Route path="/login/*" element={<Login />} />

//         <Route path="/register" element={<Register />} />

//         {/* Lands here after Register.tsx's "Continue with Google" redirect. */}
//         <Route path="/sso-callback" element={<SSOCallback />} />

//         {/* Collects child-profile details for Google sign-ups, and for
//             anyone else who reaches a protected page without a saved
//             MongoDB profile yet. */}
//         <Route path="/onboarding" element={<Welcome />} />
//         <Route path="/welcome" element={<Welcome />} />

//         {/* Protected: ProfileGate checks MongoDB first and redirects to
//             /onboarding if there's no profile yet. */}
//         <Route
//           path="/dashboard"
//           element={
//             <ProfileGate>
//               <Dashboard />
//             </ProfileGate>
//           }
//         />
//         <Route
//           path="/learning-map"
//           element={
//             <ProfileGate>
//               <Dashboard />
//             </ProfileGate>
//           }
//         />
//         <Route path="/subjects" element={<Subjects />} />
//         <Route path="/subjects/:worldKey" element={<WorldDetail />} />
//         <Route path="/activities" element={<Subjects />} />
//         <Route path="/activity/:id" element={<ActivityScreen />} />
//         <Route path="/progress" element={<ProgressPage />} />
//         <Route path="/achievements" element={<Achievements />} />
//         <Route path="/profile" element={<Profile />} />
//         <Route path="/settings" element={<Settings />} />

//         {/* Catch all */}
//         <Route path="*" element={<Navigate to="/" replace />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// import Landing from "@/pages/Landing";
// import Login from "@/pages/auth/Login";
// import Register from "@/pages/auth/Register";
// import SSOCallback from "@/pages/auth/Ssocallback";
// import Welcome from "@/pages/onboarding/Welcome";
// import Dashboard from "@/pages/dashboard/Dashboard";
// import Achievements from "@/pages/dashboard/Achievements";
// import Subjects from "@/pages/learning/Subjects";
// import WorldDetail from "@/pages/learning/WorldDetail";
// import ActivityScreen from "@/pages/learning/Activity";
// import ProgressPage from "@/pages/progress/Progress";
// import Profile from "@/pages/profile/Profile";
// import Settings from "@/pages/profile/Settings";
// import { ProfileGate } from "@/pages/auth/Profilegate";

// export default function App() {
//   return (
//     <BrowserRouter>
//       <Routes>

//         {/* =========================
//             PUBLIC ROUTES
//         ========================== */}

//         <Route path="/" element={<Landing />} />

//         <Route path="/login/*" element={<Login />} />

//         <Route path="/register" element={<Register />} />

//         {/* Clerk Google OAuth callback */}
//         <Route
//           path="/sso-callback"
//           element={<SSOCallback />}
//         />

//         {/* =========================
//             ONBOARDING
//         ========================== */}

//         <Route
//           path="/onboarding"
//           element={<Welcome />}
//         />

//         <Route
//           path="/welcome"
//           element={<Welcome />}
//         />

//         {/* =========================
//             PROTECTED DASHBOARD
//         ========================== */}

//         <Route
//           path="/dashboard"
//           element={
//             <ProfileGate>
//               <Dashboard />
//             </ProfileGate>
//           }
//         />

//         <Route
//           path="/learning-map"
//           element={
//             <ProfileGate>
//               <Dashboard />
//             </ProfileGate>
//           }
//         />

//         {/* =========================
//             LEARNING
//         ========================== */}

//         <Route
//           path="/subjects"
//           element={<Subjects />}
//         />

//         <Route
//           path="/subjects/:worldKey"
//           element={<WorldDetail />}
//         />

//         <Route
//           path="/activities"
//           element={<Subjects />}
//         />

//         <Route
//           path="/activity/:id"
//           element={<ActivityScreen />}
//         />

//         {/* =========================
//             PROGRESS
//         ========================== */}

//         <Route
//           path="/progress"
//           element={<ProgressPage />}
//         />

//         {/* =========================
//             ACHIEVEMENTS
//         ========================== */}

//         <Route
//           path="/achievements"
//           element={<Achievements />}
//         />

//         {/* =========================
//             PROFILE
//         ========================== */}

//         <Route
//           path="/profile"
//           element={<Profile />}
//         />

//         <Route
//           path="/settings"
//           element={<Settings />}
//         />

//         {/* =========================
//             CATCH ALL
//         ========================== */}

//         <Route
//           path="*"
//           element={<Navigate to="/" replace />}
//         />

//       </Routes>
//     </BrowserRouter>
//   );
// }




// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// import Landing from "@/pages/Landing";
// import Login from "@/pages/auth/Login";
// import Register from "@/pages/auth/Register";
// import SSOCallback from "@/pages/auth/Ssocallback";
// import Welcome from "@/pages/onboarding/Welcome";
// import Dashboard from "@/pages/dashboard/Dashboard";
// import Achievements from "@/pages/dashboard/Achievements";
// import Subjects from "@/pages/learning/Subjects";
// import WorldDetail from "@/pages/learning/WorldDetail";
// import ActivityScreen from "@/pages/learning/Activity";
// import ProgressPage from "@/pages/progress/Progress";
// import Profile from "@/pages/profile/Profile";
// import Settings from "@/pages/profile/Settings";
// import { ProfileGate } from "@/pages/auth/Profilegate";

// export default function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Landing />} />
//         <Route path="/login/*" element={<Login />} />
//         <Route path="/register" element={<Register />} />

//         {/* Lands here after "Continue with Google" completes OAuth. */}
//         <Route path="/sso-callback" element={<SSOCallback />} />

//         <Route path="/onboarding" element={<Welcome />} />
//         <Route path="/welcome" element={<Welcome />} />

//         <Route
//           path="/dashboard"
//           element={
//             <ProfileGate>
//               <Dashboard />
//             </ProfileGate>
//           }
//         />
//         <Route
//           path="/learning-map"
//           element={
//             <ProfileGate>
//               <Dashboard />
//             </ProfileGate>
//           }
//         />

//         <Route path="/subjects" element={<Subjects />} />
//         <Route path="/subjects/:worldKey" element={<WorldDetail />} />
//         <Route path="/activities" element={<Subjects />} />
//         <Route path="/activity/:id" element={<ActivityScreen />} />
//         <Route path="/progress" element={<ProgressPage />} />
//         <Route path="/achievements" element={<Achievements />} />
//         <Route path="/profile" element={<Profile />} />
//         <Route path="/settings" element={<Settings />} />

//         <Route path="*" element={<Navigate to="/" replace />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }





//updated app.tsx 
// import {
//   BrowserRouter,
//   Routes,
//   Route,
//   Navigate,
// } from "react-router-dom";

// import Landing from "@/pages/Landing";
// import Login from "@/pages/auth/Login";
// import Register from "@/pages/auth/Register";
// import SSOCallback from "@/pages/auth/Ssocallback";
// import User_profile from "@/pages/auth/User_profile";

// import Welcome from "@/pages/onboarding/Welcome";

// import Dashboard from "@/pages/dashboard/Dashboard";
// import Achievements from "@/pages/dashboard/Achievements";

// import Subjects from "@/pages/learning/Subjects";
// import WorldDetail from "@/pages/learning/WorldDetail";
// import ActivityScreen from "@/pages/learning/Activity";

// import ProgressPage from "@/pages/progress/Progress";

// import Profile from "@/pages/profile/Profile";
// import Settings from "@/pages/profile/Settings";

// import { ProfileGate } from "@/pages/auth/Profilegate";

// export default function App() {
//   return (
//     <BrowserRouter>
//       <Routes>

//         {/* =====================================================
//             LANDING PAGE
//         ===================================================== */}

//         <Route
//           path="/"
//           element={<Landing />}
//         />

//         {/* =====================================================
//             AUTHENTICATION
//         ===================================================== */}

//         <Route
//           path="/login/*"
//           element={<Login />}
//         />

//         <Route
//           path="/register"
//           element={<Register />}
//         />

//         {/* =====================================================
//             USER PROFILE / PROFILE SETUP

//             After successful registration or email verification,
//             Register.tsx will navigate to:

//                 /user-profile

//             This page collects:
//             Name
//             Nickname
//             Avatar
//             Age
//             Learning Support
//             Learning Preferences
//             Session Length
//         ===================================================== */}

//         <Route
//           path="/user-profile"
//           element={<User_profile />}
//         />

//         {/* =====================================================
//             GOOGLE SSO CALLBACK

//             Google authentication returns here first.
//         ===================================================== */}

//         <Route
//           path="/sso-callback"
//           element={<SSOCallback />}
//         />

//         {/* =====================================================
//             ONBOARDING
//         ===================================================== */}

//         <Route
//           path="/onboarding"
//           element={<Welcome />}
//         />

//         <Route
//           path="/welcome"
//           element={<Welcome />}
//         />

//         {/* =====================================================
//             DASHBOARD

//             ProfileGate protects the dashboard.
//             User should normally reach dashboard only after
//             completing the User Profile.
//         ===================================================== */}

//         <Route
//           path="/dashboard"
//           element={
//             <ProfileGate>
//               <Dashboard />
//             </ProfileGate>
//           }
//         />

//         {/* =====================================================
//             LEARNING MAP
//         ===================================================== */}

//         <Route
//           path="/learning-map"
//           element={
//             <ProfileGate>
//               <Dashboard />
//             </ProfileGate>
//           }
//         />

//         {/* =====================================================
//             LEARNING
//         ===================================================== */}

//         <Route
//           path="/subjects"
//           element={<Subjects />}
//         />

//         <Route
//           path="/subjects/:worldKey"
//           element={<WorldDetail />}
//         />

//         <Route
//           path="/activities"
//           element={<Subjects />}
//         />

//         <Route
//           path="/activity/:id"
//           element={<ActivityScreen />}
//         />

//         {/* =====================================================
//             PROGRESS
//         ===================================================== */}

//         <Route
//           path="/progress"
//           element={<ProgressPage />}
//         />

//         {/* =====================================================
//             ACHIEVEMENTS
//         ===================================================== */}

//         <Route
//           path="/achievements"
//           element={<Achievements />}
//         />

//         {/* =====================================================
//             PROFILE
//         ===================================================== */}

//         <Route
//           path="/profile"
//           element={<Profile />}
//         />

//         {/* =====================================================
//             SETTINGS
//         ===================================================== */}

//         <Route
//           path="/settings"
//           element={<Settings />}
//         />

//         {/* =====================================================
//             UNKNOWN ROUTES
//         ===================================================== */}

//         <Route
//           path="*"
//           element={
//             <Navigate
//               to="/"
//               replace
//             />
//           }
//         />

//       </Routes>
//     </BrowserRouter>
//   );
// }




// import {
//   BrowserRouter,
//   Routes,
//   Route,
//   Navigate,
// } from "react-router-dom";

// import Landing from "@/pages/Landing";
// import Login from "@/pages/auth/Login";
// import Register from "@/pages/auth/Register";
// import SSOCallback from "@/pages/auth/Ssocallback";
// import User_profile from "@/pages/auth/User_profile";

// import Welcome from "@/pages/onboarding/Welcome";

// import Dashboard from "@/pages/dashboard/Dashboard";
// import Achievements from "@/pages/dashboard/Achievements";

// import Subjects from "@/pages/learning/Subjects";
// import WorldDetail from "@/pages/learning/WorldDetail";
// import ActivityScreen from "@/pages/learning/Activity";

// import ProgressPage from "@/pages/progress/Progress";

// import Profile from "@/pages/profile/Profile";
// import Settings from "@/pages/profile/Settings";

// import { ProfileGate } from "@/pages/auth/Profilegate";
// import PreAssessment from "./components/PreAssessment";
// import MathBattle from "@/pages/math/MathBattle";


// export default function App() {
//   return (
//     <BrowserRouter>
//       <Routes>

//         {/* =====================================================
//             LANDING PAGE
//         ===================================================== */}

//         <Route
//           path="/"
//           element={<Landing />}
//         />

//         {/* =====================================================
//             AUTHENTICATION
//         ===================================================== */}

//         <Route
//           path="/login/*"
//           element={<Login />}
//         />

//         <Route
//           path="/register"
//           element={<Register />}
//         />

//         {/* =====================================================
//             USER PROFILE / PROFILE SETUP
//         ===================================================== */}

//         <Route
//           path="/user-profile"
//           element={<User_profile />}
//         />

//         {/* =====================================================
//             GOOGLE SSO CALLBACK
//         ===================================================== */}

//         <Route
//           path="/sso-callback"
//           element={<SSOCallback />}
//         />

//         {/* =====================================================
//             ONBOARDING
//         ===================================================== */}

//         <Route
//           path="/onboarding"
//           element={<Welcome />}
//         />
        
//         <Route
//           path="/welcome"
//           element={<Welcome />}
//         />
//   <Route path="/math/battle" element={<MathBattle />} />
//         {/* =====================================================
//             DASHBOARD

//             After successful profile creation:

//                 /user-profile
//                        ↓
//                 Save Profile
//                        ↓
//                 /dashboard
//                        ↓
//                 Dashboard.tsx
//         ===================================================== */}

//         <Route
//           path="/dashboard"
//           element={
//             <ProfileGate>
//               <Dashboard />
//             </ProfileGate>
//           }
//         />

//         {/* =====================================================
//             LEARNING MAP
//         ===================================================== */}

//         <Route
//           path="/learning-map"
//           element={
//             <ProfileGate>
//               <Dashboard />
//             </ProfileGate>
//           }
//         />

//         <Route
//   path="/pre-assessment"
//   element={<PreAssessment />}
// />

//         {/* =====================================================
//             LEARNING
//         ===================================================== */}

//         <Route
//           path="/subjects"
//           element={<Subjects />}
//         />

//         <Route
//           path="/subjects/:worldKey"
//           element={<WorldDetail />}
//         />

//         <Route
//           path="/activities"
//           element={<Subjects />}
//         />

//         <Route
//           path="/activity/:id"
//           element={<ActivityScreen />}
//         />

//         {/* =====================================================
//             PROGRESS
//         ===================================================== */}

//         <Route
//           path="/progress"
//           element={<ProgressPage />}
//         />

//         {/* =====================================================
//             ACHIEVEMENTS
//         ===================================================== */}

//         <Route
//           path="/achievements"
//           element={<Achievements />}
//         />

//         {/* =====================================================
//             PROFILE
//         ===================================================== */}

//         <Route
//           path="/profile"
//           element={<Profile />}
//         />

//         {/* =====================================================
//             SETTINGS
//         ===================================================== */}

//         <Route
//           path="/settings"
//           element={<Settings />}
//         />

//         {/* =====================================================
//             UNKNOWN ROUTES
//         ===================================================== */}

//         <Route
//           path="*"
//           element={
//             <Navigate
//               to="/"
//               replace
//             />
//           }
//         />

//       </Routes>
//     </BrowserRouter>
//   );
// }



// import {
//   BrowserRouter,
//   Routes,
//   Route,
//   Navigate,
// } from "react-router-dom";

// import Landing from "@/pages/Landing";
// import Login from "@/pages/auth/Login";
// import Register from "@/pages/auth/Register";
// import SSOCallback from "@/pages/auth/Ssocallback";
// import User_profile from "@/pages/auth/User_profile";

// import Welcome from "@/pages/onboarding/Welcome";

// import Dashboard from "@/pages/dashboard/Dashboard";
// import Achievements from "@/pages/dashboard/Achievements";

// import Subjects from "@/pages/learning/Subjects";
// import WorldDetail from "@/pages/learning/WorldDetail";
// import ActivityScreen from "@/pages/learning/Activity";

// import ProgressPage from "@/pages/progress/Progress";

// import Profile from "@/pages/profile/Profile";
// import Settings from "@/pages/profile/Settings";

// import { ProfileGate } from "@/pages/auth/Profilegate";
// import PreAssessment from "./components/PreAssessment";
// import MathBattle from "@/pages/math/MathBattle";
// import TimesTablesFluency from "@/pages/math/TimesTablesFluency";
// import PhonicsPage from "@/pages/phonics/PhonicsPage";
// import AdvancedSoundMatchLevel from "@/pages/phonics/AdvancedSoundMatchLevel";
// import BuildTheWordFast from "./pages/phonics/BuildTheWordFast";
// import ChildProgress from "./pages/progress/ChildProgress";
// import VideoCategories from "./components/VideoCategories";

// export default function App() {
//   return (
//     <BrowserRouter>
//       <Routes>

//         {/* =====================================================
//             LANDING PAGE
//         ===================================================== */}

//         <Route
//           path="/"
//           element={<Landing />}
//         />

//         {/* =====================================================
//             AUTHENTICATION
//         ===================================================== */}

//         <Route
//           path="/login/*"
//           element={<Login />}
//         />

//         <Route path="/progress" element={<ChildProgress />} />
//         <Route
//   path="/video-lectures"
//   element={<VideoCategories />}
// />

//         <Route
//           path="/register"
//           element={<Register />}
//         />

//         {/* =====================================================
//             USER PROFILE / PROFILE SETUP
//         ===================================================== */}

//         <Route
//           path="/user-profile"
//           element={<User_profile />}
//         />

//         {/* =====================================================
//             GOOGLE SSO CALLBACK
//         ===================================================== */}

//         <Route
//           path="/sso-callback"
//           element={<SSOCallback />}
//         />

//         {/* =====================================================
//             ONBOARDING
//         ===================================================== */}

//         <Route
//           path="/onboarding"
//           element={<Welcome />}
//         />

//         <Route
//           path="/welcome"
//           element={<Welcome />}
//         />
//         <Route path="/phonics" element={<PhonicsPage />} />

//         {/* =====================================================
//             MATH ROUTES
//         ===================================================== */}

//         <Route
//           path="/math/battle"
//           element={<MathBattle />}
//         />

//         <Route
//           path="/math/times-tables"
//           element={<TimesTablesFluency />}
//         />
//         <Route
//   path="/phonics/level/2"
//   element={<BuildTheWordFast />}
// />

//         {/* =====================================================
//             DASHBOARD

//             After successful profile creation:

//                 /user-profile
//                        ↓
//                 Save Profile
//                        ↓
//                 /dashboard
//                        ↓
//                 Dashboard.tsx
//         ===================================================== */}

//         <Route
//           path="/dashboard"
//           element={
//             <ProfileGate>
//               <Dashboard />
//             </ProfileGate>
//           }
//         />

//         {/* =====================================================
//             LEARNING MAP
//         ===================================================== */}

//         <Route
//           path="/learning-map"
//           element={
//             <ProfileGate>
//               <Dashboard />
//             </ProfileGate>
//           }
//         />

//         <Route
//           path="/pre-assessment"
//           element={<PreAssessment />}
//         />

//         {/* =====================================================
//             LEARNING
//         ===================================================== */}

//         <Route
//           path="/subjects"
//           element={<Subjects />}
//         />

//         <Route
//           path="/subjects/:worldKey"
//           element={<WorldDetail />}
//         />

//         <Route
//           path="/activities"
//           element={<Subjects />}
//         />

//         <Route
//           path="/activity/:id"
//           element={<ActivityScreen />}
//         />

//         {/* =====================================================
//             PROGRESS
//         ===================================================== */}

//         <Route
//           path="/progress"
//           element={<ProgressPage />}
//         />

//         {/* =====================================================
//             ACHIEVEMENTS
//         ===================================================== */}

//         <Route
//           path="/achievements"
//           element={<Achievements />}
//         />

//         {/* =====================================================
//             PROFILE
//         ===================================================== */}

//           <Route path="/phonics/level/1" element={<AdvancedSoundMatchLevel />} />
//         <Route
//           path="/profile"
//           element={<Profile />}
//         />

//         {/* =====================================================
//             SETTINGS
//         ===================================================== */}

//         <Route
//           path="/settings"
//           element={<Settings />}
//         />

//         {/* =====================================================
//             UNKNOWN ROUTES
//         ===================================================== */}

//         <Route
//           path="*"
//           element={
//             <Navigate
//               to="/"
//               replace
//             />
//           }
//         />

//       </Routes>
//     </BrowserRouter>
//   );
// }



// import {
//   BrowserRouter,
//   Routes,
//   Route,
//   Navigate,
// } from "react-router-dom";

// import Landing from "@/pages/Landing";
// import Login from "@/pages/auth/Login";
// import Register from "@/pages/auth/Register";
// import SSOCallback from "@/pages/auth/Ssocallback";
// import User_profile from "@/pages/auth/User_profile";

// import Welcome from "@/pages/onboarding/Welcome";

// import Dashboard from "@/pages/dashboard/Dashboard";
// import Achievements from "@/pages/dashboard/Achievements";

// import Subjects from "@/pages/learning/Subjects";
// import WorldDetail from "@/pages/learning/WorldDetail";
// import ActivityScreen from "@/pages/learning/Activity";

// import ProgressPage from "@/pages/progress/Progress";

// import Profile from "@/pages/profile/Profile";
// import Settings from "@/pages/profile/Settings";

// import { ProfileGate } from "@/pages/auth/Profilegate";
// import { PreAssessmentGate } from "@/components/PreAssessmentGate";

// import PreAssessment from "./components/PreAssessment";
// import MathBattle from "@/pages/math/MathBattle";
// import TimesTablesFluency from "@/pages/math/TimesTablesFluency";
// import PhonicsPage from "@/pages/phonics/PhonicsPage";
// import AdvancedSoundMatchLevel from "@/pages/phonics/AdvancedSoundMatchLevel";
// import BuildTheWordFast from "./pages/phonics/BuildTheWordFast";
// import ChildProgress from "./pages/progress/ChildProgress";
// import VideoCategories from "./components/VideoCategories";
// import PostLoginRedirect from "@/pages/auth/PreAssessmentCallback";

// export default function App() {
//   return (
//     <BrowserRouter>
//       <Routes>

//         {/* =====================================================
//             LANDING PAGE
//         ===================================================== */}

//         <Route
//           path="/"
//           element={<Landing />}
//         />

//         {/* =====================================================
//             AUTHENTICATION
//         ===================================================== */}

//         <Route
//           path="/login/*"
//           element={<Login />}
//         />

//         <Route path="/post-login" element={<PostLoginRedirect />} />

//         <Route path="/progress" element={<ChildProgress />} />
//         <Route
//           path="/video-lectures"
//           element={<VideoCategories />}
//         />

//         <Route
//           path="/register"
//           element={<Register />}
//         />

//         {/* =====================================================
//             USER PROFILE / PROFILE SETUP
//         ===================================================== */}

//         <Route
//           path="/user-profile"
//           element={<User_profile />}
//         />

//         {/* =====================================================
//             GOOGLE SSO CALLBACK
//         ===================================================== */}

//         <Route
//           path="/sso-callback"
//           element={<SSOCallback />}
//         />

//         {/* =====================================================
//             ONBOARDING
//         ===================================================== */}

//         <Route
//           path="/onboarding"
//           element={<Welcome />}
//         />

//         <Route
//           path="/welcome"
//           element={<Welcome />}
//         />
//         <Route path="/phonics" element={<PhonicsPage />} />

//         {/* =====================================================
//             MATH ROUTES
//         ===================================================== */}

//         <Route
//           path="/math/battle"
//           element={<MathBattle />}
//         />

//         <Route
//           path="/math/times-tables"
//           element={<TimesTablesFluency />}
//         />
//         <Route
//           path="/phonics/level/2"
//           element={<BuildTheWordFast />}
//         />

//         {/* =====================================================
//             DASHBOARD — NOW GATED BY:
//               1. ProfileGate  (must have a profile)
//               2. PreAssessmentGate  (must complete assessment)
//         ===================================================== */}

//         <Route
//           path="/dashboard"
//           element={
//             <ProfileGate>
//               <PreAssessmentGate>
//                 <Dashboard />
//               </PreAssessmentGate>
//             </ProfileGate>
//           }
//         />

//         {/* =====================================================
//             LEARNING MAP
//         ===================================================== */}

//         <Route
//           path="/learning-map"
//           element={
//             <ProfileGate>
//               <PreAssessmentGate>
//                 <Dashboard />
//               </PreAssessmentGate>
//             </ProfileGate>
//           }
//         />

//         <Route
//           path="/pre-assessment"
//           element={<PreAssessment />}
//         />

//         {/* =====================================================
//             LEARNING
//         ===================================================== */}

//         <Route
//           path="/subjects"
//           element={<Subjects />}
//         />

//         <Route
//           path="/subjects/:worldKey"
//           element={<WorldDetail />}
//         />

//         <Route
//           path="/activities"
//           element={<Subjects />}
//         />

//         <Route
//           path="/activity/:id"
//           element={<ActivityScreen />}
//         />

//         {/* =====================================================
//             PROGRESS
//         ===================================================== */}

//         <Route
//           path="/progress"
//           element={<ProgressPage />}
//         />

//         {/* =====================================================
//             ACHIEVEMENTS
//         ===================================================== */}

//         <Route
//           path="/achievements"
//           element={<Achievements />}
//         />

//         {/* =====================================================
//             PROFILE
//         ===================================================== */}

//         <Route path="/phonics/level/1" element={<AdvancedSoundMatchLevel />} />
//         <Route
//           path="/profile"
//           element={<Profile />}
//         />

//         {/* =====================================================
//             SETTINGS
//         ===================================================== */}

//         <Route
//           path="/settings"
//           element={<Settings />}
//         />

//         {/* =====================================================
//             UNKNOWN ROUTES
//         ===================================================== */}

//         <Route
//           path="*"
//           element={
//             <Navigate
//               to="/"
//               replace
//             />
//           }
//         />

//       </Routes>
//     </BrowserRouter>
//   );
// }


import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Landing from "@/pages/Landing";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import SSOCallback from "@/pages/auth/Ssocallback";
import User_profile from "@/pages/auth/User_profile";

import Welcome from "@/pages/onboarding/Welcome";

import Dashboard from "@/pages/dashboard/Dashboard";
import Achievements from "@/pages/dashboard/Achievements";

import Subjects from "@/pages/learning/Subjects";
import WorldDetail from "@/pages/learning/WorldDetail";
import ActivityScreen from "@/pages/learning/Activity";

import ProgressPage from "@/pages/progress/Progress";

import Profile from "@/pages/profile/Profile";
import Settings from "@/pages/profile/Settings";

import { ProfileGate } from "@/pages/auth/Profilegate";
import { PreAssessmentGate } from "@/components/PreAssessmentGate";

import PreAssessment from "./components/PreAssessment";
import MathBattle from "@/pages/math/MathBattle";
import TimesTablesFluency from "@/pages/math/TimesTablesFluency";
import PhonicsPage from "@/pages/phonics/PhonicsPage";
import AdvancedSoundMatchLevel from "@/pages/phonics/AdvancedSoundMatchLevel";
import BuildTheWordFast from "./pages/phonics/BuildTheWordFast";
import ChildProgress from "./pages/progress/ChildProgress";
import VideoCategories from "./components/VideoCategories";
// Add these imports at the top:
import MotorSkillsHub from "@/pages/motor/MotorSkillsHub";
// import TraceTheLines from "@/pages/motor/TraceTheLines";
import MovementBreak from "@/pages/motor/MovementBreak";
import FingerGym from "@/pages/motor/FingerGym";
import BallCatch from "@/pages/motor/BallCatch";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ============================================ */}
        {/* LANDING                                     */}
        {/* ============================================ */}

        <Route path="/" element={<Landing />} />

        {/* ============================================ */}
        {/* AUTH                                        */}
        {/* ============================================ */}

        <Route
          path="/login/*"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/user-profile"
          element={<User_profile />}
        />

        <Route
          path="/sso-callback"
          element={<SSOCallback />}
        />

        {/* ============================================ */}
        {/* ONBOARDING                                  */}
        {/* ============================================ */}

        <Route
          path="/onboarding"
          element={<Welcome />}
        />

        <Route
          path="/welcome"
          element={<Welcome />}
        />

        {/* ============================================ */}
        {/* PHONICS                                     */}
        {/* ============================================ */}

        <Route
          path="/phonics"
          element={<PhonicsPage />}
        />

        <Route
          path="/phonics/level/1"
          element={<AdvancedSoundMatchLevel />}
        />

        <Route
          path="/phonics/level/2"
          element={<BuildTheWordFast />}
        />

        {/* ============================================ */}
        {/* MATH                                        */}
        {/* ============================================ */}

        <Route
          path="/math/battle"
          element={<MathBattle />}
        />

        <Route
          path="/math/times-tables"
          element={<TimesTablesFluency />}
        />


        <Route path="/motor" element={<MotorSkillsHub />} />
{/* <Route path="/motor/trace-lines" element={<TraceTheLines />} /> */}
<Route path="/motor/movement-break" element={<MovementBreak />} />
<Route path="/motor/finger-gym" element={<FingerGym />} />
<Route path="/motor/ball-catch" element={<BallCatch />} />

        {/* ============================================ */}
        {/* DASHBOARD — gated by ProfileGate +          */}
        {/*             PreAssessmentGate               */}
        {/* ============================================ */}

        <Route
          path="/dashboard"
          element={
            <ProfileGate>
              <PreAssessmentGate>
                <Dashboard />
              </PreAssessmentGate>
            </ProfileGate>
          }
        />

        <Route
          path="/learning-map"
          element={
            <ProfileGate>
              <PreAssessmentGate>
                <Dashboard />
              </PreAssessmentGate>
            </ProfileGate>
          }
        />

        {/* ============================================ */}
        {/* PRE-ASSESSMENT                              */}
        {/* ============================================ */}

        <Route
          path="/pre-assessment"
          element={<PreAssessment />}
        />

        {/* ============================================ */}
        {/* LEARNING                                    */}
        {/* ============================================ */}

        <Route
          path="/subjects"
          element={<Subjects />}
        />

        <Route
          path="/subjects/:worldKey"
          element={<WorldDetail />}
        />

        <Route
          path="/activities"
          element={<Subjects />}
        />

        <Route
          path="/activity/:id"
          element={<ActivityScreen />}
        />

        {/* ============================================ */}
        {/* PROGRESS                                    */}
        {/* ============================================ */}

        <Route
          path="/progress"
          element={<ChildProgress />}
        />

        {/* ============================================ */}
        {/* VIDEO LECTURES                              */}
        {/* ============================================ */}

        <Route
          path="/video-lectures"
          element={<VideoCategories />}
        />

        {/* ============================================ */}
        {/* ACHIEVEMENTS                                */}
        {/* ============================================ */}

        <Route
          path="/achievements"
          element={<Achievements />}
        />

        {/* ============================================ */}
        {/* PROFILE                                     */}
        {/* ============================================ */}

        <Route
          path="/profile"
          element={<Profile />}
        />

        {/* ============================================ */}
        {/* SETTINGS                                    */}
        {/* ============================================ */}

        <Route
          path="/settings"
          element={<Settings />}
        />

          <Route path="/dashboard" element={
    <ProfileGate>
      <PreAssessmentGate>
        <Dashboard />
      </PreAssessmentGate>
    </ProfileGate>
  } />

  <Route path="/learning-map" element={
    <ProfileGate>
      <PreAssessmentGate>
        <Dashboard />
      </PreAssessmentGate>
    </ProfileGate>
  } />
        {/* ============================================ */}
        {/* FALLBACK                                    */}
        {/* ============================================ */}

        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}