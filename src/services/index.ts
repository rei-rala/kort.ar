import { API_URL, NEXTAUTH_URL } from "@/constants";

export const buildApiUrl = (...path: string[]) => `${API_URL}/${path.join("/")}`;

export async function fetchData<T>(
  url: string,
  options?: {
    method?: string;
    data?: any;
  }
): Promise<ApiResponse<T>> {
  const headers = {
    "Content-Type": "application/json",
    origin: NEXTAUTH_URL,
  };
  const body = options?.data ? JSON.stringify(options.data) : null;
  const response = await fetch(buildApiUrl(url), {
    method: options?.method || "GET",
    headers,
    body,
  });

  if (!response.ok) {
    try {
      const error = await response.json();
      return {
        message: error.message,
        data: null,
        error: error.message,
        status: response.status,
        success: false,
      };
    } catch (error) {
      return {
        message: response.statusText,
        data: null,
        error: response.statusText,
        status: response.status,
        success: false,
      };
    }
  }

  return await response.json();
}
