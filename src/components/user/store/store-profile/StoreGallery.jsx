import React from "react";
import Image from "next/image";

const StoreGallery = ({ storeData }) => {
  const { storeImagesKeys } = storeData;

  return (
    <>
      <div className="w-full h-60 md:hidden">
        <Image
          src={`https://d28fpa5kkce5uk.cloudfront.net/${
            storeData?.storeImagesKeys[0]
              ? storeData?.storeImagesKeys[0]
              : "xeroxstores/fallback-img.jpeg"
          }`}
          alt="store"
          className="w-full h-full animate-blurred-fade-in object-cover object-center rounded-lg"
          placeholder="blur"
          blurDataURL="/test/blur.jpeg"
          width={1000}
          height={1000}
          priority
        />
      </div>

      <div className="hidden w-full h-96 md:flex gap-1">
        <div className="w-full h-full overflow-hidden rounded-lg">
          <Image
            src={`https://d28fpa5kkce5uk.cloudfront.net/${
              storeImagesKeys[0]
                ? storeImagesKeys[0]
                : "xeroxstores/fallback-img.jpeg"
            }`}
            width={1000}
            height={1000}
            placeholder="blur"
            blurDataURL="/test/blur.jpeg"
            alt="store"
            priority
            className="w-full h-full animate-blurred-fade-in object-cover object-center rounded-lg transition duration-700 hover:scale-110"
          />
        </div>

        <div className="w-1/4 h-full flex flex-col gap-1 overflow-hidden">
          <div className="w-full h-2/4 overflow-hidden rounded-lg">
            <Image
              src={`https://d28fpa5kkce5uk.cloudfront.net/${
                storeImagesKeys[1]
                  ? storeImagesKeys[1]
                  : "xeroxstores/fallback-img.jpeg"
              }`}
              alt="store"
              width={350}
              height={350}
              placeholder="blur"
              blurDataURL="/test/blur.jpeg"
              priority
              className="w-full h-full object-cover animate-blurred-fade-in object-center rounded-lg transition duration-700 hover:scale-110"
            />
          </div>
          <div className="w-full h-2/4 overflow-hidden rounded-lg">
            <Image
              src={`https://d28fpa5kkce5uk.cloudfront.net/${
                storeImagesKeys[2]
                  ? storeImagesKeys[2]
                  : "xeroxstores/fallback-img.jpeg"
              }`}
              alt="store"
              width={350}
              height={350}
              placeholder="blur"
              blurDataURL="/test/blur.jpeg"
              priority
              className="w-full h-full object-cover animate-blurred-fade-in object-center rounded-lg transition duration-700 hover:scale-110"
            />
          </div>
        </div>
        <div className="w-1/4 h-full flex flex-col gap-1 overflow-hidden">
          <div className="w-full h-2/4 relative">
            <Image
              width={350}
              height={350}
              src={`https://d28fpa5kkce5uk.cloudfront.net/${
                storeImagesKeys[3]
                  ? storeImagesKeys[3]
                  : "xeroxstores/fallback-img.jpeg"
              }`}
              placeholder="blur"
              blurDataURL="/test/blur.jpeg"
              alt="store"
              priority
              className="w-full h-full animate-blurred-fade-in object-cover object-center rounded-lg"
            />
          </div>
          <div className="w-full h-2/4 relative">
            <Image
              width={400}
              height={400}
              src={`https://d28fpa5kkce5uk.cloudfront.net/${
                storeImagesKeys[4]
                  ? storeImagesKeys[4]
                  : "xeroxstores/fallback-img.jpeg"
              }`}
              placeholder="blur"
              blurDataURL="/test/blur.jpeg"
              alt="store"
              priority
              className="w-full h-full animate-blurred-fade-in object-cover object-center rounded-lg"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default StoreGallery;
