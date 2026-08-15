import { askOpenRouter } from "./openRouter2.js";

const form = document.getElementById("form");
const input = document.getElementById("input");
const chat = document.getElementById("chat");

function appendMessage(text, cls = "bot") {
  const el = document.createElement("div");
  el.className = `msg ${cls}`;
  el.textContent = text;
  chat.appendChild(el);
  chat.scrollTop = chat.scrollHeight;
  return el;
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;
  appendMessage(text, "user");
  input.value = "";

  const placeholder = appendMessage("Thinking...", "bot loading");
  try {
    const reply = await askOpenRouter(text);
    placeholder.remove();
    appendMessage(reply, "bot");
  } catch (err) {
    placeholder.remove();
    appendMessage("Error: " + (err.message || err), "bot error");
  }
});
