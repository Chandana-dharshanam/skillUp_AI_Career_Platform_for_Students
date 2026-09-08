// Master skill list — used by Profile page, careers, courses
export const ALL_SKILLS = {
  Programming: [
    'Python', 'JavaScript', 'Java', 'C++', 'TypeScript',
    'SQL', 'Bash/Shell', 'R',
  ],
  'Data & AI': [
    'Machine Learning', 'Deep Learning', 'Data Analysis', 'Data Visualization',
    'NLP', 'Statistics', 'TensorFlow', 'Pandas/NumPy',
  ],
  Cloud: [
    'Cloud Computing', 'AWS', 'IBM Cloud', 'Docker', 'Kubernetes',
    'CI/CD', 'Linux',
  ],
  Security: [
    'Cybersecurity', 'Network Security', 'Ethical Hacking', 'Cryptography',
    'SIEM Tools', 'Vulnerability Assessment',
  ],
  'Web & Design': [
    'React', 'Node.js', 'REST APIs', 'HTML/CSS', 'Figma/UI Design',
    'MongoDB', 'Git',
  ],
  'Soft Skills': [
    'Problem Solving', 'Communication', 'Teamwork', 'Agile/Scrum',
  ],
}

// Flat array for engine use
export const SKILL_LIST = Object.values(ALL_SKILLS).flat()

export const CAREERS = [
  {
    id: 'software-dev',
    title: 'Software Developer',
    icon: '💻',
    description: 'Build scalable applications and systems that power modern businesses.',
    salaryRange: '₹5L – ₹18L / year',
    requiredSkills: [
      'JavaScript', 'Python', 'React', 'Node.js', 'REST APIs',
      'HTML/CSS', 'SQL', 'Git', 'TypeScript', 'MongoDB',
      'Docker', 'Linux', 'CI/CD', 'Agile/Scrum', 'Problem Solving',
      'Communication', 'Data Structures', 'Algorithms',
    ],
    color: '#00d4ff',
  },
  {
    id: 'ai-ml',
    title: 'AI/ML Engineer',
    icon: '🤖',
    description: 'Design and deploy intelligent systems using machine learning and deep learning.',
    salaryRange: '₹8L – ₹30L / year',
    requiredSkills: [
      'Python', 'Machine Learning', 'Deep Learning', 'TensorFlow',
      'Pandas/NumPy', 'Statistics', 'Data Analysis', 'NLP',
      'SQL', 'Data Visualization', 'Cloud Computing', 'Docker',
      'Git', 'Problem Solving', 'R', 'Mathematics',
    ],
    color: '#7c5cd8',
  },
  {
    id: 'data-analyst',
    title: 'Data Analyst',
    icon: '📊',
    description: 'Transform raw data into insights that drive strategic business decisions.',
    salaryRange: '₹4L – ₹14L / year',
    requiredSkills: [
      'SQL', 'Python', 'Data Analysis', 'Data Visualization', 'Statistics',
      'Pandas/NumPy', 'R', 'Excel/Spreadsheets', 'Communication',
      'Problem Solving', 'Machine Learning', 'Agile/Scrum',
      'Storytelling', 'Business Analysis',
    ],
    color: '#00ff9d',
  },
  {
    id: 'cybersecurity',
    title: 'Cybersecurity Analyst',
    icon: '🛡️',
    description: 'Protect organizations from cyber threats, breaches, and vulnerabilities.',
    salaryRange: '₹5L – ₹20L / year',
    requiredSkills: [
      'Cybersecurity', 'Network Security', 'Linux', 'Ethical Hacking',
      'Cryptography', 'SIEM Tools', 'Vulnerability Assessment', 'Python',
      'Bash/Shell', 'SQL', 'Cloud Computing', 'Communication',
      'Problem Solving', 'Risk Assessment', 'Incident Response',
    ],
    color: '#ff4757',
  },
  {
    id: 'cloud-engineer',
    title: 'Cloud Engineer',
    icon: '☁️',
    description: 'Architect and manage scalable cloud infrastructure for modern applications.',
    salaryRange: '₹6L – ₹22L / year',
    requiredSkills: [
      'Cloud Computing', 'AWS', 'IBM Cloud', 'Docker', 'Kubernetes',
      'Linux', 'CI/CD', 'Bash/Shell', 'Python', 'Networking',
      'Infrastructure as Code', 'Security', 'Monitoring', 'Git',
      'Problem Solving', 'Communication',
    ],
    color: '#ffd32a',
  },
  {
    id: 'ux-designer',
    title: 'UX Designer',
    icon: '🎨',
    description: 'Craft intuitive digital experiences that delight users and solve real problems.',
    salaryRange: '₹4L – ₹16L / year',
    requiredSkills: [
      'Figma/UI Design', 'HTML/CSS', 'JavaScript', 'React',
      'User Research', 'Prototyping', 'Communication', 'Teamwork',
      'Problem Solving', 'Accessibility', 'Visual Design', 'Agile/Scrum',
      'Data Analysis', 'Storytelling',
    ],
    color: '#ff6b9d',
  },
]
