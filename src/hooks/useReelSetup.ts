import { useEffect, useRef } from "react";
import { Container, Sprite, Texture, Graphics } from "pixi.js";
import { loadTextures } from "../game/textures";
import {
  SYMBOLS,
  WIDTH,
  HEIGHT,
  STEP,
  VISIBLE_HEIGHT,
} from "../game/constants";
import { getRandomTexture } from "../utils/reelUtils";

export const useReelSetup = () => {
  const viewportRef = useRef<Container>(null); // Defines the visible area
  const contentRef = useRef<Container>(null); // Animated vertically container
  const spritesRef = useRef<Sprite[]>([]); // Hold the Pixi sprites (symbols)
  const texturesRef = useRef<Texture[]>([]); // Hold all available symbol textures

  useEffect(() => {
    let destroyed = false;

    loadTextures().then(({ slotTextures }) => {
      if (destroyed) return;

      texturesRef.current = slotTextures;

      // Animated sprites within content
      const content = contentRef.current;
      if (!content) return;

      for (let i = 0; i < SYMBOLS; i++) {
        // Container for the symbol
        const card = new Container();
        card.x = 0;
        card.y = (i - 1) * STEP;

        // Symbol sprite
        const s = new Sprite(getRandomTexture(texturesRef.current));
        s.anchor.set(0.5);
        s.width = WIDTH;
        s.height = HEIGHT;
        card.addChild(s);

        // Simple rounded mask
        const mask = new Graphics()
          .roundRect(-WIDTH / 2, -HEIGHT / 2, WIDTH, HEIGHT, 10) // x, y, w, h, radius
          .fill(0xffffff); // white fill for mask

        card.addChild(mask);
        card.mask = mask; // Apply mask to container

        // Add to content and store sprite reference
        content.addChild(card);
        spritesRef.current.push(s);
      }

      // Static mask in viewport
      const viewport = viewportRef.current;
      if (!viewport) return;

      const mask = new Graphics();
      mask.fill(0xffffff);
      // Position and size the mask to correctly display the three symbols
      mask.roundRect(-WIDTH / 2, -HEIGHT / 2, WIDTH, VISIBLE_HEIGHT, 10); // Border rounded
      mask.fill();
      viewport.addChild(mask);

      viewport.mask = mask;
    });

    return () => {
      destroyed = true;
    };
  }, []);

  return { viewportRef, contentRef, spritesRef, texturesRef };
};
