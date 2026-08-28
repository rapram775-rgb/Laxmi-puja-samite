import { ArrowUpRight, Check, Compass, Layers3, Sparkles } from "lucide-react";
import { Reveal } from "../ui/Reveal";
import { SectionIntro } from "./SectionIntro";

const principles = [
  { icon: Compass, title: "Start with the problem", text: "We learn the business, users, constraints, and desired outcome before choosing a technology stack." },
  { icon: Layers3, title: "Design the whole system", text: "Product experience, interface, architecture, and delivery are considered together—not as disconnected handoffs." },
  { icon: Sparkles, title: "Make complexity feel simple", text: "The final experience should be easier for people to understand, operate, and improve." },
];

export function AboutSection() {
  return (
    <section className="sf-section about" id="about" aria-labelledby="about-title">
      <div className="sf-section-shell sf-section-shell--wide">
        <SectionIntro
          eyebrow="About ScaleForge"
          title="A software team built around real business problems."
          description="ScaleForge helps ambitious businesses turn ideas, operational friction, and customer needs into dependable digital products."
        />

        <div className="about__story">
          <Reveal className="about__visual">
            <div className="about__visual-art" aria-hidden="true">
              <div className="about__orbit orbit-a" />
              <div className="about__orbit orbit-b" />
              <div className="about__core"><span>SF</span></div>
              <div className="about__node node-a" />
              <div className="about__node node-b" />
              <div className="about__node node-c" />
              <div className="about__grid" />
              <div className="about__visual-label">DIGITAL SYSTEM / 01</div>
            </div>
          </Reveal>

          <Reveal className="about__copy" delay={80}>
            <p className="about__lead">We are a new-generation IT company with hands-on experience building websites, web applications, business software, mobile experiences, and AI-powered products.</p>
            <p>Our approach is deliberately practical. We ask what needs to change, what the users actually need, and what the business must be able to do after launch. Then we design and engineer the system around those answers.</p>
            <div className="about__facts">
              {["Product thinking before implementation", "Design and engineering working together", "Scalable foundations without unnecessary complexity", "Long-term support and continuous improvement"].map((fact) => <span key={fact}><Check size={16} />{fact}</span>)}
            </div>
            <a className="sf-btn sf-btn--secondary" href="#services">Explore our capabilities <ArrowUpRight size={17} /></a>
          </Reveal>
        </div>

        <div className="about__principles">
          {principles.map(({ icon: Icon, title, text }, index) => (
            <Reveal className="sf-card about__principle" delay={index * 70} key={title}>
              <span className="sf-icon-tile"><Icon size={20} /></span>
              <div><h3>{title}</h3><p>{text}</p></div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
