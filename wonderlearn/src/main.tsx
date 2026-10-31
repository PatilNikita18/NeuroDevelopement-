import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ClerkProvider } from "@clerk/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import App from "./App.tsx";

// Read from .env instead of hardcoding — otherwise rotating the key in
// Clerk (or switching between dev/prod instances) silently has no effect,
// and you can end up checking a different Clerk dashboard than the one
// your app is actually talking to.
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Clerk Publishable Key — set VITE_CLERK_PUBLISHABLE_KEY in your .env file");
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      retry: 1,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </ClerkProvider>
  </StrictMode>
);


// import React from "react";
// import ReactDOM from "react-dom/client";

// import { ClerkProvider } from "@clerk/react";

// import App from "./App";

// import "./index.css";

// const clerkPublishableKey =
//   import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

// if (!clerkPublishableKey) {
//   throw new Error(
//     "Missing VITE_CLERK_PUBLISHABLE_KEY"
//   );
// }

// ReactDOM.createRoot(
//   document.getElementById("root")!
// ).render(
//   <React.StrictMode>
//     <ClerkProvider
//       publishableKey={clerkPublishableKey}
//     >
//       <App />
//     </ClerkProvider>
//   </React.StrictMode>
// );