import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { rankCareers } from '../engine/careerEngine'
import { getSkillGap } from '../engine/gapEngine'
import PageWrapper from '../components/Layout/PageWrapper'
import GlassCard from '../components/UI/GlassCard'
import Button from '../components/UI/Button'
import TypingText from '../components/UI/TypingText'
import ProgressBar from '../components/UI/ProgressBar'

const QUICK_NAV = [
  { path: '/career-recommendations', icon: '🎯', label: 'Career Match',    desc: 'See your top career fits' },
  { path: '/skill-gap',              icon: '🔍', label: 'Skill Gap',       desc: 'Find what you\'re missing' },
  { path: '/roadmap',                icon: '🗺️',  label: 'Roadmap',         desc: 'Your learning plan' },
  { path: '/courses',                icon: '📚', label: 'IBM Courses',     desc: 'SkillsBuild recommendations' },
  { path: '/interview',              icon: '🎤', label: 'Mock Interview',  desc: 'Practice & prepare' },
  { path: '/readiness',              icon: '⭐', label: 'Readiness Score', desc: 'Your job-readiness score' },
]

export default function Dashboard() {
  const { profile, selectedCareer } = useApp()
  const navigate = useNavigate()
  const [rankedCareers, setRankedCareers] = useState([])
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    if (!profile) { navigate('/profile'); return }
    const results = rankCareers(profile.skills, profile.interests)
    setRankedCareers(results)
    const t = setTimeout(() => setRevealed(true), 2200)
    return () => clearTimeout(t)
  }, [profile])

  if (!profile) return null

  const top = rankedCareers[0]
  const gapCount = top && profile
    ? getSkillGap(profile.skills, top).length
    : 0

  return (
    <PageWrapper
      title="📊 AI Career Dashboard"
      subtitle={`Welcome back, ${profile.name}! Here's your personalized career analysis.`}
      maxWidth="960px"
    >
      {/* AI Analysis animation */}
      {!revealed && (
        <GlassCard style={{ marginBottom: '24px', padding: '28px', textAlign: 'center' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🤖</div>
          <div style={{ fontSize: '20px', fontWeight: 700, color: '#e8eaf0' }}>
            <TypingText text="Analyzing your profile with AI…" speed={40} />
          </div>
          <p style={{ color: '#8892a4', marginTop: '12px', fontSize: '14px' }}>
            Evaluating {profile.skills.length} skills across 6 career paths
          </p>
        </GlassCard>
      )}

      {/* Summary cards */}
      {revealed && (
        <>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '16px',
            marginBottom: '28px',
          }} className="animate-fade-in-up">
            <StatCard icon="🎯" label="Top Career Match" value={top?.title || '—'} sub={`${top?.matchPercent || 0}% match`} color="#00d4ff" />
            <StatCard icon="🛠️" label="Skills You Have"  value={profile.skills.length} sub="skills selected" color="#00ff9d" />
            <StatCard icon="📚" label="Skills to Learn"  value={gapCount} sub={`for ${top?.title}`} color="#ffd32a" />
            <StatCard icon="🎓" label="Education"        value={profile.degree} sub={profile.year} color="#7c5cd8" />
          </div>

          {/* Top 3 career preview */}
          <GlassCard style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#e8eaf0' }}>🏆 Top Career Matches</h2>
              <Link to="/career-recommendations">
                <Button size="sm" variant="outline">View All →</Button>
              </Link>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {rankedCareers.slice(0, 3).map((career, i) => (
                <div key={career.id} style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <span style={{
                    width: '28px', height: '28px', borderRadius: '50%',
                    background: i === 0 ? 'rgba(255,211,42,0.2)' : 'rgba(255,255,255,0.06)',
                    border: `1px solid ${i === 0 ? 'rgba(255,211,42,0.5)' : 'rgba(255,255,255,0.1)'}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '12px', fontWeight: 700, color: i === 0 ? '#ffd32a' : '#4a5568',
                    flexShrink: 0,
                  }}>{i + 1}</span>
                  <span style={{ fontSize: '16px' }}>{career.icon}</span>
                  <span style={{ flex: 1, fontSize: '14px', fontWeight: 600, color: '#e8eaf0' }}>{career.title}</span>
                  <div style={{ width: '140px' }}>
                    <ProgressBar value={career.matchPercent} showPercent />
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Quick nav */}
          <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#e8eaf0', marginBottom: '16px' }}>
            🚀 Explore Your Journey
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '12px' }}>
            {QUICK_NAV.map(item => (
              <Link key={item.path} to={item.path} style={{ textDecoration: 'none' }}>
                <GlassCard hover className="animate-fade-in-up" style={{ padding: '20px', textAlign: 'center', cursor: 'pointer' }}>
                  <div style={{ fontSize: '28px', marginBottom: '8px' }}>{item.icon}</div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: '#e8eaf0', marginBottom: '4px' }}>{item.label}</div>
                  <div style={{ fontSize: '12px', color: '#8892a4' }}>{item.desc}</div>
                </GlassCard>
              </Link>
            ))}
          </div>
        </>
      )}
    </PageWrapper>
  )
}

function StatCard({ icon, label, value, sub, color }) {
  return (
    <GlassCard style={{ padding: '20px' }}>
      <div style={{ fontSize: '24px', marginBottom: '10px' }}>{icon}</div>
      <div style={{ fontSize: '12px', color: '#8892a4', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>{label}</div>
      <div style={{ fontSize: '20px', fontWeight: 800, color: color || '#e8eaf0', marginBottom: '2px' }}>{value}</div>
      <div style={{ fontSize: '12px', color: '#4a5568' }}>{sub}</div>
    </GlassCard>
  )
}
