"use client";
import React, { useState, startTransition } from "react";
import { signOut } from "next-auth/react";
import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  History,
  Headphones,
  LayoutDashboard,
  LogOut,
  FileClock,
  Lock,
} from "lucide-react";
import { useCurrentUser } from "@/hooks/use-current-user";
import { ClipLoader } from "react-spinners";

const UserAvatar = () => {
  const [showLoader, setShowLoader] = useState(false);
  const currentUser = useCurrentUser();
  if (!currentUser) return null;

  const handleSignOut = () => {
    startTransition(() => {
      setShowLoader(true);
      localStorage.removeItem("userAddress");
      signOut({
        callbackUrl: "/",
      }).finally(() => {
        setShowLoader(false);
      });
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer border">
          <AvatarImage src={currentUser?.image} />
          <AvatarFallback className="font-medium text-black">
            {currentUser?.name.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel className="text-black" asChild>
          <div className="flex flex-col">
            <h3>{currentUser?.name}</h3>
            <p className="text-gray-500 font-normal">{currentUser?.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {currentUser?.role === "USER" && (
          <DropdownMenuItem
            asChild
            className={`cursor-not-allowed text-gray-500`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <FileClock size={17} />
                <p className="pl-3">Active Order</p>
              </div>
              <Lock size={17} />
            </div>
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        {currentUser?.role === "USER" && (
          <DropdownMenuItem asChild className="cursor-pointer">
            <Link href={"/history"} className="flex items-center">
              <History size={17} />
              <p className="pl-3">History</p>
            </Link>
          </DropdownMenuItem>
        )}
        {currentUser?.role === "USER" && (
          <DropdownMenuItem asChild className="cursor-pointer">
            <Link href={"/dashboard"} className="flex items-center">
              <LayoutDashboard size={17} />
              <p className="pl-3">Dashbaord</p>
            </Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem asChild className="cursor-pointer">
          <Link href="/contact" className="flex items-center">
            <Headphones size={17} />
            <p className="pl-3">Support</p>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        <DropdownMenuItem
          asChild
          className="cursor-pointer"
          onClick={handleSignOut}
        >
          <div className="flex items-center">
            {showLoader ? (
              <ClipLoader
                color="black"
                loading={showLoader}
                size={17}
                aria-label="Loading Spinner"
              />
            ) : (
              <LogOut size={17} />
            )}
            <p className="pl-3">Logout</p>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAvatar;
