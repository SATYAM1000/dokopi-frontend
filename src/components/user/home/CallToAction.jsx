import React from "react";
import Wrapper from "../global/Wrapper";
import Link from "next/link";

const CallToAction = () => {
  return (
    <div className="relative mx-auto mt-20">
      <Wrapper>
        <div
          className="rounded-xl p-1"
          style={{
            backgroundImage:
              "linear-gradient(to right bottom, rgb(79, 70, 229) 0%, rgb(165, 56, 164) 50%, rgb(220, 38, 38) 100%)",
          }}
        >
          <div className="rounded-lg bg-black bg-opacity-80 backdrop-blur">
            <div className="flex w-full flex-wrap items-center justify-between gap-4 px-8 py-10 sm:px-16 lg:flex-nowrap">
              <div className="lg:max-w-xl">
                <h2 className="block w-full pb-2 bg-gradient-to-b from-white to-gray-400 bg-clip-text font-bold text-transparent text-3xl sm:text-4xl">
                  List Your Xerox Store
                </h2>
                <p className="my-4 bg-transparent font-normal leading-relaxed tracking-wide text-gray-400">
                  Easily add your xerox store to our platform by providing your
                  phone number. Reach more customers and grow your business with
                  our user-friendly listing process.
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-6">
                <Link href="https://merchant.dokopi.com/" target="_blank">
                <button className="bg-blue-600 font-medium text-white button-text flex items-center justify-center whitespace-nowrap rounded-md transition-all duration-300 px-8 py-3 text-xs sm:text-sm">
                  Get Started
                </button>
                </Link>
                <button className="flex items-center font-medium justify-center whitespace-nowrap rounded-md border border-zinc-700 bg-zinc-900 text-center text-white backdrop-blur transition-all hover:bg-zinc-800 px-8 py-3 text-xs sm:text-sm">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

export default CallToAction;
