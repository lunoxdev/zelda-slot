import { useEffect, useState } from "react"
import { Texture } from "pixi.js";
import { loadTextures } from "../game/textures";

interface bgProps {
    width: number,
    height: number,
    x: number,
    y: number
}

const Background = () => {
    const [zeldaBgTexture, setZeldaBgTexture] = useState<Texture | null>(null);
    const [bgSize, setBgSize] = useState<bgProps | null>(null);

    useEffect(() => {
        // Load background texture
        loadTextures().then(({ zeldaBg }) => {
            setZeldaBgTexture(zeldaBg);
        });
    }, []);

    useEffect(() => {
        if (zeldaBgTexture) {
            // Image aspect ratio
            const aspectRatio = zeldaBgTexture.width / zeldaBgTexture.height;
            // Screen aspect ratio
            const screenAspectRatio = window.innerWidth / window.innerHeight;

            let newWidth: number;
            let newHeight: number;
            let newX: number;
            let newY: number;

            // Scale to fit screen while keeping aspect ratio
            if (aspectRatio > screenAspectRatio) {
                newHeight = window.innerHeight;
                newWidth = newHeight * aspectRatio;
            } else {
                newWidth = window.innerWidth;
                newHeight = newWidth / aspectRatio;
            }

            // Center background on screen
            newX = (window.innerWidth - newWidth) / 2;
            newY = (window.innerHeight - newHeight) / 2;

            setBgSize({ width: newWidth, height: newHeight, x: newX, y: newY });
        }
    }, [zeldaBgTexture, window.innerWidth, window.innerHeight]);

    if (!zeldaBgTexture || !bgSize) return null; // Skip render if not ready

    return (
        <pixiSprite
            texture={zeldaBgTexture}
            width={bgSize.width}
            height={bgSize.height}
            x={bgSize.x}
            y={bgSize.y}
        />
    )
}

export default Background;
