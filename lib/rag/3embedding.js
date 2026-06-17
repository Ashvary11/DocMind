import { embeddingAI } from "../ai/llm";

export async function embedChunks(chunks, userId = "124", fileName) {
  try {
    // console.log("API Key exists:", !!process.env.GOOGLE_API_KEY);
    // console.log(chunks);

    // console.time("embedding");

    const vectors = await embeddingAI.embedDocuments(chunks);

    // console.timeEnd("embedding");
    // console.log("Total vectors:", vectors.length);
    // console.log("Vector dimensions:", vectors[0].length);
    // console.log(vectors);
    // console.log(vectors[0]);
    // console.log(vectors[0]?.length);

    vectors.forEach((v, i) => {
      if (!Array.isArray(v) || v.length === 0) {
        console.log(`❌ Invalid embedding at index ${i}`);
        console.log("Chunk:", chunks[i]);
      }
    });

    //    Mapping the results safely alongside your metadata using the array index
    // const embeddedChunks = chunks.map((chunk, index) => {
    //   return {
    //     text: chunk,
    //     embedding: vectors[index], // embeddings is an array of number arrays [ [0.1, -0.2...], [...] ]
    //     metadata: {
    //       userId: userId,
    //       fileName: fileName,
    //       chunkIndex: index,
    //     },
    //   };
    // });
    const embeddedChunks = chunks
      .map((chunk, index) => ({
        text: chunk,
        embedding: vectors[index],
        metadata: {
          userId,
          fileName,
          chunkIndex: index,
        },
      }))
      .filter(
        (item) => Array.isArray(item.embedding) && item.embedding.length > 0,
      );
    // console.log("Sample item:", embeddedChunks);
    return embeddedChunks;
  } catch (error) {
    console.error("Failed to generate batched embeddings:", error);
    throw error;
  }
}
