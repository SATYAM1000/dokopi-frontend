export const API_DOMAIN = process.env.API_URL;

export const Day = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
export const KnownMonth = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const initialFileInfo = {
  fileId: null,
  fileKey: null,
  fileName: null,
  fileSize: null,
  fileExtension: null,
  pageCount: null,
  iconPath: null,
  copiesCount: 1,
  printType: "black_and_white",
  printSides: "single_sided",
  paperSize: "A4",
  xeroxStoreMessage: "",
  colorPages: [],
  mixedPrintType: null,
};

export const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Dokopi",
  url: "https://www.dokopi.com",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://www.dokopi.com/search?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
  mainEntity: [
    {
      "@type": "SiteNavigationElement",
      name: "Login",
      url: "https://www.dokopi.com/auth/sign-in",
    },
    {
      "@type": "SiteNavigationElement",
      name: "Stores",
      url: "https://www.dokopi.com/stores",
    },

    {
      "@type": "SiteNavigationElement",
      name: "Terms & Conditions",
      url: "https://www.dokopi.com/terms-conditions",
    },
    {
      "@type": "SiteNavigationElement",
      name: "Privacy Policy",
      url: "https://www.dokopi.com/privacy-policy",
    },
    {
      "@type": "SiteNavigationElement",
      name: "Contact Us",
      url: "https://www.dokopi.com/contact",
    },
    {
      "@type": "SiteNavigationElement",
      name: "Refund Policy",
      url: "https://www.dokopi.com/refund-shipping-policy",
    },
  ],
};
