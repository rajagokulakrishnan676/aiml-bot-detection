import { useState } from 'react';
import { Search, Loader2, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';
import { analyzeProfile } from '../lib/api';
import type { Profile, Behavior, RiskAnalysis } from '../lib/api';

interface AnalysisResult {
  profile: Profile;
  behavior: Behavior;
  risk: RiskAnalysis;
}

interface AnalyzerFormProps {
  onAnalysisComplete: (data: AnalysisResult) => void;
}

export function AnalyzerForm({ onAnalysisComplete }: AnalyzerFormProps) {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

    setLoading(true);
    setError(null);

    try {
      const result = await analyzeProfile(url);
      onAnalysisComplete(result);
    } catch (err) {
      setError('Failed to analyze profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl mx-auto mt-8 px-4 space-y-4"
    >
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter social media profile URL (e.g., https://twitter.com/username)"
          className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          type="submit"
          disabled={loading || !url}
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {loading ? (
            <Loader2 className="animate-spin" />
          ) : (
            <Search className="w-5 h-5" />
          )}
          Analyze
        </button>
      </form>

      {error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-2 text-red-700"
        >
          <AlertTriangle className="w-5 h-5" />
          <p>{error}</p>
        </motion.div>
      )}
    </motion.div>
  );
}