import { removeSpaces } from "@/utils/text";

export async function getLinks() {
  const res = await fetch(process.env.NEXTAUTH_URL + "/db/redirectLinks.json");

  return (await res.json()) as RedirectLink[];
}

export async function getLinksByEmail(email: string) {
  return (await getLinks()).filter((l) => l.owner.email === email);
}

export async function getLinkByUsername(username: string) {
  return (await getLinks()).filter((l) => l.owner.username === username);
}

export async function getLinkById(id: string) {
  return (await getLinks()).find((l) => l.id === id);
}

export async function getLinkByOrigin(linkFrom: string) {
  const aliasLower = removeSpaces(linkFrom).toLowerCase();
  let found: RedirectLink | null = null;

  if (aliasLower !== "") found = (await getLinks()).find((l) => l.from === aliasLower) || null;

  return found;
}
