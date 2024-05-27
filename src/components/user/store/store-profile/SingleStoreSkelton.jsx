import React from "react";
import Wrapper from "../../global/Wrapper";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const SingleStoreSkelton = () => {
  return (
    <section className="w-full">
      <Tabs defaultValue="overview" className="w-full mt-2">
        <TabsList>
          <Skeleton className="h-2 w-[250px]" />
        </TabsList>

        <TabsContent value="overview">
          <Skeleton className="h-[calc(100vh-150px)] w-full rounded-xl" />
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default SingleStoreSkelton;
