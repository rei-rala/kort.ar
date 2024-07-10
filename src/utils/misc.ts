export const iAmOnServer = () => {
  return typeof window === "undefined";
};
