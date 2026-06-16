"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";

import { Send, FileText, Loader2 } from "lucide-react";
import { DocumentItem } from "@/app/types";
import { toast } from "sonner";

interface Message {
  role: "user" | "assistant";
  content: string;
  sources?: string[];
}

export default function ChatPage() {
  const { id } = useParams<{ id: string }>();
  const [doc, setDoc] = useState<DocumentItem | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch(`/api/documents/${id}`)
      .then((r) => r.json())
      .then((d) => setDoc(d.document))
      .catch(() => toast.error("Failed to load document"));
  }, [id]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const question = input.trim();
    setMessages((m) => [...m, { role: "user", content: question }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ documentId: id, question }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to get answer");

      setMessages((m) => [
        ...m,
        { role: "assistant", content: data.answer, sources: data.sources },
      ]);
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
    <div className="mx-auto flex h-screen max-w-3xl flex-col px-6 py-6">
      <div className="mb-4 flex items-center gap-3 border-b border-slate-200 pb-4">
        <div className="rounded-xl bg-brand-50 p-2">
          <FileText className="h-5 w-5 text-brand-500" />
        </div>
        <div>
          <h1 className="font-semibold text-slate-900">
            {doc?.title || "Loading..."}
          </h1>
          <p className="text-xs text-slate-500">
            Ask anything about this document
          </p>
        </div>
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto py-4">
        {messages.length === 0 && (
          <div className="flex h-full items-center justify-center text-sm text-slate-400">
            Start by asking a question about this document
          </div>
        )}

        {messages.map((m, i) => (
          <div
            key={i}
            className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm ${
                m.role === "user"
                  ? "bg-brand-500 text-white"
                  : "bg-slate-100 text-slate-800"
              }`}
            >
              <p className="whitespace-pre-wrap">{m.content}</p>
              {m.sources && m.sources.length > 0 && (
                <details className="mt-2 text-xs opacity-70">
                  <summary className="cursor-pointer">View sources</summary>
                  {m.sources.map((s, j) => (
                    <p key={j} className="mt-1 border-t border-slate-300 pt-1">
                      {s.slice(0, 200)}...
                    </p>
                  ))}
                </details>
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="flex items-center gap-2 rounded-2xl bg-slate-100 px-4 py-3 text-sm text-slate-500">
              <Loader2 className="h-4 w-4 animate-spin" /> Thinking...
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      <div className="flex items-center gap-2 border-t border-slate-200 pt-4">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Ask a question..."
          className="flex-1 rounded-lg border border-slate-300 px-4 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
        />
        <button
          onClick={handleSend}
          disabled={loading || !input.trim()}
          className="rounded-lg bg-brand-500 p-2.5 text-white hover:bg-brand-600 disabled:opacity-50 cursor-pointer"
        >
          <Send className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
