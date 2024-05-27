"use client";
import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DoKopiStoreOverview from "./DoKopiStoreOverview";
import DoKopiFileUpload from "./DoKopiFileUpload";
import DoKopiStoreShop from "./DoKopiStoreShop";
import Wrapper from "../../global/Wrapper";
import { useQuery } from "@tanstack/react-query";
import ErrorComponent from "../../global/Error";
import axios from "axios";
import { API_DOMAIN } from "@/lib/constants";
import SingleStoreSkelton from "./SingleStoreSkelton";
const StoreNavbar = ({ token, slug, encryptionKey }) => {
  const [activeTab, setActiveTab] = useState("upload-files");

  useEffect(() => {
    const savedTab = localStorage.getItem("activeTab");
    if (savedTab) {
      setActiveTab(savedTab);
    }
  }, []);

  const handleTabChange = (value) => {
    setActiveTab(value);
    localStorage.setItem("activeTab", value);
  };

  const { error, data, isError, isLoading } = useQuery({
    queryKey: ["storeDetails"],
    queryFn: () =>
      axios.get(`${API_DOMAIN}/api/v1/user/stores/get-store-info/${slug}`),
  });

  if (isError) {
    return (
      <ErrorComponent
        errorMessage={error?.response?.data?.msg || error?.message}
      />
    );
  }

  return (
    <section className="w-full">
      <Wrapper>
        {isLoading ? (
          <SingleStoreSkelton />
        ) : (
          <Tabs
            defaultValue={activeTab}
            value={activeTab}
            className="w-full mt-4"
            onValueChange={handleTabChange}
          >
            <TabsList>
              <TabsTrigger value="overview">Store Overview</TabsTrigger>
              <TabsTrigger value="upload-files">Upload Files</TabsTrigger>
              <TabsTrigger value="shop">Shop</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <DoKopiStoreOverview storeDetails={data?.data?.data} />
            </TabsContent>
            <TabsContent value="upload-files">
              <DoKopiFileUpload token={token} encryptionKey={encryptionKey} />
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
