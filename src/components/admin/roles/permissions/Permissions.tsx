/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import useFetch from "@/hooks/useFetch";
import React, { useEffect, useState } from "react";
import hitApi from "@/lib/axios";
import { PrimaryButton } from "@/components/ui/Buttons";
import Loader from "@/components/ui/Loader";
import Chip from "@/components/ui/Chip";
import DeleteModal from "@/components/modals/DeleteModal";
import { formatDate } from "@/utils/dateFormatters";
import { CiTrash } from "react-icons/ci";
import { Select } from "antd";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";

const Permissions = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState(false);
  const [failedText, setFailedText] = useState("");
  const [deleteModalStatus, setDeleteModalStatus] = useState(false);
  const [selectedPermissionId, setSelectedPermissionId] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const {
    data: rolePermissions,
    loading: rolePermissionsLoading,
    fetchData: refetchRolePermissions,
  } = useFetch(`/role-permissions/role/${id}`) as any;

  const { data: allPermissions } = useFetch("/permissions") as any;
  const { data: role } = useFetch(`/roles/${id}`) as any;

  // State for permissions that can be added (not already assigned)
  const [availablePermissions, setAvailablePermissions] = useState<any[]>([]);
  const [selectedPermission, setSelectedPermission] = useState("");

  // Filter available permissions (those not already assigned to the role)
  useEffect(() => {
    if (allPermissions && rolePermissions) {
      const assignedPermissionIds = rolePermissions.map(
        (rp: any) => rp.permission_id._id
      );
      const available = allPermissions.filter(
        (p: any) => !assignedPermissionIds.includes(p._id)
      );
      setAvailablePermissions(available);
    }
  }, [allPermissions, rolePermissions]);

  // Filter permissions based on search term
  const filteredPermissions = rolePermissions?.filter((item: any) =>
    item?.permission_id?.permission_name
      ?.toLowerCase()
      .includes(searchTerm?.toLowerCase().trim())
  );

  // Add permission to role
  const handleAddPermission = async () => {
    if (!selectedPermission) {
      setFailedText("Please select a permission to add");
      return;
    }

    setLoading(true);
    setFailedText("");

    const res = await hitApi("/role-permissions", "POST", {
      role_id: id,
      permission_id: selectedPermission,
    });

    if (res?.success) {
      refetchRolePermissions();
      setSelectedPermission("");
    } else {
      setFailedText(res?.message || "An error occurred. Please try again.");
    }

    setLoading(false);
  };

  // Remove permission from role
  const handleRemovePermission = async () => {
    setLoading(true);

    const res = await hitApi(
      `/role-permissions/${selectedPermissionId}`,
      "DELETE"
    );

    if (res?.success) {
      refetchRolePermissions();
    }

    setDeleteModalStatus(false);
    setLoading(false);
  };

  if (rolePermissionsLoading) return <Loader />;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/roles"
            className="hover:scale-105 transition border border-gray-200 rounded-md p-1 hover:bg-gray-100"
          >
            <FiArrowLeft
              size={15}
              className="cursor-pointer text-gray-600 transition "
            />
          </Link>

          <h1 className="text-xl font-semibold text-gray-800">
            {role?.role_name} permissions
          </h1>
          <Chip
            text={`${filteredPermissions?.length || 0} permissions assigned`}
          />
        </div>
      </div>

      {/* Add Permission Section */}
      <div className="bg-gray-50 p-4 rounded-lg flex items-center gap-4">
        <p className=" font-medium text-nowrap">Assign Permission to :</p>

        <Select
          value={selectedPermission}
          onChange={(value) => setSelectedPermission(value)}
          placeholder="Select a permission"
          className="flex-grow w-full !h-11"
          options={availablePermissions?.map((permission: any) => ({
            value: permission._id,
            label: permission.permission_name,
          }))}
        />

        <PrimaryButton
          title={loading ? "Assigning..." : "Assign Permission"}
          onClick={handleAddPermission}
          disabled={loading || !selectedPermission}
        />
      </div>

      {failedText && (
        <div className="w-full bg-red-100 rounded-lg p-3 mt-3 text-red-500 font-medium text-center">
          {failedText}
        </div>
      )}

      {/* Permissions List */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h2 className="text-lg font-medium">Assigned permissions</h2>
          <input
            type="text"
            placeholder="Search permissions"
            className="px-5 border rounded-md outline-gray-400 py-2.5 text-sm md:w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="w-full overflow-x-auto scrollbar pb-3">
          {filteredPermissions?.length > 0 ? (
            <table className="rounded-lg w-full">
              <thead>
                <tr className="bg-[#f9fafb] rounded-xl text-sm text-nowrap">
                  <th className="px-4 py-3 text-left font-medium">
                    Permission name
                  </th>
                  <th className="px-4 py-3 text-left font-medium">
                    Assigned on
                  </th>
                  <th className="px-8 py-3 text-center font-medium">Action</th>
                </tr>
              </thead>
              <tbody className="text-nowrap">
                {filteredPermissions?.map((item: any) => (
                  <tr
                    key={item._id}
                    className="hover:bg-gray-50 transition-all"
                  >
                    <td className="border-t border-gray-300 px-4 py-5 text-left text-sm text-gray-700 min-w-44">
                      {item.permission_id.permission_name}
                    </td>
                    <td className="border-t border-gray-300 px-4 py-5 text-left text-sm text-gray-500 text-nowrap">
                      {formatDate(item.createdAt, "long")}
                    </td>
                    <td className="border-t border-gray-300 py-5">
                      <div className="flex justify-center">
                        <button
                          onClick={() => {
                            setSelectedPermissionId(item._id);
                            setDeleteModalStatus(true);
                          }}
                          className="text-red-500 hover:text-red-700 font-medium"
                        >
                          <CiTrash size={20} className="cursor-pointer" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="flex justify-center items-center h-32 w-full bg-gray-50 rounded-lg">
              <p className="text-gray-500">
                No permissions assigned to this role
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModalStatus && (
        <DeleteModal
          isOpen={deleteModalStatus}
          closeModal={() => setDeleteModalStatus(false)}
          title="Remove Permission"
          description="Are you sure you want to remove this permission from the role?"
          action={handleRemovePermission}
        />
      )}
    </div>
  );
};

export default Permissions;
