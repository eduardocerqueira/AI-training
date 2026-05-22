"use client";

import {
  AssistantRuntimeProvider,
  useLocalRuntime,
  type ChatModelAdapter,
  type ThreadMessage,
} from "@assistant-ui/react";
import type { ReactNode } from "react";

import { postChat, type ChatHistoryItem } from "@/api/chat";

function messageText(message: ThreadMessage): string {
  return message.content
    .filter((part) => part.type === "text")
    .map((part) => part.text)
    .join("\n")
    .trim();
}

function toHistory(messages: readonly ThreadMessage[]): ChatHistoryItem[] {
  const history: ChatHistoryItem[] = [];
  for (const message of messages) {
    if (message.role === "user" || message.role === "assistant") {
      history.push({ role: message.role, content: messageText(message) });
    }
  }
  return history;
}

const ragAdapter: ChatModelAdapter = {
  async run({ messages, abortSignal }) {
    if (messages.length === 0) {
      throw new Error("No messages to send");
    }

    const last = messages[messages.length - 1];
    if (last.role !== "user") {
      throw new Error("Last message must be from the user");
    }

    const message = messageText(last);
    const history = toHistory(messages.slice(0, -1));

    const { answer, sources } = await postChat(message, history, abortSignal);

    const sourceNote =
      sources.length > 0
        ? `\n\n---\n*Sources: ${sources.join(", ")}*`
        : "";

    return {
      content: [{ type: "text", text: `${answer}${sourceNote}` }],
    };
  },
};

export function RuntimeProvider({ children }: { children: ReactNode }) {
  const runtime = useLocalRuntime(ragAdapter);
  return (
    <AssistantRuntimeProvider runtime={runtime}>
      {children}
    </AssistantRuntimeProvider>
  );
}
