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
import { Lock } from 'lucide-react';


const DoKopiStoreOverview = () => {
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
            <div className="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
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
            </div>{" "}
          </div>{" "}
          <div className="space-x-8 flex justify-between mt-32 md:mt-0 md:justify-center">
            <Dialog>
              <DialogTrigger asChild>
                <button className="text-white py-2 px-4 uppercase rounded bg-blue-400 hover:bg-blue-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5 flex items-center">
                  {" "}
                  Rate Us
                  <Lock className="h-4 w-4 ml-2" />
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
            <button className="text-white py-2 px-4 uppercase rounded bg-gray-700 hover:bg-gray-800 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
              {" "}
              DIRECTION
            </button>{" "}
          </div>{" "}
        </div>{" "}
        <div className="mt-20 text-center border-b pb-12">
          {" "}
          <h1 className="text-4xl font-medium text-gray-700">
            Jadav Xerox
          </h1>{" "}
          <p className="font-light text-gray-600 mt-3">Vadgaon Budruk</p>{" "}
          <p className="mt-8 text-red-400">
            Phone : <span className="text-red-400">+91 1234567890</span>
          </p>{" "}
          <p className="mt-2 text-gray-500">Open, Monday - Friday, 9AM - 5PM</p>{" "}
        </div>{" "}
        <div className="mt-12 flex flex-col justify-center">
          {" "}
          <p className="text-gray-600 text-center font-light lg:px-16">
            Welcome to our Xerox Store, your one-stop destination for all your
            copying and printing needs! Nestled in the heart of Pune,
            Maharastra, our store prides itself on delivering top-notch services
            with a commitment to quality and efficiency. Step into our modern
            and inviting space, where state-of-the-art Xerox machines await to
            bring your documents to life with crisp clarity and vibrant colors.
          </p>{" "}
          <button className="text-indigo-500 py-2 px-4  font-medium mt-4">
            {" "}
            Show more
          </button>{" "}
        </div>
      </div>
    </div>
  );
};

export default DoKopiStoreOverview;
