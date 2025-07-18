/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useEffect, useState } from "react";

import All from "@/components/admin/users/All";
import Loader from "@/components/ui/Loader";
import useFetch from "@/hooks/useFetch";
import Chip from "@/components/ui/Chip";
import { SecondaryOutlineButton } from "@/components/ui/Buttons";

export default function Users() {
  const [searchTerm, setSearchTerm] = useState("") as any;
  const [currentTab, setCurrentTab] = useState("All");

  const {
    data: users,
    loading: usersLoading,
    fetchData: refetch,
  } = useFetch("/users") as any;

  const [filtered, setFiltered] = useState() as any;

  useEffect(() => {
    if (users) {
      setFiltered(
        users?.filter((item: any) =>
          (
            item?.username?.toLowerCase() +
            " " +
            item?.full_name?.toLowerCase() +
            " " +
            item?.email?.toLowerCase()
          ).includes(searchTerm?.toLowerCase().trim())
        )
      );
    }
  }, [searchTerm, users]);

  const tabs = {
    All: <All data={filtered} refetch={refetch} />,
  } as any;

  return (
    <div className="flex flex-col gap-4">
      <div className="w-full flex flex-col md:flex-row md:items-center text-sm gap-4">
        <div className="md:mr-10 flex items-center gap-4">
          <span className="text-primary-dark text-xl font-semibold ">
            Users
          </span>

          <Chip text={`${filtered?.length || 0} users found`} />
        </div>
        <input
          type="text"
          placeholder="Search by username, name or email"
          className="px-5 border flex-grow rounded-md outline-gray-400 py-3"
          value={searchTerm}
          onChange={(e: any) => setSearchTerm(e.target.value)}
        />
        <SecondaryOutlineButton
          title="Create new"
          className="!px-14"
          link="/admin/users/new"
        />
      </div>
      {usersLoading && <Loader />}
      {!usersLoading && tabs[currentTab]}
    </div>
  );
}
