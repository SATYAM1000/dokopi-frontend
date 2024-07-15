
import React from "react";
import dynamic from "next/dynamic";
const Footer=dynamic(()=>import("@/components/user/global/Footer"))
const PrivacyPolicy=dynamic(()=>import("@/components/user/global/PrivacyPolicy"))

export default async function PrivacyPolicyPage() {
  return (
    <>
      <PrivacyPolicy />
      <Footer />
    </>
  );
}
