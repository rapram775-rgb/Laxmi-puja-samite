import { useEffect, useState } from "react";

/** Documented responsive breakpoints (px). */
export const BREAKPOINTS = {
  smallPhone: 320,
  phone: 375,
  largePhone: 430,
  portraitTablet: 768,
  landscapeTablet: 1024,
  smallDesktop: 1280,
  desktop: 1440,
  wideDesktop: 1920,
} as const;

export type Device = "mobile" | "tablet" | "desktop";

export interface ResponsiveState {
  width: number;
  device: Device;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

function classify(width: number): Device {
  if (width < BREAKPOINTS.portraitTablet) return "mobile";
  if (width < BREAKPOINTS.landscapeTablet) return "tablet";
  return "desktop";
}

/**
 * Reports the current viewport width and a coarse device class.
 * Drives the intentionally different mobile Hero composition.
 */
export function useResponsive(): ResponsiveState {
  const [width, setWidth] = useState<number>(() =>
    typeof window === "undefined" ? 1440 : window.innerWidth,
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    let frame = 0;
    const onResize = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setWidth(window.innerWidth));
    };
    window.addEventListener("resize", onResize, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const device = classify(width);
  return {
    width,
    device,
    isMobile: device === "mobile",
    isTablet: device === "tablet",
    isDesktop: device === "desktop",
  };
}
