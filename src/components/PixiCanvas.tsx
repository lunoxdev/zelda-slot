import { useEffect, useState } from "react";
import { extend } from "@pixi/react";
import { Container, Text, Sprite, Texture } from "pixi.js";

import { loadTextures } from "../game/textures";
import Reel from "./Reel";
import GameTitle from "./GameTitle";
import Background from "./Background";

extend({ Container, Text, Sprite });

const PixiCanvas = () => {
  const [shieldTexture, setShieldTexture] = useState<Texture | null>(null);
  // Create refs for each reel to control their spin animations
  const [isSpinning1, setIsSpinning1] = useState<boolean>(false);
  const [isSpinning2, setIsSpinning2] = useState<boolean>(false);
  const [isSpinning3, setIsSpinning3] = useState<boolean>(false)

  useEffect(() => {
    // Load assets (textures) when the component mounts
    loadTextures().then(({ shield }) => setShieldTexture(shield));
  }, []);

  // Function to start the spinning animation for all reels
  const startSpinning = () => {
    if (isSpinning1 || isSpinning2 || isSpinning3) return;

    setIsSpinning1(true);
    setTimeout(() => setIsSpinning2(true), 200);
    setTimeout(() => setIsSpinning3(true), 300);
  };


  if (!shieldTexture) return null;

  return (
    <>
      <Background />

      <pixiContainer x={window.innerWidth / 2} y={window.innerHeight / 2 - 400}>
        <GameTitle />
      </pixiContainer>

      {/* Reel container */}
      <pixiContainer
        x={window.innerWidth / 2}
        y={window.innerHeight / 2 - 250}
        anchor={0.5}
      >
        {/* Individual Reel components with refs */}
        <Reel
          x={-130}
          y={0}
          isSpinning={isSpinning1}
          onSpinComplete={() => setIsSpinning1(false)}
        />
        <Reel
          x={0}
          y={0}
          isSpinning={isSpinning2}
          onSpinComplete={() => setIsSpinning2(false)}
        />
        <Reel
          x={130}
          y={0}
          isSpinning={isSpinning3}
          onSpinComplete={() => setIsSpinning3(false)}
        />
      </pixiContainer>

      {/* Spin button */}
      <pixiSprite
        texture={shieldTexture}
        x={window.innerWidth / 2}
        y={window.innerHeight / 2 + 370}
        anchor={0.5}
        width={120}
        height={140}
        eventMode="static"
        cursor={`${isSpinning1 || isSpinning2 || isSpinning3 ? "not-allowed" : "pointer"}`}
        onPointerDown={startSpinning}
      />
    </>
  );
};

export default PixiCanvas;
