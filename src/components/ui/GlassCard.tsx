import { clsx } from "clsx";
import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: "default" | "clear";
}

export function GlassCard({ children, className, onClick, variant = "default" }: GlassCardProps) {
  const baseStyles = "rounded-3xl transition-all duration-300 backdrop-blur-lg border";
  const variants = {
    default: "glass-card bg-white/70 border-black/5 shadow-[0_4px_30px_rgba(0,0,0,0.05)]",
    clear: "bg-white/[0.02] border-white/5 shadow-[0_8px_32px_rgba(0,0,0,0.05)] hover:bg-white/[0.05]", 
  };

  return (
    <div
      onClick={onClick}
      className={clsx(
        baseStyles,
        variants[variant],
        onClick && "active:scale-[0.98] cursor-pointer",
        className
      )}
    >
      {children}
    </div>
  );
}
