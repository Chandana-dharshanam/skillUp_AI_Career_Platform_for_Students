import { Link } from 'react-router-dom'
import Button from '../components/UI/Button'
import TypingText from '../components/UI/TypingText'
import GlassCard from '../components/UI/GlassCard'

const features = [
  { icon: '🎯', title: 'Career Analysis',     desc: 'AI-powered matching of your skills to in-demand career paths.' },
  { icon: '🔍', title: 'Skill Gap Detection', desc: 'Know exactly what skills you need to bridge the gap.' },
  { icon: '🗺️',  title: 'Learning Roadmap',   desc: 'Phase-by-phase plan tailored to your goals.' },
  { icon: '🎤', title: 'Mock Interviews',     desc: 'Practice with AI-generated questions and get instant feedback.' },
]

export default function Landing() {
  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0f', position: 'relative', overflow: 'hidden' }}>
      {/* Background grid */}
      <div className="bg-grid" style={{ position: 'absolute', inset: 0, opacity: 0.5 }} />

      {/* Glow orbs */}
      <div style={{
        position: 'absolute', top: '-200px', left: '50%', transform: 'translateX(-50%)',
        width: '600px', height: '600px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,212,255,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Navbar */}
        <nav style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '20px 48px',
          borderBottom: '1px solid rgba(0,212,255,0.08)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '36px', height: '36px', borderRadius: '10px',
              background: 'linear-gradient(135deg,#00d4ff,#7c5cd8)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '18px', fontWeight: 800, color: '#fff',
            }}>S</div>
            <span style={{ fontWeight: 800, fontSize: '18px' }}>
              <span className="gradient-text">SkillUp</span>
            </span>
          </div>
          <Link to="/profile">
            <Button size="sm">Get Started →</Button>
          </Link>
        </nav>

        {/* Hero */}
        <section style={{ textAlign: 'center', padding: '80px 24px 60px' }}>
          <div style={{
            display: 'inline-block', background: 'rgba(0,212,255,0.1)', border: '1px solid rgba(0,212,255,0.3)',
            borderRadius: '999px', padding: '6px 18px', fontSize: '13px', color: '#00d4ff',
            marginBottom: '28px', fontWeight: 500,
          }}>
            ✦ Powered by AI · Built for Students
          </div>

          <h1 style={{
            fontSize: 'clamp(36px,6vw,72px)', fontWeight: 900, lineHeight: 1.1, marginBottom: '12px',
          }}>
            <span className="gradient-text">
              <TypingText text="Your AI Career Copilot" speed={45} />
            </span>
          </h1>
          <p style={{ fontSize: 'clamp(16px,2.5vw,20px)', color: '#8892a4', marginBottom: '40px', maxWidth: '560px', margin: '0 auto 40px' }}>
            Discover the right career path, close skill gaps, and land your dream job — powered by intelligent analysis.
          </p>

          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/profile">
              <Button size="lg">🚀 Start My Journey</Button>
            </Link>
            <Link to="/dashboard">
              <Button size="lg" variant="outline">View Demo Dashboard</Button>
            </Link>
          </div>
        </section>

        {/* Features */}
        <section style={{ padding: '0 24px 80px', maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px,1fr))', gap: '20px' }}>
            {features.map((f, i) => (
              <GlassCard key={i} hover className="animate-fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>
                <div style={{ fontSize: '32px', marginBottom: '12px' }}>{f.icon}</div>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#e8eaf0', marginBottom: '8px' }}>{f.title}</h3>
                <p style={{ fontSize: '13px', color: '#8892a4', lineHeight: 1.6 }}>{f.desc}</p>
              </GlassCard>
            ))}
          </div>
        </section>

        {/* IBM Badge */}
        <section style={{ textAlign: 'center', padding: '0 24px 60px' }}>
          <div className="glass-card" style={{ display: 'inline-block', padding: '16px 32px' }}>
            <span style={{ fontSize: '13px', color: '#8892a4' }}>
              📘 Powered by <strong style={{ color: '#00d4ff' }}>IBM SkillsBuild</strong> course recommendations
            </span>
          </div>
        </section>
      </div>
    </div>
  )
}
