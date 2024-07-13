import {
  Check,
  Clock,
  Loader,
  X,
} from "lucide-react";
import React from "react";

const OrderStatus = ({ OrderStatus }) => {
  if (
    !OrderStatus ||
    OrderStatus !== "pending" &&
    OrderStatus !== "processing" &&
    OrderStatus !== "printed" &&
    OrderStatus !== "rejected"
  )
    return null;
  return (
    <>
      {OrderStatus === "pending" && (
        <div className="w-full rounded-md bg-orange-100 px-6 py-2 mt-4 flex flex-col gap-1 border border-orange-600/[0.4] ">
          <div className="text-sm text-orange-500 w-full flex items-center gap-2">
            <Clock size={16} className=" inline" />
            <p>Your order is {OrderStatus}</p>
          </div>
        </div>
      )}

      {OrderStatus === "processing" && (
        <div className="w-full rounded-md bg-indigo-100 px-6 py-2 mt-4 flex flex-col gap-1 border border-indigo-600/[0.4] ">
          <div className="text-[14px] text-indigo-600 w-full flex items-center gap-2">
            <Loader className="h-4 w-4 inline animate-spin-clockwise repeat-infinite animate-duration-1000" />
            <p>Your order is {OrderStatus}</p>
          </div>
        </div>
      )}

      {OrderStatus === "printed" && (
        <div className="w-full rounded-md bg-green-100 px-6 py-2 mt-4 flex flex-col gap-1 border border-green-600/[0.4] ">
          <div className="text-[14px] text-green-600 w-full flex items-center gap-2">
            <Check className="h-4 w-4 inline" />
            <p>Your order is {OrderStatus}</p>
          </div>
        </div>
      )}

      {OrderStatus === "rejected" && (
        <div className="w-full rounded-md bg-red-100 px-6 py-2 mt-4 flex flex-col gap-1 border border-red-600/[0.4] ">
          <div className="text-[14px] text-red-600 w-full flex items-center gap-2">
            <X className="h-4 w-4 inline" />
            <p>Your order is {OrderStatus}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderStatus;
