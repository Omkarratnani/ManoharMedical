import Link from "next/link";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 bg-parchment/95 backdrop-blur-md border-b border-paper-line/60" style={{ backgroundColor: "rgba(243,236,221,0.92)", borderColor: "var(--color-paper-line)" }}>
      <nav className="max-w-[1180px] mx-auto flex items-center justify-between px-7 py-4">
        <Link href="/" className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt="Manohar Medical Agencies Logo"
            className="w-[42px] h-[42px] object-contain rounded-full border"
            style={{ borderColor: "var(--color-brass)" }}
          />
          <div className="leading-tight">
            <div className="font-display font-semibold text-[1.05rem]">Manohar Medical Agencies</div>
            <div className="text-[0.65rem] uppercase tracking-widest" style={{ color: "var(--color-ink-soft)" }}>
              Wholesale Distributors
            </div>
          </div>
        </Link>
        <div className="hidden md:flex gap-8 text-[0.88rem] font-medium">
          <Link href="/#legacy" className="hover:text-[var(--color-brass)] transition-colors">Our Legacy</Link>
          <Link href="/products" className="hover:text-[var(--color-brass)] transition-colors">Products</Link>
          <Link href="/offers" className="hover:text-[var(--color-brass)] transition-colors">Offers</Link>
          <Link href="/#partner" className="hover:text-[var(--color-brass)] transition-colors">Why Partner</Link>
          <Link href="/contact" className="hover:text-[var(--color-brass)] transition-colors">Contact</Link>
        </div>
        <Link
          href="/contact"
          className="text-[0.82rem] font-semibold px-5 py-2.5 rounded-sm border transition-colors"
          style={{ backgroundColor: "var(--color-ink)", color: "var(--color-ivory)", borderColor: "var(--color-ink)" }}
        >
          Become a Partner
        </Link>
      </nav>
    </header>
  );
}
