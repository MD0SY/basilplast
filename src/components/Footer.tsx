import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="site-footer">
      <Link href="/" className="footer-logo-link">
        <Image
          src="/images/icons/cropped-logo_basil_plast.jpg"
          alt="BASIL PLAST"
          width={317}
          height={135}
          className="footer-logo"
        />
      </Link>
      <div className="footer-grid">
        <div>
          <p className="eyebrow">{t("addressLabel")}</p>
          <p>{t("address")}</p>
        </div>
        <div>
          <p className="eyebrow">{t("ruRo")}</p>
          <p>
            <a href="mailto:oleg@basilplast.md">oleg@basilplast.md</a>
          </p>
          <p>
            {t("tel")} +373-69-229611
          </p>
        </div>
        <div>
          <p className="eyebrow">{t("enAr")}</p>
          <p>
            <a href="mailto:khaled@basilplast.md">khaled@basilplast.md</a>
          </p>
          <p>
            {t("tel")} +373-60-882604
          </p>
        </div>
      </div>
      <p className="copyright">© {new Date().getFullYear()} BASIL PLAST</p>
    </footer>
  );
}
