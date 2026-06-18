import { qdrant } from "../db";

export const searchInVector = async (
  queryEmbedding: number[],
  userId: string,
  docId: string,
) => {
  try {
    const results = await qdrant.search("docmind-documents", {
      vector: queryEmbedding,
      limit: 5,
      filter: {
        must: [
          {
            key: "userId",
            match: {
              value: userId,
            },
          },
          {
            key: "documentId",
            match: {
              value: docId,
            },
          },
        ],
      },
    });

    console.log(results);
    return results;
  } catch (error) {
    console.log(error);
    return error;
  }
};
