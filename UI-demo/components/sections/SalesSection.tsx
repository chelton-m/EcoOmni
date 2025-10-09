'use client';

import { motion } from 'framer-motion';
import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

// Data matching the exact design from the image
const cogsData = [
  { name: 'Matcha Latte', value: 75, color: '#16a34a' },
  { name: 'Cappuccino', value: 20, color: '#3b82f6' },
  { name: 'Coffee Latte', value: 5, color: '#16a34a' },
];

const salesDistribution = [
  { name: 'Coffee Latte', value: 33, color: '#93c5fd' },
  { name: 'Avocado smoothies', value: 30.9, color: '#60a5fa' },
  { name: 'Matcha Latte', value: 20.6, color: '#1d4ed8' },
  { name: 'Lemonade', value: 15.5, color: '#16a34a' },
];

const productRevenueData = [
  { product: 'Matcha Latte', topSelling: 2, topEarning: 3.5 },
  { product: 'Coffee Latte', topSelling: 4, topEarning: 3 },
  { product: 'Avocado smoothies', topSelling: 3, topEarning: 2.5 },
  { product: 'Lemonade', topSelling: 1, topEarning: 1 },
];

export default function SalesSection() {
  return (
    <div className="w-full bg-white p-8 min-h-screen">
      {/* Header with Logo and Title */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="flex items-center mb-4">
          {/* EcoOmni Logo */}
          <img 
            src="/logo/EcoOmni-Logo-top-removebg-preview.png" 
            alt="EcoOmni Logo" 
            className="h-16 w-auto"
          />
        </div>
        <h1 className="text-3xl font-bold text-black uppercase tracking-wide">
          COGS PER PRODUCT
        </h1>
      </div>

      {/* Main Dashboard Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-12 gap-4 h-[600px]">
        {/* Left Panel - COGS Cards */}
        <div className="col-span-3 space-y-4">
          
          {cogsData.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="bg-white rounded-lg p-4 shadow-sm"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-3xl font-bold text-blue-400">{item.value}%</span>
                <span className="text-lg font-medium text-black">{item.name}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${item.value}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: index * 0.2 + 0.5 }}
                  className="h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Middle Panel - Information Blocks */}
        <div className="col-span-2 space-y-4">
          {/* Green Block */}
          <div className="bg-green-500 p-4 rounded-lg h-[280px] flex flex-col justify-center">
            <div className="text-white">
              <h3 className="text-sm font-bold uppercase leading-tight mb-2">
                TIME IN THE DAY WHERE SALE PRODUCTS IS HIGH
              </h3>
              <p className="text-xs opacity-90">
                pie chart featuring Products Gross Profit distribution
              </p>
            </div>
          </div>

          {/* Blue Block */}
          <div className="bg-blue-400 p-4 rounded-lg h-[280px] flex flex-col justify-center">
            <div className="text-white">
              <h3 className="text-sm font-bold uppercase leading-tight mb-2">
                PRODUCT REVENUE BASED ON SELLING POINTS
              </h3>
              <p className="text-xs opacity-90">
                line chart featuring days of the week
              </p>
            </div>
          </div>
        </div>

        {/* Right Panel - Charts */}
        <div className="col-span-7 space-y-4">
          {/* Pie Chart */}
          <div className="bg-white rounded-lg p-4 h-[280px] shadow-sm border">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={salesDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}%`}
                  outerRadius={70}
                  fill="#8884d8"
                  dataKey="value"
                  animationDuration={1500}
                >
                  {salesDistribution.map((entry, index) => (
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
          </div>

          {/* Line Chart */}
          <div className="bg-white rounded-lg p-4 h-[280px] shadow-sm border">
            <div className="flex justify-center space-x-6 mb-2">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-blue-300"></div>
                <span className="text-sm text-gray-600">Top-Selling</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-blue-800"></div>
                <span className="text-sm text-gray-600">Top-earning</span>
              </div>
            </div>
            
            <ResponsiveContainer width="100%" height="85%">
              <LineChart data={productRevenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="product" 
                  stroke="#6b7280"
                  fontSize={10}
                />
                <YAxis 
                  stroke="#6b7280"
                  domain={[0, 4]}
                  ticks={[0, 1, 2, 3, 4]}
                  fontSize={10}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="topSelling"
                  stroke="#93c5fd"
                  strokeWidth={2}
                  dot={{ fill: '#93c5fd', r: 3 }}
                  name="Top-Selling"
                  animationDuration={1500}
                />
                <Line
                  type="monotone"
                  dataKey="topEarning"
                  stroke="#1d4ed8"
                  strokeWidth={2}
                  dot={{ fill: '#1d4ed8', r: 3 }}
                  name="Top-earning"
                  animationDuration={1500}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
