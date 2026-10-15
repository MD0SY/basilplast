import Link from "next/link";

export default function NotFound() {
  return (
    <section className="page-hero">
      <h1>Page not found</h1>
      <p>
        <Link href="/en">BASIL PLAST</Link>
      </p>
    </section>
  );
}
