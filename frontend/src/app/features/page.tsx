"use client";

import React from "react";
import { useAnalysis } from "@/hooks/useAnalysis";
import { Header } from "@/components/layout";
import { AnalysisForm, AnalysisResults } from "@/features/analysis/components";

export default function Home() {
  const { result, isLoading, error, analyzeText } = useAnalysis();

  return (
    <main className="min-h-screen p-4 md:p-8 lg:p-12">
      <div className="max-w-4xl mx-auto">
        <Header
          title="Penganalisis Kesalahan Logika"
          description="Identifikasi logical fallacies dalam teks dengan bantuan AI"
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
