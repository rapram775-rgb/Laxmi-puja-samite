import { ArrowUpRight } from "lucide-react";
import { showcaseProjects } from "../../data/content";
import { Reveal } from "../ui/Reveal";

export function ProjectsSection() {
  return (
    <section className="sf-section projects" id="projects" aria-labelledby="projects-title">
      <div className="sf-section-shell sf-section-shell--wide projects__shell">
        <div className="projects__heading">
          <span className="projects__eyebrow">SELECTED WORK</span>
          <h2 id="projects-title">
            OUR PAST <span>PROJECT</span>
          </h2>
          <p>
            A selection of digital experiences we have designed and built across
            fitness, hospitality, beauty, and AI.
          </p>
        </div>

        <div className="portfolio-grid" aria-label="ScaleForge past projects">
          {showcaseProjects.map((project, index) => (
            <Reveal className="portfolio-card" delay={index * 60} key={project.number}>
              <a
                className="portfolio-card__visual"
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${project.title} live website`}
              >
                <span className="portfolio-card__number">{project.number}</span>
                <img
                  className="portfolio-card__image"
                  src={project.image}
                  alt={project.imageAlt}
                  loading={index < 2 ? "eager" : "lazy"}
                  decoding="async"
                />
                <span className="portfolio-card__overlay" aria-hidden="true" />
              </a>

              <div className="portfolio-card__content">
                <div className="portfolio-card__copy">
                  <p>{project.category}</p>
                  <h3>{project.title}</h3>
                  <span>{project.description}</span>
                </div>
                <a href={project.href} target="_blank" rel="noopener noreferrer">
                  View project <ArrowUpRight size={17} aria-hidden="true" />
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
