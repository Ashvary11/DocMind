import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { ai, embeddingAI } from "../ai/llm";
import { searchInVector } from "../rag/5retrive";
import { z } from "zod";
import Message from "@/models/message";

export const chatResponse = async (
  query: string,
  userId: string,
  docId: string,
  conversationId: string,
) => {
  const queryEmbedding = await embeddingAI.embedQuery(query);
  // console.log("queryEmebedd", queryEmbedding);

  // Search vector DB
  const vectorResults = await searchInVector(queryEmbedding, userId, docId);

  // console.log(vectorResults);

  // Context from retrieved chunks
  const sources = vectorResults.map((item) => item.payload?.text ?? "");

  // Message hitry
  const history = await Message.find({
    conversationId,
  })
    .sort({ createdAt: -1 })
    .limit(10)
    .lean();

  // history.reverse();

  const chatHistory = history
    .map(
      (msg) => `
${msg.role.toUpperCase()}:
${msg.content}
`,
    )
    .join("\n");

  // Generate answer

  const AnswerSchema = z.object({
    answer: z.string(),
    isDataFound: z.boolean(),
  });
  // const structuredLlm = ai.withStructuredOutput(AnswerSchema);
  const structuredLlm = ai.withStructuredOutput(AnswerSchema, {
    includeRaw: true,
  });
  const systemPrompt = `You are an intelligent document assistant and you name is DocMind-Ai.

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
`;
  const userPrompt = `
Context:
${sources.join("\n\n")}

Previous Conversation:
${chatHistory}


Question:
${query}
`;
  const ai_response = await structuredLlm.invoke([
    new SystemMessage(systemPrompt),

    new HumanMessage(userPrompt),
  ]);

  // console.log("usage_metadata:", ai_response.raw.usage_metadata);

  //   console.log(`
  // ==================== FULL PROMPT

  // SYSTEM:
  // ${systemPrompt}

  // USER:
  // ${userPrompt}

  // =======================
  // `);

  // console.log("usage_metadata:", ai_response.raw);

  const response = {
    ai_response: ai_response.parsed.answer,
    isDataFound: ai_response.parsed.isDataFound,
    sources,
  };
  return response;
};
