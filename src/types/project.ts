/**
 * Shape of a ScaleForge portfolio project.
 * The SAME record powers the Hero network node, the floating card,
 * its mini product-mockup, and the preview modal — data stays separate
 * from presentation.
 */

/** Visual family — drives the card's mini product-mockup + icon. */
export type ProjectKind =
  | "dashboard"
  | "mobile"
  | "ecommerce"
  | "analytics"
  | "crm"
  | "design";

/** Fixed anchor slot around the globe on larger screens. */
export type DesktopSlot =
  | "top-left"
  | "left"
  | "bottom-left"
  | "top-right"
  | "right"
  | "bottom-right";

/**
 * Accent used INSIDE the mockup content only.
 * `violet` is permitted strictly as depicted client-product UI —
 * never for ScaleForge's own chrome, which stays blue.
 */
export type ContentAccent = "blue" | "violet";

export interface Project {
  id: string;
  name: string;
  category: string;
  tags: string[];
  description: string;
  technologies: string[];
  location: string;
  /** In-page anchor; resolves once the Projects section is built. */
  href: string;
  kind: ProjectKind;
  contentAccent: ContentAccent;
  /** Approximate geographic position for the surface network node. */
  node: { lat: number; lng: number };
  /** Anchor point around the globe as % of the hero box: [x, y]. */
  slot: DesktopSlot;
  showOnTablet: boolean;
  showOnMobile: boolean;
  /** True for the brief's own example names; extra placeholders otherwise. */
  fromBrief: boolean;
}
