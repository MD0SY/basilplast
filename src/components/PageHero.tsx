import Image from "next/image";
import type { ReactNode } from "react";

export function PageHero({ children }: { children: ReactNode }) {
  return (
    <section className="page-hero">
      <Image
        src="/images/hero.jpg"
        alt=""
        fill
        preload
        sizes="100vw"
        className="cover-media"
      />
      <div className="page-hero-content">{children}</div>
    </section>
  );
}
