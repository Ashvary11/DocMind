export interface DocumentItem {
  _id: string;
  title: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  status: "processing" | "ready" | "failed";
  chunkCount: number;
  collectionName: string;
  createdAt: string;
  updatedAt: string;
}
