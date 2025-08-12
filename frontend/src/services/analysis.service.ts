/**
 * Analysis service for communicating with backend API
 */

import { AnalysisRequest, AnalysisResult, ApiResponse } from '@/lib/types/analysis';
import { validateAnalysisText, sanitizeText } from '@/lib/utils/validation';

export class AnalysisService {
  private readonly baseUrl: string;

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || '';
    
    if (!this.baseUrl) {
      throw new Error('NEXT_PUBLIC_BACKEND_URL environment variable is required');
    }
  }

  async analyzeText(text: string): Promise<ApiResponse<AnalysisResult>> {
    try {
      // Validate and sanitize input
      validateAnalysisText(text);
      const sanitizedText = sanitizeText(text);

      const request: AnalysisRequest = {
        text: sanitizedText
      };

      const response = await fetch(`${this.baseUrl}/analysis`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        return {
          error: `Server error: ${response.status} ${response.statusText}`,
          status: response.status
        };
      }

      const data: AnalysisResult = await response.json();
      
      return {
        data,
        status: response.status
      };

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