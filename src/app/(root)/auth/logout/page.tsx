"use client";

import { useEffect } from "react";
import Loader from "@/components/ui/Loader";
import { useAuth } from "@/contexts/AuthContext";

const Logout = () => {
  const { signOut } = useAuth();

  useEffect(() => {
    signOut();
  }, [signOut]);

  return (
    <div className="w-full h-[100dvh] flex justify-center items-center">
      <Loader />
    </div>
  );
};

export default Logout;
