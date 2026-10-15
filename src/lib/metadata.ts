import type { Metadata } from "next";
import { routing } from "@/i18n/routing";

export function localizedMetadata(
  locale: string,
  path: string,
  title: string,
  description: string,
): Metadata {
  const suffix = path ? `/${locale}${path}` : `/${locale}`;
  return {
    title,
    description,
    alternates: {
      canonical: suffix,
      languages: Object.fromEntries(
        routing.locales.map((loc) => [
          loc,
          path ? `/${loc}${path}` : `/${loc}`,
        ]),
      ),
    },
  };
}
