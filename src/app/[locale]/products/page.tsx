import { getTranslations, setRequestLocale } from "next-intl/server";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/content/products";
import { localizedMetadata } from "@/lib/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return localizedMetadata(
    locale,
    "/products",
    t("productsTitle"),
    t("productsDescription"),
  );
}

export default async function ProductsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("products");

  return (
    <>
      <section className="page-hero">
        <h1>{t("title")}</h1>
      </section>
      <section className="catalog">
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>
    </>
  );
}
