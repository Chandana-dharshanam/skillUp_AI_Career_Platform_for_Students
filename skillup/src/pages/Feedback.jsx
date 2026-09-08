import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { gradeInterview } from '../engine/interviewEngine'
import PageWrapper from '../components/Layout/PageWrapper'
import GlassCard from '../components/UI/GlassCard'
import Button from '../components/UI/Button'
import TypingText from '../components/UI/TypingText'

const SCORE_COLOR = (s) => s >= 8 ? '#00ff9d' : s >= 5 ? '#ffd32a' : '#ff4757'
const SCORE_LABEL = (s) => s >= 8 ? 'Excellent' : s >= 5 ? 'Good' : s >= 3 ? 'Needs Work' : 'Poor'

export default function Feedback() {
  const { profile, selectedCareer, interviewSession, setInterviewSession } = useApp()
  const navigate = useNavigate()
  const [results, setResults] = useState([])
  const [expanded, setExpanded] = useState({})
  const [averaged, setAveraged] = useState(0)

  useEffect(() => {
    if (!profile) { navigate('/profile'); return }
    if (!interviewSession || !interviewSession.completed) { navigate('/interview'); return }

    const graded = gradeInterview(interviewSession.answers, interviewSession.questions)
    setResults(graded)
    const avg = graded.reduce((s, r) => s + r.score, 0) / graded.length
    setAveraged(+avg.toFixed(1))

    // Persist feedback back into session
    const feedback = {}
    graded.forEach(r => { feedback[r.question.id] = { score: r.score, tip: r.tip, feedback: r.feedback } })
    setInterviewSession(prev => ({ ...prev, feedback }))
  }, [interviewSession?.completed])

  const toggle = (id) => setExpanded(prev => ({ ...prev, [id]: !prev[id] }))

  const avgScore = averaged
  const avgNormalized = Math.round((avgScore / 10) * 100)

  return (
    <PageWrapper
      title="💬 Interview Feedback"
      subtitle="Here's your detailed AI feedback for each interview answer."
      maxWidth="760px"
    >
      {/* Summary */}
      <GlassCard style={{ marginBottom: '24px', padding: '24px' }}>
        <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ textAlign: 'center', minWidth: '100px' }}>
            <div style={{ fontSize: '48px', fontWeight: 900, color: SCORE_COLOR(avgScore) }}>
              {avgScore}
            </div>
            <div style={{ fontSize: '12px', color: '#8892a4' }}>avg / 10</div>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '15px', fontWeight: 700, color: '#e8eaf0', marginBottom: '8px' }}>
              Overall Interview Performance
            </div>
            <div style={{
              height: '10px', background: 'rgba(255,255,255,0.08)', borderRadius: '999px', overflow: 'hidden', marginBottom: '10px',
            }}>
              <div style={{
                height: '100%', borderRadius: '999px', width: `${avgNormalized}%`,
                background: `linear-gradient(90deg, ${SCORE_COLOR(avgScore)}, ${SCORE_COLOR(avgScore)}aa)`,
                transition: 'width 1s ease', boxShadow: `0 0 8px ${SCORE_COLOR(avgScore)}60`,
              }} />
            </div>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '13px', color: SCORE_COLOR(avgScore), fontWeight: 700 }}>
                {SCORE_LABEL(avgScore)}
              </span>
              <span style={{ fontSize: '13px', color: '#4a5568' }}>
                {results.filter(r => r.score >= 8).length} excellent ·{' '}
                {results.filter(r => r.score >= 5 && r.score < 8).length} good ·{' '}
                {results.filter(r => r.score < 5).length} needs work
              </span>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Per-question accordion */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
        {results.map((r, i) => {
          const isOpen = expanded[r.question.id]
          const sc = r.score
          const color = SCORE_COLOR(sc)

          return (
            <div key={r.question.id} className="glass-card" style={{ overflow: 'hidden' }}>
              <div
                onClick={() => toggle(r.question.id)}
                style={{ padding: '18px 22px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '14px' }}
              >
                <span style={{
                  width: '42px', height: '42px', borderRadius: '10px', flexShrink: 0,
                  background: `${color}15`, border: `1px solid ${color}40`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '16px', fontWeight: 800, color,
                }}>{sc}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: '#e8eaf0', marginBottom: '2px' }}>
                    Q{i + 1}: {r.question.text.slice(0, 70)}{r.question.text.length > 70 ? '…' : ''}
                  </div>
                  <div style={{ fontSize: '12px', color, fontWeight: 600 }}>{SCORE_LABEL(sc)}</div>
                </div>
                <span style={{ color: '#4a5568', fontSize: '16px', flexShrink: 0 }}>{isOpen ? '▲' : '▼'}</span>
              </div>

              {isOpen && (
                <div style={{ padding: '0 22px 22px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                  {/* Full question */}
                  <div style={{ marginTop: '16px', marginBottom: '14px', padding: '12px 16px', borderRadius: '10px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                    <p style={{ fontSize: '13px', color: '#8892a4', fontStyle: 'italic' }}>{r.question.text}</p>
                  </div>

                  {/* Student answer */}
                  {r.answer && (
                    <div style={{ marginBottom: '14px' }}>
                      <p style={{ fontSize: '12px', color: '#4a5568', textTransform: 'uppercase', letterSpacing: '0.07em', fontWeight: 600, marginBottom: '8px' }}>Your Answer</p>
                      <p style={{ fontSize: '14px', color: '#c8ccd4', lineHeight: 1.7, padding: '12px 16px', borderRadius: '10px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                        {r.answer}
                      </p>
                    </div>
                  )}
                  {!r.answer && (
                    <div style={{ marginBottom: '14px', padding: '10px 14px', borderRadius: '10px', background: 'rgba(255,71,87,0.06)', border: '1px solid rgba(255,71,87,0.2)' }}>
                      <span style={{ fontSize: '13px', color: '#ff4757' }}>⚠️ No answer provided (skipped)</span>
                    </div>
                  )}

                  {/* AI feedback */}
                  <div style={{ marginBottom: '14px', padding: '14px 16px', borderRadius: '10px', background: `${color}08`, border: `1px solid ${color}25` }}>
                    <p style={{ fontSize: '12px', color, fontWeight: 600, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.07em' }}>
                      🤖 AI Feedback
                    </p>
                    <p style={{ fontSize: '14px', color: '#c8ccd4', lineHeight: 1.7 }}>{r.feedback}</p>
                  </div>

                  {/* Keywords */}
                  {r.keywordsHit.length > 0 && (
                    <div style={{ marginBottom: '10px' }}>
                      <p style={{ fontSize: '12px', color: '#4a5568', textTransform: 'uppercase', letterSpacing: '0.07em', fontWeight: 600, marginBottom: '8px' }}>Keywords Covered</p>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                        {r.keywordsHit.map(kw => (
                          <span key={kw} style={{
                            background: 'rgba(0,255,157,0.08)', border: '1px solid rgba(0,255,157,0.3)',
                            color: '#00ff9d', borderRadius: '6px', padding: '3px 10px', fontSize: '12px',
                          }}>{kw}</span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Tip */}
                  <div style={{ padding: '12px 16px', borderRadius: '10px', background: 'rgba(124,92,216,0.08)', border: '1px solid rgba(124,92,216,0.25)' }}>
                    <p style={{ fontSize: '14px', color: '#a29bfe', lineHeight: 1.6 }}>
                      <TypingText text={r.tip} speed={18} showCursor={false} />
                    </p>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      <div style={{ display: 'flex', gap: '12px' }}>
        <Link to="/readiness" style={{ flex: 1 }}>
          <Button fullWidth size="lg">⭐ Calculate My Job Readiness Score →</Button>
        </Link>
        <Link to="/interview">
          <Button variant="outline" size="lg">🔄 Retry</Button>
        </Link>
      </div>
    </PageWrapper>
  )
}
