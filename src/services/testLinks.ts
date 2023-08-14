import { removeSpaces } from "@/utils/text";

const linksFromProfile: ProfileLink[] = [
  {
    owner: {
      name: "Ramon Irala",
      email: "ramonirala@@@@@",
      username: "rei-rala",
      avatarUrl: "https://avatars.githubusercontent.com/u/1004701?v=4",
    },
    id: "github",
    alias: "GitHub",
    from: "rei_github",
    to: "https://www.google.com.ar",
    icon: "github",
    color: "#000000",
    canReturnToProfile: true,
    timerRedirect: true,
  },
  {
    owner: {
      name: "Ramon Irala",
      email: "ramonirala@@@@",
      username: "rei-rala",
      avatarUrl: "https://avatars.githubusercontent.com/u/1004701?v=4",
    },
    id: "linkedin",
    alias: "LinkedIn",
    from: "rei_linkedin",
    to: "https://www.google.com",
    icon: "linkedin",
    color: "#0077B5",
    canReturnToProfile: false,
    timerRedirect: false,
  },
];

Object.freeze(linksFromProfile);

export async function getLinks() {
  return linksFromProfile;
}

export async function getLinkByUsername(username: string) {
  return linksFromProfile.filter((l) => l.owner.username === username);
}

export async function getLinkByAlias(linkAlias: string) {
  const aliasLower = removeSpaces(linkAlias).toLowerCase();
  let found: ProfileLink | null = null;

  if (aliasLower !== "") found = linksFromProfile.find((l) => l.from === aliasLower) || null;

  return found;
}
