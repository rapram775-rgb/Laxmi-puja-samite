import { Suspense, lazy, useCallback, useState } from "react";
import { ChevronDown } from "lucide-react";
import type { Project } from "../../types/project";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { useResponsive } from "../../hooks/useResponsive";
import { hasWebGL } from "../../lib/webgl";
import { HeroFallback } from "./HeroFallback";
import { HeroNav } from "./HeroNav";
import { ProjectConstellation } from "./ProjectConstellation";
import { ProjectStrip } from "./ProjectStrip";
import { ProjectPreviewModal } from "./ProjectPreviewModal";
import "./Hero.css";

const HeroScene = lazy(() => import("./HeroScene"));

export function Hero() {
  const reducedMotion = useReducedMotion();
  const { device, isMobile } = useResponsive();
  const [webglOk] = useState(() => hasWebGL());

  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const highlightId = activeProject?.id ?? hoveredId;

  const handleHoverStart = useCallback((id: string) => setHoveredId(id), []);
  const handleHoverEnd = useCallback(() => setHoveredId(null), []);
  const handleOpen = useCallback((project: Project) => setActiveProject(project), []);
  const handleClose = useCallback(() => setActiveProject(null), []);

  const maxDpr = isMobile ? 1.5 : 2;

  return (
    <div className="hero" id="top" data-device={device}>
      <a className="sf-skip-link" href="#main">
        Skip to content
      </a>

      <HeroNav />

      <main className="hero__stage" id="main">
        <div className="hero__canvas">
          {webglOk ? (
            <Suspense fallback={<SceneLoader />}>
              <HeroScene
                reducedMotion={reducedMotion}
                highlightId={highlightId}
                maxDpr={maxDpr}
                compact={isMobile}
              />
            </Suspense>
          ) : (
            <HeroFallback />
          )}

          {!isMobile && (
            <ProjectConstellation
              device={device}
              activeId={highlightId}
              onOpen={handleOpen}
              onHoverStart={handleHoverStart}
              onHoverEnd={handleHoverEnd}
            />
          )}
        </div>

        {!isMobile && (
          <button
            type="button"
            className="hero__scroll"
            onClick={() =>
              window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
            }
            aria-label="Scroll to explore"
          >
            <span className="hero__scroll-label">Scroll</span>
            <ChevronDown size={18} strokeWidth={1.75} aria-hidden="true" />
          </button>
        )}
      </main>

      {isMobile && (
        <ProjectStrip
          activeId={highlightId}
          onOpen={handleOpen}
          onHoverStart={handleHoverStart}
          onHoverEnd={handleHoverEnd}
        />
      )}

      <ProjectPreviewModal project={activeProject} onClose={handleClose} />
    </div>
  );
}

function SceneLoader() {
  return (
    <div className="hero__loader" aria-hidden="true">
      <span className="hero__loader-dot" />
    </div>
  );
}
