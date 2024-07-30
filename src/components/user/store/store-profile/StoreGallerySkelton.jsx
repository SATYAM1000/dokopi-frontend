
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const StoreGallerySkelton = () => {
  return (
    <>
      <Skeleton className="w-full h-60 md:hidden"></Skeleton>

      <div className="hidden w-full h-96 md:flex gap-1">
        <Skeleton className="w-full h-full overflow-hidden rounded-lg"></Skeleton>

        <div className="w-1/4 h-full flex flex-col gap-1 overflow-hidden">
          <div className="w-full h-2/4 overflow-hidden rounded-lg">
            <Skeleton className="w-full h-full" />
          </div>
          <div className="w-full h-2/4 overflow-hidden rounded-lg">
            <Skeleton className="w-full h-full" />
          </div>
        </div>
        <div className="w-1/4 h-full flex flex-col gap-1 overflow-hidden">
          <div className="w-full h-2/4 relative">
            <Skeleton className="w-full h-full" />
          </div>
          <div className="w-full h-2/4 relative">
            <Skeleton className="w-full h-full" />
          </div>
        </div>
      </div>
    </>
  );
};

export default StoreGallerySkelton;
