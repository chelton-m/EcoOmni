'use client';

import { motion } from 'framer-motion';
import { LightBulbIcon, ChartBarIcon, ClockIcon } from '@heroicons/react/24/solid';

interface ConnectedInsightProps {
  title: string;
  message: string;
  icon?: 'lightbulb' | 'chart' | 'clock';
}

export default function ConnectedInsight({ title, message, icon = 'lightbulb' }: ConnectedInsightProps) {
  const icons = {
    lightbulb: LightBulbIcon,
    chart: ChartBarIcon,
    clock: ClockIcon,
  };

  const Icon = icons[icon];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden bg-gradient-to-br from-eco-green-50 to-eco-blue-50 rounded-xl shadow-md p-6 border-2 border-eco-green-200 animate-pulse-slow"
    >
      {/* Decorative background pattern */}
      <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-eco-green-200 rounded-full opacity-20 blur-2xl"></div>
      <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-32 h-32 bg-eco-blue-200 rounded-full opacity-20 blur-2xl"></div>

      <div className="relative flex items-start space-x-4">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-eco-green-500 to-eco-blue-500 rounded-xl flex items-center justify-center shadow-lg"
        >
          <Icon className="w-6 h-6 text-white" />
        </motion.div>

        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
          <p className="text-gray-700 leading-relaxed">{message}</p>
        </div>
      </div>

      {/* Connecting dots decoration */}
      <div className="absolute bottom-4 right-4 flex items-center space-x-1 opacity-30">
        <div className="w-2 h-2 bg-eco-green-600 rounded-full"></div>
        <div className="w-8 h-0.5 bg-eco-green-600"></div>
        <div className="w-2 h-2 bg-eco-blue-600 rounded-full"></div>
        <div className="w-8 h-0.5 bg-eco-blue-600"></div>
        <div className="w-2 h-2 bg-eco-green-600 rounded-full"></div>
      </div>
    </motion.div>
  );
}

