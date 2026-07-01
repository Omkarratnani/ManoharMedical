"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import type { Category, Product, Inquiry, Offer, Settings, CatalogMeta } from "@/lib/db";

type Tab = "inquiries" | "offers" | "products" | "company" | "catalog";

const S = {
  ink: "var(--color-ink)",
  brass: "var(--color-brass)",
  brassLight: "var(--color-brass-light)",
  parchment: "var(--color-parchment)",
  parchmentDark: "var(--color-parchment-dark)",
  forest: "var(--color-forest)",
  ivory: "var(--color-ivory)",
  paperLine: "var(--color-paper-line)",
  inkSoft: "var(--color-ink-soft)",
};

export default function AdminDashboardClient({
  initialSettings,
  initialCategories,
  initialProducts,
  initialInquiries,
  initialOffers,
  catalogMeta: initCatalogMeta,
}: {
  initialSettings: Settings;
  initialCategories: Category[];
  initialProducts: Product[];
  initialInquiries: Inquiry[];
  initialOffers: Offer[];
  catalogMeta: CatalogMeta | null;
}) {
  const [tab, setTab] = useState<Tab>("inquiries");
  const router = useRouter();

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: S.parchment }}>
      {/* Top bar */}
      <header
        className="sticky top-0 z-40 flex items-center justify-between px-7 py-4 border-b"
        style={{ backgroundColor: S.ivory, borderColor: S.paperLine }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-full border flex items-center justify-center font-display text-sm"
            style={{ borderColor: S.brass, color: S.brass }}
          >
            MM
          </div>
          <div className="font-display font-semibold text-[0.98rem]">Admin Dashboard</div>
        </div>
        <div className="flex items-center gap-4">
          <a href="/" target="_blank" className="text-[0.82rem]" style={{ color: S.inkSoft }}>
            ↗ View Site
          </a>
          <button
            onClick={logout}
            className="text-[0.82rem] px-4 py-2 rounded-sm border"
            style={{ borderColor: S.paperLine, color: S.inkSoft }}
          >
            Sign Out
          </button>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className="w-52 min-h-screen shrink-0 border-r pt-6 px-3"
          style={{ borderColor: S.paperLine, backgroundColor: S.ivory }}
        >
          {(["inquiries", "offers", "products", "company", "catalog"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className="w-full text-left px-3 py-2.5 rounded-sm mb-1 text-[0.88rem] font-medium capitalize transition-colors"
              style={
                tab === t
                  ? { backgroundColor: S.ink, color: S.ivory }
                  : { color: S.inkSoft }
              }
            >
              {t === "inquiries" && "📥 "}
              {t === "offers" && "🏷️ "}
              {t === "products" && "📦 "}
              {t === "company" && "🏢 "}
              {t === "catalog" && "📄 "}
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </aside>

        {/* Main */}
        <main className="flex-1 p-8 overflow-auto">
          {tab === "inquiries" && <InquiriesPanel initial={initialInquiries} />}
          {tab === "offers" && <OffersPanel initial={initialOffers} />}
          {tab === "products" && (
            <ProductsPanel initialProducts={initialProducts} initialCategories={initialCategories} />
          )}
          {tab === "company" && <CompanyPanel initial={initialSettings} />}
          {tab === "catalog" && <CatalogPanel initial={initCatalogMeta} />}
        </main>
      </div>
    </div>
  );
}

// ─── INQUIRIES ───────────────────────────────────────────────────────────────
function InquiriesPanel({ initial }: { initial: Inquiry[] }) {
  const [inquiries, setInquiries] = useState(initial);
  const statusColors: Record<string, string> = {
    new: "#1a6e3c",
    contacted: "#7a5c00",
    closed: "#555",
  };
  const statusBg: Record<string, string> = {
    new: "rgba(26,110,60,0.1)",
    contacted: "rgba(122,92,0,0.1)",
    closed: "rgba(0,0,0,0.06)",
  };

  async function setStatus(id: string, status: Inquiry["status"]) {
    await fetch("/api/admin/inquiries", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    setInquiries((prev) => prev.map((i) => (i.id === id ? { ...i, status } : i)));
  }

  async function remove(id: string) {
    if (!confirm("Delete this inquiry?")) return;
    await fetch("/api/admin/inquiries", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setInquiries((prev) => prev.filter((i) => i.id !== id));
  }

  return (
    <div>
      <SectionHead title="Distributor Inquiries" desc={`${inquiries.filter((i) => i.status === "new").length} new`} />
      {inquiries.length === 0 && <EmptyState msg="No inquiries yet. They'll show up here when distributors fill in the contact form." />}
      <div className="flex flex-col gap-4">
        {inquiries.map((inq) => (
          <div key={inq.id} className="p-5 border rounded-sm" style={{ borderColor: S.paperLine, backgroundColor: S.ivory }}>
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <div className="font-semibold">{inq.companyName}</div>
                <div className="text-[0.85rem]" style={{ color: S.inkSoft }}>
                  {inq.contactPerson} &middot; {inq.phone}
                </div>
                {inq.licenseNo && <div className="text-[0.8rem] mt-0.5" style={{ color: S.inkSoft }}>License: {inq.licenseNo}</div>}
              </div>
              <span
                className="text-[0.72rem] uppercase tracking-wide px-2.5 py-1 rounded-sm font-semibold shrink-0"
                style={{ backgroundColor: statusBg[inq.status], color: statusColors[inq.status] }}
              >
                {inq.status}
              </span>
            </div>
            {inq.productsInterested && (
              <div className="mt-2 text-[0.85rem]"><span style={{ color: S.inkSoft }}>Products: </span>{inq.productsInterested}</div>
            )}
            {inq.message && <div className="mt-1 text-[0.85rem]" style={{ color: S.inkSoft }}>{inq.message}</div>}
            <div className="flex gap-2 mt-3 flex-wrap">
              {(["new", "contacted", "closed"] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setStatus(inq.id, s)}
                  className="text-[0.78rem] px-3 py-1 rounded-sm border"
                  style={inq.status === s ? { backgroundColor: S.ink, color: S.ivory, borderColor: S.ink } : { borderColor: S.paperLine, color: S.inkSoft }}
                >
                  {s}
                </button>
              ))}
              <button
                onClick={() => remove(inq.id)}
                className="text-[0.78rem] px-3 py-1 rounded-sm ml-auto"
                style={{ color: "#a23b3b" }}
              >
                Delete
              </button>
            </div>
            <div className="text-[0.72rem] mt-2" style={{ color: S.paperLine }}>
              {new Date(inq.createdAt).toLocaleString("en-IN")}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── OFFERS ──────────────────────────────────────────────────────────────────
function OffersPanel({ initial }: { initial: Offer[] }) {
  const [offers, setOffers] = useState(initial);
  const [form, setForm] = useState({ title: "", description: "", badge: "", validUntil: "", active: true });
  const [editId, setEditId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  async function save() {
    if (!form.title.trim()) return;
    setSaving(true);
    if (editId) {
      const res = await fetch("/api/admin/offers", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: editId, ...form }),
      });
      if (res.ok) {
        setOffers((prev) => prev.map((o) => (o.id === editId ? { ...o, ...form } : o)));
        setEditId(null);
      }
    } else {
      const res = await fetch("/api/admin/offers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        const { offer } = await res.json();
        setOffers((prev) => [offer, ...prev]);
      }
    }
    setForm({ title: "", description: "", badge: "", validUntil: "", active: true });
    setSaving(false);
  }

  async function toggleActive(o: Offer) {
    await fetch("/api/admin/offers", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: o.id, active: !o.active }),
    });
    setOffers((prev) => prev.map((x) => (x.id === o.id ? { ...x, active: !x.active } : x)));
  }

  async function remove(id: string) {
    if (!confirm("Delete this offer?")) return;
    await fetch("/api/admin/offers", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setOffers((prev) => prev.filter((o) => o.id !== id));
  }

  function startEdit(o: Offer) {
    setEditId(o.id);
    setForm({ title: o.title, description: o.description, badge: o.badge, validUntil: o.validUntil, active: o.active });
  }

  return (
    <div>
      <SectionHead title="Special Offers" desc="Shown on the public Offers page" />

      {/* Form */}
      <div className="p-6 border mb-8 rounded-sm" style={{ borderColor: S.paperLine, backgroundColor: S.ivory }}>
        <h3 className="font-semibold mb-4">{editId ? "Edit Offer" : "Add New Offer"}</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <AdminField label="Title *" value={form.title} onChange={(v) => setForm({ ...form, title: v })} placeholder="e.g. Bulk Discount on Paracetamol" full />
          <AdminField label="Badge Tag" value={form.badge} onChange={(v) => setForm({ ...form, badge: v })} placeholder="e.g. Limited Stock, New, Seasonal" />
          <AdminField label="Valid Until" value={form.validUntil} onChange={(v) => setForm({ ...form, validUntil: v })} type="date" />
          <div className="sm:col-span-2">
            <label className="text-[0.78rem] uppercase tracking-wide block mb-1.5" style={{ color: S.inkSoft }}>Description</label>
            <textarea
              className="w-full px-3.5 py-3 text-[0.88rem] rounded-sm"
              style={{ border: `1px solid ${S.paperLine}`, minHeight: 80 }}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Details about the offer, applicable products, minimum order etc."
            />
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="active"
              checked={form.active}
              onChange={(e) => setForm({ ...form, active: e.target.checked })}
            />
            <label htmlFor="active" className="text-[0.88rem]">Active (visible on site)</label>
          </div>
        </div>
        <div className="flex gap-3 mt-4">
          <AdminBtn onClick={save} loading={saving}>{editId ? "Save Changes" : "Add Offer"}</AdminBtn>
          {editId && (
            <button
              onClick={() => { setEditId(null); setForm({ title: "", description: "", badge: "", validUntil: "", active: true }); }}
              className="px-5 py-2.5 text-[0.88rem] border rounded-sm"
              style={{ borderColor: S.paperLine, color: S.inkSoft }}
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* Offers list */}
      {offers.length === 0 && <EmptyState msg="No offers yet. Add one above — it will appear on the public Offers page." />}
      <div className="flex flex-col gap-4">
        {offers.map((o) => (
          <div key={o.id} className="p-5 border rounded-sm" style={{ borderColor: S.paperLine, backgroundColor: S.ivory }}>
            <div className="flex items-start justify-between gap-3 flex-wrap">
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span className="font-semibold">{o.title}</span>
                  {o.badge && (
                    <span className="text-[0.68rem] uppercase px-2 py-0.5 rounded-sm font-semibold" style={{ backgroundColor: "rgba(173,138,78,0.15)", color: S.brass }}>
                      {o.badge}
                    </span>
                  )}
                  <span className="text-[0.72rem] px-2 py-0.5 rounded-sm" style={o.active ? { backgroundColor: "rgba(26,110,60,0.1)", color: "#1a6e3c" } : { backgroundColor: "rgba(0,0,0,0.06)", color: "#555" }}>
                    {o.active ? "Active" : "Hidden"}
                  </span>
                </div>
                {o.description && <div className="text-[0.85rem]" style={{ color: S.inkSoft }}>{o.description}</div>}
                {o.validUntil && (
                  <div className="text-[0.78rem] mt-1" style={{ color: S.inkSoft }}>
                    Valid until: {new Date(o.validUntil).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
                  </div>
                )}
              </div>
              <div className="flex gap-2 shrink-0">
                <button onClick={() => startEdit(o)} className="text-[0.78rem] px-3 py-1 border rounded-sm" style={{ borderColor: S.paperLine }}>Edit</button>
                <button onClick={() => toggleActive(o)} className="text-[0.78rem] px-3 py-1 border rounded-sm" style={{ borderColor: S.paperLine }}>
                  {o.active ? "Hide" : "Show"}
                </button>
                <button onClick={() => remove(o.id)} className="text-[0.78rem] px-3 py-1 rounded-sm" style={{ color: "#a23b3b" }}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── PRODUCTS ────────────────────────────────────────────────────────────────
function ProductsPanel({ initialProducts, initialCategories }: { initialProducts: Product[]; initialCategories: Category[] }) {
  const [products, setProducts] = useState(initialProducts);
  const [categories, setCategories] = useState(initialCategories);
  const [pForm, setPForm] = useState({ name: "", categoryId: "", manufacturer: "", packSize: "", notes: "", inStock: true });
  const [cForm, setCForm] = useState({ name: "", description: "" });
  const [saving, setSaving] = useState(false);

  async function addCategory() {
    if (!cForm.name.trim()) return;
    const res = await fetch("/api/admin/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cForm),
    });
    if (res.ok) {
      const { category } = await res.json();
      setCategories((prev) => [...prev, category]);
      setCForm({ name: "", description: "" });
    }
  }

  async function deleteCategory(id: string) {
    if (!confirm("Delete this category? Products in it won't be deleted but will become uncategorised.")) return;
    await fetch("/api/admin/categories", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setCategories((prev) => prev.filter((c) => c.id !== id));
  }

  async function addProduct() {
    if (!pForm.name.trim()) return;
    setSaving(true);
    const res = await fetch("/api/admin/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pForm),
    });
    if (res.ok) {
      const { product } = await res.json();
      setProducts((prev) => [...prev, product]);
      setPForm({ name: "", categoryId: "", manufacturer: "", packSize: "", notes: "", inStock: true });
    }
    setSaving(false);
  }

  async function toggleStock(p: Product) {
    await fetch("/api/admin/products", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: p.id, inStock: !p.inStock }),
    });
    setProducts((prev) => prev.map((x) => (x.id === p.id ? { ...x, inStock: !x.inStock } : x)));
  }

  async function deleteProduct(id: string) {
    if (!confirm("Delete this product?")) return;
    await fetch("/api/admin/products", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setProducts((prev) => prev.filter((p) => p.id !== id));
  }

  const catName = (id: string) => categories.find((c) => c.id === id)?.name ?? "—";

  return (
    <div>
      <SectionHead title="Products & Categories" desc={`${products.length} products · ${categories.length} categories`} />

      {/* Categories */}
      <div className="mb-8">
        <h3 className="font-semibold mb-3">Categories</h3>
        <div className="flex flex-wrap gap-2 mb-3">
          {categories.map((c) => (
            <div key={c.id} className="flex items-center gap-1 px-3 py-1.5 rounded-sm border text-[0.84rem]" style={{ borderColor: S.paperLine, backgroundColor: S.ivory }}>
              <span>{c.name}</span>
              <button onClick={() => deleteCategory(c.id)} className="ml-1 opacity-50 hover:opacity-100" style={{ color: "#a23b3b" }}>✕</button>
            </div>
          ))}
        </div>
        <div className="flex gap-2 flex-wrap">
          <input
            className="px-3.5 py-2.5 text-[0.88rem] rounded-sm border"
            style={{ borderColor: S.paperLine }}
            placeholder="Category name"
            value={cForm.name}
            onChange={(e) => setCForm({ ...cForm, name: e.target.value })}
          />
          <input
            className="px-3.5 py-2.5 text-[0.88rem] rounded-sm border"
            style={{ borderColor: S.paperLine, width: 260 }}
            placeholder="Short description"
            value={cForm.description}
            onChange={(e) => setCForm({ ...cForm, description: e.target.value })}
          />
          <AdminBtn onClick={addCategory}>Add Category</AdminBtn>
        </div>
      </div>

      {/* Add Product */}
      <div className="p-6 border mb-6 rounded-sm" style={{ borderColor: S.paperLine, backgroundColor: S.ivory }}>
        <h3 className="font-semibold mb-4">Add Product</h3>
        <div className="grid sm:grid-cols-2 gap-3">
          <AdminField label="Product Name *" value={pForm.name} onChange={(v) => setPForm({ ...pForm, name: v })} full />
          <div>
            <label className="text-[0.78rem] uppercase tracking-wide block mb-1.5" style={{ color: S.inkSoft }}>Category</label>
            <select
              className="w-full px-3.5 py-2.5 text-[0.88rem] rounded-sm border"
              style={{ borderColor: S.paperLine }}
              value={pForm.categoryId}
              onChange={(e) => setPForm({ ...pForm, categoryId: e.target.value })}
            >
              <option value="">— No category —</option>
              {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <AdminField label="Manufacturer" value={pForm.manufacturer} onChange={(v) => setPForm({ ...pForm, manufacturer: v })} />
          <AdminField label="Pack Size" value={pForm.packSize} onChange={(v) => setPForm({ ...pForm, packSize: v })} placeholder="e.g. 10x10, 100ml" />
          <AdminField label="Notes" value={pForm.notes} onChange={(v) => setPForm({ ...pForm, notes: v })} full />
          <div className="flex items-center gap-2">
            <input type="checkbox" id="inStock" checked={pForm.inStock} onChange={(e) => setPForm({ ...pForm, inStock: e.target.checked })} />
            <label htmlFor="inStock" className="text-[0.88rem]">In Stock</label>
          </div>
        </div>
        <AdminBtn onClick={addProduct} loading={saving} cls="mt-4">Add Product</AdminBtn>
      </div>

      {/* Products table */}
      {products.length === 0 && <EmptyState msg="No products added yet." />}
      <div className="overflow-x-auto rounded-sm border" style={{ borderColor: S.paperLine }}>
        <table className="w-full text-[0.84rem]" style={{ backgroundColor: S.ivory }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${S.paperLine}`, backgroundColor: S.parchmentDark }}>
              <Th>Name</Th><Th>Category</Th><Th>Manufacturer</Th><Th>Pack</Th><Th>Status</Th><Th>Actions</Th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} style={{ borderBottom: `1px solid ${S.paperLine}` }}>
                <td className="px-4 py-2.5 font-medium">{p.name}</td>
                <td className="px-4 py-2.5" style={{ color: S.inkSoft }}>{catName(p.categoryId)}</td>
                <td className="px-4 py-2.5" style={{ color: S.inkSoft }}>{p.manufacturer || "—"}</td>
                <td className="px-4 py-2.5" style={{ color: S.inkSoft }}>{p.packSize || "—"}</td>
                <td className="px-4 py-2.5">
                  <span className="text-[0.72rem] uppercase px-2 py-0.5 rounded-sm" style={p.inStock ? { backgroundColor: "rgba(26,110,60,0.1)", color: "#1a6e3c" } : { backgroundColor: "rgba(0,0,0,0.06)", color: "#555" }}>
                    {p.inStock ? "In Stock" : "On Request"}
                  </span>
                </td>
                <td className="px-4 py-2.5">
                  <div className="flex gap-2">
                    <button onClick={() => toggleStock(p)} className="text-[0.75rem] px-2.5 py-1 border rounded-sm" style={{ borderColor: S.paperLine }}>
                      {p.inStock ? "Mark Out" : "Mark In"}
                    </button>
                    <button onClick={() => deleteProduct(p.id)} className="text-[0.75rem] px-2.5 py-1 rounded-sm" style={{ color: "#a23b3b" }}>
                      Del
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── COMPANY SETTINGS ────────────────────────────────────────────────────────
function CompanyPanel({ initial }: { initial: Settings }) {
  const [form, setForm] = useState(initial);
  const [status, setStatus] = useState<"idle" | "saving" | "saved">("idle");

  async function save() {
    setStatus("saving");
    await fetch("/api/admin/settings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setStatus("saved");
    setTimeout(() => setStatus("idle"), 2000);
  }

  const f = (k: keyof Settings, label: string, placeholder?: string, full?: boolean) => (
    <AdminField
      key={k}
      label={label}
      value={form[k]}
      onChange={(v) => setForm({ ...form, [k]: v })}
      placeholder={placeholder}
      full={full}
    />
  );

  return (
    <div>
      <SectionHead title="Company Details" desc="These appear across the entire website" />
      <div className="p-6 border rounded-sm" style={{ borderColor: S.paperLine, backgroundColor: S.ivory }}>
        <div className="grid sm:grid-cols-2 gap-4">
          {f("companyName", "Company Name", "Manohar Medical Agencies", true)}
          {f("tagline", "Tagline", "Wholesale Medical Distributors", true)}
          {f("foundedYear", "Founded Year / Era", "e.g. 1970s")}
          {f("proprietors", "Proprietors", "Comma-separated names", true)}
          <hr className="sm:col-span-2" style={{ borderColor: S.paperLine }} />
          {f("drugLicenseNo", "Drug License Number")}
          {f("gstNo", "GST Number")}
          <hr className="sm:col-span-2" style={{ borderColor: S.paperLine }} />
          {f("phone", "Phone Number", "+91 XXXXX XXXXX")}
          {f("whatsapp", "WhatsApp Number", "+91XXXXXXXXXX")}
          {f("email", "Email Address", "info@manoharmedical.com")}
          {f("address", "Street / Office Address", "Address line", true)}
          {f("city", "City, State", "e.g. Mumbai, Maharashtra")}
        </div>
        <div className="flex items-center gap-3 mt-5">
          <AdminBtn onClick={save} loading={status === "saving"}>Save Changes</AdminBtn>
          {status === "saved" && <span className="text-sm" style={{ color: S.forest }}>✓ Saved</span>}
        </div>
      </div>
    </div>
  );
}

// ─── CATALOG PDF ─────────────────────────────────────────────────────────────
function CatalogPanel({ initial }: { initial: CatalogMeta | null }) {
  const [meta, setMeta] = useState(initial);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  async function upload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 20 * 1024 * 1024) { setError("File must be under 20 MB."); return; }
    setError("");
    setUploading(true);
    const fd = new FormData();
    fd.append("catalog", file);
    const res = await fetch("/api/admin/catalog", { method: "POST", body: fd });
    setUploading(false);
    if (res.ok) {
      const { meta } = await res.json();
      setMeta(meta);
    } else {
      const { error } = await res.json();
      setError(error);
    }
    if (fileRef.current) fileRef.current.value = "";
  }

  async function remove() {
    if (!confirm("Remove the current catalog PDF? Visitors won't be able to download it until you upload a new one.")) return;
    await fetch("/api/admin/catalog", { method: "DELETE" });
    setMeta(null);
  }

  return (
    <div>
      <SectionHead title="Product Catalog PDF" desc="Upload a PDF for distributors to download from the Products page" />

      {meta ? (
        <div className="p-6 border rounded-sm mb-6" style={{ borderColor: S.paperLine, backgroundColor: S.ivory }}>
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <div className="font-semibold mb-1">📄 {meta.filename}</div>
              <div className="text-[0.84rem]" style={{ color: S.inkSoft }}>
                {meta.sizeKb} KB &middot; Uploaded {new Date(meta.uploadedAt).toLocaleString("en-IN")}
              </div>
            </div>
            <div className="flex gap-2">
              <a
                href="/api/catalog"
                target="_blank"
                className="text-[0.84rem] px-4 py-2 border rounded-sm"
                style={{ borderColor: S.paperLine }}
              >
                Preview / Download
              </a>
              <button onClick={remove} className="text-[0.84rem] px-4 py-2 rounded-sm" style={{ color: "#a23b3b" }}>
                Remove
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-8 border rounded-sm mb-6 text-center" style={{ borderColor: S.paperLine, backgroundColor: S.ivory, borderStyle: "dashed" }}>
          <div className="text-3xl mb-2">📄</div>
          <div className="font-medium mb-1">No catalog uploaded yet</div>
          <div className="text-[0.85rem]" style={{ color: S.inkSoft }}>
            Visitors will see a "Catalog available on request" message.
          </div>
        </div>
      )}

      <div>
        <label
          className="inline-flex items-center gap-2 px-5 py-3 font-semibold text-[0.88rem] rounded-sm cursor-pointer"
          style={{ backgroundColor: S.ink, color: S.ivory }}
        >
          {uploading ? "Uploading…" : meta ? "Replace Catalog PDF" : "Upload Catalog PDF"}
          <input
            ref={fileRef}
            type="file"
            accept=".pdf,application/pdf"
            className="hidden"
            onChange={upload}
            disabled={uploading}
          />
        </label>
        <div className="text-[0.78rem] mt-2" style={{ color: S.inkSoft }}>PDF only · Max 20 MB</div>
        {error && <div className="text-sm mt-2" style={{ color: "#a23b3b" }}>{error}</div>}
      </div>
    </div>
  );
}

// ─── Shared sub-components ───────────────────────────────────────────────────
function SectionHead({ title, desc }: { title: string; desc?: string }) {
  return (
    <div className="mb-6 pb-4" style={{ borderBottom: `1px solid var(--color-paper-line)` }}>
      <h2 className="font-display font-semibold text-2xl">{title}</h2>
      {desc && <p className="text-[0.88rem] mt-1" style={{ color: S.inkSoft }}>{desc}</p>}
    </div>
  );
}

function EmptyState({ msg }: { msg: string }) {
  return (
    <div className="p-8 text-center border rounded-sm" style={{ borderColor: S.paperLine, backgroundColor: S.ivory, color: S.inkSoft }}>
      {msg}
    </div>
  );
}

function AdminField({
  label, value, onChange, placeholder, type = "text", full,
}: {
  label: string; value: string; onChange: (v: string) => void;
  placeholder?: string; type?: string; full?: boolean;
}) {
  return (
    <div className={full ? "sm:col-span-2" : ""}>
      <label className="text-[0.78rem] uppercase tracking-wide block mb-1.5" style={{ color: S.inkSoft }}>{label}</label>
      <input
        type={type}
        className="w-full px-3.5 py-2.5 text-[0.88rem] rounded-sm border"
        style={{ borderColor: S.paperLine }}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
}

function AdminBtn({
  onClick, loading, children, cls = "",
}: {
  onClick: () => void; loading?: boolean; children: React.ReactNode; cls?: string;
}) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className={`px-5 py-2.5 font-semibold text-[0.88rem] rounded-sm disabled:opacity-60 ${cls}`}
      style={{ backgroundColor: S.ink, color: S.ivory }}
    >
      {loading ? "…" : children}
    </button>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return <th className="text-left px-4 py-2.5 text-[0.78rem] uppercase tracking-wide font-semibold" style={{ color: S.inkSoft }}>{children}</th>;
}
