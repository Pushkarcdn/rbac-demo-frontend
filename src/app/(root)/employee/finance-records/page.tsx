/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useEffect, useState } from "react";

import All from "@/components/employee/finance-records/All";
import Loader from "@/components/ui/Loader";
import useFetch from "@/hooks/useFetch";
import Chip from "@/components/ui/Chip";
import { SecondaryOutlineButton } from "@/components/ui/Buttons";
import { formatCamelCase } from "@/utils/stringFormatters";

export default function Applications() {
  const [searchTerm, setSearchTerm] = useState("") as any;
  const [currentTab, setCurrentTab] = useState("All");

  const {
    data: financeRecords,
    loading: financeRecordsLoading,
    fetchData: refetch,
    err,
  } = useFetch("/finance-records") as any;

  const [filtered, setFiltered] = useState() as any;

  useEffect(() => {
    if (financeRecords) {
      setFiltered(
        financeRecords?.filter((item: any) =>
          item?.category
            ?.toLowerCase()
            .includes(searchTerm?.toLowerCase().trim())
        )
      );
    }
  }, [searchTerm, financeRecords]);

  const tabs = {
    All: <All data={filtered} refetch={refetch} />,
  } as any;

  return (
    <div className="flex flex-col gap-4">
      <div className="w-full flex flex-col md:flex-row md:items-center text-sm gap-4">
        <div className="md:mr-10 flex items-center gap-4">
          <span className="text-primary-dark text-xl font-semibold ">
            Finance records
          </span>

          <Chip text={`${financeRecords?.length || 0} finance records found`} />
        </div>
        <input
          type="text"
          placeholder="Search by category"
          className="px-5 border flex-grow rounded-md outline-gray-400 py-3"
          value={searchTerm}
          onChange={(e: any) => setSearchTerm(e.target.value)}
        />
        <SecondaryOutlineButton
          title="Create new"
          className="!px-14"
          link="/employee/finance-records/new"
        />
      </div>
      {financeRecordsLoading && <Loader />}
      {err ? (
        <div className="w-full my-48 flex items-center justify-center text-gray-400 font-semibold text-xl">
          {err === "unauthorized"
            ? "You are not authorized to access this resource!"
            : formatCamelCase(err)}
        </div>
      ) : (
        tabs[currentTab]
      )}
    </div>
  );
}
