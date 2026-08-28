import type { Project } from "../../types/project";
import { projects } from "../../data/projects";
import { ProjectCard } from "./ProjectCard";

interface ProjectStripProps {
  activeId: string | null;
  onOpen: (project: Project) => void;
  onHoverStart: (id: string) => void;
  onHoverEnd: () => void;
}

/**
 * Mobile-only project interface: a horizontal, scroll-snapping row of cards
 * beneath the copy. Replaces the floating constellation so small screens stay
 * uncluttered while still surfacing every project with touch-sized targets.
 */
export function ProjectStrip({
  activeId,
  onOpen,
  onHoverStart,
  onHoverEnd,
}: ProjectStripProps) {
  return (
    <section className="hero-strip" aria-label="Selected projects">
      <div className="hero-strip__track">
        {projects.map((p) => (
          <ProjectCard
            key={p.id}
            project={p}
            variant="strip"
            active={activeId === p.id}
            onOpen={onOpen}
            onHoverStart={onHoverStart}
            onHoverEnd={onHoverEnd}
          />
        ))}
      </div>
    </section>
  );
}
