import { ArrowUpRight, Bot, Code2, LayoutDashboard, Smartphone, Workflow, Palette } from "lucide-react";
import { Reveal } from "../ui/Reveal";
import { SectionIntro } from "./SectionIntro";

const services = [
  { icon: LayoutDashboard, number: "01", title: "Websites & Digital Experiences", text: "High-performance company websites, landing pages, booking experiences, and brand-led digital platforms.", image: "/images/services/web-development.webp", imageAlt: "Modern software development workspace with code on a large display" },
  { icon: Code2, number: "02", title: "Web Applications", text: "Customer portals, dashboards, SaaS products, internal tools, and custom web applications built around real workflows.", image: "/images/services/ui-ux-design.webp", imageAlt: "Modern software dashboard and digital product interface" },
  { icon: Smartphone, number: "03", title: "Mobile Applications", text: "Mobile products that make services, communities, memberships, and business operations easier to access.", image: "/images/services/mobile-apps.webp", imageAlt: "Modern mobile application interfaces displayed on smartphones" },
  { icon: Workflow, number: "04", title: "Business Systems & Automation", text: "Management platforms, CRM-style workflows, reporting, approvals, notifications, and operational automation.", image: "/images/services/cloud-devops.webp", imageAlt: "Secure cloud infrastructure and server systems with blue network lighting" },
  { icon: Bot, number: "05", title: "AI & Intelligent Products", text: "AI assistants, knowledge experiences, intelligent workflows, and practical AI integrations that create measurable utility.", image: "/images/services/ai-automation.webp", imageAlt: "AI automation and intelligent digital workflow interface" },
  { icon: Palette, number: "06", title: "Product Design & UX", text: "Research-led information architecture, UI systems, prototypes, and design direction that make software easier to use.", image: "/images/services/ecommerce.webp", imageAlt: "Premium e-commerce interface displayed on a laptop" },
];

export function ServicesSection() {
  return (
    <section className="sf-section services sf-section--surface" id="services" aria-labelledby="services-title">
      <div className="sf-section-shell sf-section-shell--wide">
        <SectionIntro eyebrow="What We Build" title="From the first idea to the system that runs the business." description="Choose a focused engagement or combine capabilities into one product team. Every project starts with clarity and ends with something people can actually use." />
        <div className="services__grid">
          {services.map(({ icon: Icon, number, title, text, image, imageAlt }, index) => (
            <Reveal className="sf-card service-card" delay={index * 45} key={title}>
              <img className="service-card__image" src={image} alt={imageAlt} loading="lazy" />
              <div className="service-card__top"><span>{number}</span><span className="sf-icon-tile"><Icon size={20} /></span></div>
              <div className="service-card__body"><h3>{title}</h3><p>{text}</p></div>
              <a href="#contact" aria-label={`Discuss ${title}`}><span>Discuss this capability</span><ArrowUpRight size={16} /></a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
