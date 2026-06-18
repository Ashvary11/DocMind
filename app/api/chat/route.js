// app/api/chat/route.ts

import { NextResponse } from "next/server";

import { connectDB } from "@/lib/db";
import { searchInVector } from "@/lib/qdrant/qudrantSearch";
import { ai, embeddingAI } from "@/lib/ai/llm";

export async function POST(req) {
  try {
    await connectDB();

    const { query, userId, docId } = await req.json();

    if (!query || !userId || !docId) {
      return NextResponse.json(
        { error: "Query , docId and userId are required" },
        { status: 400 },
      );
    }

    const queryEmbedding = await embeddingAI.embedQuery(query);
    // console.log("queryEmebedd", queryEmbedding);

    // Search vector DB
    const vectorResults = await searchInVector(queryEmbedding, userId, docId);

    // console.log(vectorResults);

    // Context from retrieved chunks
    const sources = vectorResults.map((item) => item.payload?.text ?? "");


    console.log("retrived data",sources);
    
    // Generate answer

    const response = await ai.invoke(`
      You are a helpful pdf or text assistant. Answer the user's question using the context below.

      Context:
      ${sources}

      Question:
      ${query}
    `);

    console.log(response);
    const answer = response.content;

    return NextResponse.json({
      answer,
      sources: sources,
    });
  } catch (error) {
    console.error(error);

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
