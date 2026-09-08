import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { INTERVIEW_QUESTIONS } from '../data/interviewQuestions'
import PageWrapper from '../components/Layout/PageWrapper'
import GlassCard from '../components/UI/GlassCard'
import Button from '../components/UI/Button'

export default function Interview() {
  const { profile, selectedCareer, interviewSession, setInterviewSession } = useApp()
  const navigate = useNavigate()

  const [currentIdx, setCurrentIdx] = useState(0)
  const [answer, setAnswer] = useState('')
  const [questions, setQuestions] = useState([])

  useEffect(() => {
    if (!profile) { navigate('/profile'); return }
    if (!selectedCareer) { navigate('/career-recommendations'); return }

    const qs = INTERVIEW_QUESTIONS[selectedCareer.id] || []
    setQuestions(qs)

    // Restore session if exists for same career
    if (interviewSession && interviewSession.career === selectedCareer.id && !interviewSession.completed) {
      const answeredCount = Object.keys(interviewSession.answers || {}).length
      setCurrentIdx(answeredCount < qs.length ? answeredCount : 0)
    } else {
      // Fresh session
      setInterviewSession({
        career: selectedCareer.id,
        questions: qs,
        answers: {},
        completed: false,
      })
      setCurrentIdx(0)
    }
  }, [selectedCareer])

  if (!questions.length) return null

  const current = questions[currentIdx]
  const progress = (currentIdx / questions.length) * 100
  const isLast = currentIdx === questions.length - 1

  const handleSubmit = () => {
    const updated = {
      ...interviewSession,
      answers: { ...(interviewSession?.answers || {}), [current.id]: answer.trim() },
    }

    if (isLast) {
      setInterviewSession({ ...updated, completed: true })
      navigate('/feedback')
    } else {
      setInterviewSession(updated)
      setCurrentIdx(i => i + 1)
      setAnswer('')
    }
  }

  const handleSkip = () => {
    const updated = {
      ...interviewSession,
      answers: { ...(interviewSession?.answers || {}), [current.id]: '' },
    }
    if (isLast) {
      setInterviewSession({ ...updated, completed: true })
      navigate('/feedback')
    } else {
      setInterviewSession(updated)
      setCurrentIdx(i => i + 1)
      setAnswer('')
    }
  }

  const TYPE_COLOR = { technical: '#00d4ff', behavioral: '#7c5cd8', conceptual: '#ffd32a' }
  const TYPE_ICON  = { technical: '⚙️', behavioral: '💬', conceptual: '💡' }

  return (
    <PageWrapper
      title="🎤 Mock Interview"
      subtitle={`Practicing for ${selectedCareer?.title}. Answer each question as if it's a real interview.`}
      maxWidth="720px"
    >
      {/* Progress */}
      <div style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span style={{ fontSize: '14px', color: '#8892a4' }}>
            Question {currentIdx + 1} of {questions.length}
          </span>
          <span style={{ fontSize: '14px', color: '#00d4ff', fontWeight: 600 }}>
            {Math.round(progress)}% complete
          </span>
        </div>
        <div style={{ display: 'flex', gap: '4px' }}>
          {questions.map((_, i) => (
            <div key={i} style={{
              flex: 1, height: '4px', borderRadius: '2px',
              background: i < currentIdx ? '#00d4ff' : i === currentIdx ? '#7c5cd8' : 'rgba(255,255,255,0.1)',
              transition: 'background 0.3s ease',
              boxShadow: i < currentIdx ? '0 0 4px rgba(0,212,255,0.5)' : 'none',
            }} />
          ))}
        </div>
      </div>

      {/* Question card */}
      <GlassCard style={{ marginBottom: '24px', padding: '28px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
          <span style={{
            background: `${TYPE_COLOR[current.type]}15`,
            border: `1px solid ${TYPE_COLOR[current.type]}40`,
            color: TYPE_COLOR[current.type],
            borderRadius: '6px', padding: '4px 12px', fontSize: '12px', fontWeight: 700,
            display: 'flex', alignItems: 'center', gap: '5px',
          }}>
            {TYPE_ICON[current.type]} {current.type.charAt(0).toUpperCase() + current.type.slice(1)}
          </span>
          <span style={{ fontSize: '12px', color: '#4a5568' }}>AI-generated question</span>
        </div>

        <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#e8eaf0', lineHeight: 1.5, marginBottom: '8px' }}>
          {current.text}
        </h2>
        <p style={{ fontSize: '12px', color: '#4a5568' }}>
          💡 Tip: Include specific examples and technical details in your answer.
        </p>
      </GlassCard>

      {/* Answer area */}
      <GlassCard style={{ padding: '24px', marginBottom: '20px' }}>
        <label style={{ marginBottom: '10px', display: 'block' }}>Your Answer</label>
        <textarea
          value={answer}
          onChange={e => setAnswer(e.target.value)}
          placeholder="Type your answer here… Be specific and use technical terminology where relevant."
          rows={7}
          style={{ resize: 'vertical', fontFamily: 'inherit', lineHeight: 1.7 }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
          <span style={{
            fontSize: '12px',
            color: answer.trim().split(/\s+/).filter(Boolean).length >= 20 ? '#00ff9d' : '#4a5568',
          }}>
            {answer.trim().split(/\s+/).filter(Boolean).length} words
            {answer.trim().split(/\s+/).filter(Boolean).length < 20 && ' (aim for 20+)'}
          </span>
          <span style={{ fontSize: '12px', color: '#4a5568' }}>
            {isLast ? 'Last question' : `${questions.length - currentIdx - 1} more after this`}
          </span>
        </div>
      </GlassCard>

      {/* Actions */}
      <div style={{ display: 'flex', gap: '12px' }}>
        <Button
          variant="ghost"
          onClick={handleSkip}
          style={{ color: '#4a5568', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', padding: '10px 20px' }}
        >
          Skip
        </Button>
        <Button
          fullWidth
          size="lg"
          disabled={answer.trim().length < 10}
          onClick={handleSubmit}
        >
          {isLast ? '✅ Submit & Get Feedback →' : `Submit & Next →`}
        </Button>
      </div>
    </PageWrapper>
  )
}
