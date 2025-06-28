import { Card, Title, BarChart, DonutChart, AreaChart, LineChart } from '@tremor/react';
import { Shield, Bot, AlertTriangle, Activity, Users, MessageSquare, Clock, Network, FileText, Brain, Zap, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import type { Profile, Behavior, RiskAnalysis } from '../lib/api';

interface DashboardProps {
  data: {
    profile: Profile;
    behavior: Behavior;
    risk: RiskAnalysis;
  };
}

export function Dashboard({ data }: DashboardProps) {
  const { profile, behavior, risk } = data;

  const activityData = behavior.activity_hours.map((value, hour) => ({
    hour: format(new Date().setHours(hour), 'ha'),
    activity: value,
  }));

  const riskFactors = risk.risk_factors.map(factor => ({
    name: factor.factor,
    value: factor.severity,
  }));

  const networkMetrics = [
    {
      name: 'Bot Network Size',
      value: risk.network_analysis.bot_network_size,
    },
    {
      name: 'Coordination Score',
      value: risk.network_analysis.coordination_score * 100,
    },
    {
      name: 'Influence Score',
      value: risk.network_analysis.influence_score * 100,
    },
  ];

  const contentAnalysis = [
    {
      name: 'Sentiment',
      value: (profile.content_analysis.sentiment_score + 1) * 50,
    },
    {
      name: 'Toxicity',
      value: profile.content_analysis.toxicity_level * 100,
    },
    {
      name: 'Spam Probability',
      value: profile.content_analysis.spam_probability * 100,
    },
    {
      name: 'AI Generated',
      value: profile.content_analysis.ai_generated_probability * 100,
    },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="max-w-7xl mx-auto mt-8 px-4 space-y-8"
    >
    
      <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-xl p-1">
        <div className="bg-white rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
            AI-Powered Profile Analysis
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-gray-600">Username</p>
              <p className="text-lg font-semibold">{profile.username}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Platform</p>
              <p className="text-lg font-semibold capitalize">{profile.platform}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Account Age</p>
              <p className="text-lg font-semibold">
                {format(new Date(profile.metrics.created_at), 'MMM yyyy')}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Threat Level</p>
              <p className={`text-lg font-semibold ${
                risk.threat_level === 'critical' ? 'text-red-600' :
                risk.threat_level === 'high' ? 'text-orange-600' :
                risk.threat_level === 'medium' ? 'text-yellow-600' :
                'text-green-600'
              }`}>
                {risk.threat_level.charAt(0).toUpperCase() + risk.threat_level.slice(1)}
              </p>
            </div>
          </div>
        </div>
      </div>

  
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Risk Score"
          value={`${Math.round(risk.risk_score)}%`}
          icon={Shield}
          color={
            risk.risk_score > 70 ? 'text-red-500' :
            risk.risk_score > 40 ? 'text-yellow-500' :
            'text-green-500'
          }
          trend={risk.risk_score > 50 ? 'increasing' : 'decreasing'}
        />
        <MetricCard
          title="Bot Probability"
          value={`${Math.round(risk.bot_probability * 100)}%`}
          icon={Bot}
          color="text-purple-500"
          trend={risk.bot_probability > 0.5 ? 'increasing' : 'stable'}
        />
        <MetricCard
          title="AI Content Detection"
          value={`${Math.round(profile.content_analysis.ai_generated_probability * 100)}%`}
          icon={Brain}
          color="text-blue-500"
          trend="stable"
        />
        <MetricCard
          title="Network Risk"
          value={`${Math.round(risk.network_analysis.coordination_score * 100)}%`}
          icon={Network}
          color="text-indigo-500"
          trend={risk.network_analysis.coordination_score > 0.5 ? 'increasing' : 'decreasing'}
        />
      </div>

  
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <Title>Activity Distribution (24h)</Title>
          <AreaChart
            data={activityData}
            index="hour"
            categories={["activity"]}
            colors={["indigo"]}
            className="mt-6 h-72"
          />
        </Card>

        <Card>
          <Title>Risk Factor Analysis</Title>
          <DonutChart
            data={riskFactors}
            index="name"
            category="value"
            colors={["rose", "amber", "emerald"]}
            className="mt-6"
          />
        </Card>

        <Card>
          <Title>Network Analysis</Title>
          <BarChart
            data={networkMetrics}
            index="name"
            categories={["value"]}
            colors={["purple"]}
            className="mt-6 h-72"
          />
        </Card>

        <Card>
          <Title>Content Analysis</Title>
          <LineChart
            data={contentAnalysis}
            index="name"
            categories={["value"]}
            colors={["cyan"]}
            className="mt-6 h-72"
          />
        </Card>
      </div>

    
      <div className="bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl p-1">
        <div className="bg-white rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Brain className="w-6 h-6 text-blue-500" />
            Behavioral Biometrics Analysis
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-600">Typing Pattern</p>
              <p className="text-2xl font-semibold text-blue-700">
                {Math.round(behavior.behavioral_biometrics.typing_pattern_score * 100)}%
              </p>
            </div>
            <div className="p-4 bg-cyan-50 rounded-lg">
              <p className="text-sm text-cyan-600">Mouse Movement</p>
              <p className="text-2xl font-semibold text-cyan-700">
                {Math.round(behavior.behavioral_biometrics.mouse_movement_authenticity * 100)}%
              </p>
            </div>
            <div className="p-4 bg-indigo-50 rounded-lg">
              <p className="text-sm text-indigo-600">Interaction Naturalness</p>
              <p className="text-2xl font-semibold text-indigo-700">
                {Math.round(behavior.behavioral_biometrics.interaction_naturalness * 100)}%
              </p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <p className="text-sm text-purple-600">Device Fingerprint</p>
              <p className="text-lg font-mono text-purple-700 truncate">
                {behavior.behavioral_biometrics.device_fingerprint}
              </p>
            </div>
          </div>
        </div>
      </div>

 
      {risk.suspicious_patterns.length > 0 && (
        <div className="bg-red-50 rounded-xl p-6 border border-red-200">
          <h3 className="text-xl font-semibold text-red-700 mb-4 flex items-center gap-2">
            <AlertTriangle className="w-6 h-6" />
            Critical Security Alerts
          </h3>
          <ul className="space-y-2">
            {risk.suspicious_patterns.map((pattern, index) => (
              <li key={index} className="flex items-center gap-2 text-red-600 bg-red-100 p-3 rounded-lg">
                <Zap className="w-5 h-5" />
                <span>{pattern}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </motion.div>
  );
}

function MetricCard({ 
  title, 
  value, 
  icon: Icon, 
  color,
  trend
}: { 
  title: string;
  value: string;
  icon: any;
  color: string;
  trend: 'increasing' | 'decreasing' | 'stable';
}) {
  return (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
    >
      <div className="flex items-center gap-4">
        <div className={`${color} p-3 rounded-lg bg-opacity-10`}>
          <Icon className="w-6 h-6" />
        </div>
        <div>
          <p className="text-sm text-gray-600">{title}</p>
          <div className="flex items-center gap-2">
            <p className="text-2xl font-semibold">{value}</p>
            {trend === 'increasing' && (
              <span className="text-red-500">↑</span>
            )}
            {trend === 'decreasing' && (
              <span className="text-green-500">↓</span>
            )}
            {trend === 'stable' && (
              <span className="text-gray-500">→</span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}