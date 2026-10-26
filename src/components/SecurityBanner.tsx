"use client";

import { useEffect, useState } from "react";
import { Shield, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function SecurityBanner() {
  const [show, setShow] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already dismissed the banner
    const dismissed = localStorage.getItem("hercare_security_banner_dismissed");
    if (!dismissed) {
      // Show banner after a short delay (less intrusive)
      setTimeout(() => setIsVisible(true), 2000);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem("hercare_security_banner_dismissed", "true");
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-24 left-4 right-4 max-w-[440px] mx-auto z-20"
        >
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-4 shadow-lg backdrop-blur-sm">
            <div className="flex items-start gap-3">
              <div className="bg-green-100 p-2 rounded-full shrink-0">
                <Shield size={18} className="text-green-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-green-900 mb-1">
                  Just so you know...
                </p>
                <p className="text-xs text-green-700">
                  Everything here stays on <strong>your device</strong>. We can&apos;t see it, even if we wanted to.
                </p>
              </div>
              <button
                onClick={handleDismiss}
                className="text-green-600 hover:text-green-800 p-1 rounded-full hover:bg-green-100 transition-colors shrink-0"
                aria-label="Dismiss"
              >
                <X size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
