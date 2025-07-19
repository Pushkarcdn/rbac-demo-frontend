/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { getFileUrl } from "@/config";
import { useAuth } from "@/contexts/AuthContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  const toggleDropdown = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node) &&
      hamburgerRef.current &&
      !hamburgerRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [handleClickOutside]);

  const NavItem = ({
    name,
    href,
    currentPath,
  }: {
    name: string;
    href: string;
    currentPath: string;
  }) => {
    const isActive = currentPath === href;

    return (
      <Link href={href} onClick={() => setIsOpen(false)}>
        <span
          className={`${
            isActive ? "font-bold text-[#DEAD00]" : "text-secondary"
          } hover:text-[#DEAD00] transition-colors cursor-pointer flex items-center`}
        >
          {name}
        </span>
      </Link>
    );
  };

  const { userData } = useAuth();

  return (
    <nav
      className={`bg-white bg-opacity-80 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-200`}
    >
      <div className="px-3 sm:px-8 py-4 flex items-center justify-between">
        <Link href="/admin">
          <h2 className="text-xl font-semibold">Manager portal</h2>
        </Link>

        {userData && (
          <div className="flex items-center gap-2 select-none text-right">
            <div className="flex-col gap-0 hidden sm:flex">
              <h4 className="font-medium">{userData?.full_name}</h4>
              <h4 className="text-xs">{userData?.email}</h4>
            </div>
            <Image
              src={`${getFileUrl(userData?.profileImage)}`}
              alt={""}
              width={40}
              height={40}
              className="rounded-full w-12 h-12 aspect-square object-cover object-center"
            />
          </div>
        )}

        {/* <button
          ref={hamburgerRef}
          onClick={toggleDropdown}
          aria-label="Toggle menu"
          className="flex sm:hidden"
        >
          <HamburgerIcon isOpen={isOpen} />
        </button> */}
      </div>

      {isOpen && (
        <div
          ref={dropdownRef}
          className="sm:hidden absolute right-0 w-full bg-white shadow-lg"
        >
          <div className="flex flex-col py-6 px-6 space-y-6">
            <NavItem name="Home" href="/" currentPath={pathname} />
            <NavItem name="Careers" href="/careers" currentPath={pathname} />
            {/* <NavItem name="Services" href="/services" currentPath={pathname} /> */}
            {/* <NavItem name="Contact us" href="/contact" currentPath={pathname} /> */}
          </div>
        </div>
      )}
    </nav>
  );
}
