import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { catalogPdfExists, getCatalogMeta, getCategories, getProducts } from "@/lib/db";
import Link from "next/link";

export const metadata = { title: "Product Range — Manohar Medical Agencies" };

export default function ProductsPage() {
  const categories = getCategories();
  const products = getProducts();
  const hasCatalog = catalogPdfExists();
  const catalogMeta = getCatalogMeta();

  return (
    <>
      <SiteHeader />
      <section className="px-7 pt-20 pb-10" style={{ borderBottom: "1px solid var(--color-paper-line)" }}>
        <div className="max-w-[1180px] mx-auto">
          <span className="font-display uppercase tracking-widest text-[0.72rem]" style={{ color: "var(--color-brass)" }}>
            Product Range
          </span>
          <h1 className="font-display font-semibold text-4xl mt-2.5 mb-3">Our Wholesale Catalog</h1>
          <p className="max-w-[60ch] text-[1.02rem]" style={{ color: "var(--color-ink-soft)" }}>
            Browse by category below. For full pricing, minimum order quantities, and brand-wise availability,
            request our complete catalog via the contact page.
          </p>
        </div>
      </section>

      <section className="px-7 py-16">
        <div className="max-w-[1180px] mx-auto">
          {/* Catalog download banner */}
      {hasCatalog ? (
        <div
          className="flex items-center justify-between gap-4 p-5 border rounded-sm mb-8 flex-wrap"
          style={{ borderColor: "var(--color-brass)", backgroundColor: "rgba(173,138,78,0.06)" }}
        >
          <div>
            <div className="font-semibold mb-0.5">📄 Full Product Catalog Available</div>
            <div className="text-[0.84rem]" style={{ color: "var(--color-ink-soft)" }}>
              {catalogMeta?.filename} &middot; {catalogMeta?.sizeKb} KB
            </div>
          </div>
          <a
            href="/api/catalog"
            className="px-5 py-2.5 font-semibold text-[0.88rem] rounded-sm shrink-0"
            style={{ backgroundColor: "var(--color-ink)", color: "var(--color-ivory)" }}
          >
            Download Catalog PDF →
          </a>
        </div>
      ) : (
        <div
          className="flex items-center justify-between gap-4 p-5 border rounded-sm mb-8 flex-wrap"
          style={{ borderColor: "var(--color-paper-line)", backgroundColor: "var(--color-ivory)" }}
        >
          <div>
            <div className="font-semibold mb-0.5">Full Catalog Available on Request</div>
            <div className="text-[0.84rem]" style={{ color: "var(--color-ink-soft)" }}>
              Contact us for our complete product list with pricing and minimum order details.
            </div>
          </div>
          <Link
            href="/contact"
            className="px-5 py-2.5 font-semibold text-[0.88rem] rounded-sm shrink-0 border"
            style={{ borderColor: "var(--color-ink)", color: "var(--color-ink)" }}
          >
            Request Catalog →
          </Link>
        </div>
      )}

      {categories.length === 0 && (
            <div className="p-10 text-center border" style={{ borderColor: "var(--color-paper-line)", backgroundColor: "var(--color-ivory)" }}>
              <p style={{ color: "var(--color-ink-soft)" }}>
                The catalog is being updated. Please reach out via the contact page for current stock and pricing.
              </p>
            </div>
          )}

          <div className="flex flex-col gap-12">
            {categories.map((cat) => {
              const catProducts = products.filter((p) => p.categoryId === cat.id);
              return (
                <div key={cat.id}>
                  <div className="flex items-baseline justify-between mb-5 pb-3" style={{ borderBottom: "1px solid var(--color-paper-line)" }}>
                    <div>
                      <h2 className="font-display font-semibold text-2xl">{cat.name}</h2>
                      <p className="text-[0.88rem] mt-1" style={{ color: "var(--color-ink-soft)" }}>{cat.description}</p>
                    </div>
                    <span className="text-[0.8rem]" style={{ color: "var(--color-brass)" }}>{catProducts.length} item(s)</span>
                  </div>

                  {catProducts.length === 0 ? (
                    <p className="text-[0.88rem] italic" style={{ color: "var(--color-ink-soft)" }}>
                      Products in this category available on request.
                    </p>
                  ) : (
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {catProducts.map((p) => (
                        <div key={p.id} className="p-5 border" style={{ borderColor: "var(--color-paper-line)", backgroundColor: "var(--color-ivory)" }}>
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-semibold text-[0.98rem]">{p.name}</h3>
                            <span
                              className="text-[0.68rem] uppercase px-2 py-0.5 rounded-sm shrink-0 ml-2"
                              style={
                                p.inStock
                                  ? { backgroundColor: "rgba(52,80,61,0.12)", color: "var(--color-forest)" }
                                  : { backgroundColor: "rgba(180,60,60,0.1)", color: "#a23b3b" }
                              }
                            >
                              {p.inStock ? "In Stock" : "On Request"}
                            </span>
                          </div>
                          {p.manufacturer && (
                            <p className="text-[0.82rem]" style={{ color: "var(--color-ink-soft)" }}>{p.manufacturer}</p>
                          )}
                          {p.packSize && (
                            <p className="text-[0.78rem] mt-1" style={{ color: "var(--color-brass)" }}>Pack: {p.packSize}</p>
                          )}
                          {p.notes && <p className="text-[0.8rem] mt-2" style={{ color: "var(--color-ink-soft)" }}>{p.notes}</p>}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <SiteFooter />
    </>
  );
}
