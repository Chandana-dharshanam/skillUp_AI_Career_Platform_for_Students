export default function SkillBadge({ skill, variant = 'default', size = 'sm', onClick, active = false }) {
  const variants = {
    default:  { bg: 'rgba(0,212,255,0.08)',  border: 'rgba(0,212,255,0.25)',  color: '#00d4ff' },
    owned:    { bg: 'rgba(0,255,157,0.08)',  border: 'rgba(0,255,157,0.3)',   color: '#00ff9d' },
    missing:  { bg: 'rgba(255,71,87,0.08)',  border: 'rgba(255,71,87,0.3)',   color: '#ff4757' },
    warning:  { bg: 'rgba(255,211,42,0.08)', border: 'rgba(255,211,42,0.3)',  color: '#ffd32a' },
    purple:   { bg: 'rgba(124,92,216,0.12)', border: 'rgba(124,92,216,0.4)',  color: '#a29bfe' },
    active:   { bg: 'rgba(0,212,255,0.2)',   border: 'rgba(0,212,255,0.7)',   color: '#00d4ff' },
  }

  const v = active ? variants.active : (variants[variant] || variants.default)
  const sizes = {
    xs: { fontSize: '11px', padding: '2px 8px' },
    sm: { fontSize: '12px', padding: '4px 10px' },
    md: { fontSize: '13px', padding: '5px 12px' },
  }
  const s = sizes[size] || sizes.sm

  return (
    <span
      onClick={onClick}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        background: v.bg,
        border: `1px solid ${v.border}`,
        color: v.color,
        borderRadius: '999px',
        fontWeight: 500,
        cursor: onClick ? 'pointer' : 'default',
        transition: 'all 0.2s ease',
        userSelect: 'none',
        ...s,
      }}
    >
      {skill}
    </span>
  )
}
