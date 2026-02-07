"use client";

import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Rocket } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";

export default function CreateRoadmap() {
  const [step, setStep] = useState(1);
  const [title, setTitle] = useState("");
  const [purpose, setPurpose] = useState("");
  const [fade, setFade] = useState(true);

  const [questions, setQuestions] = useState<any[]>([]);
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState("");

  const [endDate, setEndDate] = useState<Date | undefined>();

  const progressPercentage = (step / 3) * 100;

  const prevStep = () => setStep((prev) => Math.max(1, prev - 1));

  const nextStep = () => {
    setFade(false);
    setTimeout(() => {
      setStep((prev) => prev + 1);
      setFade(true);
    }, 200);
  };
  const giveAnswer = async (id: string) => {
    const res = await fetch("/api/giveAnswer-project", {
      method: "PUT",
      body: JSON.stringify({
        id,
        answer,
      }),
    });
    if (res.ok) {
      setCurrentIndex((prev) => prev + 1);
      setAnswer("");
    }
  };
  const getAiQs = async () => {
    const res = await fetch("/api/projectQuestion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        roadmapId: "123",
        roadmapTitle: title,
        purpose,
        startDate,
        endDate,
      }),
    });

    const data = await res.json();
    setQuestions(data);
    setCurrentIndex(0);
    nextStep();
  };

  return (
    <div className="mx-auto w-[700px] p-[100px] border border-black">
      <div
        className={`transition-opacity duration-200 ${
          fade ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="flex items-center justify-between mb-16">
          {step > 1 ? (
            <Button
              onClick={prevStep}
              variant="ghost"
              className="flex items-center gap-2 text-black/40 hover:text-black"
            >
              <ChevronLeft className="w-5 h-5" />
              Back
            </Button>
          ) : (
            <div className="flex items-center gap-2 text-xs font-bold text-black/40">
              <Rocket size={12} /> New Journey
            </div>
          )}

          <span className="text-xs font-bold text-black/30">
            Step {step} / 3
          </span>
        </div>

        <div className="mb-16 bg-black/10 rounded-full h-[3px] overflow-hidden">
          <motion.div
            className="h-full bg-black"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="space-y-12"
          >
            {step === 1 && (
              <div className="space-y-8">
                <h1 className="text-6xl font-black">Project Identity</h1>

                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Master Backend Development"
                  className="w-full border-b-2 border-black/20 py-4 text-3xl outline-none"
                  autoFocus
                />

                <Button
                  disabled={!title.trim()}
                  onClick={nextStep}
                  className="h-14 px-10 bg-black text-white rounded-full"
                >
                  Continue
                </Button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-8">
                <h1 className="text-6xl font-black">The Mission</h1>

                <textarea
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                  placeholder="Describe your vision..."
                  className="w-full min-h-[220px] p-6 border rounded-2xl text-lg outline-none"
                  autoFocus
                />

                <Button
                  disabled={!purpose.trim()}
                  onClick={nextStep}
                  className="h-14 px-10 bg-black text-white rounded-full"
                >
                  Set Timeline
                </Button>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-10">
                <h1 className="text-6xl font-black">Time Frame</h1>

                <div className="grid grid-cols-2 gap-8">
                  <div className="p-6 border rounded-2xl">
                    <p className="mb-4 text-xs font-bold text-black/40">
                      Launch Date
                    </p>
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={setStartDate}
                    />
                  </div>

                  <div className="p-6 border rounded-2xl">
                    <p className="mb-4 text-xs font-bold text-black/40">
                      Target Date
                    </p>
                    <Calendar
                      mode="single"
                      selected={endDate}
                      onSelect={setEndDate}
                    />
                  </div>
                </div>

                <Button
                  disabled={!startDate || !endDate}
                  onClick={getAiQs}
                  className="h-16 px-14 bg-black text-white rounded-full"
                >
                  Generate Roadmap
                </Button>
              </div>
            )}
            {step === 4 && (
              <div className="space-y-10">
                <h1 className="text-6xl font-black">
                  {questions[currentIndex].text}
                </h1>

                <div className="grid grid-cols-2 gap-8">
                  <div className="p-6 border rounded-2xl">
                    <Input
                      onChange={(e) => setAnswer(e.target.value)}
                      value={answer}
                    />
                  </div>
                </div>

                <Button
                  onClick={() => giveAnswer(questions[currentIndex].id)}
                  className="h-16 px-14 bg-black text-white rounded-full"
                >
                  Next
                </Button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
