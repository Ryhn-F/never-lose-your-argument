/**
 * Custom hook for managing analysis state and operations
 */

import { useState, useCallback } from 'react';
import { AnalysisResult } from '@/lib/types/analysis';
import { analysisService } from '@/services/analysis.service';

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
  const [state, setState] = useState<UseAnalysisState>({
    result: null,
    isLoading: false,
    error: '',
  });

  const analyzeText = useCallback(async (text: string) => {
    setState(prev => ({
      ...prev,
      isLoading: true,
      error: '',
    }));

    try {
      const response = await analysisService.analyzeText(text);
      
      if (response.error) {
        setState(prev => ({
          ...prev,
          isLoading: false,
          error: response.error!,
        }));
        return;
      }

      setState(prev => ({
        ...prev,
        isLoading: false,
        result: response.data!,
      }));

    } catch {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: 'Terjadi kesalahan saat menganalisis teks. Silakan coba lagi.',
      }));
    }
  }, []);

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
    ...state,
    analyzeText,
    clearResult,
    clearError,
  };
};