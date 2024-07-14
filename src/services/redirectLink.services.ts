// para que quede bonito asi como esta, que se yo
/* eslint-disable prettier/prettier */
import { buildApiUrl, fetchData } from ".";

export async function getAllRedirectLinks(): Promise<ApiResponse<RedirectLink[]>> {
  return await fetchData("link/all");
}

export async function getOwnedRedirectLinks(): Promise<ApiResponse<RedirectLink[]>> {
  return await fetchData("link");
}

export async function getRedirectLinkByRedirectPage(linkFrom: string): Promise<ApiResponse<RedirectLink>> {
  return await fetchData("link/" + linkFrom);
}

export async function getRedirectLinksByUsername(username: string): Promise<ApiResponse<RedirectLink[]>> {
  return await fetchData(`link/profile/${username}`);
}

export async function createRedirectLink(link: RedirectLink): Promise<ApiResponse<RedirectLink>> {
  delete link.id;
  return await fetchData("link", { method: "POST", data: link });
}

export async function updateRedirectLink(link: RedirectLink): Promise<ApiResponse<RedirectLink>> {
  return await fetchData("link", { method: "PUT", data: link });
}

export async function deleteRedirectLink(link: RedirectLink): Promise<ApiResponse<any>> {
  return await fetchData("link", { method: "DELETE", data: link });
}
