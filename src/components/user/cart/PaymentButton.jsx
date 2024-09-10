"use client";
import React, { useEffect } from "react";
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

const PaymentButton = ({ setIsCartOpen, totalPrice, platformFee }) => {
  const currentUser = useCurrentUser();
  if (!totalPrice) return null;
  const uid = new ShortUniqueId();

  const [loading, setLoading] = React.useState(false);
  const [isStoreOpen, setIsStoreOpen] = React.useState(false);
  const [loadingForStoreStatus, setLoadingForStoreStatus] =
    React.useState(true);
  const cartItems = useSelector((state) => state.cart.items);
  const handlePhonePePaymentClick = async () => {
    try {
      setLoading(true);
      if (!currentUser) {
        toast.error("Please login to continue");
        setLoading(false);
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
        platformFee: platformFee,
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
      setIsCartOpen(false);
    }
  };

  useEffect(() => {
    const checkIsStoreOpen = async () => {
      try {
        const res = await axios.get(
          `${API_DOMAIN}/api/v1/user/stores/is-open/${localStorage.getItem(
            "storeId"
          )}`
        );
        if (res.data.success) {
          setIsStoreOpen(res.data.data.isOpen);
        } else {
          setIsStoreOpen(false);
        }
      } catch {
        console.log("error");
      } finally {
        setLoadingForStoreStatus(false);
      }
    };

    checkIsStoreOpen();
  }, [localStorage.getItem("storeId")]);

  return (
    <div className="flex items-center justify-center pt-6 ">
      {loadingForStoreStatus ? (
        <div className="fixed p-4 space-y-4 overflow-auto text-center rounded-md bottom-2">
          <ClipLoader color="#4f46e5" size={17} className="ml-6" />
        </div>
      ) : (
        <div
          className={`fixed p-4 space-y-4 overflow-hidden text-center  rounded-md bottom-2 ${
            isStoreOpen ? "bg-indigo-600" : "bg-red-500"
          } `}
        >
          <Button
            onClick={handlePhonePePaymentClick}
            disabled={loading || !isStoreOpen}
            type="button"
            className={`w-full px-3 py-2 text-sm font-semibold rounded-md shadow-sm hover:bg-white/90 ${
              isStoreOpen
                ? "text-indigo-600 bg-white"
                : " text-red-500  disabled:bg-white disabled:opacity-100 cursor-not-allowed"
            } `}
          >
            {isStoreOpen ? "Proceed to Payment" : "Store is currently closed"}
            {loading ? (
              <ClipLoader color="#4f46e5" size={17} className="ml-6" />
            ) : (
              <>&nbsp;&nbsp;&nbsp;&rarr;</>
            )}
          </Button>
          <Link
            href="/stores"
            className="inline-block text-sm underline transition text-white/90 underline-offset-4"
          >
            Continue uploading documents &rarr;
          </Link>
        </div>
      )}
    </div>
  );
};

export default PaymentButton;
