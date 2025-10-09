'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useData } from '@/context/DataContext';
import { XMarkIcon, CloudArrowUpIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { useDropzone } from 'react-dropzone';

export default function FileImportModal() {
  const { setShowImportModal, setHasData } = useData();
  const [step, setStep] = useState(1);
  const [fileName, setFileName] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // Mock column mappings for step 2
  const [columnMappings, setColumnMappings] = useState({
    date: 'Transaction Date',
    product: 'Product Name',
    quantity: 'Qty Sold',
    revenue: 'Total Revenue',
    category: 'Category',
  });

  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFileName(acceptedFiles[0].name);
      setTimeout(() => {
        setStep(2);
      }, 800);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/vnd.ms-excel': ['.xls', '.xlsx'],
      'text/csv': ['.csv'],
      'application/json': ['.json'],
    },
    maxFiles: 1,
  });

  const handleColumnMappingChange = (field: string, value: string) => {
    setColumnMappings({ ...columnMappings, [field]: value });
  };

  const handleImport = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep(3);
    }, 3000);
  };

  const handleFinish = () => {
    setHasData(true);
    setShowImportModal(false);
    setStep(1);
  };

  const handleClose = () => {
    setShowImportModal(false);
    setStep(1);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
          onClick={handleClose}
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8 z-10"
        >
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>

          {/* Step indicator */}
          <div className="flex items-center justify-center mb-8">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                    step >= s
                      ? 'bg-gradient-to-br from-eco-green-500 to-eco-blue-500 text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {s}
                </div>
                {s < 3 && (
                  <div
                    className={`w-16 h-1 mx-2 transition-all ${
                      step > s ? 'bg-eco-green-500' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {step === 1 && <Step1 getRootProps={getRootProps} getInputProps={getInputProps} isDragActive={isDragActive} />}
            {step === 2 && (
              <Step2
                fileName={fileName}
                columnMappings={columnMappings}
                handleColumnMappingChange={handleColumnMappingChange}
                handleImport={handleImport}
                isProcessing={isProcessing}
              />
            )}
            {step === 3 && <Step3 handleFinish={handleFinish} />}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}

function Step1({ getRootProps, getInputProps, isDragActive }: any) {
  return (
    <motion.div
      key="step1"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
    >
      <h2 className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-eco-green-600 to-eco-blue-600 bg-clip-text text-transparent">
        Start by Connecting Your Data
      </h2>
      <p className="text-center text-gray-600 mb-8">
        Upload your sales, inventory, or waste report to begin
      </p>

      <div
        {...getRootProps()}
        className={`border-3 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all ${
          isDragActive
            ? 'border-eco-green-500 bg-eco-green-50'
            : 'border-gray-300 hover:border-eco-green-400 hover:bg-gray-50'
        }`}
      >
        <input {...getInputProps()} />
        <motion.div
          animate={{ y: isDragActive ? -10 : 0 }}
          className="flex flex-col items-center"
        >
          <CloudArrowUpIcon className="w-16 h-16 text-eco-green-500 mb-4" />
          <p className="text-lg font-semibold text-gray-700 mb-2">
            {isDragActive ? 'Drop your file here' : 'Drag & drop your file here'}
          </p>
          <p className="text-sm text-gray-500 mb-4">or click to browse</p>
          <div className="flex space-x-2 text-xs text-gray-400">
            <span className="px-2 py-1 bg-gray-100 rounded">Excel</span>
            <span className="px-2 py-1 bg-gray-100 rounded">CSV</span>
            <span className="px-2 py-1 bg-gray-100 rounded">JSON</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

function Step2({ fileName, columnMappings, handleColumnMappingChange, handleImport, isProcessing }: any) {
  const availableColumns = [
    'Transaction Date',
    'Product Name',
    'Qty Sold',
    'Total Revenue',
    'Category',
    'Product ID',
    'Unit Price',
    'Customer Name',
  ];

  const fields = [
    { key: 'date', label: 'Date', description: 'Transaction or record date' },
    { key: 'product', label: 'Product', description: 'Product or item name' },
    { key: 'quantity', label: 'Quantity', description: 'Units sold or used' },
    { key: 'revenue', label: 'Revenue', description: 'Total sales amount' },
    { key: 'category', label: 'Category', description: 'Product category' },
  ];

  return (
    <motion.div
      key="step2"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
    >
      <h2 className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-eco-green-600 to-eco-blue-600 bg-clip-text text-transparent">
        Our AI is Connecting the Dots...
      </h2>
      <p className="text-center text-gray-600 mb-6">
        Review the auto-detected column mappings for <span className="font-semibold">{fileName}</span>
      </p>

      {isProcessing ? (
        <div className="py-16 flex flex-col items-center">
          <ConnectingDotsAnimation />
          <p className="mt-6 text-lg font-medium text-gray-700">Processing your data...</p>
          <p className="text-sm text-gray-500 mt-2">Analyzing patterns and connections</p>
        </div>
      ) : (
        <>
          <div className="space-y-4 mb-8 max-h-96 overflow-y-auto">
            {fields.map((field, index) => (
              <motion.div
                key={field.key}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-r from-eco-green-50 to-eco-blue-50 p-4 rounded-lg"
              >
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  {field.label}
                </label>
                <p className="text-xs text-gray-500 mb-2">{field.description}</p>
                <motion.select
                  initial={{ backgroundColor: '#fef3c7' }}
                  animate={{ backgroundColor: '#ffffff' }}
                  transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
                  value={columnMappings[field.key]}
                  onChange={(e) => handleColumnMappingChange(field.key, e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-eco-green-500 focus:border-transparent"
                >
                  {availableColumns.map((col) => (
                    <option key={col} value={col}>
                      {col}
                    </option>
                  ))}
                </motion.select>
              </motion.div>
            ))}
          </div>

          <button
            onClick={handleImport}
            className="w-full py-3 bg-gradient-to-r from-eco-green-600 to-eco-blue-600 text-white font-semibold rounded-lg hover:from-eco-green-700 hover:to-eco-blue-700 transition-all shadow-lg hover:shadow-xl"
          >
            Import Data
          </button>
        </>
      )}
    </motion.div>
  );
}

function Step3({ handleFinish }: any) {
  return (
    <motion.div
      key="step3"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="text-center py-8"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
        className="inline-block mb-6"
      >
        <CheckCircleIcon className="w-24 h-24 text-eco-green-500" />
      </motion.div>

      <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-eco-green-600 to-eco-blue-600 bg-clip-text text-transparent">
        Success! Your Intelligent Dashboard is Ready
      </h2>
      <p className="text-gray-600 mb-8">
        We&apos;ve analyzed your data and connected the dots between sales, waste, and inventory.
      </p>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleFinish}
        className="px-8 py-3 bg-gradient-to-r from-eco-green-600 to-eco-blue-600 text-white font-semibold rounded-lg hover:from-eco-green-700 hover:to-eco-blue-700 transition-all shadow-lg hover:shadow-xl"
      >
        View Dashboard
      </motion.button>
    </motion.div>
  );
}

function ConnectingDotsAnimation() {
  return (
    <div className="relative w-48 h-24">
      <svg className="w-full h-full" viewBox="0 0 200 100">
        {/* Dots */}
        <motion.circle
          cx="30"
          cy="50"
          r="8"
          fill="#16a34a"
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.2, 1] }}
          transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 1.5 }}
        />
        <motion.circle
          cx="100"
          cy="50"
          r="8"
          fill="#3b82f6"
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.2, 1] }}
          transition={{ duration: 0.5, delay: 0.3, repeat: Infinity, repeatDelay: 1.5 }}
        />
        <motion.circle
          cx="170"
          cy="50"
          r="8"
          fill="#22c55e"
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.2, 1] }}
          transition={{ duration: 0.5, delay: 0.6, repeat: Infinity, repeatDelay: 1.5 }}
        />

        {/* Connecting lines */}
        <motion.line
          x1="38"
          y1="50"
          x2="92"
          y2="50"
          stroke="#16a34a"
          strokeWidth="3"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5, repeat: Infinity, repeatDelay: 1.5 }}
        />
        <motion.line
          x1="108"
          y1="50"
          x2="162"
          y2="50"
          stroke="#3b82f6"
          strokeWidth="3"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8, repeat: Infinity, repeatDelay: 1.5 }}
        />
      </svg>
    </div>
  );
}
