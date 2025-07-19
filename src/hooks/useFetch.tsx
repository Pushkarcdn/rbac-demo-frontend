/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect, useCallback } from "react";
import axios, { Method, RawAxiosRequestHeaders } from "axios";
import hitApi from "@/lib/axios";

const useFetch = <T,>(
  url: string,
  now = true,
  method: Method = "GET",
  body: any | null = null,
  headers: RawAxiosRequestHeaders = {},
  responseType: any = "json",
  timeout: number = 10000
) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [reloading, setReloading] = useState<boolean>(false);
  const [err, setErr] = useState<string | null>(null);

  // hitApi function that can be called to fetch or refetch data
  const fetchData = useCallback(async () => {
    setErr(null);
    setReloading(true);
    try {
      const response = await hitApi(
        url,
        method,
        body,
        headers,
        responseType,
        timeout
      );

      if (!response?.success) {
        setErr(response?.message);
      } else {
        setData(response?.data);
      }
    } catch (error: any) {
      if (axios.isCancel(error)) {
        console.error("Request cancelled 'useFetch'");
      } else {
        setErr(
          error?.response?.data?.message ||
            error?.message ||
            "An error occurred!"
        );
        console.error(error);
      }
    } finally {
      setLoading(false);
      setReloading(false);
      setIsFinished(true);
    }
  }, [url, method, body, headers, responseType, timeout]);

  // Use useEffect to fetch data when component mounts
  useEffect(() => {
    setLoading(true);
    if (now) fetchData();
  }, []);

  return { data, fetchData, loading, reloading, err, isFinished } as any;
};

export default useFetch;
