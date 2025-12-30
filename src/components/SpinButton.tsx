import { useState } from "react";
import { Texture } from "pixi.js";

interface SpinButtonProps {
    texture: Texture;
    x: number;
    y: number;
    disabled?: boolean;
    onClick: () => void;
}

const SpinButton = ({ texture, x, y, disabled, onClick }: SpinButtonProps) => {
    const [scale, setScale] = useState(0.4);

    return (
        <pixiSprite
            texture={texture}
            x={x}
            y={y}
            anchor={0.5}
            width={100}
            height={120}
            scale={scale}
            eventMode="static"
            cursor={disabled ? "not-allowed" : "pointer"}
            onPointerOver={() => setScale(0.4)}
            onPointerOut={() => setScale(0.3)}
            onPointerDown={() => onClick()}
        />
    );
};

export default SpinButton;
