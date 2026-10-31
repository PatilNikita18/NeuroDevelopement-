import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

const items = [
  { to: "/dashboard", label: "Home", emoji: "🏠" },
  { to: "/subjects", label: "Worlds", emoji: "🗺" },
  { to: "/progress", label: "Progress", emoji: "🌟" },
  { to: "/achievements", label: "Badges", emoji: "🏆" },
  { to: "/profile", label: "Me", emoji: "🧒" },
];

export function Navigation() {
  return (
    <>
      {/* Desktop sidebar */}
      <nav
        aria-label="Main navigation"
        className="hidden sm:flex fixed left-0 top-0 h-screen w-24 lg:w-28 flex-col items-center py-8 gap-2 bg-white/70 backdrop-blur-md border-r border-purple-50 z-30"
      >
        <div className="text-3xl mb-6" aria-hidden>
          🌈
        </div>
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              cn(
                "flex flex-col items-center gap-1 w-16 lg:w-20 py-3 rounded-2xl text-xs font-semibold transition-colors",
                isActive
                  ? "bg-purple-100 text-purple-700"
                  : "text-ink-500 hover:bg-purple-50"
              )
            }
          >
            <span className="text-2xl" aria-hidden>
              {item.emoji}
            </span>
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* Mobile bottom bar */}
      <nav
        aria-label="Main navigation"
        className="sm:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-purple-50 flex justify-around py-2 z-30"
      >
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              cn(
                "flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl text-[10px] font-semibold",
                isActive ? "text-purple-700" : "text-ink-500"
              )
            }
          >
            {({ isActive }) => (
              <>
                <motion.span
                  animate={isActive ? { scale: [1, 1.2, 1] } : {}}
                  className="text-xl"
                  aria-hidden
                >
                  {item.emoji}
                </motion.span>
                {item.label}
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </>
  );
}
