"use client";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const MapViewSkelton = () => {
  return (
    <div className="border flex flex-col gap-2 p-4 shadow rounded-md  ">
      <Skeleton className="w-full h-24 mt-2"></Skeleton>
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
