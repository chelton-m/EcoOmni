'use client';

import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import ConnectedInsight from '@/components/ConnectedInsight';
import {
  mockInventoryData,
  mockInventoryTurnover,
  mockLeadTimeData,
  connectedInsights,
} from '@/utils/mockData';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { CubeIcon, ExclamationTriangleIcon, ClockIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

export default function InventoryPipeline() {
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
          Inventory Pipeline
        </h1>
        <p className="text-gray-600">Monitor stock levels and optimize inventory management</p>
      </motion.div>

      {/* KPI Cards */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-start justify-between">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-eco-green-500 to-eco-green-600 flex items-center justify-center mb-4">
              <ExclamationTriangleIcon className="w-6 h-6 text-white" />
            </div>
            <div className="px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
              -2.1%
            </div>
          </div>
          <h3 className="text-sm font-medium text-gray-600 mb-1">Stockout Rate</h3>
          <div className="text-3xl font-bold text-eco-green-700">
            <CountUp end={3.2} duration={2} decimals={1} />%
          </div>
          <p className="text-xs text-gray-500 mt-2">Below industry average of 5%</p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-start justify-between">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-eco-blue-500 to-eco-blue-600 flex items-center justify-center mb-4">
              <CubeIcon className="w-6 h-6 text-white" />
            </div>
            <div className="px-2 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700">
              +5.2%
            </div>
          </div>
          <h3 className="text-sm font-medium text-gray-600 mb-1">Inventory Costs</h3>
          <div className="text-3xl font-bold text-eco-blue-700">
            $<CountUp end={12456} duration={2} separator="," />
          </div>
          <p className="text-xs text-gray-500 mt-2">Monthly holding costs</p>
        </div>
      </motion.div>

      {/* Inventory Levels Bar Chart */}
      <motion.div variants={itemVariants} className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Inventory Levels by Product</h3>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={mockInventoryData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="product" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
              }}
            />
            <Bar dataKey="stock" fill="#16a34a" radius={[8, 8, 0, 0]} animationDuration={1500}>
              {mockInventoryData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.stock <= entry.reorderPoint ? '#ef4444' : '#16a34a'}
                />
              ))}
            </Bar>
            <Bar
              dataKey="reorderPoint"
              fill="#3b82f6"
              radius={[8, 8, 0, 0]}
              animationDuration={1500}
            />
          </BarChart>
        </ResponsiveContainer>
        <div className="mt-4 flex items-center justify-center space-x-6">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-eco-green-600" />
            <span className="text-sm text-gray-600">Current Stock</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-eco-blue-600" />
            <span className="text-sm text-gray-600">Reorder Point</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-600" />
            <span className="text-sm text-gray-600">Low Stock</span>
          </div>
        </div>
      </motion.div>

      {/* Bottom Row Cards */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Inventory Turnover Rate */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-eco-green-500 to-eco-green-600 flex items-center justify-center">
              <ArrowPathIcon className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900">Inventory Turnover Rate</h3>
          </div>
          <div className="space-y-4">
            {mockInventoryTurnover.map((item, index) => (
              <motion.div
                key={item.item}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-3 bg-gradient-to-r from-eco-green-50 to-eco-blue-50 rounded-lg"
              >
                <span className="font-medium text-gray-700">{item.item}</span>
                <span className="text-lg font-bold text-eco-green-600">{item.rate}x</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Lead Time Analysis */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-eco-blue-500 to-eco-blue-600 flex items-center justify-center">
              <ClockIcon className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900">Lead Time Analysis</h3>
          </div>
          <div className="space-y-4">
            {mockLeadTimeData.map((item, index) => (
              <motion.div
                key={item.supplier}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 bg-gradient-to-r from-eco-green-50 to-eco-blue-50 rounded-lg"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-700">{item.supplier}</span>
                  <span className="text-sm font-semibold text-eco-green-600">
                    {item.onTime}% on-time
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <ClockIcon className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{item.avgDays} days average</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Connected Insight */}
      <motion.div variants={itemVariants}>
        <ConnectedInsight
          title={connectedInsights[2].title}
          message={connectedInsights[2].message}
          icon="clock"
        />
      </motion.div>
    </motion.div>
  );
}
