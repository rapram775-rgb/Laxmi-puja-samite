/**
 * Static, dependency-free hero visual shown when WebGL is unavailable.
 * Purely decorative (the headline, CTAs and project cards remain in the DOM
 * around it), so it is hidden from assistive tech.
 */
export function HeroFallback() {
  return (
    <div className="hero-fallback" aria-hidden="true">
      <div className="hero-fallback__stars" />
      <div className="hero-fallback__system">
        <span className="hero-fallback__ring hero-fallback__ring--a" />
        <span className="hero-fallback__ring hero-fallback__ring--b" />
        <span className="hero-fallback__ring hero-fallback__ring--c" />
        <span className="hero-fallback__globe">
          <span className="hero-fallback__atmo" />
          <span className="hero-fallback__moon" />
        </span>
        <span className="hero-fallback__wordmark">ScaleForge</span>
      </div>
    </div>
  );
}
