import { getTranslations, setRequestLocale } from "next-intl/server";
import { ContactForm } from "@/components/ContactForm";
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
    "/contact",
    t("contactTitle"),
    t("contactDescription"),
  );
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contact");
  const footer = await getTranslations("footer");

  return (
    <>
      <section className="page-hero">
        <h1>{t("headline")}</h1>
      </section>
      <section className="contact-layout">
        <div>
          <h2>{t("formTitle")}</h2>
          <ContactForm />
        </div>
        <div className="contact-details">
          <h2>{t("hq")}</h2>
          <p>{t("address")}</p>
          <h3>{footer("ruRo")}</h3>
          <p>
            Email. <a href="mailto:oleg@basilplast.md">oleg@basilplast.md</a>
          </p>
          <p>Tel. +373-69-229611</p>
          <h3>{footer("enAr")}</h3>
          <p>
            Email. <a href="mailto:khaled@basilplast.md">khaled@basilplast.md</a>
          </p>
          <p>Tel. +373-60-882604</p>
        </div>
      </section>
      <iframe
        className="map"
        title={t("mapTitle")}
        src="https://maps.google.com/maps?q=Strada%20Constructorilor%208%2C%20Vatra%2C%20Moldova&t=m&z=10&output=embed&iwloc=near"
      />
    </>
  );
}
