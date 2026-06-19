import { NextResponse } from "next/server";
import fs from "fs/promises";

import { connectDB } from "@/lib/db/mongo";
import Document from "@/models/document";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();

    const { id } = await params;

    const doc = await Document.findById(id);

    if (!doc) {
      return NextResponse.json(
        { error: "Document not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      document: doc,
    });
  } catch {
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();

    const { id } = await params;

    const doc = await Document.findById(id);

    if (!doc) {
      return NextResponse.json(
        { error: "Document not found" },
        { status: 404 },
      );
    }

    try {
      await fs.unlink(doc.filePath);
    } catch {}

    await doc.deleteOne();

    return NextResponse.json({
      success: true,
    });
  } catch {
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();

    const { id } = await params;
    const body = await req.json();

    const doc = await Document.findByIdAndUpdate(
      id,
      {
        title: body.title,
      },
      {
        new: true,
      },
    );

    return NextResponse.json({
      document: doc,
    });
  } catch {
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}
