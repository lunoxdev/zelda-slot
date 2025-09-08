import { useEffect } from "react";
import gsap from "gsap";
import { STEP } from "../game/constants";
import { getRandomTexture, rotateTextures } from "../utils/reelUtils";
import { Container, Sprite, Texture } from "pixi.js";

export const useReelSpin = (
  isSpinning: boolean,
  contentRef: React.RefObject<Container | null>,
  spritesRef: React.RefObject<Sprite[]>,
  texturesRef: React.RefObject<Texture[]>,
  onSpinComplete: () => void
) => {
  useEffect(() => {
    if (isSpinning) {
      const c = contentRef.current;
      if (!c) return;

      let moved = 0;

      // Function to move the reel and rotate textures as needed
      const move = (speed: number) => {
        c.y += speed; // Move the container down
        moved += speed;

        while (moved >= STEP) {
          moved -= STEP;
          c.y -= STEP; // Reset container position for seamless looping
          rotateTextures(spritesRef, () =>
            getRandomTexture(texturesRef.current)
          ); // Change textures to simulate new symbols
        }
      };

      // GSAP timeline for the spinning animation
      gsap
        .timeline()
        // Accelerate spin
        .to(
          {},
          {
            duration: 0.8,
            ease: "power2.in",
            onUpdate: () => move(80),
          }
        )
        // Constant spin speed
        .to(
          {},
          {
            duration: 1,
            ease: "none",
            onUpdate: () => move(80),
          }
        )
        // Decelerate spin
        .to(
          {},
          {
            duration: 1,
            ease: "power2.out",
            onUpdate: () => move(20),
            onComplete: () => {
              c.y = 0;
              onSpinComplete();
            },
          }
        );
    }
  }, [isSpinning]);
};
