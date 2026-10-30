"use client";

import { Shield, Lock, Eye, Heart, AlertCircle, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function PrivacySafetyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white pt-20 pb-24 px-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Shield size={32} className="text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Privacy & Safety</h1>
          <p className="text-sm text-gray-600">Your health, your control, your peace of mind</p>
        </motion.div>

        {/* Plain English Promise */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-[24px] shadow-md p-6 mb-6"
        >
          <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Heart size={20} className="text-pink-500" fill="currentColor" />
            Our Plain English Promise
          </h2>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-4 bg-green-50 rounded-xl border border-green-100">
              <CheckCircle size={20} className="text-green-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-green-900 mb-1">We do not sell your data.</p>
                <p className="text-sm text-green-700">Never have, never will. Your health information is not a product.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-xl border border-purple-100">
              <CheckCircle size={20} className="text-purple-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-purple-900 mb-1">We do not show ads based on your health.</p>
                <p className="text-sm text-purple-700">No tracking. No ad networks. No data brokers.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-pink-50 rounded-xl border border-pink-100">
              <CheckCircle size={20} className="text-pink-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-pink-900 mb-1">Everything stays on your device.</p>
                <p className="text-sm text-pink-700">Unless you choose to sign in, your data lives only on this phone. We can&apos;t see it even if we wanted to.</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* How We Protect You */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-[24px] shadow-md p-6 mb-6"
        >
          <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Lock size={20} className="text-purple-500" />
            How We Protect You
          </h2>

          <div className="space-y-4 text-sm text-gray-700">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center shrink-0">
                <span className="text-base">🔒</span>
              </div>
              <div>
                <p className="font-semibold text-gray-800 mb-1">End-to-End Encryption</p>
                <p className="text-gray-600">Your cycle data, symptoms, and chat history are encrypted using industry-standard AES-256.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center shrink-0">
                <span className="text-base">📱</span>
              </div>
              <div>
                <p className="font-semibold text-gray-800 mb-1">Local-First Storage</p>
                <p className="text-gray-600">By default, everything stays on your device using IndexedDB. No servers, no cloud, no risk.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center shrink-0">
                <span className="text-base">❌</span>
              </div>
              <div>
                <p className="font-semibold text-gray-800 mb-1">No Third-Party Tracking</p>
                <p className="text-gray-600">We don&apos;t use Google Analytics, Facebook Pixel, or any tracking scripts.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
                <span className="text-base">🗑️</span>
              </div>
              <div>
                <p className="font-semibold text-gray-800 mb-1">You Own Your Data</p>
                <p className="text-gray-600">Export or delete everything instantly from the Privacy Dashboard. No waiting, no approval needed.</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Emergency Disclaimer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-yellow-50 border-2 border-yellow-200 rounded-[24px] p-6 mb-6"
        >
          <div className="flex items-start gap-3">
            <AlertCircle size={24} className="text-yellow-600 shrink-0" />
            <div>
              <h3 className="font-bold text-yellow-900 mb-2">Important Medical Disclaimer</h3>
              <p className="text-sm text-yellow-800 leading-relaxed mb-3">
                HerCare⁺ is a <strong>support tool</strong>, not a doctor. It provides information and guidance, but it cannot diagnose, treat, or prescribe medication.
              </p>
              <p className="text-sm text-yellow-800 leading-relaxed">
                <strong>In case of emergency:</strong> Please call <strong className="text-yellow-900">108</strong> (India Emergency) or visit your nearest hospital immediately.
              </p>
            </div>
          </div>
        </motion.div>

        {/* What We Log (Transparency) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-[24px] shadow-md p-6 mb-6"
        >
          <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Eye size={20} className="text-blue-500" />
            What We Actually Log
          </h2>

          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
              <span className="text-gray-700">Your health data</span>
              <span className="text-xs font-bold text-green-600 bg-green-100 px-3 py-1 rounded-full">LOCAL ONLY</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
              <span className="text-gray-700">Chat history</span>
              <span className="text-xs font-bold text-green-600 bg-green-100 px-3 py-1 rounded-full">LOCAL ONLY</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
              <span className="text-gray-700">Crash reports (anonymous)</span>
              <span className="text-xs font-bold text-blue-600 bg-blue-100 px-3 py-1 rounded-full">ANONYMOUS</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
              <span className="text-gray-700">Usage analytics</span>
              <span className="text-xs font-bold text-red-600 bg-red-100 px-3 py-1 rounded-full">DISABLED</span>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <Link
            href="/privacy"
            className="inline-block text-sm text-purple-600 font-medium hover:text-purple-700 underline"
          >
            View Full Technical Privacy Dashboard →
          </Link>
        </motion.div>

        {/* Back Button */}
        <div className="mt-8 text-center">
          <button
            onClick={() => window.history.back()}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            ← Back
          </button>
        </div>
      </div>
    </div>
  );
}
