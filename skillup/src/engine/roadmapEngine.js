import { ROADMAPS } from '../data/roadmaps'
import { COURSES } from '../data/courses'

/**
 * Build a roadmap for careerId, annotating each phase with
 * which gap skills it addresses and courses linked to it.
 */
export function buildRoadmap(gapSkills, careerId) {
  const template = ROADMAPS[careerId]
  if (!template) return null

  const gapLower = gapSkills.map(s => s.toLowerCase())

  return {
    careerId,
    phases: template.phases.map(phase => {
      const relevantGapSkills = phase.skillsAddressed.filter(s =>
        gapLower.includes(s.toLowerCase())
      )
      const courses = phase.courseIds
        .map(id => COURSES.find(c => c.id === id))
        .filter(Boolean)

      return {
        ...phase,
        relevantGapSkills,
        courses,
        hasPriority: relevantGapSkills.length > 0,
      }
    }),
  }
}
