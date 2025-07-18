/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Loader from "@/components/ui/Loader";
import useFetch from "@/hooks/useFetch";
import Link from "next/link";
import Chip from "@/components/ui/Chip";
import { getFileUrl } from "@/config";
import ActionCard from "@/components/admin/admins/ActionCard";
import { formatDate } from "@/utils/dateFormatters";

export default function Applications() {
  const [searchTerm, setSearchTerm] = useState("") as any;
  const [currentTab, setCurrentTab] = useState("All");

  const {
    data: admins,
    loading: adminsLoading,
    fetchData: refetchAdmins,
  } = useFetch("/admins") as any;

  const [filtered, setFiltered] = useState([]) as any;

  useEffect(() => {
    if (admins?.length > 0) {
      setFiltered(
        admins.filter(
          (item: any) =>
            (item?.firstName + " " + item?.lastName)
              ?.toLowerCase()
              .includes(searchTerm?.toLowerCase().trim()) &&
            item?.email !== "superadmin@pushkar.live"
        )
      );
    }
  }, [admins, searchTerm]);

  return (
    <div className="flex flex-col gap-4">
      <div className="w-full flex flex-col md:flex-row md:items-center text-sm gap-4">
        <div className="md:mr-10 flex items-center gap-4">
          <span className="text-primary-dark text-xl font-semibold ">
            Admins
          </span>

          <Chip text={`${admins?.length - 1 || 0} admin found`} />
        </div>
        <input
          type="text"
          placeholder="Search"
          className="px-5 border flex-grow rounded-md outline-gray-400 py-3"
          value={searchTerm}
          onChange={(e: any) => setSearchTerm(e.target.value)}
        />
        <Link
          href={"/admin/admin-accounts/new"}
          className="py-3 px-14 rounded-md font-medium bg-secondary flex items-center justify-center text-white hover:bg-secondary-dark transition text-center text-nowrap"
        >
          Add New Admin
        </Link>
      </div>
      {adminsLoading && <Loader />}
      <div className="flex flex-col justify-center items-center gap-6 rounded-lg w-full">
        <div className="w-full overflow-x-auto scrollbar pb-3">
          {filtered?.length > 0 && (
            <table className="rounded-lg w-full ">
              <thead>
                <tr className="bg-[#f9fafb] rounded-xl text-sm text-nowrap">
                  <th className="px-4 py-3 text-left font-medium min-w-64">
                    Admin
                  </th>
                  <th className="px-4 py-2 text-left font-medium">Phone</th>
                  <th className="px-4 py-2 text-left font-medium">Address</th>
                  <th className="px-4 py-2 text-left font-medium">
                    Created on
                  </th>
                  <th className="px-8 py-2 text-center font-medium">Action</th>
                </tr>
              </thead>
              <tbody className="text-nowrap">
                {filtered?.map((item: any, index: number) => (
                  <tr key={index}>
                    <td className="border-t border-gray-300 pl-4 py-5 text-left">
                      <div className="flex items-center gap-4">
                        <Image
                          src={getFileUrl(item?.profileImage)}
                          alt={""}
                          width={200}
                          height={200}
                          className="rounded-full border border-gray-100 w-16 h-auto aspect-square object-cover object-center"
                        />
                        <div className="flex flex-col gap-0">
                          <h3>{item?.firstName + " " + item?.lastName}</h3>
                          <h4 className="text-xs">{item?.email}</h4>
                        </div>
                      </div>
                    </td>

                    <td className="border-t border-gray-300 px-4 py-5 text-left text-sm text-gray-500">
                      {item?.phone}
                    </td>

                    <td className="border-t border-gray-300 px-4 py-5 text-left text-sm text-gray-500">
                      {item?.address}
                    </td>

                    <td className="border-t border-gray-300 px-4 py-5 text-left text-sm text-gray-500 text-nowrap">
                      {formatDate(item?.createdAt, "long")}
                    </td>

                    <td className="border-t border-gray-300 py-5">
                      <ActionCard
                        userId={item?.user_id}
                        refetch={refetchAdmins}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {filtered?.length === 0 && (
            <div className="flex justify-center items-center h-96 w-full">
              <h1 className="text-xl font-semibold text-gray-500">
                No admin accounts found
              </h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
