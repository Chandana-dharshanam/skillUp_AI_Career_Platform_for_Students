import { createContext, useContext, useState, useEffect } from 'react'

const AppContext = createContext(null)

const KEYS = {
  profile: 'skillup_profile',
  selectedCareer: 'skillup_selectedCareer',
  interview: 'skillup_interview',
  score: 'skillup_score',
  roadmapProgress: 'skillup_roadmap_progress',
}

function loadFromStorage(key, fallback) {
  try {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : fallback
  } catch {
    return fallback
  }
}

function saveToStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (e) {
    console.error('Storage error:', e)
  }
}

export function AppProvider({ children }) {
  const [profile, setProfileState] = useState(() => loadFromStorage(KEYS.profile, null))
  const [selectedCareer, setSelectedCareerState] = useState(() => loadFromStorage(KEYS.selectedCareer, null))
  const [interviewSession, setInterviewSessionState] = useState(() => loadFromStorage(KEYS.interview, null))
  const [readinessScore, setReadinessScoreState] = useState(() => loadFromStorage(KEYS.score, null))
  const [roadmapProgress, setRoadmapProgressState] = useState(() => loadFromStorage(KEYS.roadmapProgress, {}))

  const setProfile = (val) => {
    setProfileState(val)
    saveToStorage(KEYS.profile, val)
  }

  const setSelectedCareer = (val) => {
    setSelectedCareerState(val)
    saveToStorage(KEYS.selectedCareer, val)
  }

  const setInterviewSession = (val) => {
    setInterviewSessionState(val)
    saveToStorage(KEYS.interview, val)
  }

  const setReadinessScore = (val) => {
    setReadinessScoreState(val)
    saveToStorage(KEYS.score, val)
  }

  const setRoadmapProgress = (val) => {
    setRoadmapProgressState(val)
    saveToStorage(KEYS.roadmapProgress, val)
  }

  const resetAll = () => {
    Object.values(KEYS).forEach(k => localStorage.removeItem(k))
    setProfileState(null)
    setSelectedCareerState(null)
    setInterviewSessionState(null)
    setReadinessScoreState(null)
    setRoadmapProgressState({})
  }

  return (
    <AppContext.Provider value={{
      profile, setProfile,
      selectedCareer, setSelectedCareer,
      interviewSession, setInterviewSession,
      readinessScore, setReadinessScore,
      roadmapProgress, setRoadmapProgress,
      resetAll,
    }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used inside AppProvider')
  return ctx
}
