/**
 * Custom hook for managing analysis state and operations
 */

import { useState, useCallback } from 'react';
import { AnalysisResult } from '@/lib/types/analysis';
import { useAnalysisApi } from './useAnalysisApi';

interface UseAnalysisState {
  result: AnalysisResult | null;
  isLoading: boolean;
  error: string;
}

interface UseAnalysisActions {
  analyzeText: (text: string) => Promise<void>;
  clearResult: () => void;
  clearError: () => void;
}

export const useAnalysis = (): UseAnalysisState & UseAnalysisActions => {
  const { analyzeText: apiAnalyzeText, isLoading: apiLoading } = useAnalysisApi();
  const [state, setState] = useState<{
    result: AnalysisResult | null;
    error: string;
  }>({
    result: null,
    error: '',
  });

  const analyzeText = useCallback(async (text: string) => {
    setState(prev => ({
      ...prev,
      error: '',
    }));

    try {
      const response = await apiAnalyzeText(text);
      
      if (response.error) {
        setState(prev => ({
          ...prev,
          error: response.error!,
        }));
        return;
      }

      setState(prev => ({
        ...prev,
        result: response.data!,
      }));

    } catch {
      setState(prev => ({
        ...prev,
        error: 'Terjadi kesalahan saat menganalisis teks. Silakan coba lagi.',
      }));
    }
  }, [apiAnalyzeText]);

  const clearResult = useCallback(() => {
    setState(prev => ({
      ...prev,
      result: null,
    }));
  }, []);

  const clearError = useCallback(() => {
    setState(prev => ({
      ...prev,
      error: '',
    }));
  }, []);

  return {
    result: state.result,
    isLoading: apiLoading,
    error: state.error,
    analyzeText,
    clearResult,
    clearError,
  };
};