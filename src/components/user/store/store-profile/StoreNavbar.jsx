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
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    const savedTab = localStorage.getItem("activeTab");
    if (savedTab) {
      setActiveTab(savedTab);
    }

    if (slug) {
      if (localStorage.getItem("storeId") !== slug) {
        localStorage.removeItem("storeId");
        localStorage.setItem("storeId", slug);
      } else {
        localStorage.setItem("storeId", slug);
      }
    }
  }, [slug]);

  const handleTabChange = (value) => {
    setActiveTab(value);
    localStorage.setItem("activeTab", value);
  };

  const { error, data, isError, isLoading } = useQuery({
    queryKey: ["storeDetails", pageNumber, slug],
    queryFn: () =>
      axios.get(
        `${API_DOMAIN}/api/v1/user/stores/get-store-info/${slug}?pageNumber=${pageNumber}`
      ),
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
        {isLoading  ? (
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
              <DoKopiStoreOverview
                storeDetails={data?.data?.data}
                paginationDetails={data?.data?.pagination}
                pageNumber={pageNumber}
                setPageNumber={setPageNumber}
              />
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
