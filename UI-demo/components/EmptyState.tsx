'use client';

import { motion } from 'framer-motion';
import { useData } from '@/context/DataContext';
import { PlusIcon, ArrowPathIcon, ChartBarIcon, CubeIcon } from '@heroicons/react/24/outline';

export default function EmptyState() {
  const { setShowImportModal } = useData();

  return (
    <div className="relative min-h-[calc(100vh-12rem)] flex items-center justify-center">
      {/* Ghosted background wireframe */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="max-w-6xl mx-auto grid grid-cols-3 gap-6 p-8">
          <div className="h-32 bg-gray-400 rounded-xl"></div>
          <div className="h-32 bg-gray-400 rounded-xl"></div>
          <div className="h-32 bg-gray-400 rounded-xl"></div>
          <div className="col-span-2 h-64 bg-gray-400 rounded-xl"></div>
          <div className="h-64 bg-gray-400 rounded-xl"></div>
        </div>
      </div>

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 text-center max-w-2xl mx-auto px-4"
      >
        {/* Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="mx-auto w-24 h-24 mb-8 bg-gradient-to-br from-eco-green-400 to-eco-blue-500 rounded-2xl flex items-center justify-center shadow-lg"
        >
          <div className="relative">
            <ChartBarIcon className="w-10 h-10 text-white" />
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -top-1 -right-1"
            >
              <div className="w-4 h-4 bg-white rounded-full"></div>
            </motion.div>
          </div>
        </motion.div>

        {/* Welcome message */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-4xl font-bold mb-4 bg-gradient-to-r from-eco-green-600 to-eco-blue-600 bg-clip-text text-transparent"
        >
          Welcome to EcoOmni!
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-xl text-gray-600 mb-8"
        >
          Let's connect the dots. Import your first sales report to transform your scattered data into an intelligent dashboard.
        </motion.p>

        {/* Features preview */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-3 gap-4 mb-10 max-w-lg mx-auto"
        >
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-eco-green-100 rounded-lg flex items-center justify-center mb-2">
              <ChartBarIcon className="w-6 h-6 text-eco-green-600" />
            </div>
            <span className="text-sm text-gray-600">Sales Insights</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-eco-blue-100 rounded-lg flex items-center justify-center mb-2">
              <CubeIcon className="w-6 h-6 text-eco-blue-600" />
            </div>
            <span className="text-sm text-gray-600">Inventory Tracking</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-eco-green-100 rounded-lg flex items-center justify-center mb-2">
              <ArrowPathIcon className="w-6 h-6 text-eco-green-600" />
            </div>
            <span className="text-sm text-gray-600">Waste Reduction</span>
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, type: 'spring' }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowImportModal(true)}
          className="inline-flex items-center px-8 py-4 text-lg font-semibold rounded-xl text-white bg-gradient-to-r from-eco-green-600 to-eco-blue-600 hover:from-eco-green-700 hover:to-eco-blue-700 shadow-lg hover:shadow-xl transition-all"
        >
          <PlusIcon className="w-6 h-6 mr-2" />
          Import Your First Report
        </motion.button>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-6 text-sm text-gray-500"
        >
          Support for Excel, CSV, and JSON formats
        </motion.p>
      </motion.div>
    </div>
  );
}

