"use client";
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

import Review from "./Review";
import Link from "next/link";

const ReviewsContainer = ({ storeReviews }) => {
  return (
    <ScrollArea className="h-auto w-full rounded-md ">
      <div className="flex flex-col gap-3">
        {storeReviews.length > 0 &&
          storeReviews.map((OneReview) => (
            <Review OneReview={OneReview} key={OneReview._id} />
          ))}

        {storeReviews.length === 0 && (
          <div className="flex flex-col  h-full">
            <div className="text-sm text-gray-500 font-medium">
              No reviews yet
            </div>
            <Link
              href="/stores"
              className="text-indigo-500 mt-2 text-sm font-medium underline underline-offset-4"
            >
              Be the first to review this store
            </Link>
          </div>
        )}
      </div>
    </ScrollArea>
  );
};

export default ReviewsContainer;
