/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  BubbleChatQuestionIcon,
  StarIcon,
  Database01Icon,
  MicrosoftAdminIcon,
  LicenseDraftIcon,
  Calendar02Icon,
  CourseIcon,
  PermanentJobIcon,
  TeachingIcon,
  InboxIcon,
  Appointment01Icon,
} from "@hugeicons/core-free-icons";

const data = [
  {
    icon: (
      <HugeiconsIcon
        icon={BubbleChatQuestionIcon}
        size={22}
        strokeWidth={1.5}
      />
    ),
    text: "Inquiries",
    navigateTo: "/admin/inquiries",
  },
  {
    icon: <HugeiconsIcon icon={InboxIcon} size={22} strokeWidth={1.5} />,
    text: "Scholarship Inquiries",
    navigateTo: "/admin/scholarship-inquiries",
  },
  {
    icon: (
      <HugeiconsIcon icon={Appointment01Icon} size={22} strokeWidth={1.5} />
    ),
    text: "Mentor Bookings",
    navigateTo: "/admin/bookings",
  },
  {
    icon: <HugeiconsIcon icon={Calendar02Icon} size={22} strokeWidth={1.5} />,
    text: "Events",
    navigateTo: "/admin/events",
  },
  {
    icon: <HugeiconsIcon icon={LicenseDraftIcon} size={22} strokeWidth={1.5} />,
    text: "Blogs",
    navigateTo: "/admin/blogs",
  },
  {
    icon: <HugeiconsIcon icon={CourseIcon} size={22} strokeWidth={1.5} />,
    text: "Programs",
    navigateTo: "/admin/programs",
  },
  {
    icon: <HugeiconsIcon icon={PermanentJobIcon} size={22} strokeWidth={1.5} />,
    text: "Job profiles",
    navigateTo: "/admin/job-profiles",
  },
  // {
  //   icon: <HugeiconsIcon icon={Database01Icon} size={22} strokeWidth={1.5} />,
  //   text: "Faqs",
  //   navigateTo: "/admin/faqs",
  // },
  // {
  //   icon: <HugeiconsIcon icon={StarIcon} size={22} strokeWidth={1.5} />,
  //   text: "Testimonials",
  //   navigateTo: "/admin/testimonials",
  // },
  {
    icon: <HugeiconsIcon icon={TeachingIcon} size={22} strokeWidth={1.5} />,
    text: "Mentor categories",
    navigateTo: "/admin/mentor-categories",
  },
  {
    icon: <HugeiconsIcon icon={TeachingIcon} size={22} strokeWidth={1.5} />,
    text: "Mentors",
    navigateTo: "/admin/mentor-accounts",
  },
  {
    icon: (
      <HugeiconsIcon icon={MicrosoftAdminIcon} size={22} strokeWidth={1.5} />
    ),
    text: "Admins",
    navigateTo: "/admin/admin-accounts",
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

  const { userData } = useAuth();

  const [filteredData, setFilteredData] = useState(data?.slice(0, -1));

  useEffect(() => {
    if (userData?.user?.userType === "superAdmin") {
      setFilteredData(data);
    }
  }, [userData]);

  return (
    <>
      {filteredData?.map((item, index) => (
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
