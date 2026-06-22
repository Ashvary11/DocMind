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
    <div className="flex items-start sm:items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-3 transition hover:shadow-md hover:border-slate-300 min-w-0">
      {/* Left: icon + info */}
      <div className="flex items-start sm:items-center gap-3 min-w-0 flex-1">
        <div className="shrink-0 rounded-xl bg-brand-50 p-2">
          <FileText className="h-5 w-5 text-brand-500" />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold text-slate-900 truncate">{doc.title}</h3>
          <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-500">
            <span className="truncate max-w-[160px]">{doc.fileName}</span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline">
              {(doc.fileSize / 1024).toFixed(1)} KB
            </span>
            <span>•</span>
            <span className={`flex items-center gap-1 ${status.color}`}>
              <StatusIcon
                className={`h-3 w-3 ${doc.status === "processing" ? "animate-spin" : ""}`}
              />
              {status.label}
            </span>
          </div>
        </div>
      </div>

      {/* Right: actions */}
      <div className="flex shrink-0 items-center gap-1">
        {doc.status === "ready" && (
          <Link
            href={`/chat/${doc._id}`}
            className="rounded-lg p-2 text-brand-500 hover:bg-brand-50 transition-colors"
            title="Chat with document"
          >
            <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5" />
          </Link>
        )}
        <button
          onClick={() => onEdit(doc)}
          className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
          title="Rename"
        >
          <Pencil className="h-4 w-4 sm:h-5 sm:w-5" />
        </button>
        <button
          onClick={() => onDelete(doc)}
          className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-500 transition-colors"
          title="Delete"
        >
          <Trash2 className="h-4 w-4 sm:h-5 sm:w-5" />
        </button>
      </div>
    </div>
  );
}
