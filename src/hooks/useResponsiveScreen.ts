import { useState, useEffect } from "react";
import {
  TARGET_WIDTH,
  TARGET_HEIGHT,
  MOBILE_BREAKPOINT,
} from "../game/constants";

export const useResponsiveScreen = () => {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      const currentWidth = window.innerWidth;
      const currentHeight = window.innerHeight;

      if (currentWidth < MOBILE_BREAKPOINT) {
        const scaleX = currentWidth / TARGET_WIDTH;
        const scaleY = currentHeight / TARGET_HEIGHT;
        setScale(Math.min(scaleX, scaleY));
      } else {
        setScale(1); // No scaling for desktop
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial call

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return scale;
};
