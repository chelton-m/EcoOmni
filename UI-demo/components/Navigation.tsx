'use client';

import { useState, useEffect } from 'react';
import { useData } from '@/context/DataContext';
import { HomeIcon, ChartBarIcon, CubeIcon, TrashIcon, PlusIcon } from '@heroicons/react/24/outline';

export default function Navigation() {
  const { setShowImportModal, hasData } = useData();
  const [activeSection, setActiveSection] = useState('home');

  const navigation = [
    { name: 'Home', href: '#home', icon: HomeIcon },
    { name: 'Sales', href: '#sales-section', icon: ChartBarIcon },
    { name: 'Inventory', href: '#inventory-section', icon: CubeIcon },
    { name: 'Waste', href: '#waste-section', icon: TrashIcon },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = navigation.map(item => item.href.substring(1));
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }

      // If we're at the top, set to home
      if (window.scrollY < 100) {
        setActiveSection('home');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <button
                onClick={scrollToTop}
                className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
              >
                <img 
                  src="/logo/EcoOmni-Logo-top-removebg-preview.png" 
                  alt="EcoOmni Logo" 
                  className="h-12 w-auto"
                  onError={(e) => {
                    console.error('Logo failed to load:', e);
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </button>
            </div>

            {/* Navigation Links */}
            <div className="hidden sm:ml-8 sm:flex sm:space-x-4">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.href.substring(1);
                return (
                  <button
                    key={item.name}
                    onClick={() => scrollToSection(item.href)}
                    className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                      isActive
                        ? 'text-eco-green-700 bg-eco-green-50'
                        : 'text-gray-600 hover:text-eco-green-600 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-5 h-5 mr-2" />
                    {item.name}
                  </button>
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