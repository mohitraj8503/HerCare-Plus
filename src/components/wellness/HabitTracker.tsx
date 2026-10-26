"use client";

import { useState } from "react";
import { CheckCircle2, Circle, Plus, Trash2 } from "lucide-react";

interface Habit {
  id: string;
  title: string;
  completed: boolean;
}

export default function HabitTracker() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [newHabit, setNewHabit] = useState("");

  const completedCount = habits.filter(
    (habit) => habit.completed
  ).length;

  const progress =
    habits.length > 0
      ? Math.round((completedCount / habits.length) * 100)
      : 0;

  function addHabit() {
    const title = newHabit.trim();

    if (!title || title.length > 100) {
      return;
    }

    setHabits((previous) => [
      ...previous,
      {
        id: crypto.randomUUID(),
        title,
        completed: false,
      },
    ]);

    setNewHabit("");
  }

  function toggleHabit(id: string) {
    setHabits((previous) =>
      previous.map((habit) =>
        habit.id === id
          ? { ...habit, completed: !habit.completed }
          : habit
      )
    );
  }

  function deleteHabit(id: string) {
    setHabits((previous) =>
      previous.filter((habit) => habit.id !== id)
    );
  }

  return (
    <section className="mt-10 rounded-3xl border border-pink-100 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-bold text-gray-900">
        Daily Habit Tracker
      </h2>

      <p className="mt-2 text-sm text-gray-600">
        Create habits and track your progress for this session.
      </p>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          addHabit();
        }}
        className="mt-6 flex flex-col gap-3 sm:flex-row"
      >
        <label htmlFor="new-habit" className="sr-only">
          New habit
        </label>

        <input
          id="new-habit"
          type="text"
          maxLength={100}
          value={newHabit}
          onChange={(event) => setNewHabit(event.target.value)}
          placeholder="Example: Take a short walk"
          className="flex-1 rounded-xl border border-gray-300 p-3 text-gray-900"
        />

        <button
          type="submit"
          className="flex items-center justify-center gap-2 rounded-xl bg-pink-600 px-5 py-3 font-semibold text-white hover:bg-pink-700"
        >
          <Plus size={18} />
          Add Habit
        </button>
      </form>

      <div className="mt-7">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-900">
            Today's Progress
          </h3>

          <span className="text-sm text-gray-600">
            {completedCount}/{habits.length} completed
          </span>
        </div>

        <div
          className="mt-3 h-3 overflow-hidden rounded-full bg-gray-100"
          role="progressbar"
          aria-label="Habit completion progress"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            className="h-full rounded-full bg-green-500 transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="mt-2 text-right text-sm text-gray-500">
          {progress}% complete
        </p>
      </div>

      <div className="mt-6 space-y-3">
        {habits.length === 0 ? (
          <p className="rounded-xl bg-gray-50 p-4 text-sm text-gray-500">
            No habits added yet. Create your first habit above.
          </p>
        ) : (
          habits.map((habit) => (
            <div
              key={habit.id}
              className="flex items-center justify-between gap-3 rounded-xl border border-gray-100 p-4"
            >
              <button
                type="button"
                aria-pressed={habit.completed}
                onClick={() => toggleHabit(habit.id)}
                className="flex min-w-0 flex-1 items-center gap-3 text-left"
              >
                {habit.completed ? (
                  <CheckCircle2
                    size={22}
                    className="shrink-0 text-green-600"
                  />
                ) : (
                  <Circle
                    size={22}
                    className="shrink-0 text-gray-400"
                  />
                )}

                <span
                  className={`break-words ${
                    habit.completed
                      ? "text-gray-400 line-through"
                      : "text-gray-800"
                  }`}
                >
                  {habit.title}
                </span>
              </button>

              <button
                type="button"
                aria-label={`Delete ${habit.title}`}
                onClick={() => deleteHabit(habit.id)}
                className="shrink-0 rounded-lg p-2 text-red-500 hover:bg-red-50"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))
        )}
      </div>

      <p className="mt-5 text-xs text-gray-500">
        Development preview: Habits are stored only in memory
        and reset when the page reloads.
      </p>
    </section>
  );
}