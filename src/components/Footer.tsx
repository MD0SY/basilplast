import { useTranslations } from "next-intl";

export function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="site-footer">
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
