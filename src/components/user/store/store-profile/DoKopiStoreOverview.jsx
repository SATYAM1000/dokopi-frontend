"use client";
import React from "react";
import StoreGallery from "./StoreGallery";
import StoreInfo from "./StoreInfo";
import MapView from "./MapView";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import MapViewSkelton from "./MapViewSkelton";
import ReviewsContainer from "./ReviewsContainer";

const DoKopiStoreOverview = ({
  storeDetails,
  paginationDetails,
  pageNumber,
  setPageNumber,
}) => {
  const { storeReviews } = storeDetails;
  const [hasMoreReviews, setHasMoreReviews] = React.useState(
    paginationDetails?.hasMoreReviews || false
  );
  return (
    <section className="w-full mt-6 min-h-screen flex flex-col gap-5">
      <StoreGallery storeData={storeDetails} />
      <StoreInfo storeData={storeDetails} />
      <div className="flex flex-col md:flex-row md:justify-between gap-6 md:gap-12">
        <div className="w-full md:w-2/6">
          {!storeDetails ? (
            <>
              <MapViewSkelton />
            </>
          ) : (
            <MapView storeData={storeDetails} />
          )}
        </div>
        <div className="flex flex-col gap-2 w-full md:w-4/6 ">
          <h2 className="text-xl flex flex-col md:block font-medium">
            Reviews
          </h2>
        
          <ReviewsContainer storeReviews={storeReviews} />

          {storeReviews.length > 4 && (
            <Pagination className={"my-6"}>
              <PaginationContent>
                <PaginationItem>
                  {pageNumber > 1 && (
                    <PaginationPrevious
                      className={"cursor-pointer"}
                      onClick={() => setPageNumber(pageNumber - 1)}
                    />
                  )}
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink onClick={() => setPageNumber(1)}>
                    1
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  {4 * pageNumber < paginationDetails?.totalReviewsCount && (
                    <PaginationNext
                      className={"cursor-pointer"}
                      disabled={!paginationDetails?.hasMoreReviews}
                      onClick={() => setPageNumber(pageNumber + 1)}
                    />
                  )}
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </div>
      </div>
    </section>
  );
};

export default DoKopiStoreOverview;
