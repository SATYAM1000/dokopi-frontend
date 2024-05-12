"use client";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DoKopiStoreOverview from "./DoKopiStoreOverview";
import DoKopiFileUpload from "./DoKopiFileUpload";
import DoKopiStoreShop from "./DoKopiStoreShop";
import Wrapper from "../../Wrapper";
import { useQuery } from "@tanstack/react-query";
import ErrorComponent from "../../Error";
import axios from "axios";
import { API_DOMAIN } from "@/lib/constants";
import SingleStoreSkelton from "./SingleStoreSkelton";
const StoreNavbar = ({ token, slug }) => {
  const {  error, data, isError, isLoading } = useQuery({
    queryKey: ["storeDetails"],
    queryFn: () =>
      axios.get(`${API_DOMAIN}/api/v1/user/stores/get-store-info/${slug}`),
  });

  if (isError) {
    return <ErrorComponent errorMessage={error?.response?.data?.msg || error?.message } />;
  }



  return (
    <section className="w-full">
      <Wrapper>
        {isLoading ? (
          <SingleStoreSkelton />
        ) : (
          <Tabs defaultValue="upload-files" className="w-full mt-2">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="upload-files">Upload files</TabsTrigger>
              <TabsTrigger value="shop">Shop</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <DoKopiStoreOverview storeDetails={data?.data?.data} />
            </TabsContent>
            <TabsContent value="upload-files">
              <DoKopiFileUpload token={token} />
            </TabsContent>
            <TabsContent value="shop">
              <DoKopiStoreShop />
            </TabsContent>
          </Tabs>
        )}
      </Wrapper>
    </section>
  );
};

export default StoreNavbar;
