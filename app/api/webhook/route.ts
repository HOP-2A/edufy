import { Webhook } from "svix";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { UserJSON, UserWebhookEvent } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  const WH_SECRET = process.env.CLERK_WEBHOOK_SECRET;
  if (!WH_SECRET) {
    return new NextResponse("Missing webhook secret", { status: 500 });
  }

  const payload = await req.text();
  const headerList = await headers();

  const svixHeaders = {
    "svix-id": headerList.get("svix-id") ?? "",
    "svix-timestamp": headerList.get("svix-timestamp") ?? "",
    "svix-signature": headerList.get("svix-signature") ?? "",
  };

  const wh = new Webhook(WH_SECRET);
  let evt: UserWebhookEvent;

  try {
    evt = wh.verify(payload, svixHeaders) as UserWebhookEvent;
  } catch (err) {
    console.error("Webhook verification failed", err);
    return new NextResponse("Invalid signature", { status: 400 });
  }

  if (evt.type !== "user.created") {
    return NextResponse.json({ ignored: true });
  }

  const user = evt.data as UserJSON;

  const primaryEmail =
    user.email_addresses.find((e) => e.id === user.primary_email_address_id)
      ?.email_address ?? `${user.id}@placeholder.com`;

  await prisma.user.upsert({
    where: { clerkId: user.id },
    update: {},
    create: {
      clerkId: user.id,
      email: primaryEmail,
      username: user.first_name ?? "user",
    },
  });

  return NextResponse.json({ success: true });
}
