/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import useFetch from "@/hooks/useFetch";
import hitApi from "@/lib/axios";

interface AuthContextType {
  isSignedIn: boolean;
  setIsSignedIn: (value: boolean) => void;
  signOut: () => Promise<boolean>;
  userData: any;
  loading: boolean;
  refetch: () => void;
  isFinished: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();

  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);

  const signOut = async () => {
    try {
      const res = await hitApi("/auth/logout");
      if (res?.success) {
        setIsSignedIn(false);
      }
      return res?.success;
    } catch (error) {
      console.error("Error during logout:", error);
    } finally {
      router.push("/auth/sign-in");
    }
  };

  const {
    data: userData,
    fetchData: refetch,
    loading,
    isFinished,
  } = useFetch("/auth/me") as any;

  useEffect(() => {
    if (userData) setIsSignedIn(!!userData);
  }, [userData]);

  return (
    <AuthContext.Provider
      value={{
        isSignedIn,
        loading,
        isFinished,
        setIsSignedIn,
        userData,
        signOut,
        refetch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
