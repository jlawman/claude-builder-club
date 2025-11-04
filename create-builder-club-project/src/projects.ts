export interface Project {
  id: string;
  name: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  timeEstimate: string;
  briefPath: string;
  hasDatabase: boolean;
  hasPython: boolean;
}

export const categories = [
  { value: 'academic', name: '📚 Academic Life', emoji: '📚' },
  { value: 'career', name: '💼 Career Development', emoji: '💼' },
  { value: 'campus', name: '🎯 Campus Life', emoji: '🎯' },
  { value: 'finance', name: '💰 Personal Finance', emoji: '💰' },
  { value: 'creative', name: '🎨 Creative & Social', emoji: '🎨' },
  { value: 'health', name: '🏋️ Health & Wellness', emoji: '🏋️' },
  { value: 'productivity', name: '🛠️ Productivity Tools', emoji: '🛠️' },
] as const;

export const projects: Project[] = [
  // EASY PROJECTS
  {
    id: 'study-guide-generator',
    name: 'Study Guide Generator',
    description: 'Upload notes, generate flashcards and quizzes',
    difficulty: 'easy',
    category: 'academic',
    timeEstimate: '1-2 hours',
    briefPath: '../workshop-projects/easy/study-guide-generator.md',
    hasDatabase: false,
    hasPython: false,
  },
  {
    id: 'resume-roaster',
    name: 'Resume Roaster',
    description: 'Get AI feedback on your resume',
    difficulty: 'easy',
    category: 'career',
    timeEstimate: '1-2 hours',
    briefPath: '../workshop-projects/easy/resume-roaster.md',
    hasDatabase: false,
    hasPython: false,
  },
  {
    id: 'meme-generator',
    name: 'Meme Generator',
    description: 'AI-powered meme creation from trending topics',
    difficulty: 'easy',
    category: 'creative',
    timeEstimate: '1-2 hours',
    briefPath: '../workshop-projects/easy/meme-generator.md',
    hasDatabase: false,
    hasPython: false,
  },
  {
    id: 'date-idea-generator',
    name: 'Date Idea Generator',
    description: 'Perfect date planning assistant',
    difficulty: 'easy',
    category: 'creative',
    timeEstimate: '1-2 hours',
    briefPath: '../workshop-projects/easy/date-idea-generator.md',
    hasDatabase: false,
    hasPython: false,
  },

  // MEDIUM PROJECTS
  {
    id: 'scholarship-finder',
    name: 'Scholarship Finder Bot',
    description: 'Auto-discover scholarship opportunities',
    difficulty: 'medium',
    category: 'finance',
    timeEstimate: '2-4 hours',
    briefPath: '../workshop-projects/medium/scholarship-finder.md',
    hasDatabase: true,
    hasPython: false,
  },

  // HARD PROJECTS
  // Add more as they're created
];

export function getProjectsByCategory(category: string): Project[] {
  return projects.filter(p => p.category === category);
}

export function getProjectsByDifficulty(difficulty: 'easy' | 'medium' | 'hard'): Project[] {
  return projects.filter(p => p.difficulty === difficulty);
}

export function getProjectById(id: string): Project | undefined {
  return projects.find(p => p.id === id);
}
