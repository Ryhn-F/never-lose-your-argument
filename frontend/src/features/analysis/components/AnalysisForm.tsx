/**
 * Analysis form component for text input and submission
 */

import React, { useState } from 'react';
import { Button, TextArea, Alert } from '@/components/ui';
import { EXAMPLE_TEXTS } from '@/lib/constants/fallacies';

interface AnalysisFormProps {
  onSubmit: (text: string) => Promise<void>;
  isLoading: boolean;
  error: string;
}

export const AnalysisForm: React.FC<AnalysisFormProps> = ({
  onSubmit,
  isLoading,
  error,
}) => {
  const [text, setText] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(text);
  };

  const handleExampleText = (exampleText: string) => {
    setText(exampleText);
  };

  return (
    <div className="bg-white dark:bg-neutral-900 rounded-xl shadow-lg p-6 mb-8">
      <form onSubmit={handleSubmit}>
        <TextArea
          label="Masukkan teks untuk dianalisis:"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Masukkan teks yang ingin dianalisis untuk kesalahan logika..."
          rows={6}
          error={error}
        />

        <div className="mb-4">
          <p className="text-sm font-medium mb-2">Contoh teks:</p>
          <div className="flex flex-wrap gap-2">
            {EXAMPLE_TEXTS.map((contoh, index) => (
              <button
                key={index}
                type="button"
                onClick={() => handleExampleText(contoh)}
                className="text-xs px-3 py-1 bg-blue-100 hover:bg-blue-200 dark:bg-blue-900/30 dark:hover:bg-blue-800/50 rounded-full text-blue-800 dark:text-blue-300 transition-colors"
              >
                Contoh {index + 1}
              </button>
            ))}
          </div>
        </div>

        {error && (
          <div className="mb-4">
            <Alert type="error">{error}</Alert>
          </div>
        )}

        <Button
          type="submit"
          size="lg"
          isLoading={isLoading}
          className="w-full"
        >
          Analisis Teks
        </Button>
      </form>
    </div>
  );
};