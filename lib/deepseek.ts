type ChatMessage = { role: "user" | "assistant"; content: string };

export async function askDeepSeek(messages: ChatMessage[], context: string) {
  const apiKey = process.env.DEEPSEEK_API_KEY;
  if (!apiKey) throw new Error("DEEPSEEK_API_KEY is not configured.");

  const response = await fetch("https://api.deepseek.com/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: process.env.DEEPSEEK_MODEL || "deepseek-chat",
      temperature: 0.2,
      max_tokens: 700,
      messages: [
        {
          role: "system",
          content: "You are the AI assistant for this AKOS portfolio. Answer only from the supplied career knowledge. If the answer is not supported, say that it is not documented. Never invent employers, skills, metrics, dates or project status.\n\nCAREER KNOWLEDGE:\n" + context,
        },
        ...messages,
      ],
    }),
  });

  if (!response.ok) throw new Error(`DeepSeek request failed: ${response.status}`);
  const data = (await response.json()) as { choices?: Array<{ message?: { content?: string } }> };
  return data.choices?.[0]?.message?.content?.trim() || "No answer was returned.";
}
