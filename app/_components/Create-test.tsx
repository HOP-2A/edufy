import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ClipboardCheck, Clipboard } from "lucide-react";
import { useState } from "react";

export default function CreateTest() {
  const [topic, setTopic] = useState("");

  return (
    <div className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-[-10%] right-[-5%] w-125 h-125 bg-indigo-100/60 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] left-[-5%] w-150 h-150 bg-blue-100/50 rounded-full blur-[100px]" />
        <div className="absolute top-[40%] left-[20%] w-75 h-75 bg-cyan-50/50 rounded-full blur-[80px]" />
      </div>

      <div className="w-full max-w-3xl">
        <div className="bg-white/40 backdrop-blur-3xl border border-white/60 shadow-[0_32px_80px_-20px_rgba(30,58,138,0.08)] rounded-[3rem] p-8 md:p-16 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-linear-to-r from-blue-400 via-indigo-500 to-purple-500" />

          <div className="flex flex-col items-center text-center space-y-6 mb-12">
            <div className="p-4 bg-white rounded-2xl shadow-sm border border-slate-100 text-indigo-600">
              <Clipboard className="w-10 h-10" />
            </div>
            <div className="space-y-2">
              <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
                AI Test <span className="text-indigo-600">Generator</span>
              </h1>
              <p className="text-slate-500 text-lg">
                Turn any topic or document into a comprehensive assessment.
              </p>
            </div>
          </div>

          <div className="grid gap-8">
            {/* Topic Input */}
            <div className="space-y-3">
              <label className="text-sm font-bold text-slate-700 ml-1 uppercase tracking-wider">
                Assessment Subject
              </label>
              <Input
                placeholder="e.g. Advanced Organic Chemistry or AWS Solutions Architect"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="h-16 rounded-2xl border-slate-200/60 bg-white/80 text-lg shadow-sm focus:ring-indigo-500 transition-all"
              />
            </div>

            <Button className="w-full h-16 text-xl font-black rounded-2xl bg-slate-900 text-white hover:bg-indigo-600 transition-all duration-500 group relative overflow-hidden shadow-xl">
              <span className="relative z-10 flex items-center justify-center">
                <ClipboardCheck className="mr-2 w-6 h-6 transition-transform group-hover:scale-110" />
                Build My Test
              </span>
              <div className="absolute inset-0 bg-linear-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
