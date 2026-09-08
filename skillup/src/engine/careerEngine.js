import { CAREERS } from '../data/careers'

/**
 * Score a single career against student skills (0–100)
 */
export function scoreCareer(studentSkills, career) {
  if (!studentSkills || studentSkills.length === 0) return 0
  const matched = career.requiredSkills.filter(s =>
    studentSkills.map(sk => sk.toLowerCase()).includes(s.toLowerCase())
  )
  return Math.round((matched.length / career.requiredSkills.length) * 100)
}

/**
 * Return careers sorted by match %, with optional interest boost
 */
export function rankCareers(studentSkills, interests = []) {
  return CAREERS.map(career => {
    const base = scoreCareer(studentSkills, career)
    const interestBoost = interests.includes(career.id) ? 10 : 0
    const matchPercent = Math.min(100, base + interestBoost)
    const matched = career.requiredSkills.filter(s =>
      studentSkills.map(sk => sk.toLowerCase()).includes(s.toLowerCase())
    )
    return {
      ...career,
      matchPercent,
      matchedSkills: matched,
      missingCount: career.requiredSkills.length - matched.length,
    }
  }).sort((a, b) => b.matchPercent - a.matchPercent)
}
