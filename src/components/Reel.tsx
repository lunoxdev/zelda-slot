import { Container, Sprite } from "pixi.js";
import { extend } from "@pixi/react";
import { useReelSetup } from "../hooks/useReelSetup";
import { useReelSpin } from "../hooks/useReelSpin";

extend({ Container, Sprite });

const Reel = ({ x, y, isSpinning, onSpinComplete }: {
    x: number;
    y: number;
    isSpinning: boolean;
    onSpinComplete: () => void
}) => {

    // Init Setup
    const { viewportRef, contentRef, spritesRef, texturesRef } = useReelSetup();

    // Spin Reel Animation
    useReelSpin(isSpinning, contentRef, spritesRef, texturesRef, onSpinComplete);

    return (
        <pixiContainer ref={viewportRef} x={x} y={y}>
            <pixiContainer ref={contentRef} />
        </pixiContainer>
    );
};

export default Reel;
