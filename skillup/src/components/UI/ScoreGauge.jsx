import { useEffect, useRef } from 'react'

export default function ScoreGauge({ score = 0, size = 180, label = 'Score' }) {
  const radius = (size / 2) - 18
  const circumference = 2 * Math.PI * radius
  const clampedScore = Math.min(100, Math.max(0, score))
  const offset = circumference - (clampedScore / 100) * circumference

  const color =
    clampedScore >= 75 ? '#00ff9d' :
    clampedScore >= 50 ? '#00d4ff' :
    clampedScore >= 30 ? '#ffd32a' : '#ff4757'

  const label2 =
    clampedScore >= 75 ? 'Job Ready!' :
    clampedScore >= 50 ? 'On Track' :
    clampedScore >= 30 ? 'Developing' : 'Getting Started'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        {/* Track */}
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="12"
        />
        {/* Progress */}
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none"
          stroke={color}
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 1.2s ease, stroke 0.5s ease', filter: `drop-shadow(0 0 6px ${color})` }}
        />
        {/* Center text — counter-rotated */}
        <text
          x={size / 2} y={size / 2 - 6}
          textAnchor="middle"
          dominantBaseline="middle"
          fill={color}
          fontSize="32"
          fontWeight="700"
          style={{ transform: `rotate(90deg)`, transformOrigin: `${size/2}px ${size/2}px`, fontFamily: 'system-ui' }}
        >
          {Math.round(clampedScore)}
        </text>
        <text
          x={size / 2} y={size / 2 + 22}
          textAnchor="middle"
          fill="#8892a4"
          fontSize="12"
          style={{ transform: `rotate(90deg)`, transformOrigin: `${size/2}px ${size/2}px`, fontFamily: 'system-ui' }}
        >
          {label}
        </text>
      </svg>
      <span style={{ color, fontSize: '13px', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
        {label2}
      </span>
    </div>
  )
}
