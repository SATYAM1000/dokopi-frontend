import React from "react";

const BillDetails = ({ totalPrice }) => {
  return totalPrice === null || totalPrice === 0 ? (
    <></>
  ) : (
    <>
      <div className="w-full rounded-md bg-gray-100 px-6 py-4 flex flex-col gap-1 ">
        <h1 className="text-left text-[15px] font-bold text-gray-900">
          Bill Details
        </h1>
        <div className="text-[13px] text-gray-700 w-full">
          <div className="flex items-center justify-between">
            <p>Subtotal: </p>
            <span>
              ₹&nbsp;
              {totalPrice}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <p>Discount: </p>
            <span>₹&nbsp;0</span>
          </div>
        </div>
        <div className="w-full flex items-center justify-between mt-2">
          <p className="text-[14px] font-semibold text-gray-900">Total</p>

          <p className="text-[14px] font-semibold text-gray-900">
            ₹&nbsp;
            {totalPrice}
          </p>
        </div>
      </div>
    </>
  );
};

export default BillDetails;
