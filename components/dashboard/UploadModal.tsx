"use client";

import { useState } from "react";
import { toast } from "sonner";
import { UploadCloud } from "lucide-react";
import Button from "../ui/Button";
import Modal from "../ui/Modal";
import { getUserId } from "@/lib/user";

interface Props {
  open: boolean;
  onClose: () => void;
  onUploaded: () => void;
}

export default function UploadModal({ open, onClose, onUploaded }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);  
  const userId = getUserId();

  const handleSubmit = async () => {
    if (!file) {
      toast.error("Please select a file");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      toast.error("Max size is 10 MB");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("title", title || file.name);
      formData.append("userId", userId);

      const res = await fetch("/api/documents", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Upload failed");
      }
      console.log("data--", data);

      toast.success("Document uploaded! Processing started.");
      setFile(null);
      setTitle("");
      onUploaded();
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
    <Modal open={open} onClose={onClose} title="Upload Document">
      <div className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">
            Title (optional)
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="My document"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
          />
        </div>

        <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-300 p-8 text-center hover:border-brand-400">
          <UploadCloud className="h-8 w-8 text-slate-400" />
          <span className="text-sm text-slate-600">
            {file ? file.name : "Click to select PDF, DOCX, or TXT"}
          </span>
          <input
            type="file"
            accept=".pdf,.docx,.txt"
            className="hidden"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
        </label>

        <Button onClick={handleSubmit} loading={loading} className="w-full">
          Upload & Process
        </Button>
      </div>
    </Modal>
  );
}
