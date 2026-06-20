import { NextResponse } from "next/server";
import os from "os";
import fs from "fs/promises";
import path from "path";
import { connectDB } from "@/lib/db/mongo";
import Document from "@/models/document";
import { processData } from "@/lib/service/document.service";

export async function POST(req: Request) {
  try {
    await connectDB();

    const formData = await req.formData();

    const file = formData.get("file") as File | null;
    const title = formData.get("title") as string;
    const userId = formData.get("userId") as string;

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const MAX_SIZE = 10 * 1024 * 1024; // 10 MB

    if (file.size > MAX_SIZE) {
      return NextResponse.json({ error: "File too large" }, { status: 400 });
    }

    const allowedExt = [".pdf", ".docx", ".txt"];
    const ext = file.name.slice(file.name.lastIndexOf(".")).toLowerCase();

    if (!allowedExt.includes(ext)) {
      return NextResponse.json(
        { error: "Invalid file extension" },
        { status: 400 },
      );
    }

    const allowedTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "text/plain",
    ];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: "Invalid file type" }, { status: 400 });
    }

    // Convertnig File -> Buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Saving process file locally
      // const uploadDir = path.join(process.cwd(), "uploads");

    //for vercel
    const uploadDir = path.join(os.tmpdir(), "uploads")

    await fs.mkdir(uploadDir, { recursive: true });

    const filePath = path.join(uploadDir, file.name);
    await fs.writeFile(filePath, buffer);

    const doc = await Document.create({
      userId,
      title: title || file.name,
      fileName: file.name,
      filePath, 
      fileSize: file.size,
      status: "starting",
    });

    // the main processing for rag
    const result = await processData(doc);

    return NextResponse.json({
      success: true,
      document: doc,
      dataResult: result?.success ? result : false,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to upload document" },
      { status: 500 },
    );
  }
}

export async function GET(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 },
      );
    }

    const documents = await Document.find({ userId }).sort({
      createdAt: -1,
    });

    return NextResponse.json({ documents });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch documents" },
      { status: 500 },
    );
  }
}
