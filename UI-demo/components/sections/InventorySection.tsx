'use client';

import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

// Data matching the exact design from the inventory dashboard image
const inventoryLevelsData = [
  { product: 'Arabica Beans', quantity: 100 },
  { product: 'Fresh Milk', quantity: 150 },
  { product: 'Syrup', quantity: 120 },
  { product: 'Matcha Powder', quantity: 80 },
  { product: 'Sugar', quantity: 200 },
];

const stockoutRates = [
  { month: 'January', rate: 25, color: '#93c5fd' },
  { month: 'February', rate: 65, color: '#16a34a' },
  { month: 'March', rate: 55, color: '#8b5cf6' },
  { month: 'April', rate: 60, color: '#374151' },
];

const inventoryCosts = [
  { name: 'Holding Costs', value: 5000, color: '#16a34a' },
  { name: 'Ordering Costs', value: 3000, color: '#facc15' },
  { name: 'Shortage Costs', value: 1000, color: '#3b82f6' },
];

const turnoverRates = [
  { quarter: 'Q1', rate: 4 },
  { quarter: 'Q2', rate: 3.5 },
  { quarter: 'Q3', rate: 4.2 },
  { quarter: 'Q4', rate: 3.8 },
];

const leadTimeData = [
  { product: 'Product A', days: 7 },
  { product: 'Product B', days: 5 },
  { product: 'Product C', days: 8 },
  { product: 'Product D', days: 6 },
];

export default function InventorySection() {
  return (
    <div className="space-y-8">
      {/* Top Row - Three Main Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Inventory Levels by Product */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-xl shadow-md p-6"
        >
          <div className="bg-eco-green-500 text-white px-4 py-2 rounded-lg mb-6">
            <h3 className="font-semibold">Inventory Levels by Product</h3>
          </div>
          
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={inventoryLevelsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="product" 
                stroke="#6b7280"
                fontSize={10}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis 
                stroke="#6b7280"
                domain={[0, 200]}
                ticks={[0, 50, 100, 150, 200]}
                label={{ value: 'Quantity', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                }}
              />
              <Bar 
                dataKey="quantity" 
                fill="#16a34a" 
                radius={[4, 4, 0, 0]}
                animationDuration={1500}
              />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Stockout Rate */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white rounded-xl shadow-md p-6"
        >
          <div className="bg-eco-green-500 text-white px-4 py-2 rounded-lg mb-6">
            <h3 className="font-semibold">Stockout Rate</h3>
            <p className="text-sm opacity-90">Monthly or quarterly stockout rate</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {stockoutRates.map((item, index) => (
              <motion.div
                key={item.month}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="relative w-24 h-24 mx-auto mb-2">
                  <svg className="w-24 h-24 transform -rotate-90">
                    <circle
                      cx="48"
                      cy="48"
                      r="36"
                      stroke="#e5e7eb"
                      strokeWidth="8"
                      fill="none"
                    />
                    <motion.circle
                      cx="48"
                      cy="48"
                      r="36"
                      stroke={item.color}
                      strokeWidth="8"
                      fill="none"
                      strokeLinecap="round"
                      initial={{ strokeDasharray: '0 226' }}
                      whileInView={{ strokeDasharray: `${226 * (item.rate / 100)} 226` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-lg font-bold text-gray-800">{item.rate}%</span>
                  </div>
                </div>
                <p className="text-sm font-medium text-gray-600">{item.month}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Inventory Costs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-xl shadow-md p-6"
        >
          <div className="bg-eco-green-500 text-white px-4 py-2 rounded-lg mb-6">
            <h3 className="font-semibold">Inventory Costs</h3>
          </div>
          
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={inventoryCosts}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                animationDuration={1500}
              >
                {inventoryCosts.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          
          <div className="mt-4 space-y-2">
            {inventoryCosts.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm text-gray-600">{item.name}</span>
                </div>
                <span className="text-sm font-semibold text-gray-800">{item.value}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom Row - Two Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Inventory Turnover Rate */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white rounded-xl shadow-md p-6"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-2">Inventory Turnover Rate</h3>
          <p className="text-sm text-gray-600 mb-6">2025</p>
          
          <div className="grid grid-cols-2 gap-4">
            {turnoverRates.map((item, index) => (
              <motion.div
                key={item.quarter}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-eco-green-500 text-white px-4 py-3 rounded-lg text-center"
              >
                <p className="font-semibold">{item.quarter}</p>
                <p className="text-2xl font-bold">{item.rate}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Lead Time Analysis */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white rounded-xl shadow-md p-6"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-6">Lead Time Analysis</h3>
          
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={leadTimeData} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                type="number" 
                stroke="#6b7280"
                domain={[0, 8]}
                ticks={[0, 2, 4, 6, 8]}
              />
              <YAxis 
                dataKey="product" 
                type="category" 
                stroke="#6b7280"
                width={80}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                }}
              />
              <Bar 
                dataKey="days" 
                fill="#16a34a"
                radius={[0, 4, 4, 0]}
                animationDuration={1500}
              />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </div>
  );
}
