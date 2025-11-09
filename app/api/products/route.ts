import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import Product from "@/models/Product";

export async function GET() {
  await dbConnect();
  const items = await Product.find({}).sort({ createdAt: -1 });
  return NextResponse.json(items);
}

export async function POST(req: Request) {
  await dbConnect();
  const { name, hsn, retailMrp, wholesaleMrp, imageBase64 } = await req.json();
  if (!name || !hsn) return NextResponse.json({ error: "Missing name or HSN" }, { status: 400 });
  const created = await Product.create({ name, hsn, retailMrp: +retailMrp, wholesaleMrp: +wholesaleMrp, imageBase64 });
  return NextResponse.json(created, { status: 201 });
}
