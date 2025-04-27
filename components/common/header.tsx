import React from "react";
import SearchHeader from "./search-header";
import { Bell, Sun } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarTrigger } from "../ui/sidebar";

const Header = () => {
  const hasNotification = true;
  return (
    <div>
      <div className="flex items-center justify-between m-3">
        <div className="flex items-center gap-3 ">
          <SidebarTrigger />
          <SearchHeader />
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-gray-200 p-2 rounded-full cursor-pointer hidden md:block">
            <Sun size={20} />
          </div>
          <div className="relative bg-gray-200 p-2 rounded-full cursor-pointer hidden md:block">
            <Bell size={20} />
            {hasNotification && (
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />
            )}
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger className="items-center gap-2 mx-5 hidden md:flex">
              <div className="rounded-full w-2 h-2 bg-green-500" />
              <span>Hi, Admin!</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default Header;
