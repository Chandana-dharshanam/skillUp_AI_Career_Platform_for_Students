import { useEffect } from 'react'

export default function Modal({ isOpen, onClose, title, children, maxWidth = '560px' }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'rgba(0,0,0,0.7)',
        backdropFilter: 'blur(4px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '20px',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        className="glass-card"
        style={{ width: '100%', maxWidth, padding: '28px', position: 'relative' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          {title && <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#e8eaf0' }}>{title}</h3>}
          <button
            onClick={onClose}
            style={{
              background: 'rgba(255,255,255,0.08)', border: 'none', borderRadius: '8px',
              color: '#8892a4', cursor: 'pointer', padding: '6px 10px', fontSize: '16px',
              fontFamily: 'inherit',
            }}
          >✕</button>
        </div>
        {children}
      </div>
    </div>
  )
}
