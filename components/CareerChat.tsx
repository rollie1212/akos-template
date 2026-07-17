'use client';

import { FormEvent, useState } from "react";

type Message = { role: "user" | "assistant"; content: string };

export default function CareerChat() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent) {
    event.preventDefault();
    const question = input.trim();
    if (!question || loading) return;

    const nextMessages: Message[] = [...messages, { role: "user", content: question }];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages.slice(-12) }),
      });
      const data = await response.json();
      setMessages([...nextMessages, { role: "assistant", content: data.answer || data.error || "No answer returned." }]);
    } catch {
      setMessages([...nextMessages, { role: "assistant", content: "The assistant is unavailable." }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ position: "fixed", right: 20, bottom: 20, zIndex: 50 }}>
      {open ? (
        <section style={{ width: "min(380px, calc(100vw - 40px))", height: 500, display: "flex", flexDirection: "column", background: "white", border: "1px solid #e5e7eb", borderRadius: 16, boxShadow: "0 20px 60px rgba(0,0,0,.18)", overflow: "hidden" }}>
          <header style={{ display: "flex", justifyContent: "space-between", padding: 16, borderBottom: "1px solid #e5e7eb" }}>
            <strong>Ask this profile</strong>
            <button onClick={() => setOpen(false)} aria-label="Close chat">×</button>
          </header>
          <div style={{ flex: 1, overflowY: "auto", padding: 16 }}>
            {messages.length === 0 ? <p>Ask about experience, projects or skills.</p> : null}
            {messages.map((message, index) => <p key={index}><strong>{message.role === "user" ? "You" : "AI"}:</strong> {message.content}</p>)}
            {loading ? <p>Thinking…</p> : null}
          </div>
          <form onSubmit={submit} style={{ display: "flex", gap: 8, padding: 12, borderTop: "1px solid #e5e7eb" }}>
            <input value={input} onChange={(event) => setInput(event.target.value)} placeholder="Ask a question" maxLength={2000} style={{ flex: 1, padding: 10 }} />
            <button type="submit" disabled={loading}>Send</button>
          </form>
        </section>
      ) : (
        <button onClick={() => setOpen(true)} style={{ border: 0, borderRadius: 999, background: "#0f625c", color: "white", padding: "14px 18px", fontWeight: 700, boxShadow: "0 12px 30px rgba(0,0,0,.2)" }}>Ask this profile</button>
      )}
    </div>
  );
}
