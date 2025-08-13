/**
 * Authenticated API utility for making requests with Clerk tokens
 */

import { useAuth } from "@clerk/nextjs";

export interface ApiRequestOptions extends RequestInit {
  requireAuth?: boolean;
}

export interface ApiResponse<T = any> {
  data?: T;
  error?: string;
  status: number;
}

/**
 * Hook for making authenticated API requests
 */
export const useAuthenticatedApi = () => {
  const { getToken } = useAuth();

  const makeRequest = async <T = any>(
    url: string,
    options: ApiRequestOptions = {}
  ): Promise<ApiResponse<T>> => {
    try {
      const { requireAuth = true, headers = {}, ...restOptions } = options;

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
            error: "Authentication token not available",
            status: 401,
          };
        }
        requestHeaders["Authorization"] = `Bearer ${token}`;
      }

      const response = await fetch(url, {
        ...restOptions,
        headers: requestHeaders,
      });

      if (!response.ok) {
        return {
          error: `Server error: ${response.status} ${response.statusText}`,
          status: response.status,
        };
      }

      const data = await response.json();

      return {
        data,
        status: response.status,
      };
    } catch (error) {
      if (error instanceof Error) {
        return {
          error: error.message,
          status: 500,
        };
      }

      return {
        error: "Terjadi kesalahan yang tidak diketahui",
        status: 500,
      };
    }
  };

  return { makeRequest };
};

/**
 * Server-side authenticated API utility
 */
export class AuthenticatedApiClient {
  private readonly baseUrl: string;

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "";

    if (!this.baseUrl) {
      throw new Error(
        "NEXT_PUBLIC_BACKEND_URL environment variable is required"
      );
    }
  }

  async makeRequest<T = any>(
    endpoint: string,
    token: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const { headers = {}, ...restOptions } = options;

      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        ...restOptions,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          ...headers,
        },
      });

      if (!response.ok) {
        return {
          error: `Server error: ${response.status} ${response.statusText}`,
          status: response.status,
        };
      }

      const data = await response.json();

      return {
        data,
        status: response.status,
      };
    } catch (error) {
      if (error instanceof Error) {
        return {
          error: error.message,
          status: 500,
        };
      }

      return {
        error: "Terjadi kesalahan yang tidak diketahui",
        status: 500,
      };
    }
  }
}

export const apiClient = new AuthenticatedApiClient();
