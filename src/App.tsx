import { Hero } from "./components/hero/Hero";
import { AboutSection } from "./components/sections/AboutSection";
import { ServicesSection } from "./components/sections/ServicesSection";
import { ProjectsSection } from "./components/sections/ProjectsSection";
import { ProcessSection } from "./components/sections/ProcessSection";
import { RequirementsSection } from "./components/sections/RequirementsSection";
import { TrustSection } from "./components/sections/TrustSection";
import { StoriesSection } from "./components/sections/StoriesSection";
import { AppointmentSection } from "./components/sections/AppointmentSection";
import { FAQSection } from "./components/sections/FAQSection";
import { LocationSection } from "./components/sections/LocationSection";
import { Footer } from "./components/sections/Footer";
import "./components/sections/Sections.css";

export default function App() {
  return <>
    <Hero />
    <AboutSection />
    <ServicesSection />
    <ProjectsSection />
    <ProcessSection />
    <RequirementsSection />
    <TrustSection />
    <StoriesSection />
    <AppointmentSection />
    <FAQSection />
    <LocationSection />
    <Footer />
  </>;
}
