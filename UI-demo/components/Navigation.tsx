'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useData } from '@/context/DataContext';
import { HomeIcon, ChartBarIcon, CubeIcon, TrashIcon, PlusIcon } from '@heroicons/react/24/outline';

export default function Navigation() {
  const pathname = usePathname();
  const { setShowImportModal, hasData } = useData();

  const navigation = [
    { name: 'Dashboard', href: '/', icon: HomeIcon },
    { name: 'Sales', href: '/sales', icon: ChartBarIcon },
    { name: 'Inventory', href: '/inventory', icon: CubeIcon },
    { name: 'Waste', href: '/waste', icon: TrashIcon },
  ];

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-eco-green-500 to-eco-green-600 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-eco-green-600 to-eco-blue-600 bg-clip-text text-transparent">
                  EcoOmni
                </span>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="hidden sm:ml-8 sm:flex sm:space-x-4">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                      isActive
                        ? 'text-eco-green-700 bg-eco-green-50'
                        : 'text-gray-600 hover:text-eco-green-600 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-5 h-5 mr-2" />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Import Button */}
          {hasData && (
            <div className="flex items-center">
              <button
                onClick={() => setShowImportModal(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-eco-green-600 to-eco-blue-600 hover:from-eco-green-700 hover:to-eco-blue-700 shadow-sm transition-all"
              >
                <PlusIcon className="w-5 h-5 mr-2" />
                Import New Report
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

