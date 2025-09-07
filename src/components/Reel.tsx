import { Container, Text, Sprite, Texture } from "pixi.js";
import { extend } from "@pixi/react";
import { loadTextures } from "../game/textures";
import { useEffect, useState } from "react";


extend({ Container, Text, Sprite });

const SYMBOLS_PER_REEL = 3;
const SYMBOL_WIDTH = 110;
const SYMBOL_HEIGHT = 190;

interface ReelProps {
    x: number;
    y: number;
}

const Reel = ({ x, y }: ReelProps) => {
    const [textures, setTextures] = useState<Texture[]>([]);

    useEffect(() => {
        const loadSymbols = async () => {
            const { slotTextures } = await loadTextures();
            const symbols = Array.from({ length: SYMBOLS_PER_REEL }, () => {
                const i = Math.floor(Math.random() * slotTextures.length);
                return slotTextures[i];
            });
            setTextures(symbols);
        };
        loadSymbols();
    }, []);

    return (
        <pixiContainer x={x} y={y}>
            {textures.map((texture, index) => (
                <pixiSprite
                    key={index}
                    texture={texture}
                    x={0}
                    y={index * (SYMBOL_HEIGHT + 20)}
                    anchor={0.5}
                    width={SYMBOL_WIDTH}
                    height={SYMBOL_HEIGHT}
                />
            ))}
        </pixiContainer>
    );
};

export default Reel;
