"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import Wrapper from "../../Wrapper";

const StoreNavbar = () => {
  const pathname = usePathname();
  const path = pathname.split("/")[3];

  return (
    <section className="w-full h-auto flex items-center justify-between md:justify-start gap-6 md:gap-8 mt-2 border-b py-0 overflow-hidden ">
      <Link href={"/stores/123/overview"}>
        <Button
          variant="outline"
          size="sm"
          className={`text-[17px] text-black-500 rounded-none border-t-0 border-l-0 border-r-0 border-b-2  px-2 hover:bg-transparent hover:text-black-500 font-medium  ${
            path === "overview"
              ? "border-blue-500 text-blue-500"
              : "border-transparent"
          }`}
        >
          Overview
        </Button>
      </Link>

      <Link href={"/stores/123/upload-files"}>
        <Button
          variant="outline"
          size="sm"
          className={`font-medium text-[17px] rounded-none border-t-0 border-l-0 border-r-0 border-b-0  px-2 ml-2 hover:bg-transparent ${
            path === "upload-files"
              ? "border-b-2 border-blue-500 text-blue-500 hover:text-blue-500"
              : ""
          }`}
        >
          Upload Files
        </Button>
      </Link>
      <Link href={"/stores/123/shop"}>
        <Button
          variant="outline"
          size="sm"
          className={`font-medium text-[17px] rounded-none border-t-0 border-l-0 border-r-0 border-b-0  px-2 ml-2 hover:bg-transparent ${
            path === "shop"
              ? "border-b-2 border-blue-500 text-blue-500 hover:text-blue-500"
              : ""
          }`}
        >
          Shop
        </Button>
      </Link>
    </section>
  );
};

export default StoreNavbar;
