import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

const Page = () => {
  return (
    <div>
      <SignedOut>
        <SignInButton>
          <button>Sign In</button>
        </SignInButton>

        <SignUpButton>
          <button>Sign Up</button>
        </SignUpButton>
      </SignedOut>

      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  );
};

export default Page;
