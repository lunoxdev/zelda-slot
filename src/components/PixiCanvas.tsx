import { useEffect, useState } from "react";
import { extend } from "@pixi/react";
import { Container, Text, Sprite, Texture } from "pixi.js";
import { loadTextures } from "../game/textures";
import { playSound } from "../game/sounds";
import Reel from "./Reel";
import Background from "./Background";
import SpinButton from "./SpinButton";
import { useResponsiveScreen } from "../hooks/useResponsiveScreen";

extend({ Container, Text, Sprite });

const PixiCanvas = () => {
  const [shieldTexture, setShieldTexture] = useState<Texture | null>(null);
  const [zeldaLogoTexture, setZeldaLogoTexture] = useState<Texture | null>(null);
  // Create refs for each reel to control their spin animations
  const [isSpinning1, setIsSpinning1] = useState<boolean>(false);
  const [isSpinning2, setIsSpinning2] = useState<boolean>(false);
  const [isSpinning3, setIsSpinning3] = useState<boolean>(false);
  const [hasSpun, setHasSpun] = useState<boolean>(false);
  const scale = useResponsiveScreen();

  useEffect(() => {
    // Load assets (textures) when the component mounts
    loadTextures().then(({ shield, zeldaLogo }) => {
      setShieldTexture(shield);
      setZeldaLogoTexture(zeldaLogo);
    });
    playSound("kokiriForest");
  }, []);

  // Function to start the spinning animation for all reels
  const startSpinning = () => {
    if (isSpinning1 || isSpinning2 || isSpinning3) return;

    setHasSpun(true);
    setIsSpinning1(true);
    setTimeout(() => setIsSpinning2(true), 200);
    setTimeout(() => setIsSpinning3(true), 300);
  };

  useEffect(() => {
    if (hasSpun && !isSpinning1 && !isSpinning2 && !isSpinning3) {
      playSound("skullKidLaugh");
    }
  }, [isSpinning1, isSpinning2, isSpinning3, hasSpun]);

  if (!shieldTexture || !zeldaLogoTexture) return null;

  return (
    <>
      <Background />
      <pixiContainer scale={scale} x={window.innerWidth / 2} y={window.innerHeight / 2 - 45} anchor={0.5}>
        {/* Zelda logo */}
        <pixiSprite
          texture={zeldaLogoTexture}
          x={0}
          y={-380}
          anchor={0.5}
          width={200}
          height={80}
        />

        {/* Reel container */}
        <pixiContainer
          x={0}
          y={-220}
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
          x={0}
          y={360}
          disabled={isSpinning1 || isSpinning2 || isSpinning3}
          onClick={startSpinning}
        />
      </pixiContainer>
    </>
  );
};

export default PixiCanvas;
