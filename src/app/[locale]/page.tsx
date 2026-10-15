import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ProductCard } from "@/components/ProductCard";
import { Stats, type HomeStat } from "@/components/Stats";
import { products } from "@/content/products";
import { localizedMetadata } from "@/lib/metadata";

type Value = { title: string; text: string };
type Feature = { title: string; icon: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return localizedMetadata(locale, "", t("homeTitle"), t("homeDescription"));
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");
  const values = t.raw("values") as Value[];
  const features = t.raw("features") as Feature[];
  const stats = t.raw("stats") as HomeStat[];

  return (
    <>
      <section className="hero">
        <Image
          src="/images/hero.jpg"
          alt=""
          fill
          priority
          className="cover-media"
          sizes="100vw"
        />
        <div className="hero-shade" />
        <h1>{t("hero")}</h1>
      </section>

      <section className="values">
        <div className="value-grid">
          {values.map((value) => (
            <article key={value.title} className="value-card">
              <h2>{value.title}</h2>
              <p>{value.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="center-copy">
        <h2 className="display">{t("brand")}</h2>
        <h2 className="display">{t("trust")}</h2>
      </section>

      <section className="prose">
        <h2>{t("petTitle")}</h2>
        <p>{t("petBody")}</p>
      </section>

      <section className="photo-band">
        <Image
          src="/images/band-018.jpg"
          alt=""
          fill
          className="cover-media"
          sizes="100vw"
        />
        <div className="band-shade" />
        <h2>{t("specialize")}</h2>
      </section>

      <section className="prose">
        <h2 className="blue">{t("options")}</h2>
        <p>{t("optionsBody")}</p>
      </section>

      <section className="features">
        <div className="feature-grid">
          {features.map((feature) => (
            <article key={feature.title} className="feature">
              <Image src={feature.icon} alt="" width={72} height={72} />
              <h3>{feature.title}</h3>
            </article>
          ))}
        </div>
      </section>

      <section className="photo-band short">
        <Image
          src="/images/colorants.jpg"
          alt=""
          fill
          className="cover-media"
          sizes="100vw"
        />
        <div className="band-shade" />
        <h2>{t("colorants")}</h2>
      </section>

      <section className="photo-band short">
        <Image
          src="/images/band-004.jpg"
          alt=""
          fill
          className="cover-media"
          sizes="100vw"
        />
        <div className="band-shade" />
        <h2>{t("pure")}</h2>
      </section>

      <section className="plain">
        <Image
          src="/images/antistatic.png"
          alt={t("pure")}
          width={600}
          height={384}
        />
      </section>

      <section className="products-band">
        <Image
          src="/images/products-bg.jpg"
          alt=""
          fill
          className="cover-media"
          sizes="100vw"
        />
        <div className="band-shade dark" />
        <div className="products-inner">
          <h2>{t("products")}</h2>
          <div className="product-grid">
            {products.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </div>
      </section>

      <Stats stats={stats} />

      <section className="cta">
        <h2>{t("deal")}</h2>
      </section>
    </>
  );
}
