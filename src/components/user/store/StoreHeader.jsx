"use client";
import React from "react";
import Wrapper from "../Wrapper";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { SlidersHorizontal } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const StoreHeader = () => {
  return (
    <section className="w-full h-[70px] border-b border-black/[0.1]">
      <Wrapper
        className={"w-full h-[70px] flex items-center justify-between gap-4"}
      >
        {/* -----------search---- */}
        <div className="flex flex-1 max-w-[500px] h-[45px] items-center gap-2 pr-4 border rounded-md bg-gray-100">
          <Input
            type="text"
            placeholder="Search"
            className=" h-[40px] text-[16px] border-none outline-none bg-transparent"
          />

          <Search size={20} />
        </div>

        {/* -----------filter------------- */}

        <Sheet>
          <SheetTrigger asChild>
            <div className="flex flex-1/2 items-center gap-2 border rounded-md bg-gray-100 px-4 py-2 h-[45px]">
              <button className="text-[16px] font-medium  hidden md:flex">
                Filter
              </button>
              <SlidersHorizontal size={17} />
            </div>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Filter stores based on requirements.</SheetTitle>
              <SheetDescription>
                Select the criteria you want to filter by.
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </Wrapper>
    </section>
  );
};

export default StoreHeader;
