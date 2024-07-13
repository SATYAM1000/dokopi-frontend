"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { X } from "lucide-react";
import { fetchAccessToken } from "@/actions/access-token";
import { API_DOMAIN } from "@/lib/constants";
import { useCurrentUser } from "@/hooks/use-current-user";
import { usePathname } from "next/navigation";

const BannerForActiveOrders = () => {
  const pathname = usePathname();
  const currentUser = useCurrentUser();
  const [hasActiveOrders, setHasActiveOrders] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [activeOrdersCount, setActiveOrdersCount] = useState(0);
  const [excludedRoutes] = useState([
    "/active-orders",
    "/history",
    "/contact",
    "/terms-conditions",
    "/privacy-policy",
    "/refund-shipping-policy",
    "/payment/success",
  ]);

  useEffect(() => {
    if (!currentUser) return;

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
        if (data.totalOrders > 0 && localStorage.getItem("userAddress") && !localStorage.getItem("modalClosed")) {
          setHasActiveOrders(true);
          setIsModalVisible(true);
        }
      } catch (error) {
        console.error("Error fetching active orders:", error);
        setHasActiveOrders(false);
      }
    };

    fetchActiveOrders();
  }, [currentUser]);

  if (!hasActiveOrders) return null;

  const handleCloseModal = () => {
    setIsModalVisible(false);
    localStorage.setItem("modalClosed", "true");
  };

  // Check if the modal should not be displayed based on current route
  if (pathname && excludedRoutes.includes(pathname)) return null;
  if (!currentUser || !isModalVisible) return null;

  return (
    <AnimatePresence>
      {isModalVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.5, transition: { duration: 0.3 } }}
            animate={{ opacity: 1, scale: 1, transition: { duration: 0.3 } }}
            exit={{ opacity: 0 }}
            className="bg-white p-6 rounded-lg shadow-lg text-center relative z-60 max-w-lg w-full mx-4"
          >
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 bg-gray-200 flex items-center justify-center rounded-full w-8 h-8 text-gray-500 hover:text-gray-600"
            >
              <X size={24} />
            </button>

            <div className="mb-4 mx-auto w-full flex items-center justify-center">
              <Image
                src="/main/active-orders.jpg"
                alt="Active Orders"
                width={300}
                height={300}
                className="rounded-full"
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
