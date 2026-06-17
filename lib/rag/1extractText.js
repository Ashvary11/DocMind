import fs from "fs/promises";
import path from "path";
// import { PDFParse } from "pdf-parse";
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

    // case ".pdf": {
    //   const parser = new PDFParse({
    //     url: filePath,
    //   });

    //   const result = await parser.getText();

    //   content = result.text;

    //   await parser.destroy();
    //   break;
    // }
    // case ".pdf": {
    //   const buffer = fs.readFileSync(filePath);
    //   const data = await pdf(buffer);
    //   content = data.text;
    //   break;
    // }

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
