import Footer from "@/components/user/Footer";
import StoreNavbar from "@/components/user/store/store-profile/StoreNavbar";
import { useAccessToken } from "@/hooks/use-access-token";
export default async function StorePage({ params }) {
  const { slug } = params;
  const token = await useAccessToken();
  const encryptionKey = process.env.FILE_URL_ENCRYPTION_KEY;
  return (
    <>
      <StoreNavbar token={token} slug={slug} encryptionKey={encryptionKey} />
      <Footer/>

    </>
  );
}
