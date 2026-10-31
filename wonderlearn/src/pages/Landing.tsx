import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  useInView,
} from "framer-motion";
import {
  Menu,
  X,
  Sparkles,
  Leaf,
  Star,
  BookOpen,
  Puzzle,
  Mic,
  Eye,
  Repeat,
  Lightbulb,
  Clock,
  Users,
  Heart,
  Home,
  ShoppingBag,
  Calendar,
  Smile,
  Shield,
  ChevronRight,
  ChevronDown,
  Award,
  TrendingUp,
  Zap,
  GraduationCap,
  Brain,
  MessageCircle,
  Moon,
  Sun,
  Cloud,
  Flower,
  TreePine,
  Footprints,
  Rocket,
  Target,
  BarChart,
  Medal,
  Gem,
  Compass,
  Wand2,
  Sparkle,
  Sprout,
  Globe,
  Lock,
  Mail,
  Phone,
  MapPin,
  CheckCircle,
  ArrowRight,
  Play,
  Layers,
  Cpu,
  Activity,
  User,
  Settings,
  BarChart3,
  Circle,
  Link,
  Network,
  Database,
  RefreshCw,
} from "lucide-react";

// --- Types ---
interface NavItem {
  label: string;
  href: string;
}

interface ProfileCardData {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  chips: string[];
  accent: string;
  gradient: string;
}

interface FeatureCardData {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface AccessibilityFeature {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface PrincipleCard {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

// --- Helper Components ---
const NestIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2C8 2 4 4 4 8c0 3 2 5 4 7" />
    <path d="M12 2c4 0 8 2 8 6 0 3-2 5-4 7" />
    <path d="M8 15c-2 2-4 3-4 5" />
    <path d="M16 15c2 2 4 3 4 5" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);

// --- Data ---
const navItems: NavItem[] = [
  { label: "Home", href: "#home" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Learning", href: "#learning" },
  { label: "Features", href: "#features" },
  { label: "About", href: "#about" },
];

const profileCards: ProfileCardData[] = [
  {
    id: "adhd",
    title: "ADHD",
    subtitle: "Focus. Engage. Achieve.",
    description:
      "Interactive, focused learning experiences with manageable activities and positive reinforcement to encourage attention and participation.",
    icon: <Zap className="w-10 h-10" />,
    chips: ["Focus-friendly activities", "Short learning sessions", "Interactive exercises", "Positive reinforcement"],
    accent: "blue",
    gradient: "from-blue-500 to-cyan-400",
  },
  {
    id: "id",
    title: "Intellectual Disability",
    subtitle: "Understand. Practice. Grow.",
    description:
      "Structured, step-by-step learning experiences that support understanding, repetition, practice and confidence at an individual pace.",
    icon: <Brain className="w-10 h-10" />,
    chips: ["Step-by-step learning", "Visual explanations", "Repetition", "Progress-based activities"],
    accent: "mint",
    gradient: "from-mint-400 to-teal-500",
  },
  {
    id: "autism",
    title: "Autism",
    subtitle: "Structure. Explore. Learn.",
    description:
      "Clear, predictable and customizable learning experiences that can support comfortable and consistent engagement.",
    icon: <Compass className="w-10 h-10" />,
    chips: ["Visual learning", "Structured activities", "Customizable experience", "Consistent routines"],
    accent: "lavender",
    gradient: "from-lavender-400 to-purple-500",
  },
];

const featureCards: FeatureCardData[] = [
  {
    id: "academic",
    title: "Academic Learning",
    description: "Reading, mathematics and foundational academic activities.",
    icon: <BookOpen className="w-8 h-8" />,
  },
  {
    id: "interactive",
    title: "Interactive Activities",
    description: "Engaging activities designed to encourage participation.",
    icon: <Rocket className="w-8 h-8" />,
  },
  {
    id: "cognitive",
    title: "Cognitive Skills",
    description: "Memory, recognition, problem-solving and thinking activities.",
    icon: <Brain className="w-8 h-8" />,
  },
  {
    id: "focus",
    title: "Focus & Attention",
    description: "Activities designed to encourage attention and task engagement.",
    icon: <Target className="w-8 h-8" />,
  },
  {
    id: "confidence",
    title: "Confidence Building",
    description: "Positive feedback and progress milestones.",
    icon: <Star className="w-8 h-8" />,
  },
  {
    id: "progress",
    title: "Progress Tracking",
    description: "Simple visual indicators showing learning progress.",
    icon: <BarChart className="w-8 h-8" />,
  },
];

const accessibilityFeatures: AccessibilityFeature[] = [
  {
    id: "visual",
    title: "Visual Learning",
    description: "Clear visual explanations.",
    icon: <Eye className="w-6 h-6" />,
  },
  {
    id: "audio",
    title: "Audio Support",
    description: "Support for audio-based learning experiences.",
    icon: <Mic className="w-6 h-6" />,
  },
  {
    id: "simple",
    title: "Simple Interactions",
    description: "Easy-to-understand controls.",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 11.5V9a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v1.4" />
        <path d="M14 10V8a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2" />
        <path d="M10 9.5V9a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2" />
        <path d="M18 11.5V14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-2" />
        <path d="M14 10h4" />
        <path d="M10 10h4" />
      </svg>
    ),
  },
  {
    id: "flexible",
    title: "Flexible Pace",
    description: "Learn without unnecessary pressure.",
    icon: <Clock className="w-6 h-6" />,
  },
  {
    id: "repetition",
    title: "Repetition-Friendly",
    description: "Practice concepts multiple times.",
    icon: <Repeat className="w-6 h-6" />,
  },
  {
    id: "typography",
    title: "Clear Typography",
    description: "Readable text and strong contrast.",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 7V4h16v3" />
        <path d="M9 20h6" />
        <path d="M12 4v16" />
      </svg>
    ),
  },
  {
    id: "calm",
    title: "Calm Interface",
    description: "Reduced visual clutter.",
    icon: <Moon className="w-6 h-6" />,
  },
  {
    id: "consistent",
    title: "Consistent Navigation",
    description: "Predictable interaction patterns.",
    icon: <Compass className="w-6 h-6" />,
  },
];

const principles: PrincipleCard[] = [
  {
    id: "personalized",
    title: "Personalized",
    description: "Learning experiences adapt to individual needs.",
    icon: <User className="w-8 h-8" />,
  },
  {
    id: "inclusive",
    title: "Inclusive",
    description: "Designed to support different learning styles and profiles.",
    icon: <Users className="w-8 h-8" />,
  },
  {
    id: "encouraging",
    title: "Encouraging",
    description: "Celebrate effort, participation and progress.",
    icon: <Heart className="w-8 h-8" />,
  },
];

// --- Navbar Component ---
const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleGetStarted = () => {
    navigate("/login");
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#071426]/90 backdrop-blur-lg border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
          >
            <div className="relative">
              <div className="w-8 h-8 bg-gradient-to-br from-[#3B82F6] to-[#38BDF8] rounded-lg flex items-center justify-center">
                <NestIcon className="w-5 h-5 text-white" />
              </div>
            </div>
            <span className="text-xl font-bold text-white">
              InspireNest
            </span>
          </motion.div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <motion.a
                key={item.label}
                href={item.href}
                className="text-white/80 hover:text-white transition-colors text-sm font-medium"
                whileHover={{ y: -2 }}
              >
                {item.label}
              </motion.a>
            ))}
            <motion.button
              onClick={handleGetStarted}
              className="bg-gradient-to-r from-[#3B82F6] to-[#38BDF8] text-white px-6 py-2 rounded-full font-semibold text-sm flex items-center gap-2 shadow-lg shadow-blue-500/20"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started <ChevronRight className="w-4 h-4" />
            </motion.button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#071426]/95 backdrop-blur-lg border-b border-white/5"
          >
            <div className="px-4 py-6 space-y-4">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="block text-white/70 hover:text-white transition-colors py-2"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <button 
                onClick={handleGetStarted}
                className="w-full bg-gradient-to-r from-[#3B82F6] to-[#38BDF8] text-white px-6 py-3 rounded-full font-semibold flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20"
              >
                Get Started <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

// --- Hero Section ---
const Hero: React.FC = () => {
  const navigate = useNavigate();

  const handleStartLearning = () => {
    navigate("/login");
  };

  return (
    <section id="home" className="min-h-screen relative overflow-hidden bg-[#071426]">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#071426] via-[#0B1F3A] to-[#071426]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#3B82F6]/10 rounded-full blur-3xl" />
      <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] bg-[#38BDF8]/5 rounded-full blur-2xl" />

      {/* Floating elements */}
      <motion.div
        className="absolute top-20 left-10 text-[#FBBF24]/20"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        <Star className="w-12 h-12" />
      </motion.div>
      <motion.div
        className="absolute bottom-20 right-10 text-[#38BDF8]/20"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
      >
        <Leaf className="w-16 h-16" />
      </motion.div>
      <motion.div
        className="absolute top-1/3 left-5 text-[#3B82F6]/20"
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <Sparkles className="w-8 h-8" />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10 mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Sparkles className="w-4 h-4 text-[#FBBF24]" />
              <span className="text-white/80 text-sm font-medium">
                AI-Powered Personalized Learning
              </span>
            </motion.div>

            <motion.h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Every Child Learns Differently.
              <br />
              <span className="bg-gradient-to-r from-[#3B82F6] via-[#38BDF8] to-[#A78BFA] bg-clip-text text-transparent">
                InspireNest Learns With Them.
              </span>
            </motion.h1>

            <motion.p
              className="text-white/80 text-lg mb-8 max-w-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              InspireNest creates personalized learning experiences that adapt
              to each child's needs, pace and progress—helping children with
              ADHD, Intellectual Disability and Autism learn with greater
              confidence.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <motion.button
                onClick={handleStartLearning}
                className="bg-gradient-to-r from-[#3B82F6] to-[#38BDF8] text-white px-8 py-3 rounded-full font-semibold flex items-center gap-2 shadow-lg shadow-blue-500/20"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Learning <ChevronRight className="w-5 h-5" />
              </motion.button>
              <motion.button
                className="border border-white/20 text-white px-8 py-3 rounded-full font-medium backdrop-blur-sm hover:bg-white/5"
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.05)" }}
                whileTap={{ scale: 0.95 }}
              >
                Explore How It Works
              </motion.button>
            </motion.div>

            <motion.div
              className="flex items-center gap-6 text-white/50 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <span>Inclusive</span>
              <span className="w-1 h-1 rounded-full bg-white/20" />
              <span>Personalized</span>
              <span className="w-1 h-1 rounded-full bg-white/20" />
              <span>Child-Centered</span>
            </motion.div>
          </motion.div>

          {/* Right side - Illustration */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              {/* Glowing network */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              >
                <div className="w-full h-full rounded-full border-2 border-[#38BDF8]/10 absolute" />
                <div className="w-3/4 h-3/4 rounded-full border-2 border-[#3B82F6]/10 absolute" />
                <div className="w-1/2 h-1/2 rounded-full border-2 border-[#A78BFA]/10 absolute" />
              </motion.div>

              {/* Main illustration area */}
              <div className="relative w-full h-full flex items-center justify-center">
                {/* Floating elements */}
                <motion.div
                  className="absolute top-0 left-0 text-[#FBBF24]/20"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Star className="w-12 h-12" />
                </motion.div>
                <motion.div
                  className="absolute bottom-0 right-0 text-[#34D399]/20"
                  animate={{ y: [0, 5, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <Flower className="w-14 h-14" />
                </motion.div>
                <motion.div
                  className="absolute top-1/4 right-0 text-[#3B82F6]/20"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 5, repeat: Infinity }}
                >
                  <BookOpen className="w-10 h-10" />
                </motion.div>
                <motion.div
                  className="absolute bottom-1/4 left-0 text-[#A78BFA]/20"
                  animate={{ x: [0, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <Brain className="w-10 h-10" />
                </motion.div>

                {/* Center nest/learning hub */}
                <div className="relative w-48 h-48">
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <div className="w-32 h-32 bg-gradient-to-br from-[#3B82F6]/20 to-[#38BDF8]/20 rounded-full backdrop-blur-sm border border-white/10 flex items-center justify-center">
                      <Users className="w-16 h-16 text-white/60" />
                    </div>
                  </motion.div>
                  {/* Floating cards */}
                  <motion.div
                    className="absolute -top-4 -right-4 bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/10"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <div className="flex items-center gap-2 text-white">
                      <Target className="w-4 h-4 text-[#38BDF8]" />
                      <span className="text-xs">Focus</span>
                    </div>
                  </motion.div>
                  <motion.div
                    className="absolute -bottom-4 -left-4 bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/10"
                    animate={{ y: [0, 5, 0] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                  >
                    <div className="flex items-center gap-2 text-white">
                      <BookOpen className="w-4 h-4 text-[#3B82F6]" />
                      <span className="text-xs">Reading</span>
                    </div>
                  </motion.div>
                  <motion.div
                    className="absolute top-1/2 -right-8 bg-white/10 backdrop-blur-sm rounded-xl p-2 border border-white/10"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <div className="flex items-center gap-2 text-white">
                      <Brain className="w-4 h-4 text-[#A78BFA]" />
                      <span className="text-xs">Memory</span>
                    </div>
                  </motion.div>
                </div>

                {/* Learning path */}
                <motion.div
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-[#FBBF24]/30 via-[#38BDF8]/30 to-[#3B82F6]/30 rounded-full"
                  animate={{ scaleX: [1, 1.2, 1] }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// --- Value Proposition ---
const ValueProposition: React.FC = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const values = [
    { id: "personalized", title: "Personalized", description: "Learning adapts to the child's needs.", icon: <User className="w-6 h-6" /> },
    { id: "interactive", title: "Interactive", description: "Activities encourage active participation.", icon: <Rocket className="w-6 h-6" /> },
    { id: "accessible", title: "Accessible", description: "Designed for different ways of learning.", icon: <Eye className="w-6 h-6" /> },
    { id: "progress", title: "Progress-Based", description: "Learning experiences evolve with progress.", icon: <BarChart className="w-6 h-6" /> },
  ];

  return (
    <section ref={ref} className="py-12 bg-[#F8FAFC] border-b border-[#CBD5E1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <motion.div
              key={value.id}
              className="flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="w-12 h-12 bg-[#3B82F6]/10 rounded-xl flex items-center justify-center text-[#3B82F6] mb-3">
                {value.icon}
              </div>
              <h3 className="font-semibold text-[#0B1F3A]">{value.title}</h3>
              <p className="text-sm text-[#0B1F3A]/60">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Learning Profiles Section ---
const LearningProfiles: React.FC = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const getAccentBg = (accent: string) => {
    switch (accent) {
      case "blue": return "bg-[#3B82F6]/10";
      case "mint": return "bg-[#34D399]/10";
      case "lavender": return "bg-[#A78BFA]/10";
      default: return "bg-[#3B82F6]/10";
    }
  };

  const getAccentText = (accent: string) => {
    switch (accent) {
      case "blue": return "text-[#3B82F6]";
      case "mint": return "text-[#34D399]";
      case "lavender": return "text-[#A78BFA]";
      default: return "text-[#3B82F6]";
    }
  };

  const getAccentBorder = (accent: string) => {
    switch (accent) {
      case "blue": return "border-[#3B82F6]/20";
      case "mint": return "border-[#34D399]/20";
      case "lavender": return "border-[#A78BFA]/20";
      default: return "border-[#3B82F6]/20";
    }
  };

  return (
    <section ref={ref} className="py-20 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0B1F3A] mb-4">
            Learning That Meets Every Child Where They Are
          </h2>
          <p className="text-[#0B1F3A]/60 text-lg max-w-2xl mx-auto">
            Different learning needs require different approaches. InspireNest
            adapts the experience to support each child's unique learning
            journey.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {profileCards.map((card, index) => (
            <motion.div
              key={card.id}
              className="bg-white rounded-2xl p-8 border border-[#CBD5E1] hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className={`w-16 h-16 ${getAccentBg(card.accent)} rounded-2xl flex items-center justify-center ${getAccentText(card.accent)} mb-4`}>
                {card.icon}
              </div>
              <h3 className="text-xl font-bold text-[#0B1F3A]">{card.title}</h3>
              <p className={`text-sm ${getAccentText(card.accent)} font-medium mb-2`}>{card.subtitle}</p>
              <p className="text-[#0B1F3A]/60 text-sm mb-4">{card.description}</p>
              <div className="flex flex-wrap gap-2">
                {card.chips.map((chip) => (
                  <span
                    key={chip}
                    className={`text-xs px-3 py-1 rounded-full border ${getAccentBorder(card.accent)} ${getAccentText(card.accent)} bg-white`}
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Personalization Engine ---
const PersonalizationEngine: React.FC = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const factors = [
    "Age",
    "Learning profile",
    "Learning pace",
    "Activity performance",
    "Progress",
    "Interaction preferences",
  ];

  return (
    <section ref={ref} className="py-20 bg-[#071426] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B1F3A] to-[#071426]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#3B82F6]/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Learning That Adapts With Every Step
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            InspireNest uses learning information and progress signals to
            recommend experiences that better match each child's journey.
          </p>
        </motion.div>

        <div className="relative">
          {/* Personalization factors */}
          <motion.div
            className="flex flex-wrap justify-center gap-3 mb-12"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            {factors.map((factor, index) => (
              <motion.span
                key={factor}
                className="bg-white/5 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10 text-white/70 text-sm"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.1 + index * 0.05 }}
                whileHover={{ scale: 1.05 }}
              >
                {factor}
              </motion.span>
            ))}
          </motion.div>

          {/* Central flow */}
          <div className="relative max-w-3xl mx-auto">
            <motion.div
              className="relative p-12 bg-gradient-to-r from-[#3B82F6]/10 via-[#38BDF8]/10 to-[#A78BFA]/10 rounded-3xl border border-white/10 backdrop-blur-sm"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.4 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="w-48 h-48 bg-[#3B82F6]/5 rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </div>
              <div className="relative text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-[#3B82F6] to-[#38BDF8] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-500/20">
                  <Cpu className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">Personalization Engine</h3>
                <p className="text-white/60 text-sm mt-2">
                  Analyzes learning information to recommend optimal activities
                </p>
              </div>
            </motion.div>

            {/* Flow arrows */}
            <div className="flex flex-col items-center gap-2 mt-6">
              {["Child Profile", "Personalization Engine", "Recommended Activity", "Child Interaction", "Progress", "Next Recommendation"].map((item, index) => (
                <React.Fragment key={item}>
                  <motion.div
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.6 + index * 0.05 }}
                  >
                    <div className="w-3 h-3 rounded-full bg-[#38BDF8]" />
                    <span className="text-white/80 text-sm">{item}</span>
                  </motion.div>
                  {index < 5 && (
                    <motion.div
                      animate={{ y: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: index * 0.1 }}
                    >
                      <ChevronDown className="w-5 h-5 text-[#38BDF8]/40" />
                    </motion.div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- Learning Experience ---
const LearningExperience: React.FC = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0B1F3A] mb-4">
            One Platform. Many Ways to Learn.
          </h2>
          <p className="text-[#0B1F3A]/60 text-lg">
            Explore the different learning experiences InspireNest offers.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featureCards.map((feature, index) => (
            <motion.div
              key={feature.id}
              className="group bg-[#F8FAFC] rounded-2xl p-6 border border-[#CBD5E1] hover:border-[#3B82F6]/30 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-blue-500/5"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="w-14 h-14 bg-[#3B82F6]/10 rounded-xl flex items-center justify-center text-[#3B82F6] mb-4 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-[#0B1F3A] mb-2">
                {feature.title}
              </h3>
              <p className="text-[#0B1F3A]/60 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- How It Works ---
const HowItWorks: React.FC = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const steps = [
    { id: "01", title: "Create a Learning Profile", description: "Set up an age and learning profile." },
    { id: "02", title: "Get Personalized Activities", description: "InspireNest recommends suitable learning experiences." },
    { id: "03", title: "Learn & Explore", description: "The child completes interactive activities at their own pace." },
    { id: "04", title: "Track Progress", description: "Learning activity and progress help inform future recommendations." },
  ];

  return (
    <section ref={ref} className="py-20 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0B1F3A] mb-4">
            How It Works
          </h2>
          <p className="text-[#0B1F3A]/60 text-lg">
            A simple journey from setup to learning progress.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="bg-white rounded-2xl p-6 border border-[#CBD5E1] shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-gradient-to-r from-[#3B82F6] to-[#38BDF8] rounded-full flex items-center justify-center text-white font-bold text-lg mb-4">
                  {step.id}
                </div>
                <h3 className="font-semibold text-[#0B1F3A] mb-2">{step.title}</h3>
                <p className="text-[#0B1F3A]/60 text-sm">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                  <ChevronRight className="w-6 h-6 text-[#CBD5E1]" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Product Preview ---
const ProductPreview: React.FC = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const activities = [
    { id: "focus", title: "Focus Activity", duration: "10 min", icon: <Target className="w-5 h-5" /> },
    { id: "math", title: "Math Challenge", duration: "8 min", icon: <GraduationCap className="w-5 h-5" /> },
    { id: "memory", title: "Memory Activity", duration: "5 min", icon: <Brain className="w-5 h-5" /> },
    { id: "reading", title: "Reading Adventure", duration: "10 min", icon: <BookOpen className="w-5 h-5" /> },
  ];

  return (
    <section ref={ref} className="py-20 bg-[#0B1F3A] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#112A46] to-[#0B1F3A]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#3B82F6]/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">
            Today's Learning Journey
          </h2>
        </motion.div>

        <motion.div
          className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Progress */}
          <div className="mb-8">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-white/60">Overall Progress</span>
              <span className="text-white font-semibold">60%</span>
            </div>
            <div className="h-3 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[#3B82F6] to-[#38BDF8] rounded-full"
                initial={{ width: 0 }}
                animate={isInView ? { width: "60%" } : {}}
                transition={{ duration: 1.5, delay: 0.3 }}
              />
            </div>
          </div>

          {/* Activities */}
          <div className="space-y-3 mb-6">
            {activities.map((activity, index) => (
              <motion.div
                key={activity.id}
                className="flex items-center justify-between bg-white/5 rounded-xl px-4 py-3 border border-white/5 hover:border-white/10 transition-colors"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.4 + index * 0.05 }}
                whileHover={{ x: 5 }}
              >
                <div className="flex items-center gap-3">
                  <div className="text-[#38BDF8]">{activity.icon}</div>
                  <span className="text-white">{activity.title}</span>
                </div>
                <span className="text-white/40 text-sm">{activity.duration}</span>
              </motion.div>
            ))}
          </div>

          {/* Encouragement */}
          <motion.div
            className="text-center pt-4 border-t border-white/5"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.8 }}
          >
            <p className="text-white/60">
              Great job! You're making progress 🎉
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

// --- Accessibility Section ---
const AccessibilitySection: React.FC = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0B1F3A] mb-4">
            Designed for Different Ways of Learning
          </h2>
          <p className="text-[#0B1F3A]/60 text-lg">
            Built with accessibility and inclusion at its core.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {accessibilityFeatures.map((feature, index) => (
            <motion.div
              key={feature.id}
              className="bg-[#F8FAFC] rounded-xl p-6 border border-[#CBD5E1] hover:border-[#3B82F6]/30 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-[#3B82F6] mb-3">{feature.icon}</div>
              <h4 className="font-semibold text-[#0B1F3A] text-sm">{feature.title}</h4>
              <p className="text-[#0B1F3A]/60 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Why InspireNest ---
const WhyInspireNest: React.FC = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-20 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0B1F3A] mb-4">
            More Than Learning. A Journey Toward Confidence.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {principles.map((principle, index) => (
            <motion.div
              key={principle.id}
              className="bg-white rounded-2xl p-8 border border-[#CBD5E1] text-center hover:shadow-xl transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="w-16 h-16 bg-gradient-to-r from-[#3B82F6] to-[#38BDF8] rounded-2xl flex items-center justify-center text-white mx-auto mb-4">
                {principle.icon}
              </div>
              <h3 className="text-xl font-bold text-[#0B1F3A] mb-2">{principle.title}</h3>
              <p className="text-[#0B1F3A]/60">{principle.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Abstract illustration */}
        <motion.div
          className="mt-16 flex justify-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4 }}
        >
          <div className="relative w-48 h-48">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 bg-gradient-to-br from-[#3B82F6]/20 to-[#38BDF8]/20 rounded-full border-2 border-[#3B82F6]/30" />
              <div className="w-24 h-24 bg-gradient-to-br from-[#A78BFA]/20 to-[#A78BFA]/20 rounded-full border-2 border-[#A78BFA]/30 absolute" />
              <div className="w-16 h-16 bg-gradient-to-br from-[#34D399]/20 to-[#34D399]/20 rounded-full border-2 border-[#34D399]/30 absolute" />
              <NestIcon className="w-12 h-12 text-[#3B82F6] absolute" />
            </div>
            <motion.div
              className="absolute -top-2 -right-2 text-[#FBBF24]"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Star className="w-6 h-6" />
            </motion.div>
            <motion.div
              className="absolute -bottom-2 -left-2 text-[#34D399]"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            >
              <Leaf className="w-6 h-6" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// --- Safety Disclaimer ---
const SafetyDisclaimer: React.FC = () => {
  return (
    <section className="py-8 bg-white border-t border-[#CBD5E1]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-[#0B1F3A]/40 text-sm">
          InspireNest is an educational support platform designed to provide
          personalized learning experiences. It is not intended to diagnose,
          treat or replace professional medical or therapeutic care.
        </p>
      </div>
    </section>
  );
};

// --- Final CTA ---
const FinalCTA: React.FC = () => {
  const navigate = useNavigate();

  const handleStartLearning = () => {
    navigate("/login");
  };

  return (
    <section className="py-20 bg-[#071426] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B1F3A] to-[#071426]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#3B82F6]/5 rounded-full blur-3xl" />
      
      {/* Floating particles */}
      <motion.div
        className="absolute top-10 left-10 text-[#FBBF24]/20"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        <Star className="w-12 h-12" />
      </motion.div>
      <motion.div
        className="absolute bottom-10 right-10 text-[#38BDF8]/20"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
      >
        <Sprout className="w-16 h-16" />
      </motion.div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2">
            Every Child Has Potential.
          </h2>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#3B82F6] to-[#38BDF8] mb-4">
            Let's Help Them Discover It.
          </h2>
          <p className="text-white/60 text-lg mb-8 max-w-2xl mx-auto">
            Start a personalized learning journey designed around the way each
            child learns.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <motion.button
              onClick={handleStartLearning}
              className="bg-gradient-to-r from-[#3B82F6] to-[#38BDF8] text-white px-8 py-4 rounded-full font-semibold text-lg flex items-center gap-2 shadow-lg shadow-blue-500/20"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Learning <ChevronRight className="w-5 h-5" />
            </motion.button>
            <motion.button
              className="border border-white/20 text-white px-8 py-4 rounded-full font-medium backdrop-blur-sm hover:bg-white/5"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.05)" }}
              whileTap={{ scale: 0.95 }}
            >
              Explore InspireNest
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// --- Footer ---
const Footer: React.FC = () => {
  return (
    <footer className="bg-[#071426] border-t border-white/5 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-[#3B82F6] to-[#38BDF8] rounded-lg flex items-center justify-center">
                <NestIcon className="w-5 h-5 text-white" />
              </div>
              <span className="text-white font-bold">InspireNest</span>
            </div>
            <p className="text-white/40 text-sm">
              Learn Differently. Grow Confidently.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {["Home", "How It Works", "Learning", "Features", "About"].map(
                (item) => (
                  <li key={item}>
                    <a href="#" className="text-white/40 hover:text-white transition-colors">
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              {["Contact", "Help Center", "Privacy Policy", "Terms of Service"].map(
                (item) => (
                  <li key={item}>
                    <a href="#" className="text-white/40 hover:text-white transition-colors">
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Connect</h4>
            <ul className="space-y-2 text-sm text-white/40">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" /> hello@inspirenest.ai
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4" /> +1 (555) 123-4567
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 mt-8 pt-8 text-center text-white/30 text-sm">
          © 2026 InspireNest. Educational support platform.
        </div>
      </div>
    </footer>
  );
};

// --- Main App ---
const Landing: React.FC = () => {
  return (
    <div className="min-h-screen bg-white text-[#0B1F3A]">
      <Navbar />
      <Hero />
      <ValueProposition />
      <LearningProfiles />
      <PersonalizationEngine />
      <LearningExperience />
      <HowItWorks />
      <ProductPreview />
      <AccessibilitySection />
      <WhyInspireNest />
      <SafetyDisclaimer />
      <FinalCTA />
      <Footer />
    </div>
  );
};

export default Landing;