import React from "react";
import { TiPlus, TiStarFullOutline } from "react-icons/ti";
import { getStoreStatus } from "@/lib/get-store-status";
import { CalculateRating } from "@/lib/CalculateRating";

const StoreInfo = ({ storeData, storeReviews }) => {
  const { storeDetails } = storeData;
  const { storeLocation } = storeDetails;
  const rating = CalculateRating(storeReviews);
  const storeStatus =
    storeData?.storeTiming && getStoreStatus(storeData?.storeTiming || null);

  const formatTime = (time) => {
    if (!time) return;
    const [hours, minutes] = time.split(":").map(Number);
    const period = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    return `${formattedHours}:${
      minutes < 10 ? `0${minutes}` : minutes
    } ${period}`;
  };

  return (
    <div className="my-4">
      <div className="flex flex-col-reverse md:flex-row md:items-center justify-between gap-3">
        <h1 className="text-3xl font-semibold">{storeDetails.storeName}</h1>
        <div className="flex items-center gap-6 text-xs md:text-base">
          <div className="flex items-center gap-2">
            <span className="flex rounded items-center gap-1 text-white font-medium bg-indigo-600 px-2 py-1">
              {Math.ceil(Math.random() * 10)}
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
            <span className="flex rounded items-center gap-1 text-white font-medium bg-indigo-600 px-2 py-1">
              {rating} <TiStarFullOutline />
            </span>
            <span>
              <p className="border-dashed border-b border-gray-500">Rating</p>
            </span>
          </div>
        </div>
      </div>
      <div className="text-base md:text-lg text-gray-600 flex flex-col gap-2 md:block">
        <h3>
          {storeLocation.storeLandmark}, {storeLocation.storeCity},{" "}
          {storeLocation.storeState}, {storeLocation.storeCountry},{" "}
          {storeLocation.storeZipCode}
        </h3>
        <h3 className="text-gray-400 text-[15px] font-normal">
          Scanning, Printing, Copying...
        </h3>
        <div className="text-sm flex gap-2">
          {storeData?.storeTiming && storeStatus.isOpen ? (
            <span className="text-green-600 font-medium">Open</span>
          ) : (
            <span className="text-red-600 font-medium">Closed</span>
          )}

          {storeStatus ? (
            storeStatus.isOpen ? (
              <p className="text-gray-600 text-[14px] font-medium block truncate">
                Closes at {formatTime(storeStatus.nextCloseTime)}
              </p>
            ) : (
              <p className="text-gray-600 text-[14px] font-medium block truncate">
                Opens{" "}
                {storeStatus.nextOpenTime &&
                storeStatus.nextOpenTime.includes("at")
                  ? storeStatus.nextOpenTime
                  : `at ${formatTime(storeStatus.nextOpenTime)}`}
              </p>
            )
          ) : (
            <p className="text-gray-600 text-[14px] font-medium block truncate">
              Not available
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StoreInfo;
