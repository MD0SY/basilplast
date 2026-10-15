"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useLocale } from "next-intl";

export type HomeStat = {
  label: string;
  icon: string;
  target: number;
  suffix?: string;
};

const DURATION = 2200;

function easeOutCubic(t: number) {
  return 1 - (1 - t) ** 3;
}

function CountUp({
  target,
  suffix = "",
  active,
  delay,
  locale,
}: {
  target: number;
  suffix?: string;
  active: boolean;
  delay: number;
  locale: string;
}) {
  const [value, setValue] = useState(0);
  const format = (n: number) =>
    new Intl.NumberFormat(locale).format(n);

  useEffect(() => {
    if (!active) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setValue(target);
      return;
    }

    let frame = 0;
    let start = 0;
    const tick = (now: number) => {
      if (!start) start = now;
      const elapsed = now - start - delay;
      if (elapsed < 0) {
        frame = requestAnimationFrame(tick);
        return;
      }
      const progress = Math.min(elapsed / DURATION, 1);
      setValue(Math.round(easeOutCubic(progress) * target));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, delay, target]);

  const finalText = `${format(target)}${suffix}`;

  return (
    <p className="stat-value">
      <span className="stat-value-sizer" aria-hidden>
        {finalText}
      </span>
      <span className="stat-value-live">
        {format(value)}
        {suffix}
      </span>
    </p>
  );
}

export function Stats({ stats }: { stats: HomeStat[] }) {
  const locale = useLocale();
  const rootRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="stats" ref={rootRef}>
      {stats.map((stat, index) => (
        <article key={stat.label} className="stat">
          <Image src={stat.icon} alt="" width={72} height={72} />
          <CountUp
            target={stat.target}
            suffix={stat.suffix}
            active={active}
            delay={index * 140}
            locale={locale}
          />
          <p className="stat-label">{stat.label}</p>
        </article>
      ))}
    </section>
  );
}
