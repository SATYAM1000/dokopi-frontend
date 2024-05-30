"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import axios from "axios";
import { API_DOMAIN } from "@/lib/constants";
import { toast } from "sonner";
import { useSelector, useDispatch } from "react-redux";
import { X } from "lucide-react";
import { deleteFromCart, clearCart } from "@/providers/redux/slices/cart-slice";
import Script from "next/script";
import { redirect } from "next/navigation";
import { useCurrentUser } from "@/hooks/use-current-user";
import CancellationPolicy from "./CancellationPolicy";
import PaymentButton from "./PaymentButton";
import BillDetails from "./BillDetails";

const DokopiCartComponent = () => {
  const currentUser = useCurrentUser();
  if (!currentUser) redirect("/auth/sign-in");
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const removeFromCartHandler = (id) => {
    dispatch(deleteFromCart(id));
  };

  const checkoutHandler = async () => {
    try {
      const amount = 10;
      const razorpayKey = await axios.get(
        `${API_DOMAIN}/api/v1/user/payment/razorpay-key`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!razorpayKey.data.success) {
        toast.error(razorpayKey.data.message);
        return;
      }
      const {
        data: { order },
      } = await axios.post(
        `${API_DOMAIN}/api/v1/user/payment/user-checkout`,
        {
          cartItems,
          amount: amount,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const options = {
        key: razorpayKey.data.key,
        amount: order.amount,
        currency: "INR",
        name: "Dokopi",
        description: "Print with ease. Anywhere. Anytime.",
        image: "https://avatars.githubusercontent.com/u/104556262?v=4",
        order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        callback_url: `${API_DOMAIN}/api/v1/user/payment/verify`,
        prefill: {
          name: currentUser?.name,
          email: currentUser?.email,
        },

        theme: {
          color: "#3399cc",
        },
        handler: function (response) {
          dispatch(clearCart());
          toast.success("Payment successful!");
          redirect(
            "/payment/success?reference=" + response.razorpay_payment_id
          );
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      toast.error(error?.response?.data?.msg || error.message);
      return;
    }
  };

  return (
    <div className="w-[100%] relative flexi flex-col items-center justify-center">
      {cartItems.length > 0 ? (
        <div className="mt-6 space-y-6 w-[100%]  max-h-[67vh] overflow-hidden rounded-md  overflow-y-scroll relative hide-scrollbar flex flex-col mb-6 gap-2">
          <ul className="space-y-4 bg-gray-200 p-2 rounded-md    ">
            {cartItems.map((product) => (
              <li
                key={product.id}
                className="flex p-2 rounded-md items-center gap-4 pb-4 min-w-full"
              >
                <img
                  src={product?.fileIconPath}
                  alt={product?.fileOriginalName}
                  className="h-16 w-16 rounded object-contain"
                />
                <div className="w-full">
                  <h3 className="text-[15px] font-medium text-gray-900">
                    {product?.fileOriginalName}
                  </h3>
                  <dl className="mt-0.5 w-full space-y-px text-[11px] text-gray-700">
                    <div className="flex items-center justify-between w-full ">
                      <div className="flex items-center gap-4">
                        <dd className="inline font-medium">
                          {product?.fileSize}
                        </dd>
                        <dd className="inline font-medium">
                          {product?.filePageCount}&nbsp;Pages
                        </dd>
                      </div>
                      <div
                        className="cursor-pointer"
                        onClick={() => removeFromCartHandler(product?.id)}
                      >
                        <X className="h-4 w-4" />
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-gray-700 text-[11px] ">
                      <dd className="inline capitalize ">
                        {product?.filePrintMode}
                      </dd>

                      <dd className="inline capitalize">
                        {product?.fileColorType}
                      </dd>
                    </div>
                  </dl>
                </div>
              </li>
            ))}
          </ul>
          <BillDetails />
          <CancellationPolicy />
          <PaymentButton />
        </div>
      ) : (
        <div className="mt-6 space-y-6">
          <p className="text-center text-gray-600">
            No documents in your cart.
          </p>
        </div>
      )}

      <Script
        id="razorpay-checkout-js"
        src="https://checkout.razorpay.com/v1/checkout.js"
      />
    </div>
  );
};

export default DokopiCartComponent;
