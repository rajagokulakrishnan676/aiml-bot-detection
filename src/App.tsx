import { useState } from 'react';
import { Header } from './components/Header';
import { AnalyzerForm } from './components/AnalyzerForm';
import { Dashboard } from './components/Dashboard';
import { motion, AnimatePresence } from 'framer-motion';
import type { Profile, Behavior, RiskAnalysis } from './lib/api';

interface AnalysisResult {
  profile: Profile;
  behavior: Behavior;
  risk: RiskAnalysis;
}

function App() {
  const [analysisData, setAnalysisData] = useState<AnalysisResult | null>(null);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <AnalyzerForm onAnalysisComplete={setAnalysisData} />
      
      <AnimatePresence>
        {analysisData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Dashboard data={analysisData} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;