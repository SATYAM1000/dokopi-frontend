"use client";

import { Button } from "@/components/ui/button";
import { FaTelegramPlane } from "react-icons/fa";
import { MoveRight } from 'lucide-react';


import Link from "next/link";

export default function Hero() {
  return (
    <div
      className="min-h-[calc(100vh-70px)] md:min-h-[calc(100vh-80px)]
     relative isolate bg-grid-black/[0.03] px-6 pt-2 lg:px-8 "
    >
      <div
        className="absolute inset-x-0 -top-10 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-10"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>
      <div className="mx-auto max-w-2xl py-32 sm:py-32 lg:py-28">
        <div className="hidden sm:mb-8 sm:flex sm:justify-center">
          <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20 flex items-center gap-1">
            <a href="#" className="font-semibold text-blue-600">
              <span className="absolute inset-0" aria-hidden="true" />
              <FaTelegramPlane size={20} />
            </a>
            Introducing Telegram Bot Ordering!{" "}
          </div>
        </div>
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Print with ease. Anywhere. Anytime.
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Explore our cutting-edge printing solution, tailored for Xerox
            outlets, streamlining operations and setting new benchmarks in the
            printing sector.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link href="/stores">
              <Button className="px-12 py-6  rounded-full bg-black tracking-wide text-[16px] flex items-center gap-2">
                Explore Now
                <MoveRight size={20} />
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <div
        className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>
    </div>
  );
}
