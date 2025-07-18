const config = {
  BE_URL: process.env.NEXT_PUBLIC_BE_URL,

  API_URL: process.env.NEXT_PUBLIC_BE_URL + "/api",
};

export const getFileUrl = (url: string) => {
  if (url?.startsWith("http")) return url;

  if (!url) return "https://placehold.co/200x200?text=No%20Image";

  return `${config.BE_URL}/${url}`;
};

export const fileSizes = {
  // in MB
  profileImage: 5,
  coverImage: 5,
  cv: 5,
  attachment: 5,
};

export default config;
