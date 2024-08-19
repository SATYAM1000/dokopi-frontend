import React from "react";
import Script from "next/script";
import { structuredData } from "@/lib/constants";

export default function HeadContent() {
  return (
    <head>
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <link rel="dns-prefetch" href="https://maps.googleapis.com" />
      <link rel="dns-prefetch" href="https://api.dokopi.com" />
      <link rel="dns-prefetch" href="https://lh3.googleusercontent.com" />
      <link rel="dns-prefetch" href="https://d28fpa5kkce5uk.cloudfront.net" />
      <link
        rel="dns-prefetch"
        href="https://accounts.google.com/o/oauth2/v2/auth"
      />

      <link rel="preconnect" href="https://maps.googleapis.com" />
      <link rel="preconnect" href="https://api.dokopi.com" />
      <link rel="preconnect" href="https://lh3.googleusercontent.com" />
      <link rel="preconnect" href="https://d28fpa5kkce5uk.cloudfront.net" />
      <link
        rel="preconnect"
        href="https://accounts.google.com/o/oauth2/v2/auth"
      />

      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="google" content="notranslate" />
      <Script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </head>
  );
}
