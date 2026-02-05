"use client";

import { Calendar } from "@/components/ui/calendar";
import { ChevronLeft, Rocket } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

export default function CreateRoadmap() {
  const [step, setStep] = useState(1);
  const [title, setTitle] = useState("");
  const [purpose, setPurpose] = useState("");
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const progressPercentage = (step / 3) * 100;

  return (
    <div className="min-h-screen bg-[#fafafa] text-black">
      <div className="absolute top-0 right-0 -z-10 h-125 w-125 rounded-full bg-black/[0.02] blur-[120px]" />
      <div className="absolute bottom-0 left-0 -z-10 h-100 w-100 rounded-full bg-black/[0.01] blur-[100px]" />

      <div className="relative max-w-5xl mx-auto px-6 py-12 md:py-20">
        <div className="flex items-center justify-between mb-16">
          {step > 1 ? (
            <Button
              onClick={prevStep}
              variant="ghost"
              className="group flex items-center gap-2 text-black/40 hover:text-black hover:bg-black/[0.03] rounded-full px-6 h-12 font-bold transition-all"
            >
              <ChevronLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
              Back
            </Button>
          ) : (
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-black/[0.06] text-[10px] font-black uppercase tracking-[0.2em] text-black/40 shadow-sm">
              <Rocket size={11} /> New Journey
            </div>
          )}

          <div className="flex items-center gap-4">
            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-black/20">
              Step {step} / 3
            </span>
          </div>
        </div>

        <div className="mb-20 bg-black/[0.03] rounded-full h-[3px] overflow-hidden">
          <motion.div
            className="h-full bg-black"
            initial={{ width: "0%" }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="space-y-12"
          >
            {step === 1 && (
              <div className="space-y-12">
                <div className="space-y-6">
                  <h1 className="text-5xl md:text-7xl font-[1000] tracking-[-0.05em] text-black">
                    Project <br /> Identity
                  </h1>
                  <p className="text-xl font-bold text-black/40 tracking-tight max-w-lg">
                    Define the core name of your next big achievement.
                  </p>
                </div>

                <div className="relative group max-w-3xl">
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Master Backend Development"
                    className="w-full bg-transparent border-b-2 border-black/[0.08] focus:border-black py-6 text-3xl md:text-5xl font-[1000] tracking-tighter outline-none transition-all placeholder:text-black/[0.05]"
                    autoFocus
                  />
                </div>

                <motion.div
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-block"
                >
                  <Button
                    disabled={!title.trim()}
                    onClick={nextStep}
                    className="h-16 px-12 bg-black text-white rounded-[2rem] text-[11px] font-black uppercase tracking-[0.2em] hover:bg-black/80 transition-all"
                  >
                    Continue
                  </Button>
                </motion.div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-12">
                <div className="space-y-6">
                  <h1 className="text-5xl md:text-7xl font-[1000] tracking-[-0.05em] text-black">
                    The <br /> Mission
                  </h1>
                  <p className="text-xl font-bold text-black/40 tracking-tight max-w-lg">
                    What is the ultimate purpose of this roadmap?
                  </p>
                </div>

                <div className="max-w-3xl">
                  <textarea
                    value={purpose}
                    onChange={(e) => setPurpose(e.target.value)}
                    placeholder="Describe your vision..."
                    className="w-full bg-white border border-black/[0.06] rounded-[2rem] p-8 text-xl font-bold min-h-[250px] outline-none shadow-[0_30px_60px_rgba(0,0,0,0.02)] focus:border-black/20 transition-all placeholder:text-black/10 resize-none"
                    autoFocus
                  />
                </div>

                <div className="flex gap-4">
                  <Button
                    disabled={!purpose.trim()}
                    onClick={nextStep}
                    className="h-16 px-12 bg-black text-white rounded-[2rem] text-[11px] font-black uppercase tracking-[0.2em] hover:bg-black/80 transition-all"
                  >
                    Set Timeline
                  </Button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-12">
                <div className="space-y-6">
                  <h1 className="text-5xl md:text-7xl font-[1000] tracking-[-0.05em] text-black">
                    Time <br /> Frame
                  </h1>
                  <p className="text-xl font-bold text-black/40 tracking-tight max-w-lg">
                    When do we start and finish?
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-4xl">
                  <div className="bg-white border border-black/[0.06] p-8 rounded-[2.5rem] shadow-sm">
                    <span className="text-[10px] font-black uppercase tracking-widest text-black/30 block mb-6">
                      Launch Date
                    </span>
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={setStartDate}
                      captionLayout="dropdown"
                      className="mx-auto"
                    />
                  </div>

                  <div className="bg-white border border-black/[0.06] p-8 rounded-[2.5rem] shadow-sm">
                    <span className="text-[10px] font-black uppercase tracking-widest text-black/30 block mb-6">
                      Target Date
                    </span>
                    <Calendar
                      mode="single"
                      selected={endDate}
                      onSelect={setEndDate}
                      captionLayout="dropdown"
                      className="mx-auto"
                    />
                  </div>
                </div>

                <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    disabled={!startDate || !endDate}
                    className="h-20 px-16 bg-black text-white rounded-[2.5rem] text-[12px] font-black uppercase tracking-[0.3em] hover:bg-black/80 transition-all shadow-xl shadow-black/10"
                  >
                    Generate Roadmap
                  </Button>
                </motion.div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
