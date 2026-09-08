import { useTypingEffect } from '../../hooks/useTypingEffect'

export default function TypingText({ text, speed = 35, className = '', onComplete, showCursor = true }) {
  const { displayed, isComplete } = useTypingEffect(text, speed)

  if (onComplete && isComplete) {
    // Fire onComplete once on next render
  }

  return (
    <span className={className}>
      {displayed}
      {showCursor && !isComplete && (
        <span
          style={{
            display: 'inline-block',
            width: '2px',
            height: '1em',
            background: '#00d4ff',
            marginLeft: '2px',
            verticalAlign: 'text-bottom',
            animation: 'pulse-neon 1s ease-in-out infinite',
          }}
        />
      )}
    </span>
  )
}
