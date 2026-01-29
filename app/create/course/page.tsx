import Sidebar from "../../_components/SideBar";
export default function Home() {
  return (
    <div className="relative h-screen">
      <Sidebar />
      <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
        <div className="font-bold drop-shadow-lg pointer-events-auto text-4xl">
          What can help you to learn
          <div className="text-gray-500  text-base">
            Enter a topic below to generate a personalized course for it
          </div>
          <input />
        </div>
      </div>
    </div>
  );
}
