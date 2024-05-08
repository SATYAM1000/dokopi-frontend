"use client";
import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";
import Link from "next/link";
import { IoMdStar } from "react-icons/io";
import { ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";
const SingleStoreCard = () => {
  return (
    <section className="rounded-xl shadow-md border">
      <div className="flex flex-col px-2 py-2 relative overflow-hidden  ">
        <div className="overflow-hidden rounded-md">
          <Carousel
            className="max-h-[250px]"
            autoPlay={false}
            infiniteLoop={true}
            showStatus={false}
            stopOnHover={true}
            showThumbs={false}
            showArrows={false}
            
          >
            <div>
              <Image
                src={"/test/store.webp"}
                alt="slide1"
                height={400}
                width={400}
                className=""
              />
            </div>

            <div>
              <Image
                src={"/test/store2.avif"}
                alt="slide1"
                height={400}
                width={400}
                className=""
              />
            </div>

            <div>
              <Image
                src={"/test/store3.avif"}
                alt="slide1"
                height={400}
                width={400}
                className=""
              />
            </div>
          </Carousel>
        </div>

        <div className="w-full flex items-center justify-between">
          <h5 className="text-[17px] font-medium mt-3 ">
            Jadav Xerox Vadgaon Budruk
          </h5>

          <Link
            target="_blank"
            href={`https://www.google.com/maps/dir/?api=1&destination`}
            className="flex items-center justify-center font-medium gap-1 text-[14px] border-2 cursor-pointer border-black/[0.2] px-2 py-1 rounded-md mt-2"
          >
            Direction
            <ArrowUpRight size={17} />
          </Link>
        </div>
        <p className="text-black font-medium text-[15px] mt-1">
          Vadgaon Kalyan
        </p>
        <div className="w-full flex items-center justify-between">
          <p className="text-slate-500 text-[14px]">Printing, Lamination</p>
          <p className="text-slate-500 text-[14px]">
            5 KM
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
            href={"/stores/123/upload-files"}
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
