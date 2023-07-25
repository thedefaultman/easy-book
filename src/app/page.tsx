import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="relative w-full min-h-screen py-24 mx-auto max-w-7xl overflow-hidden px-6 sm:px-16">
        <Hero />
      </main>
    </>
  );
}
