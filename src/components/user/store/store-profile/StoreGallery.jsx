"use client";
import React, { useState } from "react";
import Image from "next/image";
import StoreGallerySkelton from "./StoreGallerySkelton";

const StoreGallery = ({ storeData }) => {
  const { storeImagesKeys } = storeData;
  const [loaded, setLoaded] = useState(false);

  const handleImageLoad = () => {
    setLoaded(true);
  };

  return (
    <>
      {/* Placeholder skeleton */}
      {!loaded && <StoreGallerySkelton />}
      <div className="w-full h-60 md:hidden">
        <Image
          src={
            `https://d28fpa5kkce5uk.cloudfront.net/${storeData?.storeImagesKeys[0]}` ||
            "https://images.unsplash.com/photo-1509641498745-13c26fd1ed89?dpr=1&auto=format&fit=crop&w=1000&q=80&cs=tinysrgb&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D"
          }
          alt="store"
          className="w-full h-full animate-blurred-fade-in object-cover object-center rounded-lg"
          placeholder="blur"
          blurDataURL="/test/blur.jpeg"
          width={1000}
          height={1000}
          onLoad={handleImageLoad}
        />
      </div>

      <div className="hidden w-full h-96 md:flex gap-1">
        <div className="w-full h-full overflow-hidden rounded-lg">
          <Image
            src={
              `https://d28fpa5kkce5uk.cloudfront.net/${storeImagesKeys[0]}` ||
              "https://images.unsplash.com/photo-1509641498745-13c26fd1ed89?dpr=1&auto=format&fit=crop&w=1000&q=80&cs=tinysrgb&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D"
            }
            width={1000}
            height={1000}
            placeholder="blur"
            blurDataURL="/test/blur.jpeg"
            alt="store"
            className="w-full h-full animate-blurred-fade-in object-cover object-center rounded-lg transition duration-700 hover:scale-110"
            onLoad={handleImageLoad}
          />
        </div>

        <div className="w-1/4 h-full flex flex-col gap-1 overflow-hidden">
          <div className="w-full h-2/4 overflow-hidden rounded-lg">
            <Image
              src={
                `https://d28fpa5kkce5uk.cloudfront.net/${storeImagesKeys[1]}` ||
                "/test/blur.jpeg"
              }
              alt="store"
              width={350}
              height={350}
              placeholder="blur"
              blurDataURL="/test/blur.jpeg"
              className="w-full h-full object-cover animate-blurred-fade-in object-center rounded-lg transition duration-700 hover:scale-110"
              onLoad={handleImageLoad}
            />
          </div>
          <div className="w-full h-2/4 overflow-hidden rounded-lg">
            <Image
              src={
                `https://d28fpa5kkce5uk.cloudfront.net/${storeImagesKeys[2]}` ||
                "/test/blur.jpeg"
              }
              alt="store"
              width={350}
              height={350}
              placeholder="blur"
              blurDataURL="/test/blur.jpeg"
              className="w-full h-full object-cover animate-blurred-fade-in object-center rounded-lg transition duration-700 hover:scale-110"
              onLoad={handleImageLoad}
            />
          </div>
        </div>
        <div className="w-1/4 h-full flex flex-col gap-1 overflow-hidden">
          <div className="w-full h-2/4 relative">
            <Image
              width={350}
              height={350}
              src={
                `https://d28fpa5kkce5uk.cloudfront.net/${storeImagesKeys[3]}` ||
                "/test/blur.jpeg"
              }
              placeholder="blur"
              blurDataURL="/test/blur.jpeg"
              alt="store"
              className="w-full h-full animate-blurred-fade-in object-cover object-center rounded-lg"
              onLoad={handleImageLoad}
            />
          </div>
          <div className="w-full h-2/4 relative">
            <Image
              width={400}
              height={400}
              src={
                `https://d28fpa5kkce5uk.cloudfront.net/${storeImagesKeys[4]}` ||
                "/test/blur.jpeg"
              }
              placeholder="blur"
              blurDataURL="/test/blur.jpeg"
              alt="store"
              className="w-full h-full animate-blurred-fade-in object-cover object-center rounded-lg"
              onLoad={handleImageLoad}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default StoreGallery;
