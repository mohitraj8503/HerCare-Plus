"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Shield, Download, Trash2, Lock, Eye, EyeOff, Check, Clock, Heart } from "lucide-react";
import { exportUserData, deleteAllUserData, generateAnonymousId } from "@/lib/security";
import Link from "next/link";

export default function PrivacyDashboard() {
  const [anonymousId, setAnonymousId] = useState("");
  const [consentDate, setConsentDate] = useState("");
  const [showId, setShowId] = useState(false);
  const [autoDelete, setAutoDelete] = useState("30");

  useEffect(() => {
    setAnonymousId(generateAnonymousId());
    const consent = localStorage.getItem('hercare_consent_date');
    if (consent) {
      const date = new Date(consent);
      setConsentDate(date.toLocaleDateString('en-IN', { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric' 
      }));
    }
    
    const savedAutoDelete = localStorage.getItem('hercare_auto_delete_days');
    if (savedAutoDelete) setAutoDelete(savedAutoDelete);
  }, []);

  const handleAutoDeleteChange = (days: string) => {
    setAutoDelete(days);
    localStorage.setItem('hercare_auto_delete_days', days);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white pt-20 pb-32 px-6">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Shield size={32} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Your Privacy</h1>
          <p className="text-gray-600">You&apos;re in complete control</p>
        </motion.div>

        {/* Privacy Promise */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-3xl mb-6 border border-green-100"
        >
          <div className="flex items-start gap-3">
            <Heart className="text-green-600 shrink-0 mt-1" size={24} fill="currentColor" />
            <div>
              <h3 className="font-bold text-green-900 mb-2">Our Promise to You</h3>
              <ul className="text-sm text-green-800 space-y-2">
                <li className="flex items-start gap-2">
                  <Check size={16} className="shrink-0 mt-0.5" />
                  <span>Zero ads, ever. You&apos;re not a product.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check size={16} className="shrink-0 mt-0.5" />
                  <span>Your conversations are encrypted locally—we can&apos;t read them.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check size={16} className="shrink-0 mt-0.5" />
                  <span>No tracking, no cookies, no third parties.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check size={16} className="shrink-0 mt-0.5" />
                  <span>You can delete everything anytime.</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Anonymous ID */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 mb-4">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-bold text-gray-800">Your Anonymous ID</h3>
            <button 
              onClick={() => setShowId(!showId)}
              className="text-purple-600 text-sm font-medium flex items-center gap-1"
            >
              {showId ? <EyeOff size={16} /> : <Eye size={16} />}
              {showId ? 'Hide' : 'Show'}
            </button>
          </div>
          <div className="bg-gray-50 p-3 rounded-xl font-mono text-xs break-all">
            {showId ? anonymousId : '••••••••••••••••'}
          </div>
          <p className="text-xs text-gray-500 mt-2">
            This is your unique ID. It doesn&apos;t contain your name, email, or any personal info.
          </p>
        </div>

        {/* Consent Record */}
        {consentDate && (
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 mb-4">
            <div className="flex items-center gap-3">
              <div className="bg-purple-100 p-2 rounded-full">
                <Clock size={20} className="text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800">Privacy consent given</p>
                <p className="text-xs text-gray-500">{consentDate}</p>
              </div>
            </div>
          </div>
        )}

        {/* Auto-Delete Setting */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 mb-4">
          <h3 className="font-bold text-gray-800 mb-3">Auto-Delete Old Data</h3>
          <p className="text-sm text-gray-600 mb-4">
            Automatically delete your conversations after a set period. Your cycle data is kept separate.
          </p>
          <select
            value={autoDelete}
            onChange={(e) => handleAutoDeleteChange(e.target.value)}
            className="w-full p-3 border border-gray-200 rounded-xl outline-none focus:border-purple-400 bg-gray-50"
          >
            <option value="7">After 7 days</option>
            <option value="30">After 30 days (recommended)</option>
            <option value="90">After 90 days</option>
            <option value="never">Never (manual only)</option>
          </select>
        </div>

        {/* Data Control Actions */}
        <div className="space-y-3">
          <button
            onClick={exportUserData}
            className="w-full bg-white border-2 border-purple-200 text-purple-700 p-4 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-purple-50 transition-all"
          >
            <Download size={20} />
            Download My Data
          </button>

          <button
            onClick={deleteAllUserData}
            className="w-full bg-white border-2 border-red-200 text-red-600 p-4 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-red-50 transition-all"
          >
            <Trash2 size={20} />
            Delete Everything
          </button>
        </div>

        {/* Security Tips */}
        <div className="mt-8 bg-blue-50 p-5 rounded-2xl border border-blue-100">
          <h4 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
            <Lock size={18} />
            Security Tips
          </h4>
          <ul className="text-xs text-blue-800 space-y-2">
            <li>• Don&apos;t share screenshots of your conversations</li>
            <li>• Use incognito/private browsing on shared devices</li>
            <li>• Clear your browser history if needed</li>
            <li>• Use a strong device lock (PIN/fingerprint)</li>
          </ul>
        </div>

        {/* Back Link */}
        <Link href="/">
          <p className="text-center text-sm text-purple-600 font-medium mt-6">
            ← Back to Home
          </p>
        </Link>
      </div>
    </div>
  );
}
