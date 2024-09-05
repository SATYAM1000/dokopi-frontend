"use client";
import React, { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_DOMAIN } from "@/lib/constants";
import ShowSearchResult from "../search/ShowSearchResult";
import useDebounceCustomeHook from "@/hooks/useDebouceCustomeHook";
import SearchSkelton from "../search/SearchSkelton";

function SearchResults(QueryRelatedTo, SearchInput) {
  return (
    useQuery({
      queryKey: ['SearchAccoringtoFilter', QueryRelatedTo, SearchInput],
      queryFn: async () => {
        const res = await axios.get(`${API_DOMAIN}/api/v1/user/stores/search?${QueryRelatedTo}=${SearchInput}`);
        return res.data;
      },
      enabled: SearchInput.length > 2
    })
  )
}
const SearchComponent = ({ classNameForSearchBox }) => {

  const [queryInput, setQueryInput] = useState("")
  const [searchQueryParameter, setSearchQueryParameter] = useState("Name");
  const [outerSearchHoverColor, setOuterSearchHoverColor] = React.useState(
    "bg-white border-[2px] border-gray-600/[0.2]"
  );
  const [searchType, setSearchType] = useState("bg-white");

  const debouncedValueSearch = useDebounceCustomeHook(queryInput, 500)


  const { error, data, isError, isLoading } = SearchResults(searchQueryParameter, debouncedValueSearch)
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
      className={`${classNameForSearchBox} ${outerSearchHoverColor}`}
      onMouseEnter={() =>
        setOuterSearchHoverColor("bg-gray-200 border-[2px] border-white ")
      }
      onMouseLeave={() =>
        setOuterSearchHoverColor("bg-white border-[2px] border-gray-600/[0.2] ")
      }
    >
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex h-[100%] rounded-full ps-2 hover:bg-white items-center w-[100%] transition duration-500"
        onMouseEnter={() => setSearchType("bg-gray-200")}
        onMouseLeave={() => setSearchType("bg-white")}
      >
        <button type="submit">
          <Search size={20} className="text-gray-700" />
        </button>
        <Input
          type="search"
          placeholder="Search store by"
          className=" h-[40px] text-black  text-[14px] border-none outline-none bg-transparent"
          onChange={(e) => setQueryInput(e.target.value)}
        />
      </form>
      <DropdownMenu>
        <DropdownMenuTrigger
          asChild
          className={`w-[180px] flex items-center gap-2 px-4 
          rounded-full  cursor-pointer text-gray-700 hover:bg-white h-[100%] border-none transition duration-500 ${searchType}`}
        >
          <div className="flex items-center justify-between gap-2">
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
            <div className="flex flex-col text-black cursor-pointer">
              <p className="text-[13px] font-medium">Name </p>
              <p className="text-[12px] text-gray-800">Find stores by name</p>
            </div>
          </DropdownMenuItem>

          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={onClickPhone}
            className={searchQueryParameter === "Phone" ? "bg-gray-200" : ""}
          >
            <div className="flex flex-col text-gray-700 cursor-pointer">
              <p className="text-[13px] text-black font-medium">Phone</p>
              <p className="text-[12px] text-gray-800">
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
              <p className="text-[13px] text-black font-medium">Location </p>
              <p className="text-[12px] text-gray-800">Find stores by location</p>
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <div className={`absolute left-0 top-full z-10 mt-2 w-full rounded max-md:top-12 max-md:w-10/12 max-md:mr-3 max-md:ml-6 max-md:mt-0 ${isError || isLoading ? "" : "bg-[#f7f7f7]"}`}>
       
        {
          isLoading && <SearchSkelton/>
        }
        {
          queryInput.length > 2 && data && <ShowSearchResult Iserror={error} Response={data} />
        }
        {
          isError && <span className="text-xs text-red-600">Some Error is being occured while fetching the result</span>
        }

      </div>
    </div>
  );
};

export default SearchComponent;
