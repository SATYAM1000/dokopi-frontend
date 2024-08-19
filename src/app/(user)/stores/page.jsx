import Footer from "@/components/user/global/Footer";
import Wrapper from "@/components/user/global/Wrapper";
import SearchMobileComponent from "@/components/user/store/SearchMobileComponent";
import StoreContainer from "@/components/user/store/StoreContainer";

export const metadata = {
  title: "Xerox Stores",
  description: "Print with ease. Anywhere. Anytime.",
  openGraph: {
    title: "Xerox Stores",
    description: "Print with ease. Anywhere. Anytime.",
    url: "https://dokopi.com/stores",
    siteName: "Dokopi",
  },
};

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
