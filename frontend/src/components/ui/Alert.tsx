/**
 * Reusable Alert component
 */

import React from 'react';

interface AlertProps {
  type: 'success' | 'error' | 'warning' | 'info';
  children: React.ReactNode;
  className?: string;
}

export const Alert: React.FC<AlertProps> = ({
  type,
  children,
  className = '',
}) => {
  const baseClasses = 'p-4 rounded-lg flex items-center';
  
  const typeClasses = {
    success: 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300',
    error: 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300',
    warning: 'bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300',
    info: 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300',
  };

  const icons = {
    success: (
      <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
      </svg>
    ),
    error: (
      <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    ),
    warning: (
      <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
      </svg>
    ),
    info: (
      <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  };

  const classes = `${baseClasses} ${typeClasses[type]} ${className}`;

  return (
    <div className={classes}>
      {icons[type]}
      <div>{children}</div>
    </div>
  );
};