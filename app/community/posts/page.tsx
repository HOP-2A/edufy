"use client";

import Sidebar from "@/app/_components/SideBar";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useProvider } from "../../../providers/AuthProviders";
import { upload } from "@vercel/blob/client";
import {
  Bookmark,
  Search,
  Plus,
  Sparkles,
  Image as ImageIcon,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { useRouter } from "next/navigation";

type Post = {
  id: string;
  caption: string;
  category: string;
  images: string[];
  user: {
    id: string;
    username: string;
  };
};

export default function Home() {
  const [postInput, setPostInput] = useState({
    category: "",
    caption: "",
  });
  const { user } = useProvider();
  const [photos, setPhotos] = useState<string[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  const handleInputValues = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    if (name === "image") {
      const selectedFile = (e.target as HTMLInputElement).files?.[0];
      if (selectedFile) add(selectedFile);
    } else {
      setPostInput((prev) => ({ ...prev, [name]: value }));
    }
  };

  const createPost = async () => {
    try {
      await fetch(`/api/post/${user?.id}`, {
        method: "POST",
        body: JSON.stringify({
          category: postInput.category,
          caption: postInput.caption,
          image: photos,
        }),
      });
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  const add = async (fileToUpload: File) => {
    const uploaded = await upload(fileToUpload.name, fileToUpload, {
      access: "public",
      handleUploadUrl: "/api/upload",
    });
    setPhotos((prev) => [...prev, uploaded.url]);
  };

  useEffect(() => {
    const getPosts = async () => {
      try {
        const res = await fetch("/api/all-post");
        const pos = await res.json();
        setPosts(pos);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    getPosts();
  }, []);

  return (
    <div className="flex min-h-screen  text-white antialiased">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Unbounded:wght@400;700;900&display=swap');
        .mono { font-family: 'Space Mono', monospace; }
        .unb { font-family: 'Unbounded', sans-serif; }
        
      

        .post-card {
          background: rgba(255, 255, 255, 0.015);
          border: 1px solid rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
        }

        .search-input {
          background: rgba(0, 255, 200, 0.02);
          border: 1px solid rgba(0, 255, 200, 0.08);
          transition: all 0.3s ease;
        }
        .search-input:focus {
          border-color: rgba(0, 255, 200, 0.3);
          background: rgba(0, 255, 200, 0.05);
        }

        .dialog-content {
          background: rgba(10, 11, 12, 0.95) !important;
          border: 1px solid rgba(0, 255, 200, 0.1) !important;
          backdrop-filter: blur(20px);
        }
      `}</style>

      <div />

      <aside className=" w-[210px]">
        <Sidebar />
      </aside>

      <main className="flex-1 ml-[210px] p-10 relative z-10 flex flex-col items-center overflow-y-auto">
        <div className="w-full max-w-[700px] flex items-center justify-between mb-16 gap-6">
          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-teal-400/30"
            />
            <input
              type="text"
              placeholder="Search feed..."
              className="search-input w-full py-4 pl-12 pr-6 rounded-2xl mono text-xs outline-none text-white/70"
            />
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="unb text-[10px] font-bold px-8 py-4 bg-teal-500/10 border border-teal-500/30 text-teal-400 rounded-2xl hover:bg-teal-500/20 transition-all flex items-center gap-2 uppercase tracking-widest whitespace-nowrap shadow-[0_0_20px_rgba(0,255,200,0.05)]"
              >
                <Plus size={16} /> Create Post
              </motion.button>
            </DialogTrigger>

            <DialogContent className="dialog-content sm:max-w-[800px] rounded-[2.5rem] p-8">
              <DialogHeader className="mb-6">
                <DialogTitle className="unb text-xl font-bold italic uppercase flex items-center gap-3">
                  <Sparkles size={20} className="text-teal-400" />
                  New Story
                </DialogTitle>
              </DialogHeader>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-4">
                <div className="aspect-square bg-white/[0.02] border border-dashed border-white/10 rounded-[2rem] overflow-hidden relative group">
                  <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer hover:bg-white/[0.01] transition-all">
                    {photos.length > 0 ? (
                      <img
                        src={photos[0]}
                        className="w-full h-full object-cover"
                        alt="Preview"
                      />
                    ) : (
                      <div className="flex flex-col items-center gap-3">
                        <div className="p-4 bg-teal-500/10 rounded-2xl text-teal-400">
                          <ImageIcon size={24} />
                        </div>
                        <span className="mono text-[10px] uppercase tracking-widest text-white/40">
                          Upload Media
                        </span>
                      </div>
                    )}
                    <input
                      type="file"
                      className="hidden"
                      name="image"
                      onChange={handleInputValues}
                      accept="image/*"
                    />
                  </label>
                </div>

                <div className="flex flex-col gap-6">
                  <div className="space-y-2">
                    <Label className="mono text-[10px] uppercase tracking-widest text-teal-400/60">
                      Category
                    </Label>
                    <Input
                      name="category"
                      placeholder="e.g. Development"
                      className="bg-white/5 border-white/10 text-amber-50 rounded-xl focus:border-teal-400/50 transition-all h-12 mono text-xs"
                      onChange={handleInputValues}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="mono text-[10px] uppercase tracking-widest text-teal-400/60">
                      Caption
                    </Label>
                    <textarea
                      name="caption"
                      placeholder="What's on your mind?"
                      className="w-full bg-white/5 border text-amber-50 border-white/10 rounded-xl p-4 focus:border-teal-400/50 transition-all h-32 mono text-xs outline-none resize-none"
                      onChange={(e) => handleInputValues(e)}
                    />
                  </div>
                </div>
              </div>

              <DialogFooter className="mt-8 flex gap-3">
                <DialogClose asChild>
                  <Button className="rounded-xl mono text-[10px] uppercase tracking-widest border-white/5 bg-white/5 hover:bg-white/10 h-12 px-8">
                    Cancel
                  </Button>
                </DialogClose>
                <Button
                  onClick={createPost}
                  className="rounded-xl unb text-[10px] uppercase tracking-widest bg-teal-500 text-black hover:bg-teal-400 h-12 px-8"
                >
                  Publish Post
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="w-full max-w-[600px] flex flex-col gap-12 mb-20">
          <AnimatePresence>
            {posts.map((post, idx) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="post-card rounded-[2.5rem] p-6 group"
              >
                <div className="flex items-center justify-between mb-6 px-2">
                  <div
                    className="flex items-center gap-4"
                    onClick={() => router.push(`/users?id=${post.user.id}`)}
                  >
                    <div className="relative">
                      <div className="absolute inset-0 bg-teal-400 blur-md opacity-20" />

                      <div>
                        {user?.profilePic ? (
                          <img
                            src={user.profilePic}
                            alt={user.username}
                            style={{
                              width: 40,
                              height: 40,
                              borderRadius: "80%",
                            }}
                          />
                        ) : (
                          <div
                            style={{
                              width: 40,
                              height: 40,
                              borderRadius: "80%",
                              backgroundColor: "#ccc",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            {user?.username?.charAt(0).toUpperCase()}
                          </div>
                        )}
                      </div>
                    </div>
                    <div>
                      <h4 className="unb text-[13px] font-bold tracking-tight">
                        {post.user.username}
                      </h4>
                      <span className="mono text-[9px] text-teal-400/50 uppercase tracking-widest">
                        {post.category || "Community"}
                      </span>
                    </div>
                  </div>
                  <button className="p-3 bg-white/5 rounded-2xl text-white/20 hover:text-teal-400 hover:bg-teal-400/10 transition-all">
                    <Bookmark size={18} />
                  </button>
                </div>

                <div className="aspect-[4/5] rounded-[2rem] overflow-hidden mb-6 bg-white/[0.02] border border-white/5">
                  <img
                    src={post.images[0]}
                    alt="Post content"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                <div className="px-2">
                  <p className="mono text-[12px] leading-relaxed text-white/70">
                    <span className="unb text-teal-400 mr-2 lowercase">
                      {post.user.username}
                    </span>
                    {post.caption}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {posts.length === 0 && !loading && (
          <div className="flex flex-col items-center justify-center py-20 opacity-20">
            <Sparkles size={40} className="mb-4" />
            <p className="mono text-[10px] uppercase tracking-[0.3em]">
              No posts in your feed yet
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
