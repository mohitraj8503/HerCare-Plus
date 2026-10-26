"use client";

import { useEffect, useState } from "react";
import BottomNav from "@/components/BottomNav";
import { ArrowRight, ShieldCheck, HeartPulse, Mic, MapPin, Sparkles } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const AFFIRMATIONS_YOUNG = [
  "Your body is changing, and that's completely normal.",
  "It's okay to have questions about your health.",
  "You deserve to understand your body better.",
  "Taking care of yourself is a sign of strength.",
  "Your feelings and experiences are valid.",
];

const AFFIRMATIONS_YOUNG_ADULT = [
  "You deserve to feel good in your body.",
  "Taking care of yourself isn't selfish—it's necessary.",
  "Your cycle is unique. There's no 'normal'.",
  "It's okay to rest when you need to.",
  "You know your body better than anyone.",
];

const AFFIRMATIONS_ADULT = [
  "Your health journey is uniquely yours.",
  "Prioritizing your wellness is an act of self-love.",
  "You deserve comprehensive, judgment-free care.",
  "Your body's wisdom deserves to be honored.",
  "Taking charge of your health is empowering.",
];

const AFFIRMATIONS_MATURE = [
  "Your health matters at every stage of life.",
  "Experience brings wisdom about your body's needs.",
  "You deserve specialized, compassionate care.",
  "Your wellness journey continues to evolve beautifully.",
  "Self-care is a lifelong practice worth celebrating.",
];

const LotusLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M50 85C50 85 90 60 90 40C90 15 50 10 50 10C50 10 10 15 10 40C10 60 50 85 50 85Z" fill="#FF5FA2" fillOpacity="0.1" stroke="#FF5FA2" strokeWidth="1"/>
    <path d="M50 85C50 85 75 70 80 50C85 30 70 20 50 20C30 20 15 30 20 50C25 70 50 85 50 85Z" fill="#FF5FA2" fillOpacity="0.2" stroke="#FF5FA2" strokeWidth="1"/>
    <circle cx="50" cy="45" r="3" fill="#FF5FA2" fillOpacity="0.5"/>
  </svg>
);

export default function LandingPage() {
  const router = useRouter();
  const [nickname, setNickname] = useState("");
  const [age, setAge] = useState<number | null>(null);
  const [affirmation, setAffirmation] = useState("");
  const [greeting, setGreeting] = useState("How is your heart feeling today?");

  useEffect(() => {
    // Check if first time
    const hasOnboarded = localStorage.getItem("hercare_onboarded");
    if (!hasOnboarded) {
      router.push("/onboarding");
      return;
    }
    
    const savedName = localStorage.getItem("hercare_nickname");
    const savedAge = localStorage.getItem("hercare_age");
    
    setNickname(savedName || "friend");
    
    if (savedAge) {
      const userAge = parseInt(savedAge);
      setAge(userAge);
      
      // Personalize greeting based on age
      if (userAge < 18) {
        setGreeting("How are you feeling today?");
      } else if (userAge <= 25) {
        setGreeting("How is your heart feeling today?");
      } else if (userAge <= 35) {
        setGreeting("How are you taking care of yourself today?");
      } else {
        setGreeting("How is your wellness journey going?");
      }
    }
    
    // Select appropriate affirmation pool based on age
    let pool = AFFIRMATIONS_YOUNG_ADULT;
    if (savedAge) {
      const userAge = parseInt(savedAge);
      if (userAge < 18) pool = AFFIRMATIONS_YOUNG;
      else if (userAge <= 25) pool = AFFIRMATIONS_YOUNG_ADULT;
      else if (userAge <= 45) pool = AFFIRMATIONS_ADULT;
      else pool = AFFIRMATIONS_MATURE;
    }
    
    setAffirmation(pool[Math.floor(Math.random() * pool.length)]);
  }, [router]);

  return (
    <div className="flex flex-col min-h-screen pt-16 pb-24 relative overflow-hidden bg-gradient-to-b from-[#FFF5F7] via-white to-purple-50">
      {/* Premium Lotus Orbs */}
      <div className="absolute top-[-10%] right-[-20%] w-[80%] h-[50%] opacity-20 z-0">
        <LotusLogo className="w-full h-full rotate-45" />
      </div>
      <div className="absolute bottom-[10%] left-[-20%] w-[70%] h-[40%] opacity-10 z-0 text-purple-200">
        <LotusLogo className="w-full h-full -rotate-12" />
      </div>

      <main className="flex-1 p-6 relative z-10 flex flex-col pt-8">
        {/* Warm Greeting with Lotus */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 text-center"
        >
          <div className="flex items-center justify-center gap-2 mb-4 bg-white/50 backdrop-blur-sm w-fit mx-auto px-4 py-2 rounded-full border border-pink-100 shadow-sm">
            <ShieldCheck size={14} className="text-green-500" />
            <span className="text-[10px] text-green-700 font-bold uppercase tracking-widest">100% Private & Anonymous</span>
          </div>
          
          <h1 className="text-4xl font-black text-gray-800 mb-2 font-nunito tracking-tight">
            Hey {nickname} 💜
          </h1>
          <p className="text-gray-500 text-lg font-medium">
            {greeting}
          </p>
        </motion.div>

        {/* Relaxing Affirmation Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white/80 backdrop-blur-sm p-6 rounded-[2.5rem] mb-10 border border-white shadow-xl shadow-pink-100/50 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Sparkles size={40} className="text-pink-500" />
          </div>
          <div className="relative z-10 text-center">
            <p className="text-[10px] font-black text-pink-400 uppercase tracking-[0.2em] mb-3">Daily Breathing Space</p>
            <p className="text-gray-700 text-lg font-bold leading-relaxed italic font-nunito">
              &ldquo;{affirmation}&rdquo;
            </p>
          </div>
        </motion.div>

        {/* Primary Action - The Symptom Checker */}
        <Link href="/checker" className="w-full mb-8">
          <motion.div 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group relative bg-gradient-to-br from-[#FF8FAB] via-[#FF75A0] to-[#FF6B95] text-white rounded-[3rem] p-8 shadow-2xl shadow-pink-300/40 overflow-hidden"
          >
             {/* Lotus pattern overlay */}
             <div className="absolute bottom-[-20%] right-[-10%] w-40 h-40 opacity-20 text-white">
               <LotusLogo className="w-full h-full" />
             </div>

             <div className="relative z-10">
               <div className="flex items-center gap-2 mb-3 bg-white/20 w-fit px-3 py-1.5 rounded-full backdrop-blur-md">
                 <Mic size={18} className="animate-pulse" />
                 <span className="text-[11px] font-black uppercase tracking-wider">Voice Enabled Chat</span>
               </div>
               <h2 className="text-2xl font-black mb-2 font-nunito tracking-tight">Talk Privately</h2>
               <p className="text-sm font-medium opacity-90 leading-relaxed max-w-[200px]">
                 {age && age < 18 
                   ? "Ask questions about your body in a safe, judgment-free space."
                   : age && age <= 25
                   ? "Share your health concerns exactly like you'd talk to a sister."
                   : age && age <= 35
                   ? "Discuss your health concerns with complete privacy and understanding."
                   : "Get personalized health guidance in complete confidence."}
               </p>
               
               <div className="flex justify-end mt-4">
                 <div className="bg-white text-pink-500 p-4 rounded-full shadow-lg group-hover:bg-pink-50 transition-colors">
                   <ArrowRight size={28} strokeWidth={3} />
                 </div>
               </div>
             </div>
          </motion.div>
        </Link>

        {/* Secondary Grid */}
        <div className="grid grid-cols-2 gap-4 mb-8">
           <Link href="/cycle">
            <motion.div 
              whileTap={{ scale: 0.95 }}
              className="bg-white p-5 rounded-[2rem] border border-purple-50 shadow-lg shadow-purple-900/5 flex flex-col gap-3 h-full"
            >
               <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-400">
                 <HeartPulse size={24} />
               </div>
               <div>
                 <h3 className="font-bold text-gray-800 text-sm">Cycle Tracker</h3>
                 <p className="text-[10px] text-gray-500 mt-1 leading-relaxed">
                   {age && age < 18
                     ? "Understand your cycle patterns better."
                     : age && age <= 30
                     ? "Predict periods & ovulation easily."
                     : "Track your cycle & plan ahead."}
                 </p>
               </div>
            </motion.div>
           </Link>

           <Link href="/care">
            <motion.div 
              whileTap={{ scale: 0.95 }}
              className="bg-white p-5 rounded-[2rem] border border-blue-50 shadow-lg shadow-blue-900/5 flex flex-col gap-3 h-full"
            >
               <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-400">
                 <MapPin size={24} />
               </div>
               <div>
                 <h3 className="font-bold text-gray-800 text-sm">Find Doctors</h3>
                 <p className="text-[10px] text-gray-500 mt-1 leading-relaxed">
                   {age && age < 18
                     ? "Find trusted clinics & caring doctors."
                     : age && age <= 30
                     ? "Clinics & NGOs that treat you with care."
                     : "Find specialized women's health providers."}
                 </p>
               </div>
            </motion.div>
           </Link>
        </div>

        {/* Wellness Dashboard Card */}
<Link href="/wellness" className="block mb-8">
  <motion.div
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    className="rounded-[2rem] border border-pink-100 bg-gradient-to-r from-pink-50 to-purple-50 p-6 shadow-lg shadow-pink-100/50"
  >
    <div className="flex items-center justify-between gap-4">
      <div>
        <div className="mb-2 flex items-center gap-2">
          <HeartPulse size={24} className="text-pink-600" />

          <h2 className="text-lg font-bold text-gray-800">
            Wellness Dashboard
          </h2>
        </div>

        <p className="text-sm leading-relaxed text-gray-600">
          Track hydration, sleep, activity, mood, and daily
          wellness goals.
        </p>
      </div>

      <div className="shrink-0 rounded-full bg-pink-600 p-3 text-white">
        <ArrowRight size={22} />
      </div>
    </div>
  </motion.div>
</Link>
        {/* Trust & Safety Footer */}
        <div className="mt-auto py-6 text-center border-t border-pink-50">
          <div className="inline-flex items-center gap-2 mb-3 bg-white px-3 py-1 rounded-full border border-gray-100">
            <ShieldCheck size={12} className="text-purple-400" />
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">End-to-End Encrypted</span>
          </div>
          <p className="text-[11px] text-gray-400 leading-relaxed max-w-[240px] mx-auto italic">
            "We built this because we believe health privacy is a basic human right for every woman."
          </p>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
