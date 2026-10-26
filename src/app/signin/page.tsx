"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Lock, X, ShieldCheck, Sparkles } from "lucide-react";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const LotusLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M50 85C50 85 90 60 90 40C90 15 50 10 50 10C50 10 10 15 10 40C10 60 50 85 50 85Z" fill="#FF5FA2" fillOpacity="0.1" stroke="#FF5FA2" strokeWidth="1"/>
    <path d="M50 85C50 85 75 70 80 50C85 30 70 20 50 20C30 20 15 30 20 50C25 70 50 85 50 85Z" fill="#FF5FA2" fillOpacity="0.2" stroke="#FF5FA2" strokeWidth="1"/>
    <circle cx="50" cy="45" r="3" fill="#FF5FA2" fillOpacity="0.5"/>
  </svg>
);

export default function SignIn() {
  const router = useRouter();
  const [showGoogleConfirm, setShowGoogleConfirm] = useState(false);

  const handleLocalLogin = () => {
    localStorage.setItem("hercare_auth_mode", "local");
    localStorage.setItem("hercare_user_name", "Friend");
    router.push("/cycle");
  };

  const confirmGoogleLogin = async () => {
    await signIn('google', { callbackUrl: '/cycle' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFF5F7] via-white to-purple-50 flex flex-col items-center justify-center p-6 text-gray-800 relative overflow-hidden">
      
      {/* Premium Lotus Orbs - Matching Homepage */}
      <div className="absolute top-[-10%] right-[-20%] w-[80%] h-[50%] opacity-20 z-0">
        <LotusLogo className="w-full h-full rotate-45" />
      </div>
      <div className="absolute bottom-[10%] left-[-20%] w-[70%] h-[40%] opacity-10 z-0">
        <LotusLogo className="w-full h-full -rotate-12" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Header with Privacy Badge */}
        <motion.div 
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8 text-center"
        >
          <div className="flex items-center justify-center gap-2 mb-4 bg-white/50 backdrop-blur-sm w-fit mx-auto px-4 py-2 rounded-full border border-pink-100 shadow-sm">
            <ShieldCheck size={14} className="text-green-500" />
            <span className="text-[10px] text-green-700 font-bold uppercase tracking-widest">100% Private & Anonymous</span>
          </div>
          
          <h1 className="text-3xl font-black tracking-tight text-gray-900 mb-2 font-nunito">
            HerCare<span className="text-pink-500">+</span>
          </h1>
          <p className="text-sm text-gray-500 font-medium">A private space for your health</p>
        </motion.div>

        {/* Main Card - Matching Homepage Style */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-[2.5rem] p-8 shadow-xl shadow-pink-100/50 border border-white text-center relative overflow-hidden">
            
            {/* Sparkles Decoration */}
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Sparkles size={40} className="text-pink-500" />
            </div>

            <div className="relative z-10">
              {/* Title */}
              <h2 className="text-3xl font-black text-gray-900 mb-3 tracking-tight font-nunito">
                Continue safely
              </h2>
              <p className="text-gray-500 text-sm mb-8 leading-relaxed max-w-xs mx-auto">
                Your health, your choice.<br/>
                Use HerCare+ with or without an account.
              </p>

              <div className="space-y-3">
                {/* Google Button */}
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowGoogleConfirm(true)}
                  className="w-full bg-white border-2 border-purple-50 hover:border-purple-100 hover:shadow-lg hover:shadow-purple-900/5 rounded-[2rem] p-5 flex items-center gap-4 group transition-all duration-300"
                >
                  <div className="w-11 h-11 bg-gradient-to-br from-blue-50 to-green-50 rounded-xl flex items-center justify-center shadow-sm shrink-0 border border-gray-100 group-hover:shadow-md transition-shadow">
                     <span className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-green-500 to-yellow-500">G</span>
                  </div>
                  <div className="text-left flex-1">
                     <div className="font-bold text-gray-900 text-base">Continue with Google</div>
                     <div className="text-xs text-gray-400 font-medium mt-0.5">Sync across devices</div>
                  </div>
                  <svg className="w-5 h-5 text-gray-300 group-hover:text-pink-400 group-hover:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </motion.button>

                {/* Local Button - Pink Gradient Matching Homepage */}
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleLocalLogin}
                  className="w-full bg-gradient-to-br from-pink-50 to-purple-50 border-2 border-pink-100 hover:border-pink-200 hover:shadow-lg hover:shadow-pink-100 rounded-[2rem] p-5 flex items-center gap-4 group transition-all duration-300"
                >
                   <div className="w-11 h-11 bg-white rounded-xl flex items-center justify-center shrink-0 border border-pink-100 text-pink-500 group-hover:shadow-md transition-shadow">
                     <Lock size={20} strokeWidth={2.5} />
                  </div>
                  <div className="text-left flex-1">
                     <div className="font-bold text-gray-900 text-base">Continue on this device</div>
                     <div className="text-xs text-gray-400 font-medium mt-0.5">Nothing leaves your phone</div>
                  </div>
                  <svg className="w-5 h-5 text-pink-300 group-hover:text-pink-400 group-hover:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </motion.button>
              </div>

              {/* Reassurance */}
              <p className="text-xs text-gray-400 mt-8">
                You can change this anytime later.
              </p>
            </div>
          </div>

          {/* Enter without saving */}
          <div className="mt-6 text-center">
              <button 
                onClick={handleLocalLogin}
                className="text-sm font-medium text-gray-400 hover:text-pink-500 transition-colors inline-flex items-center gap-1 group"
              >
                <span>Enter without saving</span>
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
          </div>

          {/* Trust Badge - Matching Homepage Style */}
          <div className="mt-10 text-center">
             <div className="inline-flex items-center gap-2 bg-white px-3 py-1 rounded-full border border-gray-100">
               <ShieldCheck size={12} className="text-purple-400" />
               <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">End-to-End Encrypted</span>
             </div>
          </div>
        </motion.div>
      </div>

      {/* Google Confirmation Modal */}
      <AnimatePresence>
        {showGoogleConfirm && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-md z-50"
              onClick={() => setShowGoogleConfirm(false)}
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed inset-0 flex items-center justify-center z-50 p-6 pointer-events-none"
            >
              <div className="bg-white/80 backdrop-blur-sm w-full max-w-sm rounded-[2.5rem] p-8 shadow-2xl border border-white pointer-events-auto relative overflow-hidden">
                <button
                  onClick={() => setShowGoogleConfirm(false)}
                  className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors z-20"
                >
                  <X size={18} className="text-gray-400" />
                </button>

                {/* Lotus decoration */}
                <div className="absolute top-0 right-0 w-24 h-24 opacity-10">
                  <LotusLogo className="w-full h-full" />
                </div>

                <div className="relative z-10">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-green-500">G</span>
                  </div>

                  <h3 className="text-2xl font-black text-gray-900 mb-2 text-center font-nunito">Before you switch...</h3>
                  <p className="text-sm text-gray-500 text-center mb-8">Here&apos;s what happens with Google sign-in</p>
                  
                  <div className="space-y-3 mb-8">
                     <div className="flex gap-3 items-start p-3 bg-green-50 rounded-xl border border-green-100">
                       <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 shrink-0"></div>
                       <p className="text-sm text-gray-700">Google sees your <strong>email & name only</strong></p>
                     </div>
                     <div className="flex gap-3 items-start p-3 bg-pink-50 rounded-xl border border-pink-100">
                       <div className="w-1.5 h-1.5 bg-pink-500 rounded-full mt-2 shrink-0"></div>
                       <p className="text-sm text-gray-700">HerCare+ stores <strong>health data privately</strong></p>
                     </div>
                     <div className="flex gap-3 items-start p-3 bg-purple-50 rounded-xl border border-purple-100">
                       <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2 shrink-0"></div>
                       <p className="text-sm text-gray-700">All cycle data stays <strong>end-to-end encrypted</strong></p>
                     </div>
                  </div>

                  <div className="space-y-3">
                    <button
                      onClick={confirmGoogleLogin}
                      className="w-full py-4 bg-gradient-to-br from-[#FF8FAB] via-[#FF75A0] to-[#FF6B95] text-white rounded-2xl font-bold text-sm shadow-lg shadow-pink-200 hover:shadow-xl hover:scale-105 transition-all"
                    >
                      Confirm & Continue
                    </button>
                    <button
                      onClick={() => setShowGoogleConfirm(false)}
                      className="w-full py-4 bg-gray-50 text-gray-600 rounded-2xl font-bold text-sm hover:bg-gray-100 transition-all"
                    >
                      Go Back
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
