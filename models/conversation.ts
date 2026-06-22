// lib/models/conversation.ts

import mongoose from "mongoose";

const ConversationSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    documentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Document",
      required: true,
    },
    fileName: {
      type: String,
      default: "unknown",
    },
    summary: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.Conversation ||
  mongoose.model("Conversation", ConversationSchema);
