
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Heart, Save, ShieldCheck } from "lucide-react";
import BottomNav from "@/components/BottomNav";

export default function ProfilePage() {
  const [nickname, setNickname] = useState("");
  const [age, setAge] = useState("");
  const [saved, setSaved] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setNickname(localStorage.getItem("hercare_nickname") || "");
    setAge(localStorage.getItem("hercare_age") || "");
    setLoaded(true);
  }, []);

  function handleSave(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const cleanNickname = nickname.trim();
    const cleanAge = age.trim();

    if (cleanNickname.length > 15) {
      alert("Nickname must be 15 characters or less.");
      return;
    }

    if (cleanAge) {
      const numericAge = Number(cleanAge);
      if (!Number.isInteger(numericAge) || numericAge < 10 || numericAge > 100) {
        alert("Please enter an age between 10 and 100.");
        return;
      }
    }

    // Update only profile fields; preserve all other saved data.
    if (cleanNickname) {
      localStorage.setItem("hercare_nickname", cleanNickname);
    } else {
      localStorage.removeItem("hercare_nickname");
    }

    if (cleanAge) {
      localStorage.setItem("hercare_age", cleanAge);
    } else {
      localStorage.removeItem("hercare_age");
    }

    setNickname(cleanNickname);
    setAge(cleanAge);
    setSaved(true);
  }

  if (!loaded) {
    return (
      <main className="min-h-screen bg-pink-50 flex items-center justify-center">
        <p className="text-gray-600">Loading your profile...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-purple-50 px-5 pt-8 pb-32">
      <div className="mx-auto max-w-lg">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-pink-600"
        >
          <ArrowLeft size={18} />
          Back to Home
        </Link>

        <header className="mt-8 text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-pink-100 text-pink-600">
            <Heart size={36} />
          </div>
          <h1 className="mt-4 text-3xl font-black text-gray-800">
            Your Profile
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Personalize your HerCare+ experience.
          </p>
        </header>

        <form
          onSubmit={handleSave}
          className="mt-8 space-y-6 rounded-3xl border border-pink-100 bg-white p-6 shadow-lg shadow-pink-100/50"
        >
          <div>
            <label htmlFor="nickname" className="mb-2 block text-sm font-bold text-gray-700">
              Preferred nickname
            </label>
            <input
              id="nickname"
              type="text"
              value={nickname}
              onChange={(event) => {
                setNickname(event.target.value);
                setSaved(false);
              }}
              maxLength={15}
              autoComplete="nickname"
              placeholder="e.g. Friend"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-800 outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100"
            />
            <p className="mt-1 text-xs text-gray-500">
              Optional. Use a nickname rather than your full name.
            </p>
          </div>

          <div>
            <label htmlFor="age" className="mb-2 block text-sm font-bold text-gray-700">
              Age
            </label>
            <input
              id="age"
              type="number"
              value={age}
              onChange={(event) => {
                setAge(event.target.value);
                setSaved(false);
              }}
              min={10}
              max={100}
              step={1}
              inputMode="numeric"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-800 outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100"
              placeholder="Enter age (optional)"
            />
            <p className="mt-1 text-xs text-gray-500">
              Used to personalize health guidance.
            </p>
          </div>

          <div className="flex items-start gap-3 rounded-xl bg-purple-50 p-4 text-sm text-purple-800">
            <ShieldCheck size={20} className="mt-0.5 shrink-0" />
            <p>
              Your profile uses the existing browser storage settings. This page
              does not change your other saved preferences.
            </p>
          </div>

          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-pink-500 to-rose-400 px-4 py-3 font-bold text-white shadow-md transition hover:opacity-90"
          >
            <Save size={18} />
            Save Profile
          </button>

          {saved && (
            <p role="status" className="text-center text-sm font-semibold text-green-700">
              Profile saved successfully.
            </p>
          )}
        </form>
      </div>

      <BottomNav />
    </main>
  );
}
