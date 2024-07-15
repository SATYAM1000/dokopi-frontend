"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { toast } from "sonner";

const DoKopiStoreShop = () => {
  const [loading, setLoading] = useState(false);
  const onClickHandler = () => {
    toast.info("This functionality is not available yet");
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 200);
  }, []);
  return (
    <section className="w-full mt-6 min-h-[calc(100vh-250px)]">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:grid-cols-5 lg:gap-8">
        {loading
          ? Array(10)
              .fill(0)
              .map((_, index) => (
                <div
                  key={index}
                  className="w-full h-[250px] bg-gray-300 rounded-xl animate-pulse"
                />
              ))
          : Array(7)
              .fill(0)
              .map((_, index) => (
                <section
                  key={index}
                  className="rounded-xl border border-indigo-200 hover:border-gray-300  transition-all duration-100"
                >
                  <div className="flex flex-col px-2 py-2 relative overflow-hidden  ">
                    <div className="overflow-hidden  border-b border-indigo-200 hover:border-indigo-300">
                      <Image
                        src="/test/product.webp"
                        alt="store"
                        width={350}
                        height={350}
                        className="w-full h-full animate-blurred-fade-in object-cover object-center rounded-lg transition duration-700 hover:scale-110"
                        loading="lazy"
                      />
                    </div>

                    <div className="w-full flex items-center justify-between">
                      <h5 className="text-[15px] font-medium mt-3 text-gray-700 ">
                        SCOE Index Page
                      </h5>
                    </div>

                    <div className="w-full flex flex-col ">
                      <p className="text-[13px] font-medium mt-1">
                        <del className="text-[13px] font-medium text-gray-400">
                          ₹ 1,000
                        </del>
                        <span className="text-[13px] font-medium ml-2 text-gray-700">
                          ₹ 1.00
                        </span>
                      </p>
                      <button
                        onClick={onClickHandler}
                        className={` w-full mt-2 font-medium py-0.5 px-3 rounded-sm bg-indigo-500 hover:bg-indigo-600 text-white  border border-gray-200 flex items-center justify-center gap-2.5`}
                      >
                        <p>Add</p>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.75"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-plus"
                        >
                          <path d="M5 12h14" />
                          <path d="M12 5v14" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </section>
              ))}
      </div>
    </section>
  );
};

export default DoKopiStoreShop;
