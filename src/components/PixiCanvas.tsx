"use client";

import { useEffect, useState } from "react";
import { extend } from "@pixi/react";
import { Container, Text, Sprite, Assets, Texture } from "pixi.js";

extend({ Container, Text, Sprite });

const NUM_REELS = 3;
const SYMBOLS_PER_REEL = 3;
const SYMBOL_WIDTH = 110;
const SYMBOL_HEIGHT = 190;

const PixiCanvas = () => {
  const [shieldTexture, setShieldTexture] = useState<Texture | null>(null);
  const [slotTextures, setSlotTextures] = useState<Texture[]>([]);
  const [reels, setReels] = useState<Texture[][]>([]);

  useEffect(() => {
    const loadAssets = async () => {
      const shield = await Assets.load("/assets/zelda-shield.png");
      const link = await Assets.load("/assets/link.webp");
      const zelda = await Assets.load("/assets/zelda.webp");
      const ganon = await Assets.load("/assets/ganon.webp");

      setShieldTexture(shield);
      const textures = [link, zelda, ganon];
      setSlotTextures(textures);
      setReels(generateReels(textures));
    };

    loadAssets();
  }, []);

  const generateReels = (textures: Texture[]): Texture[][] => {
    return Array.from({ length: NUM_REELS }, () =>
      Array.from({ length: SYMBOLS_PER_REEL }, () => {
        const i = Math.floor(Math.random() * textures.length);
        return textures[i];
      })
    );
  };

  const spinSlots = () => {
    setReels(generateReels(slotTextures));
  };

  if (!shieldTexture || slotTextures.length === 0 || reels.length === 0)
    return null;

  return (
    <>
      {/* Game title */}
      < pixiContainer x={window.innerWidth / 2} y={(window.innerHeight / 2) - 400
      }>
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
      </pixiContainer >

      {/* Slot machine reels */}
      < pixiContainer
        x={window.innerWidth / 2}
        y={window.innerHeight / 2 - 250}
        anchor={0.5}
      >
        {
          reels.map((column, colIndex) => (
            <pixiContainer key={colIndex} x={(colIndex - 1) * (SYMBOL_WIDTH + 10)} y={0}>
              {column.map((texture, rowIndex) => (
                <pixiSprite
                  key={rowIndex}
                  texture={texture}
                  x={0}
                  y={rowIndex * (SYMBOL_HEIGHT + 10)}
                  anchor={0.5}
                  width={SYMBOL_WIDTH}
                  height={SYMBOL_HEIGHT}
                />
              ))}
            </pixiContainer>
          ))
        }
      </pixiContainer >

      {/* Zelda shield spin button */}
      < pixiSprite
        texture={shieldTexture}
        x={window.innerWidth / 2}
        y={(window.innerHeight / 2) + 350}
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
