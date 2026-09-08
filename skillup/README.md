# SkillUp – AI Career Copilot 🚀

> A fully client-side AI career assistant for students. Built for the IBM Hackathon.

---

## ✨ Features

| Feature | Description |
|---|---|
| 👤 Student Profile | Input your skills, degree, and career interests |
| 📊 AI Career Analysis | Rule-based engine scores and ranks 6 career paths |
| 🎯 Career Recommendations | Ranked career cards with match percentages |
| 🔍 Skill Gap Analysis | Visual breakdown of what you have vs. what you need |
| 🗺️ Learning Roadmap | 3-phase personalized plan with phase completion tracking |
| 📚 IBM SkillsBuild Courses | Curated course recommendations filtered to your gaps |
| 🎤 Mock Interview | Sequential Q&A with 6 career-specific questions |
| 💬 Interview Feedback | Per-answer AI scoring, keyword analysis, and improvement tips |
| ⭐ Job Readiness Score | Aggregated 0–100 score with animated gauge and breakdown |

---

## 🛠️ Tech Stack

- **React 18** + **Vite** — fast development with HMR
- **Tailwind CSS** (v4 via `@tailwindcss/vite`) — utility-first styling
- **React Router v6** — client-side routing
- **localStorage** — persistent state, no backend needed
- All "AI" logic: deterministic rule-based engines in `src/engine/`

---

## 🚀 Getting Started

### Prerequisites
- **Node.js 18+** — [download here](https://nodejs.org)

### Installation

```bash
# 1. Navigate into the project folder
cd skillup

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

Open **http://localhost:5173** in your browser.

### Build for Production

```bash
npm run build
npm run preview
```

---

## 📁 Project Structure

```
skillup/src/
  data/           # Static mock data (careers, courses, questions, roadmaps)
  engine/         # Pure JS AI logic engines (career, gap, roadmap, interview, score)
  context/        # React Context + localStorage state management
  hooks/          # Reusable hooks (useTypingEffect, useLocalStorage)
  components/
    Layout/       # Navbar, Sidebar, PageWrapper
    UI/           # GlassCard, Button, SkillBadge, ProgressBar, ScoreGauge, etc.
  pages/          # One file per route (10 pages)
```

---

## 🔗 Demo Flow

1. **Landing** (`/`) → Click "Start My Journey"
2. **Profile** (`/profile`) → Select skills, degree, interests → "Analyze My Career"
3. **Dashboard** (`/dashboard`) → AI analysis animation → View top career matches
4. **Career Recommendations** (`/career-recommendations`) → Select a career
5. **Skill Gap** (`/skill-gap`) → See what you're missing
6. **Roadmap** (`/roadmap`) → Phase-by-phase learning plan
7. **Courses** (`/courses`) → IBM SkillsBuild recommendations
8. **Interview** (`/interview`) → Answer 6 mock questions
9. **Feedback** (`/feedback`) → Per-answer AI scoring
10. **Readiness Score** (`/readiness`) → Animated score gauge + action plan

---

## 🔌 Plugging in a Real AI API

All "AI" logic lives in pure functions inside `src/engine/`. To replace mock logic:

1. Make the engine function `async`
2. Send the student profile as a prompt to your LLM (watsonx.ai, OpenAI, etc.)
3. Parse and return the same data shape the UI already expects

No page-level code needs to change — only the engine files.

---

## 🎨 Design System

- **Theme**: Dark futuristic (`#0a0a0f` background)
- **Accent**: Neon blue (`#00d4ff`)
- **Cards**: Glassmorphism (`backdrop-filter: blur`)
- **Typography**: System UI stack, 15px base
- **Custom classes**: `.glass-card`, `.glass-card-hover`, `.gradient-text`, `.neon-text`

---

## 📝 License

Built for IBM Hackathon — college project prototype.
