"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, Bitcoin, DollarSign, Zap, BrainCircuit, ArrowRight, Loader2, Info, X, Eye, EyeOff } from "lucide-react";
import { BottomNav } from "@/components/BottomNav";
import { GlassCard } from "@/components/ui/GlassCard";
import { toast } from "sonner";
import { clsx } from "clsx";
import { FullScreenCoin } from "@/components/ui/LoadingCoin";

export default function VaultPage() {
  const ringCircumference = 2 * Math.PI * 40; 
  
  const [isLoading, setIsLoading] = useState(false);
  const [isExecutedBTC, setIsExecutedBTC] = useState(false);
  const [netWorth, setNetWorth] = useState(84290);
  const [showInfo, setShowInfo] = useState(false);
  const [isBalanceVisible, setIsBalanceVisible] = useState(true);

  const handleExecuteTrade = () => {
    if (isExecutedBTC) return;
    
    setIsLoading(true);
    setTimeout(() => {
        setIsLoading(false);
        setIsExecutedBTC(true);
        setNetWorth(prev => prev + 12500); 
        toast.success("Order executed: Bought 0.42 BTC at market price");
    }, 1000); 
  };

  const handleTransferFunds = () => {
    setIsLoading(true);
    setTimeout(() => {
        setIsLoading(false);
        toast.success("Transferred $5,000 to S&P 500 Index");
    }, 1000);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 pb-32 relative overflow-x-hidden">
       <FullScreenCoin isVisible={isLoading} />

       <AnimatePresence>
         {showInfo && (
           <>
             <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               onClick={() => setShowInfo(false)}
               className="fixed inset-0 bg-black/20 z-40 backdrop-blur-sm"
             />
             <motion.div 
               initial={{ y: "100%" }}
               animate={{ y: 0 }}
               exit={{ y: "100%" }}
               transition={{ type: "spring", damping: 25, stiffness: 200 }}
               className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 rounded-t-3xl z-50 p-6 pb-10 max-h-[80vh] overflow-y-auto shadow-2xl"
             >
               <div className="flex justify-between items-center mb-6">
                 <h2 className="text-2xl font-bold text-gray-900">How Ryte Vault Works</h2>
                 <button onClick={() => setShowInfo(false)} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
                   <X size={20} className="text-gray-600" />
                 </button>
               </div>
               
               <div className="space-y-6 text-gray-600 leading-relaxed">
                 <p>
                   Ryte Vault uses <span className="text-gray-900 font-bold">autonomous AI agents</span> to monitor global markets 24/7. It rebalances your portfolio in real-time to maximize yield while minimizing risk.
                 </p>
                 
                 <div className="space-y-4">
                   <div className="flex gap-4">
                     <div className="p-3 bg-[#0000e6]/10 text-[#0000e6] rounded-xl h-fit"><BrainCircuit size={24} /></div>
                     <div>
                       <h3 className="font-bold text-gray-900">AI Alpha Strategy</h3>
                       <p className="text-sm mt-1">Our proprietary model predicts market movements with 87% accuracy, shifting assets between crypto, stocks, and bonds.</p>
                     </div>
                   </div>
                   
                   <div className="flex gap-4">
                     <div className="p-3 bg-green-500/10 text-green-600 rounded-xl h-fit"><TrendingUp size={24} /></div>
                     <div>
                       <h3 className="font-bold text-gray-900">Auto-Compounding</h3>
                       <p className="text-sm mt-1">Dividends and staking rewards are automatically reinvested to accelerate your wealth generation curve.</p>
                     </div>
                   </div>
                 </div>

                 <button 
                    onClick={() => setShowInfo(false)}
                    className="w-full py-4 bg-[#0000e6] text-white font-bold rounded-xl mt-4"
                 >
                   Got it
                 </button>
               </div>
             </motion.div>
           </>
         )}
       </AnimatePresence>

       <header className="px-6 pt-14 pb-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Intelligent Vault</h1>
            <p className="text-gray-500 text-sm">AI-Managed Wealth</p>
          </div>
          <button 
            onClick={() => setShowInfo(true)}
            className="p-2 bg-gray-100 rounded-full border border-gray-200 hover:bg-gray-200 active:scale-95 transition-all"
          >
              <Info size={24} className="text-gray-500" />
          </button>
       </header>

       <main className="px-6 space-y-8">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 text-green-600 text-sm font-bold mb-4 border border-green-100 shadow-sm">
                  <TrendingUp size={16} />
                  <span>+20.4% This Year</span>
              </div>
          </motion.div>
          
          <div className="flex flex-col items-center">
            <div className="relative w-64 h-64 flex items-center justify-center">
                <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90 drop-shadow-xl">
                    <circle cx="50" cy="50" r="40" stroke="#e5e7eb" strokeWidth="6" fill="none" />
                    
                    <motion.circle 
                            initial={{ strokeDasharray: "0 251" }}
                            animate={{ strokeDasharray: `${0.48 * ringCircumference} ${ringCircumference}` }}
                            transition={{ duration: 1, delay: 0.4 }}
                            cx="50" cy="50" r="40" stroke="#0000e6" strokeWidth="6" fill="none" strokeLinecap="round" 
                        />
                    <motion.circle 
                            initial={{ strokeDasharray: "0 251" }}
                            animate={{ strokeDasharray: `${0.30 * ringCircumference} ${ringCircumference}` }}
                            transition={{ duration: 1, delay: 0.6 }}
                            cx="50" cy="50" r="40" stroke="#00c6ff" strokeWidth="6" fill="none"
                            strokeDashoffset={`-${0.48 * ringCircumference}`} strokeLinecap="round" 
                        />
                        <motion.circle 
                            initial={{ strokeDasharray: "0 251" }}
                            animate={{ strokeDasharray: `${0.22 * ringCircumference} ${ringCircumference}` }}
                            transition={{ duration: 1, delay: 0.8 }}
                            cx="50" cy="50" r="40" stroke="#7c3aed" strokeWidth="6" fill="none"
                            strokeDashoffset={`-${(0.48 + 0.30) * ringCircumference}`} strokeLinecap="round" 
                        />
                </svg>
                
                <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                    <span className="text-gray-400 text-xs uppercase tracking-wider font-medium mb-1">Net Worth</span>
                    <div className="flex items-center gap-2 w-[140px] justify-center relative">
                        <span className="text-3xl font-bold text-gray-900 tracking-tight">
                            {isBalanceVisible ? formatCurrency(netWorth) : "••••••"}
                        </span>
                        <button 
                        onClick={() => setIsBalanceVisible(!isBalanceVisible)}
                        className="absolute -right-8 text-gray-400 hover:text-gray-600 transition-colors p-2"
                        >
                        {isBalanceVisible ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                    </div>
                </div>
            </div>

            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="flex justify-center flex-wrap gap-4 text-xs font-medium text-gray-500 mt-6"
            >
                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#0000e6]" /> Stocks 48%</div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#00c6ff]" /> AI Alpha 30%</div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#7c3aed]" /> Crypto 22%</div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
             <div className="mb-4">
                <h3 className="text-lg font-bold flex items-center gap-2 text-gray-900">
                    <Zap size={18} className="text-yellow-500 fill-yellow-500 animate-pulse" />
                    Ryte Brain
                </h3>
                <p className="text-sm text-gray-500 mt-1 ml-6">
                    Live market opportunities identified by autonomous agents tailored to your risk profile.
                </p>
             </div>
             
             <div className="space-y-4">
                 {!isExecutedBTC ? (
                     <GlassCard className="border border-gray-200 group hover:border-[#0000e6]/50 bg-white shadow-sm">
                        <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center gap-3">
                                <div className="p-2.5 bg-orange-50 text-orange-600 border border-orange-100 rounded-xl"><Bitcoin size={20} /></div>
                                <h4 className="font-bold text-gray-900">Buy 0.42 BTC</h4>
                            </div>
                            <span className="text-green-600 text-xs font-bold bg-green-50 px-2 py-1 rounded border border-green-100">+41% Proj.</span>
                        </div>
                        <p className="text-sm text-gray-500 mb-4 mt-2">Projected growth in 12 months based on halving cycle analysis.</p>
                        <button 
                            onClick={handleExecuteTrade}
                            disabled={isLoading}
                            className="w-full py-3 font-bold rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 border bg-black text-white hover:bg-gray-800 active:scale-[0.98] border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Execute Trade <ArrowRight size={18} />
                        </button>
                     </GlassCard>
                 ) : (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                    >
                        <GlassCard className="border border-green-200 bg-green-50/50 shadow-sm">
                            <div className="flex items-center gap-4 py-2">
                                <div className="p-3 bg-green-100 text-green-600 rounded-full">
                                    <TrendingUp size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900">Trade Executed</h4>
                                    <p className="text-sm text-gray-600">You successfully bought 0.42 BTC.</p>
                                </div>
                            </div>
                        </GlassCard>
                    </motion.div>
                 )}
                 
                 <GlassCard className="border border-gray-200 group hover:border-[#0000e6]/50 bg-white shadow-sm">
                    <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 bg-blue-50 text-blue-600 border border-blue-100 rounded-xl"><DollarSign size={20} /></div>
                            <h4 className="font-bold text-gray-900">Move $5k to S&P 500</h4>
                        </div>
                        <span className="text-green-600 text-xs font-bold bg-green-50 px-2 py-1 rounded border border-green-100">+9.2% Yield</span>
                    </div>
                    <p className="text-sm text-gray-500 mb-4 mt-2">Beats your current savings rate. Market conditions are optimal.</p>
                    <button 
                        onClick={handleTransferFunds}
                        disabled={isLoading}
                        className="w-full py-3 border font-bold rounded-xl transition-all flex items-center justify-center gap-2 bg-white border-gray-200 text-gray-900 hover:bg-gray-50 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Transfer Funds <ArrowRight size={18} />
                    </button>
                 </GlassCard>
             </div>
          </motion.div>

       </main>
       <BottomNav />
    </div>
  )
}
