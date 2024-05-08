"use client";
import React from "react";
import { CloudUpload } from "lucide-react";
import { Printer } from "lucide-react";
import { CheckCheck } from "lucide-react";

const HowItWorks = () => {
  return (
    <section className="py-0 bg-white sm:py-16 lg:py-8">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">
            How does it work?
          </h2>
          <p className="max-w-lg mx-auto mt-4 text-gray-600  text-lg leading-8">
            Explore the seamless process of uploading, printing, and managing
            your documents effortlessly with our intuitive platform.
          </p>
        </div>

        <div className="relative mt-12 lg:mt-20">
          <div className="absolute inset-x-0 hidden xl:px-44 top-2 md:block md:px-20 lg:px-28">
            <img
              className="w-full"
              src="https://cdn.rareblocks.xyz/collection/celebration/images/steps/2/curved-dotted-line.svg"
              alt=""
            />
          </div>

          <div className="relative grid grid-cols-1 text-center gap-y-12 md:grid-cols-3 gap-x-12">
            <div>
              <div className="flex items-center justify-center w-16 h-16 mx-auto bg-white border-2 border-gray-200 rounded-full shadow">
                <span className="text-xl font-semibold text-gray-700">
                  {" "}
                  <CloudUpload className="h-7 w-7 text-blue-500" />{" "}
                </span>
              </div>
              <h3 className="mt-6 text-xl font-semibold leading-tight text-black md:mt-10">
                Upload & Pay
              </h3>
              <p className="mt-4 text-base text-gray-600">
                Easily upload and pay for your documents to our platform, and we
                will be ensuring a seamless and efficient process.
              </p>
            </div>

            <div>
              <div className="flex items-center justify-center w-16 h-16 mx-auto bg-white border-2 border-gray-200 rounded-full shadow">
                <span className="text-xl font-semibold text-gray-700">
                  {" "}
                  <Printer className="h-7 w-7 text-blue-500" />
                </span>
              </div>
              <h3 className="mt-6 text-xl font-semibold leading-tight text-black md:mt-10">
                Print
              </h3>
              <p className="mt-4 text-base text-gray-600">
                Customize your printing preferences and effortlessly proceed
                with printing your documents, tailored to your exact
                requirements.
              </p>
            </div>

            <div>
              <div className="flex items-center justify-center w-16 h-16 mx-auto bg-white border-2 border-gray-200 rounded-full shadow">
                <span className="text-xl font-semibold text-gray-700">
                  {" "}
                  <CheckCheck className="h-7 w-7 text-blue-500" />{" "}
                </span>
              </div>
              <h3 className="mt-6 text-xl font-semibold leading-tight text-black md:mt-10">
                Receive
              </h3>
              <p className="mt-4 text-base text-gray-600">
                Enjoy the convenience of collecting your printed documents
                hassle-free, providing you with peace of mind and convenience
                every step of the way
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
