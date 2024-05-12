import StoreNavbar from "@/components/user/store/store-profile/StoreNavbar";
import { useAccessToken } from "@/hooks/use-access-token";
export default async function StorePage({ params }) {
  const { slug } = params;
  const token=await useAccessToken();
  return <StoreNavbar token={token} slug={slug} />;
}





