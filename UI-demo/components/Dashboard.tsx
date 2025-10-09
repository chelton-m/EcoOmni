'use client';

import { motion } from 'framer-motion';
import ConnectedInsight from './ConnectedInsight';
import KPICard from './KPICard';
import { mockKPIs, mockSalesData, connectedInsights } from '@/utils/mockData';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { CurrencyDollarIcon, TrashIcon, CubeIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';

export default function Dashboard() {
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
      {/* Connected Insight Card */}
      <motion.div variants={itemVariants}>
        <ConnectedInsight
          title={connectedInsights[0].title}
          message={connectedInsights[0].message}
          icon="lightbulb"
        />
      </motion.div>

      {/* KPI Cards Grid */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <KPICard
          title="Total Revenue"
          value={mockKPIs.totalRevenue}
          prefix="$"
          icon={CurrencyDollarIcon}
          trend={{ value: 12.5, isPositive: true }}
          color="green"
        />
        <KPICard
          title="Total Waste"
          value={mockKPIs.totalWaste}
          suffix=" units"
          icon={TrashIcon}
          trend={{ value: 8.3, isPositive: false }}
          color="blue"
        />
        <KPICard
          title="Inventory Costs"
          value={mockKPIs.inventoryCosts}
          prefix="$"
          icon={CubeIcon}
          trend={{ value: 5.2, isPositive: false }}
          color="green"
        />
        <KPICard
          title="Stockout Rate"
          value={mockKPIs.stockoutRate}
          suffix="%"
          icon={ExclamationTriangleIcon}
          trend={{ value: 2.1, isPositive: false }}
          color="blue"
        />
      </motion.div>

      {/* Charts Section */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        {/* Revenue Trend */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Trend</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={mockSalesData}>
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
              <motion.line
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, ease: 'easeInOut' }}
              />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#16a34a"
                strokeWidth={3}
                dot={{ fill: '#16a34a', r: 4 }}
                animationDuration={1500}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Orders Volume */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Orders</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={mockSalesData}>
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
              <Bar dataKey="orders" fill="#3b82f6" radius={[8, 8, 0, 0]} animationDuration={1500} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Quick Stats */}
      <motion.div
        variants={itemVariants}
        className="bg-white rounded-xl shadow-md p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-eco-green-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Best Selling Product</p>
            <p className="text-xl font-bold text-eco-green-700">Matcha Latte</p>
          </div>
          <div className="p-4 bg-eco-blue-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Avg. Order Value</p>
            <p className="text-xl font-bold text-eco-blue-700">$24.50</p>
          </div>
          <div className="p-4 bg-eco-green-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Customer Satisfaction</p>
            <p className="text-xl font-bold text-eco-green-700">4.8/5.0</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

