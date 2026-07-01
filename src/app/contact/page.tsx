import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import InquiryForm from "@/components/InquiryForm";
import { getSettings } from "@/lib/db";

export const metadata = { title: "Become a Partner — Manohar Medical Agencies" };

// Coordinates from Google Maps
const MAP_LAT = 21.1821396;
const MAP_LNG = 81.2809546;
const MAPS_LINK = `https://maps.app.goo.gl/L9LrzKuPHbeu7ybMA`;

export default function ContactPage() {
  const settings = getSettings();
  const waLink = `https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, "")}`;

  return (
    <>
      <SiteHeader />

      {/* Form + contact info */}
      <section className="py-20" style={{ backgroundColor: "var(--color-forest)", color: "var(--color-ivory)" }}>
        <div className="max-w-[1180px] mx-auto px-7">
          <div className="max-w-[620px] mb-12">
            <span className="font-display uppercase tracking-widest text-[0.72rem]" style={{ color: "var(--color-brass-light)" }}>
              Become a Partner
            </span>
            <h1 className="font-display font-semibold text-4xl mt-2.5 leading-tight">Let&rsquo;s put your firm on the ledger.</h1>
            <p className="mt-3.5 text-[1.02rem]" style={{ color: "#D8E3DA" }}>
              Tell us what you need and how much, and we&rsquo;ll get back with pricing and availability.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-14 items-start">
            <InquiryForm />

            <div className="md:pl-14" style={{ borderLeft: "1px solid rgba(255,255,255,0.2)" }}>
              <InfoRow label="Phone" value={settings.phone} href={`tel:${settings.phone.replace(/\s/g, "")}`} />
              <InfoRow label="Email" value={settings.email} href={`mailto:${settings.email}`} />
              <InfoRow label="Location" value="Potiya Road, Durg, Chhattisgarh 491001" href={MAPS_LINK} linkLabel="Open in Google Maps →" />
              <a
                href={waLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 font-bold text-[0.9rem] rounded-sm mt-2"
                style={{ backgroundColor: "var(--color-ivory)", color: "var(--color-forest)" }}
              >
                Chat on WhatsApp →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Google Maps embed */}
      <section style={{ borderTop: "4px solid var(--color-brass)" }}>
        <iframe
          title="Manohar Medical Agencies Location"
          width="100%"
          height="420"
          style={{ border: 0, display: "block" }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://maps.google.com/maps?q=${MAP_LAT},${MAP_LNG}&z=16&output=embed`}
        />
        <div
          className="text-center py-3 text-[0.84rem]"
          style={{ backgroundColor: "var(--color-parchment-dark)", borderTop: "1px solid var(--color-paper-line)" }}
        >
          <a
            href={MAPS_LINK}
            target="_blank"
            rel="noreferrer"
            style={{ color: "var(--color-brass)" }}
          >
            Open in Google Maps →
          </a>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}

function InfoRow({ label, value, href, linkLabel }: { label: string; value: string; href?: string; linkLabel?: string }) {
  return (
    <div className="mb-7">
      <span className="font-display uppercase tracking-widest text-[0.72rem] block mb-1.5" style={{ color: "var(--color-brass-light)" }}>{label}</span>
      <div className="text-[1.05rem] font-medium">{value}</div>
      {href && linkLabel && (
        <a href={href} target="_blank" rel="noreferrer" className="text-[0.82rem] mt-1 block" style={{ color: "var(--color-brass-light)" }}>
          {linkLabel}
        </a>
      )}
    </div>
  );
}
