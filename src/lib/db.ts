import fs from "fs";
import path from "path";
import { nanoid } from "nanoid";

// --- Lightweight file-backed data layer ---------------------------------
// This stores data as JSON on disk so the app works with zero external
// services during development. For production on Vercel, the filesystem
// is read-only/ephemeral, so swap the read/write functions below for a
// hosted database (e.g. Vercel Postgres, Neon, or Turso). Every other
// part of the app talks to the functions exported here, not to files
// directly, so that swap only touches this one file.

const DATA_DIR = path.join(process.cwd(), "data");
const PRODUCTS_FILE = path.join(DATA_DIR, "products.json");
const CATEGORIES_FILE = path.join(DATA_DIR, "categories.json");
const INQUIRIES_FILE = path.join(DATA_DIR, "inquiries.json");
const SETTINGS_FILE = path.join(DATA_DIR, "settings.json");
const OFFERS_FILE = path.join(DATA_DIR, "offers.json");
export const CATALOG_PDF_PATH = path.join(DATA_DIR, "catalog.pdf");
export const CATALOG_PDF_META = path.join(DATA_DIR, "catalog-meta.json");

export type Category = {
  id: string;
  name: string;
  description: string;
  createdAt: string;
};

export type Product = {
  id: string;
  name: string;
  categoryId: string;
  manufacturer: string;
  packSize: string;
  notes: string;
  inStock: boolean;
  createdAt: string;
};

export type Inquiry = {
  id: string;
  companyName: string;
  contactPerson: string;
  phone: string;
  licenseNo: string;
  productsInterested: string;
  message: string;
  status: "new" | "contacted" | "closed";
  createdAt: string;
};

export type Settings = {
  companyName: string;
  tagline: string;
  foundedYear: string;
  drugLicenseNo: string;
  gstNo: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  city: string;
  proprietors: string;
};

export type Offer = {
  id: string;
  title: string;
  description: string;
  badge: string;           // e.g. "Limited Stock", "Seasonal", "New"
  validUntil: string;      // ISO date string or ""
  active: boolean;
  createdAt: string;
};

export type CatalogMeta = {
  filename: string;
  uploadedAt: string;
  sizeKb: number;
};

function ensureFile<T>(file: string, fallback: T) {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(file)) fs.writeFileSync(file, JSON.stringify(fallback, null, 2));
}

function readJSON<T>(file: string, fallback: T): T {
  ensureFile(file, fallback);
  try {
    return JSON.parse(fs.readFileSync(file, "utf-8"));
  } catch {
    return fallback;
  }
}

function writeJSON<T>(file: string, data: T) {
  ensureFile(file, data);
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

// --- Categories ----------------------------------------------------------
export function getCategories(): Category[] {
  return readJSON<Category[]>(CATEGORIES_FILE, []);
}

export function addCategory(name: string, description: string): Category {
  const categories = getCategories();
  const cat: Category = { id: nanoid(8), name, description, createdAt: new Date().toISOString() };
  categories.push(cat);
  writeJSON(CATEGORIES_FILE, categories);
  return cat;
}

export function deleteCategory(id: string) {
  const categories = getCategories().filter((c) => c.id !== id);
  writeJSON(CATEGORIES_FILE, categories);
}

// --- Products --------------------------------------------------------------
export function getProducts(): Product[] {
  return readJSON<Product[]>(PRODUCTS_FILE, []);
}

export function addProduct(data: Omit<Product, "id" | "createdAt">): Product {
  const products = getProducts();
  const product: Product = { ...data, id: nanoid(8), createdAt: new Date().toISOString() };
  products.push(product);
  writeJSON(PRODUCTS_FILE, products);
  return product;
}

export function updateProduct(id: string, data: Partial<Product>) {
  const products = getProducts().map((p) => (p.id === id ? { ...p, ...data } : p));
  writeJSON(PRODUCTS_FILE, products);
}

export function deleteProduct(id: string) {
  const products = getProducts().filter((p) => p.id !== id);
  writeJSON(PRODUCTS_FILE, products);
}

// --- Inquiries --------------------------------------------------------------
export function getInquiries(): Inquiry[] {
  return readJSON<Inquiry[]>(INQUIRIES_FILE, []).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export function addInquiry(data: Omit<Inquiry, "id" | "createdAt" | "status">): Inquiry {
  const inquiries = readJSON<Inquiry[]>(INQUIRIES_FILE, []);
  const inquiry: Inquiry = {
    ...data,
    id: nanoid(8),
    status: "new",
    createdAt: new Date().toISOString(),
  };
  inquiries.push(inquiry);
  writeJSON(INQUIRIES_FILE, inquiries);
  return inquiry;
}

export function updateInquiryStatus(id: string, status: Inquiry["status"]) {
  const inquiries = readJSON<Inquiry[]>(INQUIRIES_FILE, []).map((i) =>
    i.id === id ? { ...i, status } : i
  );
  writeJSON(INQUIRIES_FILE, inquiries);
}

export function deleteInquiry(id: string) {
  const inquiries = readJSON<Inquiry[]>(INQUIRIES_FILE, []).filter((i) => i.id !== id);
  writeJSON(INQUIRIES_FILE, inquiries);
}

// --- Settings --------------------------------------------------------------
const DEFAULT_SETTINGS: Settings = {
  companyName: "Manohar Medical Agencies",
  tagline: "Wholesale Medical Distributors",
  foundedYear: "1970s",
  drugLicenseNo: "Available on request",
  gstNo: "Available on request",
  phone: "+91 94252 44295",
  whatsapp: "+919425244295",
  email: "manoharmedicalagenies@gmail.com",
  address: "Potiya Road, Durg, Chhattisgarh 491001",
  city: "Durg, Chhattisgarh",
  proprietors: "Rajesh Kumar Ratnani, Manish Ratnani, Omkar Ratnani",
};

export function getSettings(): Settings {
  return readJSON<Settings>(SETTINGS_FILE, DEFAULT_SETTINGS);
}

export function updateSettings(data: Partial<Settings>) {
  const current = getSettings();
  writeJSON(SETTINGS_FILE, { ...current, ...data });
}

// --- Offers ----------------------------------------------------------------
export function getOffers(): Offer[] {
  return readJSON<Offer[]>(OFFERS_FILE, []).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export function getActiveOffers(): Offer[] {
  return getOffers().filter((o) => o.active);
}

export function addOffer(data: Omit<Offer, "id" | "createdAt">): Offer {
  const offers = readJSON<Offer[]>(OFFERS_FILE, []);
  const offer: Offer = { ...data, id: nanoid(8), createdAt: new Date().toISOString() };
  offers.push(offer);
  writeJSON(OFFERS_FILE, offers);
  return offer;
}

export function updateOffer(id: string, data: Partial<Offer>) {
  const offers = getOffers().map((o) => (o.id === id ? { ...o, ...data } : o));
  writeJSON(OFFERS_FILE, offers);
}

export function deleteOffer(id: string) {
  const offers = getOffers().filter((o) => o.id !== id);
  writeJSON(OFFERS_FILE, offers);
}

// --- Catalog PDF -----------------------------------------------------------
export function getCatalogMeta(): CatalogMeta | null {
  if (!fs.existsSync(CATALOG_PDF_META)) return null;
  try {
    return JSON.parse(fs.readFileSync(CATALOG_PDF_META, "utf-8"));
  } catch {
    return null;
  }
}

export function saveCatalogPdf(buffer: Buffer, filename: string) {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(CATALOG_PDF_PATH, buffer);
  const meta: CatalogMeta = {
    filename,
    uploadedAt: new Date().toISOString(),
    sizeKb: Math.round(buffer.length / 1024),
  };
  fs.writeFileSync(CATALOG_PDF_META, JSON.stringify(meta, null, 2));
}

export function deleteCatalogPdf() {
  if (fs.existsSync(CATALOG_PDF_PATH)) fs.unlinkSync(CATALOG_PDF_PATH);
  if (fs.existsSync(CATALOG_PDF_META)) fs.unlinkSync(CATALOG_PDF_META);
}

export function catalogPdfExists(): boolean {
  return fs.existsSync(CATALOG_PDF_PATH);
}
