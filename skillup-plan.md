# SkillUp – AI Career Copilot · Implementation Plan

## Top-Level Overview

**Goal:** Build a fully client-side, single-page React application (Vite + Tailwind CSS) that acts as an AI career assistant for students. No backend. All "AI" logic is rule-based mock intelligence with typing animations. State persists via `localStorage`. The app covers the complete problem statement: profile input → career analysis → skill gap → learning roadmap → IBM SkillsBuild recommendations → mock interview → feedback → job-readiness score.

**Scope:**
- React 18 + Vite (bootstrapped via `npm create vite@latest`)
- Tailwind CSS for styling (dark futuristic theme, glassmorphism cards, neon-blue accents)
- React Router v6 for multi-page navigation
- `localStorage` for persistence
- All AI responses: rule-based deterministic logic + simulated typing animation
- No external API calls, no backend, no database

**Non-Goals:**
- Real LLM/AI API integration (designed to be plugged in later)
- User authentication / multi-user support
- Backend, server, or deployment infrastructure

---

## Architecture

```
src/
  main.jsx                  – Vite entry point
  App.jsx                   – Router + global layout wrapper
  index.css                 – Tailwind directives + custom CSS variables

  data/                     – All static mock data (pure JS objects)
    careers.js              – Career paths with required skills
    courses.js              – IBM SkillsBuild course catalog (mock)
    interviewQuestions.js   – Question bank keyed by career
    roadmaps.js             – Learning roadmap templates per career

  context/
    AppContext.jsx           – React Context + localStorage sync (global state)

  engine/
    careerEngine.js          – Rule-based: score careers from student skills
    gapEngine.js             – Rule-based: diff student skills vs. career skills
    roadmapEngine.js         – Rule-based: build roadmap from gap list
    interviewEngine.js       – Rule-based: evaluate answers, score readiness
    courseEngine.js          – Rule-based: filter courses from gap list

  components/
    Layout/
      Navbar.jsx
      Sidebar.jsx
      PageWrapper.jsx
    UI/
      GlassCard.jsx
      TypingText.jsx          – Animated typing effect component
      ProgressBar.jsx
      SkillBadge.jsx
      ScoreGauge.jsx
      Button.jsx
      Modal.jsx

  pages/
    Landing.jsx               – Intro + "Get Started" CTA
    Profile.jsx               – Student skill & background form
    Dashboard.jsx             – Career analysis overview
    CareerRecommendations.jsx – Ranked career path cards
    SkillGap.jsx              – Gap visualization per chosen career
    Roadmap.jsx               – Phase-by-phase learning plan
    Courses.jsx               – IBM SkillsBuild course cards
    Interview.jsx             – Mock interview Q&A
    Feedback.jsx              – Per-answer evaluation + tips
    ReadinessScore.jsx        – Aggregated job-readiness gauge + summary

  hooks/
    useTypingEffect.js        – Reusable hook for typing animation
    useLocalStorage.js        – Thin wrapper around localStorage

  utils/
    helpers.js                – Shared pure functions (capitalize, clamp, etc.)
```

---

## Data Models

### Student Profile (localStorage key: `skillup_profile`)
```json
{
  "name": "string",
  "email": "string",
  "degree": "string",
  "year": "string",
  "skills": ["string"],          // selected from predefined skill list
  "experience": "string",        // none / internship / part-time
  "interests": ["string"]        // selected career interest tags
}
```

### Selected Career (localStorage key: `skillup_selectedCareer`)
```json
{ "id": "string", "title": "string" }
```

### Interview Session (localStorage key: `skillup_interview`)
```json
{
  "career": "string",
  "questions": [{ "id": "string", "text": "string" }],
  "answers": { "questionId": "string" },
  "feedback": { "questionId": { "score": 0, "tip": "string" } },
  "completed": false
}
```

### Readiness Score (localStorage key: `skillup_score`)
```json
{
  "overall": 0,
  "breakdown": {
    "skillMatch": 0,
    "gapCoverage": 0,
    "interviewPerformance": 0
  }
}
```

---

## Sub-Tasks

---

### Sub-Task 1 — Project Scaffolding & Design System

**Status:** [x] done

**Intent:** Bootstrap the Vite + React project, configure Tailwind with the dark futuristic theme tokens, set up React Router, create the global AppContext, and build all reusable UI primitives. This establishes the foundation every other sub-task builds on.

**Expected Outcomes:**
- `npm install && npm run dev` opens a dark-themed shell with Navbar, Sidebar, and placeholder page content
- All shared UI components (GlassCard, Button, TypingText, ProgressBar, SkillBadge, ScoreGauge, Modal) are present and visually styled
- `useLocalStorage` and `useTypingEffect` hooks are working
- AppContext is wired into the app with localStorage sync
- React Router routes are defined for all 10 pages (displaying stubs)

**Todo List:**
1. Run `npm create vite@latest skillup -- --template react` to scaffold the project
2. Install dependencies: `tailwindcss`, `@tailwindcss/vite`, `react-router-dom`
3. Configure `tailwind.config.js` — extend theme with color tokens (`neon-blue: #00d4ff`, `dark-bg: #0a0a0f`, `glass` variants), add `backgroundImage` for gradient utilities
4. Write `src/index.css` — Tailwind directives, CSS custom properties, custom scrollbar, glassmorphism utility class
5. Build `useLocalStorage.js` hook
6. Build `useTypingEffect.js` hook (character-by-character append with configurable speed)
7. Build `AppContext.jsx` — holds `profile`, `selectedCareer`, `interviewSession`, `readinessScore`; syncs each to localStorage on change
8. Build Layout components: `Navbar.jsx` (logo + progress breadcrumb), `Sidebar.jsx` (nav links with icons), `PageWrapper.jsx` (centered content area)
9. Build UI primitives: `GlassCard.jsx`, `Button.jsx`, `ProgressBar.jsx`, `SkillBadge.jsx`, `TypingText.jsx`, `ScoreGauge.jsx`, `Modal.jsx`
10. Write `App.jsx` — BrowserRouter + Route definitions for all 10 pages (stub components for pages not yet built)
11. Write `src/main.jsx` — mount App + wrap with AppProvider

**Relevant Context:** All subsequent sub-tasks import from this foundation. The Tailwind config color tokens are referenced throughout. AppContext is the single source of truth.

---

### Sub-Task 2 — Static Data Layer

**Status:** [x] done

**Intent:** Populate all mock data files that the rule-based engines and UI pages consume. This is the "knowledge base" of the app.

**Expected Outcomes:**
- `src/data/careers.js` exports at least 6 career paths, each with `id`, `title`, `description`, `icon`, `requiredSkills[]`, and `salaryRange`
- `src/data/courses.js` exports 20+ IBM SkillsBuild mock courses, each with `id`, `title`, `provider`, `duration`, `level`, `skillsCovered[]`, `url`, and `badge`
- `src/data/interviewQuestions.js` exports 5–7 questions per career path, keyed by career `id`
- `src/data/roadmaps.js` exports a roadmap template per career: phases (Foundation / Intermediate / Advanced), each phase containing resources and milestone descriptions

**Todo List:**
1. Write `careers.js` — include: Software Developer, AI/ML Engineer, Data Analyst, Cybersecurity Analyst, Cloud Engineer, UX Designer. Each entry has `requiredSkills` array (15–20 skills) drawn from a shared master skill list.
2. Write `courses.js` — 20–25 entries. Map each course to the skills it covers using the same master skill list. Use realistic IBM SkillsBuild titles (e.g. "Introduction to Artificial Intelligence", "Cybersecurity Fundamentals").
3. Write `interviewQuestions.js` — 6 questions per career. Mix of conceptual, behavioral, and technical question types. Include `expectedKeywords[]` per question for the scoring engine.
4. Write `roadmaps.js` — 3-phase roadmap per career. Each phase: `title`, `duration`, `goals[]`, `resources[]` (linked to course IDs).

**Relevant Context:** The master skill list must be consistent across `careers.js`, `courses.js`, and the Profile page skill selector. Career IDs used in `interviewQuestions.js` and `roadmaps.js` must match those in `careers.js`.

---

### Sub-Task 3 — Rule-Based AI Engines

**Status:** [x] done

**Intent:** Implement the four pure-function engine modules that perform all "AI" logic. These are intentionally designed as plain JS modules (no framework) so they can later be swapped for real LLM calls.

**Expected Outcomes:**
- `careerEngine.js` — given student skills + interests, returns careers sorted by match percentage
- `gapEngine.js` — given student skills + chosen career, returns missing skills with priority labels (High / Medium / Low)
- `roadmapEngine.js` — given gap list + career, returns a structured multi-phase roadmap with course references
- `interviewEngine.js` — given an answer string + expected keywords, returns `{ score: 0–10, feedback: string, tip: string }`
- `courseEngine.js` — given gap list, returns filtered + ranked courses from `courses.js`
- A single exported `calculateReadinessScore(profile, career, interviewSession)` function that blends skill match + gap coverage + interview performance into a 0–100 score

**Todo List:**
1. Write `careerEngine.js`:
   - `scoreCareer(studentSkills, career)` — count intersection of student skills vs. `career.requiredSkills`, divide by total required, multiply by 100
   - `rankCareers(studentSkills, interests, careers)` — apply score + interest boost (+10 if career interest is selected), return sorted array with `matchPercent`
2. Write `gapEngine.js`:
   - `getSkillGap(studentSkills, career)` — return skills in `career.requiredSkills` not in `studentSkills`
   - `prioritizeGaps(gapSkills, career)` — label each missing skill High/Medium/Low based on position in the required skills array (first third = High, etc.)
3. Write `roadmapEngine.js`:
   - `buildRoadmap(gapSkills, careerId)` — load the template from `roadmaps.js`, filter/augment phases based on which gap skills fall in each phase, return enriched roadmap
4. Write `courseEngine.js`:
   - `recommendCourses(gapSkills)` — filter courses where `skillsCovered` intersects `gapSkills`, sort by coverage count descending, return top 8
5. Write `interviewEngine.js`:
   - `evaluateAnswer(answer, question)` — check how many `expectedKeywords` appear in the lowercased answer, compute keyword hit rate, map to 0–10 score, generate a template feedback string
   - `generateFeedback(answers, questions)` — bulk-evaluate, return array of per-question results
6. Write `scoreEngine.js` (or add to `helpers.js`):
   - `calculateReadinessScore(skillMatchPercent, gapCount, totalRequired, interviewAvgScore)` — weighted formula: skill match 40%, gap coverage 30%, interview 30%

**Relevant Context:** These functions are pure (no side-effects, no React). They are called from page components via AppContext dispatch or direct import. This clean separation means swapping mock logic for a real API only requires editing these files.

---

### Sub-Task 4 — Landing Page & Student Profile Pages

**Status:** [x] done

**Intent:** Build the entry flow — the visually impactful landing page and the profile form where the student inputs their skills, background, and interests.

**Expected Outcomes:**
- `Landing.jsx` — hero section with animated tagline (TypingText), feature highlights, and a "Start Your Journey" CTA that routes to `/profile`
- `Profile.jsx` — form with: name, email, degree, year, multi-select skill picker (checkbox grid from master skill list), experience level, interest tags. On submit, saves to AppContext and routes to `/dashboard`
- Profile data pre-fills from localStorage on revisit

**Todo List:**
1. Build `Landing.jsx` — full-screen hero, animated TypingText tagline ("Your AI-Powered Career Copilot"), 4 feature cards (GlassCard), CTA button
2. Build `Profile.jsx`:
   - Personal info fields (name, email, degree, year) as text/select inputs
   - Skill multi-select grid — categorized (Programming, Data, Cloud, Security, Soft Skills); each skill is a toggle-able SkillBadge
   - Experience level radio group
   - Interest tag checkboxes (matches career titles)
   - "Analyze My Career" submit button — validates at least 3 skills selected, saves profile to context, navigates to `/dashboard`
3. Add form pre-population logic from `AppContext.profile`

**Relevant Context:** The skill list in `Profile.jsx` must use the same master skill list defined in Sub-Task 2. The `interests` field values must match career IDs for the interest boost in `careerEngine.js`.

---

### Sub-Task 5 — Dashboard & Career Recommendations Pages

**Status:** [x] done

**Intent:** Build the post-profile analysis screens: the overview dashboard and the ranked career recommendation cards.

**Expected Outcomes:**
- `Dashboard.jsx` — shows student name, a TypingText "AI is analyzing..." intro sequence, then reveals summary cards (top career match, skill count, readiness preview). Links to all other sections.
- `CareerRecommendations.jsx` — shows career cards ranked by match %, each with title, match percent bar, required skills preview, and "Select This Career" button. Selecting a career saves it to AppContext.

**Todo List:**
1. Build `Dashboard.jsx`:
   - On mount, call `rankCareers()` with profile data, store results in local state
   - Show animated "Analyzing profile…" TypingText for 1.5s then reveal cards
   - Summary row: top matched career, skills count, a teaser readiness score
   - Quick-nav grid: 6 cards linking to each feature section
2. Build `CareerRecommendations.jsx`:
   - Map ranked careers to GlassCards
   - Each card: career icon, title, match percent, ProgressBar, top 5 required skills as SkillBadges, "Select Career" button
   - Selecting a career updates `AppContext.selectedCareer` and navigates to `/skill-gap`
   - Already-selected career is highlighted with neon border

**Relevant Context:** Uses `careerEngine.rankCareers()`. Requires `AppContext.profile` to be populated (redirect to `/profile` if not).

---

### Sub-Task 6 — Skill Gap & Learning Roadmap Pages

**Status:** [x] done

**Intent:** Show the student exactly which skills they are missing for their chosen career and present a phased learning plan.

**Expected Outcomes:**
- `SkillGap.jsx` — visual breakdown of owned vs. missing skills, missing skills color-coded by priority (High = red, Medium = yellow, Low = green), summary stats
- `Roadmap.jsx` — phase cards (Foundation → Intermediate → Advanced), each with goals, timeline, and linked course chips. Progress can be toggled per phase.

**Todo List:**
1. Build `SkillGap.jsx`:
   - Call `gapEngine.getSkillGap()` and `prioritizeGaps()` on mount
   - Two-column layout: "You Have" skills (green SkillBadges) vs. "You Need" skills (priority-colored SkillBadges)
   - Donut/ring chart (CSS-only or a simple SVG) showing match percentage
   - CTA: "Build My Roadmap" → `/roadmap`
2. Build `Roadmap.jsx`:
   - Call `roadmapEngine.buildRoadmap()` on mount
   - Three phase cards with expand/collapse
   - Each phase: goal list, resource chips (linked to course IDs), milestone badge
   - Phase completion toggle stored in localStorage
   - CTA: "View Recommended Courses" → `/courses`

**Relevant Context:** Uses `gapEngine` and `roadmapEngine`. Requires `AppContext.selectedCareer`. The phase completion state key: `skillup_roadmap_progress`.

---

### Sub-Task 7 — IBM SkillsBuild Courses & Mock Interview Pages

**Status:** [x] done

**Intent:** Display curated course recommendations and run the mock interview session.

**Expected Outcomes:**
- `Courses.jsx` — grid of recommended course cards filtered to the student's gap skills, each with title, level badge, duration, skills covered chips, and a mock "Enroll" link
- `Interview.jsx` — sequential Q&A: one question displayed at a time with a textarea for the answer, progress indicator, and "Submit Answer" / "Next Question" flow. Final question triggers navigation to `/feedback`.

**Todo List:**
1. Build `Courses.jsx`:
   - Call `courseEngine.recommendCourses()` on mount
   - 2–3 column responsive grid of GlassCards
   - Each card: course title, IBM SkillsBuild logo badge, level pill (Beginner/Intermediate/Advanced), duration, skill chips, "View Course" button (mock href)
   - Filter bar: All / Beginner / Intermediate / Advanced
2. Build `Interview.jsx`:
   - On mount, load questions for `selectedCareer` from `interviewQuestions.js`, store in `AppContext.interviewSession`
   - Show one question at a time with a question number indicator and progress bar
   - Textarea for answer (min 20 chars to enable submit)
   - "Submit Answer" saves answer to context, advances to next question
   - After last question, navigate to `/feedback`
   - "Skip" option allowed (empty answer stored, scored 0)

**Relevant Context:** `courseEngine.recommendCourses()` needs `gapEngine` output. Interview state persists in `AppContext.interviewSession` (localStorage key `skillup_interview`).

---

### Sub-Task 8 — Feedback & Job Readiness Score Pages

**Status:** [x] done

**Intent:** Complete the student journey by showing per-answer interview feedback and an aggregated job-readiness score with actionable insights.

**Expected Outcomes:**
- `Feedback.jsx` — per-question accordion: original question, student answer, AI score (0–10), keyword analysis, improvement tip rendered with TypingText animation
- `ReadinessScore.jsx` — large animated ScoreGauge (0–100), breakdown bars (Skill Match, Gap Coverage, Interview Performance), personalized summary paragraph, share/download button (mock)

**Todo List:**
1. Build `Feedback.jsx`:
   - On mount, call `interviewEngine.generateFeedback()` on stored answers
   - Save results to `AppContext` and localStorage
   - Accordion list of questions — expand to see score, answer, and TypingText tip
   - Color-coded score chips (0–4 red, 5–7 yellow, 8–10 green)
   - "Calculate My Score" CTA → `/readiness`
2. Build `ReadinessScore.jsx`:
   - Call `calculateReadinessScore()` on mount, save to context
   - Animated ScoreGauge (SVG circle stroke animation)
   - Three breakdown ProgressBars with labels
   - TypingText summary paragraph generated from score range ("You are ready for entry-level roles…")
   - Action cards: "Improve Score" (→ roadmap), "Retry Interview" (→ interview), "Download Report" (mock alert)

**Relevant Context:** Uses `interviewEngine` and `scoreEngine`. Requires both `interviewSession` and `selectedCareer` to be present.

---

### Sub-Task 9 — Navigation Polish, Responsiveness & Final QA

**Status:** [x] done

**Intent:** Wire all pages together cleanly, ensure mobile responsiveness, add route guards, and polish any rough UI edges for a demo-ready application.

**Expected Outcomes:**
- All routes navigate correctly with no broken links
- Route guards redirect unauthenticated/incomplete flows to the correct page
- Sidebar collapses to hamburger menu on mobile
- All pages are readable and functional on 375px wide screens
- Dark theme is consistent across all pages (no white flash, correct scrollbar, consistent spacing)
- `README.md` documents how to install and run the project

**Todo List:**
1. Add route guards: if `profile` is empty → redirect to `/profile`; if `selectedCareer` is empty → redirect to `/career-recommendations`; if `interviewSession.completed` is false → redirect to `/interview` before allowing `/feedback` or `/readiness`
2. Make `Sidebar.jsx` responsive — collapse on `md` breakpoint, toggle via hamburger icon state
3. Audit all pages for mobile layout issues (stacked columns, overflow text, touch target sizes)
4. Add a `Navbar` breadcrumb that shows current step (1 of 10 style progress)
5. Ensure consistent use of Tailwind spacing/typography scale across all pages
6. Write `README.md` — project description, prerequisites (`node >= 18`), install steps (`npm install`, `npm run dev`), feature walkthrough, note on how to plug in a real AI API

**Relevant Context:** This is the final integration pass. All previous sub-tasks must be complete before this runs.

---

## Implementation Notes

### Plugging in a Real AI API Later
Each engine function in `src/engine/` has a single clearly-named export. To replace mock logic with a real LLM (e.g., watsonx.ai or OpenAI):
1. Add an async wrapper in the engine file
2. Send the student profile as a prompt to the API
3. Parse and return the same data shape the UI already expects
No page-level code needs to change.

### Tailwind Glassmorphism Pattern
```css
.glass-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(0, 212, 255, 0.15);
  border-radius: 16px;
}
```

### TypingText Component Contract
```jsx
<TypingText text="Your AI Career Copilot" speed={40} onComplete={() => setRevealed(true)} />
```
`speed` is ms per character. `onComplete` fires when animation ends.
