import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { CAREERS } from '../data/careers'
import { scoreCareer } from '../engine/careerEngine'
import { getSkillGap } from '../engine/gapEngine'
import { calculateReadinessScore, getReadinessSummary } from '../engine/scoreEngine'
import PageWrapper from '../components/Layout/PageWrapper'
import GlassCard from '../components/UI/GlassCard'
import Button from '../components/UI/Button'
import ScoreGauge from '../components/UI/ScoreGauge'
import TypingText from '../components/UI/TypingText'

export default function ReadinessScore() {
  const { profile, selectedCareer, interviewSession, readinessScore, setReadinessScore } = useApp()
  const navigate = useNavigate()
  const [score, setScore] = useState(null)

  useEffect(() => {
    if (!profile) { navigate('/profile'); return }
    if (!selectedCareer) { navigate('/career-recommendations'); return }

    const career = CAREERS.find(c => c.id === selectedCareer.id)
    if (!career) return

    const skillMatch = scoreCareer(profile.skills, career)
    const gap = getSkillGap(profile.skills, career)
    const gapCount = gap.length
    const totalRequired = career.requiredSkills.length

    // Interview avg
    let interviewAvg = 0
    if (interviewSession?.feedback) {
      const scores = Object.values(interviewSession.feedback).map(f => f.score)
      interviewAvg = scores.length ? scores.reduce((a, b) => a + b, 0) / scores.length : 0
    }

    const result = calculateReadinessScore(skillMatch, gapCount, totalRequired, interviewAvg)
    setScore(result)
    setReadinessScore(result)
  }, [profile, selectedCareer])

  if (!score) return null

  const career = CAREERS.find(c => c.id === selectedCareer?.id)
  const summary = getReadinessSummary(score.overall, career?.title || selectedCareer?.title || 'your chosen career')

  const breakdown = [
    { label: 'Skill Match', value: score.breakdown.skillMatch, color: '#00d4ff', icon: '🛠️', weight: '40%' },
    { label: 'Gap Coverage', value: score.breakdown.gapCoverage, color: '#00ff9d', icon: '📚', weight: '30%' },
    { label: 'Interview Performance', value: score.breakdown.interviewPerformance, color: '#7c5cd8', icon: '🎤', weight: '30%' },
  ]

  return (
    <PageWrapper
      title="⭐ Job Readiness Score"
      subtitle={`Your comprehensive readiness assessment for ${career?.title || selectedCareer?.title}.`}
      maxWidth="760px"
    >
      {/* Score gauge */}
      <GlassCard style={{ marginBottom: '24px', padding: '36px', textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
          <ScoreGauge score={score.overall} size={200} label="Readiness" />
        </div>
        <div className="animate-fade-in-up" style={{ maxWidth: '560px', margin: '0 auto' }}>
          <p style={{ fontSize: '15px', color: '#c8ccd4', lineHeight: 1.8 }}>
            <TypingText text={summary} speed={12} showCursor={false} />
          </p>
        </div>
      </GlassCard>

      {/* Score breakdown */}
      <GlassCard style={{ marginBottom: '24px', padding: '24px' }}>
        <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#e8eaf0', marginBottom: '20px' }}>
          📊 Score Breakdown
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {breakdown.map(b => (
            <div key={b.label}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span>{b.icon}</span>
                  <span style={{ fontSize: '14px', fontWeight: 600, color: '#e8eaf0' }}>{b.label}</span>
                  <span style={{ fontSize: '11px', color: '#4a5568', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', padding: '2px 8px', borderRadius: '6px' }}>
                    weight: {b.weight}
                  </span>
                </div>
                <span style={{ fontSize: '16px', fontWeight: 800, color: b.color }}>{b.value}%</span>
              </div>
              <div style={{ height: '10px', background: 'rgba(255,255,255,0.08)', borderRadius: '999px', overflow: 'hidden' }}>
                <div style={{
                  height: '100%', borderRadius: '999px', width: `${b.value}%`,
                  background: `linear-gradient(90deg, ${b.color}, ${b.color}88)`,
                  transition: 'width 1.2s ease', boxShadow: `0 0 6px ${b.color}50`,
                }} />
              </div>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Action cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: '14px', marginBottom: '24px' }}>
        <ActionCard
          icon="🗺️" title="Improve Your Score"
          desc="Follow the roadmap and close skill gaps."
          to="/roadmap" label="View Roadmap"
        />
        <ActionCard
          icon="🎤" title="Retry Interview"
          desc="Practice again to boost your interview score."
          to="/interview" label="Start Interview"
        />
        <ActionCard
          icon="📚" title="More Courses"
          desc="Enroll in IBM SkillsBuild courses."
          to="/courses" label="Browse Courses"
        />
      </div>

      {/* Share/download */}
      <GlassCard style={{ padding: '20px', textAlign: 'center' }}>
        <p style={{ fontSize: '14px', color: '#8892a4', marginBottom: '14px' }}>
          🎉 You've completed the full SkillUp journey! Share your progress.
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button
            variant="outline"
            onClick={() => alert(`Your Job Readiness Score: ${score.overall}/100\nCareer: ${career?.title}\nKeep going! 🚀`)}
          >
            📤 Share Score
          </Button>
          <Button
            variant="secondary"
            onClick={() => window.print()}
          >
            🖨️ Print Report
          </Button>
          <Link to="/dashboard">
            <Button variant="ghost">← Back to Dashboard</Button>
          </Link>
        </div>
      </GlassCard>
    </PageWrapper>
  )
}

function ActionCard({ icon, title, desc, to, label }) {
  return (
    <Link to={to} style={{ textDecoration: 'none' }}>
      <GlassCard hover style={{ padding: '20px', cursor: 'pointer', height: '100%' }}>
        <div style={{ fontSize: '28px', marginBottom: '10px' }}>{icon}</div>
        <div style={{ fontSize: '14px', fontWeight: 700, color: '#e8eaf0', marginBottom: '6px' }}>{title}</div>
        <div style={{ fontSize: '13px', color: '#8892a4', marginBottom: '14px' }}>{desc}</div>
        <div style={{ fontSize: '13px', color: '#00d4ff', fontWeight: 600 }}>{label} →</div>
      </GlassCard>
    </Link>
  )
}
