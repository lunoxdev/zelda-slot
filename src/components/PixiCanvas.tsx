import { useEffect, useState } from "react";
import { extend } from "@pixi/react";
import { Container, Text, Sprite, Texture } from "pixi.js";
import { loadTextures } from "../game/textures";
import Reel from "./Reel";
import Background from "./Background";
import SpinButton from "./SpinButton";

extend({ Container, Text, Sprite });

const PixiCanvas = () => {
  const [shieldTexture, setShieldTexture] = useState<Texture | null>(null);
  const [zeldaLogoTexture, setZeldaLogoTexture] = useState<Texture | null>(null);
  // Create refs for each reel to control their spin animations
  const [isSpinning1, setIsSpinning1] = useState<boolean>(false);
  const [isSpinning2, setIsSpinning2] = useState<boolean>(false);
  const [isSpinning3, setIsSpinning3] = useState<boolean>(false);

  useEffect(() => {
    // Load assets (textures) when the component mounts
    loadTextures().then(({ shield, zeldaLogo }) => {
      setShieldTexture(shield);
      setZeldaLogoTexture(zeldaLogo);
    });
  }, []);

  // Function to start the spinning animation for all reels
  const startSpinning = () => {
    if (isSpinning1 || isSpinning2 || isSpinning3) return;

    setIsSpinning1(true);
    setTimeout(() => setIsSpinning2(true), 200);
    setTimeout(() => setIsSpinning3(true), 300);
  };

  if (!shieldTexture || !zeldaLogoTexture) return null;

  return (
    <>
      <Background />

      {/* Zelda logo */}
      <pixiSprite
        texture={zeldaLogoTexture}
        x={window.innerWidth / 2}
        y={window.innerHeight / 2 - 380}
        anchor={0.5}
        width={200}
        height={80}
      />

      {/* Reel container */}
      <pixiContainer
        x={window.innerWidth / 2}
        y={window.innerHeight / 2 - 220}
        anchor={0.5}
      >
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
      <SpinButton
        texture={shieldTexture}
        x={window.innerWidth / 2}
        y={window.innerHeight / 2 + 360}
        disabled={isSpinning1 || isSpinning2 || isSpinning3}
        onClick={startSpinning}
      />
    </>
  );
};

export default PixiCanvas;
