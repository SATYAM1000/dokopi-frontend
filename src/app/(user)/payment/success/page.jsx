"use client";
import { fetchAccessToken } from "@/actions/access-token";
import Link from "next/link";
import React, { useEffect } from "react";
import { PuffLoader } from "react-spinners";
import axios from "axios";
import { API_DOMAIN } from "@/lib/constants";
import { useCurrentUser } from "@/hooks/use-current-user";
import Image from "next/image";

const PaymentSuccessPage = () => {
  const currentUser = useCurrentUser();
  if (!currentUser) return null;
  const [loading, setLoading] = React.useState(true);
  const [isPaymentSuccess, setIsPaymentSuccess] = React.useState(false);
  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const reference = new URLSearchParams(window.location.search).get("id");
        const token = await fetchAccessToken();
        const res = await axios.get(
          `${API_DOMAIN}/api/v1/user/payment/verify-payment-id?paymentRefrenceId=${reference}&userId=${currentUser?.id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (res.data.success) {
          setIsPaymentSuccess(true);
          setLoading(false);
          return;
        }
      } catch (error) {
        setIsPaymentSuccess(false);
        setLoading(false);
        return;
      }
    };
    if (currentUser) verifyPayment();
  }, []);
  
  return (
    <div className="h-[calc(100vh-70px)] md:h-[calc(100vh-80px)] flex items-center justify-center ">
      <div
        className={`flex flex-col rounded-3xl p-6   mx-auto max-w-[300px] md:max-w-[400px] md:min-w-[320px] border-2 border-r-8 border-b-8 border-primary ${
          loading ? "bg-white" : isPaymentSuccess ? "bg-white" : "bg-white"
        }`}
      >
        {loading ? (
          <div className="flex items-center justify-center w-full h-full p-5">
            <PuffLoader color="#2563eb" />
          </div>
        ) : isPaymentSuccess ? (
          <div className="flex items-center justify-center w-full h-full">
            <Image
              src="/main/success.gif"
              alt="success"
              width={100}
              height={100}
            />
          </div>
        ) : (
         <div className="flex items-center justify-center w-full h-full">
          <Image
            src="/main/failed.gif"
            alt="fail"
            width={100}
            height={100}
          />
         </div>
        )}
        <div className="text-center">
          <h3 className="text-base font-semibold text-center text-gray-900 md:text-2xl">
            {loading
              ? "Verifying Payment"
              : isPaymentSuccess
              ? "Payment Done!"
              : "Payment Failed"}
          </h3>
          <p className="text-gray-900 my-2 text-[14px] font-medium">
            {loading
              ? "Wait while we verify your payment."
              : isPaymentSuccess
              ? "Thank you for completing your secure online payment."
              : "We're sorry, your payment could not be verified."}
          </p>
          <p className="text-gray-900 text-[14px] font-medium">
            {loading
              ? " "
              : isPaymentSuccess
              ? "Have a great day!"
              : "Please try again later."}
          </p>
          <div className="py-10 text-center">
            <Link
              href="/stores"
              className="px-12 py-3 font-semibold bg-white border-2 border-b-8 border-r-8 rounded-xl text-primary hover:bg-gray-200 border-primary"
            >
              GO BACK
            </Link>
          </div>
          <Link
            href="/active-orders"
            className="inline-block text-sm text-gray-900 underline transition underline-offset-4"
          >
            Track your order status &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
