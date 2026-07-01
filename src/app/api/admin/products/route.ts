import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { addProduct, deleteProduct, getProducts, updateProduct } from "@/lib/db";

async function guard() {
  return await isAuthenticated();
}

export async function GET() {
  if (!(await guard())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json({ products: getProducts() });
}

export async function POST(req: NextRequest) {
  if (!(await guard())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  const product = addProduct({
    name: body.name,
    categoryId: body.categoryId,
    manufacturer: body.manufacturer || "",
    packSize: body.packSize || "",
    notes: body.notes || "",
    inStock: body.inStock ?? true,
  });
  return NextResponse.json({ success: true, product });
}

export async function PATCH(req: NextRequest) {
  if (!(await guard())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  const { id, ...data } = body;
  updateProduct(id, data);
  return NextResponse.json({ success: true });
}

export async function DELETE(req: NextRequest) {
  if (!(await guard())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await req.json();
  deleteProduct(id);
  return NextResponse.json({ success: true });
}
