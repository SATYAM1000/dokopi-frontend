"use client";
import { fetchAccessToken } from "@/actions/access-token";
import Wrapper from "@/components/user/global/Wrapper";
import Link from "next/link";
import React, { useEffect } from "react";
import { PuffLoader } from "react-spinners";
import axios from "axios";
import { API_DOMAIN } from "@/lib/constants";
import { toast } from "sonner";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useDispatch } from "react-redux";
import { clearCart } from "@/providers/redux/slices/cart-slice";

const PaymentSuccessPage = () => {
  const currentUser = useCurrentUser();
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(true);
  const [isPaymentSuccess, setIsPaymentSuccess] = React.useState(false);
  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const reference = new URLSearchParams(window.location.search).get(
          "reference"
        );
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
          toast.success("Payment Successful");
          dispatch(clearCart());
          return;
        }
      } catch (error) {
        setIsPaymentSuccess(false);
        setLoading(false);
        toast.error(error.response?.data?.msg || "Something went wrong");
        return;
      }
    };

    verifyPayment();
  }, []);
  return (
    <div className="h-[calc(100vh-70px)] bg-gray-100  md:h-[calc(100vh-80px)] flex items-center justify-center bg-grid-black/[0.05]">
      <Wrapper className={"md:hidden"}>
        <div className=" border rounded-2xl p-6  md:mx-auto bg-white">
          <svg
            viewBox="0 0 24 24"
            className="text-green-600 w-16 h-16 mx-auto my-6"
          >
            <path
              fill="currentColor"
              d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
            ></path>
          </svg>
          <div className="text-center">
            <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
              Payment Done!
            </h3>
            <p className="text-gray-600 my-2">
              Thank you for completing your secure online payment.
            </p>
            <p> Have a great day! </p>
            <div className="py-10 text-center">
              <Link
                href="#"
                className="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3"
              >
                GO BACK
              </Link>
            </div>
          </div>
        </div>
      </Wrapper>
      <div
        className={`flex flex-col rounded-3xl p-6  mx-auto max-w-[400px] min-w-[350px] border-2 border-r-8 border-b-8 border-primary ${
          loading
            ? "bg-white"
            : isPaymentSuccess
            ? "bg-green-100"
            : "bg-red-100"
        }`}
      >
        {loading ? (
          <div className="w-full h-full flex items-center justify-center p-5">
            <PuffLoader color="#2563eb" />
          </div>
        ) : isPaymentSuccess ? (
          <svg
            viewBox="0 0 24 24"
            className="text-green-600 w-16 h-16 mx-auto my-6"
          >
            <path
              fill="currentColor"
              d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
            ></path>
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            className="text-red-600 w-16 h-16 mx-auto my-6"
          >
            <path
              fill="#f44336"
              d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"
            ></path>
            <path
              fill="#fff"
              d="M29.656,15.516l2.828,2.828l-14.14,14.14l-2.828-2.828L29.656,15.516z"
            ></path>
            <path
              fill="#fff"
              d="M32.484,29.656l-2.828,2.828l-14.14-14.14l2.828-2.828L32.484,29.656z"
            ></path>
          </svg>
        )}
        <div className="text-center">
          <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
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
              className="px-12 bg-white border-2 border-r-8 border-b-8 rounded-xl text-primary hover:bg-gray-200 border-primary font-semibold py-3"
            >
              GO BACK
            </Link>
          </div>
          <Link
            href="/active-orders"
            className="inline-block text-sm  transition text-gray-900 underline underline-offset-4"
          >
            Track your order here &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
