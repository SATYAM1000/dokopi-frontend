"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import Link from "next/link";
import { fetchAccessToken } from "@/actions/access-token";
import { API_DOMAIN } from "@/lib/constants";
import { Box, X } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/use-current-user";

const BannerForActiveOrders = () => {
  const currentUser = useCurrentUser();
  if (!currentUser) return null;
  const [hasActiveOrders, setHasActiveOrders] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [activeOrdersCount, setActiveOrdersCount] = useState(0);
  const pathname = usePathname();
  if (
    pathname === "/active-orders" ||
    pathname === "/history" ||
    pathname === "/contact" ||
    pathname === "/terms-conditions" ||
    pathname === "/privacy-policy" ||
    pathname === "/refund-shipping-policy" ||
    pathname === "/payment/success"
  )
    return null;

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

        setActiveOrdersCount(data.totalOrders);
        if (data.totalOrders > 0 && !localStorage.getItem("modalClosed")) {
          setHasActiveOrders(true);
          setIsModalVisible(true);
        }
      } catch (error) {
        setHasActiveOrders(false);
      }
    };

    fetchActiveOrders();
  }, []);

  const handleCloseModal = () => {
    setIsModalVisible(false);
    localStorage.setItem("modalClosed", "true");
  };

  return (
    <AnimatePresence>
      {isModalVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 ">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="bg-white p-6 rounded-lg shadow-lg text-center relative z-60 max-w-lg w-full mx-4"
          >
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 bg-gray-200 flex items-center justify-center rounded-full w-8 h-8 text-gray-500 hover:text-gray-600"
            >
              <X size={24} />
            </button>

            <div>
              <Image
                src="/main/active-orders.jpg"
                alt="Active Orders"
                width={300}
                height={300}
                className="mx-auto rounded-full aspect-auto "
              />
            </div>
            <p className="mb-4 font-medium text-gray-700">
              You have {activeOrdersCount} active orders.
              <Link
                href="/active-orders"
                className="underline ml-2 text-[14px] text-indigo-600 underline-offset-4"
              >
                View order status &rarr;
              </Link>
            </p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default BannerForActiveOrders;
