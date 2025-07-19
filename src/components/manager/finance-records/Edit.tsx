/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import useFetch from "@/hooks/useFetch";
import hitApi from "@/lib/axios";
import Gamification from "@/components/modals/Gamification";
import { DatePicker, InputNumber, Select } from "antd";
import {
  categories,
  paymentMethods,
  paymentStatuses,
} from "@/data/dropdownData";
import { PrimaryButton, SecondaryOutlineButton } from "@/components/ui/Buttons";
import dayjs from "dayjs";
import Loader from "@/components/ui/Loader";

export default function EditComponent({ id }: { id: string }) {
  const [loading, setLoading] = useState(false);
  const [failedText, setFailedText] = useState("");
  const [successModalStatus, setSuccessModalStatus] = useState(false);

  const defaultFormData = {
    date: "",
    amount: "",
    category: "",
    payment_method: "",
    payment_status: "",
  };

  const [formData, setFormData] = useState(defaultFormData);

  const { data } = useFetch(`/finance-records/${id}`) as any;

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    for (const key in formData) {
      if (!formData[key as keyof typeof formData]) {
        setFailedText("All fields are required! Please fill all the fields.");
        return;
      }
    }

    setLoading(true);
    setFailedText("");

    const res = await hitApi(`/finance-records/${id}`, "PUT", formData);

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
        date: data.date,
        amount: data.amount,
        category: data.category,
        payment_method: data.payment_method,
        payment_status: data.payment_status,
      });
    }
  }, [data]);

  if (!data) return <Loader />;

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6 my-2">
      <h1 className="text-xl font-semibold text-gray-800">
        Edit Finance Record
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-left">
        <div className="flex flex-col gap-2">
          <label htmlFor="date" className="text-base">
            Date <span className="text-red-500 text-sm">*</span>
          </label>
          <DatePicker
            className="w-full p-2.5 text-darkText placeholder-[#555555] font-normal component-paragraphs rounded-lg outline-gray-400"
            value={formData.date ? dayjs(formData.date) : null}
            onChange={(date: any) => {
              setFormData({
                ...formData,
                date: date ? date.toISOString().split("T")[0] : "",
              });
            }}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="amount" className="text-base">
            Amount <span className="text-red-500 text-sm">*</span>
          </label>
          <InputNumber
            name="amount"
            value={formData.amount}
            min={0}
            onChange={(value: any) => {
              setFormData({
                ...formData,
                amount: value,
              });
            }}
            placeholder="Enter amount"
            className="!w-full"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="category" className="text-base">
            Category <span className="text-red-500 text-sm">*</span>
          </label>
          <Select
            className="w-full"
            placeholder="Select category"
            value={formData.category || undefined}
            onChange={(value) => {
              setFormData({
                ...formData,
                category: value,
              });
            }}
            options={categories.map((category) => ({
              label: category,
              value: category,
            }))}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="payment_method" className="text-base">
            Payment Method <span className="text-red-500 text-sm">*</span>
          </label>
          <Select
            className="w-full"
            placeholder="Select payment method"
            value={formData.payment_method || undefined}
            onChange={(value) => {
              setFormData({
                ...formData,
                payment_method: value,
              });
            }}
            options={paymentMethods.map((method) => ({
              label: method,
              value: method,
            }))}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="payment_status" className="text-base">
            Payment Status <span className="text-red-500 text-sm">*</span>
          </label>
          <Select
            className="w-full"
            placeholder="Select payment status"
            value={formData.payment_status || undefined}
            onChange={(value) => {
              setFormData({
                ...formData,
                payment_status: value,
              });
            }}
            options={paymentStatuses.map((status) => ({
              label: status.charAt(0).toUpperCase() + status.slice(1),
              value: status,
            }))}
          />
        </div>
      </div>

      <div className="w-full flex sm:justify-end flex-col sm:flex-row mt-5 gap-4">
        <SecondaryOutlineButton
          title="Cancel"
          className="!px-10"
          link="/manager/finance-records"
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
          text="Finance record updated successfully"
          link={"/manager/finance-records"}
        />
      )}
    </form>
  );
}
