import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Projects } from "@/components/Projects";
import { ProfessionalExperience } from "@/components/ProfessionalExperience";
import { Certifications } from "@/components/Certifications";
import { Education } from "@/components/Education";
import { Skills } from "@/components/Skills";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <ProfessionalExperience />
      <Certifications />
      <Education />
      <Skills />
      <Contact />
      <Footer />
    </main>
  );
}
