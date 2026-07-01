import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import {
  catalogPdfExists,
  deleteCatalogPdf,
  getCatalogMeta,
  saveCatalogPdf,
} from "@/lib/db";

// GET — catalog status
export async function GET() {
  if (!(await isAuthenticated())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const exists = catalogPdfExists();
  const meta = getCatalogMeta();
  return NextResponse.json({ exists, meta });
}

// POST — upload PDF (multipart/form-data with field "catalog")
export async function POST(req: NextRequest) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const formData = await req.formData();
  const file = formData.get("catalog") as File | null;

  if (!file) return NextResponse.json({ error: "No file provided." }, { status: 400 });
  if (!file.name.endsWith(".pdf") && file.type !== "application/pdf") {
    return NextResponse.json({ error: "Only PDF files are accepted." }, { status: 400 });
  }
  if (file.size > 20 * 1024 * 1024) {
    return NextResponse.json({ error: "File must be under 20 MB." }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  saveCatalogPdf(buffer, file.name);

  return NextResponse.json({ success: true, meta: getCatalogMeta() });
}

// DELETE — remove catalog PDF
export async function DELETE() {
  if (!(await isAuthenticated())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  deleteCatalogPdf();
  return NextResponse.json({ success: true });
}
