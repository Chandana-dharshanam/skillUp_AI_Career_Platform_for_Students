export default function Button({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  fullWidth = false,
  type = 'button',
  className = '',
}) {
  const variants = {
    primary: {
      background: 'linear-gradient(135deg, #00d4ff, #7c5cd8)',
      color: '#fff',
      border: 'none',
      boxShadow: '0 4px 20px rgba(0,212,255,0.3)',
    },
    secondary: {
      background: 'rgba(255,255,255,0.06)',
      color: '#e8eaf0',
      border: '1px solid rgba(0,212,255,0.25)',
      boxShadow: 'none',
    },
    outline: {
      background: 'transparent',
      color: '#00d4ff',
      border: '1px solid rgba(0,212,255,0.5)',
      boxShadow: 'none',
    },
    danger: {
      background: 'rgba(255,71,87,0.15)',
      color: '#ff4757',
      border: '1px solid rgba(255,71,87,0.4)',
      boxShadow: 'none',
    },
    ghost: {
      background: 'transparent',
      color: '#8892a4',
      border: 'none',
      boxShadow: 'none',
    },
  }

  const sizes = {
    sm: { padding: '7px 16px',  fontSize: '13px', borderRadius: '8px' },
    md: { padding: '10px 22px', fontSize: '14px', borderRadius: '10px' },
    lg: { padding: '13px 28px', fontSize: '15px', borderRadius: '12px' },
  }

  const v = variants[variant] || variants.primary
  const s = sizes[size] || sizes.md

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={className}
      style={{
        ...v,
        ...s,
        fontWeight: 600,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        transition: 'all 0.2s ease',
        width: fullWidth ? '100%' : 'auto',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        fontFamily: 'inherit',
        letterSpacing: '0.02em',
      }}
      onMouseEnter={e => {
        if (!disabled) e.currentTarget.style.transform = 'translateY(-1px)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)'
      }}
    >
      {children}
    </button>
  )
}
