# TempleFit

**Your body is a temple. Maintain it.**

A free fitness web app for working dads: workouts by muscle group, time-boxed
routines, flexibility training, physio exercises for common desk-dad
complaints, and high-protein/high-fiber recipes with meal-prep plans. All
content is hand-curated - no AI at runtime, no account, no paywall.

The centerpiece is an **interactive SVG muscle map** (front/back) - tap any of
16 muscle groups to see the exercises that build it, the stretches that free
it, and the physio moves that fix it. Every exercise page highlights the
primary/secondary muscles worked on a mini body diagram.

## Stack

- **Next.js 16** (App Router) + TypeScript + Tailwind CSS v4
- Fully static (SSG) - ~173 pre-rendered pages, one serverless route
  (`/api/waitlist`, a logging stub for the Phase 2 waitlist)
- Content lives in typed data modules under `src/data/`, enforced by a
  build-time validator (`scripts/validate-data.ts`, runs in `prebuild`)
- Progress (favorites, streaks, meal plans) persists in `localStorage` -
  no backend, no tracking

## Develop

```bash
npm install
npm run dev        # http://localhost:3000
npm run check      # validate data + typecheck + lint + production build
```

## Content model

| Collection | File | Count |
|---|---|---|
| Muscle groups | `src/data/muscles.ts` | 16 |
| Exercises | `src/data/exercises.ts` | 48 |
| Stretches | `src/data/stretches.ts` | 24 |
| Physio moves + complaints | `src/data/physio.ts` | 18 + 6 |
| Routines | `src/data/routines.ts` | 9 |
| Recipes | `src/data/recipes.ts` | 26 |
| Meal prep plans | `src/data/mealPrepPlans.ts` | 4 |

The body-map geometry (hand-authored SVG paths, mirrored for symmetry) lives
in `src/components/body-map/geometry.ts`.

## Phase 2 (planned)

**Posture AI** - paid personalized programs generated from posture photos and
a short questionnaire. Phase 1 ships the teaser page (`/posture-ai`) with an
email waitlist; swap the log line in `src/app/api/waitlist/route.ts` for a
real store when it lands.
