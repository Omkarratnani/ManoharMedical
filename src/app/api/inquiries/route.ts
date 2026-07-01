import { NextRequest, NextResponse } from "next/server";
import { addInquiry } from "@/lib/db";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { companyName, contactPerson, phone, licenseNo, productsInterested, message } = body;

  if (!companyName || !contactPerson || !phone) {
    return NextResponse.json({ error: "Company name, contact person, and phone are required." }, { status: 400 });
  }

  const inquiry = addInquiry({
    companyName,
    contactPerson,
    phone,
    licenseNo: licenseNo || "",
    productsInterested: productsInterested || "",
    message: message || "",
  });

  return NextResponse.json({ success: true, inquiry });
}
