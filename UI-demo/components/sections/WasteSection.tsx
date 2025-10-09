'use client';

import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

// Data matching the waste management dashboard structure but with EcoOmni styling
const wasteByRegion = [
  { region: 'EAP', collected: 450 },
  { region: 'ECA', collected: 320 },
  { region: 'LAC', collected: 280 },
  { region: 'MENA', collected: 520 },
  { region: 'NA', collected: 380 },
  { region: 'SA', collected: 290 },
  { region: 'SSA', collected: 240 },
];

const wasteOverTime = [
  { month: 'Jan', collected: 2100 },
  { month: 'Feb', collected: 2300 },
  { month: 'Mar', collected: 2500 },
  { month: 'Apr', collected: 2800 },
  { month: 'May', collected: 2600 },
  { month: 'Jun', collected: 2400 },
];

const disposalMethods = [
  { method: 'Recycling', value: 72, color: '#16a34a' },
  { method: 'Landfill', value: 28, color: '#6b7280' },
];

const wasteBySector = [
  { sector: 'Residential', collected: 1800 },
  { sector: 'Commercial', collected: 2200 },
  { sector: 'Industrial', collected: 1600 },
];

const wasteDetails = [
  { region: 'EAP', collected: 450, diverted: 380, disposal: 70 },
  { region: 'ECA', collected: 320, diverted: 280, disposal: 40 },
  { region: 'LAC', collected: 280, diverted: 240, disposal: 40 },
  { region: 'MENA', collected: 520, diverted: 450, disposal: 70 },
];

export default function WasteSection() {
  return (
    <div className="flex gap-6 w-full">
      {/* Left Sidebar - Filters */}
      <div className="w-64 bg-white rounded-xl shadow-md p-6 h-fit flex-shrink-0">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Filters</h3>
        
        {/* Waste Type Filter */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-700 mb-3">Waste Type</h4>
          <div className="space-y-2">
            <label className="flex items-center space-x-2">
              <input type="checkbox" defaultChecked className="rounded border-gray-300 text-eco-green-600 focus:ring-eco-green-500" />
              <span className="text-sm text-gray-600">All</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="rounded border-gray-300 text-eco-green-600 focus:ring-eco-green-500" />
              <span className="text-sm text-gray-600">Organic</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="rounded border-gray-300 text-eco-green-600 focus:ring-eco-green-500" />
              <span className="text-sm text-gray-600">Inorganic</span>
            </label>
          </div>
        </div>

        {/* Region Filter */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-700 mb-3">Region</h4>
          <div className="space-y-2">
            <label className="flex items-center space-x-2">
              <input type="checkbox" defaultChecked className="rounded border-gray-300 text-eco-green-600 focus:ring-eco-green-500" />
              <span className="text-sm text-gray-600">All</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="rounded border-gray-300 text-eco-green-600 focus:ring-eco-green-500" />
              <span className="text-sm text-gray-600">EAP</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="rounded border-gray-300 text-eco-green-600 focus:ring-eco-green-500" />
              <span className="text-sm text-gray-600">ECA</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="rounded border-gray-300 text-eco-green-600 focus:ring-eco-green-500" />
              <span className="text-sm text-gray-600">LAC</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="rounded border-gray-300 text-eco-green-600 focus:ring-eco-green-500" />
              <span className="text-sm text-gray-600">MENA</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="rounded border-gray-300 text-eco-green-600 focus:ring-eco-green-500" />
              <span className="text-sm text-gray-600">SA</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="rounded border-gray-300 text-eco-green-600 focus:ring-eco-green-500" />
              <span className="text-sm text-gray-600">NA</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="rounded border-gray-300 text-eco-green-600 focus:ring-eco-green-500" />
              <span className="text-sm text-gray-600">SSA</span>
            </label>
          </div>
        </div>

        {/* Disposal Method Filter */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-700 mb-3">Disposal Method</h4>
          <div className="space-y-2">
            <label className="flex items-center space-x-2">
              <input type="checkbox" defaultChecked className="rounded border-gray-300 text-eco-green-600 focus:ring-eco-green-500" />
              <span className="text-sm text-gray-600">All</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="rounded border-gray-300 text-eco-green-600 focus:ring-eco-green-500" />
              <span className="text-sm text-gray-600">Recycling</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="rounded border-gray-300 text-eco-green-600 focus:ring-eco-green-500" />
              <span className="text-sm text-gray-600">Landfill</span>
            </label>
          </div>
        </div>

        {/* Time Range Filter */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-700 mb-3">Time Range</h4>
          <div className="space-y-2">
            <label className="flex items-center space-x-2">
              <input type="checkbox" defaultChecked className="rounded border-gray-300 text-eco-green-600 focus:ring-eco-green-500" />
              <span className="text-sm text-gray-600">All</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="rounded border-gray-300 text-eco-green-600 focus:ring-eco-green-500" />
              <span className="text-sm text-gray-600">Last 6 Months</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="rounded border-gray-300 text-eco-green-600 focus:ring-eco-green-500" />
              <span className="text-sm text-gray-600">Last 6 Days</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="rounded border-gray-300 text-eco-green-600 focus:ring-eco-green-500" />
              <span className="text-sm text-gray-600">Last 6 Weeks</span>
            </label>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 space-y-6 min-w-0">
      {/* Top Row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Total Food Waste Collected */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-xl shadow-md p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Total Food Waste Collected (tons)</h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600">Current</p>
              <p className="text-3xl font-bold text-eco-green-600">
                <CountUp end={2.5} duration={2} decimals={1} />k
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Previous</p>
              <p className="text-2xl font-semibold text-gray-800">2.2k</p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="px-2 py-1 bg-green-100 text-green-700 rounded text-sm font-semibold">
                +12%
              </div>
            </div>
          </div>
        </motion.div>

        {/* Food Waste Collected by Region */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white rounded-xl shadow-md p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Food Waste Collected by Region</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={wasteByRegion} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis type="number" stroke="#6b7280" />
              <YAxis 
                dataKey="region" 
                type="category" 
                stroke="#6b7280"
                width={60}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                }}
              />
              <Bar 
                dataKey="collected" 
                fill="#16a34a"
                radius={[0, 4, 4, 0]}
                animationDuration={1500}
              />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Total Waste Collected Over Time */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-xl shadow-md p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Total Waste Collected Over Time</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={wasteOverTime}>
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
              <Line
                type="monotone"
                dataKey="collected"
                stroke="#16a34a"
                strokeWidth={3}
                dot={{ fill: '#16a34a', r: 4 }}
                animationDuration={1500}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Middle Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {/* Total Food Waste Diverted */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white rounded-xl shadow-md p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Total Food Waste Diverted (tons)</h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600">Current</p>
              <p className="text-3xl font-bold text-eco-blue-600">
                <CountUp end={1.8} duration={2} decimals={1} />k
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Previous</p>
              <p className="text-2xl font-semibold text-gray-800">1.2k</p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="px-2 py-1 bg-green-100 text-green-700 rounded text-sm font-semibold">
                +25%
              </div>
            </div>
          </div>
        </motion.div>

        {/* Landfill Usage */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white rounded-xl shadow-md p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Landfill Usage (tons)</h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600">Current</p>
              <p className="text-3xl font-bold text-gray-800">700</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Previous</p>
              <p className="text-2xl font-semibold text-gray-800">750</p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="px-2 py-1 bg-amber-100 text-amber-700 rounded text-sm font-semibold">
                -5%
              </div>
            </div>
          </div>
        </motion.div>

        {/* Waste Disposal Methods */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="bg-white rounded-xl shadow-md p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Waste Disposal Methods</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={disposalMethods}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                animationDuration={1500}
              >
                {disposalMethods.map((entry, index) => (
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
            {disposalMethods.map((item) => (
              <div key={item.method} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm text-gray-600">{item.method}</span>
                </div>
                <span className="text-sm font-semibold text-gray-800">{item.value}%</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Waste Collection by Sector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-white rounded-xl shadow-md p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Waste Collection by Sector</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={wasteBySector} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis type="number" stroke="#6b7280" />
              <YAxis 
                dataKey="sector" 
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
                dataKey="collected" 
                fill="#22c55e"
                radius={[0, 4, 4, 0]}
                animationDuration={1500}
              />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Bottom Section - Waste Collection Details Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="bg-white rounded-xl shadow-md p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Waste Collection Details</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Region</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Collected (tons)</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Diverted (tons)</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Disposal (tons)</th>
              </tr>
            </thead>
            <tbody>
              {wasteDetails.map((item, index) => (
                <motion.tr
                  key={item.region}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="py-3 px-4 font-medium text-gray-900">{item.region}</td>
                  <td className="py-3 px-4 text-gray-700">{item.collected}</td>
                  <td className="py-3 px-4 text-gray-700">{item.diverted}</td>
                  <td className="py-3 px-4 text-gray-700">{item.disposal}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
      </div>
    </div>
  );
}
