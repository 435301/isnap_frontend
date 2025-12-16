export const toTitleCase = (str) =>
  str
    .replace(/([A-Z])/g, " $1")          // add space before capitals
    .replace(/\b\w/g, (c) => c.toUpperCase()) // capitalize each word
    .trim();
