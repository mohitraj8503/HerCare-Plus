export const WELLNESS_CATEGORIES = [
  "hydration",
  "nutrition",
  "activity",
  "sleep",
  "mood",
] as const;

export type WellnessCategory =
  (typeof WELLNESS_CATEGORIES)[number];

export type MoodLevel = 1 | 2 | 3 | 4 | 5;

export interface WellnessEntry {
  id: string;
  ownerId: string;
  category: WellnessCategory;
  date: string;

  value: number;
  unit: string;

  notes?: string;

  createdAt: string;
  updatedAt: string;
}

export interface WellnessGoal {
  id: string;
  ownerId: string;

  category: WellnessCategory;

  target: number;
  unit: string;

  active: boolean;

  createdAt: string;
  updatedAt: string;
}

export interface MoodJournal {
  id: string;
  ownerId: string;

  date: string;

  mood: MoodLevel;
  stress: MoodLevel;

  notes?: string;

  createdAt: string;
  updatedAt: string;
}

export interface WellnessHabit {
  id: string;
  ownerId: string;

  title: string;
  description?: string;

  frequency: "daily" | "weekly";

  active: boolean;

  createdAt: string;
  updatedAt: string;
}

export interface HabitCompletion {
  id: string;
  ownerId: string;

  habitId: string;
  date: string;

  completed: boolean;
}

export interface WellnessPreferences {
  ownerId: string;

  notificationsEnabled: boolean;
  cycleIntegrationConsent: boolean;

  reminderTime?: string;

  updatedAt: string;
}

export interface WellnessRecommendation {
  id: string;

  category: WellnessCategory;

  title: string;
  description: string;

  priority: "low" | "medium" | "high";

  educational: boolean;
}

export interface WellnessDashboardSummary {
  date: string;

  hydrationTotal: number;
  activityMinutes: number;
  sleepHours: number;

  moodAverage: number | null;
  stressAverage: number | null;

  completedHabits: number;
  totalHabits: number;

  recommendations: WellnessRecommendation[];
}