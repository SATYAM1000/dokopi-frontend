"use client";
import React from "react";
import ImageWithFallback from "./ImageWithFallback";

const StoreGallery = ({ storeData }) => {
  const { storeImagesURL } = storeData;
  return (
    <>
      {storeImagesURL.length > 0 &&
        storeImagesURL.map((Image, index) => {
          if (index == 0)
            return (
              <div className="w-full h-60 md:hidden" key={Image}>
                <ImageWithFallback
                  src={Image}
                  alt="store"
                  className="w-full h-full object-cover object-center rounded-lg"
                  fallbackSrc={
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ4HtE_O8tvs-TlF27vWMWHjxoCQ7HmFmZHBkZpKt1n4PFIN-aN&usqp=CAU"
                  }
                  placeholder="blur"
                  blurDataURL="/test/blur.jpeg"
                  width={1000}
                  height={1000}
                />
              </div>
            );
        })}

      <div className="hidden w-full h-96 md:flex gap-1">
        {storeImagesURL.length > 0 &&
          storeImagesURL.map((imageURL, index) => {
            if (index == 0)
              return (
                <div
                  className="w-full h-full overflow-hidden rounded-lg"
                  key={index}
                >
                  <ImageWithFallback
                    src={imageURL}
                    width={1000}
                    height={1000}
                    placeholder="blur"
                    blurDataURL="/test/blur.jpeg"
                    alt="store"
                    className="w-full h-full object-cover object-center rounded-lg transition duration-700 hover:scale-110"
                    fallbackSrc={
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ4HtE_O8tvs-TlF27vWMWHjxoCQ7HmFmZHBkZpKt1n4PFIN-aN&usqp=CAU"
                    }
                  />
                </div>
              );
          })}

        <div className="w-1/4 h-full flex flex-col gap-1 overflow-hidden">
          <div className="w-full h-2/4 overflow-hidden rounded-lg">
            <ImageWithFallback
              src={storeImagesURL[1]}
              alt="store"
              width={1000}
              height={1000}
              placeholder="blur"
              blurDataURL="/test/blur.jpeg"
              fallbackSrc={
                "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ4HtE_O8tvs-TlF27vWMWHjxoCQ7HmFmZHBkZpKt1n4PFIN-aN&usqp=CAU"
              }
              className="w-full h-full object-cover object-center rounded-lg transition duration-700 hover:scale-110"
            />
          </div>
          <div className="w-full h-2/4 overflow-hidden rounded-lg">
            <ImageWithFallback
              src={storeImagesURL[2]}
              alt="store"
              width={1000}
              height={1000}
              placeholder="blur"
              blurDataURL="/test/blur.jpeg"
              fallbackSrc={
                "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ4HtE_O8tvs-TlF27vWMWHjxoCQ7HmFmZHBkZpKt1n4PFIN-aN&usqp=CAU"
              }
              className="w-full h-full object-cover object-center rounded-lg transition duration-700 hover:scale-110"
            />
          </div>
        </div>
        <div className="w-1/4 h-full flex flex-col gap-1 overflow-hidden">
          <div className="w-full h-2/4 relative">
            <ImageWithFallback
              width={1000}
              height={1000}
              src={storeImagesURL[3]}
              placeholder="blur"
              blurDataURL="/test/blur.jpeg"
              fallbackSrc={
                "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ4HtE_O8tvs-TlF27vWMWHjxoCQ7HmFmZHBkZpKt1n4PFIN-aN&usqp=CAU"
              }
              alt="store"
              className="w-full h-full object-cover object-center rounded-lg"
            />
            {/* <div className="absolute inset-0 bg-opacity-40 bg-black h-full rounded-lg" />
            <h4 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2  w-full text-center text-white font-semibold">
              View Gallery
            </h4> */}
          </div>
          <div className="w-full h-2/4 relative">
            <ImageWithFallback
              width={1000}
              height={1000}
              src={storeImagesURL[4]}
              placeholder="blur"
              blurDataURL="/test/blur.jpeg"
              fallbackSrc={
                "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ4HtE_O8tvs-TlF27vWMWHjxoCQ7HmFmZHBkZpKt1n4PFIN-aN&usqp=CAU"
              }
              alt="store"
              className="w-full h-full object-cover object-center rounded-lg"
            />
            {/* <div className="absolute inset-0 bg-opacity-40 bg-black h-full rounded-lg" />
            <div className="absolute flex flex-col items-center left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-full text-center text-white font-semibold">
              <div className="bg-black p-3 rounded-full bg-opacity-50">
                <AiOutlineCamera className="text-white" />
              </div>
              <h4>View Gallery</h4>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default StoreGallery;
