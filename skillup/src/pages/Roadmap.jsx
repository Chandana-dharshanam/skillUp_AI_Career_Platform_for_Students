import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { CAREERS } from '../data/careers'
import { getSkillGap } from '../engine/gapEngine'
import { buildRoadmap } from '../engine/roadmapEngine'
import PageWrapper from '../components/Layout/PageWrapper'
import GlassCard from '../components/UI/GlassCard'
import Button from '../components/UI/Button'
import SkillBadge from '../components/UI/SkillBadge'

export default function Roadmap() {
  const { profile, selectedCareer, roadmapProgress, setRoadmapProgress } = useApp()
  const navigate = useNavigate()
  const [roadmap, setRoadmap] = useState(null)
  const [expanded, setExpanded] = useState({ p1: true, p2: false, p3: false })

  useEffect(() => {
    if (!profile) { navigate('/profile'); return }
    if (!selectedCareer) { navigate('/career-recommendations'); return }

    const career = CAREERS.find(c => c.id === selectedCareer.id)
    if (!career) return
    const gap = getSkillGap(profile.skills, career)
    const rm = buildRoadmap(gap.map(s => s), selectedCareer.id)
    setRoadmap(rm)
  }, [profile, selectedCareer])

  const togglePhase = (id) => setExpanded(prev => ({ ...prev, [id]: !prev[id] }))

  const toggleComplete = (phaseId) => {
    setRoadmapProgress({
      ...roadmapProgress,
      [`${selectedCareer?.id}_${phaseId}`]: !roadmapProgress[`${selectedCareer?.id}_${phaseId}`],
    })
  }

  if (!roadmap) return null

  const completedCount = roadmap.phases.filter(p =>
    roadmapProgress[`${selectedCareer?.id}_${p.id}`]
  ).length

  return (
    <PageWrapper
      title="🗺️ Learning Roadmap"
      subtitle={`Your personalized phase-by-phase plan to become a ${selectedCareer?.title}.`}
      maxWidth="800px"
    >
      {/* Progress */}
      <GlassCard style={{ marginBottom: '24px', padding: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <span style={{ fontSize: '15px', fontWeight: 700, color: '#e8eaf0' }}>
            Overall Progress
          </span>
          <span style={{ fontSize: '13px', color: '#00d4ff', fontWeight: 600 }}>
            {completedCount}/{roadmap.phases.length} phases complete
          </span>
        </div>
        <div style={{
          height: '8px', background: 'rgba(255,255,255,0.08)', borderRadius: '999px', overflow: 'hidden',
        }}>
          <div style={{
            height: '100%', borderRadius: '999px',
            background: 'linear-gradient(90deg,#00d4ff,#00ff9d)',
            width: `${(completedCount / roadmap.phases.length) * 100}%`,
            transition: 'width 0.6s ease',
            boxShadow: '0 0 8px rgba(0,212,255,0.5)',
          }} />
        </div>
      </GlassCard>

      {/* Phases */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
        {roadmap.phases.map((phase, i) => {
          const isComplete = !!roadmapProgress[`${selectedCareer?.id}_${phase.id}`]
          const isOpen = expanded[phase.id]
          const phaseColors = ['#00d4ff', '#7c5cd8', '#00ff9d']
          const color = phaseColors[i] || '#00d4ff'

          return (
            <div key={phase.id} className="glass-card" style={{
              borderColor: isComplete ? 'rgba(0,255,157,0.3)' : undefined,
              overflow: 'hidden',
            }}>
              {/* Phase header */}
              <div
                onClick={() => togglePhase(phase.id)}
                style={{
                  padding: '20px 24px', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: '16px',
                }}
              >
                <span style={{
                  width: '44px', height: '44px', borderRadius: '12px', flexShrink: 0,
                  background: `${color}18`,
                  border: `1px solid ${color}40`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px',
                }}>{phase.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#e8eaf0' }}>
                      Phase {i + 1}: {phase.title}
                    </h3>
                    {isComplete && (
                      <span style={{
                        background: 'rgba(0,255,157,0.12)', border: '1px solid rgba(0,255,157,0.4)',
                        color: '#00ff9d', borderRadius: '999px', padding: '2px 10px', fontSize: '11px', fontWeight: 700,
                      }}>✓ Complete</span>
                    )}
                    {phase.hasPriority && !isComplete && (
                      <span style={{
                        background: 'rgba(0,212,255,0.1)', border: '1px solid rgba(0,212,255,0.3)',
                        color: '#00d4ff', borderRadius: '999px', padding: '2px 10px', fontSize: '11px', fontWeight: 600,
                      }}>Addresses your gaps</span>
                    )}
                  </div>
                  <span style={{ fontSize: '12px', color: '#8892a4' }}>⏱ {phase.duration}</span>
                </div>
                <span style={{ color: '#4a5568', fontSize: '18px' }}>{isOpen ? '▲' : '▼'}</span>
              </div>

              {/* Phase body */}
              {isOpen && (
                <div style={{ padding: '0 24px 24px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                  <p style={{ fontSize: '14px', color: '#8892a4', margin: '16px 0', lineHeight: 1.7 }}>
                    {phase.description}
                  </p>

                  {/* Goals */}
                  <div style={{ marginBottom: '16px' }}>
                    <p style={{ fontSize: '12px', color: '#4a5568', textTransform: 'uppercase', letterSpacing: '0.07em', fontWeight: 600, marginBottom: '10px' }}>
                      Learning Goals
                    </p>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {phase.goals.map((g, gi) => (
                        <li key={gi} style={{ display: 'flex', gap: '10px', fontSize: '14px', color: '#c8ccd4' }}>
                          <span style={{ color, flexShrink: 0 }}>→</span>
                          {g}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Gap skills addressed */}
                  {phase.relevantGapSkills.length > 0 && (
                    <div style={{ marginBottom: '16px' }}>
                      <p style={{ fontSize: '12px', color: '#4a5568', textTransform: 'uppercase', letterSpacing: '0.07em', fontWeight: 600, marginBottom: '10px' }}>
                        Closes Your Skill Gaps
                      </p>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                        {phase.relevantGapSkills.map(s => <SkillBadge key={s} skill={s} variant="missing" size="sm" />)}
                      </div>
                    </div>
                  )}

                  {/* Courses */}
                  {phase.courses.length > 0 && (
                    <div style={{ marginBottom: '20px' }}>
                      <p style={{ fontSize: '12px', color: '#4a5568', textTransform: 'uppercase', letterSpacing: '0.07em', fontWeight: 600, marginBottom: '10px' }}>
                        Recommended IBM SkillsBuild Courses
                      </p>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {phase.courses.map(course => (
                          <div key={course.id} style={{
                            display: 'flex', alignItems: 'center', gap: '10px',
                            padding: '10px 14px', borderRadius: '10px',
                            background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
                          }}>
                            <span style={{ fontSize: '16px' }}>📘</span>
                            <div style={{ flex: 1 }}>
                              <span style={{ fontSize: '13px', color: '#e8eaf0', fontWeight: 600 }}>{course.title}</span>
                              <span style={{ fontSize: '11px', color: '#4a5568', marginLeft: '10px' }}>{course.duration}</span>
                            </div>
                            <span style={{
                              background: 'rgba(0,212,255,0.08)', border: '1px solid rgba(0,212,255,0.2)',
                              color: '#00d4ff', borderRadius: '6px', padding: '2px 8px', fontSize: '11px',
                            }}>{course.level}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Milestone + complete button */}
                  <div style={{
                    padding: '14px 16px', borderRadius: '10px',
                    background: `${color}0a`, border: `1px solid ${color}25`,
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap',
                  }}>
                    <div>
                      <span style={{ fontSize: '12px', color, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>🏆 Milestone</span>
                      <p style={{ fontSize: '13px', color: '#c8ccd4', marginTop: '4px' }}>{phase.milestone}</p>
                    </div>
                    <button
                      onClick={() => toggleComplete(phase.id)}
                      style={{
                        padding: '8px 18px', borderRadius: '8px', cursor: 'pointer',
                        background: isComplete ? 'rgba(0,255,157,0.12)' : 'rgba(255,255,255,0.06)',
                        border: isComplete ? '1px solid rgba(0,255,157,0.4)' : '1px solid rgba(255,255,255,0.12)',
                        color: isComplete ? '#00ff9d' : '#8892a4',
                        fontWeight: 600, fontSize: '13px', fontFamily: 'inherit', transition: 'all 0.2s',
                      }}
                    >
                      {isComplete ? '✓ Completed' : 'Mark Complete'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      <div style={{ display: 'flex', gap: '12px' }}>
        <Link to="/courses" style={{ flex: 1 }}>
          <Button fullWidth size="lg">📚 View All IBM SkillsBuild Courses →</Button>
        </Link>
        <Link to="/interview">
          <Button variant="outline" size="lg">🎤 Start Interview</Button>
        </Link>
      </div>
    </PageWrapper>
  )
}
