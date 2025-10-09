'use client';

import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/solid';

interface KPICardProps {
  title: string;
  value: number;
  prefix?: string;
  suffix?: string;
  icon: React.ComponentType<{ className?: string }>;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: 'green' | 'blue';
}

export default function KPICard({
  title,
  value,
  prefix = '',
  suffix = '',
  icon: Icon,
  trend,
  color = 'green',
}: KPICardProps) {
  const colorClasses = {
    green: {
      bg: 'from-eco-green-500 to-eco-green-600',
      light: 'bg-eco-green-50',
      text: 'text-eco-green-700',
    },
    blue: {
      bg: 'from-eco-blue-500 to-eco-blue-600',
      light: 'bg-eco-blue-50',
      text: 'text-eco-blue-700',
    },
  };

  return (
    <motion.div
      whileHover={{ y: -4, shadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}
      className="bg-white rounded-xl shadow-md p-6 transition-shadow hover:shadow-xl"
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${colorClasses[color].bg} flex items-center justify-center`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        {trend && (
          <div
            className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-semibold ${
              trend.isPositive
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
            }`}
          >
            {trend.isPositive ? (
              <ArrowUpIcon className="w-3 h-3" />
            ) : (
              <ArrowDownIcon className="w-3 h-3" />
            )}
            <span>{trend.value}%</span>
          </div>
        )}
      </div>

      <h3 className="text-sm font-medium text-gray-600 mb-1">{title}</h3>
      <div className={`text-3xl font-bold ${colorClasses[color].text}`}>
        {prefix}
        <CountUp
          end={value}
          duration={2}
          separator=","
          decimals={suffix === '%' ? 1 : 0}
        />
        {suffix}
      </div>
    </motion.div>
  );
}

