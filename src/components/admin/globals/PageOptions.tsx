/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  InboxIcon,
  UserIcon,
  ShieldUserIcon,
  ShieldIcon,
} from "@hugeicons/core-free-icons";

const data = [
  {
    icon: <HugeiconsIcon icon={InboxIcon} size={22} strokeWidth={1.5} />,
    text: "Finance Records",
    navigateTo: "/admin/finance-records",
  },
  {
    icon: <HugeiconsIcon icon={UserIcon} size={22} strokeWidth={1.5} />,
    text: "Users",
    navigateTo: "/admin/users",
  },
  {
    icon: <HugeiconsIcon icon={ShieldUserIcon} size={22} strokeWidth={1.5} />,
    text: "Roles",
    navigateTo: "/admin/roles",
  },
  {
    icon: <HugeiconsIcon icon={ShieldIcon} size={22} strokeWidth={1.5} />,
    text: "Permissions",
    navigateTo: "/admin/permissions",
  },
];

const PageOptions = ({ close }: { close?: () => void }) => {
  // NavItem component (unchanged)
  const NavItem = ({
    icon,
    text,
    navigateTo,
  }: {
    icon: any;
    text: string;
    navigateTo: string;
  }) => {
    const isActive = usePathname().includes(navigateTo);

    return (
      <Link
        href={navigateTo}
        onClick={close}
        className={`w-full flex items-center gap-2 2xl:gap-4 py-3 xl:py-5 px-5 2xl:px-7 duration-400 ease-in-out cursor-pointer xl:rounded-lg text-sm transition-all border-l-4 
              ${
                isActive
                  ? "!text-primary-dark font-medium bg-gradient-to-r from-primary-light to-gray-100 xl:translate-x-3 xl:scale-[0.98] border-primary"
                  : "!text-[#323232] bg-white xl:shadow-sm border-transparent"
              }
          `}
      >
        <div>{icon}</div>
        <div>{text}</div>
      </Link>
    );
  };

  return (
    <>
      {data?.map((item, index) => (
        <NavItem
          key={index}
          icon={item.icon}
          text={item.text}
          navigateTo={item.navigateTo}
        />
      ))}
    </>
  );
};

export default PageOptions;
