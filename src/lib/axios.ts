/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, {
  Method,
  RawAxiosRequestHeaders,
  AxiosResponse,
  ResponseType,
} from "axios";
import config from "../config/index";

const axiosInstance = axios.create({
  baseURL: config.API_URL,
  withCredentials: true,
});

const isFile = (value: unknown): boolean => {
  return (
    value instanceof File ||
    value instanceof Blob ||
    (value !== null &&
      typeof value === "object" &&
      "name" in value &&
      "type" in value &&
      "size" in value)
  );
};

const containsFiles = (obj: Record<string, unknown>): boolean => {
  if (!obj || typeof obj !== "object") return false;

  for (const key in obj) {
    if (isFile(obj[key])) {
      return true;
    } else if (obj[key] !== null && typeof obj[key] === "object") {
      if (containsFiles(obj[key] as Record<string, unknown>)) return true;
    }
  }

  return false;
};

interface RecursiveObject {
  [key: string]: unknown | RecursiveObject | Array<unknown | RecursiveObject>;
}

const objectToFormData = (obj: RecursiveObject): FormData => {
  const formData = new FormData();

  for (const key in obj) {
    if (obj[key] !== undefined) {
      if (Array.isArray(obj[key])) {
        (obj[key] as unknown[]).forEach((item, index) => {
          if (isFile(item)) {
            formData.append(`${key}`, item as Blob);
          } else if (item !== null && typeof item === "object") {
            formData.append(`${key}[${index}]`, JSON.stringify(item));
          } else {
            formData.append(`${key}[${index}]`, String(item));
          }
        });
      } else if (isFile(obj[key])) {
        formData.append(key, obj[key] as Blob);
      } else if (obj[key] !== null && typeof obj[key] === "object") {
        formData.append(key, JSON.stringify(obj[key]));
      } else {
        formData.append(key, String(obj[key]));
      }
    }
  }

  return formData;
};

const hitApi = async (
  url: string,
  method = "GET" as Method,
  body = null as unknown | null,
  headers = {} as RawAxiosRequestHeaders,
  responseType = "json" as ResponseType,
  timeout = 20000 as number
) => {
  try {
    // Convert object with files to FormData and set correct headers
    if (
      body &&
      typeof body === "object" &&
      !Array.isArray(body) &&
      !(body instanceof FormData)
    ) {
      if (containsFiles(body as Record<string, unknown>)) {
        body = objectToFormData(body as RecursiveObject);
        headers = {
          ...headers,
          "Content-Type": "multipart/form-data",
        };
      }
    }

    // Handle FormData directly
    if (body instanceof FormData) {
      headers = {
        ...headers,
        "Content-Type": "multipart/form-data",
      };
    }
    const response = (await axiosInstance({
      url,
      method,
      data: body,
      headers,
      responseType,
      timeout,
      withCredentials: true, // Important for sending cookies
    })) as AxiosResponse;

    return await response?.data;
  } catch (error: any) {
    return error?.response?.data || error;
  }
};

export default hitApi;

// Old code
// /* eslint-disable @typescript-eslint/no-explicit-any */
// import axios, { Method, RawAxiosRequestHeaders } from "axios";
// import config from "../config/index";

// const axiosInstance = axios.create({
//   baseURL: config.API_URL,
//   withCredentials: true,
// });

// const hitApi = async (
//   url: string,
//   method = "GET" as Method,
//   body = null as any | null,
//   headers = {} as RawAxiosRequestHeaders,
//   responseType = "json" as any,
//   timeout = 20000 as number
// ) => {
//   try {
//     const response = (await axiosInstance({
//       url,
//       method,
//       data: body,
//       headers,
//       responseType,
//       timeout,
//       withCredentials: true, // This is important for sending cookies
//     })) as any;

//     return response?.data || null;
//   } catch (error: any) {
//     console.error(error);
//     return error?.response?.data || error;
//   }
// };

// export default hitApi;
