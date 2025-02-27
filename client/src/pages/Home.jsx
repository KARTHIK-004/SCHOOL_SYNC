import Features from "@/components/Home/Features";
import Capabilities from "@/components/Home/Capabilities";
import Footer from "@/components/Home/Footer";
import Hero from "@/components/Home/Hero";
import Navbar from "@/components/Home/Navbar";
import Pricing from "@/components/Home/Pricing";
import React from "react";

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Capabilities />
      <Features />
      <Pricing />
      <Footer />
    </>
  );
}

export default Home;
