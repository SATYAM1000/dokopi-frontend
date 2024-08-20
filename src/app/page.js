import Hero from "@/components/user/home/Hero";
import HowItWorks from "@/components/user/home/HowItWorks";
import DoKopiFeatures from "@/components/user/home/Features";
import CallToAction from "@/components/user/home/CallToAction";
import Footer from "@/components/user/global/Footer";

export const metadata = {
  title: "DoKopi - Home",
  description:
    "Find and connect with the nearest Xerox store based on your location with our platform. Easily upload documents, make secure payments, and get your prints ready in minutes. Simplifying your printing needs with fast, location-based service.",
};

export default async function Home() {
  return (
    <main className="w-full min-h-screen">
      {/* ---Hero --- */}
      <Hero />
      <HowItWorks />
      <DoKopiFeatures />
      <CallToAction />
      <Footer />
    </main>
  );
}
