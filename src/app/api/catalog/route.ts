import { NextResponse } from "next/server";
import { CATALOG_PDF_PATH, catalogPdfExists, getCatalogMeta } from "@/lib/db";
import fs from "fs";

export async function GET() {
  if (!catalogPdfExists()) {
    return NextResponse.json({ error: "Catalog not available." }, { status: 404 });
  }

  const meta = getCatalogMeta();
  const buffer = fs.readFileSync(CATALOG_PDF_PATH);

  return new NextResponse(buffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${meta?.filename ?? "MMA-Catalog.pdf"}"`,
      "Content-Length": buffer.length.toString(),
    },
  });
}
