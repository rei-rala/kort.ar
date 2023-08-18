export function removeSpaces(inputString?: string | null) {
  let str = inputString ? inputString : "";

  return str.replace(/\s/g, "");
}

export function removeHTTPPrefix(inputString?: string | null) {
  let str = inputString ? inputString : "";

  // Use regular expression to match either "http://" or "https://"
  const regex = /^(https?:\/\/)/i;

  // Replace the matched prefix with an empty string
  const result = str.replace(regex, "");

  return result;
}
