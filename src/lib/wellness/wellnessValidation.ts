import {
  WELLNESS_CATEGORIES,
  type WellnessCategory,
} from "@/types/wellness";

export interface WellnessInput {
  category: WellnessCategory;
  date: string;
  value: number;
  unit: string;
  notes?: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

const CATEGORY_LIMITS: Record<
  WellnessCategory,
  { min: number; max: number; unit: string }
> = {
  hydration: {
    min: 0,
    max: 10000,
    unit: "ml",
  },

  nutrition: {
    min: 0,
    max: 20,
    unit: "meals",
  },

  activity: {
    min: 0,
    max: 1440,
    unit: "minutes",
  },

  sleep: {
    min: 0,
    max: 24,
    unit: "hours",
  },

  mood: {
    min: 1,
    max: 5,
    unit: "score",
  },
};

export function isWellnessCategory(
  value: unknown
): value is WellnessCategory {
  return (
    typeof value === "string" &&
    WELLNESS_CATEGORIES.some(
      (category) => category === value
    )
  );
}

export function validateWellnessInput(
  input: unknown
): ValidationResult {
  const errors: string[] = [];

  if (
    typeof input !== "object" ||
    input === null ||
    Array.isArray(input)
  ) {
    return {
      valid: false,
      errors: ["Invalid wellness data."],
    };
  }

  const data = input as Record<string, unknown>;

  if (!isWellnessCategory(data.category)) {
    errors.push("Invalid wellness category.");
  }

  if (
    typeof data.date !== "string" ||
    !/^\d{4}-\d{2}-\d{2}$/.test(data.date) ||
    !Number.isFinite(Date.parse(`${data.date}T00:00:00Z`)) ||
    new Date(`${data.date}T00:00:00Z`)
      .toISOString()
      .slice(0, 10) !== data.date
  ) {
    errors.push("Date must be a valid YYYY-MM-DD date.");
  }

  if (
    typeof data.value !== "number" ||
    !Number.isFinite(data.value)
  ) {
    errors.push("Value must be a finite number.");
  }

  if (isWellnessCategory(data.category)) {
    const limits = CATEGORY_LIMITS[data.category];

    if (
      typeof data.value === "number" &&
      Number.isFinite(data.value) &&
      (data.value < limits.min ||
        data.value > limits.max)
    ) {
      errors.push(
        `Value must be between ${limits.min} and ${limits.max}.`
      );
    }

    if (data.unit !== limits.unit) {
      errors.push(
        `Unit must be ${limits.unit} for ${data.category}.`
      );
    }

    if (
      (data.category === "nutrition" ||
        data.category === "mood") &&
      typeof data.value === "number" &&
      !Number.isInteger(data.value)
    ) {
      errors.push("Value must be a whole number.");
    }
  }

  if (
    data.notes !== undefined &&
    (typeof data.notes !== "string" ||
      data.notes.length > 1000)
  ) {
    errors.push(
      "Notes must be text with a maximum of 1000 characters."
    );
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}