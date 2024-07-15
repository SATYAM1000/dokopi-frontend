import dynamic from "next/dynamic";
const Footer = dynamic(() => import("@/components/user/global/Footer"));
const Wrapper = dynamic(() => import("@/components/user/global/Wrapper"));
const SearchMobileComponent = dynamic(() =>
  import("@/components/user/store/SearchMobileComponent")
);
const StoreContainer = dynamic(() =>
  import("@/components/user/store/StoreContainer")
);

export default async function StoresPage() {
  return (
    <section className="w-full h-auto">
      <Wrapper className={"w-full relative h-auto mt-3"}>
        <SearchMobileComponent />
      </Wrapper>
      <StoreContainer />
      <Footer />
    </section>
  );
}
