"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import axios from "axios";
import { API_DOMAIN } from "@/lib/constants";
import { toast } from "sonner";
import { fetchAccessToken } from "@/actions/access-token";
import { ClipLoader } from "react-spinners";
import { useSelector } from "react-redux";
import { useCurrentUser } from "@/hooks/use-current-user";

const PaymentButton = ({ setOpen, totalPrice }) => {
  const currentUser = useCurrentUser();

  const [loading, setLoading] = React.useState(false);
  const cartItems = useSelector((state) => state.cart.items);
  const handleClick = async () => {
    try {
      setLoading(true);
      setOpen(false);
      if (!currentUser) {
        toast.error("Please login to continue");
        return;
      }
      const token = await fetchAccessToken();
      const storeId = localStorage.getItem("storeId");
      if (!storeId) {
        toast.error("Invalid store");
        return;
      }
      if (cartItems.length < 1) {
        toast.error("Cart is empty!");
        return;
      }
      const res = await axios.get(
        `${API_DOMAIN}/api/v1/user/payment/razorpay-key`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!res.data.success) {
        toast.error(res.data?.msg || "Something went wrong");
        return;
      }

      const {
        data: { order },
      } = await axios.post(
        `${API_DOMAIN}/api/v1/user/payment/user-checkout?userId=${currentUser.id}&storeId=${storeId}`,
        {
          amount: totalPrice,
          cartItems,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!order) {
        toast.error("Failed to create order");
        return;
      }

      const options = {
        key: res.data.key,
        amount: order.amount,
        currency: "INR",
        name: "Dokopi",
        description: `Order #${order.id}`,
        image: "https://avatars.githubusercontent.com/u/104556262?v=4",
        order_id: order.id,
        callback_url: `${API_DOMAIN}/api/v1/user/payment/verify`,

        prefill: {
          name: currentUser?.name,
          email: currentUser?.email,
        },
        theme: {
          color: "#3399cc",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      toast.error(error.response?.data?.msg || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" pt-6 flex items-center justify-center">
      <div className="space-y-4 text-center fixed overflow-hidden bottom-2  p-4 bg-blue-600 rounded-md ">
        <Button
          onClick={handleClick}
          disabled={loading}
          type="button"
          className="w-full rounded-md bg-white hover:bg-white/90 px-3 py-2 text-sm font-semibold text-blue-600 shadow-sm "
        >
          {loading && <ClipLoader color="#000" size={17} className="mr-6" />}
          Proceed to Payment
        </Button>
        <Link
          href="/stores"
          className="inline-block text-sm  transition text-white/90 underline underline-offset-4"
        >
          Continue uploading documents &rarr;
        </Link>
      </div>
    </div>
  );
};

export default PaymentButton;
