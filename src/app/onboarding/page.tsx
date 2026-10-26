"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Heart, Lock, Sparkles, User, Calendar } from "lucide-react";

const ONBOARDING_STEPS = [
  {
    emoji: "🌸",
    title: "Hey there, friend",
    subtitle: "You're not alone in this journey.",
    description: "This is your private space. No judgments, no shame, just support.",
  },
  {
    emoji: "🔒",
    title: "Your secrets are safe",
    subtitle: "We don't store your name, email, or phone.",
    description: "Everything stays on your device. You can clear it anytime.",
  },
  {
    emoji: "💜",
    title: "Talk freely, in your language",
    subtitle: "Type or speak—we understand 6 Indian languages.",
    description: "Whether it's Hindi, Tamil, or English, we're here to listen.",
  },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [showNameInput, setShowNameInput] = useState(false);
  const [showAgeInput, setShowAgeInput] = useState(false);

  const currentStep = ONBOARDING_STEPS[step];

  const handleNext = () => {
    if (step < ONBOARDING_STEPS.length - 1) {
      setStep(step + 1);
    } else {
      setShowNameInput(true);
    }
  };

  const handleNameNext = () => {
    setShowNameInput(false);
    setShowAgeInput(true);
  };

  const handleStart = () => {
    // Save both name and age to localStorage
    if (name.trim()) {
      localStorage.setItem("hercare_nickname", name);
    }
    if (age.trim()) {
      localStorage.setItem("hercare_age", age);
    }
    localStorage.setItem("hercare_onboarded", "true");
    // Redirect to consent page instead of home
    router.push("/consent");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-purple-50 to-white flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full">
        {!showNameInput && !showAgeInput ? (
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-8"
          >
            {/* Emoji */}
            <div className="text-8xl mb-4">{currentStep.emoji}</div>

            {/* Title */}
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                {currentStep.title}
              </h1>
              <p className="text-pink-600 font-semibold text-lg">
                {currentStep.subtitle}
              </p>
            </div>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed max-w-xs mx-auto">
              {currentStep.description}
            </p>

            {/* Progress Dots */}
            <div className="flex justify-center gap-2 my-8">
              {ONBOARDING_STEPS.map((_, i) => (
                <div
                  key={i}
                  className={`h-2 rounded-full transition-all ${
                    i === step ? "w-8 bg-pink-400" : "w-2 bg-gray-200"
                  }`}
                />
              ))}
            </div>

            {/* Next Button */}
            <button
              onClick={handleNext}
              className="w-full bg-gradient-to-r from-pink-500 to-rose-400 text-white py-4 rounded-full font-bold shadow-lg hover:shadow-xl transition-all"
            >
              {step === ONBOARDING_STEPS.length - 1 ? "I'm ready" : "Continue"}
            </button>
          </motion.div>
        ) : showNameInput ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-6"
          >
            <div className="text-6xl mb-4">✨</div>
            <h2 className="text-2xl font-bold text-gray-800">
              What should we call you?
            </h2>
            <p className="text-sm text-gray-500">
              (Optional - Just a friendly nickname, not your real name)
            </p>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Priya, Didi, or skip"
              className="w-full px-6 py-4 rounded-full border-2 border-pink-200 focus:border-pink-400 outline-none text-center text-lg"
              maxLength={15}
              onKeyPress={(e) => e.key === 'Enter' && handleNameNext()}
            />

            <div className="space-y-3">
              <button
                onClick={handleNameNext}
                className="w-full bg-gradient-to-r from-pink-500 to-rose-400 text-white py-4 rounded-full font-bold"
              >
                Next
              </button>
              <button
                onClick={handleNameNext}
                className="text-gray-400 text-sm"
              >
                Skip this step
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-6"
          >
            <div className="text-6xl mb-4">🎂</div>
            <h2 className="text-2xl font-bold text-gray-800">
              How old are you, {name || 'friend'}?
            </h2>
            <p className="text-sm text-gray-500">
              (This helps us personalize your experience)
            </p>

            <div className="relative">
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="e.g., 18, 25, 30"
                className="w-full px-6 py-4 rounded-full border-2 border-pink-200 focus:border-pink-400 outline-none text-center text-lg"
                min="10"
                max="100"
                onKeyPress={(e) => e.key === 'Enter' && handleStart()}
              />
              <Calendar className="absolute right-6 top-1/2 -translate-y-1/2 text-pink-300" size={20} />
            </div>

            {age && parseInt(age) < 18 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-purple-50 border border-purple-200 rounded-2xl p-4"
              >
                <p className="text-sm text-purple-700">
                  💜 We&apos;re here for you! Remember, you can always talk to a trusted adult about your health.
                </p>
              </motion.div>
            )}

            {age && parseInt(age) >= 18 && parseInt(age) <= 25 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-pink-50 border border-pink-200 rounded-2xl p-4"
              >
                <p className="text-sm text-pink-700">
                  ✨ Welcome! This is a great age to start understanding your body better.
                </p>
              </motion.div>
            )}

            {age && parseInt(age) > 25 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-blue-50 border border-blue-200 rounded-2xl p-4"
              >
                <p className="text-sm text-blue-700">
                  🌸 Your health journey matters at every stage. We&apos;re here to support you!
                </p>
              </motion.div>
            )}

            <div className="space-y-3">
              <button
                onClick={handleStart}
                className="w-full bg-gradient-to-r from-pink-500 to-rose-400 text-white py-4 rounded-full font-bold shadow-lg hover:shadow-xl transition-all"
              >
                Start Using HerCare+ 💜
              </button>
              <button
                onClick={() => {
                  setShowAgeInput(false);
                  setShowNameInput(true);
                }}
                className="text-gray-400 text-sm"
              >
                ← Go back
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
