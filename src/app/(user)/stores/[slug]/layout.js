import Wrapper from "@/components/user/Wrapper";
import StoreNavbar from "@/components/user/store/store-profile/StoreNavbar";

export default async function StoreLayout({ children }) {
  return (
    <Wrapper className={"w-full h-auto"}>
      <StoreNavbar />
      {children}
    </Wrapper>
  );
}
