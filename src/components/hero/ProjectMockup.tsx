import type { ContentAccent, ProjectKind } from "../../types/project";

/**
 * Tiny stylised product UI shown inside each floating project card.
 * This is the ONLY place a non-blue accent may appear — and only as the
 * depicted client product's own UI, never as ScaleForge chrome.
 * Purely decorative (the card supplies the accessible label).
 */

const ACCENT: Record<ContentAccent, { a: string; b: string }> = {
  blue: { a: "#60a5fa", b: "#3b82f6" },
  violet: { a: "#a78bfa", b: "#e879c6" },
};

const SURFACE = "#0c131e";
const PANE = "#111a28";
const LINE = "rgba(255,255,255,0.16)";
const DIM = "rgba(255,255,255,0.30)";

interface ProjectMockupProps {
  kind: ProjectKind;
  accent: ContentAccent;
}

export function ProjectMockup({ kind, accent }: ProjectMockupProps) {
  const c = ACCENT[accent];
  return (
    <svg
      className="pm"
      viewBox="0 0 120 76"
      width="120"
      height="76"
      aria-hidden="true"
      focusable="false"
    >
      <rect x="0" y="0" width="120" height="76" rx="7" fill={SURFACE} />
      {/* window chrome */}
      <circle cx="10" cy="9" r="1.7" fill={DIM} />
      <circle cx="16" cy="9" r="1.7" fill={DIM} />
      <circle cx="22" cy="9" r="1.7" fill={DIM} />
      <line x1="0" y1="16" x2="120" y2="16" stroke={LINE} />
      {render(kind, c)}
    </svg>
  );
}

function render(kind: ProjectKind, c: { a: string; b: string }) {
  switch (kind) {
    case "dashboard":
      return (
        <>
          <rect x="7" y="22" width="24" height="48" rx="3" fill={PANE} />
          <rect x="11" y="27" width="16" height="3" rx="1.5" fill={DIM} />
          <rect x="11" y="33" width="12" height="3" rx="1.5" fill={c.a} />
          <rect x="11" y="39" width="14" height="3" rx="1.5" fill={DIM} />
          <rect x="37" y="22" width="34" height="20" rx="3" fill={PANE} />
          <rect x="75" y="22" width="38" height="20" rx="3" fill={PANE} />
          <rect x="37" y="46" width="76" height="24" rx="3" fill={PANE} />
          <polyline points="41,64 52,58 63,61 74,50 85,54 96,45 108,48" fill="none" stroke={c.b} strokeWidth="2" />
        </>
      );
    case "mobile":
      return (
        <>
          <rect x="46" y="21" width="28" height="50" rx="5" fill={PANE} stroke={LINE} />
          <rect x="54" y="25" width="12" height="2.4" rx="1.2" fill={DIM} />
          {[0, 1, 2].map((r) =>
            [0, 1, 2].map((col) => (
              <rect
                key={`${r}-${col}`}
                x={50 + col * 7.2}
                y={31 + r * 8}
                width="5.4"
                height="5.4"
                rx="1.4"
                fill={(r + col) % 2 === 0 ? c.a : c.b}
                opacity={(r + col) % 3 === 0 ? 1 : 0.7}
              />
            )),
          )}
          <rect x="18" y="30" width="20" height="6" rx="3" fill={PANE} />
          <rect x="82" y="30" width="20" height="6" rx="3" fill={PANE} />
          <rect x="18" y="42" width="20" height="6" rx="3" fill={PANE} />
          <rect x="82" y="42" width="20" height="6" rx="3" fill={PANE} />
        </>
      );
    case "ecommerce":
      return (
        <>
          <rect x="7" y="22" width="30" height="26" rx="3" fill={PANE} />
          <rect x="41" y="22" width="30" height="26" rx="3" fill={PANE} />
          <rect x="75" y="22" width="38" height="26" rx="3" fill={PANE} />
          <rect x="12" y="27" width="20" height="12" rx="2" fill={c.b} opacity="0.5" />
          <rect x="46" y="27" width="20" height="12" rx="2" fill={c.a} opacity="0.5" />
          <rect x="7" y="54" width="72" height="6" rx="3" fill={PANE} />
          <rect x="7" y="63" width="52" height="6" rx="3" fill={PANE} />
          <circle cx="104" cy="63" r="8" fill={c.b} />
          <path d="M100 60 h8 l-1 5 h-6 z" fill="#fff" opacity="0.9" />
        </>
      );
    case "analytics":
      return (
        <>
          <rect x="7" y="24" width="60" height="44" rx="3" fill={PANE} />
          {[0, 1, 2, 3, 4].map((i) => (
            <rect
              key={i}
              x={13 + i * 11}
              y={62 - (i % 3) * 10 - 8}
              width="7"
              height={(i % 3) * 10 + 8}
              rx="1.5"
              fill={i % 2 === 0 ? c.b : c.a}
            />
          ))}
          <circle cx="92" cy="46" r="18" fill="none" stroke={PANE} strokeWidth="6" />
          <circle
            cx="92"
            cy="46"
            r="18"
            fill="none"
            stroke={c.b}
            strokeWidth="6"
            strokeDasharray="60 113"
            transform="rotate(-90 92 46)"
          />
          <circle
            cx="92"
            cy="46"
            r="18"
            fill="none"
            stroke={c.a}
            strokeWidth="6"
            strokeDasharray="28 113"
            strokeDashoffset="-60"
            transform="rotate(-90 92 46)"
          />
        </>
      );
    case "crm":
      return (
        <>
          {[0, 1, 2, 3].map((i) => (
            <g key={i} transform={`translate(0 ${22 + i * 12})`}>
              <circle cx="15" cy="6" r="4.5" fill={i === 1 ? c.b : PANE} />
              <rect x="24" y="2" width="40" height="3.2" rx="1.6" fill={DIM} />
              <rect x="24" y="7.6" width="26" height="3" rx="1.5" fill={i === 1 ? c.a : LINE} />
              <rect x="92" y="3" width="20" height="6" rx="3" fill={PANE} />
            </g>
          ))}
        </>
      );
    case "design":
      return (
        <>
          <rect x="7" y="22" width="12" height="48" rx="3" fill={PANE} />
          {[0, 1, 2].map((i) => (
            <rect key={i} x="10" y={27 + i * 9} width="6" height="6" rx="1.5" fill={i === 0 ? c.a : DIM} />
          ))}
          <rect x="23" y="22" width="90" height="48" rx="3" fill={PANE} />
          <circle cx="52" cy="46" r="12" fill="none" stroke={c.a} strokeWidth="2" />
          <rect x="70" y="36" width="20" height="20" rx="3" fill="none" stroke={c.b} strokeWidth="2" />
          <path d="M40 60 L58 34 L74 60" fill="none" stroke={DIM} strokeWidth="1.5" />
          <circle cx="52" cy="46" r="2" fill={c.b} />
        </>
      );
  }
}
