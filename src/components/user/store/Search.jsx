"use client";
import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ChevronDown } from "lucide-react";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import axios from "axios";

const SearchComponent = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const onSearch = useDebouncedCallback((e) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    if (e.target.value) {
      e.target.value.length > 2 && params.set("search", e.target.value);
    } else {
      params.delete("search");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="hidden md:flex flex-1  max-w-[350px] h-[40px] items-center justify-between gap-2 p-0.5 border border-black/[0.5] rounded-full ">
      <form
        onSubmit={onSearch}
        className="flex h-[100%] rounded-full px-2 hover:bg-gray-200 items-center w-[100%]"
      >
        <button type="submit">
          <Search size={20} className="text-black" />
        </button>
        <Input
          type="text"
          placeholder="Search"
          className=" h-[40px]  text-[14px] border-none outline-none bg-transparent placeholder:text-gray-700"
          onChange={onSearch}
        />
      </form>
      <div className="flex items-center gap-2 px-4 hover:rounded-full border-l border-black/[0.3] hover:border-none cursor-pointer hover:bg-gray-200 h-[100%]">
        <p className=" text-gray-700 text-[14px]">Services</p>
        <ChevronDown size={20} className="text-gray-700" />
      </div>
    </div>
  );
};

export default SearchComponent;
