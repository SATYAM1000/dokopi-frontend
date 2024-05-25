"use client";
import React from "react";
import StoreGallery from "./StoreGallery";
import StoreInfo from "./StoreInfo";
import Review from "./Review";
import MapView from "./MapView";
import ErrorComponent from "../../Error";

const DoKopiStoreOverview = () => {
  return (
    <section className="w-full mt-6 min-h-screen flex flex-col gap-5">
      <StoreGallery />
      <StoreInfo />
      <div className="flex flex-col md:flex-row md:justify-between gap-6 md:gap-12">
        <div className="w-full md:w-2/6">
          <MapView />
        </div>
        <div className="flex flex-col gap-2 w-full md:w-4/6 scrollable">
          <h2 className="text-xl flex flex-col md:block font-medium">
            Reviews
          </h2>
          <div className="flex flex-col gap-3 mt-2">
            <Review />

            <Review />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DoKopiStoreOverview;
