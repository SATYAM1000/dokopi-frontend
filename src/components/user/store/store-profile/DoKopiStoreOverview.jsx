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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const DoKopiStoreOverview = ({ storeDetails }) => {
  console.log("store details is here", storeDetails);
  return (
    <div className="p-0 py-8">
      <div className="pt-8 md:p-8 bg-white w-full md:shadow mt-12">
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
              <p className="text-gray-400">Ongoing </p>{" "}
            </div>{" "}
            <div>
              {" "}
              <p className="font-bold text-gray-700 text-xl">4.5 </p>{" "}
              <p className="text-gray-400">Rating</p>{" "}
            </div>{" "}
          </div>{" "}
          <div className="relative">
            {" "}
            <div className="w-48 h-48 bg-indigo-100 border-2 border-black/[0.1]  mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
              {!storeDetails?.storeDetails?.storeLogoURL ? (
                <Image
                  src={""}
                  alt="logo"
                  fill
                  className="object-cover rounded-full"
                  blurDataURL="/test/blur.jpeg"
                  placeholder="blur"
                  priority
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
        <div className="mt-12 flex flex-col justify-center gap-4">
          <div className="flex justify-between gap-8  ">
            <div className="flex-1">
              <h1 className="text-xl font-medium text-gray-700">Pricing</h1>
              <div className="overflow-x-auto mt-4">
                <table className="w-full table-auto text-gray-600">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="px-4 py-3 text-left">Service</th>
                      <th className=" hidden md:table-cell px-4 py-3 text-right">
                        Price
                      </th>
                      <th className=" md:hidden px-4 py-3 text-right">
                        Price/Page
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="px-4 py-3">Lamination</td>
                      <td className="hidden md:table-cell px-4 py-3 text-right">
                        {" "}
                        ₹ {storeDetails?.storePrices?.lamination} per page
                      </td>
                      <td className="md:hidden px-4 py-3 text-right">
                        {" "}
                        ₹ {storeDetails?.storePrices?.lamination}
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="px-4 py-3">Binding</td>
                      <td className="hidden md:table-cell px-4 py-3 text-right">
                        {" "}
                        ₹ {storeDetails?.storePrices?.binding} per roll
                      </td>
                      <td className="md:hidden px-4 py-3 text-right">
                        {" "}
                        ₹ {storeDetails?.storePrices?.binding}
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="px-4 py-3">Taping</td>
                      <td className="hidden md:table-cell px-4 py-3 text-right">
                        {" "}
                        ₹ {storeDetails?.storePrices?.taping} per roll
                      </td>
                      <td className="md:hidden px-4 py-3 text-right">
                        {" "}
                        ₹ {storeDetails?.storePrices?.taping}
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="px-4 py-3">Single-sided B-W Print</td>
                      <td className="hidden md:table-cell px-4 py-3 text-right">
                        {" "}
                        ₹ {storeDetails?.storePrices?.simplexBlackAndWhite} per
                        page
                      </td>
                      <td className="md:hidden px-4 py-3 text-right">
                        {" "}
                        ₹ {storeDetails?.storePrices?.simplexBlackAndWhite}
                      </td>
                    </tr>

                    <tr className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="px-4 py-3">Duplex B-W Print</td>
                      <td className="px-4 py-3 hidden md:table-cell text-right">
                        {" "}
                        ₹ {storeDetails?.storePrices?.duplexBlackAndWhite} per
                        page
                      </td>
                      <td className="md:hidden px-4 py-3 text-right">
                        {" "}
                        ₹ {storeDetails?.storePrices?.duplexBlackAndWhite}
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="px-4 py-3">Simplex Color Print</td>
                      <td className="hidden md:table-cell px-4 py-3 text-right">
                        {" "}
                        ₹ {storeDetails?.storePrices?.simplexColor} per page
                      </td>
                      <td className="md:hidden px-4 py-3 text-right">
                        {" "}
                        ₹ {storeDetails?.storePrices?.simplexColor}
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="px-4 py-3">Duplex Color Print</td>
                      <td className="hidden md:table-cell px-4 py-3 text-right">
                        {" "}
                        ₹ {storeDetails?.storePrices?.duplexColor} per page
                      </td>
                      <td className="md:hidden px-4 py-3 text-right">
                        {" "}
                        ₹ {storeDetails?.storePrices?.duplexColor}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* --------reviews---------- */}
          <div className="mt-6">
            <h1 className="text-xl font-medium text-gray-700">About us</h1>
            <p className="mt-3 text-gray-600">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Voluptatibus eius dolore perspiciatis tempora velit sapiente sit
              modi, iste repudiandae nesciunt dignissimos ducimus doloribus quas
              delectus. Inventore ad aut illo vitae labore in, aperiam, quidem
              rem aliquid, provident autem molestias excepturi molestiae! Sint
              recusandae quo magnam, veniam laudantium explicabo incidunt eos!
            </p>
          </div>

          {/* --------reviews---------- */}
          <div className="mt-6">
            <h1 className="text-xl font-medium text-gray-700">Reviews</h1>

            {storeDetails?.storeReviews?.map((review) => (
              <div className="mt-3 flex items-center" key={review._id}>
                <div className="flex-shrink-0">
                  <img
                    className="h-10 w-10 rounded-full"
                    src={review?.user?.profilePicURL}
                    alt=""
                  />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">
                    {review?.user?.firstName} {review?.user?.lastName}
                  </p>
                  <div className="flex items-center">
                    <div className="flex items-center">
                      <svg
                        className="h-5 w-5 text-yellow-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoKopiStoreOverview;
