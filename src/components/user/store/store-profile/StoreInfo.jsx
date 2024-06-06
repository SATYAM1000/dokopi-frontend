"use client";
import { Day } from "@/lib/constants";
import React, { useEffect, useState } from "react";
import { TiPlus, TiStarFullOutline } from "react-icons/ti";

const StoreInfo = ({ storeData }) => {
  const { storeDetails, storeCurrentStatus } = storeData;
  const { storeOpeningHours, storeLocation, storeServices } = storeDetails
  const [workingHours, setWorkingHours] = useState(null)
  const [TodayDay, SetTodayDay] = useState(Day[new Date().getDay()])
  function GetOpeningTimeStore() {
    setWorkingHours(storeOpeningHours[TodayDay])
  }
  useEffect(() => {
    if (storeOpeningHours) {
      GetOpeningTimeStore()
    }
  }, [])
  return (
    <div className="my-4">
      <div className="flex flex-col-reverse md:flex-row md:items-center justify-between gap-3">
        <h1 className="text-3xl font-semibold">{storeDetails.storeName}</h1>
        <div className="flex items-center gap-6 text-xs md:text-base">
          <div className="flex items-center gap-2">
            <span className="flex rounded items-center gap-1 text-white font-medium bg-indigo-600 px-2 py-1">
              {/* Active Orders is not in the database  */}
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
            <span className="flex rounded items-center gap-1 text-white font-medium bg-indigo-600 px-2 py-1">
              {/* Review Orders is not in the database  */}
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
        <h3>
          {storeLocation.storeLandmark},
          {storeLocation.storeCity},
          {storeLocation.storeState},
          {storeLocation.storeCountry},
          {storeLocation.storeZipCode}</h3>
        <h3 className="text-gray-400 text-[15px] font-normal">
          {
            storeServices && storeServices.map((service, index, arr) => {
              const size = arr.length;
              return <span key={index}>{service} {index + 1 == size ? ' ' : ','}</span>
            }
            )}
        </h3>
        <div className="text-sm">
          {
            !storeCurrentStatus.type == 'offline' ? <span className="text-red-600 ">Closed</span> : (workingHours == 'Closed') ? <span className="text-red-600 ">Closed On {TodayDay}</span> : <>
              <span className="text-green-600 ">Open Now</span> - {
                workingHours && workingHours
              } (Today)</>
          }
        </div>
      </div>
    </div>
  );
};

export default StoreInfo;
