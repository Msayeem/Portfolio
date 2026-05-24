import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Technologies from "@/components/Technologies";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Footer from "@/components/Footer";
import About from "@/components/About";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Technologies />
        <Skills />
        <Projects />
        <About/>
      </main>
      <Footer />
    </>
  );
}
