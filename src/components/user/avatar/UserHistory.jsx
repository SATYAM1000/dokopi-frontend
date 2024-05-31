"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

import Wrapper from "../global/Wrapper";

import { Badge } from "@/components/ui/badge";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import ErrorComponent from "../global/Error";
import { API_DOMAIN } from "@/lib/constants";
import { fetchAccessToken } from "@/actions/access-token";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { ClipLoader } from "react-spinners";
import { Button } from "@/components/ui/button";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import OrderDetailsComponent from "../order-details/OrderDetailsComponent";

const UserHistory = () => {
  const [orderHistory, setOrderHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const getUserOrderHistory = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `${API_DOMAIN}/api/v1/user/orders/history?page=${currentPage}&limit=10`,
          {
            headers: {
              Authorization: `Bearer ${await fetchAccessToken()}`,
            },
          }
        );
        if (data.totalOrders === 0) {
          setLoading(false);
          return;
        }

        setOrderHistory(data?.data);
        setTotalPages(data?.totalPages);
      } catch (error) {
        console.log("error is ", error);
      } finally {
        setLoading(false);
      }
    };

    getUserOrderHistory();
  }, [currentPage]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  return (
    <section className="min-h-[50vh] w-full ">
      <Wrapper className={"w-full h-full "}>
        {loading ? (
          <div className="w-full h-[calc(100vh-350px)] flex items-center justify-center">
            <ClipLoader color="#000000" loading={loading} size={50} />
          </div>
        ) : orderHistory?.length > 0 ? (
          <div className="w-full h-auto flex flex-col gap-6 mt-4">
            <div className="w-full flex items-center py-2 border-b border-black/[0.2]">
              <h1 className=" text-[18px] md:text-[20px] font-medium text-black">
                Order History
              </h1>
            </div>
            {/* ----container---------- */}
            <div className="w-full max-h-[100vh] min-h-[calc(100vh-250px)] overflow-hidden">
              <Table className="w-full max-h-[55vh] overflow-y-scroll hide-scrollbar  rounded-md ">
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[200px]">Order No.</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="w-[130px]">Pay. Status</TableHead>

                    <TableHead className="w-[200px]">Transaction ID</TableHead>
                    <TableHead className="w-[150px]">Files Count</TableHead>
                    <TableHead className="">Amount</TableHead>
                    <TableHead className="text-right">&nbsp;</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="font-medium">
                  {orderHistory?.map((order) => (
                    <TableRow>
                      <TableCell className="w-[100px]">
                        {order?.orderNumber || "N/A"}
                      </TableCell>
                      <TableCell>
                        {new Date(order?.createdAt).toLocaleDateString() ||
                          "N/A"}
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={
                            order?.paymentStatus === "paid"
                              ? "bg-green-500 hover:bg-green-600"
                              : "bg-red-500 hover:bg-red-600"
                          }
                        >
                          {order?.paymentStatus || "N/A"}
                        </Badge>
                      </TableCell>

                      <TableCell className="w-[100px]">
                        {order?.razorpayPaymentId || "N/A"}
                      </TableCell>
                      <TableCell>{order?.cartItems.length}</TableCell>

                      <TableCell className="text-right">
                        ₹&nbsp;{order?.totalPrice || "N/A"}
                      </TableCell>
                      <TableCell className="text-right">
                        <Sheet>
                          <SheetTrigger asChild>
                            <Button
                              variant="link"
                              size="sm"
                              className="w-[100px] text-blue-600 "
                            >
                              View Details
                            </Button>
                          </SheetTrigger>
                          <SheetContent>
                            <SheetHeader>
                              <SheetTitle>
                                Order Summary&nbsp;&nbsp;&nbsp;
                                {order?.orderNumber || "N/A"}
                              </SheetTitle>
                              <SheetDescription>
                                View your order details here.
                              </SheetDescription>
                            </SheetHeader>
                            <OrderDetailsComponent id={order?._id} />
                          </SheetContent>
                        </Sheet>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            {totalPages > 1 && (
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={handlePrevPage}
                      className={`${
                        currentPage === 1
                          ? "cursor-not-allowed"
                          : "cursor-pointer"
                      }`}
                    />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink onClick={() => setCurrentPage(1)}>
                      1
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext
                      onClick={handleNextPage}
                      className={`${
                        currentPage === totalPages
                          ? "cursor-not-allowed"
                          : "cursor-pointer"
                      }`}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </div>
        ) : (
          <ErrorComponent errorMessage={"No order history found"} />
        )}
      </Wrapper>
    </section>
  );
};

export default UserHistory;
