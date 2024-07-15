import React from "react";
import dynamic from "next/dynamic";
const ActiveOrders = dynamic(() => import("@/components/user/avatar/ActiveOrders"));
export default async function ActiveOrdersPage() {
  return <ActiveOrders />;
}
