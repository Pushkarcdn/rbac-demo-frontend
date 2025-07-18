/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import hitApi from "@/lib/axios";

import Navbar from "@/components/admin/globals/Navbar";
import Sidebar from "@/components/admin/globals/Sidebar";
import MobileSidebar from "@/components/admin/globals/MobileSidebar";
import Loader from "@/components/ui/Loader";

export default function EmployeeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    // use hitApi() directly here
    const res = await hitApi("/auth/me");
    if (res?.data?.role_id?.role_name?.toLowerCase() === "employee") {
      setLoading(false);
    } else {
      router.push("/auth/sign-in");
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <div className="w-full h-screen flex flex-col">
      <Navbar />
      {loading && <Loader />}
      {!loading && (
        <main
          className={`w-full flex-grow flex flex-col xl:grid grid-cols-1 xl:grid-cols-6 items-start justify-start bg-gray-100`}
        >
          <Sidebar />
          <MobileSidebar />
          <div className="w-full h-full xl:col-span-5 relative">
            <div className="absolute w-full h-full p-2 sm:p-3">
              <div className="w-full h-full overflow-y-auto no-scrollbar flex flex-col gap-4 rounded-lg overflow-hidden bg-white p-2 sm:p-3 ">
                {children}
              </div>
            </div>
          </div>
        </main>
      )}
    </div>
  );
}
