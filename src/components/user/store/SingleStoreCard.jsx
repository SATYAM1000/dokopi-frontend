import React from "react";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { getStoreStatus } from "@/lib/get-store-status";
import { useRouter } from "next/navigation";

import { Badge } from "@/components/ui/badge";

const SingleStoreCard = ({ storeData, location }) => {
  if (!storeData) return null;
  const { storeLocationCoordinates } = storeData;
  const { coordinates } = storeLocationCoordinates;
  const router = useRouter();

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

  const handleCardClick = () => {
    router.push(`/stores/${storeData?.storeId}`);
  };

  const DirectionURL = `https://www.google.com/maps/dir/?api=1&destination=${coordinates[1]},${coordinates[0]}`;

  return (
    <div
      onClick={handleCardClick}
      className="rounded-xl shadow-md border hover:border-gray-200 transition-all cursor-pointer"
    >
      <div className="flex flex-col px-2 py-2 pb-4 relative overflow-hidden">
        <div className="overflow-hidden rounded-md">
          <div className="w-full h-full relative">
            <Image
              src={
                storeData?.storeImagesKeys?.length > 0
                  ? `https://d28fpa5kkce5uk.cloudfront.net/${storeData?.storeImagesKeys[0]}`
                  : "/test/blur.jpeg"
              }
              width={600}
              height={400}
              priority={true}
              placeholder="blur"
              blurDataURL="/test/blur.jpeg"
              alt="store"
              className="h-[245px] object-cover object-center rounded-lg animate-blurred-fade-in "
            />
            <Badge
              className={
                storeStatus?.isOpen
                  ? "absolute top-2 right-2 bg-green-100 text-green-600 border-green-600"
                  : "absolute top-2 right-2 bg-red-100 text-red-600 border-red-600"
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

        <div className="w-full flex items-center justify-between">
          <h5 className="text-[17px] font-medium mt-3 text-gray-800 truncate">
            {storeData?.storeName}
          </h5>
          <a
            href={DirectionURL}
            target="_blank"
            onClick={(e) => e.stopPropagation()} // Prevents card click event
            className="flex items-center justify-center font-medium gap-1 text-[13px] border border-black/[0.25] cursor-pointer bg-gray-100 text-gray-700 px-2 py-1 rounded-md mt-2"
          >
            Direction
            <ArrowUpRight size={17} />
          </a>
        </div>
        <p className="text-gray-800 font-medium text-[15px] mt-1 truncate">
          {storeData?.storeLandmark}
        </p>
        <div className="w-full flex items-center justify-between">
          {storeStatus ? (
            storeStatus.isOpen ? (
              <p className="text-gray-500 text-sm font-medium block truncate">
                Closes at {formatTime(storeStatus.nextCloseTime)}
              </p>
            ) : (
              <p className="text-gray-500 text-sm font-medium block truncate">
                Opens{" "}
                {storeStatus.nextOpenTime &&
                storeStatus.nextOpenTime.includes("at")
                  ? storeStatus.nextOpenTime
                  : `at ${formatTime(storeStatus.nextOpenTime)}`}
              </p>
            )
          ) : (
            <p className="text-gray-500 text-sm font-medium block truncate">
              Not available
            </p>
          )}

          <p className="text-slate-500 font-medium text-[14px] truncate">
            {storeData?.distance < 1000
              ? `${storeData?.distance?.toFixed(0)} m`
              : `${(storeData?.distance / 1000).toFixed(1)} km`}
            <span className="ml-1.5">away</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SingleStoreCard;
