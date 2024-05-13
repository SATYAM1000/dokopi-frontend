import React from "react";
import { motion } from "framer-motion";
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
    <motion.section
      className="rounded-xl shadow-md border"
      initial="hidden"
      animate="visible"
      variants={{
        visible: { opacity: 1, scale: 1 },
        hidden: { opacity: 0, scale: 0.8 }, // Adjust scale as needed
      }}
      transition={{ duration: 0.2 }} // Adjust animation duration
    >
      <div className="flex flex-col px-2 py-2 relative overflow-hidden  ">
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
                src={"/test/store.jpg"}
                alt="slide1"
                width={400}
                height={350}
                placeholder="blur"
                blurDataURL="/test/blur.jpeg"
                className="h-[245px] object-cover"
              />
            </div>
          </Carousel>
        </div>

        <div className="w-full flex items-center justify-between">
          <h5 className="text-[17px] font-medium mt-3 text-gray-800 ">
            {storeData?.storeName.length > 25
              ? storeData?.storeName.slice(0, 25) + " ..."
              : storeData?.storeName}
          </h5>
          <Link
            target="_blank"
            href={`https://www.google.com/maps/dir/?api=1&destination=<span class="math-inline">\{storeData?\.storeLocationCoordinates?\.coordinates\[0\]\},</span>{storeData?.storeLocationCoordinates?.coordinates[1]}`}
            className="flex items-center justify-center font-medium gap-1 text-[13px] border cursor-pointer border-blue-500 bg-blue-100 text-blue-600 px-2 py-1 rounded-md mt-2"
          >
            Direction
            <ArrowUpRight size={17} />
          </Link>
        </div>
        <p className="text-gray-800 font-medium text-[15px] mt-1">
          {storeData?.storeLandmark}
        </p>
        <div className="w-full flex items-center justify-between">
          <p className="text-gray-500 text-medium text-[14px]">
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
        <motion.div
          className="w-full flex bg-black/[0.05] px-2 py-2 rounded-md mt-2"
          animate="visible"
          initial="hidden"
          variants={{
            visible: { opacity: 1, scale: 1 },
            hidden: { opacity: 0, scale: 0.8 }, // Adjust as needed
          }}
          transition={{ duration: 0.2 }} // Adjust animation duration
        >
          <div className="flex-1 ">
            <div className="flex items-center">
              <IoMdStar className="text-yellow-400" size={17} />
              <IoMdStar className="text-yellow-400" size={17} />
              <IoMdStar className="text-yellow-400" size={17} />
              <IoMdStar className="text-yellow-400" size={17} />
              <IoMdStar className="text-yellow-400" size={17} />
              <p className="text-gray-500 ml-1 text-[14px] font-medium">(28)</p>
            </div>

            <div className="flex gap-1.5 text-[12px] md:text-[14px]">
              <p className="font-medium text-green-500">Open</p>
              <p className="text-gray-500 font-medium">Closes at 10pm</p>
            </div>
          </div>
          <Link
            href={`/stores/${storeData?.storeId}`}
            className="flex-1 flex items-center justify-center "
          >
            <Button className="w-full py-2 text-white/[0.85] font-medium rounded-sm">
              Send Documents
            </Button>
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default SingleStoreCard;
