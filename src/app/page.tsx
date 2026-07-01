import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { getCategories, getProducts, getSettings } from "@/lib/db";

export default function HomePage() {
  const settings = getSettings();
  const categories = getCategories();
  const products = getProducts();

  return (
    <>
      <SiteHeader />

      {/* HERO */}
      <section className="relative px-7 pt-28 pb-24 overflow-hidden">
        <div className="absolute inset-0 ledger-lines pointer-events-none" />
        <div className="relative max-w-[1180px] mx-auto grid md:grid-cols-[1.1fr_0.9fr] gap-14 items-center">
          <div>
            <div
              className="inline-flex items-center gap-2.5 border rounded-full px-3.5 py-1.5 text-[0.74rem] uppercase tracking-wider mb-6 animate-fade-in"
              style={{ borderColor: "var(--color-brass)", color: "var(--color-ink-soft)" }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "var(--color-brass)" }} />
              Established in the {settings.foundedYear} &middot; Serving Chhattisgarh Since the 1970s
            </div>
            <h1 className="font-display font-semibold leading-tight tracking-tight mb-5 animate-fade-in-up" style={{ fontSize: "clamp(2.4rem, 4.6vw, 3.6rem)" }}>
              Medical wholesale distribution built on{" "}
              <em className="not-italic" style={{ color: "var(--color-forest)", fontStyle: "italic" }}>fifty years</em> of trust.
            </h1>
            <p className="text-lg max-w-[48ch] mb-8 animate-fade-in-up delay-100" style={{ color: "var(--color-ink-soft)" }}>
              Manohar Medical Agencies has supplied pharmacies, distributors and institutions across the
              region since the {settings.foundedYear} — through the same Ratnani family, the same
              warehouse discipline, and the same word kept.
            </p>
            <div className="flex gap-4 flex-wrap mb-12 animate-fade-in-up delay-200">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2.5 px-7 py-4 font-semibold text-[0.92rem] rounded-sm transition-colors"
                style={{ backgroundColor: "var(--color-ink)", color: "var(--color-ivory)", border: "1px solid var(--color-ink)" }}
              >
                Request Bulk Quote →
              </Link>
              <Link
                href="/products"
                className="px-6.5 py-3.5 font-semibold text-[0.92rem] rounded-sm transition-colors border"
                style={{ borderColor: "var(--color-ink)", color: "var(--color-ink)" }}
              >
                View Product Range
              </Link>
            </div>
            <div className="flex gap-9 flex-wrap pt-6 animate-fade-in-up delay-300" style={{ borderTop: "1px solid var(--color-paper-line)" }}>
              <Stat num="50+" label="Years in Business" />
              <Stat num="3" label="Family Proprietors" />
              <Stat num={`${products.length || "1000"}+`} label="Products Stocked" />
              <Stat num="100%" label="Licensed & Compliant" />
            </div>
          </div>

          <div className="flex items-center justify-center animate-fade-in-up delay-400">
            <div
              className="relative w-full max-w-[380px] p-9 animate-float"
              style={{ backgroundColor: "var(--color-ivory)", border: "1px solid var(--color-paper-line)", boxShadow: "0 24px 50px -20px rgba(22,34,59,0.35)" }}
            >
              <div
                className="absolute pointer-events-none"
                style={{ top: 14, left: 14, right: 14, bottom: 14, border: "1px solid var(--color-brass-light)" }}
              />
              <div className="text-center font-display tracking-widest text-[0.78rem] mb-1.5" style={{ color: "var(--color-brass)" }}>
                EST. {settings.foundedYear.toUpperCase()}
              </div>
              <h3 className="text-center font-display text-2xl mb-1">The House Ledger</h3>
              <div className="text-center text-[0.8rem] mb-6" style={{ color: "var(--color-ink-soft)" }}>
                A record kept since the beginning
              </div>
              <LedgerLine k="Firm" v="Manohar Medical Agencies" />
              <LedgerLine k="Nature of Trade" v="Medical Wholesale" />
              <LedgerLine k="Proprietors" v="Ratnani Family" />
              <LedgerLine k="Established" v="Since the 1970s" />
              <LedgerLine k="Status" v="Active & Licensed" last />
            </div>
          </div>
        </div>
      </section>

      {/* LEGACY TIMELINE */}
      <section id="legacy" className="py-24 reveal-on-scroll" style={{ backgroundColor: "var(--color-ink)", color: "var(--color-ivory)" }}>
        <div className="max-w-[1180px] mx-auto px-7">
          <div className="max-w-[620px] mb-14">
            <span className="font-display uppercase tracking-widest text-[0.72rem]" style={{ color: "var(--color-brass-light)" }}>
              Our Legacy
            </span>
            <h2 className="font-display font-semibold text-4xl mt-2.5 leading-tight">Five decades, one family, one ledger.</h2>
            <p className="mt-3.5 text-[1.02rem]" style={{ color: "#C7CEDD" }}>
              What started as a single counter has grown into a full-scale wholesale operation — without ever
              changing hands outside the family, and without ever cutting a corner on supply discipline.
            </p>
          </div>
          <div className="relative pl-0">
            <div
              className="absolute left-[18px] top-2 bottom-2 w-px"
              style={{ background: "linear-gradient(180deg, var(--color-brass) 0%, rgba(173,138,78,.15) 100%)" }}
            />
            <TimelineEntry year={settings.foundedYear} title="The firm is founded" desc="Manohar Medical Agencies opens its doors as a medical wholesale trading house, built on direct relationships with manufacturers and retailers." />
            <TimelineEntry year="Expansion Era" title="The family expands the business" desc="The firm expands the product range and formalises the firm's licensing, supplier network, and distribution reach across the region." />
            <TimelineEntry year="Today" title="A new generation joins the firm" desc="The family continues the legacy with renewed focus on modern systems, technology, and faster service for distributor partners." />
            <TimelineEntry year="Now" title="A trusted name for distributors" desc="Today, Manohar Medical Agencies stocks a broad range of medical supplies, serving distributor partners who depend on consistent, on-time fulfilment." last />
          </div>
        </div>
      </section>

      {/* PRODUCT RANGE */}
      <section className="py-24 reveal-on-scroll">
        <div className="max-w-[1180px] mx-auto px-7">
          <div className="max-w-[620px] mb-14">
            <span className="font-display uppercase tracking-widest text-[0.72rem]" style={{ color: "var(--color-brass)" }}>
              Product Range
            </span>
            <h2 className="font-display font-semibold text-4xl mt-2.5 leading-tight">
              A wholesale catalog built to keep your shelves full.
            </h2>
            <p className="mt-3.5 text-[1.02rem]" style={{ color: "var(--color-ink-soft)" }}>
              We stock broadly across the medical supply spectrum, so our distributor partners can consolidate
              orders with one reliable source instead of chasing five.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4.5">
            {(categories.length ? categories : FALLBACK_CATEGORIES).map((cat, i) => (
              <div
                key={cat.id ?? i}
                className="p-7 border transition-all hover:-translate-y-1"
                style={{ borderColor: "var(--color-paper-line)", backgroundColor: "var(--color-ivory)" }}
              >
                <span className="font-display text-[0.78rem] tracking-wider mb-3.5 block" style={{ color: "var(--color-brass)" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-semibold text-[1.04rem] mb-2">{cat.name}</h3>
                <p className="text-[0.85rem]" style={{ color: "var(--color-ink-soft)" }}>{cat.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <Link href="/products" className="px-6.5 py-3.5 font-semibold text-[0.92rem] rounded-sm border inline-block" style={{ borderColor: "var(--color-ink)", color: "var(--color-ink)" }}>
              View Full Product Catalog →
            </Link>
          </div>
        </div>
      </section>

      {/* WHY PARTNER */}
      <section id="partner" className="py-24 reveal-on-scroll" style={{ backgroundColor: "var(--color-parchment-dark)" }}>
        <div className="max-w-[1180px] mx-auto px-7">
          <div className="max-w-[620px] mb-14">
            <span className="font-display uppercase tracking-widest text-[0.72rem]" style={{ color: "var(--color-brass)" }}>
              Why Partner With Us
            </span>
            <h2 className="font-display font-semibold text-4xl mt-2.5 leading-tight">What fifty years actually buys you.</h2>
            <p className="mt-3.5 text-[1.02rem]" style={{ color: "var(--color-ink-soft)" }}>
              Not promises — a track record. Here&rsquo;s what distributor partners get when they work with a
              firm that has been doing this since the {settings.foundedYear}.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-px" style={{ backgroundColor: "var(--color-paper-line)", border: "1px solid var(--color-paper-line)" }}>
            <PartnerCard num="①" title="Reliable Supply" desc="Consistent stock availability backed by long-standing manufacturer relationships built over decades." />
            <PartnerCard num="②" title="Family Accountability" desc="You deal directly with the owners — the Ratnani family standing behind every order." />
            <PartnerCard num="③" title="Flexible Terms" desc="Bulk pricing, flexible payment terms, and order structures built for distributor-scale business." />
          </div>
        </div>
      </section>

      {/* COMPLIANCE */}
      <section id="compliance" className="reveal-on-scroll" style={{ backgroundColor: "var(--color-parchment-dark)", borderTop: "1px solid var(--color-paper-line)", borderBottom: "1px solid var(--color-paper-line)" }}>
        <div className="max-w-[1180px] mx-auto px-7 pt-12">
          <span className="font-display uppercase tracking-widest text-[0.72rem]" style={{ color: "var(--color-brass)" }}>
            Compliance
          </span>
          <h2 className="font-display font-semibold text-3xl mt-2.5 mb-2">Licensed, registered, and verifiable.</h2>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-4">
          <ComplianceItem label="Drug License" value={settings.drugLicenseNo} first />
          <ComplianceItem label="GST Registration" value={settings.gstNo} />
          <ComplianceItem label="Established" value={settings.foundedYear} />
          <ComplianceItem label="Ownership" value="Ratnani Family" />
        </div>
      </section>

      {/* OWNERS */}
      <section className="py-24 reveal-on-scroll">
        <div className="max-w-[1180px] mx-auto px-7">
          <div className="max-w-[620px] mb-14">
            <span className="font-display uppercase tracking-widest text-[0.72rem]" style={{ color: "var(--color-brass)" }}>
              Leadership
            </span>
            <h2 className="font-display font-semibold text-4xl mt-2.5 leading-tight">The hands behind the ledger.</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <OwnerCard initials="RR" name="Rajesh Kumar Ratnani" role="Proprietor" />
            <OwnerCard initials="MR" name="Manish Ratnani" role="Proprietor" />
            <OwnerCard initials="OR" name="Omkar Ratnani" role="Proprietor" />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 reveal-on-scroll" style={{ backgroundColor: "var(--color-forest)", color: "var(--color-ivory)" }}>
        <div className="max-w-[1180px] mx-auto px-7 text-center">
          <span className="font-display uppercase tracking-widest text-[0.72rem]" style={{ color: "var(--color-brass-light)" }}>
            Become a Partner
          </span>
          <h2 className="font-display font-semibold text-4xl mt-2.5 mb-6">Let&rsquo;s put your firm on the ledger.</h2>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2.5 px-8 py-4 font-semibold text-[0.92rem] rounded-sm"
            style={{ backgroundColor: "var(--color-brass)", color: "var(--color-ink)" }}
          >
            Request Bulk Quote →
          </Link>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}

const FALLBACK_CATEGORIES = [
  { id: "1", name: "Pharmaceuticals", description: "Generic & branded medicines across major therapeutic categories." },
  { id: "2", name: "Surgical & Equipment", description: "Surgical consumables, instruments and clinical equipment." },
  { id: "3", name: "Diagnostics", description: "Testing kits, diagnostic devices and lab consumables." },
  { id: "4", name: "General Medical Supplies", description: "Healthcare consumables and broad-spectrum medical stock." },
];

function Stat({ num, label }: { num: string; label: string }) {
  return (
    <div>
      <div className="font-display font-bold text-[1.7rem]">{num}</div>
      <div className="text-[0.74rem] uppercase tracking-wide" style={{ color: "var(--color-ink-soft)" }}>{label}</div>
    </div>
  );
}

function LedgerLine({ k, v, last }: { k: string; v: string; last?: boolean }) {
  return (
    <div
      className="flex justify-between py-2.5 text-[0.86rem]"
      style={!last ? { borderBottom: "1px dashed var(--color-paper-line)" } : {}}
    >
      <span style={{ color: "var(--color-ink-soft)" }}>{k}</span>
      <span className="font-semibold">{v}</span>
    </div>
  );
}

function TimelineEntry({ year, title, desc, last }: { year: string; title: string; desc: string; last?: boolean }) {
  return (
    <div className={`relative pl-14 ${last ? "pb-0" : "pb-12"}`}>
      <div
        className="absolute left-[11px] top-1.5 w-[15px] h-[15px] rounded-full"
        style={{ backgroundColor: "var(--color-ink)", border: "2px solid var(--color-brass)" }}
      />
      <div className="font-display font-semibold text-[1.05rem] mb-1.5" style={{ color: "var(--color-brass-light)" }}>{year}</div>
      <div className="font-semibold text-[1.15rem] mb-1.5">{title}</div>
      <div className="text-[0.94rem] max-w-[60ch]" style={{ color: "#C7CEDD" }}>{desc}</div>
    </div>
  );
}

function PartnerCard({ num, title, desc }: { num: string; title: string; desc: string }) {
  return (
    <div className="p-9" style={{ backgroundColor: "var(--color-parchment)" }}>
      <div
        className="w-11 h-11 rounded-full border flex items-center justify-center mb-5 font-display"
        style={{ borderColor: "var(--color-brass)", color: "var(--color-brass)" }}
      >
        {num}
      </div>
      <h3 className="font-semibold text-[1.12rem] mb-2.5">{title}</h3>
      <p className="text-[0.92rem]" style={{ color: "var(--color-ink-soft)" }}>{desc}</p>
    </div>
  );
}

function ComplianceItem({ label, value, first }: { label: string; value: string; first?: boolean }) {
  return (
    <div className="p-8" style={!first ? { borderLeft: "1px solid var(--color-paper-line)" } : {}}>
      <span className="font-display uppercase tracking-widest text-[0.72rem] block mb-2" style={{ color: "var(--color-brass)" }}>{label}</span>
      <div className="font-display font-semibold text-[1.05rem]">{value}</div>
    </div>
  );
}

function OwnerCard({ initials, name, role }: { initials: string; name: string; role: string }) {
  return (
    <div className="text-center p-9 border" style={{ borderColor: "var(--color-paper-line)", backgroundColor: "var(--color-ivory)" }}>
      <div
        className="w-[84px] h-[84px] rounded-full mx-auto mb-4.5 flex items-center justify-center font-display text-xl"
        style={{ backgroundColor: "var(--color-ink)", color: "var(--color-brass-light)", border: "2px solid var(--color-brass)" }}
      >
        {initials}
      </div>
      <h3 className="font-semibold text-[1.08rem] mb-1">{name}</h3>
      <div className="text-[0.78rem] uppercase tracking-wider" style={{ color: "var(--color-brass)" }}>{role}</div>
    </div>
  );
}
