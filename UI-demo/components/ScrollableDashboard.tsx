'use client';

import { motion } from 'framer-motion';
import { useData } from '@/context/DataContext';
import ConnectedInsight from './ConnectedInsight';
import SalesSection from './sections/SalesSection';
import InventorySection from './sections/InventorySection';
import WasteSection from './sections/WasteSection';
import { connectedInsights } from '@/utils/mockData';
import { PlusIcon, ChartBarIcon, CubeIcon, TrashIcon, ArrowDownIcon } from '@heroicons/react/24/outline';

export default function ScrollableDashboard() {
  const { setShowImportModal } = useData();

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Demo Header Section */}
      <motion.section
        id="home"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-gradient-to-br from-eco-green-50 via-white to-eco-blue-50 py-16"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-8"
            >
              <h1 className="text-4xl font-bold bg-gradient-to-r from-eco-green-600 to-eco-blue-600 bg-clip-text text-transparent mb-4">
                Live Demo Dashboard
              </h1>
              <p className="text-xl text-gray-600">
                See EcoOmni in action with sample data from a real café
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Dashboard Navigation Menu */}
      <motion.section
        id="dashboard-sections"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-16 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-eco-green-600 to-eco-blue-600 bg-clip-text text-transparent mb-4">
              Dashboard Sections
            </h2>
            <p className="text-xl text-gray-600">Explore our comprehensive data analytics modules</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Sales Pipeline Card */}
            <motion.div
              whileHover={{ y: -8, shadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}
              className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 cursor-pointer"
              onClick={() => scrollToSection('sales')}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-eco-green-500 to-eco-green-600 rounded-xl flex items-center justify-center mb-6">
                <ChartBarIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Sales Pipeline</h3>
              <p className="text-gray-600 mb-6">
                Track product performance, COGS analysis, and revenue trends with detailed charts and insights.
              </p>
              <div className="space-y-3">
                <div className="flex items-center text-sm text-gray-500">
                  <div className="w-2 h-2 bg-eco-green-500 rounded-full mr-3"></div>
                  COGS Per Product Analysis
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <div className="w-2 h-2 bg-eco-green-500 rounded-full mr-3"></div>
                  Sales Distribution Charts
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <div className="w-2 h-2 bg-eco-green-500 rounded-full mr-3"></div>
                  Revenue Trend Analysis
                </div>
              </div>
              <div className="mt-6 text-eco-green-600 font-semibold">
                View Section →
              </div>
            </motion.div>

            {/* Inventory Pipeline Card */}
            <motion.div
              whileHover={{ y: -8, shadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}
              className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 cursor-pointer"
              onClick={() => scrollToSection('inventory')}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-eco-blue-500 to-eco-blue-600 rounded-xl flex items-center justify-center mb-6">
                <CubeIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Inventory Pipeline</h3>
              <p className="text-gray-600 mb-6">
                Monitor stock levels, track inventory costs, and optimize supply chain management.
              </p>
              <div className="space-y-3">
                <div className="flex items-center text-sm text-gray-500">
                  <div className="w-2 h-2 bg-eco-blue-500 rounded-full mr-3"></div>
                  Inventory Levels by Product
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <div className="w-2 h-2 bg-eco-blue-500 rounded-full mr-3"></div>
                  Stockout Rate Monitoring
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <div className="w-2 h-2 bg-eco-blue-500 rounded-full mr-3"></div>
                  Lead Time Analysis
                </div>
              </div>
              <div className="mt-6 text-eco-blue-600 font-semibold">
                View Section →
              </div>
            </motion.div>

            {/* Waste Management Card */}
            <motion.div
              whileHover={{ y: -8, shadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}
              className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 cursor-pointer"
              onClick={() => scrollToSection('waste')}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-eco-green-500 to-eco-blue-500 rounded-xl flex items-center justify-center mb-6">
                <TrashIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Waste Management</h3>
              <p className="text-gray-600 mb-6">
                Track waste reduction, optimize disposal methods, and identify cost-saving opportunities.
              </p>
              <div className="space-y-3">
                <div className="flex items-center text-sm text-gray-500">
                  <div className="w-2 h-2 bg-eco-green-500 rounded-full mr-3"></div>
                  Waste Collection Tracking
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <div className="w-2 h-2 bg-eco-green-500 rounded-full mr-3"></div>
                  Diversion Rate Analysis
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <div className="w-2 h-2 bg-eco-green-500 rounded-full mr-3"></div>
                  Regional Waste Patterns
                </div>
              </div>
              <div className="mt-6 text-eco-green-600 font-semibold">
                View Section →
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Connected Insight Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="py-12 bg-gray-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ConnectedInsight
            title={connectedInsights[0].title}
            message={connectedInsights[0].message}
            icon="lightbulb"
          />
        </div>
      </motion.section>

      {/* Sales Section */}
      <motion.section
        id="sales"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="w-full"
      >
        <SalesSection />
      </motion.section>

      {/* Inventory Section */}
      <motion.section
        id="inventory"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-16 bg-gray-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-eco-green-600 to-eco-blue-600 bg-clip-text text-transparent mb-4">
              Inventory Pipeline
            </h2>
            <p className="text-xl text-gray-600">Monitor stock levels and optimize inventory management</p>
          </div>
          <InventorySection />
        </div>
      </motion.section>

      {/* Waste Management Section */}
      <motion.section
        id="waste"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-16 bg-white"
      >
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-eco-green-600 to-eco-blue-600 bg-clip-text text-transparent mb-4">
              Waste Management Pipeline
            </h2>
            <p className="text-xl text-gray-600">Track waste reduction and identify optimization opportunities</p>
          </div>
          <WasteSection />
        </div>
      </motion.section>

      {/* Final Connected Insight */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="py-12 bg-gray-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ConnectedInsight
            title={connectedInsights[1].title}
            message={connectedInsights[1].message}
            icon="chart"
          />
        </div>
      </motion.section>

      {/* Call to Action Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-20 bg-gradient-to-br from-eco-green-600 to-eco-blue-600"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-4xl font-bold text-white mb-6"
          >
            Ready to Transform Your Data?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-xl text-green-100 mb-8"
          >
            Join hundreds of café managers who have already connected their data dots with EcoOmni.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button
              onClick={() => setShowImportModal(true)}
              className="inline-flex items-center px-8 py-4 text-lg font-semibold rounded-xl text-eco-green-600 bg-white hover:bg-gray-50 shadow-lg hover:shadow-xl transition-all"
            >
              <PlusIcon className="w-6 h-6 mr-2" />
              Start Your Free Trial
            </button>
            <button
              onClick={() => scrollToSection('home')}
              className="inline-flex items-center px-8 py-4 text-lg font-semibold rounded-xl text-white border-2 border-white hover:bg-white hover:text-eco-green-600 transition-all"
            >
              Learn More
            </button>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}
