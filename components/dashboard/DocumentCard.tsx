"use client";

import Link from "next/link";
import {
  FileText,
  Pencil,
  Trash2,
  MessageCircle,
  Loader2,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { DocumentItem } from "@/lib/types";

interface Props {
  doc: DocumentItem;
  onEdit: (doc: DocumentItem) => void;
  onDelete: (doc: DocumentItem) => void;
}

const statusConfig = {
  starting: { icon: Loader2, color: "text-yellow-500", label: "Processing" },
  processing: { icon: Loader2, color: "text-amber-500", label: "Processing" },
  ready: { icon: CheckCircle2, color: "text-green-500", label: "Ready" },
  failed: { icon: AlertCircle, color: "text-red-500", label: "Failed" },
};

export default function DocumentCard({ doc, onEdit, onDelete }: Props) {

  console.log(doc._id);
  
  const status = statusConfig[doc.status];
  const StatusIcon = status.icon;

  return (
    <div className="flex items-center justify-between rounded-2xl border border-slate-200 p-4 transition hover:shadow-md">
      <div className="flex items-center gap-4">
        <div className="rounded-xl bg-brand-50 p-3">
          <FileText className="h-6 w-6 text-brand-500" />
        </div>
        <div>
          <h3 className="font-semibold text-slate-900">{doc.title}</h3>
          <div className="mt-1 flex items-center gap-3 text-xs text-slate-500">
            <span>{doc.fileName}</span>
            <span>•</span>
            <span>{(doc.fileSize / 1024).toFixed(1)} KB</span>
            <span>•</span>
            <span className={`flex items-center gap-1 ${status.color}`}>
              <StatusIcon
                className={`h-3 w-3 ${doc.status === "processing" ? "animate-spin" : ""}`}
              />
              {status.label}
              {doc.status === "ready"}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {doc.status === "ready" && (
          <Link
            href={`/chat/${doc._id}`}
            className="rounded-lg p-2 text-brand-500 hover:bg-brand-50"
            title="Chat with document"
          >
            <MessageCircle className="h-5 w-5" />
          </Link>
        )}
        <button
          onClick={() => onEdit(doc)}
          className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
          title="Rename"
        >
          <Pencil className="h-5 w-5" />
        </button>
        <button
          onClick={() => onDelete(doc)}
          className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-500"
          title="Delete"
        >
          <Trash2 className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
