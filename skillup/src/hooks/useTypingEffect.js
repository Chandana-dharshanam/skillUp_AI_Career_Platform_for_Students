import { useState, useEffect, useRef } from 'react'

export function useTypingEffect(text, speed = 35, autoStart = true) {
  const [displayed, setDisplayed] = useState('')
  const [isComplete, setIsComplete] = useState(false)
  const [isRunning, setIsRunning] = useState(false)
  const indexRef = useRef(0)
  const timeoutRef = useRef(null)

  const start = () => {
    indexRef.current = 0
    setDisplayed('')
    setIsComplete(false)
    setIsRunning(true)
  }

  useEffect(() => {
    if (autoStart) start()
    return () => clearTimeout(timeoutRef.current)
  }, [text])

  useEffect(() => {
    if (!isRunning) return
    if (indexRef.current >= text.length) {
      setIsComplete(true)
      setIsRunning(false)
      return
    }
    timeoutRef.current = setTimeout(() => {
      setDisplayed(text.slice(0, indexRef.current + 1))
      indexRef.current += 1
    }, speed)
    return () => clearTimeout(timeoutRef.current)
  }, [isRunning, displayed, text, speed])

  return { displayed, isComplete, start }
}
