import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { SendHorizontal, UserCircle } from "lucide-react";
import { useState } from "react";

export default function AiTutor() {
  const [message, setMessage] = useState("");

  const suggestions = [
    "What roadmap should I pick?",
    "What are the best jobs for me?",
    "Give me a really difficult challenge",
    "Recommend me a topic I can learn in an hour",
  ];

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-[10%] left-[20%] w-125 h-125 bg-blue-100/40 rounded-full blur-[120px]" />
        <div className="absolute bottom-[20%] right-[10%] w-100 h-100 bg-indigo-100/30 rounded-full blur-[100px]" />
      </div>

      <div className="w-full max-w-3xl flex flex-col items-center space-y-12">
        <h1 className="text-5xl font-black text-slate-900 tracking-tight text-center">
          How can I help you?
        </h1>

        <div className="flex flex-wrap justify-center gap-3"></div>

        <div className="w-full space-y-3">
          {suggestions.map((text) => (
            <button
              key={text}
              className="w-full text-left px-6 py-4 bg-white/50 backdrop-blur-sm border border-slate-100 rounded-2xl text-slate-600 hover:bg-white hover:border-blue-200 hover:text-slate-900 transition-all group flex justify-between items-center"
              onClick={() => setMessage(text)}
            >
              <span className="font-medium">{text}</span>
              <SendHorizontal className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-blue-500" />
            </button>
          ))}
        </div>

        <div className="w-full space-y-4 pt-8">
          <div className="flex gap-3 justify-start">
            <Button
              variant="outline"
              className="rounded-xl border-slate-200 font-bold text-slate-600 bg-white hover:bg-slate-50"
            >
              <UserCircle className="mr-2 h-4 w-4" /> Personalize
            </Button>
          </div>

          <div className="relative group">
            <div className="absolute -inset-1 bg-linear-to-r from-blue-500 to-indigo-500 rounded-[2rem] blur opacity-15 group-focus-within:opacity-30 transition duration-500"></div>
            <div className="relative bg-white border border-slate-200 rounded-[1.5rem] p-2 shadow-sm">
              <Textarea
                placeholder="Ask me anything..."
                className="border-none focus-visible:ring-0 min-h-25 text-lg resize-none p-4"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <div className="flex justify-end p-2">
                <Button
                  className="rounded-xl bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 w-12 h-12 p-0 shadow-lg shadow-blue-200"
                  disabled={!message}
                >
                  <SendHorizontal className="h-5 w-5 text-white" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
