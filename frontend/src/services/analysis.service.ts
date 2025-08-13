/**
 * Analysis service for communicating with backend API
 */

import { AnalysisRequest, AnalysisResult, ApiResponse } from '@/lib/types/analysis';
import { validateAnalysisText, sanitizeText } from '@/lib/utils/validation';
import { apiClient } from '@/lib/utils/api';

export class AnalysisService {
  async analyzeText(text: string, token: string): Promise<ApiResponse<AnalysisResult>> {
    try {
      // Validate and sanitize input
      validateAnalysisText(text);
      const sanitizedText = sanitizeText(text);

      const request: AnalysisRequest = {
        text: sanitizedText
      };

      const result = await apiClient.makeRequest<AnalysisResult>(
        '/analysis/',
        token,
        {
          method: 'POST',
          body: JSON.stringify(request),
        }
      );

      return result;

    } catch (error) {
      if (error instanceof Error) {
        return {
          error: error.message,
          status: 400
        };
      }
      
      return {
        error: 'Terjadi kesalahan yang tidak diketahui',
        status: 500
      };
    }
  }
}

// Singleton instance
export const analysisService = new AnalysisService();