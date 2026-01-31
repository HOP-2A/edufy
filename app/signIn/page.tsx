"use client";

import {
  SignedIn,
  SignedOut,
  UserButton,
  RedirectToSignUp,
} from "@clerk/nextjs";

const Page = () => {
  return (
    <div>
      <SignedOut>
        <RedirectToSignUp />
      </SignedOut>

      <SignedIn>
        <div className="p-10">
          <h1 className="text-2xl font-bold">Та нэвтэрсэн байна!</h1>
          <UserButton />
        </div>
      </SignedIn>
    </div>
  );
};

export default Page;
