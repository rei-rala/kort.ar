import { apiUrl } from ".";

type RedirectLinkApiResponse = ApiResponse<RedirectLink>;
type RedirectLinkListApiResponse = ApiResponse<RedirectLink[]>;

export async function getRedirectLinks(): Promise<RedirectLinkApiResponse> {
  const res = await fetch(apiUrl + "/link");

  return await res.json();
}

export async function getOwnedRedirectLinks(): Promise<RedirectLinkListApiResponse> {
  const res = await fetch(apiUrl + "/my-links");

  return await res.json();
}

export async function getRedirectLinkByRedirectPage(
  linkFrom: string
): Promise<RedirectLinkApiResponse> {
  const res = await fetch(apiUrl + "/link/" + linkFrom);

  return await res.json();
}

export async function getRedirectLinksByUsername(
  username: string
): Promise<RedirectLinkListApiResponse> {
  const res = await fetch(`${apiUrl}/link/profile/${username}`);
  return await res.json();
}

export async function createRedirectLink(link: RedirectLink): Promise<RedirectLinkListApiResponse> {
  const res = await fetch(apiUrl + "/link", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(link),
  });

  return await res.json();
}
