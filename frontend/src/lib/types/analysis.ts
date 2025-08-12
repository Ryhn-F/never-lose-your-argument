/**
 * Core domain types for fallacy analysis
 */

export interface Fallacy {
  text: string;
  type: string;
  explanation: string;
}

export interface AnalysisResult {
  sentiment: string;
  language: string;
  strong: number;
  aggressiveness: number;
  contains_fallacies: boolean;
  fallacies: Fallacy[];
}

export interface AnalysisRequest {
  text: string;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  status: number;
}