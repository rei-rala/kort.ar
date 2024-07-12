/* eslint-disable prettier/prettier */
import { apiUrl } from ".";

type ApiResponse<T> = { message: string, status: number, data: T | null; error?: string };

const buildUrl = (...path: string[]) => `${apiUrl}${path.join("/")}`;

async function fetchData<T>(options: { url: string; method?: string; data?: any }): Promise<ApiResponse<T>> {
  const headers = {
    "Content-Type": "application/json",
    origin: process.env.NEXTAUTH_URL || "",
  };
  const body = options.data ? JSON.stringify(options.data) : null;
  const response = await fetch(options.url, { method: options.method, headers, body });

  if (!response.ok) {
    return (
      {
        message: `Error ${response.statusText} en la petición`,
        data: null,
        error: response.statusText,
        status: response.status
      }
    );
  }

  return await response.json();
}

export async function getAllRedirectLinks(): Promise<ApiResponse<RedirectLink[]>> {
  return await fetchData({ url: buildUrl("/link/all") });
}

export async function getOwnedRedirectLinks(): Promise<ApiResponse<RedirectLink[]>> {
  return await fetchData({ url: buildUrl("/link") });
}

export async function getRedirectLinkByRedirectPage(linkFrom: string): Promise<ApiResponse<RedirectLink>> {
  return await fetchData({ url: buildUrl("/link/" + linkFrom) });
}

export async function getRedirectLinksByUsername(username: string): Promise<ApiResponse<RedirectLink[]>> {
  return await fetchData({ url: buildUrl(`/link/profile/${username}`) });
}

export async function createRedirectLink(link: RedirectLink): Promise<ApiResponse<RedirectLink>> {
  delete link.id;
  return await fetchData({ url: buildUrl("/link"), method: "POST", data: link });
}

export async function updateRedirectLink(link: RedirectLink): Promise<ApiResponse<RedirectLink>> {
  return await fetchData({ url: buildUrl("/link"), method: "PUT", data: link });
}

export async function deleteRedirectLink(link: RedirectLink): Promise<ApiResponse<any>> {
  return await fetchData({ url: buildUrl("/link"), method: "DELETE", data: link });
}
