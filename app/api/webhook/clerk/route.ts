import { Webhook } from "svix";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { UserJSON, UserWebhookEvent } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  const WH_SECRET = process.env.CLERK_WEBHOOK_SECRET;
  if (!WH_SECRET) {
    console.error("Missing webhook secret");
    return new NextResponse("Missing webhook secret", { status: 500 });
  }

  const payload = await req.text();

  const headerList = await headers();

  const svixHeaders = {
    "Svix-Id": headerList.get("svix-id") ?? "",
    "Svix-Timestamp": headerList.get("svix-timestamp") ?? "",
    "Svix-Signature": headerList.get("svix-signature") ?? "",
  };

  const wh = new Webhook(WH_SECRET);
  let evt: UserWebhookEvent;

  try {
    evt = wh.verify(payload, svixHeaders) as UserWebhookEvent;
  } catch (err) {
    console.error("Webhook verification failed:", err);
    return new NextResponse("Invalid signature", { status: 400 });
  }

  if (evt.type !== "user.created") {
    console.log("Event ignored:", evt.type);
    return NextResponse.json({ ignored: true });
  }

  const user = evt.data as UserJSON;

  const primaryEmail =
    user.email_addresses.find((e) => e.id === user.primary_email_address_id)
      ?.email_address ?? `${user.id}@placeholder.com`;

  try {
    const dbUser = await prisma.user.upsert({
      where: { clerkId: user.id },
      update: {
        email: primaryEmail,
        username: user.first_name ?? "user",
      },
      create: {
        clerkId: user.id,
        email: primaryEmail,
        username: user.first_name ?? "user",
      },
    });

    console.log("User upserted:", dbUser);
  } catch (err) {
    console.error("Prisma upsert failed:", err);
    return new NextResponse("Database error", { status: 500 });
  }

  return NextResponse.json({ success: true });
}
