import Footer from "@/components/user/global/Footer";
import StoreNavbar from "@/components/user/store/store-profile/StoreNavbar";
import axios from "axios";

export async function generateMetadata({ params }) {
  try {
    const slug = params.slug;
    const baseURL =
      process.env.ENVIRONMENT === "development"
        ? "http://localhost:4000"
        : "https://api.dokopi.com";
    const { data } = await axios.get(`${baseURL}/api/v1/user/stores/${slug}`);
    const store = data.data;

    if (store === null) {
      return {
        title: "Page Not Found",
        description: "The page you are looking for does not exist.",
      };
    }

    const storeImages = store?.storeImagesKeys?.map((image) => {
      return `https://d28fpa5kkce5uk.cloudfront.net/${image}`;
    });

    return {
      title: store.storeDetails.storeName,
      openGraph: {
        images: [...storeImages],
      },
    };
  } catch (error) {
    console.error(error);
    return {
      title: "Page Not Found",
      description: "The page you are looking for does not exist.",
    };
  }
}

export default async function StorePage({ params }) {
  const { slug } = params;
  return (
    <>
      <StoreNavbar slug={slug} />
      <Footer />
    </>
  );
}
