import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PageHero } from "@/components/PageHero";

export default async function NotFound() {
  const t = await getTranslations("notFound");

  return (
    <PageHero>
      <h1>{t("title")}</h1>
      <p>
        <Link href="/">BASIL PLAST</Link>
      </p>
    </PageHero>
  );
}
