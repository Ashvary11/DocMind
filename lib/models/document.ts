// lib/models/document.ts
import mongoose from "mongoose";

const DocumentSchema = new mongoose.Schema(
  {
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
    size: Number,
    status: {
      type: String,
      default: "processing",
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.Document ||
  mongoose.model("Document", DocumentSchema);
