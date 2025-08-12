/**
 * FallacyDescription component for displaying fallacy type information
 */

import React from 'react';

interface FallacyDescriptionProps {
  name: string;
  description: string;
}

export const FallacyDescription: React.FC<FallacyDescriptionProps> = ({
  name,
  description,
}) => {
  return (
    <div className="mb-4">
      <h3 className="font-medium text-lg text-blue-600 dark:text-blue-400 mb-1">
        {name}
      </h3>
      <p className="text-gray-700 dark:text-gray-300">{description}</p>
    </div>
  );
};