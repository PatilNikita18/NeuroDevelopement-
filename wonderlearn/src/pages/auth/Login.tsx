// import { SignIn } from "@clerk/react";
// import { motion } from "framer-motion";
// import { CloudBackground } from "@/components/backgrounds/CloudBackground";

// export default function Login() {
//   return (
//     <CloudBackground>
//       <div className="min-h-screen flex items-center justify-center px-5 py-16">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="w-full max-w-md"
//         >
//           <SignIn
//             path="/login"
//             routing="path"
//             signUpUrl="/register"
//             fallbackRedirectUrl="/dashboard"
//             appearance={{
//               elements: {
//                 rootBox: "w-full",
//                 card: "bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-7 sm:p-9 shadow-[var(--shadow-soft)]",
//                 headerTitle: "text-white font-display font-semibold text-2xl sm:text-3xl",
//                 headerSubtitle: "text-purple-100 mt-1.5",
//                 formFieldLabel: "text-sm font-semibold text-purple-100",
//                 formFieldInput: "mt-1.5 w-full rounded-2xl bg-white/90 px-4 py-3 text-ink-900 placeholder:text-ink-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-300",
//                 formButtonPrimary: "w-full bg-gradient-to-r from-[#3B82F6] to-[#38BDF8] text-white font-semibold py-3 rounded-2xl hover:opacity-90 transition-all duration-300",
//                 footerActionLink: "text-purple-100 hover:text-white transition-colors font-semibold underline underline-offset-2",
//                 footer: "text-center mt-5",
//                 formField: "mb-4",
//                 form: "flex flex-col gap-4",
//               },
//             }}
//           />
//         </motion.div>
//       </div>
//     </CloudBackground>
//   );
// }



// import { SignIn } from "@clerk/react";
// import { motion } from "framer-motion";
// import { CloudBackground } from "@/components/backgrounds/CloudBackground";

// // No changes needed here. Clerk's <SignIn> already supports email/password
// // AND "Continue with Google" out of the box — Google shows up automatically
// // once it's enabled as a Social Connection in the Clerk Dashboard (see the
// // setup steps in the reply). After a successful login (either method),
// // Clerk redirects to /dashboard, where ProfileGate checks MongoDB and
// // sends brand-new Google users on to /onboarding.
// export default function Login() {
//   return (
//     <CloudBackground>
//       <div className="min-h-screen flex items-center justify-center px-5 py-16">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="w-full max-w-md"
//         >
//           <SignIn
//             path="/login"
//             routing="path"
//             signUpUrl="/register"
//             fallbackRedirectUrl="/dashboard"
//             appearance={{
//               elements: {
//                 rootBox: "w-full",
//                 card: "bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-7 sm:p-9 shadow-[var(--shadow-soft)]",
//                 headerTitle: "text-white font-display font-semibold text-2xl sm:text-3xl",
//                 headerSubtitle: "text-purple-100 mt-1.5",
//                 formFieldLabel: "text-sm font-semibold text-purple-100",
//                 formFieldInput: "mt-1.5 w-full rounded-2xl bg-white/90 px-4 py-3 text-ink-900 placeholder:text-ink-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-300",
//                 formButtonPrimary: "w-full bg-gradient-to-r from-[#3B82F6] to-[#38BDF8] text-white font-semibold py-3 rounded-2xl hover:opacity-90 transition-all duration-300",
//                 footerActionLink: "text-purple-100 hover:text-white transition-colors font-semibold underline underline-offset-2",
//                 footer: "text-center mt-5",
//                 formField: "mb-4",
//                 form: "flex flex-col gap-4",
//               },
//             }}
//           />
//         </motion.div>
//       </div>
//     </CloudBackground>
//   );
// }

// import { SignIn } from "@clerk/react";
// import { motion } from "framer-motion";
// import { CloudBackground } from "@/components/backgrounds/CloudBackground";

// export default function Login() {
//   return (
//     <CloudBackground>
//       <div className="min-h-screen flex items-center justify-center px-5 py-16">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="w-full max-w-md"
//         >
//           <SignIn
//             path="/login"
//             routing="path"
//             signUpUrl="/register"
//             fallbackRedirectUrl="/dashboard"
//             appearance={{
//               elements: {
//                 rootBox: "w-full",
//                 card: "bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-7 sm:p-9 shadow-[var(--shadow-soft)]",
//                 headerTitle: "text-white font-display font-semibold text-2xl sm:text-3xl",
//                 headerSubtitle: "text-purple-100 mt-1.5",
//                 formFieldLabel: "text-sm font-semibold text-purple-100",
//                 formFieldInput: "mt-1.5 w-full rounded-2xl bg-white/90 px-4 py-3 text-ink-900 placeholder:text-ink-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-300",
//                 formButtonPrimary: "w-full bg-gradient-to-r from-[#3B82F6] to-[#38BDF8] text-white font-semibold py-3 rounded-2xl hover:opacity-90 transition-all duration-300",
//                 footerActionLink: "text-purple-100 hover:text-white transition-colors font-semibold underline underline-offset-2",
//                 footer: "text-center mt-5",
//                 formField: "mb-4",
//                 form: "flex flex-col gap-4",
//               },
//             }}
//           />
//         </motion.div>
//       </div>
//     </CloudBackground>
//   );
// }


import { SignIn } from "@clerk/react";
import { motion } from "framer-motion";
import { CloudBackground } from "@/components/backgrounds/CloudBackground";

export default function Login() {
  return (
    <CloudBackground>
      <div className="min-h-screen flex items-center justify-center px-5 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          <SignIn
            path="/login"
            routing="path"
            signUpUrl="/register"
            fallbackRedirectUrl="/dashboard"
            appearance={{
              elements: {
                rootBox: "w-full",
                card: "bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-7 sm:p-9 shadow-[var(--shadow-soft)]",
                headerTitle:
                  "text-white font-display font-semibold text-2xl sm:text-3xl",
                headerSubtitle: "text-purple-100 mt-1.5",
                formFieldLabel:
                  "text-sm font-semibold text-purple-100",
                formFieldInput:
                  "mt-1.5 w-full rounded-2xl bg-white/90 px-4 py-3 text-ink-900 placeholder:text-ink-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-300",
                formButtonPrimary:
                  "w-full bg-gradient-to-r from-[#3B82F6] to-[#38BDF8] text-white font-semibold py-3 rounded-2xl hover:opacity-90 transition-all duration-300",
                footerActionLink:
                  "text-purple-100 hover:text-white transition-colors font-semibold underline underline-offset-2",
                footer: "text-center mt-5",
                formField: "mb-4",
                form: "flex flex-col gap-4",
              },
            }}
          />
        </motion.div>
      </div>
    </CloudBackground>
  );
}