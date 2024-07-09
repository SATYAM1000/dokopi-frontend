import React from "react";
import { motion } from "framer-motion";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Link from "next/link";
import { IoMdStar } from "react-icons/io";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";

const SingleStoreCard = ({ storeData, location }) => {
  if (!storeData) return null;
  const { storeLocationCoordinates } = storeData;
  const { coordinates } = storeLocationCoordinates;

  const storeStatus =
    storeData?.storeHours && getStoreStatus(storeData?.storeHours || null);

  const formatTime = (time) => {
    const [hours, minutes] = time.split(":").map(Number);
    const period = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    return `${formattedHours}:${
      minutes < 10 ? `0${minutes}` : minutes
    } ${period}`;
  };
  const DirectionURL = `https://www.google.com/maps/dir/?api=1&destination=${coordinates[0]},${coordinates[1]}`;
  return (
    <motion.section
      className="rounded-xl shadow-md border hover:border-black/[0.25] transition-all"
      initial="hidden"
      animate="visible"
      variants={{
        visible: { opacity: 1, scale: 1 },
        hidden: { opacity: 0, scale: 0.8 },
      }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex flex-col px-2 py-2 relative overflow-hidden">
        <div className="overflow-hidden rounded-md">
          <div className="w-full h-full">
            <Image
              src={
                storeData?.storeImagesKeys
                  ? `https://d28fpa5kkce5uk.cloudfront.net/${storeData?.storeImagesKeys[0]}`
                  : "/test/blur.jpeg"
              }
              width={600}
              height={400}
              alt="store"
              className="h-[245px] object-cover object-center rounded-lg animate-blurred-fade-in"
            />
          </div>
        </div>

        <div className="w-full flex items-center justify-between">
          <h5 className="text-[17px] font-medium mt-3 text-gray-800 truncate">
            {storeData?.storeName}
          </h5>
          <Link
            target="_blank"
            href={DirectionURL}
            className="flex items-center justify-center font-medium gap-1 text-[13px] border border-black/[0.25] cursor-pointer bg-gray-100 text-gray-700 px-2 py-1 rounded-md mt-2"
          >
            Direction
            <ArrowUpRight size={17} />
          </Link>
        </div>
        <p className="text-gray-800 font-medium text-[15px] mt-1 truncate">
          {storeData?.storeLandmark}
        </p>
        <div className="w-full flex items-center justify-between">
          <p className="text-gray-500 text-medium text-[14px] truncate">
            Printing, Scanning, Copying...
          </p>
          <p className="text-slate-500 text-[14px] truncate">
            {storeData?.distance < 1000
              ? `${storeData?.distance?.toFixed(0)} m`
              : `${(storeData?.distance / 1000).toFixed(1)} km`}
            <span className="ml-1.5">away</span>
          </p>
        </div>
        <div
          className="w-full flex bg-black/[0.05] px-2 py-2 rounded-md mt-2"
          animate="visible"
          initial="hidden"
          variants={{
            visible: { opacity: 1, scale: 1 },
            hidden: { opacity: 0, scale: 0.8 },
          }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex-1">
            <div className="flex items-center">
              <IoMdStar className="text-yellow-400" size={17} />
              <IoMdStar className="text-yellow-400" size={17} />
              <IoMdStar className="text-yellow-400" size={17} />
              <IoMdStar className="text-yellow-400" size={17} />
              <IoMdStar className="text-yellow-400" size={17} />
              <p className="text-gray-500 ml-1 text-[14px] font-medium truncate">
                ({Math.ceil(Math.random() * 10)})
              </p>
            </div>

            <div className="flex gap-1.5 text-[12px] md:text-[14px] truncate">
              <p className="font-medium">
                {storeData?.storeHours && storeStatus.isOpen ? (
                  <span className="text-green-500">Open</span>
                ) : (
                  <span className="text-red-500">Closed</span>
                )}
              </p>

              {storeStatus ? (
                storeStatus.isOpen ? (
                  <p className="text-gray-500 font-medium block truncate">
                    Closes at {formatTime(storeStatus.nextCloseTime)}
                  </p>
                ) : (
                  <p className="text-gray-500 font-medium block truncate">
                    Opens{" "}
                    {storeStatus.nextOpenTime &&
                    storeStatus.nextOpenTime.includes("at")
                      ? storeStatus.nextOpenTime
                      : `at ${formatTime(storeStatus.nextOpenTime)}`}
                  </p>
                )
              ) : (
                <p className="text-gray-500 font-medium block truncate">
                  Not available
                </p>
              )}
            </div>
          </div>
          <Link
            href={`/stores/${storeData?.storeId}`}
            className="flex-1 flex items-center justify-center"
          >
            <Button
              type="button"
              className="w-full py-1.5 px-1 text-white/[0.85] font-medium rounded-sm"
            >
              Send Documents
            </Button>
          </Link>
        </div>
      </div>
    </motion.section>
  );
};

export default SingleStoreCard;

function getStoreStatus(storeTiming) {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const now = new Date();
  const currentDayIndex = now.getDay();
  const currentTime = now.getHours() * 60 + now.getMinutes();

  for (let i = 0; i < 7; i++) {
    const dayIndex = (currentDayIndex + i) % 7;
    const currentDay = daysOfWeek[dayIndex];
    const todayTiming = storeTiming[currentDay];

    if (!todayTiming || !todayTiming.isOpen) {
      continue;
    }

    const openTimeParts = todayTiming.open.split(":");
    const closeTimeParts = todayTiming.close.split(":");

    const openTime =
      parseInt(openTimeParts[0], 10) * 60 + parseInt(openTimeParts[1], 10);
    const closeTime =
      parseInt(closeTimeParts[0], 10) * 60 + parseInt(closeTimeParts[1], 10);

    if (i === 0 && currentTime >= openTime && currentTime <= closeTime) {
      // Store is currently open
      return {
        isOpen: true,
        nextOpenTime: null,
        nextCloseTime: todayTiming.close,
      };
    } else if (i === 0 && currentTime < openTime) {
      // Store is currently closed but will open later today
      return {
        isOpen: false,
        nextOpenTime: todayTiming.open,
        nextCloseTime: null,
      };
    } else if (i > 0) {
      // Store is closed and will open on a future day
      return {
        isOpen: false,
        nextOpenTime: `${daysOfWeek[dayIndex]} at ${todayTiming.open}`,
        nextCloseTime: null,
      };
    }
  }

  // If no opening times are found, return closed status
  return {
    isOpen: false,
    nextOpenTime: null,
    nextCloseTime: null,
  };
}
