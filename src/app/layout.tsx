import type { Metadata } from "next";
import { Oswald, Source_Sans_3 } from "next/font/google";
import en from "../../messages/en.json";
import "./globals.css";

const display = Oswald({
  subsets: ["latin", "latin-ext", "cyrillic"],
  variable: "--font-display",
});

const body = Source_Sans_3({
  subsets: ["latin", "latin-ext", "cyrillic"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "BASIL PLAST",
    template: "%s · BASIL PLAST",
  },
  description: en.meta.defaultDescription,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`} suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
