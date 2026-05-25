import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { ProfessionalExperience } from "@/components/sections/ProfessionalExperience";
import { Projects } from "@/components/sections/Projects";
import { Certifications } from "@/components/sections/Certifications";
import { Skills } from "@/components/sections/Skills";
import { ContactFooter } from "@/components/sections/ContactFooter";

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />
      <ProfessionalExperience />
      <Projects />
      <Certifications />
      <Skills />
      <ContactFooter/>
    </main>
  );
}
