'use client'

import { useEffect, useState, useRef } from "react";
import { Application, extend } from "@pixi/react";
import { Container, Text, Sprite, Assets } from "pixi.js";

extend({ Container, Text, Sprite });

const PixiCanvas = () => {
    const parentRef = useRef<HTMLDivElement>(null);
    const [windowReady, setWindowReady] = useState<boolean>(false);
    const [shieldTexture, setShieldTexture] = useState(null);

    useEffect(() => {
        setWindowReady(true);
    }, []);

    useEffect(() => {
        const loadShield = async () => {
            const texture = await Assets.load("/assets/zelda-shield.png");
            setShieldTexture(texture);
        };

        loadShield();
    }, []);

    if (!windowReady || !shieldTexture) return null;

    return (
        <section ref={parentRef} className="h-screen w-screen">
            <Application
                resizeTo={parentRef}
                background="#121212"
                autoStart
            >
                {/* Game title */}
                <pixiContainer
                    x={window.innerWidth / 2}
                    y={window.innerHeight / 2}
                >
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

                {/* Zelda shield spin button */}
                <pixiSprite
                    texture={shieldTexture}
                    x={window.innerWidth / 2}
                    y={(window.innerHeight / 2) + 250}
                    anchor={0.5}
                    width={100}
                    height={110}
                    eventMode="static"
                    cursor="pointer"
                    onPointerDown={() => console.log("Spin Button clicked!")}
                />
            </Application>
        </section>
    );
};

export default PixiCanvas;
