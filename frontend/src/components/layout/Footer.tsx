/**
 * Footer component for site footer
 */

import React from 'react';
import Link from 'next/link';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-neutral-900 border-t border-gray-200 dark:border-neutral-800 py-6 mt-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Fallacy Checker. Dibuat dengan AI.
          </p>
          <div className="flex space-x-4">
            <Link
              href="/"
              className="text-sm text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Beranda
            </Link>
            <Link
              href="/about"
              className="text-sm text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Tentang
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};