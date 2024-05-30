import React from "react";

const CancellationPolicy = () => {
  return (
    <div className="pb-8">
    <div className="w-full rounded-md bg-gray-100 px-6 py-4 flex flex-col gap-1  ">
      <h1 className="text-left text-[15px] font-bold text-gray-900">Cancellation Policy</h1>
      <p className="text-[13px] text-gray-700">
        Orders cannot be cancelled once sent to the xerox store. In case of
        unexpected delays, a refund will be provided, if applicable.
      </p>
    </div>
    </div>
  );
};

export default CancellationPolicy;
