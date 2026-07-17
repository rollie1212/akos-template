import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { askDeepSeek } from "@/lib/deepseek";
import { loadKnowledge } from "@/lib/knowledge";

export const runtime = "nodejs";

const RequestSchema = z.object({
  messages: z.array(z.object({
    role: z.enum(["user", "assistant"]),
    content: z.string().min(1).max(2000),
  })).min(1).max(12),
});

export async function POST(request: NextRequest) {
  try {
    const parsed = RequestSchema.safeParse(await request.json().catch(() => null));
    if (!parsed.success) return NextResponse.json({ error: "Invalid request." }, { status: 400 });

    const context = loadKnowledge()
      .map((document) => `SOURCE: ${document.path}\n# ${document.title}\n${document.content}`)
      .join("\n\n---\n\n")
      .slice(0, 50000);

    if (!context.trim()) {
      return NextResponse.json({ error: "Add at least one Markdown file to knowledge/." }, { status: 500 });
    }

    return NextResponse.json({ answer: await askDeepSeek(parsed.data.messages, context) });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "The assistant is unavailable." }, { status: 500 });
  }
}
