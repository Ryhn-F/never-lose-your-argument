/**
 * Custom hook for analysis API operations
 */

import { useState } from 'react';
import { useApiService } from '@/services/api.service';
import { AnalysisRequest, AnalysisResult } from '@/lib/types/analysis';
import { validateAnalysisText, sanitizeText } from '@/lib/utils/validation';

export const useAnalysisApi = () => {
  const { post } = useApiService();
  const [isLoading, setIsLoading] = useState(false);

  const analyzeText = async (text: string) => {
    setIsLoading(true);
    
    try {
      // Validate and sanitize input
      validateAnalysisText(text);
      const sanitizedText = sanitizeText(text);

      const request: AnalysisRequest = {
        text: sanitizedText
      };

      const result = await post<AnalysisResult>('/analysis/', request);

      return result;

    } catch (error) {
      return {
        error: error instanceof Error ? error.message : 'Terjadi kesalahan validasi',
        status: 400
      };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    analyzeText,
    isLoading
  };
};