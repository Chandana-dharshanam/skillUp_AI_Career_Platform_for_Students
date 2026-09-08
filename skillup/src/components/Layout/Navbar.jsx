import { Link, useLocation } from 'react-router-dom'
import { useApp } from '../../context/AppContext'

const steps = [
  { path: '/',                    label: 'Home' },
  { path: '/profile',             label: 'Profile' },
  { path: '/dashboard',           label: 'Dashboard' },
  { path: '/career-recommendations', label: 'Careers' },
  { path: '/skill-gap',           label: 'Skill Gap' },
  { path: '/roadmap',             label: 'Roadmap' },
  { path: '/courses',             label: 'Courses' },
  { path: '/interview',           label: 'Interview' },
  { path: '/feedback',            label: 'Feedback' },
  { path: '/readiness',           label: 'Score' },
]

export default function Navbar() {
  const location = useLocation()
  const { profile, resetAll } = useApp()
  const currentIdx = steps.findIndex(s => s.path === location.pathname)

  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 100,
      background: 'rgba(10,10,15,0.85)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid rgba(0,212,255,0.1)',
      padding: '0 24px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      height: '60px',
    }}>
      {/* Logo */}
      <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{
          width: '32px', height: '32px', borderRadius: '8px',
          background: 'linear-gradient(135deg,#00d4ff,#7c5cd8)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '16px', fontWeight: 800, color: '#fff',
        }}>S</div>
        <span style={{ fontWeight: 700, fontSize: '16px' }}>
          <span className="gradient-text">SkillUp</span>
        </span>
      </Link>

      {/* Step progress */}
      {currentIdx > 0 && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px' }}>
          <span style={{ color: '#8892a4' }}>Step</span>
          <span style={{ color: '#00d4ff', fontWeight: 700 }}>{currentIdx}</span>
          <span style={{ color: '#8892a4' }}>of {steps.length - 1}</span>
          <span style={{ color: '#4a5568', margin: '0 8px' }}>·</span>
          <span style={{ color: '#e8eaf0', fontWeight: 600 }}>{steps[currentIdx]?.label}</span>
        </div>
      )}

      {/* Right actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {profile && (
          <span style={{ fontSize: '13px', color: '#8892a4' }}>
            👋 {profile.name?.split(' ')[0]}
          </span>
        )}
        {profile && (
          <button
            onClick={resetAll}
            style={{
              background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '8px', color: '#8892a4', cursor: 'pointer',
              padding: '5px 12px', fontSize: '12px', fontFamily: 'inherit',
            }}
          >
            Reset
          </button>
        )}
      </div>
    </nav>
  )
}
