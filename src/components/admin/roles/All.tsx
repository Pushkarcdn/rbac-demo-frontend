/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { formatDate } from "@/utils/dateFormatters";
import ActionCard from "./ActionCard";

const All = ({ data, refetch }: any) => {
  return (
    <div className="flex flex-col justify-center items-center gap-6 rounded-lg w-full">
      <div className="w-full overflow-x-auto scrollbar pb-3">
        {data?.length > 0 && (
          <table className="rounded-lg w-full ">
            <thead>
              <tr className="bg-[#f9fafb] rounded-xl text-sm text-nowrap">
                <th className="px-4 py-3 text-left font-medium">Role Name</th>
                <th className="px-4 py-3 text-left font-medium">Created At</th>
                <th className="px-8 py-3 text-center font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="text-nowrap">
              {data?.map((item: any, index: number) => (
                <tr key={index} className="hover:bg-gray-50 transition-all">
                  <td className="border-t border-gray-300 px-4 py-5 text-left text-sm text-gray-700 min-w-44">
                    {item?.role_name}
                  </td>

                  <td className="border-t border-gray-300 px-4 py-5 text-left text-sm text-gray-500 text-nowrap">
                    {formatDate(item?.createdAt, "long")}
                  </td>

                  <td className="border-t border-gray-300 py-5">
                    <ActionCard id={item?._id} refetch={refetch} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {data?.length === 0 && (
          <div className="flex justify-center items-center h-96 w-full">
            <h1 className="text-xl font-semibold text-gray-500">
              No roles found
            </h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default All;
