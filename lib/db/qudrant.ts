import { QdrantClient } from "@qdrant/js-client-rest";

export const qdrant = new QdrantClient({
  url: process.env.CLUSTER_ENDPOINT,
  apiKey: process.env.QDRANT_API_KEY,
});


export const initQdrant = async () => {
  try {
    await qdrant.getCollection("docmind-documents");
    console.log("Qdrant collection exists");
  } catch {
    await qdrant.createCollection("docmind-documents", {
      vectors: {
        size: 3072,
        distance: "Cosine",
      },
    });

    console.log("Qdrant collection created");
  }
  // checking indexes exist
  try {
    await qdrant.createPayloadIndex("docmind-documents", {
      field_name: "userId",
      field_schema: "keyword",
    });

    await qdrant.createPayloadIndex("docmind-documents", {
      field_name: "documentId",
      field_schema: "keyword",
    });

    console.log("Payload indexes ready");
  } catch (error) {
    console.log("Indexes may already exist:", error);
  }
};
