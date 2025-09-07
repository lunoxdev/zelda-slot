import { useEffect, useRef, useState } from "react";
import { extend } from "@pixi/react";
import { Container, Text, Sprite, Texture } from "pixi.js";

import { loadTextures } from "../game/textures";
import Reel, { ReelRef } from "./Reel"; // Reel is the default export, ReelRef is a named export
import GameTitle from "./GameTitle";

extend({ Container, Text, Sprite });

const PixiCanvas = () => {
  const [shieldTexture, setShieldTexture] = useState<Texture | null>(null);
  // Create refs for each reel to control their spin animations
  const reel1 = useRef<ReelRef>(null);
  const reel2 = useRef<ReelRef>(null);
  const reel3 = useRef<ReelRef>(null);

  useEffect(() => {
    // Load assets (textures) when the component mounts
    loadTextures().then(({ shield }) => setShieldTexture(shield));
  }, []);

  // Function to start the spinning animation for all reels
  const startSpinning = () => {
    reel1.current?.spin(); // Spin the first reel immediately
    setTimeout(() => reel2.current?.spin(), 200); // Spin the second reel after a short delay
    setTimeout(() => reel3.current?.spin(), 300); // Spin the third reel after a slightly longer delay
  };

  if (!shieldTexture) return null;

  return (
    <>
      <GameTitle />

      {/* Reel container */}
      <pixiContainer
        x={window.innerWidth / 2}
        y={window.innerHeight / 5}
        anchor={0.5}
      >
        {/* Individual Reel components with refs */}
        <Reel ref={reel1} x={-130} y={0} />
        <Reel ref={reel2} x={0} y={0} />
        <Reel ref={reel3} x={130} y={0} />
      </pixiContainer>

      {/* Spin button */}
      <pixiSprite
        texture={shieldTexture}
        x={window.innerWidth / 2}
        y={window.innerHeight / 2 + 330}
        anchor={0.5}
        width={120}
        height={140}
        eventMode="static"
        cursor="pointer"
        onPointerDown={startSpinning}
      />
    </>
  );
};

export default PixiCanvas;
