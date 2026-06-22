import { connectDB } from "@/lib/db/mongo";
import Conversation from "@/models/conversation";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { userId, documentId } = await req.json();

    if (!userId || !documentId) {
      return NextResponse.json(
        {
          error: "userId and documentId are required",
        },
        { status: 400 },
      );
    }

    let conversation = await Conversation.findOne({
      userId,
      documentId,
    });

    if (!conversation) {
      conversation = await Conversation.create({
        userId,
        documentId,
      });
    }

    return NextResponse.json({
      success: true,
      conversationId: conversation._id,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to create conversation" },
      { status: 500 },
    );
  }
}
