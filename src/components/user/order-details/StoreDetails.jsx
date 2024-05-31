import React from "react";

const StoreDetails = ({ storeDetails }) => {
  return (
    <div className="w-full rounded-md bg-gray-100 px-6 py-4 flex flex-col gap-1 ">
      <h1 className="text-left text-[16px] font-bold text-gray-900">
        Store Details
      </h1>
      <div className="text-[14px] text-gray-800 w-full">
        <div className="flex items-center justify-between">
          <p>Name: </p>
          <span>{storeDetails?.storeName}</span>
        </div>
        <div className="flex items-center justify-between">
          <p>Address: </p>
          <span>{storeDetails?.storeLocation?.storeLandmark}{" "}
          {storeDetails?.storeLocation?.storeCity}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <p>Phone: </p>
          <span>+91 {storeDetails?.storePhoneNumber}</span>
        </div>
        <div className="flex items-center justify-between">
          <p>Email: </p>
          <span>{storeDetails?.storeEmail}</span>
        </div>
      </div>
    </div>
  );
};

export default StoreDetails;
