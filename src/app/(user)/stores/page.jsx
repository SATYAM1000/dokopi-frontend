import Footer from "@/components/user/Footer";
import StoreContainer from "@/components/user/store/StoreContainer";
import StoreHeader from "@/components/user/store/StoreHeader";

export default async function StoresPage() {
  return (
    <section className="w-full h-auto">
      <StoreHeader />
      <StoreContainer />
      <Footer />
    </section>
  );
}
