/**
 * Navigation component for site navigation
 */

import React from 'react';
import Link from 'next/link';

export const Navigation: React.FC = () => {
  return (
    <nav className="bg-white dark:bg-neutral-900 border-b border-gray-200 dark:border-neutral-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link
              href="/"
              className="text-blue-600 dark:text-blue-400 font-bold text-xl"
            >
              Fallacy Checker
            </Link>
          </div>
          <div className="flex items-center">
            <Link
              href="/about"
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
            >
              Tentang
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};