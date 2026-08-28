import type { Project } from "../../types/project";
import { ProjectMockup } from "./ProjectMockup";

type CardVariant = "floating" | "strip";

interface ProjectCardProps {
  project: Project;
  variant: CardVariant;
  active: boolean;
  onOpen: (project: Project) => void;
  onHoverStart: (id: string) => void;
  onHoverEnd: () => void;
}

/**
 * A floating (desktop constellation) or strip (mobile scroller) project card.
 * Rendered as a real <button> so it is keyboard-operable; focus mirrors hover,
 * which is what lights up the matching globe node via the shared `active` state.
 */
export function ProjectCard({
  project,
  variant,
  active,
  onOpen,
  onHoverStart,
  onHoverEnd,
}: ProjectCardProps) {
  return (
    <button
      type="button"
      className="pcard"
      data-variant={variant}
      data-active={active || undefined}
      aria-haspopup="dialog"
      aria-label={`${project.name} — ${project.category}. Open preview.`}
      onClick={() => onOpen(project)}
      onMouseEnter={() => onHoverStart(project.id)}
      onMouseLeave={onHoverEnd}
      onFocus={() => onHoverStart(project.id)}
      onBlur={onHoverEnd}
    >
      <span className="pcard__media">
        <ProjectMockup kind={project.kind} accent={project.contentAccent} />
      </span>
      <span className="pcard__body">
        <span className="pcard__name">{project.name}</span>
        <span className="pcard__cat">{project.category}</span>
      </span>
      <span className="pcard__tag">{project.tags[0]}</span>
    </button>
  );
}
