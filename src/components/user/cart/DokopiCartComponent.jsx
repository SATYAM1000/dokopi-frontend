"use client";

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { redirect } from "next/navigation";
import { useCurrentUser } from "@/hooks/use-current-user";
import CancellationPolicy from "./CancellationPolicy";
import PaymentButton from "./PaymentButton";
import BillDetails from "./BillDetails";
import { calculateTotalPrice } from "@/lib/price-calculator";
import ErrorComponent from "../global/Error";
import CartFileDetails from "./CartFileDetails";
import axios from "axios";
import { API_DOMAIN } from "@/lib/constants";
import { toast } from "sonner";
import {
  deleteCartItem,
  updateCartItem,
} from "@/providers/redux/slices/new-cart-slice";

const DokopiCartComponent = ({ setIsCartOpen, xeroxStorePricing }) => {
  const currentUser = useCurrentUser();
  if (!currentUser) redirect("/auth/sign-in");

  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const [storePricing, setStorePricing] = useState(xeroxStorePricing);

  const [totalPriceForThisOrder, setTotalPriceForThisOrder] = React.useState(0);
  const [platformFeeForThisOrder, setPlatformFeeForThisOrder] =
    React.useState(0);

  const fetchXeroxStorePricing = async () => {
    try {
      const res = await axios.get(
        `${API_DOMAIN}/api/v1/store/pricing/get/${localStorage.getItem(
          "storeId"
        )}`
      );
      if (res.data.success) {
        setStorePricing(res.data.data.priceList);
        const price = calculateTotalPrice(cartItems, res.data.data.priceList);
        setTotalPriceForThisOrder(price.totalCharge);
        setPlatformFeeForThisOrder(price.platformCharge);
      }
    } catch (error) {
      console.log("Error fetching store pricing:", error);
    }
  };

  useEffect(() => {
    if (storePricing) {
      const price = calculateTotalPrice(cartItems, storePricing);
      setTotalPriceForThisOrder(price.totalCharge);
      setPlatformFeeForThisOrder(price.platformCharge);
    } else {
      fetchXeroxStorePricing();
    }
  }, [cartItems, storePricing]);

  const handleDeleteItem = async (fileId) => {
    console.log("file id is ", fileId);
    try {
      await dispatch(
        deleteCartItem({ userId: currentUser.id, fileId })
      ).unwrap();
      toast.success("Item deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete item");
      console.error("Failed to delete item:", error);
    }
  };

  const handleUpdateItem = async (fileId) => {
    const updatedItem = {
      fileId,
      fileKey: "key123-updated",
      fileName: "file123-updated.pdf",
      fileSize: "3MB",
      fileExtension: "pdf",
      pageCount: 12,
    };
    try {
      await dispatch(
        updateCartItem({ userId, fileId, updatedCartItem: updatedItem })
      ).unwrap();
      toast.success("Item updated successfully!");
    } catch (error) {
      toast.error("Failed to update item");
      console.error("Failed to update item:", error);
    }
  };

  const handleClearCart = async () => {
    try {
      await dispatch(clearCart(userId)).unwrap();
      toast.success("Cart cleared successfully!");
    } catch (error) {
      toast.error("Failed to clear cart");
      console.error("Failed to clear cart:", error);
    }
  };

  return (
    <div className="w-[100%] relative flex flex-col items-center justify-center">
      {cartItems.length > 0 ? (
        <div className="mt-6 space-y-6 w-[100%]  max-h-[67vh] overflow-hidden rounded-md  overflow-y-scroll relative hide-scrollbar flex flex-col mb-6 gap-2">
          <ul className="space-y-4  rounded-md flex flex-col gap-4    ">
            {cartItems.map((product) => (
              <CartFileDetails
                key={product.id}
                handleDeleteItem={handleDeleteItem}
                product={product}
              />
            ))}
          </ul>
          {totalPriceForThisOrder > 0 && (
            <BillDetails
              totalPrice={totalPriceForThisOrder}
              platformFee={platformFeeForThisOrder}
            />
          )}
          <CancellationPolicy />
          {totalPriceForThisOrder > 0 && (
            <PaymentButton
              setIsCartOpen={setIsCartOpen}
              totalPrice={totalPriceForThisOrder}
              platformFee={platformFeeForThisOrder}
            />
          )}
        </div>
      ) : (
        <div className="mt-6 space-y-6">
          <ErrorComponent errorMessage={"No documents in your cart."} />
        </div>
      )}
    </div>
  );
};

export default DokopiCartComponent;
