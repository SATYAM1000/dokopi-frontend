import React from "react";
import StoreInfo from "./StoreInfo";
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
import PricingTable from "./PricingTable";
import dynamic from "next/dynamic";

import StoreGallerySkelton from "./StoreGallerySkelton";
const StoreGallery = dynamic(() => import("./StoreGallery"), { ssr: false, loading: () => <StoreGallerySkelton /> });
const MapView = dynamic(() => import("./MapView"), { ssr: false, loading: () => <MapViewSkelton /> });

const DoKopiStoreOverview = ({
  storeDetails,
  prices,
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
      <StoreInfo storeData={storeDetails} storeReviews={storeReviews}/>
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
        <div className="flex flex-col gap-6 w-full md:w-4/6 ">
          {/* ----------pricing--------------- */}
          <div className="w-full">
            <div className="w-full mb-3">
              <h2 className="text-xl flex flex-col md:block font-medium">
                Store Pricing
              </h2>
              <p className="text-xs mt-2 text-gray-500 ">
                <span className="text-red-500 font-medium">Note:</span> Prices apply per page.
              </p>
            </div>
            <div className="w-full h-fit rounded-md">
              <PricingTable prices={prices} />
            </div>
          </div>
          {/* ----------Review--------------- */}

          <div className="w-full">
            <h2 className="text-xl mb-3 flex flex-col md:block font-medium">
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
      </div>
    </section>
  );
};

export default DoKopiStoreOverview;
