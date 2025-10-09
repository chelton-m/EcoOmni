import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { DataProvider } from '@/context/DataContext';
import Navigation from '@/components/Navigation';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'EcoOmni - Intelligent Dashboard',
  description: 'Transform scattered data into intelligent insights',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <DataProvider>
          <div className="min-h-screen bg-gray-50">
            <Navigation />
            <main>
              {children}
            </main>
          </div>
        </DataProvider>
      </body>
    </html>
  );
}

