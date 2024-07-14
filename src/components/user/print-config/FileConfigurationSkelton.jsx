"use client";

import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const FileConfigurationSkelton = () => {
  return (
    <div className={`min-h-32 rounded-lg border border-gray-200 p-4`}>
      <Skeleton className="w-40 h-6 rounded-md" />
      <div className="mt-4 flex flex-col gap-6 w-full text-gray-700">
        {/* --------------🔥🔥FILE COPIES COUNT🔥🔥------------------- */}
        <div className="grid w-full items-center gap-2">
          <Skeleton className="w-full border border-gray-200 rounded-sm h-[40px] pl-2" />
        </div>

        {/* --------------🔥🔥PAPER SIZE🔥🔥------------------- */}
        <div className="grid w-full items-center gap-2">
          <Skeleton className="w-full border border-gray-200 rounded-sm h-[40px] pl-2" />
        </div>

        {/* --------------------🔥🔥PRINT TYPE🔥🔥---------------------- */}
        <div className="grid w-full items-center gap-2">
          <Skeleton className="w-full border border-gray-200 rounded-sm h-[40px] pl-2" />
        </div>

        {/* --------------------🔥🔥PRINTING SIDES 🔥🔥--------------------- */}

        <div className="grid w-full items-center gap-2">
          <Skeleton className="w-full border border-gray-200 rounded-sm h-[40px] pl-2" />
        </div>

        {/* ------------------🔥🔥MESSAGE FOR XEROX STORE🔥🔥--------------------- */}
        <div className="grid w-full items-center gap-2">
          <div className="w-full">
            <Skeleton className="w-full border border-gray-200 rounded-sm h-[80px] pl-2" />
          </div>
        </div>

        {/* ----------- 🔥🔥BUTTONS🔥🔥 ----------- */}
        <div className="w-full grid grid-cols-2 items-center gap-4">
          <Skeleton className="w-full h-[40px]  text-white rounded-md" />

          <Skeleton className="w-full h-[40px]  text-white rounded-md" />
        </div>
      </div>
    </div>
  );
};

export default FileConfigurationSkelton;
