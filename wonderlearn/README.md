# WonderLearn ✨

**AI-Powered Personalized Learning Platform** — a polished frontend prototype
for a children's learning app (ages 5–18) supporting Intellectual Disability
(ID), Down Syndrome (DS), and ADHD learning profiles.

This is an **educational support tool, not a diagnostic or medical
application.**

## Quick start

```bash
npm install
npm run dev
```

Then open the printed local URL. The whole app is navigable with mock data —
no backend required.

```bash
npm run build     # production build → dist/
npm run preview   # preview the production build
```

## What's inside

- **React 19 + TypeScript + Vite** with the `@` path alias pointing at `src/`
- **Tailwind CSS v4** — theme tokens (Wonder Garden palette, Fredoka/Plus
  Jakarta Sans type) live in `src/index.css` under `@theme`
- **Framer Motion** for page transitions, hover/tap micro-interactions, and
  ambient background motion (clouds, stars, butterflies) — respects
  `prefers-reduced-motion`
- **Phaser.js** — a reusable mini-game container (`components/game/PhaserGameContainer.tsx`)
  used on the Activity screen; swap in real game logic per `gameType` later
- **Recharts** — weekly progress chart on the Progress page
- **Zustand** — `stores/` (auth, child profile, learning session,
  accessibility, gamification)
- **TanStack Query** — `services/queries.ts` for activities, worlds,
  progress, achievements, AI recommendations
- **React Router** — all routes from the brief are wired in `App.tsx`

## Project structure

```
src/
├── components/
│   ├── backgrounds/   # CloudBackground (auth/universe), GardenBackground (main app)
│   ├── game/          # PhaserGameContainer
│   ├── layout/         # AppShell, Navigation, AccessibilityBar
│   └── ui/             # Button, Card, ProgressBar, Avatar, Badge, Stepper,
│                        # Modal, AudioButton, HintButton, *Card components
├── pages/
│   ├── auth/            # Login, Register (5-step wizard)
│   ├── onboarding/       # Welcome (Lumi the guide)
│   ├── dashboard/        # Dashboard, Achievements
│   ├── learning/         # Subjects, WorldDetail, Activity
│   ├── progress/         # Progress
│   └── profile/          # Profile, Settings
├── stores/              # Zustand stores
├── services/            # aiService.ts (mock AI contract), queries.ts (TanStack Query)
├── lib/                 # mockData.ts, cn.ts
└── types/                # shared domain types

server/        # Express + TypeScript + MongoDB/Mongoose scaffold (not implemented)
ai-service/    # FastAPI + BKT/scikit-learn/PyTorch scaffold (not implemented)
```

## Connecting the real backend later

The frontend already calls a stable service contract:

- `src/services/aiService.ts` — swap the mock bodies for real `fetch` calls to
  `GET /api/ai/recommendation`, `GET /api/ai/next-activity`,
  `POST /api/ai/analyze-performance`, `GET /api/ai/mastery`, etc.
- `src/services/queries.ts` — swap the mock data with real REST calls; the
  TanStack Query cache keys are already in place.
- `server/` mirrors the Node/Express/Mongo structure the app expects
  (`Child`, `LearningProfile`, `Attempt` Mongoose schemas included).
- `ai-service/` mirrors the FastAPI structure for the ML/BKT service.

## Product principle baked into the data model

Condition (ID / DS / ADHD) only sets an **initial support configuration** —
never a fixed ability ceiling. Difficulty and pacing are meant to move based
on observed performance (see `AttemptResult` in `src/types/index.ts` and the
adaptive UI states on the Activity screen).

## Accessibility

- Reduced-motion respected globally (`prefers-reduced-motion`)
- Visible focus rings, semantic HTML, ARIA labels on interactive elements
- In-app accessibility panel (bottom-right ♿ button): read-aloud, text size,
  contrast, animation toggle, sound toggle, reduce-distractions
