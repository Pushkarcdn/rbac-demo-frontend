/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useEffect, useState } from "react";

import Loader from "@/components/ui/Loader";
import useFetch from "@/hooks/useFetch";
import Chip from "@/components/ui/Chip";
import { SecondaryOutlineButton } from "@/components/ui/Buttons";
import { HugeiconsIcon } from "@hugeicons/react";
import { EyeIcon } from "@hugeicons/core-free-icons";
import { Modal } from "antd";
import { formatCamelCase } from "@/utils/stringFormatters";

export default function AuditLogs() {
  const [searchTerm, setSearchTerm] = useState("") as any;

  const [viewDetails, setViewDetails] = useState({}) as any;

  const {
    data: auditLogs,
    loading: auditLogsLoading,
    fetchData: refetch,
    err,
  } = useFetch("/audit-logs") as any;

  const [filtered, setFiltered] = useState() as any;

  useEffect(() => {
    if (auditLogs) {
      setFiltered(
        auditLogs?.filter(
          (item: any) =>
            item?.event_type
              ?.toLowerCase()
              .includes(searchTerm?.toLowerCase().trim()) ||
            item?.resource
              ?.toLowerCase()
              .includes(searchTerm?.toLowerCase().trim())
        )
      );
    }
  }, [auditLogs, searchTerm]);

  return (
    <div className="flex flex-col gap-4">
      <div className="w-full flex flex-col md:flex-row md:items-center text-sm gap-4">
        <div className="md:mr-10 flex items-center gap-4">
          <span className="text-primary-dark text-xl font-semibold ">
            Audit Logs
          </span>

          <Chip text={`${auditLogs?.length || 0} audit logs found`} />
        </div>
        <input
          type="text"
          placeholder="Search by user"
          className="px-5 border flex-grow rounded-md outline-gray-400 py-3"
          value={searchTerm}
          onChange={(e: any) => setSearchTerm(e.target.value)}
        />
        <SecondaryOutlineButton
          title="Create new"
          className="!px-14"
          link="/admin/audit-logs/new"
        />
      </div>
      {auditLogsLoading && <Loader />}
      {err ? (
        <div className="w-full my-48 flex items-center justify-center text-gray-400 font-semibold text-xl">
          {err === "unauthorized"
            ? "You are not authorized to access this resource!"
            : formatCamelCase(err)}
        </div>
      ) : (
        <All
          data={filtered}
          viewDetails={viewDetails}
          setViewDetails={setViewDetails}
        />
      )}

      {viewDetails?.details && (
        <Modal open={true} onCancel={() => setViewDetails(null)} footer={null}>
          <div className="flex flex-col gap-4">
            <h1 className="text-xl font-semibold text-gray-500">
              Audit Log Details
            </h1>
            {Object?.entries(viewDetails?.details)?.map(
              ([key, value]: any, index: number) =>
                typeof value === "string" && (
                  <div key={index}>
                    <h2 className="text-lg font-semibold text-gray-500">
                      {key}
                    </h2>
                    <p className="text-sm text-gray-500">{value?.toString()}</p>
                  </div>
                )
            )}
          </div>
        </Modal>
      )}
    </div>
  );
}

const All = ({ data, viewDetails, setViewDetails }: any) => {
  return (
    <div className="flex flex-col justify-center items-center gap-6 rounded-lg w-full">
      <div className="w-full overflow-x-auto scrollbar pb-3">
        {data?.length > 0 && (
          <table className="rounded-lg w-full ">
            <thead>
              <tr className="bg-[#f9fafb] rounded-xl text-sm text-nowrap">
                <th className="px-4 py-3 text-left font-medium">User</th>
                <th className="px-4 py-3 text-left font-medium">Event type</th>
                <th className="px-4 py-3 text-left font-medium">Resource</th>
                <th className="px-4 py-3 text-left font-medium">Endpoint</th>
                <th className="px-4 py-3 text-left font-medium">IP</th>
                <th className="px-4 py-3 text-left font-medium">Status</th>
                <th className="px-4 py-3 text-left font-medium">Timestamp</th>
                <th className="px-8 py-3 text-center font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="text-nowrap">
              {data?.map((item: any, index: number) => (
                <tr key={index} className="hover:bg-gray-50 transition-all">
                  <td className="border-t border-gray-300 px-4 py-5 text-left text-sm text-gray-700 min-w-44">
                    {item?.user_id?.full_name || "Unknown"}
                  </td>

                  <td className="border-t border-gray-300 px-4 py-5 text-left text-sm text-gray-500 text-nowrap">
                    {item?.event_type}
                  </td>

                  <td className="border-t border-gray-300 px-4 py-5 text-left text-sm text-gray-500 text-nowrap">
                    {item?.resource}
                  </td>

                  <td className="border-t border-gray-300 px-4 py-5 text-left text-sm text-gray-500 text-nowrap">
                    {item?.endpoint}
                  </td>

                  <td className="border-t border-gray-300 px-4 py-5 text-left text-sm text-gray-500 text-nowrap">
                    {item?.ip_address}
                  </td>

                  <td className="border-t border-gray-300 px-4 py-5 text-left text-sm text-gray-500 text-nowrap">
                    {item?.status}
                  </td>

                  <td className="border-t border-gray-300 px-4 py-5 text-left text-sm text-gray-500 text-nowrap">
                    {item?.createdAt}
                  </td>

                  <td className="border-t border-gray-300 py-5 text-center">
                    <button
                      className={`text-primary-dark text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed`}
                      onClick={() => setViewDetails(item)}
                      disabled={!item?.details?.method}
                    >
                      <HugeiconsIcon
                        icon={EyeIcon}
                        size={20}
                        strokeWidth={1.5}
                      />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {data?.length === 0 && (
          <div className="flex justify-center items-center h-96 w-full">
            <h1 className="text-xl font-semibold text-gray-500">
              No audit logs found
            </h1>
          </div>
        )}
      </div>
    </div>
  );
};
