// lib/models/document.ts
import mongoose from "mongoose";

const DocumentSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    fileName: {
      type: String,
      required: true,
    },
    filePath: {
      type: String,
      required: true,
    },
    textFilePath: {
      type: String,
    },
    fileSize: Number,
    status: {
      type: String,
      default: "starting",
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.Document ||
  mongoose.model("Document", DocumentSchema);
