import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";
import { PageHero } from "@/components/PageHero";

export default async function NotFound() {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: "notFound" });

  return (
    <PageHero>
      <h1>{t("title")}</h1>
      <p>
        <Link href={`/${locale}`}>BASIL PLAST</Link>
      </p>
    </PageHero>
  );
}
