"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { clsx } from "clsx";
import Image from "next/image";
import { GlassCard } from "@/components/ui/GlassCard";
import Counter from "@/components/ui/Counter";

export default function Onboarding() {
  const [step, setStep] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const router = useRouter();

  const handleNext = () => {
    if (step < 2) {
      setStep(step + 1);
    } else {
      setIsExiting(true);
      setTimeout(() => {
        router.push("/home");
      }, 1500); 
    }
  };

  return (
    <main className="flex flex-col h-screen w-full overflow-hidden bg-black text-white relative select-none">
       <AnimatePresence>
        {isExiting && (
          <motion.div
            initial={{ clipPath: "circle(0% at 0% 100%)" }}
            animate={{ clipPath: "circle(150% at 0% 100%)" }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#0000e6] text-white"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1.2, opacity: 1 }}
              transition={{ duration: 1.2, ease: "easeInOut", delay: 0.2 }}
              className="relative w-32 h-32"
            >
               <div className="relative z-10 w-full h-full flex items-center justify-center text-5xl font-bold tracking-tighter">
                   RYTE
               </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex-1 relative">
        <AnimatePresence mode="wait">
          {step === 0 && <Step1 key="step1" />}
          {step === 1 && <Step2 key="step2" />}
          {step === 2 && <Step3 key="step3" />}
        </AnimatePresence>
      </div>

      {!isExiting && (
        <motion.div 
            exit={{ opacity: 0, y: 50 }}
            className="absolute bottom-12 left-0 right-0 px-8 z-20 flex justify-between items-center"
        >
            <div className="flex gap-3">
            {[0, 1, 2].map((i) => (
                <div
                key={i}
                className={clsx(
                    "h-2 rounded-full transition-all duration-500 shadow-lg",
                    i === step ? "w-8 bg-[#0000e6] shadow-[0_0_10px_#0000e6]" : "w-2 bg-white/40 backdrop-blur-sm"
                )}
                />
            ))}
            </div>

            <button
            onClick={handleNext}
            className="flex items-center justify-center w-16 h-16 rounded-full bg-[#fefeff] text-black shadow-lg hover:bg-gray-100 active:scale-90 transition-all duration-300"
            >
            <ChevronRight size={28} strokeWidth={3} />
            </button>
        </motion.div>
      )}
    </main>
  );
}

function Step1() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="h-full w-full relative flex flex-col justify-end pb-40 px-8"
    >
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1080&auto=format&fit=crop"
          alt="Future of Money"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/60 to-black" />
      </div>

      <div className="relative z-10">
        <h1 className="text-5xl font-bold tracking-tighter mb-4 drop-shadow-lg">
          Welcome to <br />
          <span className="text-[#00c6ff]">
            the future
          </span>
          <br />
          of money.
        </h1>
        <p className="text-gray-200 text-lg max-w-xs leading-relaxed drop-shadow-md">
          Banking that thinks, evolves, and grows with you. Powered by Neural AI.
        </p>
      </div>
    </motion.div>
  );
}

function Step2() {
  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1 + 0.3 },
    }),
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="h-full w-full relative flex flex-col justify-end pb-40 px-8"
    >
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1080&auto=format&fit=crop"
          alt="AI Lifestyle"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/70 to-black" />
      </div>

      <div className="relative z-10">
        <h2 className="text-4xl font-bold tracking-tight mb-8 drop-shadow-lg">
          AI that understands <br />
          <span className="text-[#00c6ff]">your life</span>.
        </h2>

        <div className="space-y-4">
          <motion.div custom={0} initial="hidden" animate="visible" variants={variants}>
            <GlassCard variant="clear" className="flex items-center gap-4 p-5 border-none bg-transparent backdrop-blur-md">
              <div>
                <h3 className="font-bold text-lg text-white drop-shadow-sm">Predictive Insights</h3>
                <p className="text-sm text-gray-200 drop-shadow-sm">Knows what you need before you do.</p>
              </div>
            </GlassCard>
          </motion.div>

          <motion.div custom={1} initial="hidden" animate="visible" variants={variants}>
            <GlassCard variant="clear" className="flex items-center gap-4 p-5 border-none bg-transparent backdrop-blur-md">
              <div>
                <h3 className="font-bold text-lg text-white drop-shadow-sm">Instant Speed</h3>
                <p className="text-sm text-gray-200 drop-shadow-sm">Zero latency global transfers.</p>
              </div>
            </GlassCard>
          </motion.div>

          <motion.div custom={2} initial="hidden" animate="visible" variants={variants}>
            <GlassCard variant="clear" className="flex items-center gap-4 p-5 border-none bg-transparent backdrop-blur-md">
              <div>
                <h3 className="font-bold text-lg text-white drop-shadow-sm">Unbreakable Vault</h3>
                <p className="text-sm text-gray-200 drop-shadow-sm">Quantum-resistant security.</p>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

function Step3() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="h-full w-full relative flex flex-col justify-end pb-40 px-8"
    >
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1080&auto=format&fit=crop"
          alt="Bank Smarter"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/60 to-black" />
      </div>

      <div className="relative z-10">
        <div className="mb-8">
          <h2 className="text-5xl font-bold tracking-tighter drop-shadow-lg">
            Ready to <br /> bank smarter?
          </h2>
        </div>
        
        <p className="text-gray-200 text-lg mb-12 drop-shadow-md">
          Join 2M+ users who have switched to the financial OS of the future.
        </p>

        <div className="p-6 rounded-2xl bg-[#111]/80 border border-white/10 backdrop-blur-md text-left transform rotate-1 shadow-2xl">
          <div className="flex justify-between text-sm text-gray-400 mb-2">
            <span>Your Balance</span>
            <span className="text-green-400">+12.4%</span>
          </div>
          <div className="text-4xl font-mono font-bold text-white">
            <Counter value={24681.00} prefix="$" duration={1} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
