"use client";
import { Calendar } from "@/components/ui/calendar";
import { Goal, LayersPlus, ArrowRight } from "lucide-react";
import { useState } from "react";

export default function CreateRoadmap() {
  const [step, setStep] = useState(1);
  const [title, setTitle] = useState("");
  const [purpose, setPurpose] = useState("");
  const [fade, setFade] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  console.log(startDate, "asdfadsf", endDate);
  const nextStep = () => {
    setFade(false);
    setTimeout(() => {
      setStep((prev) => prev + 1);
      setFade(true);
    }, 200);
  };
  const getAiQs = async () => {
    const res = await fetch("/api/projectQuestion", {
      method: "POST",
      body: JSON.stringify({
        roadmapId: "123",
        roadmapTitle: title,
        startDate,
        endDate,
        purpose,
      }),
    });
    const questions = await res.json();
    setQuestions(questions);
  };
  return (
    <div className="w-[600px] mx-auto w-[700px] border-6 p-[100px] border-black ">
      <div
        className={`transition-opacity duration-200 ${
          fade ? "opacity-100" : "opacity-0"
        }`}
      >
        {step === 1 && (
          <div className="space-y-8">
            <div className="space-y-3">
              <h1 className="text-5xl font-medium tracking-tight">
                Төслөө нэрлэнэ үү?
              </h1>
            </div>

            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Learn Web Development"
              className="w-full border-2 border-black p-4 text-xl focus:outline-none focus:ring-2 focus:ring-black transition-all"
              autoFocus
            />

            <button
              disabled={!title}
              onClick={nextStep}
              className="group flex items-center gap-2 px-6 py-3 bg-black text-white disabled:bg-gray-300 disabled:cursor-not-allowed transition-all hover:gap-3"
            >
              <span>Next</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-8">
            <div className="space-y-3">
              <h2 className="text-5xl font-medium tracking-tight">
                Энэ төсөлд та ямар зорилготой байна вэ?
              </h2>
            </div>

            <textarea
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              placeholder="Why do you want to learn this?"
              className="w-full border-2 border-black p-4 text-xl min-h-[160px] focus:outline-none focus:ring-2 focus:ring-black resize-none transition-all"
              autoFocus
            />

            <button
              disabled={!purpose}
              onClick={nextStep}
              className="group flex items-center gap-2 px-6 py-3 bg-black text-white disabled:bg-gray-300 disabled:cursor-not-allowed transition-all hover:gap-3"
            >
              <span>Generate Questions</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="flex flex-col gap-[60px] ">
            <div className="space-y-3">
              <h2 className="text-5xl font-medium tracking-tight">
                Ямар хугацаанд вэ?
              </h2>
            </div>
            <div className="flex gap-[30px]">
              <div>
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={setStartDate}
                  className="rounded-lg border"
                  captionLayout="dropdown"
                />
              </div>
              <div>
                <Calendar
                  mode="single"
                  selected={endDate}
                  onSelect={setEndDate}
                  className="rounded-lg border"
                  captionLayout="dropdown"
                />
              </div>
              <button
                disabled={false}
                onClick={getAiQs}
                className="group flex items-center gap-2 px-6 py-3 bg-black text-white disabled:bg-gray-300 disabled:cursor-not-allowed transition-all hover:gap-3"
              >
                <span>Generate Questions</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
