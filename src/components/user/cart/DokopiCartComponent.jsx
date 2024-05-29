"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import axios from "axios";
import { API_DOMAIN } from "@/lib/constants";
import { toast } from "sonner";
import { useSelector, useDispatch } from "react-redux";
import { X } from "lucide-react";
import {
  deleteFromCart,
  clearCart,
} from "@/providers/redux/reducers/cart-slice";
import Script from "next/script";
import Wrapper from "../global/Wrapper";

const DokopiCartComponent = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();


  const removeFromCartHandler = (id) => {
    dispatch(deleteFromCart(id));
  };

  const checkoutHandler = async () => {
    try {
      const amount = 10;
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
        key: "rzp_test_lvrDAnEiGX5qlr", // Enter the Key ID generated from the Dashboard
        amount: order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: "INR",
        name: "Acme Corp",
        description: "Test Transaction",
        image: "https://avatars.githubusercontent.com/u/104556262?v=4",
        order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        callback_url: `${API_DOMAIN}/api/v1/user/payment/verify`,
        prefill: {
          name: "Gaurav Kumar",
          email: "gaurav.kumar@example.com",
          contact: "9000090000",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
        handler: function (response) {
          dispatch(clearCart());
          toast.success("Payment successful!");
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
    <Wrapper>
      {cartItems.length > 0 ? (
        <div className="mt-6 space-y-6">
          <ul className="space-y-4">
            {cartItems.map((product) => (
              <li
                key={product.id}
                className="flex items-center gap-4 border-b-2 pb-4"
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
                  <dl className="mt-0.5 w-full space-y-px text-[10px] text-gray-600">
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
                    <div className="flex items-center gap-4">
                      <dd className="inline ">{product?.filePrintMode}</dd>

                      <dd className="inline">{product?.fileColorType}</dd>
                    </div>
                  </dl>
                </div>
              </li>
            ))}
          </ul>
          <div className="space-y-4 text-center">
            <Button
              onClick={checkoutHandler}
              type="button"
              className="w-full rounded-md bg-blue-600 hover:bg-blue-800 px-3 py-2 text-sm font-semibold text-white shadow-sm "
            >
              Proceed to Payment
            </Button>
            <Link
              href="#"
              className="inline-block text-sm text-gray-600 transition hover:text-gray-700 hover:underline hover:underline-offset-4"
            >
              Continue uploading documents &rarr;
            </Link>
          </div>
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
    </Wrapper>
  );
};

export default DokopiCartComponent;
