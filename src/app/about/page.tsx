"use client";

import { motion } from "framer-motion";
import { Mail, Linkedin, Github, Instagram, Shield, X, Sparkles } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";

export default function AboutPage() {
  const [showContact, setShowContact] = useState(false);

  const socialLinks = [
    { icon: Linkedin, label: "Open LinkedIn", url: "https://linkedin.com/in/mohitraj8503", color: "#0A66C2" },
    { icon: Github, label: "View GitHub", url: "https://github.com/mohitraj8503", color: "#24292e" },
    { icon: Instagram, label: "Open Instagram", url: "https://instagram.com/pmenthuse", color: "#E4405F" },
    { icon: Mail, label: "Contact me", onClick: () => setShowContact(true), color: "#EA4335" },
  ];

  return (
    <div className="min-h-screen bg-[#FFF9FB] pt-16 pb-24 px-6">
      <div className="max-w-xl mx-auto">
        {/* Close Button */}
        <button
          onClick={() => window.history.back()}
          className="mb-6 text-gray-500 hover:text-gray-700 transition-colors flex items-center gap-2 text-sm"
        >
          ← Back
        </button>

        {/* Hero Card - Developer Intro */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="bg-white rounded-[28px] shadow-[0_8px_30px_rgba(0,0,0,0.08)] p-10 mb-6 text-center"
        >
          {/* Profile Image with Sparkle */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="relative w-28 h-28 mx-auto mb-6"
          >
            {/* Soft gradient glow */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-pink-200 to-purple-200 opacity-40 blur-xl"></div>
            
            {/* Profile image */}
            <div className="relative w-full h-full rounded-full overflow-hidden border-[3px] border-white shadow-lg" style={{
              background: 'linear-gradient(135deg, rgba(255,95,162,0.15), rgba(123,97,255,0.15))'
            }}>
              <Image
                src="/mohit-profile.jpg"
                alt="Mohit Raj"
                width={112}
                height={112}
                className="object-cover w-full h-full"
                style={{ filter: 'brightness(1.05) contrast(0.95)' }}
              />
            </div>
            
            {/* Cute sparkle corner */}
            <div className="absolute -top-1 -right-1 bg-white rounded-full p-1.5 shadow-md">
              <Sparkles size={12} className="text-purple-500" fill="currentColor" />
            </div>
          </motion.div>

          {/* Name & Role */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="max-w-xs mx-auto"
          >
            <h1 className="text-2xl font-semibold text-gray-800 mb-2 leading-tight">
              Mohit Raj
            </h1>
            <p className="text-sm text-gray-500 mb-1">
              Building HerCare⁺ with care 💗
            </p>
            <p className="text-xs italic text-gray-400 mb-4 leading-relaxed">
              Built with intention, not just code.
            </p>

            {/* University */}
            <div className="inline-block bg-purple-50 px-5 py-2.5 rounded-full border border-purple-100">
              <span className="text-xs text-purple-700 font-medium flex items-center gap-1.5">
                <span className="text-sm">🎓</span>
                Jain University, Jamshedpur
              </span>
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex justify-center gap-3 mt-7"
          >
            {socialLinks.map((social, idx) => (
              <motion.button
                key={idx}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + idx * 0.05 }}
                onClick={() => social.onClick ? social.onClick() : window.open(social.url, '_blank')}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
                className="p-3.5 rounded-full bg-gray-50 hover:bg-gray-100 transition-all shadow-sm"
                title={social.label}
              >
                <social.icon size={18} style={{ color: social.color }} />
              </motion.button>
            ))}
          </motion.div>
        </motion.div>

        {/* Divider */}
        <div className="flex items-center justify-center my-8">
          <div className="flex gap-2">
            <div className="w-2 h-2 rounded-full bg-pink-200 animate-pulse" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 rounded-full bg-purple-200 animate-pulse" style={{ animationDelay: '100ms' }}></div>
            <div className="w-2 h-2 rounded-full bg-pink-200 animate-pulse" style={{ animationDelay: '200ms' }}></div>
          </div>
        </div>

        {/* Company Objective */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white rounded-[28px] shadow-[0_8px_30px_rgba(0,0,0,0.08)] p-8 mb-6"
        >
          <h2 className="text-lg font-semibold text-gray-800 mb-5 flex items-center gap-2">
            <div className="p-2 bg-pink-50 rounded-full">
              <Sparkles size={16} className="text-pink-500" />
            </div>
            Why HerCare⁺ exists
          </h2>

          <div className="space-y-5 text-sm text-gray-700 leading-relaxed" style={{ lineHeight: '1.7' }}>
            <p>
              HerCare⁺ was created to give women a safe, private space to understand their health without fear, judgment, or embarrassment.
            </p>
            
            <p>
              In many parts of India and the world, women delay or avoid healthcare due to fear, stigma, or lack of access.
            </p>
            
            <p>
              Our mission is to use technology with empathy — combining AI, privacy-first design, and local accessibility — so that every woman can trust, understand, and act on what her body is telling her.
            </p>
            
            <p className="font-semibold text-purple-700 bg-purple-50 p-4 rounded-xl border border-purple-100">
              HerCare⁺ does not replace doctors. It empowers conversations that matter.
            </p>
          </div>
        </motion.div>

        {/* Trust Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center space-y-4"
        >
          {/* Privacy inline card */}
          <div className="bg-green-50 border border-green-100 rounded-2xl p-4 shadow-sm">
            <div className="flex items-center justify-center gap-2 text-sm text-green-800">
              <Shield size={16} className="text-green-600" />
              <span className="font-medium">Everything here stays on your device.<br className="sm:hidden" /> Even we can&apos;t see it.</span>
            </div>
          </div>

          <p className="text-xs text-gray-400 font-medium">
            Built with care in India 🇮🇳
          </p>

          <p className="text-xs italic text-gray-400 leading-relaxed max-w-sm mx-auto pt-2">
            Built not as a project — but as a responsibility.
          </p>
        </motion.div>
      </div>

      {/* Contact Modal */}
      <AnimatePresence>
        {showContact && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50"
              onClick={() => setShowContact(false)}
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 bg-white rounded-t-[2rem] p-6 z-50 max-w-[480px] mx-auto shadow-2xl"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-800">Contact Developer</h3>
                <button
                  onClick={() => setShowContact(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X size={20} className="text-gray-500" />
                </button>
              </div>

              <div className="space-y-3">
                <a
                  href="mailto:mohitraj8503@gmail.com"
                  className="flex items-center gap-3 p-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl border-2 border-pink-100 hover:shadow-md transition-all"
                >
                  <div className="p-2 bg-pink-100 rounded-full">
                    <Mail size={18} className="text-pink-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Email</p>
                    <p className="text-sm font-semibold text-gray-800">mohitraj8503@gmail.com</p>
                  </div>
                </a>

                <a
                  href="tel:+917654212171"
                  className="flex items-center gap-3 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border-2 border-purple-100 hover:shadow-md transition-all"
                >
                  <div className="p-2 bg-purple-100 rounded-full text-base">
                    📞
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Phone</p>
                    <p className="text-sm font-semibold text-gray-800">+91 7654212171</p>
                  </div>
                </a>
              </div>

              <button
                onClick={() => setShowContact(false)}
                className="w-full mt-6 py-3 text-gray-500 font-medium hover:text-gray-700 transition-colors"
              >
                Close
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
