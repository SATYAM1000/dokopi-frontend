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
  const [address, setAddress] = useState();

  // Fetch stores data using react-query
  const { isLoading, error, data, isError, isFetching } = useQuery({
    queryKey: ["fetch-nearest-stores", currentPage],
    queryFn: ({ pageParam = currentPage }) =>
      axios
        .get(
          `${API_DOMAIN}/api/v1/user/stores/nearest-stores?latitude=18.46872&longitude=73.836035&userZipCode=411041&limit=6&skip=${
            (pageParam - 1) * 6
          }`
        )
        .then((res) => res.data),
    retry: false,
    refetchOnWindowFocus: false,
    keepPreviousData: true,
    getNextPageParam: (lastPage, pages) => {
      if (lastPage?.data?.pagination?.hasMore) {
        return lastPage?.data?.pagination?.currentPage + 1;
      }
      return undefined;
    },
  });

  // Reset allStores state when the component is first mounted
  useEffect(() => {
    setAllStores([]);
  }, []);

  // Update stores data when new data is fetched
  useEffect(() => {
    if (data && data.data && data.data.stores) {
      setAddress(JSON.parse(localStorage.getItem("coordinates")));
      setAllStores((prevStores) => {
        const newStores = data.data.stores.filter(
          (newStore) => !prevStores.some((store) => store.id === newStore.id)
        );
        return [...prevStores, ...newStores];
      });
    }
  }, [data]);

  const handleLoadMore = () => {
    if (firstTime) {
      setFirstTime(false);
    }
    if (data?.data?.pagination?.hasMore) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

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
          <div className="flex flex-col w-full min-h-screen gap-2 mt-2 ">
            {isLoading && firstTime ? (
              <StoreSkelton />
            ) : (
              <div className="grid grid-cols-1 gap-8 my-2 md:grid-cols-2 lg:grid-cols-3">
                {allStores.map((store, index) => (
                  <SingleStoreCard key={index} storeData={store} location={address} />
                ))}
              </div>
            )}

            {isFetching && !firstTime && (
              <div className="mt-2 text-center text-gray-600">
                Loading more...
              </div>
            )}
            {data?.data?.pagination?.hasMore && (
              <button
                onClick={handleLoadMore}
                disabled={isFetching}
                className="mt-2 text-center text-gray-600"
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
