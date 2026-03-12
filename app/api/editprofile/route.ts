import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { put } from "@vercel/blob";

export async function PUT(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const contentType = req.headers.get("content-type") || "";

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();

      const username =
        (formData.get("username") as string | null)?.trim() || null;
      const bio = formData.get("bio") as string | null;
      const location = formData.get("location") as string | null;
      const phoneNum = formData.get("phoneNum") as string | null;
      const imageFile = formData.get("image") as File | null;

      if (username) {
        const existing = await prisma.user.findFirst({
          where: { username, NOT: { clerkId: userId } },
        });
        if (existing) {
          return NextResponse.json(
            {
              error: "Username already taken",
              detail: `"${username}" is already in use by another account.`,
            },
            { status: 409 },
          );
        }
      }

      let profilePic: string | undefined = undefined;
      if (imageFile && imageFile.size > 0) {
        const ext = imageFile.name.split(".").pop() ?? "jpg";
        const blob = await put(
          `profile-pics/${userId}-${Date.now()}.${ext}`,
          imageFile,
          { access: "private" },
        );
        profilePic = blob.downloadUrl ?? blob.url;
      }

      const updatedUser = await prisma.user.update({
        where: { clerkId: userId },
        data: {
          ...(username && { username }),
          ...(bio !== null && { bio }),
          ...(location !== null && { location }),
          ...(phoneNum !== null && { phoneNum }),
          ...(profilePic && { profilePic }),
        },
      });

      return NextResponse.json(updatedUser);
    }

    const body = await req.json();
    const username = body.username?.trim() || undefined;

    if (username) {
      const existing = await prisma.user.findFirst({
        where: { username, NOT: { clerkId: userId } },
      });
      if (existing) {
        return NextResponse.json(
          {
            error: "Username already taken",
            detail: `"${username}" is already in use by another account.`,
          },
          { status: 409 },
        );
      }
    }

    const updatedUser = await prisma.user.update({
      where: { clerkId: userId },
      data: {
        ...(username && { username }),
        ...(body.bio !== undefined && { bio: body.bio }),
        ...(body.location !== undefined && { location: body.location }),
        ...(body.phoneNum !== undefined && { phoneNum: body.phoneNum }),
        ...(body.profilePic !== undefined && { profilePic: body.profilePic }),
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error("Update Error:", msg);
    return NextResponse.json(
      { error: "Internal server error", detail: msg },
      { status: 500 },
    );
  }
}
