"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Sparkles } from "lucide-react";
import { clsx } from "clsx";
import { BottomNav } from "@/components/BottomNav";

const SUGGESTED_QUESTIONS = [
  {
    id: "spend",
    text: "How much did I spend on coffee?",
    answer: "You spent $142.50 on coffee this month across 28 transactions. That's 15% higher than your average. Starbucks was your top merchant."
  },
  {
    id: "save",
    text: "Can I afford a trip to Bali?",
    answer: "Based on your current savings rate of $1,337/mo and balance of $24k, you can comfortably afford a $3k trip to Bali next month without impacting your emergency fund."
  },
  {
    id: "invest",
    text: "How is my crypto performing?",
    answer: "Your crypto portfolio is up +22% this week, driven largely by the recent Bitcoin rally. Your total crypto holdings are now valued at $8,420."
  }
];

export default function AssistantPage() {
  const [messages, setMessages] = useState([
    { role: "user", content: "How much did I spend on food last month?" },
    { role: "assistant", content: "You spent $1,284 on dining & groceries in November (+18% vs Oct). Want the breakdown?" }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (text: string = input) => {
      if(!text.trim()) return;
      
      const preset = SUGGESTED_QUESTIONS.find(q => q.text === text);
      
      setMessages(prev => [...prev, { role: "user", content: text }]);
      if (text === input) setInput("");
      setIsTyping(true);

      setTimeout(() => {
          setIsTyping(false);
          setTimeout(() => {
            const response = preset 
                ? preset.answer 
                : "I'm a demo AI, but I see you're interested! Try asking one of the suggested questions above to see how I can help.";
                
            setMessages(prev => [...prev, { role: "assistant", content: response }]);
          }, 200);
      }, 1500);
  };

  return (
    <div className="h-screen w-full bg-gray-50 relative overflow-hidden select-none">
      <motion.div
        initial={{ clipPath: "circle(0px at 50% calc(100% - 56px))" }}
        animate={{ clipPath: "circle(150% at 50% calc(100% - 56px))" }}
        transition={{ duration: 1.5, ease: "circOut" }}
        className="absolute inset-0 z-0 flex flex-col"
      >
        <header className="p-4 border-b border-gray-200 bg-white/80 backdrop-blur-md z-20 flex justify-center items-center gap-2 fixed top-0 left-0 right-0">
          <div className="p-1.5 bg-[#0000e6] rounded-lg shadow-sm">
              <Sparkles size={14} className="text-white" />
          </div>
          <h1 className="font-bold text-sm tracking-wide text-gray-900 flex items-center gap-2">
            Ryte AI 
            <span className="text-gray-400">•</span>
            <span className="text-green-500 flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              Online
            </span>
          </h1>
        </header>

        <div className="flex-1 overflow-y-auto p-6 pt-20 pb-48 space-y-6">
          <AnimatePresence initial={false}>
              {messages.map((msg, idx) => (
                  <motion.div 
                      key={idx} 
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      className={clsx("flex w-full", msg.role === "user" ? "justify-end" : "justify-start")}
                  >
                      <div className={clsx(
                          "max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed shadow-sm backdrop-blur-sm",
                          msg.role === "user" 
                              ? "bg-white text-gray-900 rounded-br-sm border border-gray-100" 
                              : "bg-[#0000e6] text-white rounded-bl-sm shadow-md"
                      )}>
                          {msg.content}
                      </div>
                  </motion.div>
              ))}
              
              {isTyping && (
                <motion.div 
                  key="typing"
                  initial={{ opacity: 0, y: 10, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                  className="flex w-full justify-start"
                >
                  <div className="bg-[#0000e6]/10 p-4 rounded-2xl rounded-bl-sm border border-[#0000e6]/10 flex gap-1.5 items-center">
                      <div className="w-2 h-2 bg-[#0000e6]/50 rounded-full animate-bounce [animation-delay:-0.3s]" />
                      <div className="w-2 h-2 bg-[#0000e6]/50 rounded-full animate-bounce [animation-delay:-0.15s]" />
                      <div className="w-2 h-2 bg-[#0000e6]/50 rounded-full animate-bounce" />
                  </div>
                </motion.div>
              )}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>

        <div className="fixed bottom-24 left-0 right-0 p-4 z-30 bg-gradient-to-t from-gray-50 via-gray-50/90 to-transparent pt-10">
            <div className="flex gap-2 overflow-x-auto pb-4 px-1 no-scrollbar mask-gradient">
              {SUGGESTED_QUESTIONS.map((q) => (
                <button
                  key={q.id}
                  onClick={() => handleSend(q.text)}
                  className="flex-shrink-0 px-4 py-2 bg-white border border-gray-200 rounded-full text-xs text-gray-600 hover:bg-gray-50 hover:border-[#0000e6]/30 active:scale-95 transition-all whitespace-nowrap min-w-[60px] flex justify-center items-center shadow-sm"
                >
                  {q.text}
                </button>
              ))}
            </div>

            <div className="relative max-w-md mx-auto">
                <input 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  className="w-full bg-white border border-gray-200 rounded-full py-4 pl-6 pr-14 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#0000e6] focus:ring-1 focus:ring-[#0000e6]/20 transition-all shadow-lg shadow-gray-200/50"
                  placeholder="Ask Ryte anything..."
                />
                <button 
                  onClick={() => handleSend()}
                  className="absolute right-2 top-2 w-10 h-10 bg-[#0000e6] rounded-full flex items-center justify-center text-white shadow-md hover:scale-105 active:scale-95 transition-all"
                >
                    <Send size={18} className="ml-0.5" />
                </button>
            </div>
        </div>
      </motion.div>

      <BottomNav />
    </div>
  )
}
