/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { AuthProvider } from "@/contexts/AuthContext";

import { unstableSetRender } from "antd";
import { createRoot } from "react-dom/client";

unstableSetRender((node, container: any) => {
  container._reactRoot ||= createRoot(container);
  const root = container._reactRoot;
  root.render(node);
  return async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
    root.unmount();
  };
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AuthProvider>{children}</AuthProvider>
    </>
  );
}
