import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import Navbar from './components/Layout/Navbar'
import Sidebar from './components/Layout/Sidebar'

import Landing              from './pages/Landing'
import Profile              from './pages/Profile'
import Dashboard            from './pages/Dashboard'
import CareerRecommendations from './pages/CareerRecommendations'
import SkillGap             from './pages/SkillGap'
import Roadmap              from './pages/Roadmap'
import Courses              from './pages/Courses'
import Interview            from './pages/Interview'
import Feedback             from './pages/Feedback'
import ReadinessScore       from './pages/ReadinessScore'

function AppShell() {
  const location = useLocation()
  const isLanding = location.pathname === '/'

  if (isLanding) {
    return <Landing />
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <div style={{ display: 'flex', flex: 1 }}>
        <Sidebar />
        <Routes>
          <Route path="/profile"              element={<Profile />} />
          <Route path="/dashboard"            element={<Dashboard />} />
          <Route path="/career-recommendations" element={<CareerRecommendations />} />
          <Route path="/skill-gap"            element={<SkillGap />} />
          <Route path="/roadmap"              element={<Roadmap />} />
          <Route path="/courses"              element={<Courses />} />
          <Route path="/interview"            element={<Interview />} />
          <Route path="/feedback"             element={<Feedback />} />
          <Route path="/readiness"            element={<ReadinessScore />} />
        </Routes>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/*" element={<AppShellWrapper />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  )
}

function AppShellWrapper() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <div style={{ display: 'flex', flex: 1 }}>
        <Sidebar />
        <div style={{ flex: 1, overflowY: 'auto' }}>
          <Routes>
            <Route path="/profile"              element={<Profile />} />
            <Route path="/dashboard"            element={<Dashboard />} />
            <Route path="/career-recommendations" element={<CareerRecommendations />} />
            <Route path="/skill-gap"            element={<SkillGap />} />
            <Route path="/roadmap"              element={<Roadmap />} />
            <Route path="/courses"              element={<Courses />} />
            <Route path="/interview"            element={<Interview />} />
            <Route path="/feedback"             element={<Feedback />} />
            <Route path="/readiness"            element={<ReadinessScore />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}
