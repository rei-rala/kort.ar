import { apiUrl } from ".";

type ApiResponse<T> = {
  message: string;
  status: number;
  success: boolean;
  data: T;
};

type RedirectLinkApiResponse = ApiResponse<RedirectLink>;
type RedirectLinkListApiResponse = ApiResponse<RedirectLink[]>;

export async function getLinks(): Promise<RedirectLinkApiResponse> {
  const res = await fetch(apiUrl + "/link");

  return await res.json();
}

export async function getUserLinks(): Promise<RedirectLinkListApiResponse> {
  const res = await fetch(apiUrl + "/my-links");

  return await res.json();
}

export async function createLink(link: RedirectLink): Promise<RedirectLinkListApiResponse> {
  const res = await fetch(apiUrl + "/link", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(link),
  });

  return await res.json();
}
