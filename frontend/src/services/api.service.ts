/**
 * Generic authenticated API service
 */

import { useAuth } from '@clerk/nextjs';
import { useCallback } from 'react';

export interface ApiRequestConfig extends RequestInit {
  requireAuth?: boolean;
  baseUrl?: string;
}

export interface ApiResponse<T = any> {
  data?: T;
  error?: string;
  status: number;
}

/**
 * Hook for making authenticated API requests
 */
export const useApiService = () => {
  const { getToken } = useAuth();

  const request = useCallback(async <T = any>(
    endpoint: string,
    config: ApiRequestConfig = {}
  ): Promise<ApiResponse<T>> => {
    try {
      const {
        requireAuth = true,
        baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || '',
        headers = {},
        ...restConfig
      } = config;

      if (!baseUrl) {
        return {
          error: 'Backend URL not configured',
          status: 500
        };
      }

      // Prepare headers
      const requestHeaders: Record<string, string> = {
        "Content-Type": "application/json",
        ...(headers as Record<string, string>),
      };

      // Add authentication token if required
      if (requireAuth) {
        const token = await getToken();
        if (!token) {
          return {
            error: 'Authentication required',
            status: 401
          };
        }
        requestHeaders['Authorization'] = `Bearer ${token}`;
      }

      const url = endpoint.startsWith('http') ? endpoint : `${baseUrl}${endpoint}`;
      
      const response = await fetch(url, {
        ...restConfig,
        headers: requestHeaders,
      });

      if (!response.ok) {
        return {
          error: `Server error: ${response.status} ${response.statusText}`,
          status: response.status
        };
      }

      const data = await response.json();
      
      return {
        data,
        status: response.status
      };

    } catch (error) {
      return {
        error: error instanceof Error ? error.message : 'Terjadi kesalahan yang tidak diketahui',
        status: 500
      };
    }
  }, [getToken]);

  // Convenience methods
  const get = useCallback(<T = any>(endpoint: string, config?: ApiRequestConfig) => 
    request<T>(endpoint, { ...config, method: 'GET' }), [request]);

  const post = useCallback(<T = any>(endpoint: string, data?: any, config?: ApiRequestConfig) => 
    request<T>(endpoint, { 
      ...config, 
      method: 'POST', 
      body: data ? JSON.stringify(data) : undefined 
    }), [request]);

  const put = useCallback(<T = any>(endpoint: string, data?: any, config?: ApiRequestConfig) => 
    request<T>(endpoint, { 
      ...config, 
      method: 'PUT', 
      body: data ? JSON.stringify(data) : undefined 
    }), [request]);

  const del = useCallback(<T = any>(endpoint: string, config?: ApiRequestConfig) => 
    request<T>(endpoint, { ...config, method: 'DELETE' }), [request]);

  return {
    request,
    get,
    post,
    put,
    delete: del
  };
};