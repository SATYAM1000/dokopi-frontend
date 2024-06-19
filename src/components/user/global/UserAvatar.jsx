"use client";
import React, { useState, startTransition, useEffect } from "react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import axios from "axios";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { History, Headphones, LogOut, FileClock, Lock } from "lucide-react";
import { useCurrentUser } from "@/hooks/use-current-user";
import { ClipLoader } from "react-spinners";
import { API_DOMAIN } from "@/lib/constants";
import { fetchAccessToken } from "@/actions/access-token";
import { useRouter } from "next/navigation";

const UserAvatar = () => {
  const [showLoader, setShowLoader] = useState(false);
  const [hasActiveOrders, setHasActiveOrders] = useState(false);
  const currentUser = useCurrentUser();
  const router = useRouter();
  if (!currentUser) return null;

  const fetchUserActiveOrders = async () => {
    try {
      const accessToken = await fetchAccessToken();
      const response = await axios.get(
        `${API_DOMAIN}/api/v1/user/orders/active`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const { data } = response;
      if (data?.success) {
        setHasActiveOrders(true);
      } else {
        setHasActiveOrders(false);
      }
    } catch (error) {
      setHasActiveOrders(false);
    }
  };

  useEffect(() => {
    if (currentUser) {
      fetchUserActiveOrders();
    }
  }, []);

  const onActiveTabClick = () => {
    router.replace("/active-orders");
  };

  const handleSignOut = () => {
    startTransition(() => {
      setShowLoader(true);
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

        <DropdownMenuItem
          asChild
          disabled={!hasActiveOrders}
          className={`${
            !hasActiveOrders
              ? "cursor-not-allowed text-gray-500"
              : "cursor-pointer  "
          }`}
        >
          <div
            className="flex items-center justify-between"
            onClick={onActiveTabClick}
          >
            <div className="flex items-center">
              <FileClock size={17} />
              <p className="pl-3">Active Order</p>
            </div>
            {hasActiveOrders ? (
              <>
                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse "></div>
              </>
            ) : (
              <Lock size={17} />
            )}
          </div>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild className="cursor-pointer">
          <Link href={"/history"} className="flex items-center">
            <History size={17} />
            <p className="pl-3">History</p>
          </Link>
        </DropdownMenuItem>

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
