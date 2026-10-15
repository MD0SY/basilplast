import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/PageHero";
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
    "/about-us",
    t("aboutTitle"),
    t("aboutDescription"),
  );
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about");
  const paragraphs = t.raw("paragraphs") as string[];

  return (
    <>
      <PageHero>
        <h1>{t("eyebrow")}</h1>
      </PageHero>
      <section className="about">
        <Image
          src="/images/about.jpg"
          alt=""
          width={500}
          height={605}
        />
        <div>
          <h2>{t("title")}</h2>
          {paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 48)}>{paragraph}</p>
          ))}
        </div>
      </section>
    </>
  );
}
