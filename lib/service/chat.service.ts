import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { ai, embeddingAI } from "../ai/llm";
import { searchInVector } from "../rag/5retrive";
import { z } from "zod";

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

  const AnswerSchema = z.object({
    answer: z.string(),
    isDataFound: z.boolean(),
  });
  const structuredLlm = ai.withStructuredOutput(AnswerSchema);

  const ai_response = await structuredLlm.invoke([
    new SystemMessage(`
You are an intelligent document assistant.

Answer questions using ONLY the provided document context.

Core Rules:
- Never invent, assume, or hallucinate information.
- Base every answer strictly on the provided context.
- If the answer cannot be found in the context, return:
  - isDataFound: false
  - a natural and helpful response explaining that the information is unavailable.
- If the answer exists in the context, return:
  - isDataFound: true
  - a clear answer based on the document.

Response Style:
- Be conversational, professional, and easy to understand.
- Answer the user's question directly.
- Adapt the response length to the question.
- Keep simple answers short.
- Provide more detail only when it adds value.
- Avoid repeating information unnecessarily.
- Avoid robotic or template-like responses.

Formatting:
- Choose the most readable format automatically.
- Use plain text for simple answers.
- Use lists when presenting multiple items.
- Use sections only when the answer contains multiple topics.
- Use tables only when comparing information.
- Keep spacing clean and compact.
- Prioritize clarity over formatting.

Your goal is to help the user quickly understand the information found in the document.
`),

    new HumanMessage(`
Context:
${sources.join("\n\n")}

Question:
${query}
`),
  ]);
  // console.log("ai_response", ai_response);
  // console.log("sources", sources);

  const response = {
    ai_response: ai_response.answer,
    isDataFound: ai_response.isDataFound,
    sources,
  };
  return response;
};
