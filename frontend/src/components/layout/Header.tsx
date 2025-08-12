/**
 * Header component for page titles and descriptions
 */

import React from 'react';

interface HeaderProps {
  title: string;
  description?: string;
}

export const Header: React.FC<HeaderProps> = ({ title, description }) => {
  return (
    <header className="mb-8 text-center">
      <h1 className="text-3xl font-bold tracking-tight">
        {title}
      </h1>
      {description && (
        <p className="text-lg text-neutral-600 dark:text-neutral-400">
          {description}
        </p>
      )}
    </header>
  );
};