import crypto from "crypto";
import { initQdrant, qdrant } from "../db";
import Document from "@/lib/models/document";

export const storeInQdrantDB = async (embeddedChunks, doc) => {
  try {
    await initQdrant();

    await Document.findByIdAndUpdate(doc._id, {
      status: "processing",
    });
    // ------

    const points = embeddedChunks.map((chunk) => ({
      id: crypto.randomUUID(),

      vector: chunk.embedding,

      payload: {
        text: chunk.text,
        userId: chunk.metadata.userId,
        documentId: String(doc._id),
        fileName: chunk.metadata.fileName,
        chunkIndex: chunk.metadata.chunkIndex,
      },
    }));

    await qdrant.upsert("docmind-documents", {
      wait: true,
      points,
    });
    //----
    await Document.findByIdAndUpdate(doc._id, {
      status: "ready",
    });

    console.log(`Stored ${points.length} chunks`);
  } catch (error) {
    await Document.findByIdAndUpdate(doc._id, {
      status: "failed",
    });
  }
};
