"use client";
import React, { useState, useEffect } from "react";
import ImageWithFallback from "./ImageWithFallback";
import StoreGallerySkelton from "./StoreGallerySkelton";

const StoreGallery = ({ storeData }) => {
  const { storeImagesURL } = storeData;
  const [loading, setLoading] = useState(true);

  // This effect will run when the component mounts
  useEffect(() => {
    const loadImages = async () => {
      const promises = storeImagesURL.map((url) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.src = url;
          img.onload = () => resolve();
          img.onerror = () => resolve(); // handle error by resolving the promise
        });
      });

      await Promise.all(promises);
      setLoading(false);
    };

    loadImages();
  }, [storeImagesURL]);

  if (loading) {
    return <StoreGallerySkelton />;
  }

  return (
    <>
      <div className="w-full h-60 md:hidden">
        <ImageWithFallback
          src={storeImagesURL[0] || "https://images.unsplash.com/photo-1509641498745-13c26fd1ed89?dpr=1&auto=format&fit=crop&w=1000&q=80&cs=tinysrgb&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D"}
          alt="store"
          className="w-full h-full object-cover object-center rounded-lg"
          fallbackSrc={
            "https://images.unsplash.com/photo-1509641498745-13c26fd1ed89?dpr=1&auto=format&fit=crop&w=1000&q=80&cs=tinysrgb&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D"
          }
          placeholder="blur"
          blurDataURL="/test/blur.jpeg"
          width={1000}
          height={1000}
        />
      </div>

      <div className="hidden w-full h-96 md:flex gap-1">
        <div className="w-full h-full overflow-hidden rounded-lg">
          <ImageWithFallback
            src={storeImagesURL[0] || "https://images.unsplash.com/photo-1509641498745-13c26fd1ed89?dpr=1&auto=format&fit=crop&w=1000&q=80&cs=tinysrgb&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D"}
            width={1000}
            height={1000}
            placeholder="blur"
            blurDataURL="/test/blur.jpeg"
            alt="store"
            className="w-full h-full object-cover object-center rounded-lg transition duration-700 hover:scale-110"
            fallbackSrc={
              "https://images.unsplash.com/photo-1509641498745-13c26fd1ed89?dpr=1&auto=format&fit=crop&w=1000&q=80&cs=tinysrgb&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D"
            }
          />
        </div>

        <div className="w-1/4 h-full flex flex-col gap-1 overflow-hidden">
          <div className="w-full h-2/4 overflow-hidden rounded-lg">
            <ImageWithFallback
              src={storeImagesURL[1] || "/test/blur.jpeg"}
              alt="store"
              width={350}
              height={350}
              placeholder="blur"
              blurDataURL="/test/blur.jpeg"
              fallbackSrc={
                "/test/blur.jpeg"
              }
              className="w-full h-full object-cover object-center rounded-lg transition duration-700 hover:scale-110"
            />
          </div>
          <div className="w-full h-2/4 overflow-hidden rounded-lg">
            <ImageWithFallback
              src={storeImagesURL[2] || "/test/blur.jpeg"}
              alt="store"
              width={350}
              height={350}
              placeholder="blur"
              blurDataURL="/test/blur.jpeg"
              fallbackSrc={
                "/test/blur.jpeg"
              }
              className="w-full h-full object-cover object-center rounded-lg transition duration-700 hover:scale-110"
            />
          </div>
        </div>
        <div className="w-1/4 h-full flex flex-col gap-1 overflow-hidden">
          <div className="w-full h-2/4 relative">
            <ImageWithFallback
              width={350}
              height={350}
              src={storeImagesURL[3] || "/test/blur.jpeg"}
              placeholder="blur"
              blurDataURL="/test/blur.jpeg"
              fallbackSrc={
                "/test/blur.jpeg"
              }
              alt="store"
              className="w-full h-full object-cover object-center rounded-lg"
            />
          </div>
          <div className="w-full h-2/4 relative">
            <ImageWithFallback
              width={400}
              height={400}
              src={storeImagesURL[4] || "/test/blur.jpeg"}
              placeholder="blur"
              blurDataURL="/test/blur.jpeg"
              fallbackSrc={
                "/test/blur.jpeg"
              }
              alt="store"
              className="w-full h-full object-cover object-center rounded-lg"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default StoreGallery;
