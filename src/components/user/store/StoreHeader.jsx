"use client";
import React, { useState } from "react";
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

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import axios from "axios";

const StoreHeader = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const onSearch = useDebouncedCallback((e) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    if (e.target.value) {
      e.target.value.length > 2 && params.set("search", e.target.value);
    }else{
      params.delete("search");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <section className="  w-full h-[70px] border-b border-black/[0.05]">
      <Wrapper
        className={"w-full h-[70px] flex items-center justify-between gap-4"}
      >
        {/* -----------search---- */}

        <form
          onSubmit={onSearch}
          className="flex flex-1 max-w-[500px] h-[45px] items-center gap-2 pr-4 border rounded-md bg-gray-50"
        >
          <Input
            type="text"
            placeholder="Search by name, phone, location ..."
            className=" h-[40px] text-[16px] border-none outline-none bg-transparent"
            onChange={onSearch}
          />

          <button type="submit">
            <Search size={20} />
          </button>
        </form>

        {/* -----------filter------------- */}

        <Sheet>
          <SheetTrigger asChild>
            <div className="flex flex-1/2 items-center gap-2 border rounded-md bg-gray-50 px-4 py-2 h-[45px]">
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

