/**
 * Analysis results component for displaying analysis output
 */

import React from 'react';
import { AnalysisResult } from '@/lib/types/analysis';
import { ProgressBar, Alert } from '@/components/ui';
import { FallacyItem } from './FallacyItem';
import { getFallacyColor } from '@/lib/utils/colors';

interface AnalysisResultsProps {
  result: AnalysisResult;
}

export const AnalysisResults: React.FC<AnalysisResultsProps> = ({ result }) => {
  return (
    <div className="bg-white dark:bg-neutral-900 rounded-xl shadow-lg p-6 animate-fadeIn">
      <h2 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">
        Hasil Analisis
      </h2>

      {/* Analysis Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <h3 className="font-medium mb-1">Sentimen</h3>
          <p className="font-semibold">{result.sentiment}</p>
        </div>
        
        <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
          <h3 className="font-medium mb-1">Bahasa</h3>
          <p className="font-semibold">{result.language}</p>
        </div>
        
        <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <ProgressBar
            value={result.strong}
            max={10}
            color="green"
            label="Tingkat Kekuatan"
          />
        </div>
        
        <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
          <ProgressBar
            value={result.aggressiveness}
            max={10}
            color="red"
            label="Tingkat Agresivitas"
          />
        </div>
      </div>

      {/* Fallacy Analysis */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3 text-blue-600 dark:text-blue-400">
          Analisis Kesalahan Logika
        </h3>

        {result.contains_fallacies ? (
          <div>
            <Alert type="warning" className="mb-4">
              <p className="font-medium">
                Ditemukan {result.fallacies.length} kesalahan logika dalam teks.
              </p>
            </Alert>
            
            <ul className="space-y-4">
              {result.fallacies.map((fallacy, index) => (
                <FallacyItem
                  key={index}
                  text={fallacy.text}
                  type={fallacy.type}
                  explanation={fallacy.explanation}
                  color={getFallacyColor(index)}
                />
              ))}
            </ul>
          </div>
        ) : (
          <Alert type="success">
            <p className="font-medium">
              Tidak ditemukan kesalahan logika dalam teks ini.
            </p>
          </Alert>
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-6">
        <p className="text-sm text-gray-500 text-center">
          Analisis telah selesai. Anda dapat menganalisis teks lain atau
          memodifikasi teks yang ada.
        </p>
      </div>
    </div>
  );
};