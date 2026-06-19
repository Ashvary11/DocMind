import { ai, embeddingAI } from "../ai/llm";
import { searchInVector } from "../rag/5retrive";

export const chatResponse = async (
  query: string,
  userId: string,
  docId: string,
) => {
  const queryEmbedding = await embeddingAI.embedQuery(query);
  // console.log("queryEmebedd", queryEmbedding);

  // Search vector DB
  const vectorResults = await searchInVector(queryEmbedding, userId, docId);

  // console.log(vectorResults);

  // Context from retrieved chunks
  const sources = vectorResults.map((item) => item.payload?.text ?? "");

  // Generate answer

  const ai_response = await ai.invoke(`
      You are a helpful pdf or text assistant. Answer the user's question using the context below.

      Context:
      ${sources}

      Question:
      ${query}
    `);
  // console.log("ai_response", ai_response);
  // console.log("sources", sources);

  const response = {
    ai_response: ai_response.text,
    sources,
  };
  return response;
};
