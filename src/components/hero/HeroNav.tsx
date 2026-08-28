import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const LINKS = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Strengths", href: "#strengths" },
  { label: "Stories", href: "#stories" },
];

/**
 * Minimal hero navigation. Transparent over the 3D scene, then frosts once the
 * page scrolls. The mobile menu is a real toggle with aria-expanded/-controls
 * and closes on Escape.
 */
export function HeroNav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <header className="hero-nav" data-scrolled={scrolled || undefined} data-open={menuOpen || undefined}>
      <div className="hero-nav__bar">
        <a className="hero-nav__brand" href="#top" aria-label="ScaleForge IT — home">
          <span className="hero-nav__mark" aria-hidden="true" />
          ScaleForge
        </a>

        <nav className="hero-nav__links" aria-label="Primary">
          {LINKS.map((l) => (
            <a key={l.href} className="hero-nav__link" href={l.href}>
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hero-nav__actions">
          <a className="sf-btn sf-btn--primary sf-btn--sm hero-nav__cta" href="#contact">
            Start a Project
          </a>
          <button
            type="button"
            className="sf-icon-btn hero-nav__toggle"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="hero-mobile-menu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? (
              <X size={20} strokeWidth={1.75} aria-hidden="true" />
            ) : (
              <Menu size={20} strokeWidth={1.75} aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      <div className="hero-nav__menu" id="hero-mobile-menu" hidden={!menuOpen}>
        <nav aria-label="Mobile" className="hero-nav__menu-inner">
          {LINKS.map((l) => (
            <a
              key={l.href}
              className="hero-nav__menu-link"
              href={l.href}
              onClick={() => setMenuOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <a
            className="sf-btn sf-btn--primary hero-nav__menu-cta"
            href="#contact"
            onClick={() => setMenuOpen(false)}
          >
            Start a Project
          </a>
        </nav>
      </div>
    </header>
  );
}
