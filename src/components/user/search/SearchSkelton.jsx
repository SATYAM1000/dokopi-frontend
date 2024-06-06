import React from "react";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

const tags = Array.from({ length: 50 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`
);
const SearchSkelton = () => {
  return (
    <ScrollArea className="h-auto w-full rounded-md border bg-white text-black">
      <div className="p-4">
        {Array.from({ length: 3 }).map((_, i) => {
          return (
            <>
              <Skeleton className="text-sm w-full h-[35px] bg-gray-200"></Skeleton>
              <Separator className="my-2" />
            </>
          );
        })}
      </div>
    </ScrollArea>
  );
};

export default SearchSkelton;
