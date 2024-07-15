import dynamic from "next/dynamic";
import { useAccessToken } from "@/hooks/use-access-token";

const Footer = dynamic(() => import("@/components/user/global/Footer"));
const StoreNavbar = dynamic(() =>
  import("@/components/user/store/store-profile/StoreNavbar")
);

export default async function StorePage({ params }) {
  const { slug } = params;
  const token = await useAccessToken();
  const encryptionKey = process.env.FILE_URL_ENCRYPTION_KEY;
  return (
    <>
      <StoreNavbar token={token} slug={slug} encryptionKey={encryptionKey} />
      <Footer />
    </>
  );
}
