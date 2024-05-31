"use client";
import React, { useEffect } from "react";
import axios from "axios";
import { API_DOMAIN } from "@/lib/constants";
import { fetchAccessToken } from "@/actions/access-token";
import PaymentDetails from "./PaymentDetails";
import StoreDetails from "./StoreDetails";
import DownloadButton from "./DownloadButton";
import OrderStatus from "./OrderStatus";
import FileDetails from "./FileDetails";
import { ClipLoader } from "react-spinners";

const OrderDetailsComponent = ({ id }) => {
  const [orderDetails, setOrderDetails] = React.useState({});
  const [loading, setLoading] = React.useState(true);
  const fetchOrderDetails = async () => {
    try {
      setLoading(true);
      const {
        data: { data },
      } = await axios.get(`${API_DOMAIN}/api/v1/user/orders/${id}`, {
        headers: {
          Authorization: `Bearer ${await fetchAccessToken()}`,
        },
      });

      setOrderDetails(data);
    } catch (error) {
      console.log("error while fetching order details ", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchOrderDetails();
  }, []);

  return (
    <>
      {loading ? (
        <div className="w-[100%] h-[20vh] flex items-center justify-center">
          <ClipLoader color="#000" loading={loading} size={30} />
        </div>
      ) : (
        <div className="w-[100%] relative flex flex-col items-center justify-center">
          <OrderStatus OrderStatus={orderDetails?.orderStatus} />
          {orderDetails?.cartItems?.length > 0 ? (
            <div className="mt-6 space-y-6 w-[100%]  max-h-[67vh] overflow-hidden rounded-md  overflow-y-scroll relative hide-scrollbar flex flex-col mb-6 gap-2">
              <ul className="space-y-4 bg-gray-100 rounded-md    ">
                {orderDetails?.cartItems.map((product, index) => (
                  <li
                    key={index}
                    className="flex p-2 rounded-md items-center gap-4 pb-4 min-w-full border-b border-gray-300"
                  >
                    <FileDetails fileInfo={product} index={index} />
                  </li>
                ))}
              </ul>
              <StoreDetails
                storeDetails={orderDetails?.storeId?.storeDetails}
              />
              <PaymentDetails PaymentDetails={orderDetails} />
              <DownloadButton />
            </div>
          ) : (
            <div className="mt-6 space-y-6">
              <p className="text-center text-gray-600">
                No details available for this order
              </p>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default OrderDetailsComponent;
