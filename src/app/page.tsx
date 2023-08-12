import About from "@/components/About";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Reviews from "@/components/Reviews";
import Testimonials from "@/components/Testimonials";

export default function Home() {
  return (
    <>
      <main className="relative w-full min-h-screen mx-auto overflow-hidden background-pattern">
        <div className="bg-[#1B3868] h-screen">
          <Navbar />
          <Hero />
        </div>

        <div className="min-h-screen bg-white max-w-7xl relative mx-auto py-12">
          <Reviews />
          <About />
        </div>

        <Testimonials />
        <Footer />
      </main>
    </>
  );
}
