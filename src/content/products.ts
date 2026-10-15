export type Product = {
  slug: string;
  title: string;
  date: string;
  image: string;
  drawing: string;
  diameter: string;
  weight: string;
  capacity: string;
  material: string;
};

export const products: Product[] = [
  {
    slug: "preform-48mm-90g",
    title: "Preform 48mm/90g",
    date: "2021-01-04",
    image: "/images/products/90.jpg",
    drawing: "/images/products/90-drawing.png",
    diameter: "48mm",
    weight: "90g",
    capacity: "5 – 7l",
    material: "PET monolayer, transparent; PET with dyes and/or additives",
  },
  {
    slug: "preform-48mm-80g",
    title: "Preform 48mm/80g",
    date: "2021-01-04",
    image: "/images/products/80.jpg",
    drawing: "/images/products/80-drawing.png",
    diameter: "48mm",
    weight: "80g",
    capacity: "4 – 5.5l",
    material: "PET monolayer, transparent; PET with dyes and/or additives",
  },
  {
    slug: "preform-48mm-64g",
    title: "Preform 48mm/64g",
    date: "2021-01-04",
    image: "/images/products/64.jpg",
    drawing: "/images/products/64-drawing.png",
    diameter: "48mm",
    weight: "64g",
    capacity: "2.5 – 4l",
    material: "PET monolayer, transparent; PET with dyes and/or additives",
  },
  {
    slug: "preform-48mm-58g",
    title: "Preform 48mm/58g",
    date: "2018-01-29",
    image: "/images/products/58.jpg",
    drawing: "/images/products/64-drawing.png",
    diameter: "48mm",
    weight: "64g",
    capacity: "2.5 – 4l",
    material: "PET monolayer, transparent; PET with dyes and/or additives",
  },
];

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}
