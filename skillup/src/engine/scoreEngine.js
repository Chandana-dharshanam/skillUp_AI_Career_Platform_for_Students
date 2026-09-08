/**
 * Calculate overall job-readiness score (0–100).
 * Weights: Skill Match 40%, Gap Coverage 30%, Interview 30%
 *
 * @param {number} skillMatchPercent  – 0–100 from careerEngine
 * @param {number} gapCount          – number of missing skills
 * @param {number} totalRequired     – total skills required by career
 * @param {number} interviewAvgScore – 0–10 from interviewEngine
 */
export function calculateReadinessScore(skillMatchPercent, gapCount, totalRequired, interviewAvgScore) {
  const gapCoverage = totalRequired > 0
    ? Math.round(((totalRequired - gapCount) / totalRequired) * 100)
    : 100

  const interviewNormalized = Math.round((interviewAvgScore / 10) * 100)

  const overall = Math.round(
    skillMatchPercent  * 0.40 +
    gapCoverage        * 0.30 +
    interviewNormalized * 0.30
  )

  return {
    overall: Math.min(100, overall),
    breakdown: {
      skillMatch:          Math.min(100, skillMatchPercent),
      gapCoverage:         Math.min(100, gapCoverage),
      interviewPerformance: Math.min(100, interviewNormalized),
    },
  }
}

/** Human-readable summary based on score range */
export function getReadinessSummary(score, careerTitle) {
  if (score >= 80) {
    return `Outstanding! With a readiness score of ${score}/100, you are well-prepared for ${careerTitle} roles. Focus on polishing your portfolio and applying to companies.`
  }
  if (score >= 60) {
    return `Good progress! Your score of ${score}/100 shows solid preparation for ${careerTitle}. Complete the recommended courses and retry the mock interview to push past 80.`
  }
  if (score >= 40) {
    return `You're on your way! A score of ${score}/100 for ${careerTitle} means you have the basics. Follow the learning roadmap and fill your key skill gaps to become more competitive.`
  }
  return `You're just getting started on your ${careerTitle} journey (${score}/100). That's great — everyone starts somewhere! Work through the Foundation phase of your roadmap and revisit this score in a few weeks.`
}
