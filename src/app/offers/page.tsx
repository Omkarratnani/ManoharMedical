import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { getActiveOffers } from "@/lib/db";
import Link from "next/link";

export const metadata = { title: "Special Offers — Manohar Medical Agencies" };

export const revalidate = 60; // refresh every 60s

export default function OffersPage() {
  const offers = getActiveOffers();

  return (
    <>
      <SiteHeader />

      {/* Hero strip */}
      <section
        className="px-7 pt-20 pb-14 relative overflow-hidden"
        style={{ backgroundColor: "var(--color-ink)", color: "var(--color-ivory)" }}
      >
        <div className="absolute inset-0 ledger-lines pointer-events-none" />
        <div className="relative max-w-[1180px] mx-auto">
          <span
            className="font-display uppercase tracking-widest text-[0.72rem] block mb-2.5"
            style={{ color: "var(--color-brass-light)" }}
          >
            Current Offers
          </span>
          <h1 className="font-display font-semibold leading-tight mb-3" style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)" }}>
            Special Rates for Distributor Partners
          </h1>
          <p className="max-w-[55ch]" style={{ color: "#C7CEDD" }}>
            Offers listed here are exclusively for registered distributor partners. Contact us to
            confirm availability and place bulk orders.
          </p>
        </div>
      </section>

      {/* Offers grid */}
      <section className="py-16 px-7">
        <div className="max-w-[1180px] mx-auto">
          {offers.length === 0 ? (
            <div
              className="py-20 text-center border rounded-sm"
              style={{ borderColor: "var(--color-paper-line)", backgroundColor: "var(--color-ivory)" }}
            >
              <div className="text-3xl mb-3">🏷️</div>
              <h2 className="font-display font-semibold text-xl mb-2">No active offers right now</h2>
              <p className="text-[0.92rem] mb-6" style={{ color: "var(--color-ink-soft)" }}>
                Check back soon, or contact us directly for negotiated rates on bulk orders.
              </p>
              <Link
                href="/contact"
                className="px-6 py-3 font-semibold text-[0.88rem] rounded-sm inline-block"
                style={{ backgroundColor: "var(--color-ink)", color: "var(--color-ivory)" }}
              >
                Get in Touch →
              </Link>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
              {offers.map((offer) => {
                const expired =
                  offer.validUntil && new Date(offer.validUntil) < new Date();
                return (
                  <div
                    key={offer.id}
                    className="border p-6 relative"
                    style={{
                      borderColor: "var(--color-paper-line)",
                      backgroundColor: "var(--color-ivory)",
                      opacity: expired ? 0.6 : 1,
                    }}
                  >
                    {/* Corner accent */}
                    <div
                      className="absolute top-0 right-0 w-0 h-0"
                      style={{
                        borderStyle: "solid",
                        borderWidth: "0 36px 36px 0",
                        borderColor: `transparent var(--color-brass) transparent transparent`,
                      }}
                    />

                    {offer.badge && (
                      <span
                        className="inline-block text-[0.68rem] uppercase tracking-wide px-2.5 py-1 rounded-sm font-semibold mb-3"
                        style={{ backgroundColor: "rgba(173,138,78,0.15)", color: "var(--color-brass)" }}
                      >
                        {offer.badge}
                      </span>
                    )}

                    <h3 className="font-display font-semibold text-[1.15rem] mb-2 leading-snug">
                      {offer.title}
                    </h3>

                    {offer.description && (
                      <p className="text-[0.88rem] mb-4" style={{ color: "var(--color-ink-soft)" }}>
                        {offer.description}
                      </p>
                    )}

                    {offer.validUntil && (
                      <div
                        className="text-[0.78rem] mt-auto pt-3"
                        style={{ borderTop: "1px dashed var(--color-paper-line)", color: "var(--color-ink-soft)" }}
                      >
                        {expired ? (
                          <span style={{ color: "#a23b3b" }}>Offer expired</span>
                        ) : (
                          <>
                            Valid until:{" "}
                            <strong>
                              {new Date(offer.validUntil).toLocaleDateString("en-IN", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              })}
                            </strong>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-14 px-7"
        style={{ backgroundColor: "var(--color-parchment-dark)", borderTop: "1px solid var(--color-paper-line)" }}
      >
        <div className="max-w-[1180px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-5">
          <div>
            <div className="font-display font-semibold text-xl mb-1">Interested in an offer?</div>
            <p className="text-[0.92rem]" style={{ color: "var(--color-ink-soft)" }}>
              Fill in the inquiry form and mention the offer — we&apos;ll confirm availability and pricing for your order volume.
            </p>
          </div>
          <Link
            href="/contact"
            className="shrink-0 px-7 py-3.5 font-semibold text-[0.92rem] rounded-sm whitespace-nowrap"
            style={{ backgroundColor: "var(--color-ink)", color: "var(--color-ivory)" }}
          >
            Submit Inquiry →
          </Link>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
