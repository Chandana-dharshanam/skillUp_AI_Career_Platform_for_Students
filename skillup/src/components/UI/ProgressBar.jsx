export default function ProgressBar({ value = 0, max = 100, color = 'neon', label, showPercent = true, height = 8 }) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100))

  const colors = {
    neon:   'linear-gradient(90deg, #00d4ff, #7c5cd8)',
    green:  'linear-gradient(90deg, #00ff9d, #00d4ff)',
    red:    'linear-gradient(90deg, #ff4757, #ff6b81)',
    yellow: 'linear-gradient(90deg, #ffd32a, #ffb142)',
    purple: 'linear-gradient(90deg, #7c5cd8, #a29bfe)',
  }

  return (
    <div style={{ width: '100%' }}>
      {(label || showPercent) && (
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
          {label && <span style={{ fontSize: '13px', color: '#8892a4' }}>{label}</span>}
          {showPercent && <span style={{ fontSize: '13px', color: '#00d4ff', fontWeight: 600 }}>{Math.round(pct)}%</span>}
        </div>
      )}
      <div style={{
        width: '100%',
        height: `${height}px`,
        background: 'rgba(255,255,255,0.08)',
        borderRadius: '999px',
        overflow: 'hidden',
      }}>
        <div style={{
          width: `${pct}%`,
          height: '100%',
          background: colors[color] || colors.neon,
          borderRadius: '999px',
          transition: 'width 0.8s ease',
          boxShadow: '0 0 8px rgba(0,212,255,0.4)',
        }} />
      </div>
    </div>
  )
}
