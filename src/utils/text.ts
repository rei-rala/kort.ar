export function removeSpaces(inputString?: string | null) {
  return `${inputString}`.replace(/\s/g, "");
}
