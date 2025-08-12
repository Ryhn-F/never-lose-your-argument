"use client";

import React from 'react';
import { useAnalysis } from '@/hooks/useAnalysis';
import { Header } from '@/components/layout';
import { AnalysisForm, AnalysisResults } from '@/features/analysis/components';

export default function AnalysisPage() {
  const { result, isLoading, error, analyzeText } = useAnalysis();

  return (
    <main className="min-h-screen p-4 md:p-8 lg:p-12">
      <div className="max-w-4xl mx-auto">
        <Header
          title="Dialectica Analysis"
          description="Identify logical fallacies in text with AI-powered analysis"
        />

        <AnalysisForm
          onSubmit={analyzeText}
          isLoading={isLoading}
          error={error}
        />

        {result && <AnalysisResults result={result} />}
      </div>
    </main>
  );
}