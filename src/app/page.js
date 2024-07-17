
import Hero from "@/components/user/home/Hero";
import HowItWorks from "@/components/user/home/HowItWorks";
import DoKopiFeatures from "@/components/user/home/Features";
import CallToAction from "@/components/user/home/CallToAction";
import Footer from "@/components/user/global/Footer";

export default async function Home() {
  return (
    <main>
      <Hero />
      <HowItWorks />
      <DoKopiFeatures />
      <CallToAction />
      <Footer/>
    </main>
  );
}
