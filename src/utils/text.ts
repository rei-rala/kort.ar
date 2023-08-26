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
