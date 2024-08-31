import React from "react";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { getStoreStatus } from "@/lib/get-store-status";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";


const SingleStoreCard = ({ storeData, location }) => {
  if (!storeData) return null;

  const { storeLocationCoordinates } = storeData;
  const { coordinates } = storeLocationCoordinates;

  const storeStatus =
    storeData?.storeHours && getStoreStatus(storeData?.storeHours || null);
  const formatTime = (time) => {
    if (!time) return;
    const [hours, minutes] = time.split(":").map(Number);
    const period = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    return `${formattedHours}:${
      minutes < 10 ? `0${minutes}` : minutes
    } ${period}`;
  };

  const DirectionURL = `https://www.google.com/maps/dir/?api=1&destination=${coordinates[1]},${coordinates[0]}`;

  return (
    <Link
      href={`/stores/${storeData?.storeId}`}
      className="transition-all border border-gray-200 cursor-pointer rounded-xl shadow-sm md:hover:shadow-[0_0_10px_0_rgba(0,0,0,0.15)] hover:border-gray-200"
    >
      <div className="relative flex flex-col px-2 py-2 overflow-hidden">
        <div className="overflow-hidden rounded-md">
          <div className="relative w-full h-full">
            <Image
              src={
                storeData?.storeImagesKeys?.length > 0
                  ? `https://d28fpa5kkce5uk.cloudfront.net/${storeData?.storeImagesKeys[0]}`
                  : "/test/blur.jpeg"
              }
              width={600}
              height={400}
              placeholder="blur"
              blurDataURL="/test/blur.jpeg"
              alt="store"
              className="h-[245px] object-cover object-center rounded-lg animate-blurred-fade-in "
            />
            <Badge
              className={
                storeStatus?.isOpen
                  ? "absolute top-2 right-2 bg-green-100 text-green-600 border-green-600 hover:bg-green-100 hover:text-green-600 hover:border-green-600"
                  : "absolute top-2 right-2 bg-red-100 text-red-600 border-red-600 hover:bg-red-100 hover:border-red-600 hover:text-red-600"
              }
            >
              <div
                className={`h-2 w-2 rounded-full mr-1 ${
                  storeStatus?.isOpen ? "bg-green-600" : "bg-red-600"
                }`}
              ></div>
              {storeStatus?.isOpen ? "Open" : "Closed"}
            </Badge>
          </div>
        </div>

        <div className="flex items-center justify-between w-full">
          <h5 className="text-[17px] font-medium mt-3 text-gray-800 truncate">
            {storeData?.storeName}
          </h5>
          <a
            href={DirectionURL}
            target="_blank"
            onClick={(e) => e.stopPropagation()} // Prevents Link click event
            className="flex items-center justify-center font-medium gap-1 text-[12px] border border-gray-200 cursor-pointer bg-gray-50 text-gray-900 px-2 py-1 rounded-md mt-2"
          >
            Direction
            <ArrowUpRight size={16} />
          </a>
        </div>
        <p className="text-gray-500 font-medium text-[14px] mt-1 truncate">
          {storeData?.storeLandmark}
        </p>
        <div className="flex items-center justify-end w-full mt-1 ">
          {storeStatus ? (
            storeStatus.isOpen ? (
              <p className="block text-xs font-medium text-gray-800 truncate">
                Closes at {formatTime(storeStatus.nextCloseTime)}
              </p>
            ) : (
              <p className="block text-xs font-medium text-gray-800 truncate">
                Opens{" "}
                {storeStatus.nextOpenTime &&
                storeStatus.nextOpenTime.includes("at")
                  ? storeStatus.nextOpenTime
                  : `at ${formatTime(storeStatus.nextOpenTime)}`}
              </p>
            )
          ) : (
            <p className="block text-xs font-medium text-gray-800 truncate">
              Not available
            </p>
          )}

          {/* <p className="text-slate-500 font-normal text-[14px] truncate">
            {storeData?.distance < 1000
              ? `${storeData?.distance?.toFixed(0)} m`
              : `${(storeData?.distance / 1000).toFixed(1)} km`}
            <span className="ml-1.5">away</span>
          </p> */}
        </div>
      </div>
    </Link>
  );
};

export default SingleStoreCard;
