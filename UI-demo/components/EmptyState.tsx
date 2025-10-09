'use client';

import { motion } from 'framer-motion';
import { useData } from '@/context/DataContext';
import { PlusIcon, ArrowPathIcon, ChartBarIcon, CubeIcon, TrashIcon, ArrowDownIcon } from '@heroicons/react/24/outline';

export default function EmptyState() {
  const { setShowImportModal } = useData();

  const scrollToDemo = () => {
    const element = document.getElementById('demo-dashboard');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-eco-green-50 via-white to-eco-blue-50">
        {/* Soft EcoOmni Logo Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="w-full h-full relative">
            {/* Large background logos */}
            <img 
              src="/logo/EcoOmni-Logo-top-removebg-preview.png" 
              alt="" 
              className="absolute top-20 left-20 h-64 w-auto opacity-20"
            />
            <img 
              src="/logo/EcoOmni-Logo-top-removebg-preview.png" 
              alt="" 
              className="absolute top-40 right-32 h-48 w-auto opacity-15"
            />
            <img 
              src="/logo/EcoOmni-Logo-top-removebg-preview.png" 
              alt="" 
              className="absolute bottom-32 left-32 h-56 w-auto opacity-18"
            />
            <img 
              src="/logo/EcoOmni-Logo-top-removebg-preview.png" 
              alt="" 
              className="absolute bottom-20 right-20 h-40 w-auto opacity-12"
            />
            <img 
              src="/logo/EcoOmni-Logo-top-removebg-preview.png" 
              alt="" 
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-96 w-auto opacity-8"
            />
          </div>
        </div>

        {/* Floating balloons with clear logos */}
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, 0],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-10 w-32 h-32 bg-eco-green-200 rounded-full opacity-40 flex items-center justify-center shadow-lg"
        >
          <img 
            src="/logo/EcoOmni-Logo-top-removebg-preview.png" 
            alt="" 
            className="h-16 w-auto opacity-100"
          />
        </motion.div>
        <motion.div
          animate={{
            y: [0, 15, 0],
            rotate: [0, -5, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-40 right-20 w-28 h-28 bg-eco-blue-200 rounded-full opacity-40 flex items-center justify-center shadow-lg"
        >
          <img 
            src="/logo/EcoOmni-Logo-top-removebg-preview.png" 
            alt="" 
            className="h-12 w-auto opacity-100"
          />
        </motion.div>
        <motion.div
          animate={{
            y: [0, -10, 0],
            x: [0, 10, 0],
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-40 left-20 w-36 h-36 bg-eco-green-300 rounded-full opacity-35 flex items-center justify-center shadow-lg"
        >
          <img 
            src="/logo/EcoOmni-Logo-top-removebg-preview.png" 
            alt="" 
            className="h-12 w-auto opacity-100"
          />
        </motion.div>
        <motion.div
          animate={{
            y: [0, 20, 0],
            rotate: [0, 10, 0],
          }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-20 right-10 w-24 h-24 bg-eco-blue-300 rounded-full opacity-35 flex items-center justify-center shadow-lg"
        >
          <img 
            src="/logo/EcoOmni-Logo-top-removebg-preview.png" 
            alt="" 
            className="h-12 w-auto opacity-100"
          />
        </motion.div>

        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.015]">
          <div className="w-full h-full" style={{
            backgroundImage: `
              linear-gradient(rgba(34, 197, 94, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(34, 197, 94, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }} />
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Hero Section */}
        <div className="flex-1 flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            {/* Logo */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="mx-auto mb-8 flex items-center justify-center"
            >
              <div className="relative">
                {/* <img 
                  src="/logo/EcoOmni-Logo-top-removebg-preview.png" 
                  alt="EcoOmni Logo" 
                  className="h-20 w-auto"
                /> */}
                <motion.div
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.6, 1, 0.6],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -top-2 -right-2"
                >
                  <div className="w-6 h-6 bg-eco-green-500 rounded-full shadow-lg"></div>
                </motion.div>
              </div>
            </motion.div>

            {/* Welcome message */}
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-eco-green-600 via-eco-blue-600 to-eco-green-600 bg-clip-text text-transparent"
            >
              Welcome to EcoOmni
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed"
            >
              Transform scattered sales, waste, and inventory data into a single intelligent dashboard. 
              <span className="text-eco-green-600 font-semibold"> Connect the dots</span> between what&apos;s sold, what&apos;s wasted, and what&apos;s stocked.
            </motion.p>

            {/* Feature highlights */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 max-w-4xl mx-auto"
            >
              <div className="flex flex-col items-center p-6 bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20">
                <div className="w-16 h-16 bg-gradient-to-br from-eco-green-400 to-eco-green-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                  <ChartBarIcon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Sales Insights</h3>
                <p className="text-gray-600 text-center">Track performance and revenue trends with intelligent analytics</p>
              </div>
              <div className="flex flex-col items-center p-6 bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20">
                <div className="w-16 h-16 bg-gradient-to-br from-eco-blue-400 to-eco-blue-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                  <CubeIcon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Inventory Tracking</h3>
                <p className="text-gray-600 text-center">Monitor stock levels and optimize supply chain management</p>
              </div>
              <div className="flex flex-col items-center p-6 bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20">
                <div className="w-16 h-16 bg-gradient-to-br from-eco-green-400 to-eco-blue-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                  <TrashIcon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Waste Reduction</h3>
                <p className="text-gray-600 text-center">Identify opportunities to reduce waste and cut costs</p>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-6 justify-center mb-8"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowImportModal(true)}
                className="inline-flex items-center px-10 py-5 text-xl font-semibold rounded-2xl text-white bg-gradient-to-r from-eco-green-600 to-eco-blue-600 hover:from-eco-green-700 hover:to-eco-blue-700 shadow-2xl hover:shadow-3xl transition-all"
              >
                <PlusIcon className="w-7 h-7 mr-3" />
                Import Your First Report
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={scrollToDemo}
                className="inline-flex items-center px-10 py-5 text-xl font-semibold rounded-2xl text-eco-green-600 bg-white/90 backdrop-blur-sm border-2 border-eco-green-600 hover:bg-eco-green-50 shadow-lg hover:shadow-xl transition-all"
              >
                See Demo Dashboard
                <ArrowDownIcon className="w-6 h-6 ml-3" />
              </motion.button>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-lg text-gray-500"
            >
              Support for Excel, CSV, and JSON formats • No credit card required
            </motion.p>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center text-gray-400 cursor-pointer"
            onClick={scrollToDemo}
          >
            <span className="text-sm mb-2">Scroll to see demo</span>
            <ArrowDownIcon className="w-6 h-6" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

