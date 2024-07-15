import dynamic from "next/dynamic";
const Hero=dynamic(()=>import("@/components/user/home/Hero"))
const HowItWorks=dynamic(()=>import("@/components/user/home/HowItWorks"))
const DoKopiFeatures=dynamic(()=>import("@/components/user/home/Features"))
const CallToAction=dynamic(()=>import("@/components/user/home/CallToAction"))
const Footer=dynamic(()=>import("@/components/user/global/Footer"))

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
