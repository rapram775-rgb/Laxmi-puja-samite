import type { Device } from "../../hooks/useResponsive";
import type { DesktopSlot, Project } from "../../types/project";
import { projects as projectsList } from "../../data/projects";
import { ProjectCard } from "./ProjectCard";

interface Point {
  x: number;
  y: number;
}

/** Card centre, as % of the hero stage. Lower-left is kept clear for the copy. */
const ANCHOR: Record<DesktopSlot, Point> = {
  "top-left": { x: 16, y: 23 },
  "top-right": { x: 83, y: 21 },
  left: { x: 10, y: 47 },
  right: { x: 90, y: 46 },
  "bottom-left": { x: 57, y: 80 },
  "bottom-right": { x: 85, y: 74 },
};

/** Matching point on the globe rim the connector runs to. */
const TARGET: Record<DesktopSlot, Point> = {
  "top-left": { x: 40, y: 34 },
  "top-right": { x: 60, y: 33 },
  left: { x: 35, y: 49 },
  right: { x: 65, y: 48 },
  "bottom-left": { x: 52, y: 66 },
  "bottom-right": { x: 58, y: 64 },
};

interface ProjectConstellationProps {
  device: Device;
  activeId: string | null;
  onOpen: (project: Project) => void;
  onHoverStart: (id: string) => void;
  onHoverEnd: () => void;
}

/**
 * Desktop / tablet only. Floating project cards anchored around the globe,
 * each tied to a glowing surface node by a thin curved blue connector.
 * Absolutely positioned over the canvas; only the cards capture pointer input.
 */
export function ProjectConstellation({
  device,
  activeId,
  onOpen,
  onHoverStart,
  onHoverEnd,
}: ProjectConstellationProps) {
  const visible = projectsFor(device);

  return (
    <div className="hero-constellation" aria-hidden={false}>
      <svg
        className="hero-connectors"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
        focusable="false"
      >
        {visible.map((p) => {
          const a = ANCHOR[p.slot];
          const t = TARGET[p.slot];
          const cx = (a.x + t.x) / 2 + (50 - (a.x + t.x) / 2) * 0.12;
          const cy = (a.y + t.y) / 2;
          return (
            <path
              key={p.id}
              className="hero-connectors__line"
              data-active={activeId === p.id || undefined}
              d={`M ${a.x} ${a.y} Q ${cx} ${cy} ${t.x} ${t.y}`}
              fill="none"
              vectorEffect="non-scaling-stroke"
            />
          );
        })}
      </svg>

      {visible.map((p) => {
        const t = TARGET[p.slot];
        return (
          <span
            key={`node-${p.id}`}
            className="hero-node"
            data-active={activeId === p.id || undefined}
            style={{ left: `${t.x}%`, top: `${t.y}%` }}
            aria-hidden="true"
          />
        );
      })}

      {visible.map((p) => {
        const a = ANCHOR[p.slot];
        return (
          <div
            key={`card-${p.id}`}
            className="hero-card-anchor"
            style={{ left: `${a.x}%`, top: `${a.y}%` }}
          >
            <ProjectCard
              project={p}
              variant="floating"
              active={activeId === p.id}
              onOpen={onOpen}
              onHoverStart={onHoverStart}
              onHoverEnd={onHoverEnd}
            />
          </div>
        );
      })}
    </div>
  );
}

function projectsFor(device: Device): Project[] {
  return projectsList.filter((p) =>
    device === "tablet" ? p.showOnTablet : true,
  );
}
