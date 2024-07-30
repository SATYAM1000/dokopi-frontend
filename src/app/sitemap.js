import { fetchAllStoresId } from "@/actions/get-all-stores";

export default async function sitemap() {
  const baseURL = "https://dokopi.com";
  const stores = await fetchAllStoresId();
  const allStores = stores?.map((store) => {
    return {
      url: `${baseURL}/stores/${store?._id}`,
      lastModified: `${store?.updatedAt}`,
      changeFrequency: "weekly",
      priority: 0.5,
    };
  });
  return [
    {
      url: "https://dokopi.com",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: "https://dokopi.com/stores",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
    },
    {
      url: "https://dokopi.com/about",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://dokopi.com/terms-conditions",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://dokopi.com/privacy-policy",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://dokopi.com/refund-shipping-policy",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://dokopi.com/contact",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...allStores,
  ];
}
