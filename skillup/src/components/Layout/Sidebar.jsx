import { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { useApp } from '../../context/AppContext'

const navItems = [
  { path: '/',                       icon: '🏠', label: 'Home' },
  { path: '/profile',                icon: '👤', label: 'Profile' },
  { path: '/dashboard',              icon: '📊', label: 'Dashboard' },
  { path: '/career-recommendations', icon: '🎯', label: 'Careers' },
  { path: '/skill-gap',              icon: '🔍', label: 'Skill Gap' },
  { path: '/roadmap',                icon: '🗺️',  label: 'Roadmap' },
  { path: '/courses',                icon: '📚', label: 'Courses' },
  { path: '/interview',              icon: '🎤', label: 'Interview' },
  { path: '/feedback',               icon: '💬', label: 'Feedback' },
  { path: '/readiness',              icon: '⭐', label: 'Score' },
]

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { profile } = useApp()

  return (
    <>
      {/* Mobile hamburger */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        style={{
          display: 'none',
          position: 'fixed', top: '70px', left: '16px', zIndex: 200,
          background: 'rgba(0,212,255,0.1)', border: '1px solid rgba(0,212,255,0.3)',
          borderRadius: '8px', color: '#00d4ff', cursor: 'pointer', padding: '8px 10px',
          fontSize: '16px', fontFamily: 'inherit',
        }}
        className="mobile-hamburger"
      >
        {mobileOpen ? '✕' : '☰'}
      </button>

      <aside style={{
        width: collapsed ? '64px' : '220px',
        minHeight: 'calc(100vh - 60px)',
        background: 'rgba(15,15,26,0.8)',
        borderRight: '1px solid rgba(0,212,255,0.08)',
        padding: '16px 0',
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
        flexShrink: 0,
        transition: 'width 0.3s ease',
        overflowX: 'hidden',
      }}>
        {/* Collapse toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          style={{
            background: 'none', border: 'none', color: '#4a5568',
            cursor: 'pointer', padding: '8px 16px', fontSize: '14px',
            textAlign: 'right', fontFamily: 'inherit',
            display: 'flex', justifyContent: collapsed ? 'center' : 'flex-end',
            marginBottom: '8px',
          }}
          title={collapsed ? 'Expand' : 'Collapse'}
        >
          {collapsed ? '»' : '«'}
        </button>

        {navItems.map(item => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/'}
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: collapsed ? '10px 0' : '10px 20px',
              justifyContent: collapsed ? 'center' : 'flex-start',
              textDecoration: 'none',
              color: isActive ? '#00d4ff' : '#8892a4',
              background: isActive ? 'rgba(0,212,255,0.08)' : 'transparent',
              borderRight: isActive ? '2px solid #00d4ff' : '2px solid transparent',
              fontSize: '14px',
              fontWeight: isActive ? 600 : 400,
              transition: 'all 0.2s ease',
              whiteSpace: 'nowrap',
            })}
          >
            <span style={{ fontSize: '16px', flexShrink: 0 }}>{item.icon}</span>
            {!collapsed && <span>{item.label}</span>}
          </NavLink>
        ))}
      </aside>

      <style>{`
        @media (max-width: 768px) {
          .mobile-hamburger { display: flex !important; }
        }
      `}</style>
    </>
  )
}
