"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

import Wrapper from "./Wrapper";
import { Button } from "../../ui/button";
import { useCurrentUser } from "@/hooks/use-current-user";
import UserAvatar from "./UserAvatar";
import LocationAccess from "./LocationAccess";
import { IoCartOutline } from "react-icons/io5";
import SearchComponent from "../store/Search";
import { useSelector, useDispatch } from "react-redux";

import { setInitialCartItems } from "@/providers/redux/reducers/cart-slice";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import DokopiCartComponent from "../cart/DokopiCartComponent";

const Navbar = ({ apiKey }) => {
  const currentUser = useCurrentUser();
  const [show, setShow] = useState("translate-y-0 ");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [cartItemCount, setCartItemCount] = useState(0);

  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);

  useEffect(() => {
    setCartItemCount(cartItems.length);
  }, [cartItems]);

  useEffect(() => {
    const savedCartItems = localStorage.getItem("cartItems");
    if (savedCartItems) {
      dispatch(setInitialCartItems(JSON.parse(savedCartItems)));
    }
  }, [dispatch]);

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY]);

  const controlNavbar = () => {
    if (window.scrollY > 0) {
      setShow("bg-white/[0.80]  ");
    } else {
      setShow("translate-y-0 ");
    }
    setLastScrollY(window.scrollY);
  };

  return (
    <nav
      className={`w-full h-[70px] md:h-[80px] bg-white flex items-center justify-between z-10 sticky top-0 transition-transform duration-300 border-b border-black/[0.1] ${show} `}
    >
      <Wrapper className={`h-[70px] flex justify-between items-center`}>
        <div className="flex flex-col items-start">
          <Link href={"/"}>
            <h2 className="text-3xl font-extrabold  leading-tight text-black sm:text-3xl lg:text-3xl ">
              DoKopi
            </h2>
          </Link>
          <LocationAccess apiKey={apiKey} />
        </div>
        <div className={`flex items-center justify-center gap-4 text-white`}>
          <div className={`flex items-center`}>
            <div className="flex items-center gap-4 md:gap-6">
              <SearchComponent />

              <Sheet>
                <SheetTrigger asChild>
                  <div className="p-1 cursor-pointer relative hover:bg-gray-100 rounded-md border border-white hover:border hover:border-black/[0.1] transition-all">
                    <IoCartOutline size={30} className="text-gray-700" />
                    {cartItemCount > 0 ? (
                      <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-[10px] flex justify-center items-center">
                        {cartItemCount}
                      </span>
                    ) : null}
                  </div>
                </SheetTrigger>
                <SheetContent className="w-[400px] sm:w-[w-full]">
                  <SheetHeader>
                    <SheetTitle className="text-xl">Your Cart</SheetTitle>
                    <SheetDescription>
                      You have {cartItemCount} items in your cart
                    </SheetDescription>
                  </SheetHeader>
                  <DokopiCartComponent />
                  <SheetFooter></SheetFooter>
                </SheetContent>
              </Sheet>

              {currentUser ? (
                <UserAvatar />
              ) : (
                <Link href={"/auth/sign-in"}>
                  <Button size="sm">Sign in</Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </Wrapper>
    </nav>
  );
};

export default Navbar;
