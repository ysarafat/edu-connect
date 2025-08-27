"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MobileSidebar } from "./mobile-sidebar";

export const Navbar = () => {
  const [loggedInUser, setLoggedInUser] = useState({});
  useEffect(() => {
    async function fetchMe() {
      try {
        const response = await fetch("/api/me");
        const data = await response.json();
        setLoggedInUser(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchMe();
  }, []);

  return (
    <div className="p-4 border-b h-full flex items-center bg-white shadow-sm">
      <MobileSidebar />
      <div className="flex items-center justify-end  w-full">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="cursor-pointer">
              <Avatar>
                <AvatarImage
                  src={loggedInUser?.profilePicture}
                  alt="user_profile_picture"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 mt-4">
            {/* <DropdownMenuItem className="cursor-pointer">
              <Link href="">Item One</Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <Link href="">Item Two</Link>
            </DropdownMenuItem> */}
            <DropdownMenuItem className="cursor-pointer">
              <Link href="#" onClick={() => signOut()}>
                Logout
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
