/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useEffect, useState } from "react";

import All from "@/components/admin/finance-records/All";
import Loader from "@/components/ui/Loader";
import useFetch from "@/hooks/useFetch";
import Link from "next/link";
import Chip from "@/components/ui/Chip";

export default function Applications() {
  const [searchTerm, setSearchTerm] = useState("") as any;
  const [currentTab, setCurrentTab] = useState("All");

  const {
    data: testimonials,
    loading: testimonialsLoading,
    fetchData: refetch,
  } = useFetch("/testimonials") as any;

  const [filtered, setFiltered] = useState() as any;

  useEffect(() => {
    if (testimonials) {
      setFiltered(
        testimonials?.filter((item: any) =>
          item?.fullName
            ?.toLowerCase()
            .includes(searchTerm?.toLowerCase().trim())
        )
      );
    }
  }, [searchTerm, testimonials]);

  const tabs = {
    All: <All data={filtered} refetch={refetch} />,
  } as any;

  return (
    <div className="flex flex-col gap-4">
      <div className="w-full flex flex-col md:flex-row md:items-center text-sm gap-4">
        <div className="md:mr-10 flex items-center gap-4">
          <span className="text-primary-dark text-xl font-semibold ">
            Testimonials
          </span>

          <Chip text={`${testimonials?.length || 0} testimonials found`} />
        </div>
        <input
          type="text"
          placeholder="Search"
          className="px-5 border flex-grow rounded-md outline-gray-400 py-3"
          value={searchTerm}
          onChange={(e: any) => setSearchTerm(e.target.value)}
        />
        <Link
          href={"/admin/testimonials/new"}
          className="py-3 px-14 rounded-md font-medium bg-secondary flex items-center justify-center text-white hover:bg-secondary-dark transition text-center text-nowrap"
        >
          Create New Testimonial
        </Link>
      </div>
      {testimonialsLoading && <Loader />}
      {!testimonialsLoading && tabs[currentTab]}
    </div>
  );
}
