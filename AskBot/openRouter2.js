export const OPEN_ROUTER_API_KEY =
  "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";

export async function askOpenRouter(message) {
  const response = await fetch(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPEN_ROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:3000",
        "X-Title": "My Local AI",
      },
      body: JSON.stringify({
        model: "nvidia/nemotron-3-ultra-550b-a55b:free",
        messages: [
          {
            role: "user",
            content: message,
          },
        ],
      }),
    },
  );

  const data = await response.json();
  return data?.choices?.[0]?.message?.content ?? JSON.stringify(data);
}
