import { Sprite, Texture } from "pixi.js";

// Get random textures
export const getRandomTexture = (textures: Texture[]) => {
  return textures[Math.floor(Math.random() * textures.length)];
};
// Rotate textures
export const rotateTextures = (
  spritesRef: React.RefObject<Sprite[]>,
  randTexture: () => Texture
) => {
  for (let i = spritesRef.current.length - 1; i > 0; i--) {
    spritesRef.current[i].texture = spritesRef.current[i - 1].texture; // Move texture down
  }
  spritesRef.current[0].texture = randTexture(); // Assign a new random texture to the top
};
