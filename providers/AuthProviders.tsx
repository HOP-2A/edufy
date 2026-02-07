"use client";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

type User = {
  id: string;
  username: string;
  email: string;
  clerkId: string;
  createdAt: Date;
};

type ContextType = {
  user: User | null;
  setUser: Dispatch<SetStateAction<null | User>>;
  loading: boolean;
  find: () => Promise<void>;
};

export const AuthContext = createContext<ContextType | null>(null);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const { user: clerkUser, isLoaded } = useUser();
  const router = useRouter();

  const find = async () => {
    if (!clerkUser?.id) return;

    const res = await fetch(`/api/find-user/${clerkUser.id}`, {
      method: "GET",
    });

    const userData = await res.json();
    setUser(userData);
  };

  useEffect(() => {
    const find = async () => {
      if (!isLoaded) {
        return;
      }
      if (!clerkUser) {
        setLoading(false);
        router.replace("/");
        return;
      }

      const res = await fetch(`/api/find-user/${clerkUser.id}`, {
        method: "GET",
      });
      const userData = await res.json();

      router.push("/mainMenu");

      setUser(userData);
      setLoading(false);
    };
    find();
  }, [clerkUser, isLoaded, router]);

  const values = {
    user,
    setUser,
    loading,
    find,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export const useProvider = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("Check AuthProviders");
  }
  return authContext;
};
