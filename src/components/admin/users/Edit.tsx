/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import useFetch from "@/hooks/useFetch";
import hitApi from "@/lib/axios";
import Gamification from "@/components/modals/Gamification";
import { PrimaryButton, SecondaryOutlineButton } from "@/components/ui/Buttons";
import Loader from "@/components/ui/Loader";
import { Select } from "antd";

export default function EditComponent({ id }: { id: string }) {
  const [loading, setLoading] = useState(false);
  const [failedText, setFailedText] = useState("");
  const [successModalStatus, setSuccessModalStatus] = useState(false);

  const defaultFormData = {
    username: "",
    full_name: "",
    email: "",
    role_id: "",
  } as any;

  const [formData, setFormData] = useState(defaultFormData);
  const [changePassword, setChangePassword] = useState(false);
  const [password, setPassword] = useState("");

  const { data } = useFetch(`/users/${id}`) as any;
  const { data: roles } = useFetch("/roles") as any;

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    for (const key in formData) {
      if (!formData[key as keyof typeof formData]) {
        setFailedText("All fields are required! Please fill all the fields.");
        return;
      }
    }

    if (changePassword && !password) {
      setFailedText("Password is required when changing password.");
      return;
    }

    setLoading(true);
    setFailedText("");

    const dataToSend = { ...formData };
    if (changePassword) {
      dataToSend.password = password;
    }

    const res = await hitApi(`/users/${id}`, "PUT", dataToSend);

    if (res?.success) {
      setSuccessModalStatus(true);
      if (changePassword) {
        setPassword("");
        setChangePassword(false);
      }
    } else {
      setFailedText(res?.message || "An error occurred. Please try again.");
    }

    setLoading(false);
  };

  useEffect(() => {
    if (data) {
      setFormData({
        username: data.username,
        full_name: data.full_name,
        email: data.email,
        role_id: data.role_id,
      });
    }
  }, [data]);

  if (!data) return <Loader />;

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6 my-2">
      <h1 className="text-xl font-semibold text-gray-800">Edit User</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-left">
        <div className="flex flex-col gap-2">
          <label htmlFor="username" className="text-base">
            Username <span className="text-red-500 text-sm">*</span>
          </label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={(e) => {
              setFormData({
                ...formData,
                username: e.target.value,
              });
            }}
            placeholder="Enter username"
            className="px-5 border rounded-md outline-gray-400 py-3 w-full"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="full_name" className="text-base">
            Full Name <span className="text-red-500 text-sm">*</span>
          </label>
          <input
            type="text"
            name="full_name"
            value={formData.full_name}
            onChange={(e) => {
              setFormData({
                ...formData,
                full_name: e.target.value,
              });
            }}
            placeholder="Enter full name"
            className="px-5 border rounded-md outline-gray-400 py-3 w-full"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-base">
            Email <span className="text-red-500 text-sm">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={(e) => {
              setFormData({
                ...formData,
                email: e.target.value,
              });
            }}
            placeholder="Enter email address"
            className="px-5 border rounded-md outline-gray-400 py-3 w-full"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="role_id" className="text-base">
            Role <span className="text-red-500 text-sm">*</span>
          </label>
          <Select
            className="w-full"
            placeholder="Select role"
            value={formData.role_id || undefined}
            onChange={(value) => {
              setFormData({
                ...formData,
                role_id: value,
              });
            }}
            options={roles?.map((role: any) => ({
              label: role.role_name,
              value: role._id,
            }))}
          />
        </div>

        <div className="flex items-center gap-2 mt-2">
          <input
            type="checkbox"
            id="changePassword"
            checked={changePassword}
            onChange={(e) => setChangePassword(e.target.checked)}
            className="w-4 h-4"
          />
          <label htmlFor="changePassword" className="text-base">
            Change Password
          </label>
        </div>

        {changePassword && (
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-base">
              New Password <span className="text-red-500 text-sm">*</span>
            </label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter new password"
              className="px-5 border rounded-md outline-gray-400 py-3 w-full"
            />
          </div>
        )}
      </div>

      <div className="w-full flex sm:justify-end flex-col sm:flex-row mt-5 gap-4">
        <SecondaryOutlineButton
          title="Cancel"
          className="!px-10"
          link="/admin/users"
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
          text="User updated successfully"
          link={"/admin/users"}
        />
      )}
    </form>
  );
}
