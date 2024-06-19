"use client";
import React, { useState, useEffect } from "react";
import Wrapper from "../global/Wrapper";
import SingleStoreCard from "./SingleStoreCard";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import StoreSkelton from "./StoreSkelton";
import ErrorComponent from "../global/Error";
import { API_DOMAIN } from "@/lib/constants";

const StoreContainer = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [allStores, setAllStores] = useState([]);
  const [firstTime, setFirstTime] = useState(true);
  const [address, setAddress] = useState(null);

  // Retrieve coordinates from localStorage and set state
  useEffect(() => {
    const coordinates = JSON.parse(localStorage.getItem("coordinates"));
    if (coordinates) {
      setAddress(coordinates);
    }
  }, []);

  // Construct the API URL dynamically
  const getNearestStoresUrl = (page) => {
    if (!address) return null;
    const { latitude, longitude } = address;
    const userZipCode = '411041'; // Replace with dynamic value if available
    const limit = 6;
    const skip = (page - 1) * limit;
    return `${API_DOMAIN}/api/v1/user/stores/nearest-stores?latitude=${latitude}&longitude=${longitude}&userZipCode=${userZipCode}&limit=${limit}&skip=${skip}`;
  };

  const { isLoading, error, data, isError, isFetching } = useQuery({
    queryKey: ["fetch-nearest-stores", currentPage, address],
    queryFn: ({ queryKey }) => {
      const [, , addr] = queryKey;
      const url = getNearestStoresUrl(currentPage);
      if (!url) return Promise.reject(new Error("Coordinates not available"));
      return axios.get(url).then((res) => res.data);
    },
    enabled: !!address,
    retry: false,
    refetchOnWindowFocus: false,
    getNextPageParam: (lastPage, pages) => {
      if (lastPage?.data?.pagination?.hasMore) {
        return lastPage?.data?.pagination?.currentPage + 1;
      }
      return undefined;
    },
  });

  const handleLoadMore = () => {
    if (firstTime) {
      setFirstTime(false);
    }
    if (data?.data?.pagination?.hasMore) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    if (data && data.data && data.data.stores) {
      setAllStores((prevStores) => [...prevStores, ...data.data.stores]);
    }
  }, [data]);

  if (isError) {
    return <ErrorComponent errorMessage={error?.message} />;
  }

  return (
    <section className="w-full">
      <Wrapper className={"w-full"}>
        <section className="w-full">
          <h1 className="mt-2 md:mt-0 text-[20px] md:text-2xl font-semibold">
            Nearest Stores
          </h1>
          {/* ------------stores container---------- */}
          <div className="w-full min-h-screen flex flex-col gap-2 mt-2 ">
            {isLoading && firstTime ? (
              <StoreSkelton />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 my-2">
                {allStores.map((store, index) => (
                  <SingleStoreCard key={index} storeData={store} location={address} />
                ))}
              </div>
            )}

            {isFetching && !firstTime && (
              <div className="text-center text-gray-600 mt-2">
                Loading more...
              </div>
            )}
            {data?.data?.pagination?.hasMore && (
              <button
                onClick={handleLoadMore}
                disabled={isFetching}
                className="text-center text-gray-600 mt-2"
              >
                {isFetching && !firstTime ? "Loading..." : "Load More"}
              </button>
            )}
          </div>
        </section>
      </Wrapper>
    </section>
  );
};

export default StoreContainer;
