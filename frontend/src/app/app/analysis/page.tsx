"use client";

import React from 'react';
import { useAnalysis } from '@/hooks/useAnalysis';
import { Header } from '@/components/layout';
import { AnalysisForm, AnalysisResults } from '@/features/analysis/components';
import { FallacyDescription } from '@/features/fallacy-info/components';
import { FALLACY_TYPES } from '@/lib/constants/fallacies';

export default function AnalysisPage() {
  const { result, isLoading, error, analyzeText } = useAnalysis();

  return (
    <div className="flex-1 space-y-4">
      <Header
        title="Analysis Tool"
        description="Identify logical fallacies in text with AI-powered analysis"
      />

      <AnalysisForm
        onSubmit={analyzeText}
        isLoading={isLoading}
        error={error}
      />

      {result && <AnalysisResults result={result} />}

      <div className="max-w-4xl">

        <div className="bg-white dark:bg-neutral-900 rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">
            Apa itu Logical Fallacy?
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Logical fallacy atau kesalahan logika adalah argumen yang tampak masuk akal 
            tetapi sebenarnya mengandung cacat dalam penalaran. Aplikasi ini menggunakan 
            AI untuk mengidentifikasi berbagai jenis kesalahan logika dalam teks yang Anda masukkan.
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            Dengan memahami dan mengenali kesalahan logika, kita dapat berpikir lebih kritis 
            dan membuat argumen yang lebih kuat dalam diskusi dan debat.
          </p>
        </div>

        <div className="bg-white dark:bg-neutral-900 rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-6 text-blue-600 dark:text-blue-400">
            Jenis-jenis Logical Fallacy
          </h2>
          <div className="space-y-6">
            {FALLACY_TYPES.map((fallacy, index) => (
              <FallacyDescription
                key={index}
                name={fallacy.name}
                description={fallacy.description}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}