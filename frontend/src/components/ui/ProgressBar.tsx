/**
 * Reusable ProgressBar component
 */

import React from 'react';

interface ProgressBarProps {
  value: number;
  max?: number;
  color?: 'green' | 'red' | 'blue' | 'yellow';
  label?: string;
  showValue?: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 10,
  color = 'blue',
  label,
  showValue = true,
}) => {
  const percentage = Math.min((value / max) * 100, 100);
  
  const colorClasses = {
    green: 'bg-green-600',
    red: 'bg-red-600',
    blue: 'bg-blue-600',
    yellow: 'bg-yellow-600',
  };

  return (
    <div>
      {label && (
        <h3 className="font-medium mb-1">{label}</h3>
      )}
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-2">
        <div
          className={`${colorClasses[color]} h-2.5 rounded-full transition-all duration-300`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showValue && (
        <p className="font-semibold">{value}/{max}</p>
      )}
    </div>
  );
};