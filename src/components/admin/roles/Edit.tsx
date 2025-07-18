/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import useFetch from "@/hooks/useFetch";
import hitApi from "@/lib/axios";
import Gamification from "@/components/modals/Gamification";
import { PrimaryButton, SecondaryOutlineButton } from "@/components/ui/Buttons";
import Loader from "@/components/ui/Loader";

export default function EditComponent({ id }: { id: string }) {
  const [loading, setLoading] = useState(false);
  const [failedText, setFailedText] = useState("");
  const [successModalStatus, setSuccessModalStatus] = useState(false);

  const defaultFormData = {
    role_name: "",
  };

  const [formData, setFormData] = useState(defaultFormData);

  const { data } = useFetch(`/roles/${id}`) as any;

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!formData.role_name) {
      setFailedText("Role name is required! Please fill in the field.");
      return;
    }

    setLoading(true);
    setFailedText("");

    const res = await hitApi(`/roles/${id}`, "PUT", formData);

    if (res?.success) {
      setSuccessModalStatus(true);
    } else {
      setFailedText(res?.message || "An error occurred. Please try again.");
    }

    setLoading(false);
  };

  useEffect(() => {
    if (data) {
      setFormData({
        role_name: data.role_name,
      });
    }
  }, [data]);

  if (!data) return <Loader />;

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6 my-2">
      <h1 className="text-xl font-semibold text-gray-800">Edit Role</h1>

      <div className="grid grid-cols-1 gap-y-4 text-left">
        <div className="flex flex-col gap-2">
          <label htmlFor="role_name" className="text-base">
            Role Name <span className="text-red-500 text-sm">*</span>
          </label>
          <input
            type="text"
            name="role_name"
            value={formData.role_name}
            onChange={(e) => {
              setFormData({
                ...formData,
                role_name: e.target.value,
              });
            }}
            placeholder="Enter role name"
            className="px-5 border rounded-md outline-gray-400 py-3 w-full"
          />
        </div>
      </div>

      <div className="w-full flex sm:justify-end flex-col sm:flex-row mt-5 gap-4">
        <SecondaryOutlineButton
          title="Cancel"
          className="!px-10"
          link="/admin/roles"
        />
        <PrimaryButton
          title={loading ? "Saving..." : "Save"}
          className="!px-14"
          type="submit"
          disabled={loading}
        />
      </div>

      {failedText && (
        <div className="w-full bg-red-100 rounded-lg p-3 mb-3 text-red-500 font-medium text-center">
          {failedText}
        </div>
      )}

      {successModalStatus && (
        <Gamification
          isOpen={successModalStatus}
          closeModal={() => setSuccessModalStatus(false)}
          title="Success!"
          text="Role updated successfully"
          link={"/admin/roles"}
        />
      )}
    </form>
  );
}
