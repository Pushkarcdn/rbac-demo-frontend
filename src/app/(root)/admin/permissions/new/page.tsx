/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import Link from "next/link";
import hitApi from "@/lib/axios";
import Gamification from "@/components/modals/Gamification";

import { UploadOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { Button, message, Upload } from "antd";
import { Select, Space } from "antd";

import type { RadioChangeEvent } from "antd";
import { Input, Radio } from "antd";

const style: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 8,
};

const NewTestimonial = () => {
  const profileImageProps: UploadProps = {
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
        }
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const companyLogoProps: UploadProps = {
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
          setFormData((prev: any) => ({ ...prev, companyLogo: file }));
        }
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const [formData, setFormData] = useState({
    fullName: "",
    feedback: "",
    profession: "",
    rating: 5,
    profileImage: "",
    companyLogo: "",
  }) as any;

  const [loading, setLoading] = useState(false);
  const [failedText, setFailedText] = useState("");
  const [successModalStatus, setSuccessModalStatus] = useState(false);

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    setLoading(true);
    setFailedText("");

    // Create a FormData object
    const formDataToSend = new FormData();
    for (const key in formData) {
      if (formData[key]) {
        // Append each field to the FormData object
        formDataToSend.append(key, formData[key]);
      }
    }

    // Send the form data to the server
    const res = await hitApi("/testimonials", "POST", formDataToSend, {
      "Content-Type": "multipart/form-data",
    });

    if (res?.success) {
      setSuccessModalStatus(true);
    } else {
      setFailedText(res?.message || "An error occurred. Please try again.");
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6 my-2">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4 text-left">
        <div className="flex flex-col gap-2">
          <label htmlFor="fullName" className="text-base">
            Full name <span className="text-red-500 text-sm">*</span>
          </label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            required
            onChange={handleChange}
            placeholder="Full name"
            className="w-full p-2.5 text-darkText placeholder-[#555555]   font-normal component-paragraphs rounded-lg   outline-gray-400"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="fullName" className="text-base">
            Profession
            <span className="text-red-500 text-sm">*</span>
          </label>
          <input
            type="text"
            name="profession"
            required
            value={formData.profession}
            onChange={handleChange}
            placeholder="i.e. CEO, Manager"
            className="w-full p-2.5 text-darkText placeholder-[#555555]   font-normal component-paragraphs rounded-lg   outline-gray-400"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="fullName" className="text-base">
            Rating
            <span className="text-red-500 text-sm">*</span>
          </label>

          <Radio.Group
            style={style}
            onChange={(e: RadioChangeEvent) =>
              setFormData((prev: any) => ({ ...prev, rating: e.target.value }))
            }
            value={formData.rating}
            options={[
              { label: "1", value: 1 },
              { label: "2", value: 2 },
              { label: "3", value: 3 },
              { label: "4", value: 4 },
              { label: "5", value: 5 },
            ]}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="fullName" className="text-base">
            Profile image (jpg/png)
            <span className="text-red-500 text-sm">*</span>
          </label>

          <Upload {...profileImageProps}>
            <Button className="!py-5 !px-16" icon={<UploadOutlined />}>
              Profile image
            </Button>
          </Upload>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="fullName" className="text-base">
            Company logo (jpg/png)
            <span className="text-red-500 text-sm">*</span>
          </label>

          <Upload {...companyLogoProps}>
            <Button className="!py-5 !px-16" icon={<UploadOutlined />}>
              Company logo
            </Button>
          </Upload>
        </div>
      </div>

      <div className="flex flex-col gap-2 sm:col-span-2 lg:col-span-3">
        <label htmlFor="fullName" className="text-base">
          Feedback
          <span className="text-red-500 text-sm">*</span>
        </label>
        <textarea
          name="feedback"
          value={formData.feedback}
          onChange={handleChange}
          placeholder="Feedback"
          rows={6}
          required
          className="w-full p-2.5 text-darkText placeholder-[#555555] resize-none font-normal component-paragraphs rounded-lg scrollbar outline-gray-400"
        />
      </div>

      <div className="w-full flex sm:justify-end flex-col sm:flex-row mt-5 gap-4">
        <Link
          href={"/admin/testimonials"}
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
          {loading ? "Saving..." : "Save"}
        </button>
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
          title="Success"
          text="Testimonial added successfully"
          link={"/admin/testimonials"}
        />
      )}
    </form>
  );
};

export default NewTestimonial;
