"use client";
import { useProvider } from "@/providers/AuthProviders";
import Sidebar from "../_components/SideBar";
import { Mail, MapPin, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { Roadmap } from "../user/course/page";
type post = {
  id: string;
  images: string[];
  caption: string;
  category: string;
};
export default function Profile() {
  const { user } = useProvider();
  const [posts, setPosts] = useState<post[]>([]);
  const [maps, setMaps] = useState<Roadmap[]>([]);
  useEffect(() => {
    if (!user?.id) return;

    const getSavedItems = async () => {
      const res = await fetch(`/api/saved/${user.id}`);
      const data = await res.json();
      console.log(data);
      setPosts(data.savedPosts || []);
      setMaps(data.savedMaps || []);
    };

    getSavedItems();
  }, [user]);
  return (
    <div className="w-[100vw] h-[100vh] flex">
      <div className="">
        <Sidebar />
      </div>
      <div className="w-[90%] h-[100%] flex justify-center items-center">
        <div className="w-[80%] h-[80%] flex justify-between ">
          <div className="w-[47%] h-[100%] border-4 rounded-[80px] content flex flex-col  justify-evenly">
            <div className="px-[50px]">
              <div className=" rounded-2xl p-6 space-y-6">
                <div className="flex items-center gap-8">
                  <img
                    src={user?.profilePic}
                    alt="profile"
                    className="w-[120px] h-[120px] rounded-full object-cover "
                  />

                  <div className="text-2xl font-bold">
                    {user?.username || "Username"}
                  </div>
                </div>

                <div className="text-[18px] font-medium">
                  {user?.bio || "No bio provided"}
                </div>
              </div>
            </div>
            <div className="w-[100%] h-[40%]">
              <div className="px-[50px]">
                <div className=" rounded-2xl p-6 space-y-6">
                  <h2 className="text-[30px] font-bold">
                    Personal Information
                  </h2>
                  <div className="flex items-center gap-3">
                    <Mail size={18} />
                    <span>{user?.email || "No email provided"}</span>
                  </div>

                  <a
                    href={user?.location}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3"
                  >
                    <MapPin size={18} />
                    <span>Location</span>
                  </a>

                  <div className="flex items-center gap-3">
                    <Phone size={18} />
                    <span>{user?.phoneNum || "No phone number"}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-1/2 flex flex-col gap-8"></div>
        </div>
      </div>
    </div>
  );
}
