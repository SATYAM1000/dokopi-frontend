import React from "react";

export default function AverageOrderMessage() {
  return (
    <div className="w-full rounded-md bg-gray-100 px-6 py-4 flex flex-col gap-1">
      {/* <p className="font-semibold">Please note</p> */}
      <p className="text-[13px] text-gray-700">
        Your order will be ready for pickup at the store in approximately 20
        minutes. We appreciate your patience and look forward to serving you
        when you arrive.
      </p>
    </div>
  );
}
