import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/PageHero";
import { getProduct, localizedText, products } from "@/content/products";
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
  const title = localizedText(product.title, locale);
  const material = localizedText(product.material, locale);
  const t = await getTranslations({ locale, namespace: "meta" });
  return localizedMetadata(
    locale,
    `/${product.slug}`,
    title,
    t("productDescription", {
      title,
      material,
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
  const title = localizedText(product.title, locale);

  const specs = [
    [t("material"), localizedText(product.material, locale)],
    [t("diameter"), product.diameter],
    [t("weight"), product.weight],
    [t("capacity"), product.capacity],
  ] as const;

  return (
    <>
      <PageHero>
        <h1>{title}</h1>
      </PageHero>
      <article className="product-detail">
        <Image
          src={product.image}
          alt={title}
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
