"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DoKopiStoreOverview from "./DoKopiStoreOverview";
import DoKopiFileUpload from "./DoKopiFileUpload";
import DoKopiStoreShop from "./DoKopiStoreShop";
import { redirect } from "next/navigation";
import Wrapper from "../../Wrapper";

const StoreNavbar = () => {
  const pathname = usePathname();
  const path = pathname.split("/")[3];

  const tabs = ["overview", "upload-files", "shop"];

  return (
    <section className="w-full">
      <Wrapper>
        <Tabs defaultValue="upload-files" className="w-full mt-2">
          <TabsList>
            <TabsTrigger
              value="overview"
              onClick={() => redirect("/store/overview")}
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="upload-files"
              onClick={() => redirect("/store/upload-files")}
            >
              Upload files
            </TabsTrigger>
            <TabsTrigger value="shop" onClick={() => redirect("/store/shop")}>
              Shop
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <DoKopiStoreOverview />
          </TabsContent>
          <TabsContent value="upload-files">
            <DoKopiFileUpload />
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
