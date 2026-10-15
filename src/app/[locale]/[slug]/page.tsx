import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getProduct, products } from "@/content/products";
import { routing } from "@/i18n/routing";
import { localizedMetadata } from "@/lib/metadata";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    products.map((product) => ({ locale, slug: product.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  const t = await getTranslations({ locale, namespace: "meta" });
  return localizedMetadata(
    locale,
    `/${product.slug}`,
    product.title,
    t("productDescription", {
      title: product.title,
      material: product.material,
      diameter: product.diameter,
      weight: product.weight,
      capacity: product.capacity,
    }),
  );
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();
  setRequestLocale(locale);
  const t = await getTranslations("products");

  const specs = [
    [t("material"), product.material],
    [t("diameter"), product.diameter],
    [t("weight"), product.weight],
    [t("capacity"), product.capacity],
  ] as const;

  return (
    <>
      <section className="page-hero">
        <h1>{product.title}</h1>
      </section>
      <article className="product-detail">
        <Image
          src={product.image}
          alt={product.title}
          width={800}
          height={512}
        />
        <dl>
          {specs.map(([label, value]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
        <Image
          src={product.drawing}
          alt=""
          width={420}
          height={420}
          className="drawing"
        />
      </article>
    </>
  );
}
