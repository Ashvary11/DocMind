import { extractText, saveText } from "../rag/1extractText";
import { chunkTextLangchain } from "../rag/2chunk";
import { embedChunks } from "../rag/3embedding";
import { storeInQdrantDB } from "../rag/4storeInDb";

export const processData = async (doc) => {
  try {
    const { title, fileName, filePath, size, userId } = doc;

    const text = await extractText(doc);
    console.log("📄 Text length:", text.length, "chars");

    const outputPath = await saveText(text, doc.fileName);
    console.log("💾 Text saved:", outputPath);

    const chunks = await chunkTextLangchain(text);
    console.log("✂️ Chunks created:", chunks.length);
    // console.log("✂️ Chunks:", chunks);

    // console.log("🧩 First chunk size:", chunks[0]?.length, "chars");

    // chunks.forEach((chunk, index) => {
    //   console.log(
    //     `\n========== CHUNK ${index + 1} (${chunk.length} chars) ==========\n`,
    //   );
    //   console.log(chunk);
    // });

    const embeddedChunks = await embedChunks(chunks, userId, doc.fileName);

    console.log("🧠 Embeddings generated:", embeddedChunks.length);

    console.log("📐 Vector dimensions:", embeddedChunks[0]?.embedding?.length);

    await storeInQdrantDB(embeddedChunks, doc);

    console.log("done---");
    return {
      success: true,
      extractText: text.length > 1 ? true : false,
      saveText: outputPath ? true : false,
      chars: text.length,
      // chunks: chunks,
      embeddedChunks,
      // vectorsStored: embeddedChunks.length,
      // preview: text.slice(0, 500),
    };
  } catch (error) {
    console.log(error);
  }
};
