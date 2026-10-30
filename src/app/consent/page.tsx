"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Shield, Heart } from "lucide-react";
import { giveConsent, generateAnonymousId } from "@/lib/security";

export default function ConsentPage() {
  const router = useRouter();
  const [isReading, setIsReading] = useState(true);

  const handleAccept = () => {
    giveConsent();
    generateAnonymousId();
    localStorage.setItem("hercare_onboarded", "true");
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-purple-50 to-white flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-6"
        >
          {/* Icon */}
          <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center mx-auto shadow-xl">
            <Shield size={40} className="text-white" />
          </div>

          {/* Title */}
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              You&apos;re in Control
            </h1>
            <p className="text-gray-600 text-lg">
              Here&apos;s how we protect your privacy
            </p>
          </div>

          {/* Key Points */}
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-pink-100 text-left space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center shrink-0">
                <span className="text-green-600 font-bold">1</span>
              </div>
              <div>
                <h3 className="font-bold text-gray-800 mb-1">Anonymous by Default</h3>
                <p className="text-sm text-gray-600">
                  We <strong>never</strong> ask for your name, email, or phone. Your identity stays with you.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center shrink-0">
                <span className="text-purple-600 font-bold">2</span>
              </div>
              <div>
                <h3 className="font-bold text-gray-800 mb-1">Encrypted Locally</h3>
                <p className="text-sm text-gray-600">
                  Your conversations are encrypted <strong>on your device</strong>. We can&apos;t read them, and no one else can either.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center shrink-0">
                <span className="text-pink-600 font-bold">3</span>
              </div>
              <div>
                <h3 className="font-bold text-gray-800 mb-1">You Can Delete Anytime</h3>
                <p className="text-sm text-gray-600">
                  One tap, and <strong>everything</strong> is gone. No questions, no backup copies.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
                <span className="text-blue-600 font-bold">4</span>
              </div>
              <div>
                <h3 className="font-bold text-gray-800 mb-1">No Ads, No Tracking</h3>
                <p className="text-sm text-gray-600">
                  We don&apos;t sell your data. We don&apos;t show you ads. <strong>You&apos;re not a product.</strong>
                </p>
              </div>
            </div>
          </div>

          {/* Consent Checkbox */}
          <div className="bg-purple-50 p-5 rounded-2xl border border-purple-100">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={!isReading}
                onChange={(e) => setIsReading(!e.target.checked)}
                className="mt-1 w-5 h-5 accent-purple-600"
              />
              <span className="text-sm text-gray-700 leading-relaxed">
                I understand how my privacy is protected. I&apos;m ready to use HerCare+ knowing my data is safe and under my control.
              </span>
            </label>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={handleAccept}
              disabled={isReading}
              className="w-full bg-gradient-to-r from-pink-500 to-rose-400 text-white py-4 rounded-full font-bold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <Heart size={20} fill="currentColor" />
              I Trust HerCare+
            </button>
            
            <a href="https://www.who.int" target="_blank" rel="noopener noreferrer" className="block text-center">
              <button className="text-purple-600 text-sm font-medium underline">
                Read full privacy policy
              </button>
            </a>
          </div>

          <p className="text-xs text-gray-400 italic">
            This is a safe space. We&apos;re here to support you, not exploit you. 💜
          </p>
        </motion.div>
      </div>
    </div>
  );
}
