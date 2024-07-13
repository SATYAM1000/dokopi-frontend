"use client";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const MapViewSkelton = () => {
  return (
    <div className="flex flex-col gap-2  ">
      <div>
        <Skeleton className="w-32 h-4 " />
        <div className="flex items-center justify-between w-full">
          <Skeleton className="w-32 h-4 mt-2" />
          <Skeleton className="w-24 h-8 mt-2" />
        </div>
      </div>
      <div className="">
        <Skeleton className=" flex flex-col text-gray-500 gap-1"></Skeleton>
      </div>
      <div>
        {typeof window !== "undefined" && (
          <Skeleton className="w-full h-48 mt-2"></Skeleton>
        )}
      </div>
    </div>
  );
};

export default MapViewSkelton;
