"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, MessageSquare, Lock } from "lucide-react";
import { motion } from "framer-motion";
import { clsx } from "clsx";

export function BottomNav() {
  const pathname = usePathname();

  const tabs = [
    { name: "Home", href: "/home", icon: Home },
    { name: "Assistant", href: "/assistant", icon: MessageSquare },
    { name: "Vault", href: "/vault", icon: Lock },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-6 pb-8 bg-gradient-to-t from-white via-white/90 to-transparent pointer-events-none">
      <div className="flex items-center justify-around max-w-xs mx-auto bg-white border border-black/5 backdrop-blur-xl rounded-full p-2 pointer-events-auto shadow-2xl shadow-black/5">
        {tabs.map((tab) => {
          const isActive = pathname === tab.href;
          const isAssistant = tab.name === "Assistant";
          
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={clsx(
                "relative flex items-center justify-center w-14 h-12 rounded-full transition-colors duration-300",
                isActive ? "text-[#0000e6]" : "text-gray-400 hover:text-gray-600"
              )}
            >
              {isAssistant ? (
                <div className="absolute inset-0 rounded-full p-[2px] overflow-hidden">
                    <motion.div 
                        className="absolute inset-[-50%] bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    />
                    <div className={clsx(
                      "absolute inset-0 rounded-full m-[1px] transition-colors duration-300",
                      isActive ? "bg-white" : "bg-white/90" 
                    )} />
                </div>
              ) : (
                isActive && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-[#0000e6]/10 rounded-full"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )
              )}
              <div className="relative z-10">
                  <tab.icon size={22} strokeWidth={isActive ? 2.5 : 2} />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
