"use client";
import { useProvider, User } from "@/providers/AuthProviders";
import Sidebar from "../_components/SideBar";
import { Mail, MapPin, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { Roadmap } from "../user/course/page";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
type post = {
  id: string;
  images: string[];
  caption: string;
  category: string;
  user: User;
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
    <div className="w-[100vw] h-[100vh] flex  items-center">
      <div className="">
        <Sidebar />
      </div>
      <div className="w-[100%] h-[100%] flex justify-center items-center">
        <div className="w-[70%] h-[80%] flex justify-around items-center p-[10px]">
          <div className="w-[40%] h-[60%] border-4 rounded-3xl  overflow-hidden flex flex-col">
            <div className="p-8 border-b-4 ">
              <div className="flex items-center gap-6">
                <img
                  src={user?.profilePic}
                  alt="profile"
                  className="w-24 h-24 rounded-full object-cover border-2 border-gray-100"
                />
                <div>
                  <h1 className="text-xl font-medium text-gray-900">
                    {user?.username || "Username"}
                  </h1>
                  <p className="text-sm text-gray-400 mt-1">
                    {user?.bio || "No bio provided"}
                  </p>
                </div>
              </div>
            </div>

            {/* Personal Information */}
            <div className="flex-1 p-8">
              <h2 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-6">
                Personal Information
              </h2>

              <div className="space-y-5">
                <div className="flex items-center gap-3 text-gray-600">
                  <Mail size={16} className="text-gray-400" />
                  <span className="text-sm">
                    {user?.email || "No email provided"}
                  </span>
                </div>

                {user?.location && (
                  <a
                    href={user.location}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    <MapPin size={16} className="text-gray-400" />
                    <span className="text-sm">Location</span>
                  </a>
                )}

                <div className="flex items-center gap-3 text-gray-600">
                  <Phone size={16} className="text-gray-400" />
                  <span className="text-sm">
                    {user?.phoneNum || "No phone number"}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="w-[45%] h-[80%] flex flex-col justify-between">
            <div className="w-[100%] h-[47%] ">
              <Carousel className="w-[100%] h-[100%]">
                <CarouselContent>
                  {posts.map((post) => {
                    return (
                      <CarouselItem
                        key={post.id}
                        className="w-[100%] h-[100%] p-[30px]"
                      >
                        <div className="border-4 rounded-lg overflow-hidden bg-white">
                          <img
                            src={post.images[0]}
                            alt=""
                            className="w-full h-48 object-cover"
                          />

                          <div className="p-4 space-y-3">
                            {/* User info */}
                            <div className="flex items-center gap-3">
                              <img
                                src={user?.profilePic}
                                alt=""
                                className="w-10 h-10 rounded-full object-cover"
                              />
                              <span className="font-medium text-gray-900">
                                {post.user.username}
                              </span>
                            </div>

                            {/* Post details */}
                            <div className="space-y-1 text-sm text-gray-600">
                              <p className="line-clamp-2">{post.caption}</p>
                              <p className="text-xs text-gray-400">
                                {post.category}
                              </p>
                            </div>
                          </div>
                        </div>
                      </CarouselItem>
                    );
                  })}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
            <div className="w-full h-[47%] mt-[100px]">
              <Carousel className="w-full h-full">
                <CarouselContent>
                  {maps.map((map) => {
                    const roadmap = map as Roadmap;
                    return (
                      <CarouselItem
                        key={roadmap.id}
                        className="h-full p-2 md:p-4"
                      >
                        <div className="border-4 rounded-lg bg-white p-5 h-full flex flex-col">
                          {/* Title & Level */}
                          <div className="mb-3">
                            <h3 className="font-medium text-lg text-gray-900 line-clamp-1">
                              {roadmap.title}
                            </h3>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-600">
                                {roadmap.levelFrom}
                              </span>
                              <span className="text-gray-400 text-xs">→</span>
                              <span className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-600">
                                {roadmap.levelTo}
                              </span>
                            </div>
                          </div>

                          {/* Description */}
                          <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                            {roadmap.description}
                          </p>

                          {/* Purpose */}
                          <p className="text-xs text-gray-400 mb-3 line-clamp-1">
                            {roadmap.purpose}
                          </p>

                          {/* Learning Sections Preview */}
                          {roadmap.learningSections &&
                            roadmap.learningSections.length > 0 && (
                              <div className="mt-auto pt-3 border-t border-gray-100">
                                <div className="flex items-center gap-1 text-xs text-gray-400">
                                  <span>
                                    {roadmap.learningSections.length} sections
                                  </span>
                                  <span className="text-gray-300">•</span>
                                  <span>
                                    {roadmap.isPublished
                                      ? "Published"
                                      : "Draft"}
                                  </span>
                                </div>
                              </div>
                            )}
                        </div>
                      </CarouselItem>
                    );
                  })}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
