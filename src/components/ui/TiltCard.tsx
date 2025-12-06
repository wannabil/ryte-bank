"use client";

import React, { useRef } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function TiltCard({ children, className, onClick }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth spring animation for mouse tracking
  const mouseX = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseY = useSpring(y, { stiffness: 300, damping: 30 });

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const xPct = (clientX - left) / width - 0.5;
    const yPct = (clientY - top) / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  // 3D Rotate values
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [7, -7]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-7, 7]);

  // Sheen gradient that moves across the card
  const sheenGradient = useMotionTemplate`linear-gradient(
    ${useTransform(mouseX, [-0.5, 0.5], [115, 245])}deg,
    transparent 0%,
    rgba(255, 255, 255, 0.4) 50%,
    transparent 100%
  )`;

  return (
    <motion.div
      ref={ref}
      className={cn(
        "group relative transform-gpu rounded-3xl border border-black/5 bg-white transition-all duration-300",
        "hover:shadow-2xl hover:shadow-black/5",
        onClick && "cursor-pointer active:scale-[0.98]",
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
    >
      {/* Content Layer - Popped out slightly */}
      <div style={{ transform: "translateZ(12px)" }} className="relative z-10 h-full">
          {children}
      </div>

      {/* Sheen / Glare Effect */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-20 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 mix-blend-overlay"
        style={{
          background: sheenGradient,
        }}
      />

      {/* Ambient Glow - Soft colored glow behind */}
      <motion.div
        className="pointer-events-none absolute -inset-4 -z-10 bg-gradient-to-tr from-blue-500/5 via-purple-500/5 to-pink-500/5 blur-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ transform: "translateZ(-10px)" }}
      />
    </motion.div>
  );
}

