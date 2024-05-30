import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const PaymentButton = () => {
  return (
    <div className=" pt-6 flex items-center justify-center">
      <div className="space-y-4 text-center fixed overflow-hidden bottom-2  p-4 bg-blue-600 rounded-md ">
      <Button
        onClick={() => alert("Payment processing...")}
        type="button"
        className="w-full rounded-md bg-white hover:bg-white/90 px-3 py-2 text-sm font-semibold text-blue-600 shadow-sm "
      >
        Proceed to Payment
      </Button>
      <Link
        href="#"
        className="inline-block text-sm  transition text-white/90 underline underline-offset-4"
      >
        Continue uploading documents &rarr;
      </Link>
    </div>
    </div>
  );
};

export default PaymentButton;
