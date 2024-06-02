import Footer from "@/components/user/global/Footer";
import Wrapper from "@/components/user/global/Wrapper";
import SearchMobileComponent from "@/components/user/store/SearchMobileComponent";
import StoreContainer from "@/components/user/store/StoreContainer";

export default async function StoresPage() {
  return (
    <section className="w-full h-auto">
      <Wrapper className={"w-full h-auto mt-3"}>
        <SearchMobileComponent />
      </Wrapper>
      <StoreContainer />
      <Footer />
    </section>
  );
}
