"use client";

import PageOptions from "./PageOptions";
import Logout from "@/components/ui/Logout";

// Sidebar component
const Sidebar = () => {
  return (
    <div className="relative w-full h-full hidden xl:flex">
      <div className="==group ==scrollbar-group flex flex-col w-full h-full absolute top-0 left-0 overflow-hidden gap-4 text-base py-2">
        {/* Scrollable Section */}
        <div className="w-full overflow-y-auto overflow-x-hidden flex flex-col gap-3 pl-3 ==group-hover:pr-2 pb-1 transition-all text-nowrap flex-grow ==scrollbar no-scrollbar">
          <PageOptions />
        </div>

        {/* Logout Section */}
        <div className="flex-grow min-h-20 flex flex-col justify-end gap-2 px-3 py-2">
          <Logout />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
