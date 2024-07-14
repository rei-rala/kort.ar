import { API_URL, NEXTAUTH_URL } from "@/constants";

export const buildApiUrl = (...path: string[]) => `${API_URL}/${path.join("/")}`;

type FetchResult<T> = { read: () => T };
type FetchOptions = {
  method?: string;
  data?: any;
};

type FetchDataFunction = <T>(url: string, options?: FetchOptions) => Promise<ApiResponse<T>>;

export const fetchData: FetchDataFunction = async <T>(
  url: string,
  options?: {
    method?: string;
    data?: any;
  }
) => {
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
};

function suspenseFetch<T>(promise: Promise<T>): FetchResult<T> {
  let status: "pending" | "success" | "error" = "pending";
  let result: T;
  let error: any;

  const suspender = promise.then(
    (r) => {
      status = "success";
      result = r;
    },
    (e) => {
      status = "error";
      error = e;
    }
  );

  return {
    read() {
      if (status === "pending") {
        throw suspender;
      } else if (status === "error") {
        throw error;
      } else if (status === "success") {
        return result;
      }
      throw new Error("Unexpected status");
    },
  };
}

export { suspenseFetch };
