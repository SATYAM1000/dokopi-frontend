"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

const DoKopiStoreShop = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  return (
    <section className="w-full mt-6 min-h-[calc(100vh-250px)]">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:grid-cols-5 lg:gap-8">
        {
          // map over products
          loading
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
                  <section className="rounded-xl shadow-sm hover:scale-105   border border-black/[0.2]  transition-all duration-100">
                    <div className="flex flex-col px-2 py-2 relative overflow-hidden  ">
                      <div className="overflow-hidden  border-b border-black/[0.2]">
                        <Image
                          src="/test/product.webp"
                          alt="store"
                          width={350}
                          height={350}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>

                      <div className="w-full flex items-center justify-between">
                        <h5 className="text-[15px] font-medium mt-3 text-gray-700 ">
                          SCOE Index Page
                        </h5>
                      </div>

                      <div className="w-full flex items-center justify-between">
                        <p className="text-[13px] font-medium">
                          <del className="text-[13px] font-medium text-gray-400">
                            ₹ 1,000
                          </del>
                          <span className="text-[13px] font-medium ml-2 text-gray-700">
                            ₹ 1.00
                          </span>
                        </p>
                        <button
                          className={` font-medium py-0 px-3 rounded-sm bg-gray-100 text-black/[0.9] hover:bg-gray-200 border border-gray-500/[0.4]`}
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  </section>
                ))
        }

        {/* --------product-2-------- */}

        {/* --------product-------3 */}

        {/* -------------product------4 */}

        {/* ---------------product----5 */}
      </div>
    </section>
  );
};

export default DoKopiStoreShop;
