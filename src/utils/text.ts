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
  const characters = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  const nanoid = customAlphabet(characters, length);

  return nanoid();
}

export function getPartsOfUrl(url: string) {
  // returns an object with 3 parts, protocol, domain and rest
  let result = {
    protocol: "",
    domain: "",
    rest: "",
  };

  if (url.includes("://")) {
    // Split the URL by "://"
    const [protocol, rest] = url.split("://");

    // Split the rest by "/"
    const [domain, ...restParts] = rest.split("/");

    result = {
      protocol,
      domain,
      rest: restParts.join("/"),
    };
  } else {
    // Split the URL by "/"
    const [domain, ...restParts] = url.split("/");

    result = {
      protocol: "",
      domain,
      rest: restParts.join("/"),
    };
  }

  return result;
}

export function shortifyUrl(url: string) {
  const { domain, rest } = getPartsOfUrl(url);
  const shortRest = truncateString(rest, 20);

  return domain + "/" + shortRest;
}

export function hexToRgba(hex: string, alpha = 1) {
  hex = hex.replace(/^#/, "");

  const bigint = parseInt(hex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
