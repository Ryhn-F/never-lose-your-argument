/**
 * FallacyItem component for displaying individual fallacy results
 */

import React from 'react';
import { Fallacy } from '@/lib/types/analysis';

interface FallacyItemProps extends Fallacy {
  color: string;
}

export const FallacyItem: React.FC<FallacyItemProps> = ({
  text,
  type,
  explanation,
  color,
}) => {
  return (
    <li
      className="border-l-4 pl-4 py-3 bg-white dark:bg-neutral-800 rounded-r-lg shadow-sm"
      style={{ borderColor: color }}
    >
      <p className="font-medium mb-2 text-gray-800 dark:text-gray-200">
        &ldquo;{text}&rdquo;
      </p>
      <div className="flex items-center mb-2">
        <span className="inline-block px-2 py-1 text-xs font-semibold rounded bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300">
          {type}
        </span>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400">{explanation}</p>
    </li>
  );
};