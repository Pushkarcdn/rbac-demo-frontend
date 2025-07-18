/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import Loader from "@/components/ui/Loader";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Employee: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/employee/finance-records");
  }, []);

  return (
    <section className="component-px component-py min-h-[60vh] w-full flex justify-center items-center">
      <Loader />
    </section>
  );
};

export default Employee;
