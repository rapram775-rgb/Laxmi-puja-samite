import { useEffect, useId, useRef } from "react";
import { X } from "lucide-react";
import type { Project } from "../../types/project";
import { ProjectMockup } from "./ProjectMockup";

interface ProjectPreviewModalProps {
  project: Project | null;
  onClose: () => void;
}

const FOCUSABLE =
  'a[href],button:not([disabled]),textarea,input,select,[tabindex]:not([tabindex="-1"])';

/**
 * Accessible project preview. Opened from a card; presents the project's
 * details in a focus-trapped modal dialog. Closes on Escape, backdrop click,
 * or the close button, and restores focus to the invoking card.
 */
export function ProjectPreviewModal({ project, onClose }: ProjectPreviewModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const descId = useId();

  useEffect(() => {
    if (!project) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const { body } = document;
    const prevOverflow = body.style.overflow;
    body.style.overflow = "hidden";

    // Move focus into the dialog.
    const first = dialogRef.current?.querySelector<HTMLElement>(FOCUSABLE);
    first?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab" || !dialogRef.current) return;
      const nodes = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE),
      ).filter((el) => el.offsetParent !== null || el === document.activeElement);
      if (nodes.length === 0) return;
      const firstEl = nodes[0];
      const lastEl = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === firstEl) {
        e.preventDefault();
        lastEl.focus();
      } else if (!e.shiftKey && document.activeElement === lastEl) {
        e.preventDefault();
        firstEl.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      body.style.overflow = prevOverflow;
      previouslyFocused?.focus?.();
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="hero-modal"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="hero-modal__dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descId}
        ref={dialogRef}
      >
        <button
          type="button"
          className="sf-icon-btn hero-modal__close"
          onClick={onClose}
          aria-label="Close preview"
        >
          <X size={18} strokeWidth={1.75} aria-hidden="true" />
        </button>

        <div className="hero-modal__preview" data-accent={project.contentAccent}>
          <div className="hero-modal__mock">
            <ProjectMockup kind={project.kind} accent={project.contentAccent} />
          </div>
        </div>

        <div className="hero-modal__content">
          <p className="hero-modal__eyebrow">{project.category}</p>
          <h2 className="hero-modal__title" id={titleId}>
            {project.name}
          </h2>
          <p className="hero-modal__desc" id={descId}>
            {project.description}
          </p>

          <dl className="hero-modal__meta">
            <div>
              <dt>Location</dt>
              <dd>{project.location}</dd>
            </div>
            <div>
              <dt>Stack</dt>
              <dd>{project.technologies.join(" · ")}</dd>
            </div>
          </dl>

          <ul className="hero-modal__tags" aria-label="Tags">
            {project.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>

          <div className="hero-modal__actions">
            <a className="sf-btn sf-btn--primary" href={project.href} target="_blank" rel="noopener noreferrer">
              View project
            </a>
            <span className="hero-modal__note">Opens the live website</span>
          </div>
        </div>
      </div>
    </div>
  );
}
