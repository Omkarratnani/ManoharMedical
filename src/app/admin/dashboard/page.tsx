import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import AdminDashboardClient from "./AdminDashboardClient";
import { getCategories, getCatalogMeta, getInquiries, getOffers, getProducts, getSettings } from "@/lib/db";

export const metadata = { title: "Admin — Manohar Medical Agencies" };

export default async function AdminDashboardPage() {
  if (!(await isAuthenticated())) redirect("/admin/login");

  const settings   = getSettings();
  const categories = getCategories();
  const products   = getProducts();
  const inquiries  = getInquiries();
  const offers     = getOffers();
  const catalogMeta = getCatalogMeta();

  return (
    <AdminDashboardClient
      initialSettings={settings}
      initialCategories={categories}
      initialProducts={products}
      initialInquiries={inquiries}
      initialOffers={offers}
      catalogMeta={catalogMeta}
    />
  );
}
