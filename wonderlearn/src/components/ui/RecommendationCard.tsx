import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "./Button";

export function RecommendationCard({
  title,
  reason,
  activityId,
}: {
  title: string;
  reason: string;
  activityId: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl p-6 bg-gradient-to-br from-purple-500 to-purple-700 text-white shadow-[var(--shadow-soft)] relative overflow-hidden"
    >
      <motion.span
        className="absolute -top-4 -right-4 text-7xl opacity-20"
        animate={{ rotate: [0, 10, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
        aria-hidden
      >
        ✨
      </motion.span>
      <p className="uppercase tracking-wide text-xs font-semibold text-purple-100 mb-2">
        ✨ Made Just For You
      </p>
      <h3 className="font-display font-semibold text-xl mb-2">{title}</h3>
      <p className="text-purple-50 text-sm mb-5">{reason}</p>
      <Link to={`/activity/${activityId}`}>
        <Button variant="secondary" size="md">
          Try It
        </Button>
      </Link>
    </motion.div>
  );
}
