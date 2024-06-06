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
import ShortUniqueId from "short-unique-id";

const PaymentButton = ({ setOpen, totalPrice }) => {
  const currentUser = useCurrentUser();
  const uid = new ShortUniqueId();

  const [loading, setLoading] = React.useState(false);
  const cartItems = useSelector((state) => state.cart.items);
  const handlePhonePePaymentClick = async () => {
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

      let data = {
        name: currentUser?.name,
        amount: totalPrice,
        merchantTransactionId: "pay_" + uid.stamp(15),
        merchantUserId: "user_" + String(currentUser?.id),
        cartItems: cartItems,
      };

      const res = await axios.post(
        `${API_DOMAIN}/api/v1/user/payment/phonepe?storeId=${storeId}&userId=${currentUser?.id}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (
        res?.data &&
        res.data?.data?.data?.instrumentResponse?.redirectInfo?.url
      ) {
        window.location.href =
          res.data?.data?.data?.instrumentResponse?.redirectInfo?.url;
      } else {
        toast.error("Something went wrong");
        return;
      }
    } catch (error) {
      console.log("Error while making payment ", error);
      toast.error(error.response?.data?.msg || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" pt-6 flex items-center justify-center">
      <div className="space-y-4 text-center fixed overflow-hidden bottom-2  p-4 bg-blue-600 rounded-md ">
        <Button
          onClick={handlePhonePePaymentClick}
          disabled={loading}
          type="button"
          className="w-full rounded-md bg-white hover:bg-white/90 px-3 py-2 text-sm font-semibold text-blue-600 shadow-sm "
        >
          Proceed to Payment
          {loading ? (
            <ClipLoader color="#000" size={17} className="mr-6" />
          ) : (
            <>&nbsp;&nbsp;&nbsp;&rarr;</>
          )}
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
