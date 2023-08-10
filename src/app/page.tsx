import About from "@/components/About";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Reviews from "@/components/Reviews";
import Testimonials from "@/components/Testimonials";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="relative w-full min-h-screen py-24 mx-auto max-w-7xl overflow-hidden px-6 sm:px-16 background-pattern">
        <Hero />
        <Reviews />
        <About />
        <Testimonials />
      </main>
      <Footer />
    </>
  );
}
