import { fetchData } from ".";

export async function getFeaturedLinkAndProfile() {
  const res = await fetchData("/featured");

  return res;
}
