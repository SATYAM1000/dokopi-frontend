"use client";
import React, { useState } from "react";
import { Search } from "lucide-react";
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

const SearchComponent = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [searchQueryParameter, setSearchQueryParameter] = useState("");

  const [outerSearchHoverColor, setOuterSearchHoverColor] = React.useState(
    "bg-white border-2 border-black/[0.5]"
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
    setOuterSearchHoverColor("bg-white border-2 border-black/[0.5]");
    setSearchQueryParameter(e);
  };

  return (
    <div
      className={`hidden md:flex flex-1  max-w-[350px] h-[40px] items-center justify-between gap-2 p-0.5  rounded-full transition duration-500 ${outerSearchHoverColor}`}
      onMouseEnter={() =>
        setOuterSearchHoverColor("bg-gray-200 border-2 border-white ")
      }
      onMouseLeave={() =>
        setOuterSearchHoverColor("bg-white border-2 border-black/[0.5]")
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
          className=" h-[40px] text-black  text-[14px] border-none outline-none bg-transparent placeholder:text-gray-700"
          onChange={onSearch}
        />
      </form>

      <Select className="text-gray-700" onValueChange={handleSelectItemClick}>
        <SelectTrigger
          className={`w-[180px] flex items-center gap-2 px-4 
          rounded-full  cursor-pointer text-gray-700 hover:bg-white h-[100%] border-none transition duration-500 ${searchType}`}
        >
          <SelectValue
            className=" text-gray-700 text-[14px] placeholder:text-black"
            placeholder="Services"
          />

          <ChevronDown size={20} className="text-gray-700" />
        </SelectTrigger>
        <SelectContent className="text-black">
          <SelectItem value="storeName" className="text-black ">
            {" "}
            Name
          </SelectItem>
          <SelectItem value="storeLandmark" className="text-black">
            Location
          </SelectItem>
          <SelectItem value="storePhoneNumber" className="text-black">
            Phone
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SearchComponent;
