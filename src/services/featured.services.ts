import { fetchData } from ".";

export async function getFeaturedLinkAndProfile() {
  const res = await fetchData<Featured>("featured");

  return res;
}
