export const legacyPaths = [
  "/about-us",
  "/contact",
  "/products",
  "/home-2",
  "/preform-48mm-90g",
  "/preform-48mm-80g",
  "/preform-48mm-64g",
  "/preform-48mm-58g",
] as const;

export function legacyDestination(path: string) {
  if (path === "/home-2") return "/en";
  return `/en${path}`;
}
