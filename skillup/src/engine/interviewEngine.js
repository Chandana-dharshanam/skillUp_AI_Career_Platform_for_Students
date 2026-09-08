/**
 * Evaluate a single answer against a question's expected keywords.
 * Returns score (0–10), feedback string, and improvement tip.
 */
export function evaluateAnswer(answer, question) {
  if (!answer || answer.trim().length < 5) {
    return {
      score: 0,
      feedback: 'No answer provided.',
      tip: `Study the concept: "${question.text.slice(0, 60)}…"`,
      keywordsHit: [],
      keywordsMissed: question.expectedKeywords,
    }
  }

  const answerLower = answer.toLowerCase()
  const keywordsHit = question.expectedKeywords.filter(kw => answerLower.includes(kw.toLowerCase()))
  const keywordsMissed = question.expectedKeywords.filter(kw => !answerLower.includes(kw.toLowerCase()))
  const hitRate = keywordsHit.length / question.expectedKeywords.length

  // Length bonus: longer thoughtful answers get a small boost
  const lengthBonus = Math.min(1, answer.trim().split(' ').length / 80) * 2
  const rawScore = hitRate * 8 + lengthBonus
  const score = Math.min(10, Math.round(rawScore))

  const feedback = generateFeedbackText(score, keywordsHit, keywordsMissed, question.type)
  const tip = generateTip(score, keywordsMissed, question)

  return { score, feedback, keywordsHit, keywordsMissed, tip }
}

/**
 * Bulk-evaluate all answers and return array of per-question results.
 */
export function gradeInterview(answers, questions) {
  return questions.map(q => ({
    question: q,
    answer: answers[q.id] || '',
    ...evaluateAnswer(answers[q.id] || '', q),
  }))
}

// ── Internal helpers ──────────────────────────────────────────────────────────

function generateFeedbackText(score, hit, missed, type) {
  if (score >= 8) {
    return `Excellent answer! You covered ${hit.length} key concepts clearly and demonstrated strong understanding.`
  }
  if (score >= 6) {
    return `Good answer. You mentioned ${hit.length} important concepts. With a bit more depth this would be outstanding.`
  }
  if (score >= 4) {
    return `Decent attempt. You touched on ${hit.length} relevant points, but missed some important concepts.`
  }
  if (score >= 2) {
    return `Your answer needs improvement. Only ${hit.length} key concepts were addressed. Try to be more specific.`
  }
  return `This answer is too brief or off-topic. Review the fundamentals of this ${type} concept.`
}

function generateTip(score, missed, question) {
  if (score >= 8) return '✅ Great job! Keep practicing to maintain this level.'
  if (missed.length === 0) return '✅ All key concepts covered!'
  const sample = missed.slice(0, 3).join(', ')
  return `💡 Focus on these concepts next time: ${sample}. Review the relevant IBM SkillsBuild course.`
}
