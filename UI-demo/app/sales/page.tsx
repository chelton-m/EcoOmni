'use client';

import { motion } from 'framer-motion';
import ConnectedInsight from '@/components/ConnectedInsight';
import { mockCogsData, mockSalesDistribution, mockProductRevenue, connectedInsights } from '@/utils/mockData';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

export default function SalesPipeline() {
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
          Sales Pipeline
        </h1>
        <p className="text-gray-600">Track product performance and revenue trends</p>
      </motion.div>

      {/* COGS Per Product */}
      <motion.div variants={itemVariants} className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">COGS Per Product</h3>
        <div className="space-y-4">
          {mockCogsData.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">{item.name}</span>
                <span className="text-sm font-semibold text-eco-green-600">${item.cogs}</span>
              </div>
              <div className="relative w-full h-8 bg-gray-100 rounded-lg overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${item.value}%` }}
                  transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-eco-green-500 to-eco-green-600 rounded-lg flex items-center justify-end px-3"
                >
                  <span className="text-xs font-semibold text-white">{item.value}%</span>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Charts Row */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        {/* Sales Distribution Pie Chart */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Sales Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={mockSalesDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                animationDuration={1500}
              >
                {mockSalesDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {mockSalesDistribution.map((item) => (
              <div key={item.name} className="flex items-center space-x-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm text-gray-600">{item.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Product Revenue Line Chart */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Product Revenue Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={mockProductRevenue}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="matcha"
                stroke="#16a34a"
                strokeWidth={2}
                dot={{ fill: '#16a34a', r: 3 }}
                name="Matcha Latte"
                animationDuration={1500}
              />
              <Line
                type="monotone"
                dataKey="cappuccino"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={{ fill: '#3b82f6', r: 3 }}
                name="Cappuccino"
                animationDuration={1500}
              />
              <Line
                type="monotone"
                dataKey="croissant"
                stroke="#22c55e"
                strokeWidth={2}
                dot={{ fill: '#22c55e', r: 3 }}
                name="Croissant"
                animationDuration={1500}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Connected Insight */}
      <motion.div variants={itemVariants}>
        <ConnectedInsight
          title={connectedInsights[1].title}
          message={connectedInsights[1].message}
          icon="chart"
        />
      </motion.div>
    </motion.div>
  );
}

