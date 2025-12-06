"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, TrendingUp, Coffee, AlertCircle, Plane, Trash2, Check, X } from "lucide-react";
import Image from "next/image";
import { BottomNav } from "@/components/BottomNav";
import { GlassCard } from "@/components/ui/GlassCard";
import { toast } from "sonner";
import { FullScreenCoin } from "@/components/ui/LoadingCoin";

type FeedItemType = "netflix" | "japan" | "coffee";

export default function HomePage() {
  const [balance, setBalance] = useState(24681.00);
  const [feedItems, setFeedItems] = useState<FeedItemType[]>(["netflix", "japan", "coffee"]);
  const [isLoading, setIsLoading] = useState(false);

  const handleDismiss = (id: FeedItemType) => {
    setFeedItems((prev) => prev.filter((item) => item !== id));
  };

  const withLoading = (callback: () => void) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      callback();
    }, 1000); 
  };

  const handleCancelSubscription = () => {
    withLoading(() => {
      handleDismiss("netflix");
      toast.success("Subscription cancelled. You saved $14.99");
    });
  };

  const handleKeepSubscription = () => {
    withLoading(() => {
      handleDismiss("netflix");
      toast.info("Subscription kept active");
    });
  };

  const handleTransferToGoal = () => {
    withLoading(() => {
      handleDismiss("japan");
      setBalance(prev => prev - 400);
      toast.success("Transferred $400 to Japan Trip Goal");
    });
  };

  const handleSetLimit = () => {
    withLoading(() => {
      handleDismiss("coffee");
      toast.success("Weekly coffee limit set to $25");
    });
  };

  const handleFabClick = () => {
    withLoading(() => {
      toast.info("Quick actions menu coming soon!");
    });
  };

  const handleViewAll = () => {
    toast.info("Showing all recent insights...");
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 pb-28 relative overflow-x-hidden">
      <FullScreenCoin isVisible={isLoading} />
      
      <header className="px-6 pt-14 pb-6 flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h1 className="text-gray-500 text-lg font-medium">Good evening,</h1>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">Alex</h2>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative w-12 h-12 rounded-full border-2 border-black/5 overflow-hidden"
        >
            <Image 
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop"
                alt="Profile"
                fill
                className="object-cover"
            />
        </motion.div>
      </header>

      <main className="px-6 space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-[1px] rounded-2xl shadow-sm border border-black/5"
        >
          <div className="bg-white/80 backdrop-blur-md rounded-2xl p-4 flex items-center gap-3">
             <div className="p-2 bg-[#0000e6]/10 rounded-full text-[#0000e6]">
               <TrendingUp size={20} />
             </div>
             <p className="text-sm font-medium leading-snug text-gray-700">
               You’re on track to save <span className="text-[#0000e6] font-bold">$1,337</span> this month.
             </p>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center py-6 relative"
        >
            <div className="absolute inset-0 bg-blue-100/50 blur-[80px] rounded-full opacity-50" />
            <h3 className="text-gray-500 text-xs font-semibold uppercase tracking-[0.2em] mb-2 relative z-10">Total Balance</h3>
            <h1 className="text-5xl font-mono font-bold text-gray-900 relative z-10 tracking-tighter">
                ${balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </h1>
        </motion.div>

        <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h3 className="text-lg font-bold flex items-center gap-2 text-gray-900">
                        <span className="w-2 h-2 bg-[#0000e6] rounded-full animate-pulse shadow-[0_0_8px_#0000e6]" />
                        Smart Feed
                    </h3>
                    <p className="text-xs text-gray-500 mt-1 ml-4">
                        AI-driven insights to optimize your spending.
                    </p>
                </div>
                <button onClick={handleViewAll} className="text-xs text-[#0000e6] font-bold uppercase tracking-wider active:opacity-70">View All</button>
            </div>
            
            <div className="space-y-4">
              <AnimatePresence mode="popLayout">
                {feedItems.includes("netflix") && (
                    <motion.div
                    layout
                    key="netflix"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    >
                        <GlassCard className="border-l-4 border-l-red-500/80 p-5 bg-white shadow-sm border-gray-100">
                            <div>
                                <h4 className="font-bold text-lg text-gray-900">Netflix Subscription</h4>
                                <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                                    Pay now or save <span className="text-gray-900 font-bold">$14.99</span> by cancelling? You haven't watched in 22 days.
                                </p>
                                <div className="mt-3 flex gap-3">
                                    <button 
                                      onClick={handleCancelSubscription}
                                      className="flex items-center justify-center gap-1.5 px-4 py-2 bg-red-50 text-red-600 rounded-lg text-xs font-bold hover:bg-red-100 transition-colors min-w-[100px]"
                                    >
                                      <Trash2 size={14} />
                                      Cancel It
                                    </button>
                                    <button 
                                      onClick={handleKeepSubscription}
                                      className="flex items-center justify-center gap-1.5 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-xs font-bold hover:bg-gray-200 transition-colors min-w-[80px]"
                                    >
                                      Keep
                                    </button>
                                </div>
                            </div>
                        </GlassCard>
                    </motion.div>
                )}

                {feedItems.includes("japan") && (
                    <motion.div
                    layout
                    key="japan"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    >
                        <GlassCard className="border-l-4 border-l-emerald-500/80 p-5 cursor-pointer active:scale-[0.99] transition-transform bg-white shadow-sm border-gray-100" onClick={handleTransferToGoal}>
                            <div>
                                <h4 className="font-bold text-lg text-gray-900">Japan Trip Goal</h4>
                                <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                                    Tap to transfer <span className="text-gray-900 font-bold">$400</span> to reach 67%? You have excess cash flow.
                                </p>
                                <div className="w-full h-1 bg-gray-200 rounded-full mt-3 overflow-hidden">
                                    <div className="h-full bg-emerald-500 w-[67%]" />
                                </div>
                            </div>
                        </GlassCard>
                    </motion.div>
                )}
                
                {feedItems.includes("coffee") && (
                    <motion.div
                    layout
                    key="coffee"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    >
                        <GlassCard className="border-l-4 border-l-orange-500/80 p-5 bg-white shadow-sm border-gray-100">
                            <div>
                                <h4 className="font-bold text-lg text-gray-900">Coffee Spending</h4>
                                <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                                    You spent <span className="text-orange-600 font-bold">42% more</span> on coffee this week.
                                </p>
                                <button 
                                  onClick={handleSetLimit}
                                  className="mt-3 w-full py-2 bg-orange-50 text-orange-600 rounded-lg text-xs font-bold hover:bg-orange-100 transition-colors flex items-center justify-center"
                                >
                                  Set $25 Limit
                                </button>
                            </div>
                        </GlassCard>
                    </motion.div>
                )}
              </AnimatePresence>

              {feedItems.length === 0 && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-8 text-center text-gray-400 bg-gray-100 rounded-2xl border border-gray-200 border-dashed"
                >
                  <p>All caught up! 🎉</p>
                </motion.div>
              )}
            </div>
        </div>
      </main>
      
      <button 
        onClick={handleFabClick}
        className="fixed bottom-24 right-6 w-14 h-14 bg-[#0000e6] rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(0,0,230,0.3)] text-white hover:scale-110 transition-all active:scale-95 z-40 border border-white/10"
      >
          <Plus size={28} />
      </button>

      <BottomNav />
    </div>
  );
}
