/**
 * Reusable TextArea component
 */

import React from 'react';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const TextArea: React.FC<TextAreaProps> = ({
  label,
  error,
  className = '',
  id,
  ...props
}) => {
  const textareaId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`;
  
  const baseClasses = 'w-full p-3 border rounded-lg dark:bg-neutral-800 dark:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors';
  const errorClasses = error ? 'border-red-500 focus:ring-red-500' : '';
  const classes = `${baseClasses} ${errorClasses} ${className}`;

  return (
    <div className="mb-4">
      {label && (
        <label
          htmlFor={textareaId}
          className="block text-sm font-medium mb-2"
        >
          {label}
        </label>
      )}
      <textarea
        id={textareaId}
        className={classes}
        {...props}
      />
      {error && (
        <p className="text-red-500 text-sm mt-1">{error}</p>
      )}
    </div>
  );
};