
// import { useMemo, useState } from "react";
// import {
//   ArrowUpRight,
//   BookOpen,
//   Brain,
//   CheckCircle2,
//   ChevronRight,
//   Clock3,
//   Heart,
//   Lightbulb,
//   MessageCircle,
//   Music,
//   PawPrint,
//   Play,
//   Search,
//   Shapes,
//   ShieldCheck,
//   Sparkles,
//   Star,
//   X,
// } from "lucide-react";
// import type { LucideIcon } from "lucide-react";
// import "./VideoCategories.css";

// type Level = "Beginner" | "Intermediate" | "Advanced";

// interface Category {
//   id: string;
//   title: string;
//   description: string;
//   color: string;
//   icon: LucideIcon;
// }

// interface LearningVideo {
//   id: string;
//   title: string;
//   description: string;
//   category: string;
//   level: Level;
//   duration: string;
//   youtubeId?: string;
//   startAt?: number;
//   searchQuery?: string;
// }

// const categories: Category[] = [
//   { id: "abc", title: "ABC, Numbers & Shapes", description: "Letters, numbers, colors and shapes.", color: "pink", icon: Shapes },
//   { id: "animals", title: "Animals & Nature", description: "Discover animals, plants and nature.", color: "green", icon: PawPrint },
//   { id: "emotions", title: "Feelings & Emotions", description: "Recognize feelings and express emotions.", color: "orange", icon: Heart },
//   { id: "stories", title: "Stories & Social Skills", description: "Learn sharing, kindness and friendship.", color: "purple", icon: BookOpen },
//   { id: "daily", title: "Daily Living", description: "Build everyday routines and independence.", color: "blue", icon: Star },
//   { id: "music", title: "Music & Movement", description: "Learn with songs and gentle movement.", color: "yellow", icon: Music },
//   { id: "science", title: "Science & Discovery", description: "Explore weather, space and science.", color: "cyan", icon: Lightbulb },
//   { id: "communication", title: "Communication", description: "Practice words, listening and expression.", color: "teal", icon: MessageCircle },
//   { id: "calm", title: "Calm & Focus", description: "Try quiet breathing and focus activities.", color: "lavender", icon: Brain },
//   { id: "safety", title: "Safety & Hygiene", description: "Learn healthy habits and staying safe.", color: "red", icon: ShieldCheck },
// ];

// const videos: LearningVideo[] = [
//   {
//     id: "abc-1",
//     title: "Let's Learn the Alphabet",
//     description: "Meet letters through colorful pictures and sounds.",
//     category: "abc",
//     level: "Beginner",
//     duration: "7:51",
//     youtubeId: "aLAVdlnVRng",
//     startAt: 21,
//   },
//   {
//     id: "abc-2",
//     title: "ABC Phonics Song",
//     description: "Practice letter sounds and words from A to Z.",
//     category: "abc",
//     level: "Beginner",
//     duration: "Alphabet song",
//     youtubeId: "wSSlwtED2Yg",
//   },
//   {
//     id: "abc-3",
//     title: "Numbers, Colors & Shapes",
//     description: "Explore early math through simple animated examples.",
//     category: "abc",
//     level: "Beginner",
//     duration: "Video search",
//     searchQuery: "preschool numbers colors shapes animated learning video",
//   },
//   {
//     id: "animals-1",
//     title: "Meet the Animals",
//     description: "Learn animal names, sounds and movements.",
//     category: "animals",
//     level: "Beginner",
//     duration: "Video search",
//     searchQuery: "Super Simple Songs animal sounds for kids",
//   },
//   {
//     id: "animals-2",
//     title: "Amazing Animals and Nature",
//     description: "Discover animal life and the natural world.",
//     category: "animals",
//     level: "Intermediate",
//     duration: "Video search",
//     searchQuery: "National Geographic Kids amazing animals for children",
//   },
//   {
//     id: "emotions-1",
//     title: "Learning About Feelings",
//     description: "Recognize happy, sad, angry and worried feelings.",
//     category: "emotions",
//     level: "Beginner",
//     duration: "Video search",
//     searchQuery: "Feel Your Best Self kids animated feelings emotions",
//   },
//   {
//     id: "emotions-2",
//     title: "What Can I Do When I Feel Upset?",
//     description: "Explore simple, safe ways to manage big feelings.",
//     category: "emotions",
//     level: "Intermediate",
//     duration: "Video search",
//     searchQuery: "Sesame Street kids coping with big feelings animation",
//   },
//   {
//     id: "stories-1",
//     title: "The Power of Friendship",
//     description: "Practice kindness, sharing and taking turns.",
//     category: "stories",
//     level: "Beginner",
//     duration: "Video search",
//     searchQuery: "animated social stories for kids friendship sharing taking turns",
//   },
//   {
//     id: "stories-2",
//     title: "Learning to Say Please and Thank You",
//     description: "Practice polite words in everyday situations.",
//     category: "stories",
//     level: "Beginner",
//     duration: "Video search",
//     searchQuery: "please and thank you social skills cartoon for kids",
//   },
//   {
//     id: "daily-1",
//     title: "My Daily Routine",
//     description: "Learn about getting ready, eating and tidying up.",
//     category: "daily",
//     level: "Beginner",
//     duration: "Video search",
//     searchQuery: "Super Simple Songs daily routine for kids",
//   },
//   {
//     id: "daily-2",
//     title: "Healthy Hygiene Habits",
//     description: "Learn about washing hands and brushing teeth.",
//     category: "daily",
//     level: "Beginner",
//     duration: "Video search",
//     searchQuery: "Lingokids Hygiene Songs for Kids wash hands brushing teeth",
//   },
//   {
//     id: "music-1",
//     title: "Move! Dance Song",
//     description: "Follow simple actions such as clapping and moving.",
//     category: "music",
//     level: "Beginner",
//     duration: "Video",
//     youtubeId: "VsgpUHUYuJI",
//   },
//   {
//     id: "music-2",
//     title: "Sing and Move Together",
//     description: "Practice body movements and action words.",
//     category: "music",
//     level: "Beginner",
//     duration: "Video search",
//     searchQuery: "Super Simple Songs action songs for kids movement",
//   },
//   {
//     id: "science-1",
//     title: "Discover the Weather",
//     description: "Explore sunny, rainy, cloudy and windy days.",
//     category: "science",
//     level: "Beginner",
//     duration: "Video search",
//     searchQuery: "weather for kids animated educational video sunny rainy cloudy",
//   },
//   {
//     id: "science-2",
//     title: "A Journey Into Space",
//     description: "Meet the Sun, Moon, planets and stars.",
//     category: "science",
//     level: "Intermediate",
//     duration: "Video search",
//     searchQuery: "space planets for kids animated educational video",
//   },
//   {
//     id: "communication-1",
//     title: "Everyday Words",
//     description: "Practice useful words with familiar objects and pictures.",
//     category: "communication",
//     level: "Beginner",
//     duration: "Video search",
//     searchQuery: "first words for toddlers speech language learning objects",
//   },
//   {
//     id: "communication-2",
//     title: "How to Ask for Help",
//     description: "Practice simple phrases for expressing needs.",
//     category: "communication",
//     level: "Beginner",
//     duration: "Video search",
//     searchQuery: "communication skills for children asking for help social story",
//   },
//   {
//     id: "calm-1",
//     title: "Belly Breathing for Kids",
//     description: "Follow a gentle breathing activity at your own pace.",
//     category: "calm",
//     level: "Beginner",
//     duration: "Video search",
//     searchQuery: "Feel Your Best Self Belly Breathing kids",
//   },
//   {
//     id: "calm-2",
//     title: "A Quiet Mindful Moment",
//     description: "Try a short, gentle relaxation and focus activity.",
//     category: "calm",
//     level: "Beginner",
//     duration: "Video search",
//     searchQuery: "gentle mindfulness relaxation video for children",
//   },
//   {
//     id: "safety-1",
//     title: "Learning Safety Rules",
//     description: "Learn simple safety rules with a friendly cartoon.",
//     category: "safety",
//     level: "Beginner",
//     duration: "Video",
//     youtubeId: "cFR7TPLoTqM",
//   },
//   {
//     id: "safety-2",
//     title: "Let's Wash Our Hands",
//     description: "Learn the steps for clean and healthy hands.",
//     category: "safety",
//     level: "Beginner",
//     duration: "Video search",
//     searchQuery: "Lingokids Hygiene Songs for Kids washing hands",
//   },
// ];

// const levels: Array<"All" | Level> = [
//   "All",
//   "Beginner",
//   "Intermediate",
//   "Advanced",
// ];

// function getYouTubeSearchUrl(query: string) {
//   return `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
// }

// function getEmbedUrl(video: LearningVideo) {
//   if (!video.youtubeId) return "";
//   const start = video.startAt ? `?start=${video.startAt}` : "";
//   return `https://www.youtube-nocookie.com/embed/${video.youtubeId}${start}`;
// }

// export default function VideoCategories() {
//   const [activeCategory, setActiveCategory] = useState("abc");
//   const [search, setSearch] = useState("");
//   const [level, setLevel] = useState<"All" | Level>("All");
//   const [favorites, setFavorites] = useState<string[]>([]);
//   const [completed, setCompleted] = useState<string[]>([]);
//   const [selectedVideo, setSelectedVideo] = useState<LearningVideo | null>(null);
//   const [favoritesOnly, setFavoritesOnly] = useState(false);
//   const [calmMode, setCalmMode] = useState(false);

//   const currentCategory = categories.find((item) => item.id === activeCategory);

//   const filteredVideos = useMemo(() => {
//     const query = search.trim().toLowerCase();

//     return videos.filter((video) => {
//       const matchesCategory = video.category === activeCategory;
//       const matchesLevel = level === "All" || video.level === level;
//       const matchesSearch =
//         !query ||
//         video.title.toLowerCase().includes(query) ||
//         video.description.toLowerCase().includes(query);
//       const matchesFavorites = !favoritesOnly || favorites.includes(video.id);

//       return matchesCategory && matchesLevel && matchesSearch && matchesFavorites;
//     });
//   }, [activeCategory, level, search, favoritesOnly, favorites]);

//   function toggleFavorite(id: string) {
//     setFavorites((current) =>
//       current.includes(id)
//         ? current.filter((item) => item !== id)
//         : [...current, id],
//     );
//   }

//   function markCompleted(id: string) {
//     setCompleted((current) => current.includes(id) ? current : [...current, id]);
//   }

//   function openCategory(id: string) {
//     setActiveCategory(id);
//     setSearch("");
//     setLevel("All");
//     setFavoritesOnly(false);
//     setSelectedVideo(null);
//   }

//   return (
//     <main className={`video-page ${calmMode ? "calm-mode" : ""}`}>
//       <div className="video-page-inner">
//         <header className="video-hero">
//           <div className="hero-copy">
//             <div className="eyebrow"><Sparkles size={15} /> WONDERLEARN · WATCH & LEARN</div>
//             <h1>Explore, watch<br /><span>and learn!</span></h1>
//             <p>Discover new things through friendly videos, colorful visuals, and fun learning moments.</p>
//             <div className="hero-stats">
//               <div className="hero-stat"><span className="stat-number">{categories.length}</span><span className="stat-label">Categories</span></div>
//               <div className="stat-divider" />
//               <div className="hero-stat"><span className="stat-number">{completed.length}</span><span className="stat-label">Completed</span></div>
//               <div className="stat-divider" />
//               <div className="hero-stat"><span className="stat-number">{favorites.length}</span><span className="stat-label">Favorites</span></div>
//             </div>
//           </div>
//           <div className="hero-art" aria-hidden="true">
//             <div className="hero-orbit orbit-one" /><div className="hero-orbit orbit-two" />
//             <div className="hero-play"><Play size={38} fill="currentColor" /></div>
//             <span className="floating-letter letter-a">A</span><span className="floating-letter letter-b">B</span><span className="floating-letter letter-c">C</span>
//             <span className="floating-star star-one">✦</span><span className="floating-star star-two">✧</span>
//           </div>
//         </header>

//         <section className="category-section">
//           <div className="section-heading">
//             <div><span className="section-kicker">FIND YOUR FAVORITE</span><h2>Learning categories</h2></div>
//             <span className="category-count">{categories.length} topics</span>
//           </div>
//           <div className="category-grid">
//             {categories.map((category) => {
//               const Icon = category.icon;
//               const count = videos.filter((video) => video.category === category.id).length;
//               const active = activeCategory === category.id;
//               return (
//                 <button key={category.id} type="button" className={`category-card accent-${category.color} ${active ? "category-active" : ""}`} onClick={() => openCategory(category.id)} aria-pressed={active}>
//                   <span className="category-icon"><Icon size={23} /></span>
//                   <span className="category-card-content">
//                     <span className="category-title">{category.title}</span>
//                     <span className="category-description">{category.description}</span>
//                     <span className="category-bottom">{count} videos <ChevronRight size={15} /></span>
//                   </span>
//                 </button>
//               );
//             })}
//           </div>
//         </section>

//         <section className="video-library">
//           <div className="section-heading library-heading">
//             <div><span className="section-kicker">YOUR NEXT ADVENTURE</span><h2>{currentCategory?.title}</h2><p className="library-subtitle">{currentCategory?.description}</p></div>
//             <button type="button" className={`utility-button ${favoritesOnly ? "utility-active" : ""}`} onClick={() => setFavoritesOnly((value) => !value)} aria-pressed={favoritesOnly}><Heart size={16} /> Favorites</button>
//           </div>

//           <div className="video-controls">
//             <label className="search-box"><Search size={18} /><input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search videos..." aria-label="Search videos" />{search && <button type="button" className="clear-search" onClick={() => setSearch("")} aria-label="Clear search"><X size={15} /></button>}</label>
//             <div className="level-filters" aria-label="Filter by level">
//               {levels.map((item) => <button type="button" key={item} className={`level-chip ${level === item ? "level-selected" : ""}`} onClick={() => setLevel(item)} aria-pressed={level === item}>{item}</button>)}
//             </div>
//             <button type="button" className={`utility-button calm-toggle ${calmMode ? "utility-active" : ""}`} onClick={() => setCalmMode((value) => !value)} aria-pressed={calmMode}><Brain size={16} /> Calm mode</button>
//           </div>

//           <div className="results-line"><span>Showing <strong>{filteredVideos.length}</strong> videos</span>{calmMode && <span className="calm-note">Calm mode enabled · reduced motion</span>}</div>

//           {filteredVideos.length ? (
//             <div className="video-grid">
//               {filteredVideos.map((video) => {
//                 const favorite = favorites.includes(video.id);
//                 const done = completed.includes(video.id);
//                 return (
//                   <article className="video-card" key={video.id}>
//                     <button type="button" className="video-thumbnail" onClick={() => setSelectedVideo(video)} aria-label={`Open ${video.title}`}>
//                       {video.youtubeId ? (
//                         <img src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`} alt="" loading="lazy" onError={(event) => { event.currentTarget.style.display = "none"; }} />
//                       ) : (
//                         <span className="thumbnail-placeholder"><span className="placeholder-orb"><Play size={28} fill="currentColor" /></span><span className="placeholder-caption">WONDERLEARN</span></span>
//                       )}
//                       <span className="thumbnail-play"><Play size={20} fill="currentColor" /></span>
//                       <span className="duration-badge"><Clock3 size={12} />{video.duration}</span>
//                       {done && <span className="completed-badge"><CheckCircle2 size={13} /> Completed</span>}
//                     </button>
//                     <div className="video-card-body">
//                       <div className="video-card-meta"><span className="level-badge">{video.level}</span><button type="button" className={`favorite-button ${favorite ? "is-favorite" : ""}`} onClick={() => toggleFavorite(video.id)} aria-label={favorite ? "Remove favorite" : "Add favorite"} aria-pressed={favorite}><Heart size={18} fill={favorite ? "currentColor" : "none"} /></button></div>
//                       <h3>{video.title}</h3><p>{video.description}</p>
//                       <button type="button" className="watch-link" onClick={() => setSelectedVideo(video)}>{video.youtubeId ? "Watch video" : "Find video"} <ChevronRight size={16} /></button>
//                     </div>
//                   </article>
//                 );
//               })}
//             </div>
//           ) : (
//             <div className="empty-state"><span className="empty-icon"><Search size={26} /></span><h3>No videos found</h3><p>Try another search or change your filters.</p><button type="button" className="primary-button" onClick={() => { setSearch(""); setLevel("All"); setFavoritesOnly(false); }}>Clear filters</button></div>
//           )}
//         </section>
//         <footer className="video-footer"><Sparkles size={15} /> Every little step is a big achievement. Keep learning!</footer>
//       </div>

//       {selectedVideo && (
//         <div className="video-modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setSelectedVideo(null); }}>
//           <section className="video-modal" role="dialog" aria-modal="true" aria-labelledby="modal-video-title">
//             <header className="modal-header"><div><span className="section-kicker">WATCH & LEARN</span><h2 id="modal-video-title">{selectedVideo.title}</h2></div><button type="button" className="modal-close" onClick={() => setSelectedVideo(null)} aria-label="Close video"><X size={22} /></button></header>
//             <div className="modal-player">
//               {selectedVideo.youtubeId ? (
//                 <iframe key={selectedVideo.id} className="youtube-player" src={getEmbedUrl(selectedVideo)} title={selectedVideo.title} allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen />
//               ) : (
//                 <div className="video-unavailable">
//                   <span className="placeholder-orb"><Search size={28} /></span>
//                   <h3>Find a suitable video</h3>
//                   <p>Open YouTube results, preview the video, and choose a suitable version for this child's learning needs.</p>
//                   <a className="primary-button" href={getYouTubeSearchUrl(selectedVideo.searchQuery ?? selectedVideo.title)} target="_blank" rel="noreferrer">Search YouTube <ArrowUpRight size={16} /></a>
//                 </div>
//               )}
//             </div>
//             <div className="modal-details">
//               <div className="modal-description"><span className="level-badge">{selectedVideo.level}</span><p>{selectedVideo.description}</p></div>
//               <div className="modal-actions">
//                 <button type="button" className={`utility-button ${favorites.includes(selectedVideo.id) ? "utility-active" : ""}`} onClick={() => toggleFavorite(selectedVideo.id)}><Heart size={16} fill={favorites.includes(selectedVideo.id) ? "currentColor" : "none"} />{favorites.includes(selectedVideo.id) ? "Saved" : "Save"}</button>
//                 <button type="button" className="primary-button" onClick={() => markCompleted(selectedVideo.id)}><CheckCircle2 size={17} />{completed.includes(selectedVideo.id) ? "Completed" : "Mark as completed"}</button>
//               </div>
//             </div>
//             <div className="learning-prompt"><span className="prompt-icon"><Sparkles size={17} /></span><p><strong>Let's practice!</strong> Pause when needed and talk about what you learned together.</p></div>
//           </section>
//         </div>
//       )}
//     </main>
//   );
// }



// src/pages/videos/VideoCategories.tsx

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  Brain,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Heart,
  Lightbulb,
  MessageCircle,
  Music,
  PawPrint,
  Play,
  Search,
  Shapes,
  ShieldCheck,
  Sparkles,
  Star,
  X,
  Rocket,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import "./VideoCategories.css";

// =========================================================
// TYPES
// =========================================================

type Level = "Beginner" | "Intermediate" | "Advanced";

interface Category {
  id: string;
  title: string;
  description: string;
  color: string;
  icon: LucideIcon;
}

interface LearningVideo {
  id: string;
  title: string;
  description: string;
  category: string;
  level: Level;
  duration: string;
  youtubeId: string;
  startAt?: number;
  playlistId?: string;
}

// =========================================================
// CATEGORIES
// =========================================================

const categories: Category[] = [
  { id: "abc", title: "ABC, Numbers & Shapes", description: "Letters, numbers, colors and shapes.", color: "pink", icon: Shapes },
  { id: "animals", title: "Animals & Nature", description: "Discover animals, plants and nature.", color: "green", icon: PawPrint },
  { id: "emotions", title: "Feelings & Emotions", description: "Recognize feelings and express emotions.", color: "orange", icon: Heart },
  { id: "stories", title: "Stories & Social Skills", description: "Learn sharing, kindness and friendship.", color: "purple", icon: BookOpen },
  { id: "daily", title: "Daily Living", description: "Build everyday routines and independence.", color: "blue", icon: Star },
  { id: "music", title: "Music & Movement", description: "Learn with songs and gentle movement.", color: "yellow", icon: Music },
  { id: "science", title: "Science & Discovery", description: "Explore weather, space and science.", color: "cyan", icon: Lightbulb },
  { id: "communication", title: "Communication", description: "Practice words, listening and expression.", color: "teal", icon: MessageCircle },
  { id: "calm", title: "Calm & Focus", description: "Try quiet breathing and focus activities.", color: "lavender", icon: Brain },
  { id: "safety", title: "Safety & Hygiene", description: "Learn healthy habits and staying safe.", color: "red", icon: ShieldCheck },
];

// =========================================================
// VIDEOS
// =========================================================

const videos: LearningVideo[] = [
  // -------------------- ABC, Numbers & Shapes --------------------
  {
    id: "abc-1",
    title: "Let's Learn the Alphabet",
    description: "Meet letters through colorful pictures and sounds.",
    category: "abc",
    level: "Beginner",
    duration: "7:51",
    youtubeId: "aLAVdlnVRng",
    startAt: 21,
  },
  {
    id: "abc-2",
    title: "ABC Phonics Song",
    description: "Practice letter sounds and words from A to Z.",
    category: "abc",
    level: "Beginner",
    duration: "Alphabet song",
    youtubeId: "wSSlwtED2Yg",
  },
  {
    id: "abc-3",
    title: "Numbers, Colors & Shapes",
    description: "Explore early math through simple animated examples.",
    category: "abc",
    level: "Intermediate",
    duration: "Video",
    youtubeId: "YY890ByPpg8",
    playlistId: "PLC7056DB9AC0EAC04",
  },
  {
    id: "abc-4",
    title: "Counting to 100",
    description: "Count from 1 to 100 with fun songs and repetition.",
    category: "abc",
    level: "Intermediate",
    duration: "Video",
    youtubeId: "e0dJWfQHF8Y",
  },
  {
    id: "abc-5",
    title: "Advanced Shapes & Patterns",
    description: "Explore complex shapes and pattern recognition.",
    category: "abc",
    level: "Advanced",
    duration: "Video",
    youtubeId: "9x8bA-KuDMw",
  },

  // -------------------- Animals & Nature --------------------
  {
    id: "animals-1",
    title: "Meet the Animals",
    description: "Learn animal names, sounds and movements.",
    category: "animals",
    level: "Beginner",
    duration: "Video",
    youtubeId: "oVWeN7e5mkw",
  },
  {
    id: "animals-2",
    title: "Farm Animals for Toddlers",
    description: "Discover cows, pigs, ducks and more friendly farm animals.",
    category: "animals",
    level: "Beginner",
    duration: "Video",
    youtubeId: "vFtGVJ3rB3o",
  },
  {
    id: "animals-3",
    title: "Amazing Animals and Nature",
    description: "Discover animal life and the natural world.",
    category: "animals",
    level: "Intermediate",
    duration: "Video",
    youtubeId: "o3JWHpWQTKg",
  },
  {
    id: "animals-4",
    title: "Ocean Animals Adventure",
    description: "Dive into the sea and meet whales, dolphins and fish.",
    category: "animals",
    level: "Intermediate",
    duration: "Video",
    youtubeId: "iKvFAZ-2YzA",
  },
  {
    id: "animals-5",
    title: "Endangered Species",
    description: "Learn about animals that need our protection.",
    category: "animals",
    level: "Advanced",
    duration: "Video",
    youtubeId: "aT0JcW-s6dM",
  },

  // -------------------- Feelings & Emotions --------------------
  {
    id: "emotions-1",
    title: "Learning About Feelings",
    description: "Recognize happy, sad, angry and worried feelings.",
    category: "emotions",
    level: "Beginner",
    duration: "Video",
    youtubeId: "V6vK7Xw6Xbc",
  },
  {
    id: "emotions-2",
    title: "The Feelings Song",
    description: "Sing along to name and express different emotions.",
    category: "emotions",
    level: "Beginner",
    duration: "Video",
    youtubeId: "UsISdVxrMpc",
  },
  {
    id: "emotions-3",
    title: "What Can I Do When I Feel Upset?",
    description: "Explore simple, safe ways to manage big feelings.",
    category: "emotions",
    level: "Intermediate",
    duration: "Video",
    youtubeId: "H6ZvKMkR3-Y",
  },
  {
    id: "emotions-4",
    title: "Empathy & Understanding Others",
    description: "Learn to notice and care about how others feel.",
    category: "emotions",
    level: "Intermediate",
    duration: "Video",
    youtubeId: "V9Hc3gF3SvU",
  },
  {
    id: "emotions-5",
    title: "Advanced Emotional Regulation",
    description: "Practice complex coping strategies for difficult emotions.",
    category: "emotions",
    level: "Advanced",
    duration: "Video",
    youtubeId: "qy8G3C9nZXY",
  },

  // -------------------- Stories & Social Skills --------------------
  {
    id: "stories-1",
    title: "The Power of Friendship",
    description: "Practice kindness, sharing and taking turns.",
    category: "stories",
    level: "Beginner",
    duration: "Video",
    youtubeId: "gnSu3iR2v0c",
  },
  {
    id: "stories-2",
    title: "Learning to Say Please and Thank You",
    description: "Practice polite words in everyday situations.",
    category: "stories",
    level: "Beginner",
    duration: "Video",
    youtubeId: "7eY4bPbW6e0",
  },
  {
    id: "stories-3",
    title: "Sharing is Caring",
    description: "Learn why sharing makes everyone happier.",
    category: "stories",
    level: "Beginner",
    duration: "Video",
    youtubeId: "Hb2eBU0H2W0",
  },
  {
    id: "stories-4",
    title: "Understanding Empathy Through Stories",
    description: "Explore perspective-taking with animated friends.",
    category: "stories",
    level: "Intermediate",
    duration: "Video",
    youtubeId: "c2E7sFwGJwE",
  },
  {
    id: "stories-5",
    title: "Advanced Social Situations",
    description: "Practice handling complex social scenarios.",
    category: "stories",
    level: "Advanced",
    duration: "Video",
    youtubeId: "9QbQ4bS9Q8Y",
  },

  // -------------------- Daily Living --------------------
  {
    id: "daily-1",
    title: "My Daily Routine",
    description: "Learn about getting ready, eating and tidying up.",
    category: "daily",
    level: "Beginner",
    duration: "Video",
    youtubeId: "orJh3sK4QrM",
  },
  {
    id: "daily-2",
    title: "Healthy Hygiene Habits",
    description: "Learn about washing hands and brushing teeth.",
    category: "daily",
    level: "Beginner",
    duration: "Video",
    youtubeId: "hT6rqUEWqYg",
  },
  {
    id: "daily-3",
    title: "Getting Dressed",
    description: "Learn how to put on clothes step by step.",
    category: "daily",
    level: "Beginner",
    duration: "Video",
    youtubeId: "v8fVzpqdPHY",
  },
  {
    id: "daily-4",
    title: "Tidying Up & Organizing",
    description: "Practice cleaning up and putting things in their place.",
    category: "daily",
    level: "Intermediate",
    duration: "Video",
    youtubeId: "R5bXz4cS4pE",
  },
  {
    id: "daily-5",
    title: "Independent Living Skills",
    description: "Build independence with everyday tasks.",
    category: "daily",
    level: "Advanced",
    duration: "Video",
    youtubeId: "Kzv0qQwKJbE",
  },

  // -------------------- Music & Movement --------------------
  {
    id: "music-1",
    title: "Move! Dance Song",
    description: "Follow simple actions such as clapping and moving.",
    category: "music",
    level: "Beginner",
    duration: "Video",
    youtubeId: "VsgpUHUYuJI",
  },
  {
    id: "music-2",
    title: "Sing and Move Together",
    description: "Practice body movements and action words.",
    category: "music",
    level: "Beginner",
    duration: "Video",
    youtubeId: "gQb7vM9F1bw",
  },
  {
    id: "music-3",
    title: "The Wheels on the Bus",
    description: "Sing along and learn actions to a favorite song.",
    category: "music",
    level: "Beginner",
    duration: "Video",
    youtubeId: "e_04ZrNroTo",
  },
  {
    id: "music-4",
    title: "Rhythm & Beat Practice",
    description: "Learn rhythm, tempo and beat with fun songs.",
    category: "music",
    level: "Intermediate",
    duration: "Video",
    youtubeId: "hH7t0c3Xb9w",
  },
  {
    id: "music-5",
    title: "Musical Instruments Around the World",
    description: "Discover instruments from different cultures.",
    category: "music",
    level: "Advanced",
    duration: "Video",
    youtubeId: "Yq3t4E2NqMs",
  },

  // -------------------- Science & Discovery --------------------
  {
    id: "science-1",
    title: "Discover the Weather",
    description: "Explore sunny, rainy, cloudy and windy days.",
    category: "science",
    level: "Beginner",
    duration: "Video",
    youtubeId: "wTxBqPzZ7kM",
  },
  {
    id: "science-2",
    title: "Weather & Seasons",
    description: "Learn about spring, summer, fall and winter.",
    category: "science",
    level: "Beginner",
    duration: "Video",
    youtubeId: "B7FtnwSzPuo",
  },
  {
    id: "science-3",
    title: "A Journey Into Space",
    description: "Meet the Sun, Moon, planets and stars.",
    category: "science",
    level: "Intermediate",
    duration: "Video",
    youtubeId: "libKVRa01L8",
  },
  {
    id: "science-4",
    title: "The Solar System Explained",
    description: "Explore all eight planets and their unique features.",
    category: "science",
    level: "Intermediate",
    duration: "Video",
    youtubeId: "mQrlgH97v94",
  },
  {
    id: "science-5",
    title: "Physics for Kids",
    description: "Simple experiments to understand forces and motion.",
    category: "science",
    level: "Advanced",
    duration: "Video",
    youtubeId: "0T3eM5Yr0xg",
  },

  // -------------------- Communication --------------------
  {
    id: "communication-1",
    title: "Everyday Words",
    description: "Practice useful words with familiar objects and pictures.",
    category: "communication",
    level: "Beginner",
    duration: "Video",
    youtubeId: "s4HtG6-xBkU",
  },
  {
    id: "communication-2",
    title: "How to Ask for Help",
    description: "Practice simple phrases for expressing needs.",
    category: "communication",
    level: "Beginner",
    duration: "Video",
    youtubeId: "Nq6t6cTz4gU",
  },
  {
    id: "communication-3",
    title: "Greetings & Introductions",
    description: "Learn to say hello, name and greet friends.",
    category: "communication",
    level: "Beginner",
    duration: "Video",
    youtubeId: "Fj9C4eT4zpk",
  },
  {
    id: "communication-4",
    title: "Active Listening Skills",
    description: "Practice listening and responding thoughtfully.",
    category: "communication",
    level: "Intermediate",
    duration: "Video",
    youtubeId: "Tk2E2VgqCbc",
  },
  {
    id: "communication-5",
    title: "Public Speaking for Kids",
    description: "Build confidence with speaking in front of others.",
    category: "communication",
    level: "Advanced",
    duration: "Video",
    youtubeId: "Rz1eK5dq9wA",
  },

  // -------------------- Calm & Focus --------------------
  {
    id: "calm-1",
    title: "Belly Breathing for Kids",
    description: "Follow a gentle breathing activity at your own pace.",
    category: "calm",
    level: "Beginner",
    duration: "Video",
    youtubeId: "FvQq0zRw3aE",
  },
  {
    id: "calm-2",
    title: "A Quiet Mindful Moment",
    description: "Try a short, gentle relaxation and focus activity.",
    category: "calm",
    level: "Beginner",
    duration: "Video",
    youtubeId: "WvJ4d5w3yTY",
  },
  {
    id: "calm-3",
    title: "Calm Down Techniques",
    description: "Simple strategies to calm big feelings.",
    category: "calm",
    level: "Beginner",
    duration: "Video",
    youtubeId: "K1Qw3GqUcBs",
  },
  {
    id: "calm-4",
    title: "Yoga & Stretching",
    description: "Gentle yoga poses to improve focus and relax.",
    category: "calm",
    level: "Intermediate",
    duration: "Video",
    youtubeId: "1b5QhBdLUpY",
  },
  {
    id: "calm-5",
    title: "Advanced Mindfulness Meditation",
    description: "Practice longer, deeper meditation sessions.",
    category: "calm",
    level: "Advanced",
    duration: "Video",
    youtubeId: "inpok4MKVLM",
  },

  // -------------------- Safety & Hygiene --------------------
  {
    id: "safety-1",
    title: "Learning Safety Rules",
    description: "Learn simple safety rules with a friendly cartoon.",
    category: "safety",
    level: "Beginner",
    duration: "Video",
    youtubeId: "cFR7TPLoTqM",
  },
  {
    id: "safety-2",
    title: "Let's Wash Our Hands",
    description: "Learn the steps for clean and healthy hands.",
    category: "safety",
    level: "Beginner",
    duration: "Video",
    youtubeId: "aP5Dgq2W-8Y",
  },
  {
    id: "safety-3",
    title: "Brushing Your Teeth",
    description: "Learn the proper way to brush your teeth.",
    category: "safety",
    level: "Beginner",
    duration: "Video",
    youtubeId: "w5q5F5jL8nY",
  },
  {
    id: "safety-4",
    title: "Stranger Danger & Safety",
    description: "Learn how to stay safe around strangers.",
    category: "safety",
    level: "Intermediate",
    duration: "Video",
    youtubeId: "0w6P0YqTqWk",
  },
  {
    id: "safety-5",
    title: "Emergency Preparedness",
    description: "Understand what to do in an emergency.",
    category: "safety",
    level: "Advanced",
    duration: "Video",
    youtubeId: "R5b6r9QwKq0",
  },
];

const levels: Array<"All" | Level> = [
  "All",
  "Beginner",
  "Intermediate",
  "Advanced",
];

// =========================================================
// HELPERS
// =========================================================

function getEmbedUrl(video: LearningVideo) {
  const params = new URLSearchParams();
  if (video.startAt) params.set("start", String(video.startAt));
  if (video.playlistId) params.set("list", video.playlistId);
  const query = params.toString();
  return `https://www.youtube-nocookie.com/embed/${video.youtubeId}${
    query ? `?${query}` : ""
  }`;
}

function getThumbUrl(video: LearningVideo) {
  return `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`;
}

// =========================================================
// SPACE BACKGROUND
// =========================================================

function SpaceBackground() {
  const stars = useMemo(
    () =>
      Array.from({ length: 120 }).map((_, i) => ({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: Math.random() * 2.5 + 1,
        delay: Math.random() * 4,
        duration: Math.random() * 3 + 2,
      })),
    []
  );

  const planets = [
    { size: 220, top: "8%", left: "-5%", from: "#7c3aed", to: "#1e1b4b" },
    { size: 160, top: "60%", left: "92%", from: "#0891b2", to: "#0f172a" },
    { size: 100, top: "85%", left: "3%", from: "#db2777", to: "#4c1d95" },
    { size: 80, top: "22%", left: "85%", from: "#f59e0b", to: "#7c2d12" },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#1e1b4b_0%,#0b0720_45%,#04030e_100%)]" />
      <div className="absolute top-0 left-1/4 w-[700px] h-[700px] rounded-full bg-purple-600/20 blur-[120px]" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] rounded-full bg-cyan-500/15 blur-[120px]" />
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full bg-pink-500/15 blur-[100px]" />

      {stars.map((s) => (
        <motion.div
          key={s.id}
          className="absolute rounded-full bg-white"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: s.size,
            height: s.size,
            boxShadow: "0 0 6px 2px rgba(255,255,255,0.6)",
          }}
          animate={{ opacity: [0.2, 1, 0.2], scale: [1, 1.4, 1] }}
          transition={{
            duration: s.duration,
            repeat: Infinity,
            delay: s.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {planets.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            top: p.top,
            left: p.left,
            background: `radial-gradient(circle at 30% 30%, ${p.from}, ${p.to})`,
            boxShadow: `0 0 60px 20px ${p.from}40, inset -20px -20px 40px rgba(0,0,0,0.5)`,
          }}
          animate={{ y: [0, -25, 0], rotate: [0, 360] }}
          transition={{
            y: { duration: 8 + i, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 60 + i * 20, repeat: Infinity, ease: "linear" },
          }}
        />
      ))}

      <motion.div
        className="absolute h-0.5 w-32 bg-gradient-to-r from-white via-white/60 to-transparent rounded-full"
        style={{ top: "25%", left: "10%" }}
        animate={{ x: [0, 700], y: [0, 300], opacity: [0, 1, 0] }}
        transition={{ duration: 4, repeat: Infinity, repeatDelay: 8, ease: "easeOut" }}
      />
    </div>
  );
}

// =========================================================
// MAIN COMPONENT
// =========================================================

export default function VideoCategories() {
  const [activeCategory, setActiveCategory] = useState("abc");
  const [search, setSearch] = useState("");
  const [level, setLevel] = useState<"All" | Level>("All");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [completed, setCompleted] = useState<string[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<LearningVideo | null>(null);
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [calmMode, setCalmMode] = useState(false);

  const currentCategory = categories.find((item) => item.id === activeCategory);

  const filteredVideos = useMemo(() => {
    const query = search.trim().toLowerCase();

    return videos.filter((video) => {
      const matchesCategory = video.category === activeCategory;
      const matchesLevel = level === "All" || video.level === level;
      const matchesSearch =
        !query ||
        video.title.toLowerCase().includes(query) ||
        video.description.toLowerCase().includes(query);
      const matchesFavorites = !favoritesOnly || favorites.includes(video.id);

      return matchesCategory && matchesLevel && matchesSearch && matchesFavorites;
    });
  }, [activeCategory, level, search, favoritesOnly, favorites]);

  function toggleFavorite(id: string) {
    setFavorites((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  }

  function markCompleted(id: string) {
    setCompleted((current) =>
      current.includes(id) ? current : [...current, id]
    );
  }

  function openCategory(id: string) {
    setActiveCategory(id);
    setSearch("");
    setLevel("All");
    setFavoritesOnly(false);
    setSelectedVideo(null);
  }

  return (
    <div className="relative min-h-screen text-white">
      <SpaceBackground />

      <div className="relative z-10">
        <main className={`video-page ${calmMode ? "calm-mode" : ""}`}>
          <div className="video-page-inner">
            {/* HERO */}
            <motion.header
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="video-hero"
            >
              <div className="hero-copy">
                <div className="eyebrow">
                  <Sparkles size={15} /> WONDERLEARN · WATCH & LEARN
                </div>
                <h1>
                  Explore, watch
                  <br />
                  <span>and learn!</span>
                </h1>
                <p>
                  Discover new things through friendly videos, colorful visuals,
                  and fun learning moments.
                </p>
                <div className="hero-stats">
                  <div className="hero-stat">
                    <span className="stat-number">{categories.length}</span>
                    <span className="stat-label">Categories</span>
                  </div>
                  <div className="stat-divider" />
                  <div className="hero-stat">
                    <span className="stat-number">{completed.length}</span>
                    <span className="stat-label">Completed</span>
                  </div>
                  <div className="stat-divider" />
                  <div className="hero-stat">
                    <span className="stat-number">{favorites.length}</span>
                    <span className="stat-label">Favorites</span>
                  </div>
                </div>
              </div>

              <div className="hero-art" aria-hidden="true">
                <div className="hero-orbit orbit-one" />
                <div className="hero-orbit orbit-two" />
                <motion.div
                  className="hero-play"
                  animate={{ y: [0, -8, 0], rotate: [-7, -3, -7] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Rocket size={38} />
                </motion.div>
                <span className="floating-letter letter-a">A</span>
                <span className="floating-letter letter-b">B</span>
                <span className="floating-letter letter-c">C</span>
                <span className="floating-star star-one">✦</span>
                <span className="floating-star star-two">✧</span>
              </div>
            </motion.header>

            {/* CATEGORIES */}
            <section className="category-section">
              <div className="section-heading">
                <div>
                  <span className="section-kicker">FIND YOUR FAVORITE</span>
                  <h2>Learning categories</h2>
                </div>
                <span className="category-count">{categories.length} topics</span>
              </div>

              <div className="category-grid">
                {categories.map((category, index) => {
                  const Icon = category.icon;
                  const count = videos.filter(
                    (video) => video.category === category.id
                  ).length;
                  const active = activeCategory === category.id;

                  return (
                    <motion.button
                      key={category.id}
                      type="button"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.04 }}
                      whileHover={{ y: -6, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`category-card accent-${category.color} ${
                        active ? "category-active" : ""
                      }`}
                      onClick={() => openCategory(category.id)}
                      aria-pressed={active}
                    >
                      <span className="category-icon">
                        <Icon size={23} />
                      </span>
                      <span className="category-card-content">
                        <span className="category-title">{category.title}</span>
                        <span className="category-description">
                          {category.description}
                        </span>
                        <span className="category-bottom">
                          {count} videos <ChevronRight size={15} />
                        </span>
                      </span>
                    </motion.button>
                  );
                })}
              </div>
            </section>

            {/* VIDEO LIBRARY */}
            <section className="video-library">
              <div className="section-heading library-heading">
                <div>
                  <span className="section-kicker">YOUR NEXT ADVENTURE</span>
                  <h2>{currentCategory?.title}</h2>
                  <p className="library-subtitle">
                    {currentCategory?.description}
                  </p>
                </div>
                <button
                  type="button"
                  className={`utility-button ${
                    favoritesOnly ? "utility-active" : ""
                  }`}
                  onClick={() => setFavoritesOnly((v) => !v)}
                  aria-pressed={favoritesOnly}
                >
                  <Heart size={16} /> Favorites
                </button>
              </div>

              <div className="video-controls">
                <label className="search-box">
                  <Search size={18} />
                  <input
                    type="search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search videos..."
                    aria-label="Search videos"
                  />
                  {search && (
                    <button
                      type="button"
                      className="clear-search"
                      onClick={() => setSearch("")}
                      aria-label="Clear search"
                    >
                      <X size={15} />
                    </button>
                  )}
                </label>

                <div className="level-filters" aria-label="Filter by level">
                  {levels.map((item) => (
                    <button
                      type="button"
                      key={item}
                      className={`level-chip ${
                        level === item ? "level-selected" : ""
                      }`}
                      onClick={() => setLevel(item)}
                      aria-pressed={level === item}
                    >
                      {item}
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  className={`utility-button calm-toggle ${
                    calmMode ? "utility-active" : ""
                  }`}
                  onClick={() => setCalmMode((v) => !v)}
                  aria-pressed={calmMode}
                >
                  <Brain size={16} /> Calm mode
                </button>
              </div>

              <div className="results-line">
                <span>
                  Showing <strong>{filteredVideos.length}</strong> videos
                </span>
                {calmMode && (
                  <span className="calm-note">
                    Calm mode enabled · reduced motion
                  </span>
                )}
              </div>

              {filteredVideos.length ? (
                <div className="video-grid">
                  {filteredVideos.map((video, index) => {
                    const favorite = favorites.includes(video.id);
                    const done = completed.includes(video.id);

                    return (
                      <motion.article
                        key={video.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.04 }}
                        className="video-card"
                      >
                        <button
                          type="button"
                          className="video-thumbnail"
                          onClick={() => setSelectedVideo(video)}
                          aria-label={`Open ${video.title}`}
                        >
                          <img
                            src={getThumbUrl(video)}
                            alt=""
                            loading="lazy"
                            onError={(e) => {
                              e.currentTarget.style.display = "none";
                            }}
                          />
                          <span className="thumbnail-play">
                            <Play size={20} fill="currentColor" />
                          </span>
                          <span className="duration-badge">
                            <Clock3 size={12} />
                            {video.duration}
                          </span>
                          {done && (
                            <span className="completed-badge">
                              <CheckCircle2 size={13} /> Completed
                            </span>
                          )}
                        </button>

                        <div className="video-card-body">
                          <div className="video-card-meta">
                            <span className="level-badge">{video.level}</span>
                            <button
                              type="button"
                              className={`favorite-button ${
                                favorite ? "is-favorite" : ""
                              }`}
                              onClick={() => toggleFavorite(video.id)}
                              aria-label={
                                favorite ? "Remove favorite" : "Add favorite"
                              }
                              aria-pressed={favorite}
                            >
                              <Heart
                                size={18}
                                fill={favorite ? "currentColor" : "none"}
                              />
                            </button>
                          </div>
                          <h3>{video.title}</h3>
                          <p>{video.description}</p>
                          <button
                            type="button"
                            className="watch-link"
                            onClick={() => setSelectedVideo(video)}
                          >
                            Watch video
                            <ChevronRight size={16} />
                          </button>
                        </div>
                      </motion.article>
                    );
                  })}
                </div>
              ) : (
                <div className="empty-state">
                  <span className="empty-icon">
                    <Search size={26} />
                  </span>
                  <h3>No videos found</h3>
                  <p>Try another search or change your filters.</p>
                  <button
                    type="button"
                    className="primary-button"
                    onClick={() => {
                      setSearch("");
                      setLevel("All");
                      setFavoritesOnly(false);
                    }}
                  >
                    Clear filters
                  </button>
                </div>
              )}
            </section>

            <footer className="video-footer">
              <Sparkles size={15} /> Every little step is a big achievement. Keep
              learning!
            </footer>
          </div>

          {/* MODAL */}
          <AnimatePresence>
            {selectedVideo && (
              <motion.div
                className="video-modal-backdrop"
                role="presentation"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onMouseDown={(e) => {
                  if (e.target === e.currentTarget) setSelectedVideo(null);
                }}
              >
                <motion.section
                  className="video-modal"
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="modal-video-title"
                  initial={{ scale: 0.9, opacity: 0, y: 20 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  transition={{ type: "spring", duration: 0.3 }}
                >
                  <header className="modal-header">
                    <div>
                      <span className="section-kicker">WATCH & LEARN</span>
                      <h2 id="modal-video-title">{selectedVideo.title}</h2>
                    </div>
                    <button
                      type="button"
                      className="modal-close"
                      onClick={() => setSelectedVideo(null)}
                      aria-label="Close video"
                    >
                      <X size={22} />
                    </button>
                  </header>

                  <div className="modal-player">
                    <iframe
                      key={selectedVideo.id}
                      className="youtube-player"
                      src={getEmbedUrl(selectedVideo)}
                      title={selectedVideo.title}
                      allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    />
                  </div>

                  <div className="modal-details">
                    <div className="modal-description">
                      <span className="level-badge">{selectedVideo.level}</span>
                      <p>{selectedVideo.description}</p>
                    </div>
                    <div className="modal-actions">
                      <button
                        type="button"
                        className={`utility-button ${
                          favorites.includes(selectedVideo.id)
                            ? "utility-active"
                            : ""
                        }`}
                        onClick={() => toggleFavorite(selectedVideo.id)}
                      >
                        <Heart
                          size={16}
                          fill={
                            favorites.includes(selectedVideo.id)
                              ? "currentColor"
                              : "none"
                          }
                        />
                        {favorites.includes(selectedVideo.id) ? "Saved" : "Save"}
                      </button>
                      <button
                        type="button"
                        className="primary-button"
                        onClick={() => markCompleted(selectedVideo.id)}
                      >
                        <CheckCircle2 size={17} />
                        {completed.includes(selectedVideo.id)
                          ? "Completed"
                          : "Mark as completed"}
                      </button>
                    </div>
                  </div>

                  <div className="learning-prompt">
                    <span className="prompt-icon">
                      <Sparkles size={17} />
                    </span>
                    <p>
                      <strong>Let's practice!</strong> Pause when needed and talk
                      about what you learned together.
                    </p>
                  </div>
                </motion.section>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}