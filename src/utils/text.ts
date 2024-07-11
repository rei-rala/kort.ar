import { customAlphabet } from "nanoid";


export function removeSpaces(inputString?: string | null) {
  let str = inputString ? inputString : "";

  return str.replace(/\s/g, "");
}

export function truncateString(input: string, limit = 30) {
  let str = removeSpaces(input);
  let result: string;

  if (str.length > limit) {
    result = str.slice(0, limit - 3) + "...";
  } else {
    result = str;
  }

  return result;
}

export function removeHTTPPrefix(inputString?: string | null) {
  let str = removeSpaces(inputString);

  // Use regular expression to match either "http://" or "https://"
  const regex = /^(https?:\/\/)/i;

  // Replace the matched prefix with an empty string
  const result = str.replace(regex, "");

  return result;
}

export function generateAlphanumericalId(totalRecords: number) {
  const baseLength = 5;
  const complexityIncreaseThreshold = 100;

  const length = baseLength + Math.floor(totalRecords / complexityIncreaseThreshold);
  const characters = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const nanoid = customAlphabet(characters, length);

  return nanoid();
}
