import Wrapper from "@/components/user/Wrapper";
import SearchMobileComponent from "@/components/user/store/SearchMobileComponent";
import StoreContainer from "@/components/user/store/StoreContainer";

export default async function StoresPage() {
  return (
    <section className="w-full h-auto">
      <Wrapper className={"w-full h-auto mt-3"}>
        <SearchMobileComponent />
      </Wrapper>
      <StoreContainer />
    </section>
  );
}
