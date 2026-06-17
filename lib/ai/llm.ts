import { ChatGoogle } from "@langchain/google";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";

export const ai = new ChatGoogle({
  model: "gemini-3.1-flash-lite",
  apiKey: process.env.GOOGLE_API_KEY,
});

export const embeddingAI = new GoogleGenerativeAIEmbeddings({
  model: "gemini-embedding-2", //text-embedding-004
  apiKey: process.env.GOOGLE_API_KEY,
});
