export const linksFromProfile: ProfileLink[] = [
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
    to: "http://localhost:3000/rei_github",
    icon: "github",
    color: "#000000",
    canReturnToProfile: true,
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
    to: "http://localhost:3000/rei_linkedin",
    icon: "linkedin",
    color: "#0077B5",
    canReturnToProfile: false,
  },
];

export default linksFromProfile;
