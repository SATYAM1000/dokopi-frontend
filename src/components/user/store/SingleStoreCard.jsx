"use client";
import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";
import Link from "next/link";
import { IoMdStar } from "react-icons/io";
import { ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";
const SingleStoreCard = ({ storeData }) => {
  if (!storeData) return null;
  return (
    <section className="rounded-xl shadow-md border">
      <div className="flex flex-col px-2 py-2 relative overflow-hidden  ">
        <div className="overflow-hidden rounded-md">
          <Carousel
            className="max-h-[250px] min-h-[250px] overflow-hidden"
            autoPlay={false}
            infiniteLoop={true}
            showStatus={false}
            stopOnHover={true}
            showThumbs={false}
            showArrows={false}
            showIndicators={false}
            swipeable={true}
          >
            <div className="w-full h-full">
              <Image
                src={"/test/store3.avif"}
                alt="slide1"
                width={350}
                height={250}
                placeholder="blur"
                blurDataURL="/test/blur.jpeg"
                className="object-cover"
              />
            </div>
          </Carousel>
        </div>

        <div className="w-full flex items-center justify-between">
          <h5 className="text-[17px] font-medium mt-3 ">
            {storeData?.storeName.length > 25
              ? storeData?.storeName.slice(0, 25) + " ..."
              : storeData?.storeName}
          </h5>

          <Link
            target="_blank"
            href={`https://www.google.com/maps/dir/?api=1&destination=${storeData?.storeLocationCoordinates?.coordinates[0]},${storeData?.storeLocationCoordinates?.coordinates[1]}`}
            className="flex items-center justify-center font-medium gap-1 text-[14px] border-2 cursor-pointer border-black/[0.2] px-2 py-1 rounded-md mt-2"
          >
            Direction
            <ArrowUpRight size={17} />
          </Link>
        </div>
        <p className="text-black font-medium text-[15px] mt-1">
          {storeData?.storeLandmark}
        </p>
        <div className="w-full flex items-center justify-between">
          <p className="text-slate-500 text-[14px]">
            {storeData?.storeServices?.join(", ").length > 40
              ? storeData?.storeServices?.join(", ").slice(0, 40) + " ..."
              : storeData?.storeServices?.join(", ")}
          </p>
          <p className="text-slate-500 text-[14px]">
            {storeData?.distance < 1000
              ? `${storeData?.distance?.toFixed(0)} m`
              : `${(storeData?.distance / 1000).toFixed(1)} km`}
            <span className="ml-1.5">away</span>
          </p>
        </div>
        <div className="w-full flex bg-black/[0.05] px-2 py-2 rounded-md mt-2">
          <div className="flex-1 ">
            <div className="flex items-center">
              <IoMdStar className="text-yellow-500" size={17} />
              <IoMdStar className="text-yellow-500" size={17} />
              <IoMdStar className="text-yellow-500" size={17} />
              <IoMdStar className="text-yellow-500" size={17} />
              <IoMdStar className="text-yellow-500" size={17} />
              <p className="text-gray-500 ml-1 text-[14px] font-medium">(28)</p>
            </div>

            <div className="flex gap-1.5 text-[12px] md:text-[14px]">
              <p className="font-medium text-green-500">Open</p>
              <p className="text-gray-500 font-medium">Closes at 10pm</p>
            </div>
          </div>
          <Link
            href={`/stores/${storeData?.storeId}/upload-files`}
            className="flex-1 flex items-center justify-center "
          >
            <Button
              className={`w-full py-2 text-white/[0.85] font-medium rounded-sm`}
            >
              Send Documents
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SingleStoreCard;
