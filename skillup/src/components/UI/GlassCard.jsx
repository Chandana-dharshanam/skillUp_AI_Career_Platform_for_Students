export default function GlassCard({ children, className = '', hover = false, selected = false, onClick }) {
  const base = hover ? 'glass-card-hover' : 'glass-card'
  const selectedStyle = selected ? 'border-[rgba(0,212,255,0.6)] shadow-[0_0_20px_rgba(0,212,255,0.2)]' : ''
  return (
    <div
      className={`${base} p-6 ${selectedStyle} ${className}`}
      onClick={onClick}
      style={selected ? { borderColor: 'rgba(0,212,255,0.6)', boxShadow: '0 0 20px rgba(0,212,255,0.2)' } : {}}
    >
      {children}
    </div>
  )
}
