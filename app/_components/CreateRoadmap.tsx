import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BookOpen, Sparkles } from "lucide-react";
import { useState } from "react";

export default function CreateRoadmap() {
  const [topic, setTopic] = useState("");
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-[-20%] left-[-10%] w-175 h-175 bg-blue-400/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-150 h-150 bg-indigo-400/10 rounded-full blur-[120px]" />
      </div>

      <div className="w-full max-w-2xl">
        <div className="relative bg-white/80 backdrop-blur-2xl border border-white shadow-[0_32px_64px_-15px_rgba(15,23,42,0.1)] rounded-[2.5rem] p-8 md:p-16 space-y-10">
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-linear-to-tr from-blue-600 to-indigo-500 p-4 rounded-2xl shadow-xl shadow-blue-200">
            <BookOpen className="w-8 h-8 text-white" />
          </div>

          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 leading-tight">
              What can I help <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-indigo-500">
                you learn today?
              </span>
            </h1>
            <p className="text-slate-500 text-lg max-w-md mx-auto">
              Type any subject and our AI will craft a custom curriculum just
              for you.
            </p>
          </div>

          <div className="space-y-4">
            <div className="group relative">
              <div className="absolute -inset-0.5 bg-linear-to-r from-blue-300 to-indigo-300 rounded-xl blur opacity-20 group-focus-within:opacity-40 transition duration-300"></div>
              <Input
                placeholder="e.g. Master React in 30 days"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="relative h-16 text-lg px-6 border-slate-200 bg-white rounded-xl focus-visible:ring-blue-500"
              />
            </div>

            <Button className="w-full h-16 text-lg font-bold rounded-xl bg-linear-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 shadow-lg shadow-blue-200/50 transition-all active:scale-[0.98]">
              <Sparkles className="mr-2 h-5 w-5" />
              Generate My Course
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
