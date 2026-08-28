import { useState } from "react";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { Reveal } from "../ui/Reveal";

const faqs = [
  ["What kind of projects does ScaleForge take on?", "We build company websites, web applications, mobile products, business systems, automation, AI-powered products, and thoughtful digital experiences."],
  ["Do I need a complete technical specification?", "No. Bring the business problem, your goals, and what you want to improve. We can help shape the technical scope and the right path forward."],
  ["Can you work with an existing product or codebase?", "Yes. We can redesign, extend, modernize, or continue an existing product when the current foundation is worth keeping."],
  ["How do projects usually start?", "We start with a focused discovery conversation, clarify priorities, define the first useful scope, and then agree on the design and development approach."],
  ["Do you provide support after launch?", "Yes. Depending on the project, support can include fixes, improvements, new features, monitoring, and continued product development."]
] as const;

export function FAQSection() {
  const [open, setOpen] = useState(0);

  return (
    <section className="sf-section faq" id="faq">
      <div className="sf-section-shell sf-section-shell--wide">
        <div className="faq__grid">
          <Reveal className="faq__intro">
            <span className="faq__eyebrow"><i /> FAQ</span>
            <h2>Clear answers.<br /><em>Less uncertainty.</em></h2>
            <p>Everything you need to know before starting a conversation with ScaleForge IT.</p>
            <a className="faq__contact-link" href="#appointment">Start a conversation <ArrowUpRight size={16} /></a>
          </Reveal>

          <div className="faq__list" role="list">
            {faqs.map(([q, a], i) => {
              const isOpen = open === i;
              return (
                <Reveal className={`faq-item ${isOpen ? "is-open" : ""}`} delay={i * 45} key={q}>
                  <button type="button" onClick={() => setOpen(isOpen ? -1 : i)} aria-expanded={isOpen}>
                    <span className="faq-item__number">0{i + 1}</span>
                    <span className="faq-item__question">{q}</span>
                    <span className="faq-item__icon"><ChevronDown size={18} /></span>
                  </button>
                  <div className="faq-item__answer" aria-hidden={!isOpen}>
                    <p>{a}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
