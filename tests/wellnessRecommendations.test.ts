import { describe, expect, it } from "vitest";

import {
  generateWellnessRecommendations,
} from "../src/lib/wellness/wellnessRecommendations";

describe("Wellness Recommendation Engine", () => {
  const baseInput = {
    goals: ["hydration", "activity", "sleep", "mood"] as (
      | "hydration"
      | "activity"
      | "sleep"
      | "mood"
    )[],
    hydrationMl: 2000,
    activityMinutes: 45,
    sleepHours: 8,
    moodScore: 4,
    stressScore: 2,
  };

  it("generates hydration recommendations", () => {
    const result = generateWellnessRecommendations({
      ...baseInput,
      hydrationMl: 500,
    });

    expect(
      result.some((item) => item.id === "hydration-reminder")
    ).toBe(true);
  });

  it("generates activity recommendations", () => {
    const result = generateWellnessRecommendations({
      ...baseInput,
      activityMinutes: 10,
    });

    expect(
      result.some((item) => item.id === "activity-reminder")
    ).toBe(true);
  });

  it("generates sleep recommendations", () => {
    const result = generateWellnessRecommendations({
      ...baseInput,
      sleepHours: 5,
    });

    expect(
      result.some((item) => item.id === "sleep-reminder")
    ).toBe(true);
  });

  it("generates stress recommendations", () => {
    const result = generateWellnessRecommendations({
      ...baseInput,
      stressScore: 5,
    });

    expect(
      result.some((item) => item.id === "stress-support")
    ).toBe(true);
  });

  it("returns general advice when goals are met", () => {
    const result = generateWellnessRecommendations(baseInput);

    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("general-wellness");
  });

  it("does not generate advice for unselected goals", () => {
    const result = generateWellnessRecommendations({
      ...baseInput,
      goals: [],
      hydrationMl: 0,
      activityMinutes: 0,
      sleepHours: 0,
      stressScore: 5,
    });

    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("general-wellness");
  });

  it("does not treat missing wellness data as a low result", () => {
  const result = generateWellnessRecommendations({
    goals: ["hydration", "activity", "sleep"],
    hydrationMl: null,
    activityMinutes: null,
    sleepHours: null,
    moodScore: null,
    stressScore: null,
  });

  expect(result).toHaveLength(1);
  expect(result[0].id).toBe("general-wellness");
});
});
