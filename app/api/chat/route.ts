import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db/mongo";
import { chatResponse } from "@/lib/service/chat.service";
import Conversation from "@/models/conversation";
import Message from "@/models/message";

interface ChatRequestBody {
  query: string;
  // userId: string;
  // docId: string;
  conversationId: string;
}
export async function POST(req: NextRequest) {
  try {
    await connectDB();

    // const { query, userId, docId }: ChatRequestBody = await req.json();
    const { query, conversationId }: ChatRequestBody = await req.json();

    if (!query || !conversationId) {
      return NextResponse.json(
        { error: "Query  and ConversationId are required" },
        { status: 400 },
      );
    }
    // ---------- Coverstion
    const conversation = await Conversation.findById(conversationId);
    if (!conversation) {
      return NextResponse.json(
        { error: "Conversation not found" },
        { status: 404 },
      );
    }

    const userId = conversation.userId;
    const docId = conversation.documentId.toString();
    // ---------- message save

    await Message.create({
      conversationId,
      role: "user",
      content: query,
    });

    // ---------- ai - reposnes

    const { ai_response, isDataFound, sources } = await chatResponse(
      query,
      userId,
      docId,
      conversationId
    );

    await Message.create({
      conversationId,
      role: "assistant",
      content: ai_response,
    });

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
