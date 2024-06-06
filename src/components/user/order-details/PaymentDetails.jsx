import { Badge } from "@/components/ui/badge";
import React from "react";

const PaymentDetails = ({ PaymentDetails }) => {
  return (
    <div className="w-full rounded-md bg-gray-100 px-6 py-4 flex flex-col gap-1 ">
      <h1 className="text-left text-[16px] font-bold text-gray-900">
        Payment Details
      </h1>
      <div className="text-[14px] text-gray-800 w-full">
        <div className="flex items-center justify-between">
          <p>Amount Paid: </p>
          <span>₹&nbsp;
            {PaymentDetails?.totalPrice}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <p>Transaction ID: </p>
          <span>{PaymentDetails?.phonePeTransactionId}</span>
        </div>
        <div className="flex items-center justify-between">
          <p>Date: </p>
          <span>
            {new Date(PaymentDetails?.createdAt).toLocaleDateString()}
          </span>
        </div>
        
        <div className="flex items-center justify-between ">
          <p>Status </p>
          <Badge className={'bg-green-600 font-normal py-0 capitalize'}>
            {PaymentDetails?.paymentStatus}
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default PaymentDetails;
