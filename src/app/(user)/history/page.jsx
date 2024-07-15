import dynamic from "next/dynamic";
const UserHistory = dynamic(() => import("@/components/user/avatar/UserHistory"));
export default async function HistoryPage() {
  return <UserHistory />;
}
