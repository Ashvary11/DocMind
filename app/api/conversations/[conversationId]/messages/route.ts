import { connectDB } from "@/lib/db/mongo";
import Message from "@/models/message";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ conversationId: string }> },
) {
  try {
    await connectDB();
    // console.log(params);
    const { conversationId } = await params;

    if (!conversationId) {
      return NextResponse.json(
        {
          error: "conversationId required",
        },
        { status: 400 },
      );
    }

    const messages = await Message.find({
      conversationId,
    }).sort({ createdAt: 1 });

    return NextResponse.json({
      success: true,
      messages,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to fetch messages" },
      { status: 500 },
    );
  }
}
