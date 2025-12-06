"use client";

import { motion } from "framer-motion";

export function LoadingCoin({ size = 24, className }: { size?: number; className?: string }) {
  return (
    <div className={className} style={{ width: size, height: size, perspective: "1000px" }}>
      <motion.div
        animate={{ rotateY: 360 }}
        transition={{
          duration: 0.6,
          repeat: Infinity,
          ease: "linear",
        }}
        className="relative w-full h-full"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div 
            className="absolute inset-0 bg-black rounded-full border-2 border-white shadow-sm flex items-center justify-center text-white font-bold text-[10px]"
            style={{ backfaceVisibility: "hidden" }}
        >
            R
        </div>
        <div 
            className="absolute inset-0 bg-white rounded-full border-2 border-black shadow-sm flex items-center justify-center text-black font-bold text-[10px]"
            style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
            RM
        </div>
      </motion.div>
    </div>
  );
}

export function FullScreenCoin({ isVisible }: { isVisible: boolean }) {
  return (
    <div 
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity duration-200 ${
        isVisible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
    >
      <motion.div
        animate={{ rotateY: 360 }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          ease: "linear",
        }}
        className="relative w-24 h-24"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div 
            className="absolute inset-0 bg-black rounded-full border-4 border-white shadow-2xl flex items-center justify-center text-white font-bold text-4xl"
            style={{ backfaceVisibility: "hidden" }}
        >
            R
        </div>
        <div 
            className="absolute inset-0 bg-white rounded-full border-4 border-black shadow-2xl flex items-center justify-center text-black font-bold text-4xl"
            style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
            RM
        </div>
      </motion.div>
    </div>
  );
}
