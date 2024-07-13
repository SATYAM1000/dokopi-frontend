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
import { ClipLoader } from "react-spinners";
import XeroxStoreFileUploadOption from "../../print-config/XeroxStoreFileUploadOption";

const NavbarMenuList = [
  {
    index: 1,
    title: "Overview",
    value: "overview",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#202127"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-panels-top-left"
      >
        <rect width="18" height="18" x="3" y="3" rx="2" />
        <path d="M3 9h18" />
        <path d="M9 21V9" />
      </svg>
    ),
  },
  {
    index: 2,
    title: "Upload Files",
    value: "upload-files",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#020817"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-upload"
      >
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="17 8 12 3 7 8" />
        <line x1="12" x2="12" y1="3" y2="15" />
      </svg>
    ),
  },

  {
    index: 3,
    title: "Shop",
    value: "shop",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#202127"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-shopping-bag"
      >
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
        <path d="M3 6h18" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
    ),
  },
];

const StoreNavbar = ({ slug }) => {
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
        {isLoading ? (
          <div className="w-full h-[calc(100vh-120px)] flex items-center justify-center">
            <ClipLoader color="blue" size={40} />
          </div>
        ) : (
          <Tabs
            defaultValue={activeTab}
            value={activeTab}
            className="w-full mt-4"
            onValueChange={handleTabChange}
          >
            <TabsList>
              {NavbarMenuList.map((item) => {
                return (
                  <TabsTrigger key={item.index} value={item.value}>
                    <div className="flex items-center gap-1.5">
                      <span>{item.icon}</span>
                      <h3>{item.title}</h3>
                    </div>
                  </TabsTrigger>
                );
              })}
            </TabsList>
            <TabsContent value="overview">
              {isLoading ? (
                <></>
              ) : (
                <DoKopiStoreOverview
                  storeDetails={data?.data?.data}
                  paginationDetails={data?.data?.pagination}
                  pageNumber={pageNumber}
                  setPageNumber={setPageNumber}
                />
              )}
            </TabsContent>
            <TabsContent value="upload-files">
              <XeroxStoreFileUploadOption />
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
