"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, MessageSquare, Lock, Power } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { clsx } from "clsx";
import { useState, useEffect, useCallback } from "react";

function TypewriterText({ text, onComplete }: { text: string; onComplete?: () => void }) {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= text.length) {
        setDisplayedText(text.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
        if (onComplete) setTimeout(onComplete, 1000);
      }
    }, 50);

    return () => clearInterval(timer);
  }, [text, onComplete]);

  return (
    <motion.h1
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-4xl md:text-6xl font-bold text-center text-white tracking-tighter px-4 leading-tight"
    >
      {displayedText}
      <motion.span
        animate={{ opacity: [0, 1, 0] }}
        transition={{ repeat: Infinity, duration: 0.8 }}
        className="inline-block w-1 h-8 md:h-12 ml-1 bg-blue-500 align-middle"
      />
    </motion.h1>
  );
}

function FarewellSplash({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black flex items-center justify-center"
      onClick={onClose}
    >
      <TypewriterText text="This has been fun, thank you for your time." onComplete={onClose} />
    </motion.div>
  );
}

export function BottomNav() {
  const pathname = usePathname();
  const [showFarewell, setShowFarewell] = useState(false);

  const handleFarewellClose = useCallback(() => setShowFarewell(false), []);

  const tabs = [
    { name: "Home", href: "/home", icon: Home },
    { name: "Assistant", href: "/assistant", icon: MessageSquare },
    { name: "Vault", href: "/vault", icon: Lock },
  ];

  const isAssistantPage = pathname === "/assistant";

  return (
    <>
      <AnimatePresence>
        {showFarewell && <FarewellSplash onClose={handleFarewellClose} />}
      </AnimatePresence>

      <div className={clsx(
        "fixed bottom-0 left-0 right-0 z-50 p-6 pb-8 bg-gradient-to-t pointer-events-none",
        isAssistantPage 
          ? "from-slate-950 via-slate-950/90 to-transparent" 
          : "from-white via-white/90 to-transparent"
      )}>
        <div className={clsx(
          "flex items-center justify-around max-w-xs mx-auto border backdrop-blur-xl rounded-full p-2 pointer-events-auto shadow-2xl",
          isAssistantPage 
            ? "bg-slate-900 border-white/10 shadow-black/20" 
            : "bg-white border-black/5 shadow-black/5"
        )}>
          {tabs.map((tab) => {
            const isActive = pathname === tab.href;
            const isAssistantTab = tab.name === "Assistant";
            
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={clsx(
                  "relative flex items-center justify-center w-14 h-12 rounded-full transition-colors duration-300",
                  isActive 
                    ? "text-[#0000e6]" 
                    : (isAssistantPage ? "text-slate-500 hover:text-slate-300" : "text-gray-400 hover:text-gray-600")
                )}
              >
                {isAssistantTab ? (
                  <div className="absolute inset-0 rounded-full overflow-hidden">
                      <motion.div 
                          className="absolute inset-0 bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500 opacity-100 brightness-125 saturate-150"
                          animate={{ backgroundPosition: ["0% 50%", "100% 50%"] }}
                          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                          style={{ backgroundSize: "200% 200%" }}
                      />
                      <div className="absolute inset-0 bg-white/10 mix-blend-overlay" />
                  </div>
                ) : (
                  isActive && (
                    <motion.div
                      layoutId="nav-pill"
                      className={clsx(
                        "absolute inset-0 rounded-full",
                        isAssistantPage ? "bg-white/10" : "bg-[#0000e6]/10"
                      )}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )
                )}
                <div className={clsx("relative z-10", isAssistantTab && "text-white drop-shadow-md")}>
                    <tab.icon size={22} strokeWidth={isActive || isAssistantTab ? 2.5 : 2} />
                </div>
              </Link>
            );
          })}
          
          <button
            onClick={() => setShowFarewell(true)}
            className={clsx(
              "relative flex items-center justify-center w-14 h-12 rounded-full transition-colors duration-300",
              isAssistantPage ? "text-slate-500 hover:text-slate-300" : "text-gray-400 hover:text-gray-600"
            )}
          >
            <Power size={22} strokeWidth={2} />
          </button>
        </div>
      </div>
    </>
  );
}
