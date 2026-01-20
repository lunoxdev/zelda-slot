import { Assets } from "pixi.js";

export const loadTextures = async () => {
  const zeldaBg = await Assets.load("/assets/zelda-bg.webp");
  const shield = await Assets.load("/assets/zelda-shield.png");
  const link = await Assets.load("/assets/link.webp");
  const zelda = await Assets.load("/assets/zelda.webp");
  const ganon = await Assets.load("/assets/ganon.webp");

  return {
    zeldaBg,
    shield,
    slotTextures: [link, zelda, ganon],
  };
};
