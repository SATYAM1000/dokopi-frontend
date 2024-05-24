"use client";
import React from "react";
import { TiPlus, TiStarFullOutline } from "react-icons/ti";

const StoreInfo = (props) => {
  return (
    <div className="my-4">
      <div className="flex flex-col-reverse md:flex-row md:items-center justify-between gap-3">
        <h1 className="text-3xl font-semibold">Jadav Jumbo Xerox</h1>
        <div className="flex items-center gap-6 text-xs md:text-base">
          <div className="flex items-center gap-2">
            <span className="flex rounded items-center gap-1 text-white font-medium bg-green-600 px-2 py-1">
              {10}
              <TiPlus />
            </span>
            <span>
              {/* <strong>100</strong> */}
              <p className="border-dashed border-b border-gray-500">
                Active Orders
              </p>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="flex rounded items-center gap-1 text-white font-medium bg-green-600 px-2 py-1">
              {4.5} <TiStarFullOutline />
            </span>
            <span>
              {/* <strong>100</strong> */}
              <p className="border-dashed border-b border-gray-500">Rating</p>
            </span>
          </div>
        </div>
      </div>
      <div className="text-base md:text-lg text-gray-600 flex flex-col gap-2 md:block">
        <h3>Vadgaon budruk pune, Maharastra</h3>
        <h3 className="text-gray-400 text-[15px]">
          Printing, Binding, Cutting, Filing, Scanning
        </h3>
        <div className="text-sm">
          <span className="text-green-500 ">Open Now</span> - 11am - 8pm
          (Today)
        </div>
      </div>
    </div>
  );
};

export default StoreInfo;
