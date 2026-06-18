export interface DocumentItem {
  _id: string;
  userId: string;
  title: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  status: "starting" | "processing" | "ready" | "failed";
  chunkCount: number;
  collectionName: string;
  createdAt: string;
  updatedAt: string;
}
