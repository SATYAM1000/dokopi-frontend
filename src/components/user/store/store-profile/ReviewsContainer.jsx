"use client";
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import ErrorComponent from "../../global/Error";
import Review from "./Review";
import Link from "next/link";

const tags = Array.from({ length: 50 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`
);

const ReviewsContainer = ({ storeReviews }) => {
  return (
    <ScrollArea className="h-[70vh] w-full rounded-md border">
      <div className="p-4 flex flex-col gap-3">
        {storeReviews.length > 0 &&
          storeReviews.map((OneReview) => (
            <Review OneReview={OneReview} key={OneReview._id} />
          ))}

        {storeReviews.length === 0 && (
          <div className="flex flex-col  h-full">
            <h1 className="font-medium">No reviews yet</h1>
            <Link
              href="/stores"
              className="text-indigo-500 mt-2 underline underline-offset-4"
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
