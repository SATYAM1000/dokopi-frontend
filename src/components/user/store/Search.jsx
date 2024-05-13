"use client";
import React, { useState } from "react";
import { Handshake, Phone, Search, Store } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ChevronDown } from "lucide-react";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const SearchComponent = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [searchQueryParameter, setSearchQueryParameter] = useState("");

  const [outerSearchHoverColor, setOuterSearchHoverColor] = React.useState(
    "bg-white border-2 border-gray-700/[0.4]"
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

  const handleSelectItemClick = (e) => {
    setOuterSearchHoverColor("bg-white border-2 border-gray-700/[0.4]");
    setSearchQueryParameter(e);
  };

  return (
    <div
      className={`hidden md:flex flex-1  max-w-[350px] h-[40px] items-center justify-between gap-2 p-0.5  rounded-full transition duration-500 ${outerSearchHoverColor}`}
      onMouseEnter={() =>
        setOuterSearchHoverColor("bg-gray-200 border-2 border-white ")
      }
      onMouseLeave={() =>
        setOuterSearchHoverColor("bg-white border-2 border-gray-700/[0.4]")
      }
    >
      <form
        onSubmit={onSearch}
        className="flex h-[100%] rounded-full px-2 hover:bg-white items-center w-[100%] transition duration-500"
        onMouseEnter={() => setSearchType("bg-gray-200")}
        onMouseLeave={() => setSearchType("bg-white")}
      >
        <button type="submit">
          <Search size={20} className="text-black" />
        </button>
        <Input
          type="text"
          placeholder="Search store by"
          className=" h-[40px] text-black  text-[14px] border-none outline-none bg-transparent placeholder:text-gray-700 placeholder:font-medium"
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
            <p className="text-gray-700 text-[14px] font-medium">Services</p>
            <ChevronDown size={20} className="text-gray-700" />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Search by</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleSelectItemClick}>
            <div className="flex items-center gap-2 text-gray-700">
              <Store size={17} className="text-gray-700" />
              <p>Name</p>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleSelectItemClick} >
            <div className="flex items-center gap-2 text-gray-700">
              <Handshake size={17} className="text-gray-700" />
              <p>Services</p>
            </div>
          </DropdownMenuItem >
          <DropdownMenuItem onClick={handleSelectItemClick}>
            <div className="flex items-center gap-2 text-gray-700">
              <Phone size={17} className="text-gray-700" />
              <p>Phone</p>
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default SearchComponent;
