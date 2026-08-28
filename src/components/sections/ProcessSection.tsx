import { ArrowRight, Compass, PenTool, Rocket, TestTube2, Wrench } from "lucide-react";
import { Reveal } from "../ui/Reveal";
import { SectionIntro } from "./SectionIntro";

const steps = [
  {
    number: "01",
    title: "Discover",
    text: "Clarify the goal, users, requirements, constraints, and success criteria.",
    icon: Compass,
    image: "/images/process/discover.webp",
    alt: "A product team mapping goals and user requirements during a discovery workshop",
  },
  {
    number: "02",
    title: "Shape",
    text: "Turn the requirements into flows, priorities, architecture, and a visual direction.",
    icon: PenTool,
    image: "/images/process/shape.webp",
    alt: "A designer shaping product flows and interface architecture on a large monitor",
  },
  {
    number: "03",
    title: "Build",
    text: "Engineer the product in focused iterations with frequent review and useful checkpoints.",
    icon: Wrench,
    image: "/images/process/build.webp",
    alt: "A developer building a digital product with code across multiple monitors",
  },
  {
    number: "04",
    title: "Validate",
    text: "Test the important journeys, remove friction, and make sure the system works in the real world.",
    icon: TestTube2,
    image: "/images/process/validate.webp",
    alt: "A product validation checklist being reviewed on a laptop",
  },
  {
    number: "05",
    title: "Launch & Improve",
    text: "Ship with confidence, learn from usage, and keep improving what matters.",
    icon: Rocket,
    image: "/images/process/launch-improve.webp",
    alt: "A digital product launch represented by a rocket lifting off",
  },
] as const;

export function ProcessSection() {
  return (
    <section className="sf-section process sf-section--surface" id="process">
      <div className="sf-section-shell sf-section-shell--wide">
        <SectionIntro
          eyebrow="How We Work"
          title="A clear process. No black box."
          description="You should always know what we are solving, what is being built, and what happens next."
        />

        <div className="process__rail">
          {steps.map(({ number, title, text, icon: Icon, image, alt }, i) => (
            <Reveal className="process-step" delay={i * 55} key={number}>
              <div className="process-step__marker">
                <span>{number}</span>
                <Icon size={18} aria-hidden="true" />
              </div>

              <div className="process-step__media">
                <img src={image} alt={alt} loading={i === 0 ? "eager" : "lazy"} />
              </div>

              <div className="process-step__content">
                <h3>{title}</h3>
                <p>{text}</p>
              </div>

              {i < steps.length - 1 && <ArrowRight className="process-step__arrow" size={20} aria-hidden="true" />}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
