"use client";

import { DocumentItem } from "@/lib/types";
import { useState } from "react";
import { toast } from "sonner";
import Modal from "../ui/Modal";
import Button from "../ui/Button";

interface Props {
  open: boolean;
  onClose: () => void;
  document: DocumentItem | null;
  onUpdated: () => void;
}

export default function EditDocumentModal({
  open,
  onClose,
  document,
  onUpdated,
}: Props) {
  const [title, setTitle] = useState(document?.title || "");
  const [loading, setLoading] = useState(false);

  if (!document) return null;
  console.log(document);

  const handleSave = async () => {
    if (!title.trim()) {
      toast.error("Title cannot be empty");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`/api/documents/${document._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      });

      if (!res.ok) throw new Error("Update failed");

      toast.success("Document updated");
      onUpdated();
      onClose();
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose} title="Rename Document">
      <div className="space-y-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
        />
        <Button onClick={handleSave} loading={loading} className="w-full">
          Save Changes
        </Button>
      </div>
    </Modal>
  );
}
