"use client";
import Sidebar from "@/app/_components/SideBar";
import { ChangeEvent, use, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useProvider } from "@/app/providers/AuthProviders";
import { upload } from "@vercel/blob/client";
type post = {
  id: string;
  caption: string;
  category: string;
  images: string[];
};
export default function Home() {
  const [postInput, setPostInput] = useState({
    category: "",
    caption: "",
  });
  const { user } = useProvider();
  const [photos, setPhotos] = useState<string[]>([]);
  const [posts, setPosts] = useState<post[]>([]);
  const handleInputValues = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "image") {
      const selectedFile = e.target.files?.[0];
      if (selectedFile) {
        add(selectedFile);
      }
    } else {
      setPostInput((prev) => {
        return { ...prev, [name]: value };
      });
    }
  };
  console.log(photos);
  const createPost = async () => {
    console.log("hi");
    await fetch(`/api/post/${user?.id}`, {
      method: "POST",
      body: JSON.stringify({
        category: postInput.category,
        caption: postInput.caption,
        image: photos,
      }),
    });
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
      const res = await fetch("/api/all-post");
      const pos = await res.json();
      setPosts(pos);
    };
    getPosts();
  }, []);
  return (
    <div className="bg-white flex w-full ">
      <div>
        <Sidebar />
      </div>
      <div className=" w-[90%] flex items-center flex-col gap-[60px] p-[30px]">
        <div className="flex gap-[70px]">
          <input
            type="text"
            className="w-[500px] border-2 border-black rounded-2xl h-[60px] text-[20px] p-[10px]"
            placeholder="Search here..."
          />

          <Dialog>
            <form>
              <DialogTrigger asChild>
                <button className="button w-[170px] h-[60px] rounded-2xl text-[16px] font-medium">
                  Create Post +
                </button>
              </DialogTrigger>
              <DialogContent className="w-[50vw] h-[60vh] md:max-w-none sm:max-w-none">
                <DialogHeader>
                  <DialogTitle>Create New Post </DialogTitle>
                </DialogHeader>
                <FieldGroup className="h-[40vh] flex flex-row justify-around">
                  <div className="w-[400px] h-[400px] bg-gray-200 rounded-2xl flex items-center justify-center">
                    <label className="flex flex-col items-center justify-center w-[90%] h-[90%] border-2 border-dashed border-gray-400 rounded-2xl cursor-pointer bg-white/60 hover:bg-white transition-colors">
                      <span className="text-sm font-medium text-gray-700">
                        Click to upload
                      </span>
                      <span className="text-xs text-gray-500 mt-1">
                        or drag and drop an image
                      </span>
                      <input
                        type="file"
                        className="hidden"
                        name="image"
                        onChange={(e) => handleInputValues(e)}
                        accept="image/*"
                      />
                    </label>
                  </div>
                  <div className="flex flex-col gap-[50px]">
                    <div className="flex flex-col gap-[10px]">
                      <Label className="text-[20px] font-bold">Category:</Label>
                      <Input
                        name="category"
                        className="w-[300px] h-[40px] border-2 border-black rounded-[10px]"
                        onChange={(e) => handleInputValues(e)}
                      />
                    </div>
                    <div className="flex flex-col gap-[10px]">
                      <Label className="text-[20px] font-bold">Caption:</Label>
                      <Input
                        name="caption"
                        className="w-[300px] h-[40px] border-2 border-black rounded-[10px]"
                        onChange={(e) => handleInputValues(e)}
                      />
                    </div>
                  </div>
                </FieldGroup>
                <DialogFooter className="flex gap-[20px]">
                  <DialogClose asChild>
                    <Button className="cancel  w-[100px] hover:scale-105">
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button
                    type="submit"
                    className="button text-black hover:scale-105 duration-75  font-medium"
                    onClick={() => createPost()}
                  >
                    Save changes
                  </Button>
                </DialogFooter>
              </DialogContent>
            </form>
          </Dialog>
        </div>
        <div className="flex flex-col w-[90%] items-center">
          {posts.map((post) => {
            return (
              <div key={post.id} className="w-[600px] flex flex-col gap-[10px]">
                <div className="flex gap-[30px]">
                  <div>
                    <img
                      src="https://i.pinimg.com/736x/f0/76/33/f076330fa536e1bfecc1f98ed7ed95a8.jpg"
                      alt=""
                      className="w-[60px] h-[60px] rounded-[100%]"
                    />
                  </div>
                  <div className="flex items-center font-bold text-[20px]">
                    {post.user.username}
                  </div>
                </div>
                <div>
                  <img src={post.images[0]} alt="" className="rounded-2xl" />
                </div>
                <div></div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
