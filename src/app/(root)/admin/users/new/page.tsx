/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import Link from "next/link";
import hitApi from "@/lib/axios";
import { UploadOutlined } from "@ant-design/icons";
import { Button, UploadProps, Upload, message } from "antd";
import Gamification from "@/components/modals/Gamification";
import { Image } from "antd";
import { ToastContainer, Bounce, toast } from "react-toastify";

const CreateAdmin = () => {
  const logoProps: UploadProps = {
    name: "file",
    accept: "image/*",
    multiple: false,
    maxCount: 1,
    openFileDialogOnClick: true,
    showUploadList: true,
    onChange(info) {
      if (info.file.status !== "uploading") {
        // pass
      }
      if (info.file.status === "done") {
        const file = info.file.originFileObj;
        if (file) {
          setFormData((prev: any) => ({ ...prev, profileImage: file }));
          setPreview(URL.createObjectURL(file));
        }
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    address: "",
    profileImage: null,
  }) as any;

  const [preview, setPreview] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const [successModalStatus, setSuccessModalStatus] = useState(false);

  const handleChange = (e: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    setLoading(true);

    //check all fields
    for (const key in formData) {
      if (!formData[key]) {
        toast.warning("Please fill all fields.");
        setLoading(false);
        return;
      }
    }

    // check password
    if (formData.password !== formData.confirmPassword) {
      toast.warning("Passwords do not match.");
      setLoading(false);
      return;
    }

    const payload = { ...formData };
    delete payload.confirmPassword;

    // Send the form data to the server
    const res = await hitApi("/register/admin", "POST", formData, {
      "Content-Type": "multipart/form-data",
    });

    if (res?.success) {
      setSuccessModalStatus(true);
    } else {
      toast.error(res?.message || "An error occurred. Please try again.");
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6 mt-2">
      <span className="text-primary-dark text-xl font-semibold">
        Add new admin
      </span>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-4 text-left">
        <div className="flex flex-col gap-2 lg:col-span-2">
          <label htmlFor="fullName" className="text-base">
            Profile image <span className="text-red-500 text-sm">*</span>
          </label>

          <div className="flex items-start gap-3">
            <Upload {...logoProps}>
              <Button className="!py-5 !px-16" icon={<UploadOutlined />}>
                Profile image
              </Button>
            </Upload>

            {/* Image Preview */}
            {preview && (
              <div className="rounded-md overflow-hidden">
                <Image
                  src={preview}
                  alt="Profile Preview"
                  width={60}
                  height={60}
                  className="object-cover rounded-md border border-gray-300 aspect-square"
                />
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="fullName" className="text-base">
            First name <span className="text-red-500 text-sm">*</span>
          </label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="First name"
            className="w-full p-2.5 text-darkText placeholder-[#555555] font-normal component-paragraphs rounded-lg   outline-gray-400"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="fullName" className="text-base">
            Last name <span className="text-red-500 text-sm">*</span>
          </label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Last name"
            className="w-full p-2.5 text-darkText placeholder-[#555555] font-normal component-paragraphs rounded-lg   outline-gray-400"
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
            onChange={handleChange}
            placeholder="Email"
            className="w-full p-2.5 text-darkText placeholder-[#555555] font-normal component-paragraphs rounded-lg   outline-gray-400"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="phone" className="text-base">
            Phone <span className="text-red-500 text-sm">*</span>
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone"
            className="w-full p-2.5 text-darkText placeholder-[#555555] font-normal component-paragraphs rounded-lg   outline-gray-400"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="text-base">
            Password <span className="text-red-500 text-sm">*</span>
          </label>
          <input
            type="password"
            name="password"
            value={formData.password || ""}
            onChange={handleChange}
            placeholder="Password"
            className="w-full p-2.5 text-darkText placeholder-[#555555] font-normal component-paragraphs rounded-lg outline-gray-400"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="confirmPassword" className="text-base">
            Confirm Password <span className="text-red-500 text-sm">*</span>
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword || ""}
            onChange={handleChange}
            placeholder="Confirm Password"
            className="w-full p-2.5 text-darkText placeholder-[#555555] font-normal component-paragraphs rounded-lg   outline-gray-400"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="address" className="text-base">
            Address <span className="text-red-500 text-sm">*</span>
          </label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Address"
            className="w-full p-2.5 text-darkText placeholder-[#555555] font-normal component-paragraphs rounded-lg   outline-gray-400"
          />
        </div>
      </div>

      <div className="w-full flex sm:justify-end flex-col sm:flex-row sm:items-center mt-5 gap-4">
        <Link
          href={"/admin/admin-accounts"}
          className="px-12 py-2.5 text-secondary hover:bg-secondary hover:text-white transition border-2 border-secondary rounded-lg text-center"
        >
          Cancel
        </Link>
        <button
          type="submit"
          className={`px-16 py-3 bg-primary hover:bg-primary-dark transition text-white rounded-lg flex items-center justify-center text-center ${
            loading ? "cursor-not-allowed" : "cursor-pointer"
          }`}
          disabled={loading}
        >
          {loading ? "Creating..." : "Create"}
        </button>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />

      {successModalStatus && (
        <Gamification
          isOpen={successModalStatus}
          closeModal={() => setSuccessModalStatus(false)}
          title="Success"
          text="Admin account created successfully."
          link={"/admin/admin-accounts"}
        />
      )}
    </form>
  );
};

export default CreateAdmin;
