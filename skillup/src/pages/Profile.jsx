import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { ALL_SKILLS, CAREERS } from '../data/careers'
import PageWrapper from '../components/Layout/PageWrapper'
import GlassCard from '../components/UI/GlassCard'
import Button from '../components/UI/Button'
import SkillBadge from '../components/UI/SkillBadge'

const DEGREES = ['B.Tech/B.E.', 'BCA/B.Sc CS', 'MCA/M.Tech', 'MBA', 'B.Sc', 'Diploma', 'Other']
const YEARS   = ['1st Year', '2nd Year', '3rd Year', '4th Year', 'Graduate', 'Post-Graduate']
const EXP     = ['None', 'Personal Projects', 'Internship', 'Part-time Job', 'Full-time Job']

export default function Profile() {
  const { profile, setProfile } = useApp()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: '', email: '', degree: '', year: '', experience: 'None',
    skills: [], interests: [],
  })
  const [error, setError] = useState('')

  // Pre-fill from saved profile
  useEffect(() => {
    if (profile) setForm(profile)
  }, [])

  const toggleSkill = (skill) => {
    setForm(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill],
    }))
  }

  const toggleInterest = (id) => {
    setForm(prev => ({
      ...prev,
      interests: prev.interests.includes(id)
        ? prev.interests.filter(i => i !== id)
        : [...prev.interests, id],
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name.trim())          return setError('Please enter your name.')
    if (!form.degree)               return setError('Please select your degree.')
    if (!form.year)                 return setError('Please select your year.')
    if (form.skills.length < 3)    return setError('Please select at least 3 skills.')
    setError('')
    setProfile(form)
    navigate('/dashboard')
  }

  return (
    <PageWrapper
      title="👤 Student Profile"
      subtitle="Fill in your background and select your current skills. We'll use this to personalize your career analysis."
      maxWidth="860px"
    >
      <form onSubmit={handleSubmit}>
        {/* Personal Info */}
        <GlassCard className="mb-5" style={{ marginBottom: '20px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#e8eaf0', marginBottom: '20px' }}>
            📋 Personal Information
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: '16px' }}>
            <div>
              <label>Full Name *</label>
              <input
                value={form.name}
                onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                placeholder="e.g. Priya Sharma"
              />
            </div>
            <div>
              <label>Email</label>
              <input
                type="email"
                value={form.email}
                onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                placeholder="priya@example.com"
              />
            </div>
            <div>
              <label>Degree *</label>
              <select value={form.degree} onChange={e => setForm(p => ({ ...p, degree: e.target.value }))}>
                <option value="">Select degree</option>
                {DEGREES.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
            <div>
              <label>Year *</label>
              <select value={form.year} onChange={e => setForm(p => ({ ...p, year: e.target.value }))}>
                <option value="">Select year</option>
                {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
              </select>
            </div>
          </div>

          <div style={{ marginTop: '16px' }}>
            <label>Experience Level</label>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '8px' }}>
              {EXP.map(e => (
                <button
                  key={e} type="button"
                  onClick={() => setForm(p => ({ ...p, experience: e }))}
                  style={{
                    padding: '7px 16px', borderRadius: '8px', cursor: 'pointer',
                    background: form.experience === e ? 'rgba(0,212,255,0.15)' : 'rgba(255,255,255,0.05)',
                    border: form.experience === e ? '1px solid rgba(0,212,255,0.6)' : '1px solid rgba(255,255,255,0.1)',
                    color: form.experience === e ? '#00d4ff' : '#8892a4',
                    fontWeight: form.experience === e ? 600 : 400,
                    fontSize: '13px', fontFamily: 'inherit', transition: 'all 0.2s',
                  }}
                >{e}</button>
              ))}
            </div>
          </div>
        </GlassCard>

        {/* Skills */}
        <GlassCard style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#e8eaf0' }}>
              🛠️ Your Current Skills
            </h2>
            <span style={{
              background: form.skills.length >= 3 ? 'rgba(0,255,157,0.1)' : 'rgba(255,211,42,0.1)',
              border: `1px solid ${form.skills.length >= 3 ? 'rgba(0,255,157,0.4)' : 'rgba(255,211,42,0.4)'}`,
              color: form.skills.length >= 3 ? '#00ff9d' : '#ffd32a',
              padding: '4px 12px', borderRadius: '999px', fontSize: '13px', fontWeight: 600,
            }}>
              {form.skills.length} selected {form.skills.length < 3 && '(min 3)'}
            </span>
          </div>
          {Object.entries(ALL_SKILLS).map(([category, skills]) => (
            <div key={category} style={{ marginBottom: '20px' }}>
              <p style={{ fontSize: '12px', color: '#4a5568', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '10px', fontWeight: 600 }}>
                {category}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {skills.map(skill => (
                  <SkillBadge
                    key={skill}
                    skill={skill}
                    active={form.skills.includes(skill)}
                    onClick={() => toggleSkill(skill)}
                  />
                ))}
              </div>
            </div>
          ))}
        </GlassCard>

        {/* Career Interests */}
        <GlassCard style={{ marginBottom: '24px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#e8eaf0', marginBottom: '16px' }}>
            🎯 Career Interests (optional)
          </h2>
          <p style={{ fontSize: '13px', color: '#8892a4', marginBottom: '16px' }}>
            Select careers you're interested in. These get a small match boost in your analysis.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            {CAREERS.map(career => (
              <button
                key={career.id} type="button"
                onClick={() => toggleInterest(career.id)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '8px',
                  padding: '8px 16px', borderRadius: '10px', cursor: 'pointer',
                  background: form.interests.includes(career.id) ? 'rgba(0,212,255,0.1)' : 'rgba(255,255,255,0.04)',
                  border: form.interests.includes(career.id)
                    ? '1px solid rgba(0,212,255,0.5)'
                    : '1px solid rgba(255,255,255,0.08)',
                  color: form.interests.includes(career.id) ? '#00d4ff' : '#8892a4',
                  fontSize: '14px', fontFamily: 'inherit', transition: 'all 0.2s',
                }}
              >
                <span>{career.icon}</span>
                <span>{career.title}</span>
              </button>
            ))}
          </div>
        </GlassCard>

        {/* Error + Submit */}
        {error && (
          <div style={{
            padding: '12px 16px', borderRadius: '10px', marginBottom: '16px',
            background: 'rgba(255,71,87,0.1)', border: '1px solid rgba(255,71,87,0.3)',
            color: '#ff4757', fontSize: '14px',
          }}>
            ⚠️ {error}
          </div>
        )}

        <Button type="submit" size="lg" fullWidth>
          🚀 Analyze My Career →
        </Button>
      </form>
    </PageWrapper>
  )
}
