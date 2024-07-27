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
      <div
        className={`${
          loading
            ? "grid grid-cols-2 md:grid-cols-3 gap-4 lg:grid-cols-5 lg:gap-8"
            : "w-full h-auto flex items-center justify-center"
        }`}
      >
        {loading ? (
          Array(10)
            .fill(0)
            .map((_, index) => (
              <div
                key={index}
                className="w-full h-[250px] bg-gray-300 rounded-xl animate-pulse"
              />
            ))
        ) : (
          <div className="w-[100%] h-auto flex items-center justify-center">
            <div className="flex flex-col items-center justify-center w-full h-auto mt-12 ">
              <Image
                src="https://user-images.githubusercontent.com/507615/54591670-ac0a0180-4a65-11e9-846c-e55ffce0fe7b.png"
                width={200}
                height={200}
                alt="No orders"
              />
              <p className="mt-8 text-[#6B7280] text-center">
                This store hasn't added any products yet. Check back soon!
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default DoKopiStoreShop;
