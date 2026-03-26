import { FAQ } from "@/components/section/FAQ";
import Footer from "@/components/section/Footer";
import Header from "@/components/section/Header";
import Hero from "@/components/section/Hero";
import How from "@/components/section/How";
import Order from "@/components/section/Order";
import Packages from "@/components/section/Packages";
import Pain from "@/components/section/Pain";
import Portfolio from "@/components/section/Portfolio";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Pain />
        <How />
        <Packages />
        <Portfolio />
        <FAQ />
        <Order />
      </main>
      <Footer />
    </>
  );
}
