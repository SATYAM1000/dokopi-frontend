"use client";

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { X } from "lucide-react";
import { deleteFromCart } from "@/providers/redux/slices/cart-slice";
import Script from "next/script";
import { redirect } from "next/navigation";
import { useCurrentUser } from "@/hooks/use-current-user";
import CancellationPolicy from "./CancellationPolicy";
import PaymentButton from "./PaymentButton";
import BillDetails from "./BillDetails";
import { API_DOMAIN } from "@/lib/constants";
import { calculateTotalPrice } from "@/lib/price-calculator";
import axios from "axios";

const DokopiCartComponent = ({ setOpen }) => {
  const currentUser = useCurrentUser();
  if (!currentUser) redirect("/auth/sign-in");
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const [totalPrice, setTotalPrice] = React.useState(0);
  const [loading, setLoading] = React.useState(false);

  const fetchStorePricing = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${API_DOMAIN}/api/v1/merchant/store/pricing/${localStorage.getItem(
          "storeId"
        )}`
      );

      const price = calculateTotalPrice(cartItems, data?.data);
      setTotalPrice(price);
    } catch (error) {
      console.log("Error fetching store pricing:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStorePricing();
  }, []);

  const removeFromCartHandler = (id) => {
    dispatch(deleteFromCart(id));
  };
  return (
    <div className="w-[100%] relative flex flex-col items-center justify-center">
      {cartItems.length > 0 ? (
        <div className="mt-6 space-y-6 w-[100%]  max-h-[67vh] overflow-hidden rounded-md  overflow-y-scroll relative hide-scrollbar flex flex-col mb-6 gap-2">
          <ul className="space-y-4 bg-gray-100 rounded-md    ">
            {cartItems.map((product) => (
              <li
                key={product.id}
                className="flex p-2 rounded-md items-center gap-4 pb-4 min-w-full border-b border-gray-300"
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
          <BillDetails totalPrice={totalPrice} />
          <CancellationPolicy />
          <PaymentButton setOpen={setOpen} />
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
