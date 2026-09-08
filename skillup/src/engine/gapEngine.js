/**
 * Return skills in career.requiredSkills not present in studentSkills
 */
export function getSkillGap(studentSkills, career) {
  if (!career) return []
  const lower = studentSkills.map(s => s.toLowerCase())
  return career.requiredSkills.filter(s => !lower.includes(s.toLowerCase()))
}

/**
 * Label each gap skill as High / Medium / Low priority based on
 * position in the requiredSkills array (first third = High, etc.)
 */
export function prioritizeGaps(gapSkills, career) {
  if (!career) return []
  const total = career.requiredSkills.length
  return gapSkills.map(skill => {
    const idx = career.requiredSkills.findIndex(s => s.toLowerCase() === skill.toLowerCase())
    const third = Math.ceil(total / 3)
    const priority = idx < third ? 'High' : idx < third * 2 ? 'Medium' : 'Low'
    return { skill, priority }
  })
}
