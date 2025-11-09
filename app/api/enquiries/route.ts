import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import Enquiry from "@/models/Enquiry";

export async function GET() {
  await dbConnect();
  const list = await Enquiry.find({}).sort({ createdAt: -1 });
  return NextResponse.json(list);
}
export async function POST(req: Request) {
  await dbConnect();
  const { name, email, phone, message } = await req.json();
  if (!name || !message) return NextResponse.json({ error: "Missing name or message" }, { status: 400 });
  const created = await Enquiry.create({ name, email, phone, message });
  return NextResponse.json(created, { status: 201 });
}
