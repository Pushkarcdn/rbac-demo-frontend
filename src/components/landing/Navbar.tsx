/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";

import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";

export default function UserNavbar() {
  const navItems = [
    {
      name: "About",
      link: "/about",
    },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { userData } = useAuth();

  return (
    <div className="w-full fixed top-0 left-0 right-0 z-50 py-2">Navbar</div>
  );
}
