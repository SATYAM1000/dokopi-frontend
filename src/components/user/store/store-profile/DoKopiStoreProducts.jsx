import React from "react";
import Image from "next/image";

const DoKopiStoreProducts = () => {
  return (
    <section className="w-full mt-4">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:grid-cols-5 lg:gap-8">
        <section className="rounded-xl shadow-sm border hover:scale-105 transition-all duration-100">
          <div className="flex flex-col px-2 py-2 relative overflow-hidden  ">
            <div className="overflow-hidden rounded-md">
              <Image
                src="/assets/product.webp"
                alt="store"
                width={350}
                height={350}
              />
            </div>

            <div className="w-full flex items-center justify-between">
              <h5 className="text-[15px] font-medium mt-3 ">SCOE Index Page</h5>
            </div>

            <div className="w-full flex items-center justify-between">
              <p className="text-[13px] font-medium">
                <del className="text-[13px] font-medium text-gray-400">₹ 1,000</del>
                <span className="text-[13px] font-medium ml-2">₹ 1.00</span>
              </p>
              <button
                className={` font-medium py-0 px-3 rounded-sm bg-blue-50 text-blue-500 hover:bg-blue-100 hover:text-blue-500 border border-blue-500/[0.4]`}
              >
                Add
              </button>
            </div>
          </div>
        </section>

        {/* --------product-2-------- */}

        <section className="rounded-xl shadow-sm border hover:scale-105 transition-all duration-100">
          <div className="flex flex-col px-2 py-2 relative overflow-hidden  ">
            <div className="overflow-hidden rounded-md">
              <Image
                src="/assets/product.webp"
                alt="store"
                width={350}
                height={350}
              />
            </div>

            <div className="w-full flex items-center justify-between">
              <h5 className="text-[15px] font-medium mt-3 ">SCOE Index Page</h5>
            </div>

            <div className="w-full flex items-center justify-between">
              <p className="text-[13px] font-medium">
                <del className="text-[13px] font-medium text-gray-400">₹ 1,000</del>
                <span className="text-[13px] font-medium ml-2">₹ 1.00</span>
              </p>
              <button
                className={` font-medium py-0 px-3 rounded-sm bg-blue-50 text-blue-500 hover:bg-blue-100 hover:text-blue-500 border border-blue-500/[0.4]`}
              >
                Add
              </button>
            </div>
          </div>
        </section>

        {/* --------product-------3 */}

        <section className="rounded-xl shadow-sm border hover:scale-105 transition-all duration-100">
          <div className="flex flex-col px-2 py-2 relative overflow-hidden  ">
            <div className="overflow-hidden rounded-md">
              <Image
                src="/assets/product.webp"
                alt="store"
                width={350}
                height={350}
              />
            </div>

            <div className="w-full flex items-center justify-between">
              <h5 className="text-[15px] font-medium mt-3 ">SCOE Index Page</h5>
            </div>

            <div className="w-full flex items-center justify-between">
              <p className="text-[13px] font-medium">
                <del className="text-[13px] font-medium text-gray-400">₹ 1,000</del>
                <span className="text-[13px] font-medium ml-2">₹ 1.00</span>
              </p>
              <button
                className={` font-medium py-0 px-3 rounded-sm bg-blue-50 text-blue-500 hover:bg-blue-100 hover:text-blue-500 border border-blue-500/[0.4]`}
              >
                Add
              </button>
            </div>
          </div>
        </section>

        {/* -------------product------4 */}

        <section className="rounded-xl shadow-sm border hover:scale-105 transition-all duration-100">
          <div className="flex flex-col px-2 py-2 relative overflow-hidden  ">
            <div className="overflow-hidden rounded-md">
              <Image
                src="/assets/product.webp"
                alt="store"
                width={350}
                height={350}
              />
            </div>

            <div className="w-full flex items-center justify-between">
              <h5 className="text-[15px] font-medium mt-3 ">SCOE Index Page</h5>
            </div>

            <div className="w-full flex items-center justify-between">
              <p className="text-[13px] font-medium">
                <del className="text-[13px] font-medium text-gray-400">₹ 1,000</del>
                <span className="text-[13px] font-medium ml-2">₹ 1.00</span>
              </p>
              <button
                className={` font-medium py-0 px-3 rounded-sm bg-blue-50 text-blue-500 hover:bg-blue-100 hover:text-blue-500 border border-blue-500/[0.4]`}
              >
                Add
              </button>
            </div>
          </div>
        </section>
        {/* ---------------product----5 */}

        <section className="rounded-xl shadow-sm border hover:scale-105 transition-all duration-100">
          <div className="flex flex-col px-2 py-2 relative overflow-hidden  ">
            <div className="overflow-hidden rounded-md">
              <Image
                src="/assets/product.webp"
                alt="store"
                width={350}
                height={350}
              />
            </div>

            <div className="w-full flex items-center justify-between">
              <h5 className="text-[15px] font-medium mt-3 ">SCOE Index Page</h5>
            </div>

            <div className="w-full flex items-center justify-between">
              <p className="text-[13px] font-medium">
                <del className="text-[13px] font-medium text-gray-400">₹ 1,000</del>
                <span className="text-[13px] font-medium ml-2">₹ 1.00</span>
              </p>
              <button
                className={` font-medium py-0 px-3 rounded-sm bg-blue-50 text-blue-500 hover:bg-blue-100 hover:text-blue-500 border border-blue-500/[0.4]`}
              >
                Add
              </button>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
};

export default DoKopiStoreProducts;
