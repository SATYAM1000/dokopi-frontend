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
import { useCurrentUser } from "@/hooks/use-current-user";
import { Check, Clock1, Copy, Loader, X } from "lucide-react";
import { toast } from "sonner";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import OrderDetailsComponent from "../order-details/OrderDetailsComponent";
const columnsHeader = [
  {
    index: 1,
    columnName: "Order ID",
  },
  {
    index: 2,
    columnName: "Order Status",
  },

  {
    index: 3,
    columnName: "Date",
  },

  {
    index: 4,
    columnName: "Payment Id",
  },

  {
    index: 5,
    columnName: "Payment Status",
  },

  {
    index: 6,
    columnName: "Files Sent",
  },

  {
    index: 7,
    columnName: "Amount",
  },

  {
    index: 8,
    columnName: "View Details",
  },
];

const UserHistory = () => {
  const currentUser = useCurrentUser();
  const [orderHistory, setOrderHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const getUserOrderHistory = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `${API_DOMAIN}/api/v1/user/orders/history?page=${currentPage}&limit=8`,
          {
            headers: {
              Authorization: `Bearer ${await fetchAccessToken()}`,
            },
          }
        );

        console.log("data in user history is  ", data);
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

    if (currentUser) {
      getUserOrderHistory();
    } else {
      return null;
    }
  }, [currentPage]);

  const copyToClipboard = (text) => {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text);
      toast.success("Copied successfully!", {
        duration: 1000,
      });
      return;
    } else {
      toast.error("Failed to copy text!", {
        duration: 1000,
      });
    }
  };

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
            <ClipLoader color="blue" loading={loading} size={40} />
          </div>
        ) : orderHistory?.length > 0 ? (
          <div className="w-full h-auto flex flex-col gap-1 mt-4">
            {/* ----container---------- */}
            <div className="w-full max-h-[100vh] min-h-[calc(100vh-250px)] overflow-hidden">
              <Table className="w-full max-h-[55vh] overflow-y-scroll hide-scrollbar  rounded-md ">
                <TableHeader>
                  <TableRow>
                    {columnsHeader.map((column) => (
                      <TableHead
                        className=" whitespace-nowrap text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        key={column.index}
                      >
                        {column.columnName}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody className="font-medium text-gray-700 text-sm">
                  {orderHistory?.map((order) => (
                    <TableRow>
                      <TableCell className="w-[100px]">
                        {order?.orderNumber || "N/A"}
                      </TableCell>
                      <TableCell className="capitalize">
                        {order?.orderStatus === "delivered" && (
                          <Badge
                            className={
                              "bg-green-100 text-green-500 border-green-500 hover:bg-green-200"
                            }
                          >
                            <span>
                              <Check
                                size={12}
                                className="mr-1 text-green-500"
                              />
                            </span>
                            Printed
                          </Badge>
                        )}

                        {order?.orderStatus === "rejected" && (
                          <Badge
                            className={
                              "bg-red-100 w-fit text-red-500 border-red-500 hover:bg-red-200"
                            }
                          >
                            <span>
                              <X size={12} className="mr-1 text-red-500" />
                            </span>
                            Rejected
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="whitespace-nowrap">
                        {order?.createdAt ? formatDate(order.createdAt) : "N/A"}
                      </TableCell>

                      <TableCell className="w-fit flex items-center ">
                        {order?.phonePeTransactionId || "N/A"}

                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <span
                                onClick={() =>
                                  copyToClipboard(order?.phonePeTransactionId)
                                }
                                className="bg-gray-100 px-1 py-1 border border-gray-300 rounded-sm flex items-center justify-center ml-3 cursor-pointer"
                              >
                                <Copy size={14} className=" text-gray-500" />
                              </span>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="text-xs ">Copy</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={
                            order?.paymentStatus === "success"
                              ? "bg-green-100 text-green-500 border  border-green-500 capitalize hover:bg-green-200 cursor-default  "
                              : "bg-red-100 text-red-500 capitalize border border-red-500 hover:bg-red-600  "
                          }
                        >
                          {order?.paymentStatus || "N/A"}
                        </Badge>
                      </TableCell>
                      <TableCell>{order?.cartItems.length}</TableCell>

                      <TableCell>₹&nbsp;{order?.totalPrice || "N/A"}</TableCell>
                      <TableCell>
                        <Sheet>
                          <SheetTrigger asChild>
                            <Button
                              variant="link"
                              size="sm"
                              className="w-[100px] text-indigo-600 "
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
              <Pagination className={"my-2"}>
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

function formatDate(createdAt) {
  const date = new Date(createdAt);
  const now = new Date();

  const diffTime = Math.abs(now - date);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  const timeOptions = { hour: "2-digit", minute: "2-digit" };
  const formattedTime = date.toLocaleTimeString([], timeOptions);

  if (diffDays === 0) {
    return `Today at ${formattedTime}`;
  } else if (diffDays === 1) {
    return `Yesterday at ${formattedTime}`;
  } else if (diffDays <= 2) {
    return `${diffDays} days ago at ${formattedTime}`;
  } else {
    return date.toLocaleDateString();
  }
}
