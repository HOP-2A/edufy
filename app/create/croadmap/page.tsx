"use client";
import Sidebar from "@/app/_components/SideBar";
import { useProvider } from "@/providers/AuthProviders";
import { useRouter } from "next/navigation";
import { useState } from "react";
const resourceType = ["Video", "Book", "Documentation", "Tutorial", "Practice"];
export default function HOME() {
  const [title, setTitle] = useState("");
  const [ltitle, setlTitle] = useState("");
  const [content, setContent] = useState("");
  const [type, setType] = useState("");
  const [purpose, setPurpose] = useState("");
  const [step, setStep] = useState(1);
  const router = useRouter();
  const [learningSections, setLearningSection] = useState<
    { ltitle: string; content: string; type: string }[]
  >([]);
  const add = () => {
    setLearningSection((prev) => [...prev, { ltitle, content, type }]);
    setlTitle("");
    setContent("");
    setType("");
  };
  const { user } = useProvider();
  const createRoadmap = async () => {
    const res = await fetch("/api/croadmap", {
      method: "POST",
      body: JSON.stringify({
        title,
        purpose,
        userId: user?.id,
        learningSections,
      }),
    });
    if (res.ok) router.push("/mainMenu");
  };
  return (
    <div className="flex text-white">
      <Sidebar />
      <div>
        {step === 1 && (
          <div>
            set title
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <button onClick={() => setStep((prev) => prev + 1)}>next</button>
          </div>
        )}
        {step === 2 && (
          <div>
            set purpose
            <input
              type="text"
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
            />
            <button onClick={() => setStep((prev) => prev + 1)}>next</button>
          </div>
        )}
        {step === 3 && (
          <div>
            Learning section title
            <input
              type="text"
              value={ltitle}
              onChange={(e) => setlTitle(e.target.value)}
            />
            learning section content
            <input
              type="text"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <select value={type} onChange={(e) => setType(e.target.value)}>
              <option value="">Select Value</option>
              {resourceType.map((source, index) => {
                return (
                  <option value={source} key={index}>
                    {source}
                  </option>
                );
              })}
            </select>
            <button onClick={add}>add</button>
            <div>
              {learningSections.map((section, index) => {
                return (
                  <div key={index}>
                    {section.content}
                    {section.ltitle}
                    {section.type}
                  </div>
                );
              })}
            </div>
            <button onClick={() => createRoadmap()}>Create</button>
          </div>
        )}
      </div>
    </div>
  );
}
