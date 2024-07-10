import { removeSpaces } from "@/utils/text";

const exampleLinks: RedirectLink[] = [
  {
    owner: {
      name: "Ramon Irala",
      email: "ramoniralaa@gmail.com",
      username: "rei-rala",
      avatarUrl: "https://avatars.githubusercontent.com/u/1004701?v=4",
    },
    id: "1",
    hitCount: 5,
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
      email: "ramoniralaa@gmail.com",
      username: "rei-rala",
      avatarUrl: "https://avatars.githubusercontent.com/u/1004701?v=4",
    },
    id: "2",
    hitCount: 7,
    alias: "mi linkedIn",
    from: "rei_linkedin",
    to: "https://www.bing.com/search?q=asd",
    icon: "linkedin",
    color: "#FFF",
    canReturnToProfile: true,
    active: false,
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
    id: "3",
    alias: "LinkedIn",
    from: "rei_linkedin",
    to: "https://www.google.com",
    icon: "linkedin",
    color: "#0077B5",
    canReturnToProfile: false,
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    hitCount: 0,
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
  let found: RedirectLink | null = null;

  if (aliasLower !== "") found = exampleLinks.find((l) => l.from === aliasLower) || null;

  return found;
}
