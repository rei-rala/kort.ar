import { removeSpaces } from "@/utils/text";
const fs = require("fs");
const path = require("path");

// Path to the JSON file
const filePath = path.join(__dirname, "/db/", "data.json");

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

export async function createLink(link: RedirectLink) {
  const links = await getLinks();
  const newLinks = [...links, link];

  fs.writeFileSync(filePath, JSON.stringify(newLinks, null, 2));

  return link;
}

export async function updateLink(link: RedirectLink) {
  const links = await getLinks();
  const newLinks = links.map((l) => (l.id === link.id ? link : l));

  fs.writeFileSync(filePath, JSON.stringify(newLinks, null, 2));
}
