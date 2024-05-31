import { Check, CheckCheck, Clock, Loader, Package, Slash } from "lucide-react";
import React from "react";

const OrderStatus = ({ OrderStatus }) => {
  if (!OrderStatus) return null;
  return (
    <>
      {OrderStatus === "pending" && (
        <div className="w-full rounded-md bg-red-100 px-6 py-4 mt-4 flex flex-col gap-1 border border-red-600/[0.4] ">
          <div className="text-[13px] text-red-700 w-full flex items-center gap-2">
            <Clock className="h-5 w-5 inline" />
            <p>Your order is {OrderStatus}</p>
          </div>
        </div>
      )}

      {OrderStatus === "processing" && (
        <div className="w-full rounded-md bg-yellow-100 px-6 py-4 mt-4 flex flex-col gap-1 border border-yellow-600/[0.4] ">
          <div className="text-[13px] text-yellow-700 w-full flex items-center gap-2">
            <Loader className="h-5 w-5 inline animate-spin-clockwise repeat-infinite animate-duration-1000" />
            <p>Your order is {OrderStatus}</p>
          </div>
        </div>
      )}

      {OrderStatus === "delivered" && (
        <div className="w-full rounded-md bg-green-100 px-6 py-4 mt-4 flex flex-col gap-1 border border-green-600/[0.4] ">
          <div className="text-[13px] text-green-700 w-full flex items-center gap-2">
            <Package className="h-5 w-5 inline" />
            <p>Your order is {OrderStatus}</p>
          </div>
        </div>
      )}

      {OrderStatus === "cancelled" && (
        <div className="w-full rounded-md bg-red-100 px-6 py-4 mt-4 flex flex-col gap-1 border border-red-600/[0.4] ">
          <div className="text-[13px] text-red-700 w-full flex items-center gap-2">
            <Slash className="h-5 w-5 inline" />
            <p>Your order is {OrderStatus}</p>
          </div>
        </div>
      )}

      {OrderStatus === "completed" && (
        <div className="w-full rounded-md bg-green-100 px-6 py-4 mt-4 flex flex-col gap-1 border border-green-600/[0.4] ">
          <div className="text-[13px] text-green-700 w-full flex items-center gap-2">
            <CheckCheck className="h-5 w-5 inline" />
            <p>Your order is {OrderStatus}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderStatus;
