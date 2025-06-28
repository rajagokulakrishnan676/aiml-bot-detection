import { Shield, Bot, AlertTriangle, Brain } from 'lucide-react';
import { motion } from 'framer-motion';

export function Header() {
  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-16 px-4 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80')] opacity-10 bg-cover bg-center" />
      
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/90 via-purple-600/90 to-pink-600/90" />
      
      <div className="max-w-7xl mx-auto relative">
        <div className="flex items-center justify-between">
          <div className="space-y-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-3 text-indigo-200"
            >
              <Brain className="w-8 h-8" />
              <span className="text-xl font-semibold">AI-Powered Protection</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-indigo-200"
            >
              Next-Gen Bot Detection
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-indigo-100 max-w-2xl"
            >
              Advanced real-time protection against bots, fake accounts, and automated threats using cutting-edge AI and behavioral analysis.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex gap-4 mt-6"
            >
              <div className="flex items-center gap-2 bg-white/10 rounded-lg px-4 py-2">
                <Shield className="w-5 h-5 text-indigo-200" />
                <span className="text-indigo-100">Real-time Protection</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 rounded-lg px-4 py-2">
                <Brain className="w-5 h-5 text-indigo-200" />
                <span className="text-indigo-100">AI-Powered Analysis</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 rounded-lg px-4 py-2">
                <AlertTriangle className="w-5 h-5 text-indigo-200" />
                <span className="text-indigo-100">Threat Detection</span>
              </div>
            </motion.div>
          </div>
          
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.6, type: "spring" }}
            className="hidden lg:flex gap-4"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full blur-xl opacity-50" />
              <div className="relative bg-white/10 p-6 rounded-full">
                <Shield size={64} className="text-indigo-200" />
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-xl opacity-50" />
              <div className="relative bg-white/10 p-6 rounded-full">
                <Bot size={64} className="text-indigo-200" />
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-red-500 rounded-full blur-xl opacity-50" />
              <div className="relative bg-white/10 p-6 rounded-full">
                <AlertTriangle size={64} className="text-indigo-200" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
}