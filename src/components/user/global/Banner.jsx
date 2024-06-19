"use client";
import { fetchAccessToken } from "@/actions/access-token";
import { API_DOMAIN } from "@/lib/constants";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const BannerForActiveOrders = () => {
  const [hasActiveOrders, setHasActiveOrders] = useState(false);
  const [totalActiveOrders, setTotalActiveOrders] = useState(0);
  useEffect(() => {
    const fetchActiveOrders = async () => {
      try {
        const { data } = await axios.get(
          `${API_DOMAIN}/api/v1/user/orders/active`,
          {
            headers: {
              Authorization: `Bearer ${await fetchAccessToken()}`,
            },
          }
        );

        if (data.totalOrders === 0) {
          setHasActiveOrders(false);
          return;
        } else {
          setHasActiveOrders(true);
          setTotalActiveOrders(data.totalOrders);
        }
      } catch (error) {
        setHasActiveOrders(false);
      }
    };

    fetchActiveOrders();
  }, []);




  if (!hasActiveOrders) return null;

  return (
    <>
      {hasActiveOrders && (
        <div className="bg-indigo-600 px-4 py-3 text-white">
          <p className="text-center text-sm font-medium">
            You have an active order.
            <Link
              href="/active-orders"
              className="inline-block underline ml-2 underline-offset-4"
            >
              View order status&nbsp;&nbsp;&nbsp; &rarr;
            </Link>
          </p>
        </div>
      )}
    </>
  );
};

export default BannerForActiveOrders;
