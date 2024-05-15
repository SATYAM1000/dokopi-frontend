"use client";
import React, { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ChevronDown } from "lucide-react";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const SearchComponent = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [searchQueryParameter, setSearchQueryParameter] = useState("Name");

  const [outerSearchHoverColor, setOuterSearchHoverColor] = React.useState(
    "bg-white border-[2px] border-gray-600/[0.2]"
  );
  const [searchType, setSearchType] = useState("bg-white");

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

  const onClickName = () => {
    setOuterSearchHoverColor("bg-white border-[2px] border-gray-600/[0.2]");
    setSearchQueryParameter("Name");
  };

  const onClickLocation = () => {
    setOuterSearchHoverColor("bg-white border-[2px] border-gray-600/[0.2]");
    setSearchQueryParameter("Location");
  };

  const onClickPhone = () => {
    setOuterSearchHoverColor("bg-white border-[2px] border-gray-600/[0.2]");
    setSearchQueryParameter("Phone");
  };

  return (
    <div
      className={`hidden md:flex flex-1  max-w-[350px] h-[40px] items-center justify-between gap-2 p-0.5  rounded-full transition duration-500 ${outerSearchHoverColor}`}
      onMouseEnter={() =>
        setOuterSearchHoverColor("bg-gray-200 border-[2px] border-white ")
      }
      onMouseLeave={() =>
        setOuterSearchHoverColor("bg-white border-[2px] border-gray-600/[0.2]")
      }
    >
      <form
        onSubmit={onSearch}
        className="flex h-[100%] rounded-full px-2 hover:bg-white items-center w-[100%] transition duration-500"
        onMouseEnter={() => setSearchType("bg-gray-200")}
        onMouseLeave={() => setSearchType("bg-white")}
      >
        <button type="submit">
          <Search size={20} className="text-gray-700" />
        </button>
        <Input
          type="text"
          placeholder="Search store by"
          className=" h-[40px] text-black  text-[14px] border-none outline-none bg-transparent"
          onChange={onSearch}
        />
      </form>

      <DropdownMenu>
        <DropdownMenuTrigger
          asChild
          className={`w-[180px] flex items-center gap-2 px-4 
          rounded-full  cursor-pointer text-gray-700 hover:bg-white h-[100%] border-none transition duration-500 ${searchType}`}
        >
          <div className="flex items-center gap-2">
            <p className="text-gray-700 text-[14px] font-medium">
              {searchQueryParameter}
            </p>
            <ChevronDown size={20} className="text-gray-700" />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            onClick={onClickName}
            className={searchQueryParameter === "Name" ? "bg-gray-200" : ""}
          >
            <div className="flex flex-col text-gray-700 cursor-pointer">
              <p className="text-[13px]">Name </p>
              <p className="text-[12px] text-gray-600">Find stores by name</p>
            </div>
          </DropdownMenuItem>

          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={onClickPhone}
            className={searchQueryParameter === "Phone" ? "bg-gray-200" : ""}
          >
            <div className="flex flex-col text-gray-700 cursor-pointer">
              <p className="text-[13px]">Phone</p>
              <p className="text-[12px] text-gray-600">
                Find stores by phone number
              </p>
            </div>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={onClickLocation}
            className={searchQueryParameter === "Location" ? "bg-gray-200" : ""}
          >
            <div className="flex flex-col text-gray-700 cursor-pointer">
              <p className="text-[13px]">Location </p>
              <p className="text-[12px] text-gray-600">Find stores by location</p>
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default SearchComponent;
