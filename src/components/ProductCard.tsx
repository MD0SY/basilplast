import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { Product } from "@/content/products";

export function ProductCard({ product }: { product: Product }) {
  const locale = useLocale();
  const t = useTranslations("products");
  const date = new Intl.DateTimeFormat(locale, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(`${product.date}T12:00:00`));

  return (
    <article className="product-card">
      <Link href={`/${product.slug}`}>
        <Image
          src={product.image}
          alt={product.title}
          width={620}
          height={397}
        />
        <time dateTime={product.date}>{date}</time>
        <h3>{product.title}</h3>
        <p>
          {t("material")}: {product.material} {t("diameter")}: {product.diameter}{" "}
          {t("weight")}: {product.weight} {t("capacity")}: {product.capacity}
        </p>
      </Link>
    </article>
  );
}
