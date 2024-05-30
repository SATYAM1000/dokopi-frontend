"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

import Wrapper from "../global/Wrapper";

import { Badge } from "@/components/ui/badge";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import ErrorComponent from "../global/Error";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const orderHistory = [
  {
    id: 1,
    orderDate: "2022-01-01",
    date: "2022-01-01",
    status: "pending",
    total: 1000,
    status: "pending",
    date: "2022-01-01",
  },
];
const UserHistory = () => {
  //   const [orderHistory, setOrderHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  //   useEffect(() => {
  //     const getUserOrderHistory = async () => {
  //       setLoading(true);
  //       try {
  //         const response = await axios.get(
  //           `http://localhost:4002/api/v1/order/history/${currentUser.id}?page=${currentPage}&limit=5`
  //         );
  //         if (response.data.data.ordersCount === 0) {
  //           setLoading(false);
  //           return;
  //         }
  //         setLoading(false);
  //         setOrderHistory(response.data.data.orders);
  //         setTotalPages(response.data.data.totalPages);
  //       } catch (error) {
  //         setLoading(false);
  //         console.log("error is ", error);
  //       }
  //     };

  //     getUserOrderHistory();
  //   }, [ currentPage]);

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
    <section className="min-h-[60vh] w-full ">
      <Wrapper className={"w-full h-full "}>
        {loading ? (
          <h1>loading...</h1>
        ) : orderHistory?.length > 0 ? (
          <div className="w-full h-auto flex flex-col gap-6 mt-4">
            <div className="w-full flex items-center py-2 border-b border-black/[0.2]">
              <h1 className=" text-[18px] md:text-[20px] font-medium text-black">
                Order History
              </h1>
            </div>
            {/* ----container---------- */}
            <div className="w-full max-h-[100vh] min-h-[calc(100vh-250px)] overflow-hidden">
              <Table className="w-full max-h-[60vh] overflow-y-scroll  rounded-md ">
                <TableCaption>A list of your recent orders.</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Order ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>

                    <TableHead className="w-[150px]">Transaction ID</TableHead>
                    <TableHead className="w-[150px]">Documents Count</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="font-medium">
                  {orderHistory?.map((order) => (
                    <TableRow>
                      <TableCell className="w-[100px]">
                        {new Date(order?.orderDate).toLocaleDateString() ||
                          "N/A"}
                      </TableCell>
                      <TableCell>
                        {order?.paymentTime ? order?.paymentTime : "N/A"}
                      </TableCell>
                      <TableCell>
                        {/* {order?.orderStatus === "completed" ? (
                          <Badge className={"bg-green-500"}>Completed</Badge>
                        ) : (
                          <Badge className={"bg-red-500"}>Pending</Badge>
                        )} */}
                      </TableCell>

                      <TableCell className="w-[100px]"></TableCell>
                      <TableCell className="text-center"></TableCell>

                      <TableCell className="text-right">₹ 300</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
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
          </div>
        ) : (
          <ErrorComponent errorMessage={"No order history found"} />
        )}
      </Wrapper>
    </section>
  );
};

export default UserHistory;
