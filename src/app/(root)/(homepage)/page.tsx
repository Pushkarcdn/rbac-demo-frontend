/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import Loader from "@/components/ui/Loader";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Homepage() {
  const { userData, isFinished } = useAuth();
  const router = useRouter();
  useEffect(() => {
    console.log("isFinished", isFinished);

    if (!isFinished) return;

    console.log("userData", userData);

    const role = userData?.role_id?.role_name?.toLowerCase();

    if (role) {
      console.log("role", role);
      switch (role) {
        case "employee":
          router.push("/employee/finance-records");
          break;
        case "manager":
          router.push("/manager/finance-records");
          break;
        case "admin":
        case "superadmin":
          router.push("/admin/finance-records");
          break;
      }
    } else {
      router.push("/auth/sign-in");
    }
  }, [userData]);

  return (
    <>
      <Loader />
    </>
  );
}
