import { COURSES } from '../data/courses'

/**
 * Filter and rank courses that cover the student's gap skills.
 * Returns top 8, sorted by coverage count descending.
 */
export function recommendCourses(gapSkills, level = null) {
  if (!gapSkills || gapSkills.length === 0) return COURSES.slice(0, 8)

  const gapLower = gapSkills.map(s => s.toLowerCase())

  const scored = COURSES.map(course => {
    const coverage = course.skillsCovered.filter(s =>
      gapLower.includes(s.toLowerCase())
    ).length
    return { ...course, coverage }
  })
  .filter(c => c.coverage > 0 || !gapSkills.length)
  .sort((a, b) => b.coverage - a.coverage)

  if (level) {
    const filtered = scored.filter(c => c.level === level)
    return (filtered.length >= 4 ? filtered : scored).slice(0, 8)
  }

  return scored.slice(0, 8)
}
