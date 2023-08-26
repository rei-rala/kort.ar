import { removeSpaces } from "@/utils/text";

const exampleLinks: UserLink[] = [
  {
    owner: {
      name: "Ramon Irala",
      email: "ramoniralaa@gmail.com",
      username: "rei-rala",
      avatarUrl: "https://avatars.githubusercontent.com/u/1004701?v=4",
    },
    id: "1",
    alias: "GitHub",
    from: "rei_github",
    to: "https://www.google.com.ar/search?q=testtesttesttesttest",
    icon: "github",
    color: "#000000",
    canReturnToProfile: true,
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    owner: {
      name: "Ramon Irala",
      email: "ramonirala@@@@",
      username: "rei-rala",
      avatarUrl: "https://avatars.githubusercontent.com/u/1004701?v=4",
    },
    id: "2",
    alias: "LinkedIn",
    from: "rei_linkedin",
    to: "https://www.google.com",
    icon: "linkedin",
    color: "#0077B5",
    canReturnToProfile: false,
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

Object.freeze(exampleLinks);

export async function getLinks() {
  return exampleLinks;
}

export async function getLinksByEmail(email: string) {
  return exampleLinks.filter((l) => l.owner.email === email);
}

export async function getLinkByUsername(username: string) {
  return exampleLinks.filter((l) => l.owner.username === username);
}

export async function getLinkById(id: string) {
  return exampleLinks.find((l) => l.id === id);
}

export async function getLinkByOrigin(linkFrom: string) {
  const aliasLower = removeSpaces(linkFrom).toLowerCase();
  let found: UserLink | null = null;

  if (aliasLower !== "") found = exampleLinks.find((l) => l.from === aliasLower) || null;

  return found;
}
