import { extractText, saveText } from "../rag/1extractText";
import { chunkTextLangchain } from "../rag/2chunk";
import { embedChunks } from "../rag/3embedding";

export const processData = async (doc) => {
  try {
    const { title, fileName, filePath, size, userId = "124" } = doc;

    const text = await extractText(doc);
    console.log("📄 Text length:", text.length, "chars");

    const outputPath = await saveText(text, doc.fileName);
    console.log("💾 Text saved:", outputPath);

    const chunks = await chunkTextLangchain(text);
    console.log("✂️ Chunks created:", chunks.length);

    console.log("🧩 First chunk size:", chunks[0]?.length, "chars");

    const embeddedChunks = await embedChunks(chunks, userId, doc.fileName);
    
    console.log("🧠 Embeddings generated:", embeddedChunks.length);

    console.log("📐 Vector dimensions:", embeddedChunks[0]?.embedding?.length);

    // await storeChunks(embeddedChunks);

    // console.log("done---");
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
