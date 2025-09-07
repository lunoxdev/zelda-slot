import { useEffect, useState } from "react";
import { extend } from "@pixi/react";
import { Container, Text, Sprite, Texture } from "pixi.js";

import { loadTextures } from "../game/textures";
import Reel from "./Reel";
import GameTitle from "./GameTitle";

extend({ Container, Text, Sprite });

const PixiCanvas = () => {
  const [shieldTexture, setShieldTexture] = useState<Texture | null>(null);

  useEffect(() => {
    const loadAssets = async () => {
      const { shield } = await loadTextures();
      setShieldTexture(shield);
    };
    loadAssets();
  }, []);

  const spinSlots = () => console.log("spin button");

  if (!shieldTexture) return null;

  return (
    <>
      {/* Game title */}
      <GameTitle />

      {/* Separate reels */}
      <pixiContainer
        x={window.innerWidth / 2}
        y={window.innerHeight / 2 - 250}
        anchor={0.5}
      >
        <Reel x={-130} y={0} />
        <Reel x={0} y={0} />
        <Reel x={130} y={0} />
      </pixiContainer>

      {/* Spin button */}
      <pixiSprite
        texture={shieldTexture}
        x={window.innerWidth / 2}
        y={window.innerHeight / 2 + 350}
        anchor={0.5}
        width={120}
        height={140}
        eventMode="static"
        cursor="pointer"
        onPointerDown={spinSlots}
      />
    </>
  );
};

export default PixiCanvas;
