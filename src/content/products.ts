import { hasLocale } from "next-intl";
import { routing, type Locale } from "@/i18n/routing";

/** Copy that must exist for every locale. A missing language is a type error. */
export type LocalizedText = Record<Locale, string>;

export type Product = {
  slug: string;
  title: LocalizedText;
  image: string;
  drawing: string;
  diameter: string;
  weight: string;
  capacity: string;
  material: LocalizedText;
};

const monolayer: LocalizedText = {
  en: "PET monolayer, transparent; PET with dyes and/or additives",
  ru: "ПЭТ монослой, прозрачный; ПЭТ с красителями и/или добавками",
  ro: "PET monostrat, transparent; PET cu coloranți și/sau aditivi",
};

export const products: Product[] = [
  {
    slug: "preform-48mm-90g",
    title: {
      en: "Preform 48mm/90g",
      ru: "Преформа 48мм/90г",
      ro: "Preformă 48mm/90g",
    },
    image: "/images/products/90.jpg",
    drawing: "/images/products/90-drawing.png",
    diameter: "48mm",
    weight: "90g",
    capacity: "5 – 7l",
    material: monolayer,
  },
  {
    slug: "preform-48mm-84g",
    title: {
      en: "Preform 48mm/84g",
      ru: "Преформа 48мм/84г",
      ro: "Preformă 48mm/84g",
    },
    image: "/images/products/64.jpg",
    drawing: "/images/products/64-drawing.png",
    diameter: "48mm",
    weight: "84g",
    capacity: "4 – 5.5l",
    material: monolayer,
  },
  {
    slug: "preform-48mm-64g",
    title: {
      en: "Preform 48mm/64g",
      ru: "Преформа 48мм/64г",
      ro: "Preformă 48mm/64g",
    },
    image: "/images/products/80.jpg",
    drawing: "/images/products/80-drawing.png",
    diameter: "48mm",
    weight: "64g",
    capacity: "2.5 – 4l",
    material: monolayer,
  },
  {
    slug: "preform-48mm-58g",
    title: {
      en: "Preform 48mm/58g",
      ru: "Преформа 48мм/58г",
      ro: "Preformă 48mm/58g",
    },
    image: "/images/products/58.jpg",
    drawing: "/images/products/64-drawing.png",
    diameter: "48mm",
    weight: "64g",
    capacity: "2.5 – 4l",
    material: monolayer,
  },
];

export function localizedText(text: LocalizedText, locale: string) {
  return hasLocale(routing.locales, locale)
    ? text[locale]
    : text[routing.defaultLocale];
}

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}
