"use client";

import { useEffect, useState, useCallback } from "react";
import { Plus, Inbox } from "lucide-react";
import DocumentCard from "./DocumentCard";
import UploadModal from "./UploadModal";
import EditDocumentModal from "./EditDocumentModal";
import { DocumentItem } from "@/lib/types";
import { toast } from "sonner";
import Button from "../ui/Button";
import { getUserId } from "@/lib/user";

export default function DocumentList() {
  const [docs, setDocs] = useState<DocumentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [editDoc, setEditDoc] = useState<DocumentItem | null>(null);

  const fetchDocs = useCallback(async () => {
    const userId = getUserId();
    try {
      const res = await fetch(`/api/documents?userId=${userId}`);
      const data = await res.json();
      setDocs(data.documents || []);
    } catch {
      toast.error("Failed to load documents");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const userId = getUserId();

    const load = async () => {
      try {
        const res = await fetch(`/api/documents?userId=${userId}`);
        const data = await res.json();
        setDocs(data.documents || []);
      } catch {
        toast.error("Failed to load documents");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const handleDelete = async (doc: DocumentItem) => {
    if (!confirm(`Delete "${doc.title}"? This cannot be undone.`)) return;

    try {
      const res = await fetch(`/api/documents/${doc._id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Delete failed");

      toast.success("Document deleted");
      setDocs((prev) => prev.filter((d) => d._id !== doc._id));
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <div className="min-w-0">
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Your Documents</h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Upload and manage your AI knowledge base
          </p>
        </div>
        <Button
          onClick={() => setUploadOpen(true)}
          className="w-full sm:w-auto hover:bg-orange-300 hover:text-white hover:font-bold"
        >
          <Plus className="h-4 w-4" /> Upload Document
        </Button>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-20 rounded-2xl bg-slate-100 animate-pulse"
            />
          ))}
        </div>
      ) : docs.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 py-20 text-center px-4">
          <Inbox className="mb-4 h-10 w-10 text-slate-300" />
          <p className="font-medium text-slate-600">No documents yet</p>
          <p className="text-sm text-slate-400 mt-1">
            Upload a PDF or Word doc to get started
          </p>
          <Button onClick={() => setUploadOpen(true)} className="mt-4">
            <Plus className="h-4 w-4" /> Upload your first document
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          {docs.map((doc) => (
            <DocumentCard
              key={doc._id}
              doc={doc}
              onEdit={setEditDoc}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      <UploadModal
        open={uploadOpen}
        onClose={() => setUploadOpen(false)}
        onUploaded={fetchDocs}
      />
      <EditDocumentModal
        open={!!editDoc}
        onClose={() => setEditDoc(null)}
        document={editDoc}
        onUpdated={fetchDocs}
      />
    </div>
  );
}
