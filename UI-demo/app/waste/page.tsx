'use client';

import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import ConnectedInsight from '@/components/ConnectedInsight';
import { mockWasteOverTime, mockTopWastedProducts, connectedInsights } from '@/utils/mockData';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { TrashIcon, ArrowTrendingDownIcon } from '@heroicons/react/24/outline';

export default function WastePipeline() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-8"
    >
      <motion.div variants={itemVariants}>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-eco-green-600 to-eco-blue-600 bg-clip-text text-transparent mb-2">
          Waste Management Pipeline
        </h1>
        <p className="text-gray-600">Track waste reduction and identify optimization opportunities</p>
      </motion.div>

      {/* KPI Cards */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-start justify-between">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-eco-green-500 to-eco-green-600 flex items-center justify-center mb-4">
              <TrashIcon className="w-6 h-6 text-white" />
            </div>
            <div className="px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 flex items-center space-x-1">
              <ArrowTrendingDownIcon className="w-3 h-3" />
              <span>8.3%</span>
            </div>
          </div>
          <h3 className="text-sm font-medium text-gray-600 mb-1">Total Food Waste Collected</h3>
          <div className="text-3xl font-bold text-eco-green-700">
            <CountUp end={342} duration={2} />
            <span className="text-lg"> units</span>
          </div>
          <p className="text-xs text-gray-500 mt-2">This month&apos;s collection</p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-start justify-between">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-eco-blue-500 to-eco-blue-600 flex items-center justify-center mb-4">
              <ArrowTrendingDownIcon className="w-6 h-6 text-white" />
            </div>
            <div className="px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 flex items-center space-x-1">
              <ArrowTrendingDownIcon className="w-3 h-3" />
              <span>12.5%</span>
            </div>
          </div>
          <h3 className="text-sm font-medium text-gray-600 mb-1">Total Food Waste Diverted</h3>
          <div className="text-3xl font-bold text-eco-blue-700">
            <CountUp end={286} duration={2} />
            <span className="text-lg"> units</span>
          </div>
          <p className="text-xs text-gray-500 mt-2">83.6% diversion rate</p>
        </div>
      </motion.div>

      {/* Waste Over Time Line Chart */}
      <motion.div variants={itemVariants} className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Total Waste Collected Over Time</h3>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={mockWasteOverTime}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="week" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
              }}
            />
            <Line
              type="monotone"
              dataKey="waste"
              stroke="#16a34a"
              strokeWidth={3}
              dot={{ fill: '#16a34a', r: 5 }}
              animationDuration={1500}
            />
          </LineChart>
        </ResponsiveContainer>
        <div className="mt-4 p-4 bg-gradient-to-r from-eco-green-50 to-eco-blue-50 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Average Weekly Waste</p>
              <p className="text-2xl font-bold text-eco-green-700">27.3 units</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Reduction This Period</p>
              <p className="text-2xl font-bold text-eco-blue-700">-18.5%</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Top 5 Wasted Products Bar Chart */}
      <motion.div variants={itemVariants} className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Top 5 Wasted Products</h3>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={mockTopWastedProducts} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis type="number" stroke="#6b7280" />
            <YAxis dataKey="name" type="category" stroke="#6b7280" width={100} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
              }}
            />
            <Bar dataKey="units" radius={[0, 8, 8, 0]} animationDuration={1500}>
              {mockTopWastedProducts.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <div className="mt-6 grid grid-cols-2 md:grid-cols-5 gap-3">
          {mockTopWastedProducts.map((item) => (
            <motion.div
              key={item.name}
              whileHover={{ scale: 1.05 }}
              className="p-3 bg-gradient-to-br from-eco-green-50 to-eco-blue-50 rounded-lg text-center"
            >
              <div
                className="w-4 h-4 rounded-full mx-auto mb-2"
                style={{ backgroundColor: item.color }}
              />
              <p className="text-xs font-medium text-gray-700">{item.name}</p>
              <p className="text-sm font-bold text-eco-green-700">{item.units} units</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Waste Reduction Recommendations */}
      <motion.div variants={itemVariants} className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Waste Reduction Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-gradient-to-br from-eco-green-50 to-eco-green-100 rounded-lg border-l-4 border-eco-green-500">
            <h4 className="font-semibold text-eco-green-800 mb-2">Milk Optimization</h4>
            <p className="text-sm text-gray-700">
              Reduce milk orders by 10% based on current waste patterns to save ~$120/month
            </p>
          </div>
          <div className="p-4 bg-gradient-to-br from-eco-blue-50 to-eco-blue-100 rounded-lg border-l-4 border-eco-blue-500">
            <h4 className="font-semibold text-eco-blue-800 mb-2">Pastry Schedule</h4>
            <p className="text-sm text-gray-700">
              Adjust croissant baking schedule to reduce end-of-day waste by 25%
            </p>
          </div>
          <div className="p-4 bg-gradient-to-br from-eco-green-50 to-eco-green-100 rounded-lg border-l-4 border-eco-green-500">
            <h4 className="font-semibold text-eco-green-800 mb-2">Portion Control</h4>
            <p className="text-sm text-gray-700">
              Implement portion control for salads to reduce waste by an estimated 30%
            </p>
          </div>
        </div>
      </motion.div>

      {/* Connected Insight */}
      <motion.div variants={itemVariants}>
        <ConnectedInsight
          title={connectedInsights[0].title}
          message={connectedInsights[0].message}
          icon="lightbulb"
        />
      </motion.div>
    </motion.div>
  );
}
