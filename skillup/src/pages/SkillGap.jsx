import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { CAREERS } from '../data/careers'
import { getSkillGap, prioritizeGaps } from '../engine/gapEngine'
import PageWrapper from '../components/Layout/PageWrapper'
import GlassCard from '../components/UI/GlassCard'
import Button from '../components/UI/Button'
import SkillBadge from '../components/UI/SkillBadge'

const PRIORITY_COLOR = { High: '#ff4757', Medium: '#ffd32a', Low: '#00ff9d' }
const PRIORITY_VARIANT = { High: 'missing', Medium: 'warning', Low: 'owned' }

export default function SkillGap() {
  const { profile, selectedCareer } = useApp()
  const navigate = useNavigate()

  const [career, setCareer] = useState(null)
  const [owned, setOwned] = useState([])
  const [gapList, setGapList] = useState([])

  useEffect(() => {
    if (!profile) { navigate('/profile'); return }
    if (!selectedCareer) { navigate('/career-recommendations'); return }

    const found = CAREERS.find(c => c.id === selectedCareer.id)
    if (!found) return
    setCareer(found)

    const lower = profile.skills.map(s => s.toLowerCase())
    const ownedSkills = found.requiredSkills.filter(s => lower.includes(s.toLowerCase()))
    setOwned(ownedSkills)

    const gap = getSkillGap(profile.skills, found)
    const prioritized = prioritizeGaps(gap, found)
    setGapList(prioritized)
  }, [profile, selectedCareer])

  if (!career) return null

  const total = career.requiredSkills.length
  const matchPct = Math.round((owned.length / total) * 100)

  // SVG donut
  const r = 54, cx = 70, cy = 70
  const circ = 2 * Math.PI * r
  const filled = circ - (matchPct / 100) * circ

  return (
    <PageWrapper
      title="🔍 Skill Gap Analysis"
      subtitle={`Analyzing your skills for ${career.title}. Here's what you have and what you need.`}
      maxWidth="900px"
    >
      {/* Summary row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: '16px', marginBottom: '28px' }}>
        <GlassCard style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {/* Donut chart */}
          <svg width="140" height="140">
            <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="12" />
            <circle
              cx={cx} cy={cy} r={r} fill="none"
              stroke="#00d4ff" strokeWidth="12" strokeLinecap="round"
              strokeDasharray={circ} strokeDashoffset={filled}
              transform={`rotate(-90 ${cx} ${cy})`}
              style={{ transition: 'stroke-dashoffset 1s ease', filter: 'drop-shadow(0 0 4px #00d4ff)' }}
            />
            <text x={cx} y={cy - 4} textAnchor="middle" fill="#00d4ff" fontSize="22" fontWeight="800" fontFamily="system-ui">{matchPct}%</text>
            <text x={cx} y={cy + 16} textAnchor="middle" fill="#8892a4" fontSize="10" fontFamily="system-ui">Match</text>
          </svg>
        </GlassCard>
        <StatCard icon="✅" label="Skills You Have" value={owned.length} sub={`of ${total} required`} color="#00ff9d" />
        <StatCard icon="📚" label="Skills to Learn" value={gapList.length} sub="identified gaps" color="#ff4757" />
        <StatCard icon="🔴" label="High Priority Gaps" value={gapList.filter(g => g.priority === 'High').length} sub="need ASAP" color="#ff4757" />
      </div>

      <div className="skill-gap-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
        {/* Owned skills */}
        <GlassCard>
          <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#00ff9d', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>✅</span> Skills You Have ({owned.length})
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {owned.map(s => <SkillBadge key={s} skill={s} variant="owned" />)}
          </div>
        </GlassCard>

        {/* Gap skills */}
        <GlassCard>
          <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#ff4757', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>📚</span> Skills to Learn ({gapList.length})
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {gapList.map(({ skill, priority }) => (
              <span
                key={skill}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '5px',
                  background: `${PRIORITY_COLOR[priority]}12`,
                  border: `1px solid ${PRIORITY_COLOR[priority]}40`,
                  color: PRIORITY_COLOR[priority],
                  borderRadius: '999px', padding: '4px 10px', fontSize: '12px', fontWeight: 500,
                }}
              >
                <span style={{ fontSize: '9px', fontWeight: 800 }}>{priority[0]}</span>
                {skill}
              </span>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* Priority legend */}
      <GlassCard style={{ marginBottom: '24px', padding: '16px' }}>
        <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', alignItems: 'center' }}>
          <span style={{ fontSize: '13px', color: '#8892a4', fontWeight: 600 }}>Priority Legend:</span>
          {['High', 'Medium', 'Low'].map(p => (
            <span key={p} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px' }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: PRIORITY_COLOR[p], display: 'inline-block' }} />
              <span style={{ color: PRIORITY_COLOR[p], fontWeight: 600 }}>{p}</span>
              <span style={{ color: '#4a5568' }}>
                — {p === 'High' ? 'Core requirement, learn first' : p === 'Medium' ? 'Important, learn soon' : 'Nice to have'}
              </span>
            </span>
          ))}
        </div>
      </GlassCard>

      <div style={{ display: 'flex', gap: '12px' }}>
        <Link to="/roadmap" style={{ flex: 1 }}>
          <Button fullWidth size="lg">🗺️ Build My Learning Roadmap →</Button>
        </Link>
        <Link to="/courses">
          <Button variant="outline" size="lg">📚 View Courses</Button>
        </Link>
      </div>
    </PageWrapper>
  )
}

function StatCard({ icon, label, value, sub, color }) {
  return (
    <GlassCard style={{ padding: '20px' }}>
      <div style={{ fontSize: '24px', marginBottom: '10px' }}>{icon}</div>
      <div style={{ fontSize: '12px', color: '#8892a4', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>{label}</div>
      <div style={{ fontSize: '24px', fontWeight: 800, color: color || '#e8eaf0', marginBottom: '2px' }}>{value}</div>
      <div style={{ fontSize: '12px', color: '#4a5568' }}>{sub}</div>
    </GlassCard>
  )
}
