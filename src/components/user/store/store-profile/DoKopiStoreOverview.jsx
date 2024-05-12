"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FaStar } from "react-icons/fa6";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
const DoKopiStoreOverview = ({ storeDetails }) => {
  console.log("store details is here", storeDetails);
  return (
    <div className="p-0 py-8">
      <div className="p-8 bg-white w-full shadow mt-12">
        {" "}
        <div className="grid grid-cols-1 md:grid-cols-3">
          {" "}
          <div className="grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0">
            {" "}
            <div>
              {" "}
              <p className="font-bold text-gray-700 text-xl">22+</p>{" "}
              <p className="text-gray-400">Orders</p>{" "}
            </div>{" "}
            <div>
              {" "}
              <p className="font-bold text-gray-700 text-xl">10</p>{" "}
              <p className="text-gray-400">Active Orders</p>{" "}
            </div>{" "}
            <div>
              {" "}
              <p className="font-bold text-gray-700 text-xl">4.5 </p>{" "}
              <p className="text-gray-400">Rating</p>{" "}
            </div>{" "}
          </div>{" "}
          <div className="relative">
            {" "}
            <div className="w-48 h-48 bg-indigo-100 border-4  mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
              {storeDetails?.storeDetails?.storeLogoURL ? (
                <Image
                  src={"/test/store3.avif"}
                  alt="logo"
                  fill
                  className="object-cover rounded-full"
                />
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-24 w-24"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    {" "}
                    <path
                      fill-rule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clip-rule="evenodd"
                    />
                  </svg>{" "}
                </>
              )}
            </div>{" "}
          </div>{" "}
          <div className="space-x-8 flex justify-between mt-32 md:mt-0 md:justify-center">
            <Dialog>
              <DialogTrigger asChild>
                <button className="text-white py-2 px-4 uppercase rounded bg-blue-400 hover:bg-blue-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5 flex items-center">
                  {" "}
                  Rate Us
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>
                    {" "}
                    Rate Us <span className="text-primary"> (5 stars)</span>
                  </DialogTitle>
                  <DialogDescription>
                    {" "}
                    We appreciate your feedback. Please let us know what you
                    think.
                  </DialogDescription>
                </DialogHeader>
                <div className="flex items-center justify-center space-x-2">
                  {" "}
                  <FaStar className="h-7 w-7 text-yellow-400 cursor-pointer" />{" "}
                  <FaStar className="h-7 w-7 text-yellow-400 cursor-pointer" />{" "}
                  <FaStar className="h-7 w-7 text-yellow-400 cursor-pointer" />{" "}
                  <FaStar className="h-7 w-7 text-yellow-400 cursor-pointer" />{" "}
                  <FaStar className="h-7 w-7 text-yellow-400 cursor-pointer" />{" "}
                </div>
              </DialogContent>
            </Dialog>
            <button
              className={`text-white py-2 px-4 uppercase rounded ${
                storeDetails?.storeCurrentStatus?.type === "active"
                  ? "bg-green-400 hover:bg-green-500"
                  : "bg-red-400 hover:bg-red-500"
              }  shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5`}
            >
              {" "}
              {storeDetails?.storeCurrentStatus?.type === "active"
                ? "Online"
                : "Offline"}
            </button>{" "}
          </div>{" "}
        </div>{" "}
        <div className="mt-20 text-center border-b pb-12">
          {" "}
          <h1 className="text-4xl font-medium text-gray-700">
            {storeDetails?.storeDetails?.storeName}
          </h1>{" "}
          <p className="font-light text-gray-600 mt-3">
            {storeDetails?.storeDetails?.storeLocation?.storeLandmark}
          </p>{" "}
          <p className="mt-8 text-red-400">
            Phone :{" "}
            <span className="text-red-400">
              {storeDetails?.storeDetails?.storePhoneNumber}
            </span>
          </p>{" "}
          <p className="mt-2 text-gray-500">
            <span>Open</span>, Monday - Friday, 9AM - 5PM
          </p>{" "}
        </div>{" "}
        <div className="mt-12 flex flex-col justify-center">
          {" "}
          <p className="text-gray-600 text-center font-light lg:px-16">
            {storeDetails?.storeDetails?.storeDescription}
          </p>{" "}
        </div>
      </div>
    </div>
  );
};

export default DoKopiStoreOverview;
