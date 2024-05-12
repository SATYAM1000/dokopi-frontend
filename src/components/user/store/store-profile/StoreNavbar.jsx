"use client";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DoKopiStoreOverview from "./DoKopiStoreOverview";
import DoKopiFileUpload from "./DoKopiFileUpload";
import DoKopiStoreShop from "./DoKopiStoreShop";
import Wrapper from "../../Wrapper";

const StoreNavbar = ({token}) => {
  return (
    <section className="w-full">
      <Wrapper>
        <Tabs defaultValue="upload-files" className="w-full mt-2">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="upload-files">Upload files</TabsTrigger>
            <TabsTrigger value="shop">Shop</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <DoKopiStoreOverview />
          </TabsContent>
          <TabsContent value="upload-files">
            <DoKopiFileUpload token={token} />
          </TabsContent>
          <TabsContent value="shop">
            <DoKopiStoreShop />
          </TabsContent>
        </Tabs>
      </Wrapper>
    </section>
  );
};

export default StoreNavbar;
