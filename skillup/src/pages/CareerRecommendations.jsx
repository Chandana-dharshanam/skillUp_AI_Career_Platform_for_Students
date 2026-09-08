import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { rankCareers } from '../engine/careerEngine'
import PageWrapper from '../components/Layout/PageWrapper'
import GlassCard from '../components/UI/GlassCard'
import Button from '../components/UI/Button'
import ProgressBar from '../components/UI/ProgressBar'
import SkillBadge from '../components/UI/SkillBadge'

export default function CareerRecommendations() {
  const { profile, selectedCareer, setSelectedCareer } = useApp()
  const navigate = useNavigate()
  const [rankedCareers, setRankedCareers] = useState([])

  useEffect(() => {
    if (!profile) { navigate('/profile'); return }
    setRankedCareers(rankCareers(profile.skills, profile.interests))
  }, [profile])

  const handleSelect = (career) => {
    setSelectedCareer({ id: career.id, title: career.title })
    navigate('/skill-gap')
  }

  if (!profile) return null

  return (
    <PageWrapper
      title="🎯 Career Recommendations"
      subtitle="Your top career matches based on your skills and interests. Select one to dive deeper."
      maxWidth="960px"
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: '20px' }}>
        {rankedCareers.map((career, i) => {
          const isSelected = selectedCareer?.id === career.id

          return (
            <div
              key={career.id}
              className="glass-card-hover"
              style={{
                padding: '24px', cursor: 'pointer',
                borderColor: isSelected ? 'rgba(0,212,255,0.6)' : undefined,
                boxShadow: isSelected ? '0 0 24px rgba(0,212,255,0.18)' : undefined,
                position: 'relative', overflow: 'hidden',
              }}
              onClick={() => handleSelect(career)}
            >
              {/* Rank badge */}
              <div style={{
                position: 'absolute', top: '16px', right: '16px',
                background: i === 0 ? 'rgba(255,211,42,0.15)' : 'rgba(255,255,255,0.06)',
                border: `1px solid ${i === 0 ? 'rgba(255,211,42,0.5)' : 'rgba(255,255,255,0.1)'}`,
                borderRadius: '999px', padding: '2px 10px',
                fontSize: '11px', fontWeight: 700,
                color: i === 0 ? '#ffd32a' : '#4a5568',
              }}>#{i + 1}</div>

              {/* Selected indicator */}
              {isSelected && (
                <div style={{
                  position: 'absolute', top: '16px', left: '16px',
                  background: 'rgba(0,212,255,0.15)', border: '1px solid rgba(0,212,255,0.5)',
                  borderRadius: '999px', padding: '2px 10px',
                  fontSize: '11px', fontWeight: 700, color: '#00d4ff',
                }}>✓ Selected</div>
              )}

              {/* Icon + title */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px', marginTop: isSelected ? '20px' : '0' }}>
                <span style={{
                  fontSize: '36px', width: '56px', height: '56px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: 'rgba(255,255,255,0.05)', borderRadius: '14px',
                }}>{career.icon}</span>
                <div>
                  <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#e8eaf0' }}>{career.title}</h3>
                  <span style={{ fontSize: '12px', color: '#8892a4' }}>{career.salaryRange}</span>
                </div>
              </div>

              <p style={{ fontSize: '13px', color: '#8892a4', marginBottom: '16px', lineHeight: 1.6 }}>
                {career.description}
              </p>

              {/* Match bar */}
              <ProgressBar
                value={career.matchPercent}
                label="Match Score"
                color={career.matchPercent >= 70 ? 'green' : career.matchPercent >= 40 ? 'neon' : 'yellow'}
                height={10}
                style={{ marginBottom: '16px' }}
              />

              {/* Top matching skills */}
              <div style={{ marginTop: '14px' }}>
                <p style={{ fontSize: '12px', color: '#4a5568', marginBottom: '8px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  Skills You Have
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {career.matchedSkills.slice(0, 5).map(s => (
                    <SkillBadge key={s} skill={s} variant="owned" size="xs" />
                  ))}
                  {career.matchedSkills.length > 5 && (
                    <span style={{ fontSize: '11px', color: '#4a5568', padding: '4px 8px' }}>
                      +{career.matchedSkills.length - 5} more
                    </span>
                  )}
                </div>
              </div>

              <div style={{ marginTop: '16px' }}>
                <Button
                  fullWidth
                  variant={isSelected ? 'secondary' : 'primary'}
                  onClick={(e) => { e.stopPropagation(); handleSelect(career) }}
                >
                  {isSelected ? '✓ Selected Career' : `Analyze ${career.title} →`}
                </Button>
              </div>
            </div>
          )
        })}
      </div>
    </PageWrapper>
  )
}
