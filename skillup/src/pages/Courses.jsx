import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { CAREERS } from '../data/careers'
import { getSkillGap } from '../engine/gapEngine'
import { recommendCourses } from '../engine/courseEngine'
import PageWrapper from '../components/Layout/PageWrapper'
import GlassCard from '../components/UI/GlassCard'
import Button from '../components/UI/Button'
import SkillBadge from '../components/UI/SkillBadge'

const LEVELS = ['All', 'Beginner', 'Intermediate', 'Advanced']
const LEVEL_COLOR = { Beginner: '#00ff9d', Intermediate: '#00d4ff', Advanced: '#7c5cd8' }

export default function Courses() {
  const { profile, selectedCareer } = useApp()
  const navigate = useNavigate()
  const [courses, setCourses] = useState([])
  const [filter, setFilter] = useState('All')

  useEffect(() => {
    if (!profile) { navigate('/profile'); return }
    let gap = []
    if (selectedCareer) {
      const career = CAREERS.find(c => c.id === selectedCareer.id)
      if (career) gap = getSkillGap(profile.skills, career)
    }
    setCourses(recommendCourses(gap, null))
  }, [profile, selectedCareer])

  const filtered = filter === 'All' ? courses : courses.filter(c => c.level === filter)

  return (
    <PageWrapper
      title="📚 IBM SkillsBuild Courses"
      subtitle="Curated courses to close your skill gaps. All provided by IBM SkillsBuild."
      maxWidth="960px"
    >
      {/* IBM branding bar */}
      <div style={{
        padding: '14px 20px', borderRadius: '12px', marginBottom: '24px',
        background: 'linear-gradient(135deg, rgba(0,212,255,0.06), rgba(124,92,216,0.06))',
        border: '1px solid rgba(0,212,255,0.15)',
        display: 'flex', alignItems: 'center', gap: '16px',
      }}>
        <span style={{ fontSize: '28px' }}>🎓</span>
        <div>
          <div style={{ fontSize: '15px', fontWeight: 700, color: '#e8eaf0' }}>IBM SkillsBuild</div>
          <div style={{ fontSize: '13px', color: '#8892a4' }}>
            Free professional courses to build in-demand technology skills and earn digital badges.
          </div>
        </div>
        <a
          href="https://skillsbuild.org" target="_blank" rel="noreferrer"
          style={{
            marginLeft: 'auto', padding: '8px 18px', borderRadius: '8px',
            background: 'rgba(0,212,255,0.1)', border: '1px solid rgba(0,212,255,0.3)',
            color: '#00d4ff', textDecoration: 'none', fontSize: '13px', fontWeight: 600,
            whiteSpace: 'nowrap',
          }}
        >
          Visit ↗
        </a>
      </div>

      {/* Filter bar */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', flexWrap: 'wrap' }}>
        {LEVELS.map(level => (
          <button
            key={level}
            onClick={() => setFilter(level)}
            style={{
              padding: '7px 18px', borderRadius: '999px', cursor: 'pointer',
              background: filter === level ? 'rgba(0,212,255,0.15)' : 'rgba(255,255,255,0.05)',
              border: filter === level ? '1px solid rgba(0,212,255,0.5)' : '1px solid rgba(255,255,255,0.1)',
              color: filter === level ? '#00d4ff' : '#8892a4',
              fontWeight: filter === level ? 600 : 400,
              fontSize: '13px', fontFamily: 'inherit', transition: 'all 0.2s',
            }}
          >
            {level} {level !== 'All' && `(${courses.filter(c => c.level === level).length})`}
          </button>
        ))}
        <span style={{ marginLeft: 'auto', fontSize: '13px', color: '#4a5568', alignSelf: 'center' }}>
          {filtered.length} course{filtered.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Course grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px', marginBottom: '28px' }}>
        {filtered.map(course => (
          <div key={course.id} className="glass-card-hover" style={{ padding: '22px' }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
              <span style={{ fontSize: '24px' }}>{course.badge}</span>
              <span style={{
                background: `${LEVEL_COLOR[course.level]}15`,
                border: `1px solid ${LEVEL_COLOR[course.level]}40`,
                color: LEVEL_COLOR[course.level],
                borderRadius: '6px', padding: '3px 10px', fontSize: '11px', fontWeight: 700,
              }}>{course.level}</span>
            </div>

            <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#e8eaf0', marginBottom: '8px', lineHeight: 1.4 }}>
              {course.title}
            </h3>
            <p style={{ fontSize: '13px', color: '#8892a4', lineHeight: 1.6, marginBottom: '14px' }}>
              {course.description}
            </p>

            {/* Meta */}
            <div style={{ display: 'flex', gap: '12px', marginBottom: '14px' }}>
              <span style={{ fontSize: '12px', color: '#4a5568', display: 'flex', alignItems: 'center', gap: '4px' }}>
                ⏱ {course.duration}
              </span>
              <span style={{ fontSize: '12px', color: '#4a5568' }}>· {course.provider}</span>
            </div>

            {/* Skills covered */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
              {course.skillsCovered.slice(0, 4).map(s => (
                <SkillBadge key={s} skill={s} size="xs" />
              ))}
              {course.skillsCovered.length > 4 && (
                <span style={{ fontSize: '11px', color: '#4a5568', padding: '2px 6px' }}>
                  +{course.skillsCovered.length - 4}
                </span>
              )}
            </div>

            <a
              href={course.url} target="_blank" rel="noreferrer"
              style={{
                display: 'block', textAlign: 'center',
                padding: '9px', borderRadius: '8px',
                background: 'linear-gradient(135deg, #00d4ff22, #7c5cd822)',
                border: '1px solid rgba(0,212,255,0.3)',
                color: '#00d4ff', textDecoration: 'none', fontSize: '13px', fontWeight: 600,
                transition: 'all 0.2s',
              }}
            >
              View on IBM SkillsBuild ↗
            </a>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '12px' }}>
        <Link to="/interview" style={{ flex: 1 }}>
          <Button fullWidth size="lg">🎤 Start Mock Interview →</Button>
        </Link>
      </div>
    </PageWrapper>
  )
}
