export default function PageWrapper({ children, title, subtitle, maxWidth = '900px' }) {
  return (
    <main style={{
      flex: 1,
      padding: '32px 24px',
      overflowY: 'auto',
      maxWidth,
      margin: '0 auto',
      width: '100%',
    }}>
      {(title || subtitle) && (
        <div style={{ marginBottom: '32px' }}>
          {title && (
            <h1 style={{
              fontSize: '28px', fontWeight: 800,
              background: 'linear-gradient(135deg,#00d4ff,#7c5cd8)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              backgroundClip: 'text', marginBottom: '8px',
            }}>
              {title}
            </h1>
          )}
          {subtitle && (
            <p style={{ color: '#8892a4', fontSize: '15px' }}>{subtitle}</p>
          )}
        </div>
      )}
      {children}
    </main>
  )
}
