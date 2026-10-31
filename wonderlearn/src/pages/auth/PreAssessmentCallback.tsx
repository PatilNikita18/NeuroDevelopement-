import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { hasCompletedPreAssessment } from "@/components/PreAssessmentGate";

/**
 * /post-login
 *
 * Simple router between "needs assessment" and "dashboard".
 * PreAssessmentGate on /dashboard will surface the modal,
 * so this page just centralizes the redirect logic.
 */



export default function PostLoginRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    if (hasCompletedPreAssessment()) {
      navigate("/dashboard", { replace: true });
    } else {
      // Go to dashboard; the PreAssessmentGate will show the modal
      navigate("/dashboard", { replace: true });
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-300">
      <div className="text-center">
        <div className="text-4xl mb-4 animate-pulse">🌈</div>
        <p className="text-sm">Preparing your learning universe...</p>
      </div>
    </div>
  );
}