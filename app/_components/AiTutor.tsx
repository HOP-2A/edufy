"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { SendHorizontal, UserCircle, Sparkles, Loader2 } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface Message {
  role: "user" | "assistant";
  content: string;
}
export default function AiTutor() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const suggestions = [
    "What roadmap should I pick?",
    "What are the best jobs for me?",
    "Give me a really difficult challenge",
    "Recommend me a topic I can learn in an hour",
  ];

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = message;
    setMessage("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/ai-chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage,
          history: messages,
        }),
      });

      if (!response.ok) throw new Error("Failed to get response");

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.response },
      ]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Уучлаарай, алдаа гарлаа. Дахин оролдоно уу.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-6 bg-[#fafafa]">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[-10%] left-[20%] w-150 h-150 bg-black/2 rounded-full blur-[120px]" />
      </div>
      <div className="w-full max-w-2xl flex flex-col items-center space-y-12">
        <div className="space-y-4 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-black/6 text-[10px] font-black uppercase tracking-[0.2em] text-black/40 shadow-sm">
            <Sparkles size={11} /> One time AI
          </div>
          <h1 className="text-5xl md:text-6xl font-[1000] text-black tracking-[-0.05em]">
            Би танд яаж туслах вэ?
          </h1>
        </div>
        {messages.length > 0 && (
          <div className="w-full space-y-4 max-h-100 overflow-y-auto">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={cn(
                  "p-4 rounded-2xl",
                  msg.role === "user"
                    ? "bg-black text-white ml-auto max-w-[80%]"
                    : "bg-white border border-black/5 mr-auto max-w-[80%]",
                )}
              >
                <p className="text-sm font-medium">{msg.content}</p>
              </div>
            ))}
            {isLoading && (
              <div className="bg-white border border-black/5 p-4 rounded-2xl mr-auto max-w-[80%]">
                <Loader2 className="h-5 w-5 animate-spin" />
              </div>
            )}
          </div>
        )}
        {messages.length === 0 && (
          <div className="w-full space-y-2.5">
            {suggestions.map((text) => (
              <button
                key={text}
                className="w-full text-left px-6 py-4.5 bg-white border border-black/5 rounded-4xl text-[13px] font-bold text-black/50 hover:text-black hover:border-black/10 hover:shadow-sm transition-all duration-300 group flex justify-between items-center"
                onClick={() => setMessage(text)}
              >
                <span className="tracking-tight">{text}</span>
                <SendHorizontal className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-black/20" />
              </button>
            ))}
          </div>
        )}
        <div className="w-full space-y-5 pt-4">
          <div className="flex justify-start px-1">
            <Button
              variant="ghost"
              className="h-8 rounded-full text-[10px] font-black uppercase tracking-widest text-black/60 hover:text-black hover:bg-transparent p-0"
            >
              <UserCircle className="mr-2 h-4 w-4" /> Personalize AI Experience
            </Button>
          </div>
          <div className="relative bg-white border border-black/8 rounded-[2rem] p-3.5 shadow-[0_15px_40px_rgba(0,0,0,0.03)] focus-within:shadow-[0_20px_50px_rgba(0,0,0,0.06)] transition-all duration-500">
            <Textarea
              placeholder="Ask me anything..."
              className="border-none focus-visible:ring-0 min-h-30 text-[1.15rem] font-bold tracking-tight resize-none p-4 placeholder:text-black/40 text-black leading-snug"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
            />
            <div className="flex justify-end p-2">
              <Button
                onClick={handleSendMessage}
                className={cn(
                  "rounded-full w-12 h-12 p-0 shadow-xl transition-all duration-500 active:scale-95",
                  message
                    ? "bg-black text-white shadow-black/10"
                    : "bg-black/5 text-black/10 shadow-none",
                )}
                disabled={!message || isLoading}
              >
                {isLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin stroke-[2.5px]" />
                ) : (
                  <SendHorizontal className="h-5 w-5 stroke-[2.5px]" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
