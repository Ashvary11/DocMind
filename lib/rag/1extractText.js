import fs from "fs/promises";
import path from "path";
import pdfParse from "pdf-parse";
import mammoth from "mammoth";

export async function extractText(doc) {
  // const filePath = path.join(process.cwd(), "files", fileName);
  const filePath = doc.filePath;

  const ext = path.extname(doc.fileName).toLowerCase();

  let content = "";

  switch (ext) {
    case ".txt":
      content = await fs.readFile(filePath, "utf8");
      break;

    case ".pdf": {
      const buffer = await fs.readFile(filePath);
      const result = await pdfParse(buffer);
      content = result.text;
      break;
    }

    case ".docx": {
      const result = await mammoth.extractRawText({
        path: filePath,
      });

      content = result.value;
      break;
    }

    default:
      throw new Error(`Unsupported file type: ${ext}`);
  }

  return content;
}

export async function saveText(text, outputFileName) {
  const outputPath = path.join(
    process.cwd(),
    "outputText",
    outputFileName + Date.now() + ".txt",
  );

  await fs.writeFile(outputPath, text, "utf8");

  return outputPath;
}
