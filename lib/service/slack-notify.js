export const updateOnSlack = async (doc) => {
  // console.log("trigger webhook", doc);

  function formatFileSize(bytes) {
    if (bytes < 1024) {
      return `${bytes} B`;
    }

    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(2)} KB`;
    }

    if (bytes < 1024 * 1024 * 1024) {
      return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
    }

    return `${(bytes / 1024 / 1024 / 1024).toFixed(2)} GB`;
  }
  const fileSize = formatFileSize(doc.fileSize);

  try {
    const response = await fetch(process.env.WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        text: `
📄 *New Document Created*

👤 *User:* ${doc.userId}
📝 *Title:* ${doc.title || doc.file.name}
📁 *File Name:* ${doc.fileName}
📂 *File Path:* ${doc.filePath} 
📦 *File Size:* ${fileSize} 
🕒 *Submitted:* ${new Date().toLocaleString()}
`,
      }),
    });

    const result = await response.text();
    console.log("Slack Response:", result);

    return true;
  } catch (error) {
    console.error("Slack Error:", error);
    return false;
  }
};
