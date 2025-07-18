/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useEffect, useState } from "react";

import All from "@/components/admin/permissions/All";
import Loader from "@/components/ui/Loader";
import useFetch from "@/hooks/useFetch";
import Chip from "@/components/ui/Chip";
import { SecondaryOutlineButton } from "@/components/ui/Buttons";

export default function Permissions() {
  const [searchTerm, setSearchTerm] = useState("") as any;
  const [currentTab, setCurrentTab] = useState("All");

  const {
    data: permissions,
    loading: permissionsLoading,
    fetchData: refetch,
  } = useFetch("/permissions") as any;

  const [filtered, setFiltered] = useState() as any;

  useEffect(() => {
    if (permissions) {
      setFiltered(
        permissions?.filter((item: any) =>
          item?.permission_name
            ?.toLowerCase()
            .includes(searchTerm?.toLowerCase().trim())
        )
      );
    }
  }, [searchTerm, permissions]);

  const tabs = {
    All: <All data={filtered} refetch={refetch} />,
  } as any;

  return (
    <div className="flex flex-col gap-4">
      <div className="w-full flex flex-col md:flex-row md:items-center text-sm gap-4">
        <div className="md:mr-10 flex items-center gap-4">
          <span className="text-primary-dark text-xl font-semibold ">
            Permissions
          </span>

          <Chip text={`${permissions?.length || 0} permissions found`} />
        </div>
        <input
          type="text"
          placeholder="Search by permission name"
          className="px-5 border flex-grow rounded-md outline-gray-400 py-3"
          value={searchTerm}
          onChange={(e: any) => setSearchTerm(e.target.value)}
        />
        <SecondaryOutlineButton
          title="Create new"
          className="!px-14"
          link="/admin/permissions/new"
        />
      </div>
      {permissionsLoading && <Loader />}
      {!permissionsLoading && tabs[currentTab]}
    </div>
  );
}
