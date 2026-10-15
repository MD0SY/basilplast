"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

const links = [
  { href: "/", key: "home" },
  { href: "/about-us", key: "about" },
  { href: "/products", key: "products" },
  { href: "/contact", key: "contact" },
] as const;

export function Header() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link href="/" className="brand">
          BASIL PLAST
        </Link>
        <nav className="nav" aria-label={t("home")}>
          {links.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={active ? "nav-link active" : "nav-link"}
                aria-current={active ? "page" : undefined}
              >
                {t(link.key)}
              </Link>
            );
          })}
        </nav>
        <div className="langs" role="group" aria-label={t("language")}>
          {routing.locales.map((loc) => (
            <Link
              key={loc}
              href={pathname}
              locale={loc}
              className={loc === locale ? "lang active" : "lang"}
              hrefLang={loc}
              aria-current={loc === locale ? "true" : undefined}
            >
              {loc.toUpperCase()}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
