"use client";

import { useEffect, useState, useRef } from "react";
import { Application, extend } from "@pixi/react";
import { Container, Text, Sprite, Assets, Texture } from "pixi.js";

extend({ Container, Text, Sprite });

const PixiCanvas = () => {
  const parentRef = useRef<HTMLElement>(null);
  const [windowReady, setWindowReady] = useState<boolean>(false);
  const [shieldTexture, setShieldTexture] = useState<Texture | null>(null);
  const [linkTexture, setLinkTexture] = useState<Texture | null>(null);
  const [zeldaTexture, setZeldaTexture] = useState<Texture | null>(null);
  const [ganonTexture, setGanonTexture] = useState<Texture | null>(null);
  const [slotTextures, setSlotTextures] = useState<Texture[]>([]);
  const [slotResults, setSlotResults] = useState<Texture[]>([]);

  useEffect(() => {
    setWindowReady(true);
  }, []);

  useEffect(() => {
    const loadAssets = async () => {
      const shield = await Assets.load("/assets/zelda-shield.png");
      const link = await Assets.load("/assets/link.webp");
      const zelda = await Assets.load("/assets/zelda.webp");
      const ganon = await Assets.load("/assets/ganon.webp");

      setShieldTexture(shield);
      setLinkTexture(link);
      setZeldaTexture(zelda);
      setGanonTexture(ganon);

      const textures = [link, zelda, ganon];
      setSlotTextures(textures);
      setSlotResults([textures[0], textures[1], textures[2]]); // Initial random display
    };

    loadAssets();
  }, []);

  if (
    !windowReady ||
    !shieldTexture ||
    !linkTexture ||
    !zeldaTexture ||
    !ganonTexture
  )
    return null;

  const spinSlots = () => {
    const newResults = slotTextures.map(() => {
      const randomOrder = Math.floor(Math.random() * slotTextures.length);
      return slotTextures[randomOrder];
    });

    setSlotResults(newResults);
  };

  return (
    <section ref={parentRef} className="h-screen w-screen">
      <Application resizeTo={parentRef} background="#121212" autoStart>
        {/* Game title */}
        <pixiContainer x={window.innerWidth / 2} y={window.innerHeight / 5}>
          <pixiText
            text="Zelda Slot"
            anchor={0.5}
            style={{
              fontSize: 30,
              fill: "#39FF14",
              dropShadow: {
                color: "#39FF14",
                blur: 5,
                distance: 4,
                angle: Math.PI / 4,
                alpha: 0.5,
              },
            }}
          />
        </pixiContainer>

        {/* Slot machine display */}
        <pixiContainer
          x={window.innerWidth / 2}
          y={window.innerHeight / 2 + -50}
          anchor={0.5}
        >
          {slotResults.map((texture, index) => (
            <pixiSprite
              key={index}
              texture={texture}
              x={(index - 1) * 220}
              y={0}
              anchor={0.5}
              width={200}
              height={400}
            />
          ))}
        </pixiContainer>

        {/* Zelda shield spin button */}
        <pixiSprite
          texture={shieldTexture}
          x={window.innerWidth / 2}
          y={window.innerHeight / 2 + 250}
          anchor={0.5}
          width={100}
          height={110}
          eventMode="static"
          cursor="pointer"
          onPointerDown={spinSlots}
        />
      </Application>
    </section>
  );
};

export default PixiCanvas;
