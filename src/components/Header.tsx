"use client";

import { useEffect, useState } from "react";
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
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname, locale]);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link href="/" className="brand" onClick={() => setOpen(false)}>
          BASIL PLAST
        </Link>
        <nav
          id="site-nav"
          className={open ? "nav open" : "nav"}
          aria-label={t("menu")}
        >
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
                onClick={() => setOpen(false)}
              >
                {t(link.key)}
              </Link>
            );
          })}
        </nav>
        <div className="header-tools">
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
          <button
            type="button"
            className={open ? "menu-toggle open" : "menu-toggle"}
            aria-expanded={open}
            aria-controls="site-nav"
            aria-label={open ? t("close") : t("menu")}
            onClick={() => setOpen((value) => !value)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  );
}
