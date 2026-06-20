import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db/mongo";
import { chatResponse } from "@/lib/service/chat.service";

interface ChatRequestBody {
  query: string;
  userId: string;
  docId: string;
}
export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { query, userId, docId }: ChatRequestBody = await req.json();

    if (!query || !userId || !docId) {
      return NextResponse.json(
        { error: "Query , docId and userId are required" },
        { status: 400 },
      );
    }

    const { ai_response, isDataFound, sources } = await chatResponse(
      query,
      userId,
      docId,
    );

    return NextResponse.json({
      ai_response,
      isDataFound,
      sources,
    });
  } catch (error) {
    console.error("Chat API Error:", error);

    return NextResponse.json(
      { error: "Failed to process query" },
      { status: 500 },
    );
  }
}

export async function GET() {
  return NextResponse.json({
    status: "ok",
  });
}
