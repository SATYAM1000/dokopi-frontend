"use client";
import React from "react";
import Wrapper from "../Wrapper";
import SingleStoreCard from "./SingleStoreCard";

const StoreContainer = () => {
  return (
    <section className="w-full">
      <Wrapper className={"w-full"}>
        <section className="w-full">
          <div className="w-full min-h-screen flex flex-col gap-2 ">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-4">
              <SingleStoreCard />
              <SingleStoreCard />
              <SingleStoreCard />
              <SingleStoreCard />
              <SingleStoreCard />
              <SingleStoreCard />
            </div>
          </div>
        </section>
      </Wrapper>
    </section>
  );
};

export default StoreContainer;
