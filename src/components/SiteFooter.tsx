import { getSettings } from "@/lib/db";

export default function SiteFooter() {
  const settings = getSettings();
  return (
    <footer style={{ backgroundColor: "var(--color-ink)", color: "#9AA6C2" }} className="pt-12 pb-8 text-[0.84rem]">
      <div className="max-w-[1180px] mx-auto px-7">
        <div
          className="flex justify-between flex-wrap gap-8 pb-8 mb-6"
          style={{ borderBottom: "1px solid rgba(255,255,255,.1)" }}
        >
          <div className="flex items-center gap-3" style={{ color: "var(--color-ivory)" }}>
            <img
              src="/logo.png"
              alt="Manohar Medical Agencies Logo"
              className="w-[42px] h-[42px] object-contain rounded-full border"
              style={{ borderColor: "var(--color-brass-light)" }}
            />
            <div>
              <div className="font-display font-semibold">Manohar Medical Agencies</div>
              <div className="text-[0.75rem]" style={{ color: "#9AA6C2" }}>
                Wholesale Medical Distributors &middot; Est. {settings.foundedYear}
              </div>
            </div>
          </div>
          <div className="flex gap-7 flex-wrap items-center">
            <a href="/#legacy" className="hover:text-[var(--color-brass-light)]">Our Legacy</a>
            <a href="/products" className="hover:text-[var(--color-brass-light)]">Product Range</a>
            <a href="/#partner" className="hover:text-[var(--color-brass-light)]">Why Partner</a>
            <a href="/contact" className="hover:text-[var(--color-brass-light)]">Contact</a>
            <a href="/admin" className="hover:text-[var(--color-brass-light)] opacity-60">Admin</a>
          </div>
        </div>
        <div className="flex justify-between flex-wrap gap-2">
          <span>
            © {new Date().getFullYear()} Manohar Medical Agencies. All rights reserved. &middot; Developed by{" "}
            <span className="font-semibold" style={{ color: "var(--color-brass-light)" }}>OmkarLabs</span>
          </span>
          <span>Proprietors: Rajesh Kumar Ratnani · Manish Ratnani · Omkar Ratnani</span>
        </div>
      </div>
    </footer>
  );
}
