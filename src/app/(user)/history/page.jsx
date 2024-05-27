import DoKopiUserOrderHistory from "@/components/user/global/UserOrderHistory";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { useAccessToken } from "@/hooks/use-access-token";
export default async function HistoryPage() {
  const session = await auth();
  if (!session) {
    redirect("/auth/sign-in");
  }
  if (session?.user?.role !== "USER") {
    redirect("/stores");
  }

  const token=await useAccessToken();
  console.log("access token in history page ", token);

  return <DoKopiUserOrderHistory />;
}
