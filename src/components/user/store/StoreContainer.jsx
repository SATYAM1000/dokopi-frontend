"use client";
import React from "react";
import Wrapper from "../Wrapper";
import SingleStoreCard from "./SingleStoreCard";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import StoreSkelton from "./StoreSkelton";
import ErrorComponent from "../Error";

const StoreContainer = () => {
  const { isLoading, error, data, isError, isFetching } = useQuery({
    queryKey: ["fetch-nearest-stores"],
    queryFn: () =>
      axios
        .get(
          `http://localhost:4000/api/v1/user/stores/nearest-stores?latitude=18.4&longitude=73.23&userZipCode=411041&limit=10&skip=0`
        )
        .then((res) => res.data)
        .catch((err) => console.log(err)),
    retry: false,
    refetchOnWindowFocus: false,
  });

  if (isError) {
    return <ErrorComponent errorMessage={error?.message} />;
  }

  return (
    <section className="w-full">
      <Wrapper className={"w-full"}>
        <section className="w-full">
          <div className="w-full min-h-screen flex flex-col gap-2 ">
            {isLoading ? (
              <StoreSkelton />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 my-2">
                {data?.data.map((store) => (
                  <SingleStoreCard storeData={store} />
                ))}
              </div>
            )}
          </div>
        </section>
      </Wrapper>
    </section>
  );
};

export default StoreContainer;
