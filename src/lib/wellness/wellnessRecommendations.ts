import type {
  WellnessCategory,
  WellnessRecommendation,
} from "@/types/wellness";

export interface RecommendationInput {
  goals: WellnessCategory[];
  hydrationMl: number | null;
  activityMinutes: number | null;
  sleepHours: number | null;
  moodScore: number | null;
  stressScore: number | null;
}

export function generateWellnessRecommendations(
  input: RecommendationInput
): WellnessRecommendation[] {
  const recommendations: WellnessRecommendation[] = [];

  if (
    input.goals.includes("hydration") &&
     input.hydrationMl !== null &&
    input.hydrationMl < 1500
  ) {
    recommendations.push({
      id: "hydration-reminder",
      category: "hydration",
      title: "Build a Hydration Habit",
      description:
        "Consider recording your water intake throughout the day. Individual hydration needs vary.",
      priority: "medium",
      educational: true,
    });
  }

  if (
    input.goals.includes("activity") &&
    input.activityMinutes !== null &&
    input.activityMinutes < 30
  ) {
    recommendations.push({
      id: "activity-reminder",
      category: "activity",
      title: "Make Time for Movement",
      description:
        "Consider adding an enjoyable activity to your routine, such as walking or gentle stretching.",
      priority: "medium",
      educational: true,
    });
  }

  if (
    input.goals.includes("sleep") &&
    input.sleepHours !== null &&
    input.sleepHours < 7
  ) {
    recommendations.push({
      id: "sleep-reminder",
      category: "sleep",
      title: "Support Your Sleep Routine",
      description:
        "A consistent sleep schedule and relaxing bedtime routine may support better sleep habits.",
      priority: "medium",
      educational: true,
    });
  }

  if (
    input.goals.includes("mood") &&
    input.stressScore !== null &&
    input.stressScore >= 4
  ) {
    recommendations.push({
      id: "stress-support",
      category: "mood",
      title: "Take a Moment for Yourself",
      description:
        "Consider taking a short break, practicing relaxation, or writing about how you feel.",
      priority: "medium",
      educational: true,
    });
  }

  if (recommendations.length === 0) {
    recommendations.push({
      id: "general-wellness",
      category: "activity",
      title: "Keep Building Healthy Habits",
      description:
        "Small, consistent wellness habits can support your overall well-being.",
      priority: "low",
      educational: true,
    });
  }

  return recommendations;
}