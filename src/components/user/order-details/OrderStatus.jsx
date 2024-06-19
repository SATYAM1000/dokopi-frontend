"use client"
import { CheckCheck, Clock, Package, Slash, FileText } from "lucide-react";
import React from "react";

const OrderStatus = ({ orderStatus }) => {
  if (!orderStatus) return null;

  return (
    <>
      {orderStatus === "pending" && (
        <div className="w-full rounded-md bg-orange-100 px-6 py-4 mt-4 flex flex-col gap-1 border border-orange-600/[0.4]">
          <div className="text-[13px] text-orange-700 w-full flex items-center gap-2">
            <Clock className="h-5 w-5 inline" />
            <p>Your order is {orderStatus}</p>
          </div>
        </div>
      )}

      {orderStatus === "processing" && (
        <div className="w-full rounded-md bg-blue-100 px-6 py-4 mt-4 flex flex-col gap-1 border border-blue-600/[0.4]">
          <div className="text-[13px] text-blue-700 w-full flex items-center gap-2">
            <FileText className="h-5 w-5 inline" />
            <p>Your order is {orderStatus}</p>
          </div>
        </div>
      )}

      {orderStatus === "delivered" && (
        <div className="w-full rounded-md bg-green-100 px-6 py-4 mt-4 flex flex-col gap-1 border border-green-600/[0.4]">
          <div className="text-[13px] text-green-700 w-full flex items-center gap-2">
            <Package className="h-5 w-5 inline" />
            <p>Your order is {orderStatus}</p>
          </div>
        </div>
      )}

      {orderStatus === "cancelled" && (
        <div className="w-full rounded-md bg-red-100 px-6 py-4 mt-4 flex flex-col gap-1 border border-red-600/[0.4]">
          <div className="text-[13px] text-red-700 w-full flex items-center gap-2">
            <Slash className="h-5 w-5 inline" />
            <p>Your order is {orderStatus}</p>
          </div>
        </div>
      )}

      {orderStatus === "completed" && (
        <div className="w-full rounded-md bg-teal-100 px-6 py-4 mt-4 flex flex-col gap-1 border border-teal-600/[0.4]">
          <div className="text-[13px] text-teal-700 w-full flex items-center gap-2">
            <CheckCheck className="h-5 w-5 inline" />
            <p>Your order is {orderStatus}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderStatus;
