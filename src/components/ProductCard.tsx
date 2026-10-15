import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { localizedText, type Product } from "@/content/products";

export function ProductCard({ product }: { product: Product }) {
  const locale = useLocale();
  const t = useTranslations("products");
  const title = localizedText(product.title, locale);
  const material = localizedText(product.material, locale);

  return (
    <article className="product-card">
      <Link href={`/${product.slug}`}>
        <Image src={product.image} alt={title} width={620} height={397} />
        <h3>{title}</h3>
        <p>
          {t("material")}: {material} {t("diameter")}: {product.diameter}{" "}
          {t("weight")}: {product.weight} {t("capacity")}: {product.capacity}
        </p>
      </Link>
    </article>
  );
}
