import CallToAction from "@/components/user/home/CallToAction";
import DoKopiFeatures from "@/components/user/home/Features";
import Hero from "@/components/user/home/Hero";
import HowItWorks from "@/components/user/home/HowItWorks";

export default function Home() {
  return (
    <main>
      <Hero />
      <HowItWorks />
      <DoKopiFeatures />
      <CallToAction />
    </main>
  );
}
